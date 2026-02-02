import { Link } from "react-router-dom";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export default function MobileMenu({ items }) {
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden">
        <Menu size={26} />
      </SheetTrigger>

      <SheetContent side="right">
        <nav className="flex flex-col gap-4 mt-6">
          {items.map((item, i) => (
            <Link
              key={i}
              to={item.path || "#"}
              className="text-lg font-medium"
            >
              {item.title}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
