import { useState, useRef, useEffect } from "react";
import { Input } from "../components/ui/input.jsx";

// Destination autocomplete using the Places API (New) REST endpoints directly.
// No beta widgets, no google.maps.importLibrary — just fetch().
//
// Requires in your .env:
//   VITE_GOOGLE_PLACE_API_KEY=AIzaSy...
//
// Requires in Google Cloud Console -> APIs & Services -> Enabled APIs:
//   Places API (New)   <-- must be this one, not the legacy "Places API"

const API_KEY = import.meta.env.VITE_GOOGLE_PLACE_API_KEY;

function DestinationSearch({ onSelect }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef(null);
  const sessionTokenRef = useRef(crypto.randomUUID());

  useEffect(() => {
    if (!query || query.length < 2) {
      setSuggestions([]);
      return;
    }

    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetchSuggestions(query);
    }, 300); // debounce so we don't fire a request per keystroke

    return () => clearTimeout(debounceRef.current);
  }, [query]);

  async function fetchSuggestions(input) {
    setLoading(true);
    try {
      const res = await fetch(
        "https://places.googleapis.com/v1/places:autocomplete",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": API_KEY,
          },
          body: JSON.stringify({
            input,
            sessionToken: sessionTokenRef.current,
          }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        // This is the important part: log the ACTUAL reason, not just "403"
        console.error("Places Autocomplete error:", data.error);
        setSuggestions([]);
        return;
      }

      const results =
        data.suggestions?.map((s) => ({
          placeId: s.placePrediction.placeId,
          text: s.placePrediction.text.text,
        })) ?? [];

      setSuggestions(results);
      setShowDropdown(true);
    } catch (err) {
      console.error("Network error calling Places Autocomplete:", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleSelect(suggestion) {
    setQuery(suggestion.text);
    setShowDropdown(false);

    try {
      const res = await fetch(
        `https://places.googleapis.com/v1/places/${suggestion.placeId}`,
        {
          method: "GET",
          headers: {
            "X-Goog-Api-Key": API_KEY,
            "X-Goog-FieldMask": "id,displayName,formattedAddress,location",
          },
        },
      );

      const place = await res.json();

      if (!res.ok) {
        console.error("Place Details error:", place.error);
        return;
      }

      onSelect?.({
        placeId: place.id,
        name: place.displayName?.text,
        address: place.formattedAddress,
        location: place.location,
      });

      sessionTokenRef.current = crypto.randomUUID();
    } catch (err) {
      console.error("Network error fetching place details:", err);
    }
  }

  return (
    <div className="relative w-full">
      <Input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => suggestions.length > 0 && setShowDropdown(true)}
        onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
        placeholder="Search destination..."
        // className="h-12 text-base px-4"
      />

      {loading && (
        <div className="absolute right-3 top-2.5 text-sm text-gray-400">
          ...
        </div>
      )}

      {showDropdown && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border rounded-lg mt-1 shadow-lg max-h-64 overflow-y-auto">
          {suggestions.map((s) => (
            <li
              key={s.placeId}
              onMouseDown={() => handleSelect(s)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
            >
              {s.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DestinationSearch;
