import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";

export default function GlobalPresenceForm({ heading, text, formFields, submitText }) {
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      await axios.post("/api/inquiry", {
        name: form.name || "",
        email: form.email || "",
        phone: form.phone || "",
        location: form.location || "",
        message: form.message || "",
        type: "contact",
        source: "home",
      });
      setSuccess(true);
      setForm({});
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send. Please try again.");
    }
    setLoading(false);
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

      {success && (
        <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-lg text-sm">
          Thank you! We will contact you soon.
        </div>
      )}
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

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
