"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Playfair_Display,
  Dancing_Script,
  Cormorant_Garamond,
} from "next/font/google";
import { ShoppingBag, Leaf, CookingPot, Package2 } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-playfair",
});

const script = Dancing_Script({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-script",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-cormorant",
});

export default function Hero() {
  return (
    <section
      id="home"
      className={`${playfair.variable} ${script.variable} ${cormorant.variable} relative scroll-mt-24 overflow-hidden bg-gradient-to-b from-[#FFFDF6] via-[#FBF3D9] to-[#EFF6DC]`}
    >
      {/* Glass Marquee */}
      <div className="absolute top-0 left-0 z-30 w-full overflow-hidden border-b border-white/20 bg-white/15 backdrop-blur-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
        <div className="flex whitespace-nowrap py-3 animate-marquee">
          {[...Array(3)].map((_, repeat) => (
            <div key={repeat} className="flex shrink-0 items-center">
              {[...Array(8)].map((_, index) => (
                <span
                  key={index}
                  className="flex items-center px-10 text-sm font-bold uppercase tracking-[4px] text-red-600 md:text-base"
                >
                  <span className="font-[family-name:var(--font-cormorant)] text-base font-bold tracking-[5px] drop-shadow-sm md:text-lg">
                    PRASAD SPICES
                  </span>

                  <span className="ml-10 text-green-600/80">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>

        {/* Optional subtle highlight */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/70" />
      </div>
      {/* Background Blur / Glows */}
      <div className="pointer-events-none absolute -left-16 top-0 h-56 w-56 rounded-full bg-yellow-200/50 blur-3xl sm:-left-20 sm:h-64 sm:w-64 lg:-left-28 lg:top-10 lg:h-80 lg:w-80" />
      <div className="pointer-events-none absolute -right-16 top-1/3 h-56 w-56 rounded-full bg-green-200/50 blur-3xl sm:-right-20 sm:h-64 sm:w-64 lg:-right-28 lg:h-80 lg:w-80" />
      <div className="pointer-events-none absolute bottom-0 left-1/4 h-48 w-48 rounded-full bg-lime-200/40 blur-3xl lg:h-64 lg:w-64" />

      {/* Decorative Leaf Accent — desktop only, bottom-left of section */}
      <div className="pointer-events-none absolute -left-25 bottom-10 hidden h-40 w-40 -rotate-[100deg] opacity-40 blur-[3px] sm:block md:h-48 md:w-48 lg:h-56 lg:w-56">
        <Image
          src="/images/leafs.png"
          alt=""
          fill
          sizes="224px"
          aria-hidden="true"
          className="object-contain"
        />
      </div>

      <div className="container relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-14 sm:px-6 sm:py-20 md:gap-12 lg:grid-cols-2 lg:gap-14 lg:px-8 lg:py-14">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-wide text-[#2F6E1F] ring-1 ring-green-200 sm:text-xs">
            🌿 100% Homemade • Traditional Andhra Taste
          </span>

          <h1 className="mt-6 font-[family-name:var(--font-playfair)] text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-[3.75rem] xl:text-7xl">
            <span className="block text-[#173D0E]">Authentic</span>
            <span className="block text-[#3E9F2F]">Andhra Pickles</span>
            <span className="block text-[#3B2312]">&amp; Traditional</span>
            <span className="relative mt-1 inline-block font-[family-name:var(--font-script)] text-[#2E8B22]">
              Podulu
              <svg
                className="absolute -bottom-2 left-0 h-3 w-full text-[#2E8B22]"
                viewBox="0 0 200 20"
                preserveAspectRatio="none"
                fill="none"
              >
                <path
                  d="M2 12C40 4 80 18 110 10C140 2 170 14 198 8"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-lg text-base leading-8 text-gray-600 sm:text-lg lg:mx-0">
            Experience the rich homemade taste of authentic Andhra Pickles,
            Non-Veg Pickles and Traditional Spice Powders prepared with premium
            ingredients, traditional recipes, and lots of love.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row lg:justify-start">
            <button className="group flex h-[60px] min-w-[230px] items-center justify-center gap-3 rounded-full bg-[#2F7A1F] px-10 text-[20px] font-semibold text-white shadow-[0_10px_25px_rgba(47,122,31,0.25)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_35px_rgba(47,122,31,0.35)]">
              <ShoppingBag size={22} />
              Shop Now
            </button>

            <button className="group flex h-[60px] min-w-[300px] items-center justify-center gap-3 rounded-full border-2 border-[#2F7A1F] bg-white px-10 text-[20px] font-semibold text-[#2F7A1F] shadow-[0_8px_20px_rgba(0,0,0,0.06)] transition-all duration-300 hover:bg-[#2F7A1F] hover:text-white">
              <FaWhatsapp size={22} />
              WhatsApp Order
            </button>
          </div>

          {/* Stats Card */}
          <div className="mt-14 w-full max-w-[560px] overflow-hidden rounded-2xl bg-white/0 shadow-[0_20px_60px_rgba(0,0,0,0.08)] ring-1 ring-black/5">
            <div className="grid grid-cols-3">
              <div className="flex flex-col items-center py-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#bcfab0]">
                  <CookingPot className="h-4 w-4 text-[#2F7A1F]" />
                </div>

                <h3 className="mt-5 font-[var(--font-playfair)] text-3xl font-bold text-[#111827]">
                  20+
                </h3>

                <p className="mt-2 text-center text-[17px] text-gray-600">
                  Pickle Varieties
                </p>
              </div>

              <div className="flex flex-col items-center border-x border-gray-100 py-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#bcfab0]">
                  <CookingPot className="h-4 w-4 text-[#2F7A1F]" />
                </div>

                <h3 className="mt-5 font-[var(--font-playfair)] text-3xl font-bold text-[#111827]">
                  8+
                </h3>

                <p className="mt-2 text-center text-[17px] text-gray-600">
                  Traditional Podulu
                </p>
              </div>

              <div className="flex flex-col items-center py-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#bcfab0]">
                  <Leaf className="h-4 w-4 text-[#2F7A1F]" />
                </div>

                <h3 className="mt-5 font-[var(--font-playfair)] text-3xl font-bold text-[#111827]">
                  100%
                </h3>

                <p className="mt-2 text-center text-[17px] text-gray-600">
                  Homemade
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9 }}
          className="relative mx-auto w-full max-w-[280px] sm:max-w-[360px] md:max-w-[440px] lg:max-w-[500px] xl:max-w-[600px]"
        >
          {/*
            This wrapper is a fixed, self-contained aspect-square box.
            Every floating card below is positioned as a PERCENTAGE of
            *this* box, so the layout stays correct whether the real
            image is loaded, still missing, or a different aspect ratio.
          */}
          <div className="relative aspect-square w-full">
            {/* Soft glow behind product */}
            <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
              <div className="h-[70%] w-[70%] rounded-full bg-gradient-to-br from-yellow-200/40 to-green-200/40 blur-3xl" />
            </div>

            {/* Decorative leaf — anchored to the image container itself so it
                sits right next to the jar on every breakpoint, including the
                mobile stacked layout, instead of floating near the headline */}
            <div className="pointer-events-none absolute -right-25 -top-4 z-0 h-30 w-30 rotate-12 opacity-60 blur-[3px] sm:-right-6 sm:-top-6 sm:h-32 sm:w-32 md:-right-20 md:-top-10 md:h-50 md:w-40 lg:-right-60 lg:-top-50 lg:h-72 lg:w-72 xl:h-96 xl:w-96">
              <Image
                src="/images/leafs.png"
                alt=""
                fill
                sizes="(max-width:640px) 120px,
                  (max-width:768px) 160px,
                  (max-width:1024px) 200px,
                  288px"
                aria-hidden="true"
                className="object-contain"
              />
            </div>

            {/* Main Product — swap the src below once you have the real asset */}
            <Image
              src="/images/hero-pickles.png"
              alt="Praja Priya Pickles - Authentic Andhra Pickles and Traditional Podulu"
              fill
              priority
              sizes="(min-width: 1200px) 600px, (min-width: 1024px) 500px, (min-width: 768px) 440px, (min-width: 640px) 360px, 280px"
              className="object-contain drop-shadow-2xl"
            />

            {/* Floating Card 1 — top, slightly left of center */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-[2%] top-[5%] block w-28 rounded-xl bg-white/90 p-2 shadow-lg ring-1 ring-black/[0.03] backdrop-blur-sm sm:left-[4%] sm:top-[8%] sm:w-32 sm:rounded-2xl sm:p-3 sm:shadow-xl md:left-[10%] md:top-[10%] md:w-36 md:p-4 lg:left-[-5%] lg:top-[12%] lg:w-44 lg:p-5 xl:w-48"
            >
              <h4 className="flex items-center gap-1.5 text-[11px] font-bold text-[#2F7A1F] sm:text-xs md:text-sm lg:text-base">
                🥭 Veg Pickles
              </h4>
              <p className="mt-1 text-[9px] leading-snug text-gray-500 sm:text-[10px] md:mt-1.5 md:text-xs lg:mt-2 lg:text-sm">
                Mango • Lemon
                <br />
                Gongura &amp; More
              </p>
            </motion.div>

            {/* Floating Card 2 — top right */}
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute right-[0%] top-[18%] block w-28 rounded-xl bg-white/90 p-2 shadow-lg ring-1 ring-black/[0.03] backdrop-blur-sm sm:right-[-4%] sm:top-[20%] sm:w-32 sm:rounded-2xl sm:p-3 sm:shadow-xl md:right-[-8%] md:top-[20%] md:w-36 md:p-4 lg:right-[-15%] lg:w-44 lg:p-5 xl:w-48"
            >
              <h4 className="flex items-center gap-1.5 text-[11px] font-bold text-[#B3261E] sm:text-xs md:text-sm lg:text-base">
                🍗 Non-Veg Pickles
              </h4>
              <p className="mt-1 text-[9px] leading-snug text-gray-500 sm:text-[10px] md:mt-1.5 md:text-xs lg:mt-2 lg:text-sm">
                Chicken • Mutton
                <br />
                Fish &amp; More
              </p>
            </motion.div>

            {/* Floating Card 3 — bottom center */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute bottom-[2%] left-[30%] block w-28 -translate-x-1/2 rounded-xl bg-white/90 p-2 shadow-lg ring-1 ring-black/[0.03] backdrop-blur-sm sm:bottom-[5%] sm:left-[32%] sm:w-32 sm:rounded-2xl sm:p-3 sm:shadow-xl md:bottom-[8%] md:left-[35%] md:w-36 md:p-4 lg:w-44 lg:p-5 xl:w-48"
            >
              <h4 className="flex items-center gap-1.5 text-[11px] font-bold text-[#2F7A1F] sm:text-xs md:text-sm lg:text-base">
                🌶️ Podulu
              </h4>
              <p className="mt-1 text-[9px] leading-snug text-gray-500 sm:text-[10px] md:mt-1.5 md:text-xs lg:mt-2 lg:text-sm">
                Freshly Ground
                <br />
                Every Batch
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
