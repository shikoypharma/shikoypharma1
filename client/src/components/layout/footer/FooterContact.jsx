import { motion } from "framer-motion";

export default function FooterContact({ contact }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="space-y-4"
    >
      <h4 className="text-white font-semibold text-lg">Contact Us</h4>
      <div className="space-y-3 text-sm text-gray-300">
        <motion.p
          whileHover={{ x: 5 }}
          className="transition-all"
        >
          <span className="font-medium text-blue-400">Phone:</span>{" "}
          {contact.phones?.join(" | ")}
        </motion.p>
        <motion.p
          whileHover={{ x: 5 }}
          className="transition-all"
        >
          <span className="font-medium text-blue-400">Domestic:</span>{" "}
          {contact.emails?.domestic}
        </motion.p>
        <motion.p
          whileHover={{ x: 5 }}
          className="transition-all"
        >
          <span className="font-medium text-blue-400">Export:</span>{" "}
          {contact.emails?.export}
        </motion.p>
      </div>
    </motion.div>
  );
}
