'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { AudioVisualizer } from '@/components/AudioVisualizer';
import { SlangDeepDive, SlangItem } from '@/components/SlangDeepDive';
import { Mic, Square, Play, Sparkles, Flame, ChevronLeft, BookOpen } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { PREDEFINED_PRACTICES, PracticeLesson } from '@/constants/practices';
import { useAstroProgress } from '@/hooks/useAstroProgress';

export default function ShadowingLab() {
  const [language, setLanguage] = useState('en');
  const { totalWordsLearned, addProgress } = useAstroProgress();
  
  // Shadowing states
  const [activePractice, setActivePractice] = useState<PracticeLesson | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [userTranscript, setUserTranscript] = useState('');
  const [score, setScore] = useState<number | null>(null);
  const [selectedSlang, setSelectedSlang] = useState<SlangItem | null>(null);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [isPlayingTTS, setIsPlayingTTS] = useState(false);
  const [isMuted, setIsMuted] = useState(false); // To mute TTS if requested

  const recognitionRef = useRef<any>(null);

  // Removed manual local storage load, now handled by useAstroProgress hook

  // Setup SpeechRecognition
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      
      recognition.onresult = (event: any) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript + ' ';
        }
        setUserTranscript(currentTranscript.trim().toLowerCase());
      };

      recognitionRef.current = recognition;
    }
  }, []);

  // Set language for recognition
  useEffect(() => {
    if (recognitionRef.current && activePractice) {
      recognitionRef.current.lang = activePractice.languageCode;
    }
  }, [activePractice]);

  // Handle TTS voices loading
  useEffect(() => {
    window.speechSynthesis.getVoices();
  }, []);

  const selectPractice = (practice: PracticeLesson) => {
    setActivePractice(practice);
    setUserTranscript('');
    setScore(null);
    window.speechSynthesis.cancel();
  };

  const backToLibrary = () => {
    setActivePractice(null);
    stopShadowing();
    window.speechSynthesis.cancel();
  };

  const handleNextChallenge = () => {
    if (!activePractice) return;
    
    // Get all practices for this language in order
    const sameLanguagePractices = PREDEFINED_PRACTICES.filter(
      p => p.languageCode === activePractice.languageCode
    );

    // Find current index
    const currentIndex = sameLanguagePractices.findIndex(p => p.id === activePractice.id);
    
    // Select the next one sequentially
    if (currentIndex >= 0 && currentIndex < sameLanguagePractices.length - 1) {
      const nextPractice = sameLanguagePractices[currentIndex + 1];
      selectPractice(nextPractice);
    } else {
      // If at the end of the list, go back to library
      alert("🎉 You've completed all current lessons for this language! Returning to library to explore others.");
      backToLibrary();
    }
  };

  const playTTS = () => {
    if (!activePractice) return;
    window.speechSynthesis.cancel(); // Stop any current speech
    
    if (isMuted) return; // Don't play if muted

    const utterance = new SpeechSynthesisUtterance(activePractice.transcript);
    utterance.lang = activePractice.languageCode;
    utterance.rate = 0.9; // Slightly slower for clearer pronunciation
    
    // Attempt to find a high-quality native voice
    const voices = window.speechSynthesis.getVoices();
    const nativeVoice = voices.find(v => v.lang.startsWith(activePractice.languageCode.split('-')[0]) && v.localService);
    if (nativeVoice) utterance.voice = nativeVoice;

    utterance.onstart = () => setIsPlayingTTS(true);
    utterance.onend = () => setIsPlayingTTS(false);
    utterance.onerror = () => setIsPlayingTTS(false);

    window.speechSynthesis.speak(utterance);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (!isMuted) {
      window.speechSynthesis.cancel();
      setIsPlayingTTS(false);
    }
  };

  const startShadowing = async () => {
    if (!recognitionRef.current) return alert('Speech recognition not supported in your browser.');
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setMediaStream(stream);
      setIsRecording(true);
      setUserTranscript('');
      setScore(null);
      
      recognitionRef.current.start();
      
      if (!isMuted) {
        playTTS();
      }
    } catch (err) {
      console.error(err);
      alert('Microphone access denied.');
    }
  };

  const stopShadowing = () => {
    setIsRecording(false);
    if (recognitionRef.current) recognitionRef.current.stop();
    window.speechSynthesis.cancel();
    setIsPlayingTTS(false);
    
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop());
      setMediaStream(null);
    }

    calculateScore();
  };

  const calculateScore = () => {
    if (!activePractice || !userTranscript) return;
    
    const originalWords = activePractice.transcript.toLowerCase().replace(/[^\w\s\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uac00-\ud7af]/g, '').split(/\s+/);
    const spokenWords = userTranscript.replace(/[^\w\s\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uac00-\ud7af]/g, '').split(/\s+/);
    
    let matchCount = 0;
    originalWords.forEach(word => {
      // Very basic loose matching
      if (spokenWords.some(w => w.includes(word) || word.includes(w))) matchCount++;
    });

    const finalScore = Math.min(Math.round((matchCount / originalWords.length) * 100), 100);
    setScore(finalScore);

    if (finalScore >= 80) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#AAF0D1', '#8F00FF', '#ffffff']
      });
      addProgress(5);
    }
  };

  const renderHighlightedTranscript = () => {
    if (!activePractice) return null;
    
    const originalWords = activePractice.transcript.split(/\s+/);
    const spokenWords = userTranscript.toLowerCase().replace(/[^\w\s\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uac00-\ud7af]/g, '').split(/\s+/);

    return (
      <>
        {originalWords.map((word, i) => {
          const cleanWord = word.toLowerCase().replace(/[^\w\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uac00-\ud7af]/g, '');
          const isMatched = spokenWords.some(w => w.includes(cleanWord) || cleanWord.includes(w));
          const isCurrent = isRecording;

          return (
            <span 
              key={i} 
              className={`mr-2 transition-colors duration-300 ${
                isMatched && isCurrent && cleanWord.length > 0
                  ? 'text-mint drop-shadow-[0_0_8px_rgba(170,240,209,0.8)]' 
                  : isCurrent && spokenWords.length > 0
                    ? 'text-red-400 drop-shadow-[0_0_5px_rgba(248,113,113,0.5)]'
                    : ''
              }`}
            >
              {word}
            </span>
          );
        })}
      </>
    );
  };

  const isAccurate = userTranscript.length > 0;

  return (
    <main className="flex min-h-screen p-4 md:p-8 gap-8 flex-col md:flex-row overflow-x-hidden">
      <div className="w-full md:w-64 flex-shrink-0">
        <Sidebar 
          language={language} 
          onLanguageChange={setLanguage} 
          totalWordsLearned={totalWordsLearned} 
        />
      </div>

      <div className="flex-1 flex flex-col gap-6 max-w-5xl mx-auto w-full min-w-0">
        {/* Header */}
        <div className="glass-card p-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Sparkles className="text-violet" /> Shadowing Lab
            </h2>
            <p className="text-sm text-gray-400 mt-1">Master native pronunciation by repeating along with our curated lessons.</p>
          </div>
          {activePractice && (
            <button 
              onClick={backToLibrary}
              className="bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2 border border-white/10 text-sm"
            >
              <ChevronLeft size={16} /> Back to Library
            </button>
          )}
        </div>

        {/* Library View */}
        {!activePractice && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PREDEFINED_PRACTICES.map((practice) => (
              <motion.div
                key={practice.id}
                whileHover={{ scale: 1.02, y: -5 }}
                className="glass-card p-6 cursor-pointer border border-white/5 hover:border-violet/50 transition-all group relative overflow-hidden"
                onClick={() => selectPractice(practice)}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-violet/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-violet/20 transition-colors" />
                
                <div className="flex justify-between items-start mb-4 relative z-10">
                  <div className="p-3 rounded-xl bg-white/5 group-hover:bg-violet/20 text-gray-400 group-hover:text-violet transition-colors">
                    <BookOpen size={24} />
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                    practice.difficulty === 'Beginner' ? 'bg-mint/20 text-mint' : 
                    practice.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' : 
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {practice.difficulty}
                  </span>
                </div>
                
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-mint transition-colors">{practice.title}</h3>
                  <p className="text-sm text-gray-400 mb-4">{practice.languageName}</p>
                  
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Flame size={14} className="text-violet" />
                    <span>{practice.slang.length} Slang Idioms</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Active Practice View */}
        {activePractice && (
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 min-w-0">
            
            {/* Left Column: Transcript & Controls */}
            <div className="lg:col-span-2 flex flex-col gap-6 min-w-0">
              
              {/* Transcript Box */}
              <div className="glass-card p-8 flex-1 overflow-y-auto max-h-[50vh] custom-scrollbar">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-6">Live Transcript</h3>
                <div className="text-xl leading-loose font-medium text-gray-300 break-words whitespace-pre-wrap">
                  {renderHighlightedTranscript()}
                </div>
                {activePractice.phoneticTranscript && (
                  <div className="mt-8 pt-6 border-t border-white/10">
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Phonetic Reading (ABC)</h4>
                    <p className="text-lg text-gray-400 font-medium leading-relaxed italic">
                      {activePractice.phoneticTranscript}
                    </p>
                  </div>
                )}
                {activePractice.translation && (
                  <div className={`pt-4 ${!activePractice.phoneticTranscript ? 'mt-8 border-t border-white/10' : ''}`}>
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Indonesian Translation</h4>
                    <p className="text-base text-gray-300 leading-relaxed">
                      {activePractice.translation}
                    </p>
                  </div>
                )}
              </div>

              {/* Audio & Shadowing Controls */}
              <div className="glass-card p-6 flex flex-col gap-6">
                
                <AudioVisualizer stream={mediaStream} isRecording={isRecording} isAccurate={isAccurate} />

                <div className="flex items-center justify-between flex-wrap gap-4">
                  {score !== null ? (
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-4">
                        <div className="text-4xl font-black">
                          <span className={score >= 80 ? 'text-mint drop-shadow-[0_0_10px_rgba(170,240,209,0.8)]' : score >= 50 ? 'text-yellow-400' : 'text-red-400'}>
                            {score}%
                          </span>
                        </div>
                        <div>
                          <p className="text-white font-medium">Accuracy Score</p>
                          <p className="text-sm text-gray-400">{score >= 80 ? '+5 Astro-Progress Earned!' : 'Keep practicing to hit 80%+'}</p>
                        </div>
                      </div>
                      
                      {/* Next Challenge Button */}
                      {score >= 80 && (
                        <button 
                          onClick={handleNextChallenge}
                          className="mt-2 bg-violet hover:bg-violet/90 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all hover:scale-105 shadow-[0_0_15px_rgba(143,0,255,0.4)] w-fit"
                        >
                          Next Challenge <ChevronLeft size={16} className="rotate-180" />
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={playTTS}
                        disabled={isPlayingTTS || isMuted}
                        className={`p-3 rounded-full transition-all ${isPlayingTTS ? 'bg-violet/50 text-white animate-pulse' : 'bg-white/5 text-gray-300 hover:bg-violet/30 hover:text-white'} ${isMuted ? 'opacity-50 cursor-not-allowed' : ''}`}
                        title="Listen to native pronunciation"
                      >
                        <Play size={20} fill={isPlayingTTS ? "currentColor" : "none"} />
                      </button>
                      <p className="text-sm text-gray-400">
                        {isPlayingTTS ? 'Listening to native speaker...' : 'Play pronunciation or hit record to start.'}
                      </p>
                    </div>
                  )}

                  {!isRecording ? (
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={toggleMute}
                        className={`p-4 rounded-full transition-colors border ${isMuted ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-white/5 text-gray-400 border-white/10 hover:text-white'}`}
                        title={isMuted ? "Audio Dinonaktifkan" : "Audio Aktif"}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          {isMuted ? (
                            <><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></>
                          ) : (
                            <><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></>
                          )}
                        </svg>
                      </button>
                      <button 
                        onClick={startShadowing}
                        className="bg-mint hover:bg-mint/90 text-black px-6 md:px-8 py-3 md:py-4 rounded-full font-bold flex items-center gap-2 transition-all hover:scale-105 click-pop shadow-[0_0_20px_rgba(170,240,209,0.4)]"
                      >
                        <Mic size={20} /> Start Shadowing
                      </button>
                    </div>
                  ) : (
                    <button 
                      onClick={stopShadowing}
                      className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 transition-all hover:scale-105 click-pop shadow-[0_0_20px_rgba(239,68,68,0.4)] animate-pulse"
                    >
                      <Square size={20} fill="currentColor" /> Stop
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Slang Detective */}
            <div className="flex flex-col gap-4 min-w-0">
              <div className="glass-card p-6 flex-1 overflow-y-auto max-h-[50vh] custom-scrollbar">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-6 flex items-center gap-2">
                  <Flame size={16} className="text-violet" /> Slang Detected
                </h3>
                
                {activePractice.slang && activePractice.slang.length > 0 ? (
                  <div className="space-y-3">
                    {activePractice.slang.map((slang, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedSlang(slang)}
                        className="w-full text-left p-4 rounded-xl bg-white/5 border border-white/5 hover:border-violet/50 hover:bg-violet/10 transition-colors group click-pop"
                      >
                        <p className="text-lg font-bold text-white group-hover:text-violet transition-colors">{slang.word}</p>
                        <p className="text-xs text-gray-400 mt-1 line-clamp-1">{slang.context}</p>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-gray-500 py-12">
                    <p>No slang or idioms detected.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedSlang && (
          <SlangDeepDive slang={selectedSlang} onClose={() => setSelectedSlang(null)} />
        )}
      </AnimatePresence>
    </main>
  );
}
