import { NextRequest } from "next/server";
import { TextToSpeechClient, protos } from '@google-cloud/text-to-speech';

const client = new TextToSpeechClient({
  apiKey: process.env.GOOGLE_API_KEY,
});

export async function POST(request: NextRequest) {
  const {text} = await request.json();

  if (!text) {
    return new Response(JSON.stringify({ message: 'Text is required' }), { status: 400 });
  }

  
  const requestVoice = {
    input: { text },
    voice: { languageCode: 'pt-BR', name: 'pt-BR-Standard-B' },
    audioConfig: { audioEncoding: protos.google.cloud.texttospeech.v1.AudioEncoding.MP3, speakingRate: 1.0, pitch: -6 },
  };

  try {
    const [response] = await client.synthesizeSpeech(requestVoice);
   

  // Retorna o conteúdo do áudio no corpo da resposta
  return new Response(response.audioContent, {
    status: 200,
    headers: {
      'Content-Type': 'audio/mpeg', // Tipo de arquivo de áudio
      'Content-Disposition': 'inline; filename="PacienteName.mp3"', // Pode ser 'attachment' para download
    },
  });


  } catch (error) {
    console.error('ERROR:', error);
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
  }
}
