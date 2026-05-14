import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'GEMINI_API_KEY is not set' }, { status: 500 });
    }

    const ai = new GoogleGenAI({ apiKey });
    const { image, targetWord, language } = await req.json();

    if (!image || !targetWord || !language) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    const base64Data = image.split(',')[1];
    const mimeType = image.split(';')[0].split(':')[1];

    const prompt = `You are a strict but encouraging calligraphy/handwriting teacher for ${language}.
The student was asked to write the word/character: "${targetWord}".
Analyze the provided image of their handwritten stroke. 
Evaluate it on a scale of 0 to 100 based on legibility, accuracy of strokes, and proportions.

Return ONLY a JSON object in this exact format, with no markdown formatting:
{
  "score": 85,
  "feedback": "Your strokes are good but the left part is a bit too wide. Keep practicing!"
}
The feedback must be in Indonesian.`;

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
    return NextResponse.json(jsonResponse);

  } catch (error: any) {
    console.error('Gemini Grade API Error:', error);
    return NextResponse.json({ error: error.message || 'Failed to grade writing' }, { status: 500 });
  }
}
