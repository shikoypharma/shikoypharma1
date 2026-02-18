import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function ProductTableRow({ product, slug, index }) {
  return (
    <motion.tr
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.2 }}
      className="odd:bg-white even:bg-gray-50 hover:bg-blue-50 transition-colors duration-200"
    >
      <td className="px-4 sm:px-6 py-4 border-b align-top">
        <div className="text-sm font-semibold text-slate-800">
          {product.composition || "-"}
        </div>
        <div className="text-xs text-gray-500 mt-1">
          {product.packing}
        </div>
      </td>
      <td className="px-4 sm:px-6 py-4 border-b align-top whitespace-nowrap">
        <div className="text-sm font-bold text-blue-600 hover:text-blue-800">
          <Link to={slug} className="hover:underline">
            {product.name}
          </Link>
        </div>
        {product.brand && (
          <div className="text-xs text-gray-500 mt-1">{product.brand}</div>
        )}
      </td>
    </motion.tr>
  );
}
