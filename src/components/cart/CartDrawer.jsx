"use client";

import { useEffect } from "react";
import { X, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import CartItem from "./CartItem";

export default function CartDrawer({ open, onClose, onCheckout }) {
  const { cart, getCartTotal } = useCart();

  useEffect(() => {
    if (!open) return;

    const body = document.body;
    const html = document.documentElement;

    const previousBodyOverflow = body.style.overflow;
    const previousHtmlOverflow = html.style.overflow;

    // Lock only the background page — no global wheel/touchmove blocking,
    // since that also blocked scrolling inside the drawer itself.
    body.style.overflow = "hidden";
    html.style.overflow = "hidden";

    return () => {
      body.style.overflow = previousBodyOverflow;
      html.style.overflow = previousHtmlOverflow;
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[90] bg-black/40 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35 }}
            className="fixed right-0 top-0 z-[100] flex h-dvh w-full max-w-md flex-col overflow-hidden bg-white shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-200 p-6">
              <div>
                <h2 className="font-[var(--font-playfair)] text-2xl font-bold text-[#17301F]">
                  Shopping Cart
                </h2>

                <p className="text-sm text-gray-500">
                  {cart.length} item{cart.length !== 1 && "s"}
                </p>
              </div>

              <button
                onClick={onClose}
                className="rounded-full p-2 transition hover:bg-gray-100"
              >
                <X size={22} />
              </button>
            </div>

            {/* Items */}
            <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain p-6">
              {cart.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center px-6 text-center">
                  <ShoppingBag size={70} className="text-[#085B2D]/30" />

                  <h3 className="mt-6 font-[var(--font-playfair)] text-2xl font-bold text-[#17301F]">
                    Your Cart is Empty
                  </h3>

                  <p className="mt-2 max-w-xs text-gray-500">
                    Looks like you haven't added any delicious pickles yet.
                  </p>

                  <button
                    onClick={() => {
                      onClose();

                      const section = document.getElementById("products");

                      if (section) {
                        section.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                      }
                    }}
                    className="mt-8 rounded-full bg-[#085B2D] px-8 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#0A6A35] hover:shadow-lg"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-5">
                  {cart.map((item) => (
                    <CartItem key={`${item.id}-${item.weight}`} item={item} />
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="border-t border-gray-200 p-6">
                <div className="mb-6 flex items-center justify-between">
                  <span className="text-lg font-medium text-gray-600">
                    Total
                  </span>

                  <span className="text-3xl font-bold text-[#085B2D]">
                    ₹{getCartTotal()}
                  </span>
                </div>

                <button
                  onClick={onCheckout}
                  className="flex h-14 w-full items-center justify-center rounded-full bg-[#085B2D] text-lg font-semibold text-white transition-all duration-300 hover:bg-[#0A6A35]"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
