"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ShoppingBag } from "lucide-react";

export default function NotFound() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#FFFDF7] px-6 py-20">
      {/* Background Blurs */}
      <div className="absolute -left-24 top-20 h-80 w-80 rounded-full bg-green-200/30 blur-3xl" />
      <div className="absolute -right-24 bottom-20 h-80 w-80 rounded-full bg-yellow-200/30 blur-3xl" />

      <div className="relative mx-auto max-w-3xl text-center">
        {/* 404 */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="font-[var(--font-playfair)] text-8xl font-black text-[#085B2D] sm:text-9xl md:text-[10rem]"
        >
          404
        </motion.h1>

        {/* Badge */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mt-4 inline-flex rounded-full bg-[#EAF7DD] px-5 py-2 text-sm font-semibold text-[#085B2D]"
        >
          Oops! Page Not Found
        </motion.span>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mt-8 font-[var(--font-playfair)] text-4xl font-bold text-[#17301F] md:text-5xl"
        >
          Looks like this page
          <span className="block text-[#37863C]">has gone missing.</span>
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600"
        >
          The page you're looking for doesn't exist or may have been moved.
          Explore our authentic Andhra pickles and traditional podi's from the
          homepage.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="mt-12 flex flex-col justify-center gap-4 sm:flex-row"
        >
          <Link
            href="/"
            className="flex h-14 items-center justify-center gap-2 rounded-full bg-[#085B2D] px-8 font-semibold text-white shadow-lg shadow-green-900/15 transition-all duration-300 hover:-translate-y-1 hover:bg-[#0A6A35]"
          >
            <Home size={20} />
            Back to Home
          </Link>

          <Link
            href="/products"
            className="flex h-14 items-center justify-center gap-2 rounded-full border border-[#085B2D] bg-white px-8 font-semibold text-[#085B2D] transition-all duration-300 hover:bg-[#085B2D] hover:text-white"
          >
            <ShoppingBag size={20} />
            Browse Products
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
