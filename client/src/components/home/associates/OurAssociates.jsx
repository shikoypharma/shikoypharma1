import { ASSOCIATES_DATA } from "@/data/home/associates.data";
import { motion } from "framer-motion";

export default function OurAssociates() {
  return (
    <section className="py-14 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">
          {ASSOCIATES_DATA.title}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center">
          {ASSOCIATES_DATA.logos.map((logo, i) => (
            <motion.img
              key={i}
              src={logo}
              alt="Associate"
              whileHover={{ scale: 1.05 }}
              className="mx-auto grayscale hover:grayscale-0 transition"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
