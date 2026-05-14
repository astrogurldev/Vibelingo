export interface Language {
  code: string;
  name: string;
  speechCode: string;
}

export const LANGUAGES: Language[] = [
  { code: 'id', name: 'Indonesian', speechCode: 'id-ID' },
  { code: 'ja', name: 'Japanese', speechCode: 'ja-JP' },
  { code: 'ko', name: 'Korean', speechCode: 'ko-KR' },
  { code: 'zh-CN', name: 'Chinese (Mandarin)', speechCode: 'zh-CN' },
  { code: 'en', name: 'English', speechCode: 'en-US' },
  { code: 'es', name: 'Spanish', speechCode: 'es-ES' },
  { code: 'fr', name: 'French', speechCode: 'fr-FR' },
  { code: 'de', name: 'German', speechCode: 'de-DE' },
  { code: 'it', name: 'Italian', speechCode: 'it-IT' },
  { code: 'pt', name: 'Portuguese', speechCode: 'pt-BR' },
  { code: 'ru', name: 'Russian', speechCode: 'ru-RU' },
  { code: 'ar', name: 'Arabic', speechCode: 'ar-SA' },
  { code: 'hi', name: 'Hindi', speechCode: 'hi-IN' },
  { code: 'th', name: 'Thai', speechCode: 'th-TH' },
  { code: 'vi', name: 'Vietnamese', speechCode: 'vi-VN' },
  { code: 'nl', name: 'Dutch', speechCode: 'nl-NL' },
  { code: 'pl', name: 'Polish', speechCode: 'pl-PL' },
  { code: 'tr', name: 'Turkish', speechCode: 'tr-TR' },
  { code: 'sv', name: 'Swedish', speechCode: 'sv-SE' },
  { code: 'el', name: 'Greek', speechCode: 'el-GR' },
  { code: 'ms', name: 'Malay', speechCode: 'ms-MY' },
  { code: 'tl', name: 'Filipino (Tagalog)', speechCode: 'fil-PH' },
];
