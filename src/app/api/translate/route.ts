import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'GEMINI_API_KEY is not set' }, { status: 500 });
    }

    const ai = new GoogleGenAI({ apiKey });
    const { words, language } = await req.json();

    if (!words || !Array.isArray(words) || !language) {
      return NextResponse.json({ error: 'Missing words array or language' }, { status: 400 });
    }

    const prompt = `Translate the following Indonesian words into ${language}: ${words.join(', ')}.
For each word, provide the following information in a JSON array format (in the exact same order as the input):
1. "word": The word for the object in the target language (${language}). Use appropriate characters (e.g., Kanji/Hiragana for Japanese).
2. "phonetic": The phonetic pronunciation of the word (Romaji, Pinyin, etc., or standard phonetic spelling for European languages).
3. "translation": The Indonesian translation of the object (this should be the original Indonesian word).
4. "phrase": A short, simple contextual phrase using the word in the target language.
5. "phrasePhonetic": The phonetic pronunciation of the phrase (Romaji, Pinyin, etc.).
6. "phraseTranslation": The Indonesian translation of the contextual phrase.

IMPORTANT: Return ONLY a valid JSON array of objects. Do not include markdown formatting like \`\`\`json.
Format:
[
  {
    "word": "...",
    "phonetic": "...",
    "translation": "...",
    "phrase": "...",
    "phrasePhonetic": "...",
    "phraseTranslation": "..."
  }
]`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      }
    });

    const text = response.text;
    
    if (!text) {
      throw new Error("No response from Gemini");
    }

    let cleanedText = text.trim();
    if (cleanedText.startsWith('```json')) {
      cleanedText = cleanedText.replace(/^```json/, '').replace(/```$/, '').trim();
    } else if (cleanedText.startsWith('```')) {
      cleanedText = cleanedText.replace(/^```/, '').replace(/```$/, '').trim();
    }

    const jsonResponse = JSON.parse(cleanedText);
    return NextResponse.json({ items: jsonResponse });

  } catch (error: any) {
    console.error('Gemini Translate API Error:', error);
    return NextResponse.json({ error: error.message || 'Failed to translate words' }, { status: 500 });
  }
}
