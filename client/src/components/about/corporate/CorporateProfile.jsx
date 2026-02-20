import { useState, useEffect } from "react";
import axios from "axios";
import PageLayout from "@/components/layout/pageLayout/pageLayout";
import { motion } from "framer-motion";

export default function CorporateProfile() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/api/content/corporate");
        setData(data);
      } catch (error) {
        console.error("Error fetching corporate profile", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="p-20 text-center">Loading...</div>;

  if (!data || !data.data) return <div className="p-20 text-center">Content not available.</div>;

  const { title } = data;
  const { content, image } = data.data;

  return (
    <PageLayout title={title || "Corporate Profile"}>
      <div className="grid lg:grid-cols-2 gap-10 items-start">

        {image && (
          <motion.img
            src={image}
            alt="Corporate Profile"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full rounded shadow"
          />
        )}

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-6 text-gray-700 leading-relaxed"
        >
          {content && content.map((para, index) => (
            <p key={index}>{para}</p>
          ))}
        </motion.div>
      </div>
    </PageLayout>
  );
}
