# nextStop — AI Trip Planner

An AI-powered trip planning web app that generates personalized, multi-day itineraries — complete with hotel recommendations, place-by-place plans, and real photos — based on your destination, budget, trip length, and travel group.

**Live App:** [next-stop-ai-trip-planner.vercel.app](https://next-stop-ai-trip-planner.vercel.app/)
**Repository:** [github.com/shubhamdhopat/nextStop-ai-trip-planner](https://github.com/shubhamdhopat/nextStop-ai-trip-planner)

---

## Screenshots



**Landing Page**

<img width="1462" height="734" alt="image" src="https://github.com/user-attachments/assets/d279042b-8503-47b6-afcd-71e6b9d7390e" />


**Trip Preferences Form**

<img width="1460" height="812" alt="image" src="https://github.com/user-attachments/assets/ece37fc0-afe6-4dcb-9e86-52ad93e4e90a" />


**Generated Itinerary**

<img width="1444" height="739" alt="image" src="https://github.com/user-attachments/assets/d7286a2b-7661-4fd0-a7d0-c13c95fa0ee5" />


**My Trips Dashboard**

<img width="1462" height="717" alt="image" src="https://github.com/user-attachments/assets/ff0a9398-e7fe-4f6c-936e-16226f80c64a" />


---

## Features

- 🔍 **Live destination search** — Google Places API (New) autocomplete with debounced search and place-details lookup, called directly via REST (no deprecated client libraries)
- 🤖 **AI-generated itineraries** — Google Gemini API generates a full multi-day plan (hotels, daily themes, places to visit, best time to visit, ticket pricing) based on destination, trip length, budget, and traveler type
- 🧩 **Structured, reliable AI output** — uses Gemini's `responseSchema` to enforce a strict, consistent JSON contract from the model, so the frontend can render AI output predictably without guessing at field names
- 🔐 **Google Sign-In** — OAuth-based authentication with persisted sessions
- 💾 **Saved trips** — trips are stored per-user in Firestore, with a dedicated "My Trips" dashboard to revisit past itineraries
- 🏨 **Real hotel & place photos** — fetched dynamically via the Google Places API, rather than relying on AI-generated image URLs
- 🗺️ **One-click map links** — every hotel and place links out to Google Maps for directions
- 📱 **Responsive design** — adapts across desktop and mobile, including a condensed mobile header

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React (Vite), Tailwind CSS, shadcn/ui |
| Routing | React Router |
| AI | Google Gemini API (`@google/genai`), structured output via `responseSchema` |
| Places Data | Google Places API (New) — REST endpoints |
| Auth | Google OAuth (`@react-oauth/google`) |
| Database | Firebase Firestore |
| Hosting | Vercel |

---

## Getting Started

### Prerequisites
- Node.js (v18+)
- A Google Cloud project with **Places API (New)** enabled and billing linked
- A Gemini API key from [Google AI Studio](https://aistudio.google.com)
- A Firebase project with Firestore and Google Authentication enabled

### Installation

```bash
git clone https://github.com/shubhamdhopat/nextStop-ai-trip-planner.git
cd nextStop-ai-trip-planner
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```
VITE_GOOGLE_PLACE_API_KEY=your_places_api_key
VITE_GOOGLE_GEMINI_AI_API_KEY=your_gemini_api_key
VITE_GOOGLE_AUTH_CLIENT_ID=your_google_oauth_client_id
```

Your Firebase project config (`src/service/FirebaseConfig.jsx`) should also be set up with your own project credentials.

> **Note:** `.env` is gitignored and should never be committed — see `.gitignore` for details.

### Run locally

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## Project Structure

```
src/
├── components/          # Shared UI components (Header, ui/ primitives)
├── create-trip/         # Trip preference form + destination search
├── view-trip/[tripId]/  # Generated itinerary view (info, hotels, places to visit)
├── my-trips/            # Saved trips dashboard
├── service/             # Firebase config, Gemini AI model, Places API wrapper
└── constants/           # Static options (budget, traveler types) and AI prompt schema
```

---

## Known Limitations

- Gemini's free tier can occasionally return `503 Service Unavailable` during high demand — the app does not currently auto-retry on this error
- Google Places API calls run client-side, meaning API keys are visible in the browser — acceptable for a personal/demo project, but a production version should proxy these through a backend
- Firestore security rules are currently permissive (test mode) and should be tightened before handling real user data at scale

---

## License

This project is for personal/educational purposes.
