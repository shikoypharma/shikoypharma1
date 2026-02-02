// import { useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { PRODUCT_CATEGORIES_DATA } from "@/data/products/productCategories.data";
// import { PRODUCTS_DATA } from "@/data/products/products.data";

// export default function ProductRedirectBySlug() {
//   const { slug } = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const searchSlug = slug.toLowerCase();

//     for (const [categoryKey, category] of Object.entries(PRODUCT_CATEGORIES_DATA)) {
//       const found = category.products?.find((p) => {
//         const pSlug = (p.name || "").toLowerCase().replace(/\s+/g, "-");
//         return pSlug === searchSlug;
//       });
//       if (found) {
//         navigate(`/products/${categoryKey}/${searchSlug}`, { replace: true });
//         return;
//       }
//     }

//     if (PRODUCTS_DATA?.products) {
//       const foundFlat = PRODUCTS_DATA.products.find((p) => {
//         const pSlug = (p.brand || p.name || "").toLowerCase().replace(/\s+/g, "-");
//         return pSlug === searchSlug;
//       });
//       if (foundFlat) {

//         const categoryKey = foundFlat.category || foundFlat.segment || "";
//         if (categoryKey) {
//           const catKey = categoryKey.toLowerCase().replace(/\s+/g, "-");
//           navigate(`/products/${catKey}/${searchSlug}`, { replace: true });
//           return;
//         }
//         navigate(`/products`, { replace: true });
//         return;
//       }
//     }


//     navigate(`/products`, { replace: true });
//   }, [slug, navigate]);

//   return null;
// }
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

    /* 1️⃣ SEARCH CATEGORY PRODUCTS (PRIMARY SOURCE) */
    for (const [categoryKey, category] of Object.entries(PRODUCT_CATEGORIES_DATA)) {
      const found = category.products?.find(
        (p) => slugify(p.name) === searchSlug
      );

      if (found) {
        navigate(`/products/${categoryKey}/${searchSlug}`, { replace: true });
        return;
      }
    }

    /* 2️⃣ SEARCH FLAT PRODUCTS LIST */
    const foundFlat = PRODUCTS_DATA.products.find(
      (p) =>
        slugify(p.brand) === searchSlug ||
        slugify(p.name) === searchSlug
    );

    if (foundFlat) {
      /**
       * IMPORTANT:
       * Flat products DO NOT map cleanly to category keys
       * So we redirect to product detail under "products"
       * OR you can create a mapping table later
       */
      navigate(`/products/${searchSlug}`, { replace: true });
      return;
    }

    /* 3️⃣ FALLBACK */
    navigate("/products", { replace: true });
  }, [slug, navigate]);

  return null;
}
