import { GoogleGenAI, Type } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const getSmartFoodRecommendations = async (query: string, availableCuisines: string[]): Promise<string[]> => {
  if (!ai) {
    console.warn("Gemini API Key missing. Returning default fallback.");
    // Fallback: simple keyword matching if no API key
    const lowerQuery = query.toLowerCase();
    return availableCuisines.filter(c => lowerQuery.includes(c.toLowerCase()) || c === 'All');
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `User is hungry and says: "${query}". 
      Available categories: ${availableCuisines.join(', ')}.
      Return a JSON array of strings containing ONLY the exact category names from the available list that best match the user's desire. 
      If unsure, return ["All"].`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
            type: Type.ARRAY,
            items: {
                type: Type.STRING
            }
        }
      }
    });

    const json = JSON.parse(response.text || '[]');
    return Array.isArray(json) ? json : ["All"];
  } catch (error) {
    console.error("Gemini API Error:", error);
    return ["All"];
  }
};
