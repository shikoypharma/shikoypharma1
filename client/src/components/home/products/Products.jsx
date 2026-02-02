import { PRODUCT_SEGMENTS_DATA } from "@/data/home/products.data";
import { motion } from "framer-motion";
import { SectionWrapper, SectionHeader } from "@/components/shared/section-components";
import ProductSegmentCard from "./ProductSegmentCard";

export default function ProductSegments() {
  return (
    <SectionWrapper bgColor="bg-gray-50">
      <SectionHeader
        title={PRODUCT_SEGMENTS_DATA.title}
        centered
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {PRODUCT_SEGMENTS_DATA.segments.map((segment, i) => (
          <ProductSegmentCard key={i} segment={segment} index={i} />
        ))}
      </div>
    </SectionWrapper>
  );
}
