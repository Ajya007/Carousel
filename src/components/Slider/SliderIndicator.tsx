import React from "react";

interface IndicatorsProps {
  currentIndex: number;
  slidesArray: React.ReactNode[];
  setCurrentIndex: (index: number) => void;
}

const Indicators: React.FC<IndicatorsProps> = ({ currentIndex, slidesArray, setCurrentIndex }) => {
  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
      {slidesArray.map((_, index) => (
        <button
          key={index}
          onClick={() => setCurrentIndex(index)}
          className={`w-3 h-3 rounded-full transition-all duration-300 ${
            currentIndex === index ? "bg-white scale-125" : "bg-gray-400"
          }`}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
};

export default Indicators;