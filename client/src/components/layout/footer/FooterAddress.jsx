import { motion } from "framer-motion";

export default function FooterAddress({ addresses }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="space-y-6"
    >
      <div className="space-y-3">
        <h4 className="text-white font-semibold text-lg">Manufacturing Facilities</h4>
        <motion.p
          whileHover={{ x: 5 }}
          className="text-sm text-gray-300 leading-relaxed transition-all"
        >
          {addresses?.manufacturing}
        </motion.p>
      </div>

      <div className="space-y-3">
        <h4 className="text-white font-semibold text-lg">Corporate Office</h4>
        <motion.p
          whileHover={{ x: 5 }}
          className="text-sm text-gray-300 leading-relaxed transition-all"
        >
          {addresses?.corporate}
        </motion.p>
      </div>
    </motion.div>
  );
}
