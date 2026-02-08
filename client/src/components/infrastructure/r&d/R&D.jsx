import { motion } from "framer-motion";
import PageLayout from "@/components/layout/pageLayout/pageLayout";
import { RD_FD_DATA } from "@/data/infrastructure/r&d.data";
import RdFdOrganogram from "./Organogram";
import RdFdHero from "./R&dHero";

export default function RdFd() {
  return (
    <PageLayout title={RD_FD_DATA.title}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <RdFdHero data={RD_FD_DATA.hero} />
        <RdFdOrganogram data={RD_FD_DATA.organogram} />
      </motion.div>
    </PageLayout>
  );
}
