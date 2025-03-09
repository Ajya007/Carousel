"use client";
import React, {
  useState,
  Children,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
} from "react";
import Navigation from "./SliderNavigation";
import Indicators from "./SliderIndicator";

interface SliderProps {
  children: ReactNode;
  autoPlay?: boolean;
  interval?: number;
  direction?: "horizontal" | "vertical";
  itemsPerSlide?: number;
  infinite: boolean;
}

const Slider: React.FC<SliderProps> = ({
  children,
  autoPlay = false,
  interval = 3000,
  direction = "vertical",
  itemsPerSlide = 1,
  infinite = true,
}) => {
  const slidesArray = Children.toArray(children);
  const totalSlides = slidesArray.length;
  const totalGroups = Math.ceil(totalSlides / itemsPerSlide);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startPos, setStartPos] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => {
      if (infinite) return (prev + 1) % totalGroups;
      return prev < totalGroups - 1 ? prev + 1 : prev;
    });
  }, [totalGroups, infinite]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => {
      if (infinite) return (prev - 1 + totalGroups) % totalGroups;
      return prev > 0 ? prev - 1 : prev;
    });
  }, [totalGroups, infinite]);

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

  /**************** Handle Swipe Gesture ****************/
  const handleTouchStart = (e: React.TouchEvent) => {
    setStartPos(
      direction === "horizontal" ? e.touches[0].clientX : e.touches[0].clientY
    );
    setIsDragging(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const endPos =
      direction === "horizontal"
        ? e.changedTouches[0].clientX
        : e.changedTouches[0].clientY;
    if (startPos - endPos > 50) nextSlide(); // Swipe left or up
    if (startPos - endPos < -50) prevSlide(); // Swipe right or down
    setIsDragging(false);
  };

  /**************** Handle Mouse Drag Gesture ****************/
  const handleMouseDown = (e: React.MouseEvent) => {
    setStartPos(direction === "horizontal" ? e.clientX : e.clientY);
    setIsDragging(true);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const endPos = direction === "horizontal" ? e.clientX : e.clientY;
    if (startPos - endPos > 50) nextSlide();
    if (startPos - endPos < -50) prevSlide();
    setIsDragging(false);
  };
  const transformStyle =
    direction === "horizontal"
      ? { transform: `translateX(-${currentIndex * 100}%)` }
      : { transform: `translateY(-${currentIndex * 100}%)` };

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
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
        groupedSlides={groupedSlides()}
        setCurrentIndex={setCurrentIndex}
        direction={direction}
      />
    </div>
  );
};

export default Slider;
