import React, { useEffect } from "react";
import { TOPBAR_DATA } from "@/data/layout/topbar.data";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Facebook, Linkedin, Youtube, Globe } from "lucide-react";

const icons = {
  facebook: Facebook,
  linkedin: Linkedin,
  youtube: Youtube,
};

export default function TopBar() {
  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false,
      },
      "google_translate_element"
    );
  };

  useEffect(() => {
    var addScript = document.createElement("script");
    addScript.setAttribute(
      "src",
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    );
    document.body.appendChild(addScript);
    window.googleTranslateElementInit = googleTranslateElementInit;
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="sticky top-0 z-50 bg-blue-600 text-white text-sm"
    >
      <div className="max-w-7xl mx-auto px-4 h-10 flex justify-between items-center">

        <div className="flex gap-4 items-center">
          <span className="hidden sm:inline text-blue-100">Connect with us:</span>
          <div className="flex gap-3">
            {TOPBAR_DATA.socials.map((s, i) => {
              const Icon = icons[s.name];
              return <Icon key={i} size={16} className="cursor-pointer hover:text-blue-200 transition-colors" />;
            })}
          </div>
        </div>

        <div className="flex gap-6 items-center">
          {TOPBAR_DATA.links.map((l, i) => (
            <Link
              key={i}
              to={l.path}
              className={`cursor-pointer hidden sm:inline ${l.highlight ? "text-yellow-300 font-medium" : "hover:text-blue-200"
                }`}
            >
              {l.label}
            </Link>
          ))}

          <div className="flex items-center gap-2 bg-blue-700/50 px-2 py-1 rounded">
            <Globe size={14} className="text-blue-200" />
            <div id="google_translate_element" className="google-translate-container"></div>
          </div>

          <style jsx global>{`
                .google-translate-container .goog-te-gadget-simple {
                    background-color: transparent !important;
                    border: none !important;
                    padding: 0 !important;
                    font-size: 13px !important;
                }
                .google-translate-container .goog-te-gadget-simple .goog-te-menu-value {
                    color: white !important;
                }
                .google-translate-container .goog-te-gadget-simple .goog-te-menu-value span {
                    color: white !important;
                    border-left: none !important;
                }
                .google-translate-container .goog-te-gadget-icon {
                    display: none !important;
                }
                .goog-te-banner-frame.skiptranslate {
                    display: none !important;
                }
                body {
                    top: 0px !important;
                }
            `}</style>
        </div>
      </div>
    </motion.div>
  );
}
