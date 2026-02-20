import { useState, useEffect } from "react";
import axios from "axios";
import PageLayout from "@/components/layout/pageLayout/pageLayout";
import { motion } from "framer-motion";
import CertificateCard from "./CertificateCard";

export default function Certifications() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/api/content/certifications");
        setData(data);
      } catch (error) {
        console.error("Error fetching certifications data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="p-20 text-center">Loading...</div>;

  if (!data || !data.data) return <div className="p-20 text-center">Content not available.</div>;

  const { title } = data;
  const { description, certifications } = data.data;

  return (
    <PageLayout title={title || "Certifications"}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 p-4 lg:p-6 bg-blue-50 rounded-lg"
      >
        <p className="text-base lg:text-lg text-gray-700 leading-relaxed">
          {description}
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {certifications?.map((cert, index) => (
          <CertificateCard key={index} certificate={cert} index={index} />
        ))}
      </div>
    </PageLayout>
  );
}
