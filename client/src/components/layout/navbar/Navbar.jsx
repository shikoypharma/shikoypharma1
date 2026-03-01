import { useState, useEffect } from "react";
import axios from "axios";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { NAVBAR_DATA } from "@/data/layout/navbar.data";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { X, ChevronDown } from "lucide-react";
import NavbarLogo from "./NavbarLogo";
import NavbarMenuItem from "./NavbarMenuItem";

export default function Navbar() {
  const [navData, setNavData] = useState(NAVBAR_DATA);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data: categories } = await axios.get("/api/product-categories");
        const columns = [[], [], [], []];
        categories.forEach((cat, index) => {
          columns[index % 4].push({
            label: cat.name,
            path: cat.slug
          });
        });

        const newNavData = NAVBAR_DATA.map(item => {
          if (item.label === "Our Products") {
            return { ...item, mega: { columns } };
          }
          return item;
        });
        setNavData(newNavData);
      } catch (error) {
        console.error("Error fetching categories for navbar", error);
      }
    };
    fetchCategories();
  }, []);

  // Close mobile menu on route change
  const handleMobileLink = () => {
    setMobileOpen(false);
    setExpandedMenu(null);
  };

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <NavbarLogo />

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList className="gap-1">
              {navData.map((menu, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <NavbarMenuItem menu={menu} />
                </motion.div>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Hamburger Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Toggle menu"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-[60] lg:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-[280px] max-w-[80vw] bg-white z-[70] shadow-2xl overflow-y-auto lg:hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <span className="text-lg font-bold text-gray-800">Menu</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Nav Items */}
              <nav className="py-2">
                {navData.map((menu, i) => (
                  <div key={i} className="border-b border-gray-50">
                    {menu.mega ? (
                      // Expandable menu with sub-items
                      <>
                        <button
                          onClick={() => setExpandedMenu(expandedMenu === i ? null : i)}
                          className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        >
                          {menu.label}
                          <ChevronDown
                            size={16}
                            className={`transition-transform duration-200 ${expandedMenu === i ? "rotate-180" : ""}`}
                          />
                        </button>

                        <AnimatePresence>
                          {expandedMenu === i && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden bg-gray-50"
                            >
                              {/* Show basePath link first if it's products */}
                              {menu.basePath && (
                                <Link
                                  to={menu.basePath}
                                  onClick={handleMobileLink}
                                  className="block px-6 py-2 text-sm text-blue-600 font-medium hover:bg-blue-50 border-b border-gray-100"
                                >
                                  View All {menu.label}
                                </Link>
                              )}
                              {menu.mega.columns.flat().map((item, j) => (
                                <Link
                                  key={j}
                                  to={`${menu.basePath}/${item.path}`}
                                  onClick={handleMobileLink}
                                  className="block px-6 py-2 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                >
                                  {item.label}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      // Simple link
                      <Link
                        to={menu.link}
                        onClick={handleMobileLink}
                        className="block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      >
                        {menu.label}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>

              {/* Contact CTA at bottom */}
              <div className="p-4 mt-4">
                <Link
                  to="/contact"
                  onClick={handleMobileLink}
                  className="block w-full text-center bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
