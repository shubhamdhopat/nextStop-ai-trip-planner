import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const Hero = () => {
  return (
    <div className="flex flex-col items-center text-center px-4">
      <h1 className="text-4xl md:text-5xl font-bold text-[#14295b] mt-16">
        Discover Your Next Adventure with AI:
      </h1>

      <h2 className="text-4xl md:text-5xl font-bold text-[#08b7c9] mt-4">
        Personalized Itineraries at Your Fingertips
      </h2>

      <p className="text-lg text-gray-500 mt-8 max-w-3xl">
        Your personal trip planner and travel curator, creating custom
        itineraries tailored to your interests and budgets.
      </p>

      <Link to="/create-trip" className="mt-8">
        <Button className="px-6 py-6 text-base rounded-xl">
          Get Started, It's Free
        </Button>
      </Link>

      <img
        src="/landing.png"
        alt="AI Trip Planner Preview"
        className="w-[80%] max-w-5xl rounded-xl mt-20"
      />
    </div>
  );
};

export default Hero;
