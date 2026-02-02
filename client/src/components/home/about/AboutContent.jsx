import { motion } from "framer-motion";

export default function AboutContent({ title, description, highlights }) {
  return (
    <motion.div
      initial={{ x: 40, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true }}
      className="flex flex-col justify-center"
    >
      <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
        {title}
      </h2>

      <div className="space-y-4 mb-8">
        {description?.map((text, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="text-gray-700 leading-relaxed text-base lg:text-lg"
          >
            {text}
          </motion.p>
        ))}
      </div>

      <motion.ul
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="space-y-3"
      >
        {highlights?.map((h, i) => (
          <motion.li
            key={i}
            initial={{ x: -10, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.05 }}
            className="flex items-center gap-3 text-gray-700"
          >
            <span className="text-lg text-green-500 font-bold">✓</span>
            <span className="text-base">{h}</span>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
}
