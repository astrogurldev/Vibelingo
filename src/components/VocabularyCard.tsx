import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2, PenTool } from 'lucide-react';
import { speakText } from '@/utils/speech';
import WritingCanvas from './WritingCanvas';

export interface VocabularyItem {
  word: string;
  phonetic: string;
  translation: string;
  phrase: string;
  phrasePhonetic?: string;
  phraseTranslation?: string;
  box?: [number, number, number, number];
}

interface VocabularyCardProps {
  item: VocabularyItem;
  language: string;
  index: number;
}

export const VocabularyCard: React.FC<VocabularyCardProps> = ({ item, language, index }) => {
  const [isWritingMode, setIsWritingMode] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.15 }}
        className="glass-card p-6 relative overflow-hidden group hover:border-mint/50 transition-colors flex flex-col"
      >
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-mint to-violet" />
        
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-mint transition-colors">
              {item.word}
            </h3>
            <p className="text-sm text-mint font-mono">{item.phonetic}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setIsWritingMode(true)}
              className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-mint hover:text-white transition-colors click-pop"
              title="Practice Writing (Zen Canvas)"
            >
              <PenTool size={20} />
            </button>
            <button
              onClick={() => speakText(item.word, language)}
              className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-violet hover:text-mint transition-colors click-pop"
              title="Listen to pronunciation"
            >
              <Volume2 size={20} />
            </button>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-white/10 flex-1">
          <p className="text-lg font-medium text-gray-200 mb-2">{item.translation}</p>
          
          <div className="flex items-start justify-between gap-4 bg-black/20 p-3 rounded-lg border border-white/5">
            <div className="flex-1">
              <p className="text-sm text-mint/90 italic leading-relaxed">"{item.phrase}"</p>
              {item.phrasePhonetic && (
                <p className="text-xs text-mint/60 font-mono mt-1 mb-2">{item.phrasePhonetic}</p>
              )}
              {item.phraseTranslation && (
                <p className="text-xs text-gray-400">{item.phraseTranslation}</p>
              )}
            </div>
            <button
              onClick={() => speakText(item.phrase, language)}
              className="p-2 mt-1 rounded-full bg-white/5 hover:bg-violet/20 text-violet transition-colors shrink-0 click-pop"
              title="Listen to phrase"
            >
              <Volume2 size={16} />
            </button>
          </div>
        </div>
      </motion.div>

      <WritingCanvas 
        isOpen={isWritingMode}
        onClose={() => setIsWritingMode(false)}
        targetWord={item.word}
        language={language}
        translation={item.translation}
      />
    </>
  );
};
export default VocabularyCard;
