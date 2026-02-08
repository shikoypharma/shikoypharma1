import { motion } from "framer-motion";
import PageLayout from "@/components/layout/pageLayout/pageLayout";
import { OPERATIONS_DATA } from "@/data/infrastructure/operations.data";

import OperationsHero from "./OperationHero";
import OperationsGrid from "./OperationGrid";

export default function Operations() {
  return (
    <PageLayout title={OPERATIONS_DATA.title}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <OperationsHero data={OPERATIONS_DATA.hero} />
        <OperationsGrid />
      </motion.div>
    </PageLayout>
  );
}
