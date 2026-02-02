import PageLayout from "@/components/layout/pageLayout/pageLayout";
import { CHAIRMAN_DESK_DATA } from "@/data/about/chairman.data";
import { motion } from "framer-motion";

export default function ChairmanDesk() {
  return (
    <PageLayout title={CHAIRMAN_DESK_DATA.title}>
      <div className="grid lg:grid-cols-2 gap-10 items-start">

        <motion.img
          src={CHAIRMAN_DESK_DATA.image}
          alt={CHAIRMAN_DESK_DATA.name}
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
          {CHAIRMAN_DESK_DATA.message.map((para, i) => (
            <p key={i}>{para}</p>
          ))}

          <div className="pt-6">
            <p className="font-semibold text-gray-900">
              {CHAIRMAN_DESK_DATA.name}
            </p>
            <p className="text-sm text-gray-600">
              {CHAIRMAN_DESK_DATA.designation}
            </p>
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
}
