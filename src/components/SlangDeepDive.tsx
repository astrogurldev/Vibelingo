import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Flame } from 'lucide-react';

export interface SlangItem {
  word: string;
  context: string;
  genZ?: string;
}

interface SlangDeepDiveProps {
  slang: SlangItem;
  onClose: () => void;
}

export const SlangDeepDive: React.FC<SlangDeepDiveProps> = ({ slang, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="w-full max-w-md bg-[#121212] border border-violet/30 rounded-2xl shadow-[0_0_50px_rgba(143,0,255,0.2)] overflow-hidden relative"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet to-mint" />
        
        <div className="p-6">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white rounded-full bg-white/5 transition-colors"
          >
            <X size={18} />
          </button>
          
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-violet/20 flex items-center justify-center text-violet">
              <Flame size={24} />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Slang Deep Dive</h2>
              <h3 className="text-2xl font-bold text-white leading-none mt-1">{slang.word}</h3>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white/5 p-4 rounded-xl border border-white/5">
              <p className="text-sm text-gray-300 leading-relaxed">
                <span className="font-semibold text-mint block mb-1">Konteks & Makna:</span>
                {slang.context}
              </p>
            </div>
            
            {slang.genZ && (
              <div className="bg-violet/10 p-4 rounded-xl border border-violet/20">
                <p className="text-sm text-gray-300 leading-relaxed">
                  <span className="font-semibold text-violet block mb-1">Gen-Z Equivalent:</span>
                  "{slang.genZ}"
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
