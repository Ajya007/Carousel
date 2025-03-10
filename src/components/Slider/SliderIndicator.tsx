"use client";
import React from "react";
interface IndicatorsProps {
  currentIndex: number;
  groupedSlides: React.ReactNode[][];
  setCurrentIndex: (index: number) => void;
  direction: "horizontal" | "vertical";
}

const Indicators: React.FC<IndicatorsProps> = ({
  currentIndex,
  groupedSlides,
  setCurrentIndex,
  direction,
}) => {
  return (
    <div
      className={`absolute ${
        direction === "horizontal"
          ? "bottom-4 left-1/2 transform -translate-x-1/2"
          : "top-1/2 right-4 transform -translate-y-1/2"
      } flex ${direction === "vertical" ? "flex-col gap-2" : "gap-2"}`}
    >
      {groupedSlides.map((_, index) => (
        <button
          key={index}
          onClick={() => setCurrentIndex(index)}
          className={`w-3 h-3 rounded-full transition-all duration-300 ease-in-out ${
            currentIndex === index ? "bg-lime-400 scale-125" : "bg-gray-400"
          }`}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
};

export default Indicators;
