import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'GEMINI_API_KEY is not set' }, { status: 500 });
    }

    const ai = new GoogleGenAI({ apiKey });
    const { message, history, vocabulary, language } = await req.json();

    if (!message || !language) {
      return NextResponse.json({ error: 'Missing message or language' }, { status: 400 });
    }

    const vocabList = vocabulary && vocabulary.length > 0 
      ? vocabulary.map((v: any) => `${v.word} (${v.translation})`).join(', ')
      : 'none';

    const systemPrompt = `You are "Vibe Tutor", a smart, friendly, and highly versatile AI language tutor.
Base language of the student is Indonesian. The currently selected target language is ${language}.
The student has recently scanned and learned the following words: [${vocabList}].
You are a general language assistant. Do NOT force the student to practice if they just want to ask questions.
If the student asks a general question (e.g. "is this translation correct?", "what is the difference between X and Y?"), answer them clearly in Indonesian.
You can discuss ANY language, answer translation questions, and explain grammar.
Keep your responses relatively short, conversational, and encouraging! Do NOT write long essays.`;

    // Convert history to Gemini format
    const contents = history.map((msg: any) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));

    // Add current message
    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: contents,
      config: {
        systemInstruction: systemPrompt,
      }
    });

    return NextResponse.json({ reply: response.text });
  } catch (error: any) {
    console.error('Gemini Chat API Error:', error);
    let errorMessage = 'Failed to get response';
    if (error.status === 429) {
      errorMessage = 'Whoops! Kecepatan ngobrolmu terlalu tinggi. Tunggu beberapa detik (Batas API Gratis).';
    } else if (error.message) {
      errorMessage = error.message;
    }
    return NextResponse.json({ error: errorMessage }, { status: error.status || 500 });
  }
}
