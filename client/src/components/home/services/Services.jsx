import { SERVICES_DATA } from "@/data/home/ourServices.data";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

export default function Services() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          {SERVICES_DATA.title}
        </h2>

        <div className="grid md:grid-cols-4 gap-6">
          {SERVICES_DATA.services.map((service, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <Card className="h-full text-center">
                <CardContent className="p-6">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="font-semibold text-lg">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-2">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
