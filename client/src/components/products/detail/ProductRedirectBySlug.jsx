import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PRODUCT_CATEGORIES_DATA } from "@/data/products/productCategories.data";
import { PRODUCTS_DATA } from "@/data/products/products.data";
import { slugify } from "@/lib/slugify";

export default function ProductRedirectBySlug() {
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!slug) {
      navigate("/products", { replace: true });
      return;
    }

    const searchSlug = slugify(slug);

    for (const [categoryKey, category] of Object.entries(PRODUCT_CATEGORIES_DATA)) {
      const found = category.products?.find(
        (p) => slugify(p.name) === searchSlug
      );

      if (found) {
        navigate(`/products/${categoryKey}/${searchSlug}`, { replace: true });
        return;
      }
    }

    const foundFlat = PRODUCTS_DATA.products.find(
      (p) =>
        slugify(p.brand) === searchSlug ||
        slugify(p.name) === searchSlug
    );

    if (foundFlat) {
      navigate(`/products/${searchSlug}`, { replace: true });
      return;
    }

    navigate("/products", { replace: true });
  }, [slug, navigate]);

  return null;
}
