import { useState, useEffect } from "react";
import axios from "axios";
import PageLayout from "@/components/layout/pageLayout/pageLayout";
import { SectionHeader } from "@/components/shared/section-components";
import MissionCard from "./MissionCard";

export default function Mission() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/api/content/mission");
        setData(data);
      } catch (error) {
        console.error("Error fetching mission data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="p-20 text-center">Loading...</div>;

  if (!data || !data.data) return <div className="p-20 text-center">Content not available.</div>;

  const { title } = data;
  const { mission, vision, values } = data.data;

  const sections = [
    { ...mission, icon: "🎯" },
    { ...vision, icon: "🔭" },
    { ...values, icon: "✨" }
  ];

  return (
    <PageLayout title={title || "Mission, Vision & Business Values"}>
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
