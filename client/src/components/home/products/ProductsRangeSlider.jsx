import { PRODUCT_RANGE_SLIDER_DATA } from "@/data/home/products.data";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function ProductRangeSlider() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">

        <div className=" py-4 mb-10">
          <h2 className="text-center text-3xl font-bold text-black">
            {PRODUCT_RANGE_SLIDER_DATA.title}
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
              {PRODUCT_RANGE_SLIDER_DATA.products.map((product, index) => (
                <CarouselItem
                  key={index}
                  className="basis-full sm:basis-1/2 lg:basis-1/4"
                >
                  <div className="border rounded p-4 h-full flex items-center justify-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="max-h-56 object-contain"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </motion.div>

        <div className="flex justify-center mt-6 gap-2">
          {PRODUCT_RANGE_SLIDER_DATA.products.map((_, i) => (
            <span
              key={i}
              className="h-2 w-2 rounded-full bg-gray-400"
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
