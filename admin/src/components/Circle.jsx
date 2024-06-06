import React from "react";

const CircleEffect = () => {
  return (
    <div className="relative overflow-hidden w-40 h-40 mt-16 bg-blue-700 rounded-full">
      <div
        className="absolute bottom-0 left-1/2 w-full h-20 bg-slate-50"
        style={{ transform: "translateX(-50%) translateY(50%)" }}
      ></div>
      <div
        className="absolute bottom-0 left-1/2 w-full h-full bg-gradient-to-b from-blue-700 via-blue-700 to-transparent rounded-full"
        style={{ transform: "translateX(-50%)" }}
      ></div>
    </div>
  );
};

export default CircleEffect;
