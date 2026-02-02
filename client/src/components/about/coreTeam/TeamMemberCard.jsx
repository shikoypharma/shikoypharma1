import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function TeamMemberCard({ member, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      whileHover={{ y: -8 }}
      className="h-full"
    >
      <Card className="border-l-4 border-blue-600 shadow-md hover:shadow-lg transition-all duration-300 h-full overflow-hidden flex flex-col">
        {member.image && (
          <div className="h-56 sm:h-64 overflow-hidden bg-gray-100">
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
            />
          </div>
        )}

        <CardHeader>
          <CardTitle className="text-lg lg:text-xl text-blue-700 mb-1">
            {member.name}
          </CardTitle>
          <p className="text-sm font-semibold text-gray-600 mb-2">
            {member.position}
          </p>
          <p className="text-xs text-gray-500">
            {member.experience}
          </p>
        </CardHeader>

        <div className="px-6 pb-6 grow">
          <p className="text-sm text-gray-600 leading-relaxed">
            {member.bio}
          </p>
        </div>
      </Card>
    </motion.div>
  );
}
