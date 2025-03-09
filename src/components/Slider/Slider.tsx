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
}

const Slider: React.FC<SliderProps> = ({
  children,
  autoPlay = true,
  interval = 3000,
}) => {
  const slidesArray = Children.toArray(children);
  const totalSlides = slidesArray.length;

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  /****************  Auto-play functionality function *****************************/
  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(nextSlide, interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval, nextSlide]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div
        className="flex h-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slidesArray.map((child, index) => (
          <div key={index} className="w-full shrink-0">
            {child}
          </div>
        ))}
      </div>

      {/* Navigation component containing next and previous arrows */}
      <Navigation prevSlide={prevSlide} nextSlide={nextSlide} />

      {/* Indicator component containing dots */}
      <Indicators
        currentIndex={currentIndex}
        slidesArray={slidesArray}
        setCurrentIndex={setCurrentIndex}
      />
    </div>
  );
};

export default Slider;
