import { CORE_TEAM_DATA } from "../../../data/about/coreTeam.data";
import PageLayout from "@/components/layout/pageLayout/pageLayout";
import { motion } from "framer-motion";
import TeamMemberCard from "./TeamMemberCard";

export default function CoreTeam() {
  const { teamMembers } = CORE_TEAM_DATA;

  return (
    <PageLayout title="Our Core Team">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 p-4 lg:p-6 bg-blue-50 rounded-lg"
      >
        <p className="text-base lg:text-lg text-gray-700 leading-relaxed">
          {CORE_TEAM_DATA.description}
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamMembers?.map((member, index) => (
          <TeamMemberCard key={index} member={member} index={index} />
        ))}
      </div>
    </PageLayout>
  );
}
