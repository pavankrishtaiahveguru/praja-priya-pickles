"use client";

import { motion } from "framer-motion";
import { Phone, CheckCircle2 } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";

export default function BulkOrders() {
  return (
    <section
      id="bulk"
      className="relative scroll-mt-24 overflow-hidden bg-[#FFFDF7] py-24"
    >
      {/* Background Blur */}
      <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-green-200/30 blur-3xl" />
      <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-yellow-200/30 blur-3xl" />

      <div className="container relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="overflow-hidden rounded-[36px] border border-white/60 bg-white/75 backdrop-blur-xl shadow-[0_25px_70px_rgba(0,0,0,0.08)]"
        >
          <div className="grid items-center gap-12 p-8 lg:grid-cols-2 lg:p-12">
            {/* Left Side */}
            <div>
              <span className="inline-flex rounded-full bg-[#EAF7DD] px-5 py-2 text-sm font-semibold text-[#085B2D]">
                📦 BULK SUPPLY
              </span>

              <h2 className="mt-6 font-[var(--font-playfair)] text-4xl font-bold leading-tight text-[#17301F] md:text-5xl">
                Bulk Orders for
                <span className="block text-[#37863C]">
                  Mango Brain & Lemon Brain
                </span>
              </h2>

              <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
                We supply premium quality <strong>Mango Brain</strong> and{" "}
                <strong>Lemon Brain</strong> in bulk quantities at competitive
                wholesale prices for retailers, wholesalers and food businesses.
              </p>

              <div className="mt-10 space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-[#085B2D]" size={22} />
                  <span className="font-medium text-gray-700">
                    Premium Quality Mango Brain
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-[#085B2D]" size={22} />
                  <span className="font-medium text-gray-700">
                    Premium Quality Lemon Brain
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-[#085B2D]" size={22} />
                  <span className="font-medium text-gray-700">
                    Bulk Quantity Available
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-[#085B2D]" size={22} />
                  <span className="font-medium text-gray-700">
                    Best Wholesale Prices
                  </span>
                </div>
              </div>
            </div>

            {/* Right Side */}
            <div className="rounded-[30px] border border-[#EAF7DD] bg-gradient-to-br from-[#F7FAF2] to-white p-8 shadow-lg">
              <h3 className="text-3xl font-bold text-[#17301F]">
                Wholesale Enquiries
              </h3>

              <p className="mt-4 leading-8 text-gray-600">
                Looking for bulk quantities of Mango Brain or Lemon Brain?
                Contact us today for pricing, availability and delivery details.
              </p>

              <div className="mt-8 rounded-2xl bg-[#EAF7DD] p-6">
                <h4 className="text-xl font-bold text-[#085B2D]">
                  Available Products
                </h4>

                <ul className="mt-4 space-y-3 text-gray-700">
                  <li>🥭 Mango Brain</li>
                  <li>🍋 Lemon Brain</li>
                </ul>
              </div>

              <div className="mt-8 flex flex-col gap-4">
                <a
                  href="tel:+919853866999"
                  className="flex h-14 items-center justify-center gap-2 rounded-full bg-[#52fa9d] font-semibold text-white transition hover:bg-[#0A6A35]"
                >
                  <Phone size={20} />
                  Call Now
                </a>

                <a
                  href="https://wa.me/919853866999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-14 items-center justify-center gap-2 rounded-full border border-[#085B2D] font-semibold text-[#085B2D] transition hover:bg-[#085B2D] hover:text-white"
                >
                  <FaWhatsapp size={20} />
                  WhatsApp Enquiry
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
