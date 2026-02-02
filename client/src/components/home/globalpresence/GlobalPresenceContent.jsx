import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function GlobalPresenceContent({ title, description, brochures }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="flex flex-col justify-center"
    >
      <h2 className="text-3xl lg:text-4xl font-bold text-blue-700 mb-4">
        {title}
      </h2>

      <p className="text-gray-700 leading-relaxed text-base lg:text-lg">
        {description}
      </p>

      <div className="flex flex-wrap gap-3 mt-8">
        {brochures?.map((b, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
              {b.label}
            </Button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
