import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { APIProvider } from "@vis.gl/react-google-maps";

import "./index.css";
import App from "./App.jsx";
import CreateTrip from "./create-trip/index.jsx";
import Header from "./components/custom/Header.jsx";

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
    <APIProvider
      apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
      version="beta"
    >
      <Header />
      <RouterProvider router={router} />
    </APIProvider>
  </StrictMode>,
);
