import React from "react";
import { Button } from "../ui/button";

const Header = () => {
  return (
    <header className="w-full shadow-sm bg-white">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Left Side */}
        <div className="flex items-center gap-3">
          <img
            src="/nextStop.png"
            alt="NextStop Logo"
            className="h-12 w-auto"
          />

          <h1 className="text-3xl font-extrabold tracking-tight">
            <span className="text-slate-900">next</span>
            <span className="bg-gradient-to-r from-cyan-500 to-teal-500 bg-clip-text text-transparent">
              Stop
            </span>
          </h1>
        </div>

        {/* Right Side */}
        <Button className="px-6 py-5 rounded-lg">Sign In</Button>
      </div>
    </header>
  );
};

export default Header;
