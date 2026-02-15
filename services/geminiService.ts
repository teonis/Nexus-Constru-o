import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeConstructionImage = async (base64Image: string, promptText?: string) => {
  try {
    const model = "gemini-2.5-flash-image"; // Optimized for images
    
    const parts = [
      {
        inlineData: {
          mimeType: "image/jpeg", // Assuming JPEG for simplicity in this demo
          data: base64Image
        }
      },
      {
        text: promptText || "Analise esta foto do canteiro de obras. Identifique riscos de segurança, estime a fase da obra (ex: fundação, estrutura, acabamento) e conte o número de trabalhadores visíveis se houver. Forneça a resposta em formato JSON estruturado com as chaves: 'safetyHazards' (array de strings), 'phase' (string), 'workerCount' (number), e 'summary' (string em português)."
      }
    ];

    const response = await ai.models.generateContent({
      model: model,
      contents: { parts },
      config: {
        responseMimeType: "application/json"
      }
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Falha ao analisar imagem. Verifique sua chave de API e tente novamente.");
  }
};