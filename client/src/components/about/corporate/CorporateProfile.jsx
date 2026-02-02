import { CORPORATE_PROFILE_DATA } from "@/data/about/corporateProfile.data";
import PageLayout from "@/components/layout/pageLayout/pageLayout";
import { motion } from "framer-motion";

export default function CorporateProfile() {
  return (
    <PageLayout title={CORPORATE_PROFILE_DATA.title}>
      <div className="grid lg:grid-cols-2 gap-10 items-start">

        <motion.img
          src={CORPORATE_PROFILE_DATA.image}
          alt="Corporate Profile"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="w-full rounded shadow"
        />

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-6 text-gray-700 leading-relaxed"
        >
          {CORPORATE_PROFILE_DATA.content.map((para, index) => (
            <p key={index}>{para}</p>
          ))}
        </motion.div>
      </div>
    </PageLayout>
  );
}
