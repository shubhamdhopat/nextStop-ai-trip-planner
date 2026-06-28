import React from "react";
import { Button } from "../ui/button";

const Hero = () => {
  return (
    <div className="flex flex-col items-center mx-56 gap-9">
      <h1 className="font-extrabold text-[50px] text-center mt-16 ">
        <span className="text-[#0B1F4D]">
          Discover Your Next Adventure with AI:
        </span>
        <br></br>
        <span className="bg-gradient-to-r from-cyan-500 to-teal-500 bg-clip-text text-transparent">
          Personalized Itineraries at Your Fingertips
        </span>
      </h1>
      <p className="text-xl text-slate-500 text-center">
        Your personal trip planner and travel curator, creating custom
        itineraries tailored to your interests and budgets.
      </p>
      <Button className="px-6 py-6 text-base rounded-xl">
        Get Started, It's Free
      </Button>
    </div>
  );
};

export default Hero;
