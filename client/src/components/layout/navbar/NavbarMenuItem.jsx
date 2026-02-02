import {
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";
import NavbarMegaMenu from "./NavbarMegaMenu";

export default function NavbarMenuItem({ menu }) {
  return (
    <NavigationMenuItem>
      {menu.mega ? (
        <>
          <NavigationMenuTrigger>
            <Link to={menu.basePath} className="px-2 py-1 text-sm font-medium">
              {menu.label}
            </Link>
          </NavigationMenuTrigger>
          <NavbarMegaMenu menu={menu} />
        </>
      ) : (
        <NavigationMenuLink asChild>
          <Link
            to={menu.link}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200"
          >
            {menu.label}
          </Link>
        </NavigationMenuLink>
      )}
    </NavigationMenuItem>
  );
}
