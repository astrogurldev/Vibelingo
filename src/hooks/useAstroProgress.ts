import { useState, useEffect } from 'react';
import { supabase, getUserId } from '@/lib/supabase';

export function useAstroProgress() {
  const [totalWordsLearned, setTotalWordsLearned] = useState(0);

  useEffect(() => {
    const fetchProgress = async () => {
      const userId = getUserId();
      if (!userId) return;

      // First check local storage as fallback/initial value
      const savedLocal = localStorage.getItem('vibeLingoProgress');
      if (savedLocal) {
        setTotalWordsLearned(parseInt(savedLocal, 10));
      }

      // Fetch from Supabase
      const { data, error } = await supabase
        .from('user_progress')
        .select('total_words_learned')
        .eq('user_id', userId)
        .single();

      if (data && !error) {
        setTotalWordsLearned(data.total_words_learned);
        // Sync back to local storage
        localStorage.setItem('vibeLingoProgress', data.total_words_learned.toString());
      } else if (error && error.code === 'PGRST116') {
        // Record not found, create it with local progress or 0
        const initialProgress = savedLocal ? parseInt(savedLocal, 10) : 0;
        await supabase
          .from('user_progress')
          .insert([{ user_id: userId, total_words_learned: initialProgress }]);
        setTotalWordsLearned(initialProgress);
      }
    };

    fetchProgress();
  }, []);

  const addProgress = async (amount: number) => {
    const userId = getUserId();
    if (!userId) return;

    setTotalWordsLearned((prev) => {
      const newTotal = prev + amount;
      localStorage.setItem('vibeLingoProgress', newTotal.toString());
      
      // Sync to Supabase in the background
      supabase
        .from('user_progress')
        .update({ total_words_learned: newTotal })
        .eq('user_id', userId)
        .then(({ error }) => {
          if (error) console.error("Failed to sync progress to Supabase:", error);
        });

      return newTotal;
    });
  };

  return { totalWordsLearned, addProgress };
}
