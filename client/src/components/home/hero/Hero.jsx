import { HERO_SLIDER_DATA } from "@/data/home/hero.data";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import axios from "axios";

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [slides, setSlides] = useState(HERO_SLIDER_DATA.slides);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const { data } = await axios.get("/api/content/hero");
        if (data?.data?.slides?.length) {
          setSlides(data.data.slides);
        }
      } catch (err) {
        // Fallback to static data (already set)
      }
    };
    fetchHero();
  }, []);

  const slide = slides[index];

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, [slides]);

  if (!slide) return null;

  return (
    <section className="relative min-h-[400px] sm:min-h-[500px] lg:min-h-[700px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id || index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          {slide.image && (
            <img
              src={slide.image}
              alt={slide.heading}
              className="w-full h-full object-cover"
            />
          )}

          <div className="absolute inset-0 bg-black/40" />

          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 text-white">
              <motion.h1
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-2xl sm:text-3xl lg:text-5xl font-bold leading-tight"
              >
                {slide.heading}
              </motion.h1>

              <motion.p
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg max-w-xl"
              >
                {slide.subheading}
              </motion.p>

              <Link to="/about/corporate-profile">
                <Button className="mt-4 sm:mt-6 text-black bg-white hover:bg-gray-300">
                  Corporate Profile
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
