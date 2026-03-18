import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function NavbarLogo() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link to="/" className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center">
          <img src="/logo.jpeg" alt="logo" className="rounded-full"/>
        </div>
        <span className="hidden sm:inline text-xl font-bold text-gray-900">Shikoy Pharma</span>
      </Link>
    </motion.div>
  );
}
