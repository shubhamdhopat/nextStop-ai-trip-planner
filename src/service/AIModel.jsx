import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY,
});

// This schema FORCES Gemini's output to match this exact shape and
// exact field names every single time - not just "please use these
// names" in the prompt, but an actual structural constraint the API
// enforces during generation. This is the real fix for the field-
// casing/naming inconsistency you've been hitting.
const tripResponseSchema = {
  type: Type.OBJECT,
  properties: {
    hotels: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          hotelName: { type: Type.STRING },
          hotelAddress: { type: Type.STRING },
          price: { type: Type.STRING },
          hotelImageUrl: { type: Type.STRING },
          geoCoordinates: {
            type: Type.OBJECT,
            properties: {
              lat: { type: Type.NUMBER },
              lng: { type: Type.NUMBER },
            },
            required: ["lat", "lng"],
          },
          rating: { type: Type.NUMBER },
          description: { type: Type.STRING },
        },
        required: [
          "hotelName",
          "hotelAddress",
          "price",
          "hotelImageUrl",
          "geoCoordinates",
          "rating",
          "description",
        ],
      },
    },
    itinerary: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          day: { type: Type.INTEGER },
          theme: { type: Type.STRING },
          plan: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                placeName: { type: Type.STRING },
                placeDetails: { type: Type.STRING },
                placeImageUrl: { type: Type.STRING },
                geoCoordinates: {
                  type: Type.OBJECT,
                  properties: {
                    lat: { type: Type.NUMBER },
                    lng: { type: Type.NUMBER },
                  },
                  required: ["lat", "lng"],
                },
                ticketPricing: { type: Type.STRING },
                rating: { type: Type.NUMBER },
                bestTimeToVisit: { type: Type.STRING },
                timeToTravel: { type: Type.STRING },
              },
              required: [
                "placeName",
                "placeDetails",
                "placeImageUrl",
                "geoCoordinates",
                "ticketPricing",
                "rating",
                "bestTimeToVisit",
                "timeToTravel",
              ],
            },
          },
        },
        required: ["day", "theme", "plan"],
      },
    },
  },
  required: ["hotels", "itinerary"],
};

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
  responseSchema: tripResponseSchema,
};

export function createChatSession() {
  return ai.chats.create({
    model: "gemini-2.5-flash",
    config: generationConfig,
  });
}
