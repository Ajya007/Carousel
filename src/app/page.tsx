import Slider from "@/components/Slider/Slider";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 px-6 md:px-8 py-12">
      <section>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary mb-4 text-center">
          Custom Slider
        </h1>
        <div className="mx-auto w-96 h-80 border-yellow-950 border-4">
          <Slider>
            <div className="w-full h-full bg-red-500">Slide 1</div>
            <div className="w-full h-full bg-blue-500">Slide 2</div>
            <div className="w-full h-full bg-green-500">Slide 3</div>
          </Slider>
        </div>
      </section>
    </div>
  );
}
