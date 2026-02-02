import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";

export default function GlobalPresenceForm({ heading, text, formFields, submitText }) {
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("Form Data:", form);
    
    setTimeout(() => {
      alert("Thank you! We will contact you soon.");
      setForm({});
      setLoading(false);
    }, 500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="bg-white p-6 lg:p-8 rounded-lg shadow-lg"
    >
      <h3 className="text-2xl font-semibold text-gray-900 mb-2">{heading}</h3>
      <p className="text-sm text-gray-600 mb-6">{text}</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {formFields?.map((field) => (
          <motion.div
            key={field.name}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {field.type === "textarea" ? (
              <Textarea
                name={field.name}
                placeholder={field.label}
                onChange={handleChange}
                value={form[field.name] || ""}
                required
                className="min-h-24 resize-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <Input
                type={field.type || "text"}
                name={field.name}
                placeholder={field.label}
                onChange={handleChange}
                value={form[field.name] || ""}
                required
                className="focus:ring-2 focus:ring-blue-500"
              />
            )}
          </motion.div>
        ))}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={loading}
          type="submit"
          className="w-full bg-blue-600 text-white font-medium py-2.5 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50"
        >
          {loading ? "Sending..." : submitText || "Submit"}
        </motion.button>
      </form>
    </motion.div>
  );
}
