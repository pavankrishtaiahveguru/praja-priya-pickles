"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { samplePacks } from "@/data/samplepacksdata";
import { productCategories } from "@/data/productsData";
import ComboModal from "./ComboModal";

/**
 * SamplePacks
 *
 * Renders the 3 premium combo cards shown when the "Sample Packs" tab
 * is active on the Products section. Opens ComboModal on "Create Combo".
 *
 * INTEGRATION POINT: pass your cart hook's add function down as
 * `onAddCombo` (see ComboModal.jsx header comment).
 */
export default function SamplePacks({ onAddCombo }) {
  const [activePack, setActivePack] = useState(null);

  const getCategoryProducts = (categoryId) =>
    productCategories.find((category) => category.id === categoryId)
      ?.products ?? [];

  return (
    <>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {samplePacks.map((pack, index) => (
          <motion.div
            key={pack.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="flex flex-col rounded-3xl bg-white p-6 text-center shadow-xl shadow-gray-200/60 ring-1 ring-gray-100"
          >
            <span className="text-4xl">{pack.emoji}</span>

            <h3 className="mt-4 font-[var(--font-playfair)] text-xl font-bold text-[#17301F]">
              {pack.title}
            </h3>
            <p className="mt-2 text-sm text-gray-600">{pack.description}</p>

            <div className="mt-6 flex items-center justify-center gap-8 rounded-2xl bg-[#FFFDF7] py-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Total Weight
                </p>
                <p className="mt-1 text-base font-bold text-[#17301F]">
                  {pack.weightLabel}
                </p>
              </div>
              <div className="h-8 w-px bg-gray-200" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Price
                </p>
                <p className="mt-1 text-base font-bold text-[#085B2D]">
                  ₹{pack.price}
                </p>
              </div>
            </div>

            <button
              onClick={() => setActivePack(pack)}
              className="mt-6 rounded-full bg-[#085B2D] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-green-900/20 transition hover:bg-[#0a6e37]"
            >
              Create Combo
            </button>
          </motion.div>
        ))}
      </div>

      <ComboModal
        pack={activePack}
        categoryProducts={
          activePack ? getCategoryProducts(activePack.categoryId) : []
        }
        isOpen={!!activePack}
        onClose={() => setActivePack(null)}
        onAddCombo={onAddCombo}
      />
    </>
  );
}
