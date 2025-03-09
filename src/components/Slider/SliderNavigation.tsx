"use client";
import React from "react";
interface NavigationProps {
  prevSlide: () => void;
  nextSlide: () => void;
  direction: "horizontal" | "vertical";
}

const Navigation: React.FC<NavigationProps> = ({
  prevSlide,
  nextSlide,
  direction,
}) => {
  return (
    <>
      <button
        className={`absolute ${
          direction === "horizontal"
            ? "top-1/2 left-4"
            : "top-4 left-1/2 transform -translate-x-1/2"
        } bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-700 transition`}
        onClick={prevSlide}
        aria-label="Previous Slide"
      >
        {direction === "horizontal" ? "◀" : "▲"}
      </button>
      <button
        className={`absolute ${
          direction === "horizontal"
            ? "top-1/2 right-4"
            : "bottom-4 left-1/2 transform -translate-x-1/2"
        } bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-700 transition`}
        onClick={nextSlide}
        aria-label="Next Slide"
      >
           {direction === "horizontal" ? "▶" : "▼"}
         
      </button>
    </>
  );
};

export default Navigation;
