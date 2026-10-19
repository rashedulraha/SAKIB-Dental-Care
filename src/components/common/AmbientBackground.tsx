"use client";

import React from "react";

export const AmbientBackground: React.FC = () => {
  return (
    <div className="ambient-canvas" aria-hidden="true">
      <div className="orb w-[420px] h-[420px] bg-sky-400/60 top-[-8%] left-[-6%] animate-float-slow" />
      <div className="orb w-[500px] h-[500px] bg-teal-300/50 top-[18%] right-[-10%] animate-float-delayed" />
      <div className="orb w-[380px] h-[380px] bg-rose-400/35 bottom-[15%] left-[8%] animate-float-slow" />
      <div className="orb w-[460px] h-[460px] bg-indigo-400/45 bottom-[-10%] right-[12%] animate-float-delayed" />
    </div>
  );
};
