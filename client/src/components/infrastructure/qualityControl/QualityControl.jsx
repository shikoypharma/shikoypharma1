import { motion } from "framer-motion";
import PageLayout from "@/components/layout/pageLayout/pageLayout";
import { QUALITY_CONTROL_DATA } from "@/data/infrastructure/qualityControl.data";
import QCHero from "./QCHero";
import QCOverview from "./QCOverview";
import QCProcesses from "./QCProcesses";
import QCStandards from "./QCStandards";

export default function QualityControl() {
  return (
    <PageLayout title={QUALITY_CONTROL_DATA.title}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <QCHero data={QUALITY_CONTROL_DATA.hero} />
        <QCOverview data={QUALITY_CONTROL_DATA.overview} />
        <QCProcesses processes={QUALITY_CONTROL_DATA.processes} />
        <QCStandards standards={QUALITY_CONTROL_DATA.standards} />
      </motion.div>
    </PageLayout>
  );
}
