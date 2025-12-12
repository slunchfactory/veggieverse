import { GoogleGenAI, Type, Schema } from "@google/genai";
import { VegetableDetail } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const detailSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    name: { type: Type.STRING },
    scientificName: { type: Type.STRING },
    description: { type: Type.STRING },
    funFact: { type: Type.STRING },
    bestSeason: { type: Type.STRING },
    simpleRecipe: {
      type: Type.OBJECT,
      properties: {
        title: { type: Type.STRING },
        ingredients: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        },
        steps: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      },
      required: ["title", "ingredients", "steps"]
    }
  },
  required: ["name", "scientificName", "description", "funFact", "bestSeason", "simpleRecipe"]
};

export const fetchVegetableDetails = async (vegetableName: string): Promise<VegetableDetail> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Provide detailed information and a simple recipe for the vegetable: ${vegetableName}. Make it sound gourmet yet accessible.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: detailSchema,
        systemInstruction: "You are a world-class chef and botanist. Provide interesting facts and delicious, simple recipes.",
      },
    });

    const text = response.text;
    if (!text) throw new Error("No data returned");
    
    return JSON.parse(text) as VegetableDetail;
  } catch (error) {
    console.error("Error fetching vegetable details:", error);
    // Fallback data in case of API failure or quota limits
    return {
      name: vegetableName,
      scientificName: "Vegetabilis Genericus",
      description: "A delicious vegetable waiting to be cooked. (AI unavailable)",
      funFact: "Vegetables are good for you!",
      bestSeason: "Year-round",
      simpleRecipe: {
        title: "Simple Sauté",
        ingredients: ["Oil", "Salt", vegetableName],
        steps: ["Heat oil", "Add vegetable", "Cook until tender"]
      }
    };
  }
};