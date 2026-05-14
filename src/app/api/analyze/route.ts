import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'GEMINI_API_KEY is not set' }, { status: 500 });
    }

    const ai = new GoogleGenAI({ apiKey });
    const { image, language } = await req.json();

    if (!image || !language) {
      return NextResponse.json({ error: 'Missing image or language' }, { status: 400 });
    }

    // Extract base64 data and mime type
    const base64Data = image.split(',')[1];
    const mimeType = image.split(';')[0].split(':')[1];

    const prompt = `Analyze this image and identify the clearly visible, distinct physical objects.
Only include objects that you can confidently draw an accurate, tight bounding box around. Do not guess locations.
IMPORTANT: Do NOT include multiple instances of the same type of object (e.g., if there are 3 chairs, only return 1 chair). Provide only ONE unique entry per object category.
For each object, provide the following information in a JSON array format:
1. "word": The word for the object in the target language (${language}). Use appropriate characters (e.g., Kanji/Hiragana for Japanese).
2. "phonetic": The phonetic pronunciation of the word (Romaji, Pinyin, etc., or standard phonetic spelling for European languages).
3. "translation": The Indonesian translation of the object (as the base language).
4. "phrase": A short, simple contextual phrase using the word in the target language.
5. "phrasePhonetic": The phonetic pronunciation of the phrase (Romaji, Pinyin, etc.).
6. "phraseTranslation": The Indonesian translation of the contextual phrase.
7. "box": A 2D bounding box tightly enclosing the object. Format MUST be exactly [ymin, xmin, ymax, xmax]. Values must be integers scaled from 0 to 1000 (where 0,0 is the top-left corner). ymin=top, xmin=left, ymax=bottom, xmax=right.

IMPORTANT: Return ONLY a valid JSON array of objects. Do not include markdown formatting like \`\`\`json.
Format:
[
  {
    "word": "...",
    "phonetic": "...",
    "translation": "...",
    "phrase": "...",
    "phrasePhonetic": "...",
    "phraseTranslation": "...",
    "box": [0, 0, 1000, 1000]
  }
]`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        prompt,
        {
          inlineData: {
            data: base64Data,
            mimeType: mimeType
          }
        }
      ],
      config: {
        responseMimeType: 'application/json',
      }
    });

    const text = response.text;
    
    let cleanedText = text.trim();
    if (cleanedText.startsWith('```json')) {
      cleanedText = cleanedText.replace(/^```json/, '').replace(/```$/, '').trim();
    } else if (cleanedText.startsWith('```')) {
      cleanedText = cleanedText.replace(/^```/, '').replace(/```$/, '').trim();
    }

    const jsonResponse = JSON.parse(cleanedText);
    return NextResponse.json({ items: jsonResponse });

  } catch (error: any) {
    console.error('Gemini API Error:', error);
    return NextResponse.json({ error: error.message || 'Failed to analyze image' }, { status: 500 });
  }
}
