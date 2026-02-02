import { useMemo, useState } from "react";
import PageLayout from "@/components/layout/pageLayout/pageLayout";
import { PRODUCTS_DATA } from "@/data/products/products.data";
import { motion } from "framer-motion";
import { slugify } from "@/lib/slugify";
import ProductFilters from "./ProductFilters";
import ProductTableRow from "./ProductTableRow";

export default function Products() {
  const [query, setQuery] = useState("");
  const [segment, setSegment] = useState("All");

  const segments = PRODUCTS_DATA.segments;

  const filtered = useMemo(() => {
    return PRODUCTS_DATA.products.filter((p) => {
      if (segment !== "All" && p.segment !== segment) return false;
      if (!query) return true;
      const q = query.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        (p.brand && p.brand.toLowerCase().includes(q)) ||
        p.description.toLowerCase().includes(q) ||
        p.segment.toLowerCase().includes(q)
      );
    });
  }, [query, segment]);

  return (
    <PageLayout title={PRODUCTS_DATA.title}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 p-4 bg-blue-50 rounded-lg"
      >
        <p className="text-sm text-gray-700">{PRODUCTS_DATA.description}</p>
      </motion.div>

      <ProductFilters
        query={query}
        onQueryChange={setQuery}
        segment={segment}
        onSegmentChange={setSegment}
        segments={segments}
        filteredCount={filtered.length}
      />

      <div className="overflow-x-auto bg-white shadow-md rounded-lg border border-gray-200">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-linear-to-r from-blue-600 to-blue-700 text-white">
              <th className="px-4 sm:px-6 py-4 text-left font-semibold">Composition</th>
              <th className="px-4 sm:px-6 py-4 text-left font-semibold">Brand Name</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((p, idx) => {
                const slug = `/product/${slugify(p.brand || p.name)}`;
                return (
                  <ProductTableRow
                    key={p.id}
                    product={p}
                    slug={slug}
                    index={idx}
                  />
                );
              })
            ) : (
              <tr>
                <td colSpan="2" className="px-6 py-8 text-center text-gray-500">
                  <p className="text-lg font-medium">No products found</p>
                  <p className="text-sm">Try adjusting your search or filters</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </PageLayout>
  );
}
