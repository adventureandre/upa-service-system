import { NextRequest } from "next/server";
import { TextToSpeechClient, protos } from '@google-cloud/text-to-speech';
import { writeFileSync } from 'fs';
import { join } from 'path';

const client = new TextToSpeechClient({
  apiKey: process.env.GOOGLE_API_KEY,
});

export async function POST(request: NextRequest) {
  const text = await request.headers.get("text");

  if (!text) {
    return new Response(JSON.stringify({ message: 'Text is required' }), { status: 400 });
  }

  
  const requestVoice = {
    input: { text },
    voice: { languageCode: 'pt-BR', name: 'pt-BR-Neural2-B' },
    audioConfig: { audioEncoding: protos.google.cloud.texttospeech.v1.AudioEncoding.MP3, speakingRate: 1.0, pitch: -6 },
  };

  try {
    const [response] = await client.synthesizeSpeech(requestVoice);
    const filePath = join(process.cwd(), 'public', 'output.mp3');
    writeFileSync(filePath, response.audioContent as string, 'binary');

    // Retorne a URL do arquivo de áudio gerado
    return new Response(JSON.stringify({ message: 'Audio content written to file', filePath: '/output.mp3' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('ERROR:', error);
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
  }
}
