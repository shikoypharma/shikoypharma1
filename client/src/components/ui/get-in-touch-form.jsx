import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";

export default function GetInTouchForm({ fields, onSubmit, title = "Get in Touch", description = "" }) {
  const [form, setForm] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmitLocal = (e) => {
    e.preventDefault();
    console.log("Form Data:", form);
    alert("Thank you! We will contact you soon.");
    if (onSubmit) onSubmit(form);
    setForm({});
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white p-6 rounded shadow"
    >
      <h3 className="text-xl font-semibold mb-2">{title}</h3>

      {description && <p className="text-sm text-gray-600 mb-4">{description}</p>}

      <form onSubmit={handleSubmitLocal} className="space-y-4">
        {fields?.map((field) => (
          <div key={field.name}>
            {field.type === "textarea" ? (
              <Textarea
                name={field.name}
                placeholder={field.label}
                onChange={handleChange}
                value={form[field.name] || ""}
                required
                className="min-h-24"
              />
            ) : (
              <Input
                type={field.type || "text"}
                name={field.name}
                placeholder={field.label}
                onChange={handleChange}
                value={form[field.name] || ""}
                required
              />
            )}
          </div>
        ))}

        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </motion.div>
  );
}
