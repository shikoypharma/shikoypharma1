import {
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function NavbarMegaMenu({ menu }) {
  return (
    <NavigationMenuContent>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="bg-blue-50 p-6 w-200 max-w-[90vw]"
      >
        <div
          className="grid gap-8"
          style={{
            gridTemplateColumns: `repeat(${menu.mega.columns.length}, minmax(0, 1fr))`,
          }}
        >
          {menu.mega.columns.map((col, ci) => (
            <ul key={ci} className="space-y-3">
              {col.map((subItem, ti) => {
                const link = `${menu.basePath}/${subItem.path}`;

                return (
                  <motion.li
                    key={ti}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: ti * 0.05 }}
                    whileHover={{ x: 5 }}
                  >
                    <NavigationMenuLink asChild>
                      <Link
                        to={link}
                        className="text-base font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-200 py-2"
                      >
                        {subItem.label}
                      </Link>
                    </NavigationMenuLink>
                  </motion.li>
                );
              })}
            </ul>
          ))}
        </div>
      </motion.div>
    </NavigationMenuContent>
  );
}
