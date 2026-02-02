import { motion } from "framer-motion";

export function SectionHeader({ title, subtitle, centered = true }) {
  return (
    <div className={centered ? "text-center mb-12" : "mb-8"}>
      <motion.h2
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="text-3xl lg:text-4xl font-bold text-gray-900"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-3 text-gray-600 text-base lg:text-lg max-w-2xl mx-auto"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

export function SectionWrapper({ children, className = "", bgColor = "bg-white" }) {
  return (
    <section className={`py-16 lg:py-20 ${bgColor} ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}

export function AnimatedContainer({ children, delay = 0, ...props }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
