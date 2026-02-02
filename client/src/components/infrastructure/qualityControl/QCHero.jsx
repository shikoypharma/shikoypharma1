import { motion } from "framer-motion";

export default function QCHero({ data }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-16 py-12 bg-linear-to-r from-blue-50 to-indigo-50 rounded-lg"
    >
      <div className="max-w-4xl mx-auto px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
        >
          {data.title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-600 mb-6"
        >
          {data.subtitle}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-lg text-gray-700 leading-relaxed"
        >
          {data.description}
        </motion.p>
      </div>
    </motion.section>
  );
}
