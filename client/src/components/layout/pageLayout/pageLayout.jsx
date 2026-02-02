import { Link, useLocation } from "react-router-dom";
import { generateBreadcrumbs } from "@/lib/breadcumbs";
import { motion } from "framer-motion";

export default function PageLayout({ title, children }) {
  const location = useLocation();
  const breadcrumbs = generateBreadcrumbs(location.pathname);

  return (
    <section className="bg-white">

      <div className="bg-blue-600 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-white">
            {title}
          </h1>

          <nav className="mt-2 text-sm text-blue-100">
            <Link to="/" className="hover:underline">
              Home
            </Link>

            {breadcrumbs.map((crumb, i) => (
              <span key={crumb.path}>
                {" "}›{" "}
                {i === breadcrumbs.length - 1 ? (
                  <span className="capitalize">
                    {crumb.label}
                  </span>
                ) : (
                  <Link
                    to={crumb.path}
                    className="hover:underline capitalize"
                  >
                    {crumb.label}
                  </Link>
                )}
              </span>
            ))}
          </nav>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto px-4 py-12"
      >
        {children}
      </motion.div>
    </section>
  );
}
