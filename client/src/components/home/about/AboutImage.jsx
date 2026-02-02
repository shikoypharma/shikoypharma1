import { motion } from "framer-motion";

export default function AboutImage({ image, alt }) {
  return (
    <motion.div
      initial={{ x: -40, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true }}
      className="rounded-lg overflow-hidden shadow-lg"
    >
      <img
        src={image}
        alt={alt}
        className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
      />
    </motion.div>
  );
}
