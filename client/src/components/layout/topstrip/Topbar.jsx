import { TOPBAR_DATA } from "@/data/layout/topbar.data";
import { motion } from "framer-motion";
import { Facebook, Linkedin, Youtube } from "lucide-react";

const icons = {
  facebook: Facebook,
  linkedin: Linkedin,
  youtube: Youtube,
};

export default function TopBar() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="sticky top-0 z-50 bg-blue-600 text-white text-sm"
    >
      <div className="max-w-7xl mx-auto px-4 h-8 flex justify-between items-center">

        <div className="flex gap-3">
          {TOPBAR_DATA.socials.map((s, i) => {
            const Icon = icons[s.name];
            return <Icon key={i} size={16} className="cursor-pointer" />;
          })}
        </div>

        <div className="flex gap-6 items-center">
          {TOPBAR_DATA.links.map((l, i) => (
            <span
              key={i}
              className={`cursor-pointer ${
                l.highlight ? "text-yellow-300" : ""
              }`}
            >
              {l.label}
            </span>
          ))}

          <select className="bg-blue-500 rounded px-1">
            {TOPBAR_DATA.languages.map(lang => (
              <option key={lang}>{lang}</option>
            ))}
          </select>
        </div>
      </div>
    </motion.div>
  );
}
