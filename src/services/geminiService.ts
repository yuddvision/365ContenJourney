import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface UGCRequest {
  contentNiche: string;
  contentTopic: string;
  targetAudience: string;
  platform: "tiktok" | "instagram" | "youtube";
  tone: "energetic" | "casual" | "professional" | "humorous";
  contentType: "script" | "hooks" | "ideas";
}

export async function generateUGCContent(request: UGCRequest) {
  const { contentNiche, contentTopic, targetAudience, platform, tone, contentType } = request;

  const systemInstruction = `Anda adalah seorang ahli strategi dan penulis skrip UGC (User Generated Content). 
  Tujuan Anda adalah membuat konten yang sangat menarik dan berpotensi viral bagi para kreator.
  Selalu berikan konten yang terasa autentik, bukan seperti iklan tradisional.
  Gunakan Bahasa Indonesia yang santai, natural, dan sesuai dengan tren media sosial saat ini.`;

  let prompt = "";

  if (contentType === "script") {
    prompt = `Buat skrip video UGC berdurasi 30-60 detik untuk niche: ${contentNiche}.
    Topik Konten: ${contentTopic}
    Target Audiens: ${targetAudience}
    Platform: ${platform}
    Nada Bicara: ${tone}
    
    Skrip harus mencakup:
    1. Hook yang kuat (3 detik pertama).
    2. Masalah/titik kesulitan (pain point).
    3. Solusi/Edukasi (berdasarkan topik).
    4. Fitur/manfaat utama.
    5. Panggilan untuk bertindak (CTA) yang jelas.
    6. Petunjuk visual untuk kreator.`;
  } else if (contentType === "hooks") {
    prompt = `Hasilkan 10 ide hook viral untuk niche ${contentNiche} dengan topik ${contentTopic} di ${platform}.
    Target Audiens: ${targetAudience}
    Nada Bicara: ${tone}
    
    Buat hook yang singkat, memicu rasa penasaran, dan membuat orang berhenti scrolling.`;
  } else {
    prompt = `Hasilkan 5 ide/sudut pandang konten UGC kreatif untuk niche ${contentNiche} dengan topik ${contentTopic} di ${platform}.
    Target Audiens: ${targetAudience}
    Nada Bicara: ${tone}
    
    Sertakan deskripsi singkat untuk setiap sudut pandang dan alasan mengapa itu akan berhasil untuk UGC.`;
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.8,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Error generating content:", error);
    throw new Error("Failed to generate content. Please try again.");
  }
}
