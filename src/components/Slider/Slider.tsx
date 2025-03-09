"use client";
import React, {
  useState,
  Children,
  ReactNode,
  useCallback,
  useEffect,
} from "react";
import Navigation from "./SliderNavigation";
import Indicators from "./SliderIndicator";

interface SliderProps {
  children: ReactNode;
  autoPlay?: boolean;
  interval?: number;
  direction?: "horizontal" | "vertical";
  itemsPerSlide?: number;
}

const Slider: React.FC<SliderProps> = ({
  children,
  autoPlay = true,
  interval = 3000,
  direction = "horizontal",
  itemsPerSlide = 2,
}) => {
  const slidesArray = Children.toArray(children);
  const totalSlides = slidesArray.length;
  const totalGroups = Math.ceil(totalSlides / itemsPerSlide);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalGroups);
  }, [totalGroups]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalGroups) % totalGroups);
  }, [totalGroups]);

  /****************  Auto-play functionality function *****************************/
  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(nextSlide, interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval, nextSlide]);

  /**************** Function to slice children into groups based on itemsPerSlide ****************/
  const groupedSlides = () => {
    const grouped = [];
    for (let i = 0; i < slidesArray.length; i += itemsPerSlide) {
      grouped.push(slidesArray.slice(i, i + itemsPerSlide));
    }
    return grouped;
  };

  const transformStyle =
    direction === "horizontal"
      ? { transform: `translateX(-${currentIndex * 100}%)` }
      : { transform: `translateY(-${currentIndex * 100}%)` };

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div
        className={`flex h-full ${
          direction === "vertical" ? "flex-col" : ""
        } transition-transform duration-500 ease-in-out`}
        style={transformStyle}
      >
        {groupedSlides().map((group, index) => (
          <div key={index} className="w-full h-full shrink-0 flex">
            {group.map((child, childIndex) => (
              <div key={childIndex} className="w-full h-full">
                {child}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Navigation component containing next and previous arrows */}
      <Navigation
        prevSlide={prevSlide}
        nextSlide={nextSlide}
        direction={direction}
      />

      {/* Indicator component containing dots */}
      <Indicators
        currentIndex={currentIndex}
        // slidesArray={slidesArray}
        groupedSlides={groupedSlides()}
        setCurrentIndex={setCurrentIndex}
        direction={direction}
      />
    </div>
  );
};

export default Slider;
