import { useState, useEffect } from "react";
import axios from "axios";
import PageLayout from "@/components/layout/pageLayout/pageLayout";
import { motion } from "framer-motion";

export default function ChairmanDesk() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/api/content/chairman");
        setData(data);
      } catch (error) {
        console.error("Error fetching chairman data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="p-20 text-center">Loading...</div>;

  if (!data || !data.data) return <div className="p-20 text-center">Content not available.</div>;

  const { title } = data;
  const { name, designation, message, image } = data.data;

  return (
    <PageLayout title={title || "From The Chairman's Desk"}>
      <div className="grid lg:grid-cols-2 gap-10 items-start">

        {image && (
          <motion.img
            src={image}
            alt={name}
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
          {message && message.map((para, i) => (
            <p key={i}>{para}</p>
          ))}

          <div className="pt-6">
            <p className="font-semibold text-gray-900">
              {name}
            </p>
            <p className="text-sm text-gray-600">
              {designation}
            </p>
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
}
