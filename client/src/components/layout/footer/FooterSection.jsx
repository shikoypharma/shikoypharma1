import { motion } from "framer-motion";

export default function FooterSection({ title, items }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="space-y-4"
    >
      <h4 className="text-white font-semibold text-lg">{title}</h4>
      <ul className="space-y-2">
        {items?.map((item, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="text-gray-300 text-sm hover:text-blue-400 transition-colors cursor-pointer"
          >
            {item}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}
