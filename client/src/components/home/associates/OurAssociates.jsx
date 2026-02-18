import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function OurAssociates() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/api/content/associates");
        setData(data);
      } catch (error) {
        console.error("Error fetching associates data", error);
      }
    };
    fetchData();
  }, []);

  if (!data || !data.data || !data.data.associates) return null;

  return (
    <section className="py-10 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">
          {data.title || "Our Associates"}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center">
          {data.data.associates.map((associate, i) => (
            associate.image && (
              <motion.img
                key={i}
                src={associate.image}
                alt={associate.name}
                whileHover={{ scale: 1.05 }}
                className="mx-auto grayscale hover:grayscale-0 transition h-20 object-contain"
              />
            )
          ))}
        </div>
      </div>
    </section>
  );
}
