import { HERO_SLIDER_DATA } from "@/data/home/hero.data";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const [index, setIndex] = useState(0);
  const slide = HERO_SLIDER_DATA.slides[index];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) =>
        prev === HERO_SLIDER_DATA.slides.length - 1 ? 0 : prev + 1
      );
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <img
            src={slide.image}
            alt={slide.heading}
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/40" />

          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 text-white">
              <motion.h1
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-4xl lg:text-5xl font-bold"
              >
                {slide.heading}
              </motion.h1>

              <motion.p
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mt-4 text-lg"
              >
                {slide.subheading}
              </motion.p>

              <Button className="mt-6 text-black bg-white hover:bg-gray-300">
                Corporate Profile
              </Button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
