"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartItem({ item }) {
  const { increaseQty, decreaseQty, removeFromCart } = useCart();

  return (
    <div className="rounded-2xl border border-[#E8F1DF] bg-white p-2 shadow-sm transition-all duration-300 hover:shadow-md">
      <div className="flex gap-4">
        {/* Product Image */}
        <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl bg-[#F7FAF2]">
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="80px"
            className="object-cover"
          />
        </div>

        {/* Right Content */}
        <div className="flex flex-1 flex-col justify-between">
          {/* Product Name + Delete */}
          <div className="flex items-start justify-between gap-3">
            <h3 className="line-clamp-1 font-[var(--font-playfair)] text-xl font-bold text-[#17301F]">
              {item.name}
            </h3>

            <button
              onClick={() => removeFromCart(item.id, item.weight)}
              className="rounded-full p-1.5 mr-2 text-red-500 transition hover:bg-red-50"
            >
              <Trash2 size={18} />
            </button>
          </div>

          {/* Weight & Price */}
          <div className="mt-2 flex items-center justify-between">
            <span className="rounded-full bg-[#F3F9E8] px-3 py-1 text-xs font-semibold text-[#085B2D]">
              {item.weight === "halfKg" ||
              item.weight === "500g" ||
              item.weight === "500"
                ? "500g"
                : "1kg"}
            </span>

            <span className="text-2xl font-bold text-[#085B2D]">
              ₹{item.price}
            </span>
          </div>

          {/* Quantity */}
          <div className="mt-3">
            <div className="flex w-fit items-center overflow-hidden rounded-full border border-[#DCE8CF] bg-white">
              <button
                onClick={() => decreaseQty(item.id, item.weight)}
                className="flex h-9 w-10 items-center justify-center transition hover:bg-[#F7FAF2]"
              >
                <Minus size={16} />
              </button>

              <span className="flex h-9 min-w-[44px] items-center justify-center text-base font-semibold text-[#17301F]">
                {item.quantity}
              </span>

              <button
                onClick={() => increaseQty(item.id, item.weight)}
                disabled={item.quantity >= 10}
                className="flex h-9 w-10 items-center justify-center transition hover:bg-[#F7FAF2] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
