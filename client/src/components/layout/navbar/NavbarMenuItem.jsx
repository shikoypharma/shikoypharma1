import {
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Link, useNavigate } from "react-router-dom";
import NavbarMegaMenu from "./NavbarMegaMenu";

export default function NavbarMenuItem({ menu }) {
  const navigate = useNavigate();

  const handleProductsClick = () => {
    navigate(menu.basePath);
  };

  return (
    <NavigationMenuItem>
      {menu.mega ? (
        <>
          {menu.basePath === "/products" ? (
            <NavigationMenuTrigger 
              className="px-2 py-1 text-sm font-medium cursor-pointer"
              onClick={handleProductsClick}
            >
              {menu.label}
            </NavigationMenuTrigger>
          ) : (
            <NavigationMenuTrigger className="px-2 py-1 text-sm font-medium">
              {menu.label}
            </NavigationMenuTrigger>
          )}
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
