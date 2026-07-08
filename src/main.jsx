import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { APIProvider } from "@vis.gl/react-google-maps";
import { GoogleOAuthProvider } from "@react-oauth/google";

import "./index.css";
import App from "./App.jsx";
import CreateTrip from "./create-trip/index.jsx";
import Header from "./components/custom/Header.jsx";
import { Toaster } from "sonner";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/create-trip",
    element: <CreateTrip />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <APIProvider
        apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
        version="beta"
      >
        <Header />
        <Toaster />
        <RouterProvider router={router} />
      </APIProvider>
    </GoogleOAuthProvider>
  </StrictMode>,
);
