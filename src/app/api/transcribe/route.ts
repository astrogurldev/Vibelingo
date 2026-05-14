import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'GEMINI_API_KEY is not set' }, { status: 500 });
    }

    const ai = new GoogleGenAI({ apiKey });
    const { audioData, language } = await req.json();

    if (!audioData || !language) {
      return NextResponse.json({ error: 'Missing audio data or language' }, { status: 400 });
    }

    const base64Data = audioData.split(',')[1];
    const mimeType = audioData.split(';')[0].split(':')[1];

    const prompt = `You are a native ${language} linguistics expert. 
Listen to this audio and provide:
1. The exact, word-for-word transcript in ${language}.
2. Identify any cultural slang, idiomatic expressions, or interesting colloquialisms in the audio.
   For each slang/idiom, provide its origin/context and a "Gen-Z equivalent" (if applicable, or just a modern equivalent).

Return ONLY a JSON object in this exact format (no markdown formatting):
{
  "transcript": "The exact words spoken in the audio...",
  "slang": [
    {
      "word": "The slang phrase",
      "context": "Explanation of its meaning and cultural background in Indonesian",
      "genZ": "Modern equivalent or how young people say it in Indonesian (optional)"
    }
  ]
}`;

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
    console.error('Gemini Transcribe API Error:', error);
    let errorMessage = 'Failed to process audio';
    if (error.status === 429) {
      errorMessage = 'Whoops! Batas API (Rate Limit) tercapai. Silakan tunggu beberapa detik dan coba lagi.';
    } else if (error.status === 400 && error.message?.includes('payload too large')) {
      errorMessage = 'Ukuran file audio terlalu besar. Mohon unggah file yang lebih pendek.';
    } else if (error.message) {
      errorMessage = error.message;
    }
    return NextResponse.json({ error: errorMessage }, { status: error.status || 500 });
  }
}
