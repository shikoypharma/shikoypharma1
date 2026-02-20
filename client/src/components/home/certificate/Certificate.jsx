import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

export default function Certifications() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/api/content/certifications");
        setData(data);
      } catch (error) {
        console.error("Error fetching certifications data", error);
      }
    };
    fetchData();
  }, []);

  if (!data || !data.data || !data.data.certifications) return null;

  return (
    <section className="py-10 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">

        <div className="py-4 mb-10">
          <h2 className="text-center text-3xl font-bold text-black">
            {data.title || "Certifications"}
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.data.certifications.map((cert, i) => (
            cert.image && (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="border bg-white p-3 hover:shadow-lg transition-shadow cursor-pointer"
              >
                <Link to="/about/certifications">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-64 object-contain"
                  />
                </Link>
              </motion.div>
            )
          ))}
        </div>
      </div>
    </section>
  );
}
