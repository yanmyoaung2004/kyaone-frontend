"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const [current, setCurrent] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Next-Gen Smartphones",
      description:
        "Experience the future with our latest smartphone collection",
      image:
        "https://res.cloudinary.com/jerrick/image/upload/v1686848296/648b432828c9e7001d5a230f.jpg",
      cta: "Shop Now",
      link: "/category/smartphones",
      color: "bg-blue-500",
    },
    {
      id: 2,
      title: "Premium Audio",
      description:
        "Immerse yourself in crystal-clear sound with our premium headphones",
      image:
        "https://sonnydickson.com/wp-content/uploads/2024/02/BW-PX7-S2e-_0000_Cloud-Grey-angled-shot.jpg",
      cta: "Explore",
      link: "/category/audio",
      color: "bg-purple-500",
    },
    {
      id: 3,
      title: "Special Offers",
      description: "Limited time deals on our most popular electronics",
      image:
        "https://media.gq.com/photos/6740e840f77c3632162d282c/16:9/w_2560%2Cc_limit/ledeimage1.png",
      cta: "View Deals",
      link: "/deals",
      color: "bg-red-500",
    },
  ];

  const next = useCallback(() => {
    setCurrent((current + 1) % slides.length);
  }, [current, slides.length]);

  const prev = useCallback(() => {
    setCurrent((current - 1 + slides.length) % slides.length);
  }, [current, slides.length]);

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      next();
    }, 5000);
    return () => clearInterval(interval);
  }, [next]);

  return (
    <div className="relative overflow-hidden rounded-lg mx-4 mt-2">
      <div
        className="flex transition-transform duration-500 ease-out h-[400px] md:h-[500px]"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="min-w-full relative">
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/20 z-10" />
            <img
              src={slide.image || "/placeholder.svg"}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex flex-col justify-center z-20 p-8 md:p-16 max-w-3xl">
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                {slide.title}
              </h1>
              <p className="text-white/90 text-lg md:text-xl mb-8">
                {slide.description}
              </p>
              <div>
                <Button size="lg" className={slide.color}>
                  {slide.cta}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation buttons */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 text-white hover:bg-black/50 z-30"
        onClick={prev}
      >
        <ChevronLeft className="h-6 w-6" />
        <span className="sr-only">Previous slide</span>
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 text-white hover:bg-black/50 z-30"
        onClick={next}
      >
        <ChevronRight className="h-6 w-6" />
        <span className="sr-only">Next slide</span>
      </Button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === current ? "bg-white" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
