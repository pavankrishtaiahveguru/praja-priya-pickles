"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

const features = [
  "40+ Years of Trusted Experience",
  <>
    FSSAI Certified
    <span className="block text-sm font-normal text-gray-500">
      Licence No. 1012000400244
    </span>
  </>,
  "100% Homemade Traditional Recipes",
  "Premium Ingredients & Authentic Andhra Taste",
];

const trustHighlights = [
  {
    icon: "🏆",
    title: "40+",
    subtitle: "Years of Experience",
  },
  {
    icon: "✅",
    title: "FSSAI Certified",
    subtitle: "Licence No. 1012000400244",
  },
  {
    icon: "🌿",
    title: "100%",
    subtitle: "Homemade",
  },
  {
    icon: "🥭",
    title: "Authentic",
    subtitle: "Andhra Taste",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative scroll-mt-24 overflow-hidden bg-white py-24 md:py-32"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-green-50 blur-3xl" />

        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-lime-50 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="order-1"
          >
            <div className="relative overflow-hidden rounded-[32px] shadow-2xl">
              {/* Experience Badge */}
              <div className="absolute left-5 top-5 z-10 rounded-2xl bg-[var(--primary)] px-4 py-3 text-center text-white shadow-lg">
                <p className="text-2xl font-bold leading-none">40+</p>
                <p className="mt-1 text-[11px] font-medium uppercase tracking-wide leading-tight">
                  Years
                  <br />
                  Experience
                </p>
              </div>

              <Image
                src="/images/about.png"
                alt="Praja Priya Pickles - 40+ years of authentic Andhra taste"
                width={900}
                height={900}
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="order-2 text-center lg:text-left"
          >
            <span className="inline-flex items-center rounded-full bg-green-50 px-5 py-2 text-sm font-semibold tracking-wide text-[var(--primary)]">
              🌿 About Us
            </span>

            <h2 className="mt-6 font-[var(--font-playfair)] text-4xl font-bold leading-tight text-[var(--foreground)] sm:text-5xl">
              Homemade Tradition, Trusted for Over 40 Years
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600 lg:mx-0">
              For over 40 years, Praja Priya Pickles has been trusted by
              families for homemade traditional recipes made with premium
              ingredients. Every pickle and podi is hygienically prepared to
              deliver authentic Andhra taste, offered at prices that make
              quality accessible to every home.
            </p>

            <ul className="mx-auto mt-8 flex max-w-xl flex-col gap-4 lg:mx-0">
              {features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center justify-center gap-3 lg:justify-start"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--primary)] text-white">
                    <Check size={14} strokeWidth={3} />
                  </span>

                  <span className="text-base font-medium text-[var(--foreground)]">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            {/* Trust Highlights */}
            <div className="mt-10">
              <h3 className="text-lg font-semibold text-[var(--foreground)]">
                Why Families Trust Us
              </h3>

              <div className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
                {trustHighlights.map((item) => (
                  <motion.div
                    key={item.title}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.25 }}
                    className="rounded-2xl border border-green-100 bg-white p-4 text-center shadow-sm transition-shadow duration-300 hover:shadow-md"
                  >
                    <span className="text-2xl">{item.icon}</span>

                    <p className="mt-2 text-base font-bold text-[var(--foreground)]">
                      {item.title}
                    </p>

                    <p className="mt-1 text-xs leading-snug text-gray-500">
                      {item.subtitle}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
