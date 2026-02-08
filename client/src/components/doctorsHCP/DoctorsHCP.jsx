import { motion } from "framer-motion";
import PageLayout from "@/components/layout/pageLayout/pageLayout";
import { FOR_DOCTORS_HCPS_DATA } from "@/data/doctorsHCP/doctorsHCP.data";

import ForDoctorsHero from "./ForDoctorsHero";
import ForDoctorsTables from "./ForDoctorsTable";

export default function ForDoctorsHcps() {
  return (
    <PageLayout title={FOR_DOCTORS_HCPS_DATA.title}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <ForDoctorsHero data={FOR_DOCTORS_HCPS_DATA.hero} />
        <ForDoctorsTables data={FOR_DOCTORS_HCPS_DATA} />
      </motion.div>
    </PageLayout>
  );
}
