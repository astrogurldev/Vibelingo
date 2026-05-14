'use client';

import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { VisionPortal } from '@/components/VisionPortal';
import { VocabularyCard, VocabularyItem } from '@/components/VocabularyCard';
import TutorChat from '@/components/TutorChat';
import { Sparkles } from 'lucide-react';

import { useAstroProgress } from '@/hooks/useAstroProgress';

export default function Home() {
  const [language, setLanguage] = useState('ja');
  const { totalWordsLearned, addProgress } = useAstroProgress();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [vocabularyItems, setVocabularyItems] = useState<VocabularyItem[]>([]);
  const [currentScanItems, setCurrentScanItems] = useState<VocabularyItem[]>([]);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Removed manual local storage tracking, now handled by useAstroProgress hook

  const handleLanguageChange = async (lang: string) => {
    if (lang === language) return;
    
    setLanguage(lang);
    setError(null);

    if (vocabularyItems.length > 0) {
      setIsAnalyzing(true);
      try {
        const words = vocabularyItems.map(item => item.translation);
        const response = await fetch('/api/translate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ words, language: lang }),
        });

        if (response.status === 429) {
          throw new Error('Whoops! Kecepatan menerjemahkanmu terlalu tinggi. Tunggu 5-10 detik sebelum mengganti bahasa lagi (Batas API Gratis).');
        }
        if (!response.ok) {
          let errMessage = 'Failed to translate words';
          try {
            const errData = await response.json();
            errMessage = errData.error?.message || errData.error || errMessage;
          } catch (e) {}
          throw new Error(typeof errMessage === 'string' ? errMessage : JSON.stringify(errMessage));
        }

        const data = await response.json();
        if (data.items && Array.isArray(data.items)) {
          // Keep the 'box' coordinates from old items for the new items if they match by English translation
          const translatedItems = data.items.map((newItem: VocabularyItem) => {
            const oldItem = vocabularyItems.find(v => v.translation === newItem.translation);
            return {
              ...newItem,
              box: oldItem?.box
            };
          });

          setVocabularyItems(translatedItems);
          
          // Also update currentScanItems to keep boxes in sync
          if (currentScanItems.length > 0) {
             const translatedCurrent = currentScanItems.map((curr) => {
                 const translated = translatedItems.find((t: VocabularyItem) => t.translation === curr.translation);
                 return translated || curr;
             });
             setCurrentScanItems(translatedCurrent);
          }
        } else {
          throw new Error('Invalid response format');
        }
      } catch (err: any) {
        console.error(err);
        setError(err.message || 'Failed to translate. Please try again.');
        // Don't clear on translation error, just show error
      } finally {
        setIsAnalyzing(false);
      }
    }
  };

  const handleCapture = async (imageSrc: string) => {
    setIsAnalyzing(true);
    setError(null);
    setCapturedImage(imageSrc);
    setCurrentScanItems([]);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: imageSrc, language }),
      });

      if (response.status === 429) {
        throw new Error('Whoops! Sistem sedang sibuk. Tunggu 5-10 detik sebelum memindai foto lagi (Batas API Gratis).');
      }
      if (!response.ok) {
        let errMessage = 'Failed to analyze image';
        try {
          const errData = await response.json();
          errMessage = errData.error?.message || errData.error || errMessage;
        } catch (e) {
          // ignore parsing error
        }
        throw new Error(typeof errMessage === 'string' ? errMessage : JSON.stringify(errMessage));
      }

      const data = await response.json();
      
      if (data.items && Array.isArray(data.items)) {
        // Filter out duplicate objects
        const uniqueItems: VocabularyItem[] = [];
        data.items.forEach((item: VocabularyItem) => {
          if (!uniqueItems.find(existing => existing.translation.toLowerCase() === item.translation.toLowerCase())) {
            uniqueItems.push(item);
          }
        });

        setCurrentScanItems(uniqueItems);
        setVocabularyItems(uniqueItems); // Hanya tampilkan kotak/kartu unik dari foto saat ini
        
        // Update skor kata yang dipelajari (tambahkan dengan jumlah benda yang baru dideteksi)
        addProgress(uniqueItems.length);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to analyze the image. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setCapturedImage(null);
    setCurrentScanItems([]);
    setError(null);
  };

  return (
    <main className="flex min-h-screen p-4 md:p-8 gap-8 flex-col md:flex-row">
      <div className="w-full md:w-64 flex-shrink-0">
        <Sidebar 
          language={language} 
          onLanguageChange={handleLanguageChange} 
          totalWordsLearned={totalWordsLearned} 
        />
      </div>

      <div className="flex-1 flex flex-col gap-8 max-w-5xl mx-auto w-full">
        <div className="h-[400px] md:h-[500px] w-full shrink-0">
          <VisionPortal 
            onCapture={handleCapture} 
            isAnalyzing={isAnalyzing} 
            capturedImage={capturedImage}
            currentScanItems={currentScanItems}
            onReset={handleReset}
          />
        </div>

        <div className="flex-1 min-h-[300px]">
          {error && (
            <div className="glass-card p-6 bg-red-500/10 border-red-500/30 text-red-200 mb-6">
              {error}
            </div>
          )}

          {vocabularyItems.length === 0 && !isAnalyzing && (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 glass-card p-12 text-center">
              <Sparkles size={48} className="mb-4 text-violet opacity-50" />
              <h3 className="text-xl font-medium text-gray-300 mb-2">Awaiting Visual Input</h3>
              <p>Capture or upload an image to discover vocabulary in your environment.</p>
            </div>
          )}

          {vocabularyItems.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {vocabularyItems.map((item, index) => (
                <VocabularyCard 
                  key={`${item.translation}-${index}`} 
                  item={item} 
                  language={language} 
                  index={index} 
                />
              ))}
            </div>
          )}
        </div>
        
        {/* Vibe Tutor Chatbot */}
        <TutorChat language={language} vocabularyItems={vocabularyItems} />
      </div>
    </main>
  );
}
