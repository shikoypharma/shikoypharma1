import { missionData } from "../../../data/about/mission.data";
import PageLayout from "@/components/layout/pageLayout/pageLayout";
import { SectionHeader } from "@/components/shared/section-components";
import MissionCard from "./MissionCard";

export default function Mission() {
  const { mission, vision, values } = missionData;

  const sections = [
    { ...mission, icon: "🎯" },
    { ...vision, icon: "🔭" },
    { ...values, icon: "✨" }
  ];

  return (
    <PageLayout title="Mission, Vision & Business Values">
      <SectionHeader
        title="Our Core Values"
        subtitle="Guiding principles that drive our excellence in pharmaceutical innovation"
      />

      <div className="grid md:grid-cols-3 gap-8">
        {sections.map((section, index) => (
          <MissionCard key={index} section={section} index={index} />
        ))}
      </div>
    </PageLayout>
  );
}
