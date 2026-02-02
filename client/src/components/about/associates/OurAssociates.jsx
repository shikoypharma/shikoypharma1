import { OUR_ASSOCIATES_DATA } from "../../../data/about/ourAssociates.data";
import PageLayout from "@/components/layout/pageLayout/pageLayout";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/shared/section-components";
import AssociateCard from "./AssociateCard";

export default function OurAssociates() {
  const { associates } = OUR_ASSOCIATES_DATA;

  return (
    <PageLayout title="Our Associates">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 p-4 bg-blue-50 rounded-lg"
      >
        <p className="text-sm lg:text-base text-gray-700 leading-relaxed">
          {OUR_ASSOCIATES_DATA.description}
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {associates?.map((associate, index) => (
          <AssociateCard key={index} associate={associate} index={index} />
        ))}
      </div>
    </PageLayout>
  );
}
