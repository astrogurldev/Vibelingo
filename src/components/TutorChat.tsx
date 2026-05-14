import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { VocabularyItem } from './VocabularyCard';

interface Message {
  role: 'user' | 'model';
  text: string;
}

interface TutorChatProps {
  language: string;
  vocabularyItems: VocabularyItem[];
}

export default function TutorChat({ language, vocabularyItems }: TutorChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: `Halo! Saya Vibe Tutor. Mari praktikkan kosakata ${language} yang baru saja kamu temukan!` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    const newHistory = [...messages];
    
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          history: newHistory.filter(m => m.role !== 'model' || m.text !== `Halo! Saya Vibe Tutor. Mari praktikkan kosakata ${language} yang baru saja kamu temukan!`), // Filter out initial greeting from history to save context length if needed, or keep it.
          vocabulary: vocabularyItems,
          language
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to chat');

      setMessages(prev => [...prev, { role: 'model', text: data.reply }]);
    } catch (err: any) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'model', text: `Error: ${err.message}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        className="fixed bottom-6 right-6 w-14 h-14 bg-violet rounded-full flex items-center justify-center shadow-lg shadow-violet/20 hover:scale-105 transition-transform z-40 click-pop"
        onClick={() => setIsOpen(true)}
        initial={{ scale: 0 }}
        animate={{ scale: isOpen ? 0 : 1 }}
      >
        <MessageCircle size={24} className="text-white" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 right-6 w-[350px] h-[500px] max-h-[80vh] flex flex-col bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-violet/20 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-violet flex items-center justify-center">
                  <Bot size={18} className="text-white" />
                </div>
                <div>
                  <h3 className="text-white font-medium text-sm">Vibe Tutor</h3>
                  <p className="text-xs text-mint">Online</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex items-end gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-mint' : 'bg-violet'}`}>
                    {msg.role === 'user' ? <User size={12} className="text-black" /> : <Bot size={12} className="text-white" />}
                  </div>
                  <div 
                    className={`max-w-[75%] p-3 rounded-2xl text-sm ${
                      msg.role === 'user' 
                        ? 'bg-mint text-black rounded-br-sm' 
                        : 'bg-white/10 text-gray-200 rounded-bl-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-end gap-2">
                  <div className="w-6 h-6 rounded-full bg-violet flex items-center justify-center shrink-0">
                    <Bot size={12} className="text-white" />
                  </div>
                  <div className="p-3 rounded-2xl rounded-bl-sm bg-white/10 text-gray-200 text-sm flex gap-1">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-3 border-t border-white/10 bg-black/50">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ketik balasanmu..."
                  className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-4 pr-10 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-violet focus:ring-1 focus:ring-violet transition-all"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-1 w-8 h-8 flex items-center justify-center bg-violet text-white rounded-full disabled:opacity-50 disabled:bg-gray-700 hover:scale-105 transition-transform click-pop"
                >
                  <Send size={14} className="ml-[-1px]" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
