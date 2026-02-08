import { CERTIFICATIONS_DATA } from "@/data/home/certificates.data";
import { motion } from "framer-motion";

export default function Certifications() {
  return (
    <section className="py-10 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">

        <div className="py-4 mb-10">
          <h2 className="text-center text-3xl font-bold text-black">
            {CERTIFICATIONS_DATA.title}
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CERTIFICATIONS_DATA.certificates.map((cert, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="border bg-white p-3"
            >
              <img
                src={cert.image}
                alt={cert.name}
                className="w-full h-64 object-contain"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
