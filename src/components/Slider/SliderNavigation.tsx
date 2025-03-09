import React from "react";

interface NavigationProps {
  prevSlide: () => void;
  nextSlide: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ prevSlide, nextSlide }) => {
  return (
    <>
      {/* Previous Button */}
      <button
        className="absolute top-1/2 left-4 bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-700 transition"
        onClick={prevSlide}
        aria-label="Previous Slide"
      >
        ◀
      </button>
      {/* Next Button */}
      <button
        className="absolute top-1/2 right-4 bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-700 transition"
        onClick={nextSlide}
        aria-label="Next Slide"
      >
        ▶
      </button>
    </>
  );
};

export default Navigation;
