import { useState, useEffect } from "react";
import axios from "axios";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { NAVBAR_DATA } from "@/data/layout/navbar.data";
import { motion } from "framer-motion";
import NavbarLogo from "./NavbarLogo";
import NavbarMenuItem from "./NavbarMenuItem";

export default function Navbar() {
  const [navData, setNavData] = useState(NAVBAR_DATA);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data: categories } = await axios.get("/api/product-categories");

        // Transform categories into the mega menu format
        // We'll distribute them into 4 columns roughly evenly
        const columns = [[], [], [], []];
        categories.forEach((cat, index) => {
          columns[index % 4].push({
            label: cat.name,
            path: cat.slug
          });
        });

        const newNavData = NAVBAR_DATA.map(item => {
          if (item.label === "Our Products") {
            return {
              ...item,
              mega: {
                columns: columns
              }
            };
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

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <NavbarLogo />

          <NavigationMenu className="hidden md:flex">
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

          <motion.button
            whileTap={{ scale: 0.95 }}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </motion.button>
        </div>
      </div>
    </header>
  );
}
