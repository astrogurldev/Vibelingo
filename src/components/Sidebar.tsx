import React, { useState, useRef, useEffect } from 'react';
import { Globe2, Search, ChevronDown, Camera, Mic } from 'lucide-react';
import { LANGUAGES } from '@/constants/languages';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarProps {
  language: string;
  onLanguageChange: (lang: string) => void;
  totalWordsLearned: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  language,
  onLanguageChange,
  totalWordsLearned,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname() || '/';

  const glowBase = 10;
  const glowMultiplier = 2;
  const currentGlow = Math.min(glowBase + totalWordsLearned * glowMultiplier, 50);

  const currentLanguageName = LANGUAGES.find(l => l.code === language)?.name || 'Select Language';

  const filteredLanguages = LANGUAGES.filter(lang => 
    lang.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="w-full md:w-64 glass-card p-6 flex flex-col gap-8 h-full">
      <div>
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-mint to-violet">
          VibeLingo
        </h1>
        <p className="text-sm text-gray-400 mt-1">Contextual Immersion</p>
      </div>

      <div className="flex flex-col gap-2">
        <Link href="/">
          <div className={`flex items-center gap-3 p-3 rounded-xl transition-colors cursor-pointer ${pathname === '/' ? 'bg-violet/20 text-white border border-violet/30' : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'}`}>
            <Camera size={20} className={pathname === '/' ? 'text-violet' : ''} />
            <span className="font-medium">Vision Portal</span>
          </div>
        </Link>
        <Link href="/shadowing">
          <div className={`flex items-center gap-3 p-3 rounded-xl transition-colors cursor-pointer ${pathname === '/shadowing' ? 'bg-mint/20 text-white border border-mint/30' : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'}`}>
            <Mic size={20} className={pathname === '/shadowing' ? 'text-mint' : ''} />
            <span className="font-medium">Shadowing Lab</span>
          </div>
        </Link>
      </div>

      <div className="flex-1 mt-4">
        <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
          Astro-Progress
        </h2>
        <div className="flex flex-col items-center justify-center p-4">
          <div
            className="relative rounded-full transition-shadow duration-1000"
            style={{
              boxShadow: `0 0 ${currentGlow}px ${currentGlow / 2}px rgba(170, 240, 209, 0.4)`,
            }}
          >
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-mint to-violet flex items-center justify-center">
              <Globe2 size={40} className="text-white drop-shadow-md" />
            </div>
          </div>
          <p className="mt-6 text-lg font-medium">
            <span className="text-mint">{totalWordsLearned}</span> Words Learned
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
          Vibe Switcher
        </h2>
        
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full flex items-center justify-between py-3 px-4 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
          >
            <span>{currentLanguageName}</span>
            <ChevronDown size={18} className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute left-0 right-0 bottom-full mb-2 z-[60] bg-[#121212] border border-white/20 rounded-xl overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.9)]"
              >
                <div className="p-2 border-b border-white/10 flex items-center gap-2 text-gray-400 px-3">
                  <Search size={16} />
                  <input
                    type="text"
                    placeholder="Search language..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent border-none outline-none text-white text-sm py-1 placeholder:text-gray-500"
                    autoFocus
                  />
                </div>
                <div className="max-h-60 overflow-y-auto custom-scrollbar">
                  {filteredLanguages.length > 0 ? (
                    filteredLanguages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          onLanguageChange(lang.code);
                          setIsDropdownOpen(false);
                          setSearchQuery('');
                        }}
                        className={`w-full text-left py-2 px-4 transition-colors ${
                          language === lang.code
                            ? 'bg-violet/30 text-mint'
                            : 'text-gray-300 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        {lang.name}
                      </button>
                    ))
                  ) : (
                    <div className="py-4 text-center text-sm text-gray-500">
                      No languages found
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
