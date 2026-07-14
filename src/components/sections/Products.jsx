"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { productCategories } from "@/data/productsData";
import ProductCard from "./ProductCard";
import SamplePacks from "./SamplePacks";
import { useCart } from "@/context/CartContext";

export default function Products() {
  const [activeCategory, setActiveCategory] = useState("all");
  const { addToCart } = useCart();

  // Flatten every category's products into a single "All" list
  const allProducts = useMemo(
    () =>
      productCategories.flatMap((category) =>
        category.products.map((product) => ({
          ...product,
          // keep keys unique across categories in case IDs repeat
          _key: `${category.id}-${product.id}`,
        })),
      ),
    [],
  );

  const tabs = useMemo(
    () => [
      { id: "all", title: "All" },
      ...productCategories,
      { id: "sample-packs", title: "Sample Packs" },
    ],
    [],
  );

  const isSamplePacks = activeCategory === "sample-packs";

  const currentCategory =
    activeCategory === "all"
      ? { id: "all", title: "All", products: allProducts }
      : (productCategories.find((item) => item.id === activeCategory) ??
        productCategories[0]);

  return (
    <section
      id="products"
      className="relative scroll-mt-24 overflow-hidden bg-[#FFFDF7] py-24"
    >
      {/* Background Blur */}
      <div className="absolute left-0 top-20 h-72 w-72 rounded-full bg-green-200/30 blur-3xl" />
      <div className="absolute right-0 bottom-20 h-72 w-72 rounded-full bg-yellow-200/30 blur-3xl" />

      <div className="container relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex rounded-full bg-green-100 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#085B2D]">
            Our Products
          </span>

          <h2 className="mt-6 font-[var(--font-playfair)] text-4xl font-bold leading-tight text-[#17301F] md:text-5xl lg:text-6xl">
            Authentic Andhra
            <span className="block text-[#37863C]">
              Pickles & Traditional Podi's
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            Discover our wide range of authentic Andhra Pickles and Traditional
            Podi's prepared with quality ingredients and offered at the best
            prices.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          viewport={{ once: true }}
          className="mt-14 flex flex-wrap justify-center gap-4"
        >
          {tabs.map((category) => {
            const active = activeCategory === category.id;

            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                aria-pressed={active}
                className={`relative overflow-hidden rounded-full px-7 py-3 text-[16px] font-semibold transition-all duration-300

                ${
                  active
                    ? "bg-[#085B2D] text-white shadow-xl shadow-green-900/20"
                    : "border border-[#E5E7EB] bg-white text-gray-700 hover:border-[#085B2D] hover:text-[#085B2D]"
                }`}
              >
                {category.title}
              </button>
            );
          })}
        </motion.div>

        {/* Products Grid / Sample Packs */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-16"
          >
            {isSamplePacks ? (
              <SamplePacks onAddCombo={addToCart} />
            ) : (
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {currentCategory.products.map((product, index) => (
                  <ProductCard
                    key={product._key ?? product.id}
                    product={product}
                    index={index}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
