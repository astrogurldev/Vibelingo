import { LANGUAGES } from '@/constants/languages';

export const speakText = (text: string, languageCode: string) => {
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    console.error('Speech synthesis not supported');
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);

  const langObj = LANGUAGES.find(l => l.code === languageCode);
  utterance.lang = langObj ? langObj.speechCode : 'en-US';
  
  utterance.rate = 0.9; // Slightly slower for language learning
  utterance.pitch = 1.0;

  window.speechSynthesis.speak(utterance);
};
