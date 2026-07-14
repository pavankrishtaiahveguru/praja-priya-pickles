"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check } from "lucide-react";

/**
 * ComboModal
 *
 * Lets the user pick exactly `pack.maxSelection` products from
 * `categoryProducts` and hands the finished combo object to `onAddCombo`.
 *
 * INTEGRATION POINT:
 * `onAddCombo(comboCartItem)` is called with a ready-to-use cart object
 * (see shape below). Wire this up to your existing cart hook, e.g.:
 *
 *   const { addToCart } = useCart();
 *   <ComboModal ... onAddCombo={addToCart} />
 *
 * This component never touches the cart directly, so your existing
 * cart/checkout code stays untouched.
 */
export default function ComboModal({
  pack,
  categoryProducts,
  isOpen,
  onClose,
  onAddCombo,
}) {
  const [selected, setSelected] = useState([]);

  if (!pack) return null;

  const maxSelection = pack.maxSelection ?? 5;
  const isFull = selected.length >= maxSelection;

  const toggleProduct = (product) => {
    setSelected((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      }
      if (prev.length >= maxSelection) return prev;
      return [...prev, product];
    });
  };

  const handleClose = () => {
    setSelected([]);
    onClose();
  };

  const handleAddToCart = () => {
    if (selected.length !== maxSelection) return;

    const comboCartItem = {
      id: `${pack.id}-${Date.now()}`,
      type: "combo",
      comboType: pack.comboType,
      title: pack.title,
      image: pack.image,
      weight: pack.weight,
      price: pack.price,
      quantity: 1,
      selectedItems: selected.map((item) => item.name),
    };

    onAddCombo?.(comboCartItem);
    setSelected([]);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4 py-8"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5 sm:px-8">
              <div>
                <h3 className="font-[var(--font-playfair)] text-2xl font-bold text-[#17301F]">
                  {pack.modalTitle}
                </h3>
                <p className="mt-1 text-sm font-semibold text-[#37863C]">
                  Selected {selected.length} / {maxSelection}
                </p>
              </div>
              <button
                onClick={handleClose}
                className="rounded-full p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-8">
              {/* Product checklist */}
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {categoryProducts.map((product) => {
                  const checked = selected.some(
                    (item) => item.id === product.id,
                  );
                  const disabled = !checked && isFull;

                  return (
                    <label
                      key={product.id}
                      className={`group relative flex cursor-pointer flex-col items-center rounded-2xl border p-3 text-center shadow-sm transition-all duration-200
                        ${checked ? "border-[#085B2D] bg-green-50" : "border-gray-100 bg-white"}
                        ${disabled ? "cursor-not-allowed opacity-40" : "hover:border-[#37863C] hover:shadow-md"}`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        disabled={disabled}
                        onChange={() => toggleProduct(product)}
                        className="absolute right-2 top-2 h-5 w-5 accent-[#085B2D]"
                      />
                      <div className="h-20 w-20 overflow-hidden rounded-xl bg-gray-50 sm:h-24 sm:w-24">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <span className="mt-2 text-sm font-medium text-[#17301F]">
                        {product.name}
                      </span>
                      {checked && (
                        <span className="absolute left-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#085B2D] text-white">
                          <Check className="h-3 w-3" />
                        </span>
                      )}
                    </label>
                  );
                })}
              </div>

              {/* Selected items summary */}
              <div className="mt-8 rounded-2xl bg-[#FFFDF7] p-5">
                <h4 className="text-sm font-bold uppercase tracking-wide text-[#17301F]">
                  Selected Items
                </h4>
                {selected.length === 0 ? (
                  <p className="mt-2 text-sm text-gray-400">
                    No products selected yet.
                  </p>
                ) : (
                  <ul className="mt-2 space-y-1">
                    {selected.map((item) => (
                      <li key={item.id} className="text-sm text-gray-700">
                        • {item.name}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4">
                  <span className="text-sm font-semibold text-gray-600">
                    Total Weight
                  </span>
                  <span className="text-sm font-bold text-[#17301F]">
                    {pack.weightLabel}
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-600">
                    Price
                  </span>
                  <span className="text-lg font-bold text-[#085B2D]">
                    ₹{pack.price}
                  </span>
                </div>
              </div>
            </div>

            {/* Footer buttons */}
            <div className="flex items-center justify-end gap-3 border-t border-gray-100 px-6 py-5 sm:px-8">
              <button
                onClick={handleClose}
                className="rounded-full border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-600 transition hover:border-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleAddToCart}
                disabled={selected.length !== maxSelection}
                className="rounded-full bg-[#085B2D] px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-green-900/20 transition disabled:cursor-not-allowed disabled:bg-gray-300 disabled:shadow-none hover:enabled:bg-[#0a6e37]"
              >
                Add Combo To Cart
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
