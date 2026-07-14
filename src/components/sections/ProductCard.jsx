"use client";
import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";

const weightOptions = [
  { key: "halfKg", label: "500g" },
  { key: "oneKg", label: "1kg" },
];

// How long the "Add to Cart" button stays disabled after a click, to guard
// against double-clicks/rapid taps creating duplicate add-to-cart calls.
const ADD_TO_CART_LOCK_MS = 600;

export default function ProductCard({ product, index }) {
  const hasWeightPricing = product.price && typeof product.price === "object";

  const [selectedWeight, setSelectedWeight] = useState("halfKg");
  const [isAdding, setIsAdding] = useState(false);

  // ===== Modified =====
  // Guards against rapid duplicate clicks in addition to the `isAdding`
  // state (state updates are async, so a ref catches clicks that land in
  // the same tick before a re-render disables the button).
  const isAddingRef = useRef(false);

  const displayPrice = hasWeightPricing
    ? product.price[selectedWeight]
    : product.price;

  const isValidPrice = typeof displayPrice === "number" && displayPrice > 0;

  const { addToCart } = useCart();

  // ===== Modified =====
  // Builds a fresh cart object instead of spreading the raw product, so the
  // original `product` (and its nested `price` object) is never touched,
  // and no unrelated fields leak into the cart entry.
  const handleAddToCart = useCallback(() => {
    if (!isValidPrice || isAddingRef.current) return;

    isAddingRef.current = true;
    setIsAdding(true);

    const cartProduct = {
      id: product.id,
      name: product.name,
      image: product.image,
      price: displayPrice,
      weight: hasWeightPricing ? selectedWeight : null,
    };

    // NOTE: duplicate-entry prevention (increasing quantity instead of
    // pushing a new line item) and the max-quantity-of-10 cap need to live
    // inside CartContext's addToCart, since that's where the source of
    // truth for cart state lives — e.g.:
    //   setCart(prev => {
    //     const existing = prev.find(i => i.id === item.id && i.weight === item.weight);
    //     if (existing) {
    //       return prev.map(i => i === existing
    //         ? { ...i, quantity: Math.min(i.quantity + 1, 10) }
    //         : i);
    //     }
    //     return [...prev, { ...item, quantity: 1 }];
    //   });
    addToCart(cartProduct, selectedWeight);

    setTimeout(() => {
      isAddingRef.current = false;
      setIsAdding(false);
    }, ADD_TO_CART_LOCK_MS);
  }, [
    addToCart,
    displayPrice,
    hasWeightPricing,
    isValidPrice,
    product,
    selectedWeight,
  ]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.45,
        delay: index * 0.08,
      }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className="group overflow-hidden rounded-2xl border border-[#EEF2E6] bg-white shadow-[0_12px_35px_rgba(0,0,0,0.05)] transition-all duration-300 hover:shadow-[0_22px_55px_rgba(8,91,45,0.12)]"
    >
      {/* Image */}
      <div className="relative h-50 overflow-hidden bg-[#F7FAF2]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          loading={index === 0 ? "eager" : "lazy"}
          priority={index === 0}
          sizes="(max-width:640px) 100vw,
         (max-width:768px) 50vw,
         (max-width:1024px) 33vw,
         25vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="line-clamp-2 min-h-[40px] font-[var(--font-playfair)] text-2xl font-bold text-[#17301F]">
          {product.name}
        </h3>

        {displayPrice && (
          <p className="mt-2 text-2xl font-bold text-[#085B2D]">
            ₹{displayPrice}
          </p>
        )}

        {/* Weight Selector */}
        {hasWeightPricing && (
          <div
            className="mt-2 flex gap-2"
            role="group"
            aria-label={`Select weight for ${product.name}`}
          >
            {weightOptions.map((option) => {
              const active = selectedWeight === option.key;

              return (
                <button
                  key={option.key}
                  type="button"
                  onClick={() => setSelectedWeight(option.key)}
                  aria-pressed={active}
                  className={`flex h-10 flex-1 items-center justify-center rounded-full text-[14px] font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#085B2D] focus-visible:ring-offset-2 ${
                    active
                      ? "bg-[#40bf53] text-white shadow-md shadow-green-900/20"
                      : "border border-[#E5E7EB] bg-white text-gray-600 hover:border-[#085B2D] hover:text-[#085B2D]"
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        )}

        <div className="mt-4">
          {/* Add to Cart */}
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={!isValidPrice || isAdding}
            aria-label={
              isValidPrice
                ? `Add ${product.name} (${
                    hasWeightPricing
                      ? weightOptions.find((o) => o.key === selectedWeight)
                          ?.label
                      : ""
                  }) to cart`
                : `${product.name} is currently unavailable`
            }
            aria-busy={isAdding}
            className="flex h-12 w-full items-center justify-center rounded-full bg-[#085B2D] px-5 text-[15px] font-semibold text-white transition-all duration-300 hover:bg-[#40bf53] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#085B2D] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-[#085B2D]"
          >
            {!isValidPrice
              ? "Unavailable"
              : isAdding
                ? "Added ✓"
                : "Add to Cart"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
