"use client";
import Slider from "@/components/Slider/Slider";
import useStore from "@/store/store";
import { generateRandomColor } from "@/utils/utils";
import { useEffect } from "react";

export default function Home() {
  const { data, loading, fetchData } = useStore();

  useEffect(() => {
    fetchData("https://jsonplaceholder.typicode.com/users");
  }, [fetchData]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 px-6 md:px-8 py-12">
      <header>
        <div className="flex flex-col items-center text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-secondary mb-4">
            Custom Slider for Seamless Navigation
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl ">
            Enhance user engagement with a smooth and interactive slider
            experience.
          </p>
        </div>
      </header>
      <section>
        <div className="flex flex-col items-center text-center mb-2  bg-zinc-400 p-4">
          <p className="text-lg md:text-xl text-gray-800 max-w-2xl ">
            Horizontal Slider
          </p>
        </div>
        <div className="mx-auto w-full h-80">
          <Slider>
            <div className="slide bg-red-500">Slide 1</div>
            <div className="slide bg-blue-500">Slide 2</div>
            <div className="slide bg-green-500">Slide 3</div>
            <div className="slide bg-red-500">Slide 4</div>
            <div className="slide bg-blue-500">Slide 5</div>
            <div className="slide bg-green-500">Slide 6</div>
          </Slider>
        </div>
      </section>

      <section>
        <div className="flex flex-col items-center text-center mb-2 bg-zinc-400 p-4">
          <p className="text-lg md:text-xl text-gray-800 max-w-2xl">
            Vertical Slider
          </p>
        </div>
        <div className="mx-auto w-full h-80">
          <Slider direction="vertical">
            <div className="slide bg-red-500">Slide 1</div>
            <div className="slide bg-blue-500">Slide 2</div>
            <div className="slide bg-green-500">Slide 3</div>
            <div className="slide bg-red-500">Slide 4</div>
            <div className="slide bg-blue-500">Slide 5</div>
            <div className="slide bg-green-500">Slide 6</div>
          </Slider>
        </div>
      </section>

      <section>
        <div className="flex flex-col items-center text-center mb-2 bg-zinc-400 p-4">
          <p className="text-lg md:text-xl text-gray-800 max-w-2xl">
            2 Items Per Slide
          </p>
        </div>
        <div className="mx-auto w-full h-80">
          <Slider itemsPerSlide={2}>
            <div className="slide bg-red-500">Slide 1</div>
            <div className="slide bg-blue-500">Slide 2</div>
            <div className="slide bg-green-500">Slide 3</div>
            <div className="slide bg-red-500">Slide 4</div>
            <div className="slide bg-blue-500">Slide 5</div>
            <div className="slide bg-green-500">Slide 6</div>
          </Slider>
        </div>
      </section>

      <section>
        <div className="flex flex-col items-center text-center mb-2 bg-zinc-400 p-4">
          <p className="text-lg md:text-xl text-gray-800 max-w-2xl">
            Auto Play Slide
          </p>
        </div>
        <div className="mx-auto w-full h-80">
          <Slider autoPlay={true}>
            <div className="slide bg-red-500">Slide 1</div>
            <div className="slide bg-blue-500">Slide 2</div>
            <div className="slide bg-green-500">Slide 3</div>
            <div className="slide bg-red-500">Slide 4</div>
            <div className="slide bg-blue-500">Slide 5</div>
            <div className="slide bg-green-500">Slide 6</div>
          </Slider>
        </div>
      </section>

      {loading ? (
        <p className="text-lg md:text-xl text-gray-800 max-w-2xl">Loading</p>
      ) : data ? (
        <section>
          <div className="flex flex-col items-center text-center mb-2 bg-zinc-400 p-4">
            <p className="text-lg md:text-xl text-gray-800 max-w-2xl">
              Json Placeholder Data Shown.
            </p>
          </div>
          <div className="mx-auto w-full h-80">
            <Slider>
              {data.map((item, i) => (
                <div
                key={i}
                  className="slide flex justify-center flex-col items-center"
                  style={{
                    backgroundColor: generateRandomColor(),
                    color: "black",
                  }}
                >
                  <p>Slide {i + 1}</p>
                  <p>{item.name} </p>
                </div>
              ))}
            </Slider>
          </div>
        </section>
      ) : (
        <p className="text-lg md:text-xl text-gray-800 max-w-2xl">No Data Found</p>
      )}

      <footer className="w-full py-8 px-6 text-center text-sm text-gray-500 border-t border-gray-100 bg-white">
        <p>
          Designed for flexibility, our custom slider adapts to different
          content types, ensuring a visually appealing and user-friendly
          interface across all devices.
        </p>
      </footer>
    </div>
  );
}
