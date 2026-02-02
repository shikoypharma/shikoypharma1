import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function MissionCard({ section, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="h-full"
    >
      <Card className="border-l-4 border-blue-600 shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl lg:text-4xl">{section.icon}</span>
            <CardTitle className="text-lg lg:text-xl text-gray-900">
              {section.title}
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent className="grow">
          <ul className="space-y-3">
            {section.points?.map((point, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="flex gap-3 items-start text-gray-700"
              >
                <span className="text-lg leading-none mt-1 text-blue-600 shrink-0">•</span>
                <span className="text-sm leading-relaxed">{point}</span>
              </motion.li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  );
}
