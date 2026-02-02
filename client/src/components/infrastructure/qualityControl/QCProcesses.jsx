import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

export default function QCProcesses({ processes }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="mb-16"
    >
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Quality Control Processes
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Our comprehensive quality control processes ensure product excellence at every stage
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {processes.map((process, idx) => (
            <motion.div
              key={process.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + idx * 0.1 }}
            >
              <Card className="p-8 h-full border-l-4 border-indigo-600 hover:shadow-lg transition-shadow">
                <div className="text-5xl mb-4">{process.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {process.title}
                </h3>
                <p className="text-gray-700 mb-6">
                  {process.description}
                </p>
                <ul className="space-y-2">
                  {process.details.map((detail, detailIdx) => (
                    <motion.li
                      key={detailIdx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + idx * 0.1 + detailIdx * 0.05 }}
                      className="flex items-start gap-3 text-gray-600"
                    >
                      <span className="text-indigo-600 font-bold mt-1">•</span>
                      <span>{detail}</span>
                    </motion.li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
