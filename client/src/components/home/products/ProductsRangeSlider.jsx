import { useState, useEffect } from "react";
import axios from "axios";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { slugify } from "@/lib/slugify";

export default function ProductRangeSlider() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/api/products");
      // Optionally shuffle or select specific products
      // For now, taking the first 10 or randomizing
      const shuffled = data.sort(() => 0.5 - Math.random());
      setProducts(shuffled.slice(0, 10)); // Display up to 10 random products
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products for slider", error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-10 bg-white min-h-[400px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </section>
    );
  }

  if (products.length === 0) return null;

  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4">

        <div className=" py-4 mb-10">
          <h2 className="text-center text-3xl font-bold text-black">
            Our Products Range
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {products.map((product, index) => (
                <CarouselItem
                  key={product._id || index}
                  className="basis-full sm:basis-1/2 lg:basis-1/4"
                >
                  <Link
                    to={`/products/${slugify(product.category || 'general')}/${product.slug || slugify(product.name)}`}
                    className="block h-full"
                  >
                    <div className="border rounded-xl p-4 h-full flex flex-col items-center justify-center hover:shadow-lg transition-all cursor-pointer bg-white group border-gray-100">
                      <div className="w-full h-48 flex items-center justify-center mb-4 overflow-hidden rounded-lg bg-gray-50">
                        <img
                          src={product.images?.[0] || "/product-placeholder.png"}
                          alt={product.name}
                          className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/product-placeholder.png";
                          }}
                        />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800 text-center group-hover:text-blue-600 transition-colors line-clamp-1">{product.name}</h3>
                      <p className="text-sm text-gray-500 text-center mt-1 line-clamp-1">{product.composition}</p>
                    </div>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </motion.div>

        {/* Dots Indicator (Optional, can be removed if dynamic list is too long) */}
        <div className="flex justify-center mt-6 gap-2">
          {products.slice(0, 5).map((_, i) => (
            <span
              key={i}
              className="h-2 w-2 rounded-full bg-gray-300"
            />
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <Button variant="outline" className="px-6">
            Download Brochure →
          </Button>
        </div>
      </div>
    </section>
  );
}
