"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Leaf } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

// WhatsApp business number (with country code, no spaces/symbols)
const WHATSAPP_NUMBER = "919853866999";

export default function Contact() {
  // Controlled form state — needed so we can read the values on submit
  // and build the WhatsApp message text from them.
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Build a readable multi-line message from the form fields
    const text =
      `*New Enquiry from Website*\n\n` +
      `*Name:* ${formData.name || "-"}\n` +
      `*Mobile:* ${formData.mobile || "-"}\n` +
      `*Email:* ${formData.email || "-"}\n` +
      `*Subject:* ${formData.subject || "-"}\n` +
      `*Message:* ${formData.message || "-"}`;

    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}`;

    // Open WhatsApp (app on mobile, WhatsApp Web on desktop) in a new tab
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      id="contact"
      // CHANGED: py-24 -> py-16 (~30% reduction in section vertical padding)
      className="relative scroll-mt-24 overflow-hidden bg-[#FFFDF7] py-16"
    >
      {/* Background Blur */}
      <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-green-200/30 blur-3xl" />
      <div className="absolute -right-20 bottom-20 h-72 w-72 rounded-full bg-yellow-200/30 blur-3xl" />

      <div className="container relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ========================= */}
        {/* Section Header */}
        {/* ========================= */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-5 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#085B2D]">
            <Leaf size={14} />
            Contact Us
          </span>

          {/* CHANGED: mt-6 -> mt-4 (tighter gap below badge) */}
          <h2 className="mt-4 font-[var(--font-playfair)] text-4xl font-bold leading-tight text-[#17301F] md:text-5xl lg:text-6xl">
            Let's Bring Authentic Andhra
            <span className="block text-[#37863C]">Flavors to Your Home</span>
          </h2>

          {/* CHANGED: mt-6 -> mt-4 (tighter gap below heading) */}
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-gray-600">
            Whether you're looking to place an order, inquire about our
            products, or become a distributor, we're always happy to help. Reach
            out and experience the authentic homemade taste of Andhra.
          </p>
        </motion.div>

        {/* ========================= */}
        {/* Contact Layout */}
        {/* ========================= */}

        {/* CHANGED: mt-20 -> mt-12, gap-10 -> gap-8 (reduces overall section height) */}
        <div className="mt-12 grid gap-8 lg:grid-cols-[420px_1fr]">
          {/* ================================= */}
          {/* Left Contact Information Card */}
          {/* ================================= */}

          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            // CHANGED: p-8 -> p-6 md:p-8 (per spec, applied to both cards for consistency)
            className="rounded-2xl border border-white/60 bg-white/70 p-6 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.06)] md:p-8"
          >
            <span className="rounded-full bg-[#EAF7DD] px-4 py-2 text-sm font-semibold text-[#085B2D]">
              Contact Information
            </span>

            {/* CHANGED: mt-6 -> mt-4 */}
            <h3 className="mt-4 font-[var(--font-playfair)] text-3xl font-bold text-[#17301F]">
              We're Here To Help
            </h3>

            {/* CHANGED: mt-4 -> mt-3 */}
            <p className="mt-3 leading-8 text-gray-600">
              Feel free to contact us for product enquiries, wholesale orders,
              bulk bookings, or any assistance regarding our homemade pickles
              and traditional podi's.
            </p>

            {/* Contact List */}
            {/* CHANGED: mt-10 space-y-6 -> mt-6 space-y-4 (more compact list) */}
            <div className="mt-6 space-y-4">
              {/* Phone */}

              {/* CHANGED: gap-5 -> gap-4 */}
              <div className="flex items-start gap-4">
                {/* CHANGED: h-14 w-14 -> h-12 w-12 */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#EAF7DD] text-[#085B2D]">
                  {/* CHANGED: icon size 22 -> 20 */}
                  <Phone size={20} />
                </div>

                <div>
                  <h4 className="font-semibold text-[#17301F]">Phone</h4>

                  <p className="mt-1 text-gray-600">+91 98538 66999</p>
                </div>
              </div>

              {/* Email */}

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#EAF7DD] text-[#085B2D]">
                  <Mail size={20} />
                </div>

                <div>
                  <h4 className="font-semibold text-[#17301F]">Email</h4>

                  <p className="mt-1 break-all text-gray-600">
                    info@prajapriyapickles.com
                  </p>
                </div>
              </div>

              {/* Address */}

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#EAF7DD] text-[#085B2D]">
                  <MapPin size={20} />
                </div>

                <div>
                  <h4 className="font-semibold text-[#17301F]">Address</h4>

                  <p className="mt-1 text-gray-600">
                    Praja Priya Pickles
                    <br />
                    Atreyapuram (M),
                    <br />
                    Dr. B. R. Ambedkar Konaseema,
                    <br />
                    Andhra Pradesh, India
                  </p>
                </div>
              </div>

              {/* Business Hours */}

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#EAF7DD] text-[#085B2D]">
                  <Clock size={20} />
                </div>

                <div>
                  <h4 className="font-semibold text-[#17301F]">
                    Business Hours
                  </h4>

                  <p className="mt-1 text-gray-600">
                    Monday - Sunday
                    <br />
                    9:00 AM - 8:00 PM
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ================================= */}
          {/* Premium Contact Form */}
          {/* ================================= */}

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            // CHANGED: p-8 md:p-10 -> p-6 md:p-8
            className="rounded-2xl border border-white/60 bg-white/70 p-6 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.06)] md:p-8"
          >
            <span className="rounded-full bg-[#EAF7DD] px-4 py-2 text-sm font-semibold text-[#085B2D]">
              Send Message
            </span>

            {/* CHANGED: mt-6 -> mt-4 */}
            <h3 className="mt-4 font-[var(--font-playfair)] text-3xl font-bold text-[#17301F]">
              We'd Love to Hear From You
            </h3>

            {/* CHANGED: mt-10 space-y-6 -> mt-6 space-y-5 */}
            <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
              {/* Row 1: Name & Mobile */}

              {/* CHANGED: gap-6 -> gap-4 */}
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#17301F]">
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="h-14 w-full rounded-2xl border border-[#E5E7EB] bg-[#FCFCFA] px-5 outline-none transition-all duration-300 focus:border-[#085B2D] focus:ring-4 focus:ring-green-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#17301F]">
                    Mobile Number
                  </label>

                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="h-14 w-full rounded-2xl border border-[#E5E7EB] bg-[#FCFCFA] px-5 outline-none transition-all duration-300 focus:border-[#085B2D] focus:ring-4 focus:ring-green-100"
                  />
                </div>
              </div>

              {/* Row 2: Email & Subject */}
              {/* CHANGED: Email and Subject were previously two separate
                  full-width rows; now combined into one row (matching
                  Name/Mobile pattern) to save vertical space */}
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#17301F]">
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="h-14 w-full rounded-2xl border border-[#E5E7EB] bg-[#FCFCFA] px-5 outline-none transition-all duration-300 focus:border-[#085B2D] focus:ring-4 focus:ring-green-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#17301F]">
                    Subject
                  </label>

                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Order / Bulk Order / Dealership"
                    className="h-14 w-full rounded-2xl border border-[#E5E7EB] bg-[#FCFCFA] px-5 outline-none transition-all duration-300 focus:border-[#085B2D] focus:ring-4 focus:ring-green-100"
                  />
                </div>
              </div>

              {/* Row 3: Message */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#17301F]">
                  Message
                </label>

                {/* CHANGED: rows={6} -> rows={4}, added h-36 to cap height */}
                <textarea
                  rows={4}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message..."
                  className="h-36 w-full resize-none rounded-2xl border border-[#E5E7EB] bg-[#FCFCFA] p-5 outline-none transition-all duration-300 focus:border-[#085B2D] focus:ring-4 focus:ring-green-100"
                />
              </div>

              {/* Submit button — builds a WhatsApp deep link from the
                  form fields above and opens it in a new tab/app */}
              <div className="flex flex-col pt-1 sm:flex-row">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="group flex h-12 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#0A7D3C] to-[#085B2D] px-6 text-[15px] font-semibold text-white shadow-[0_12px_30px_rgba(8,91,45,0.25)] transition-all duration-300 hover:shadow-[0_18px_40px_rgba(8,91,45,0.35)] md:h-14 md:text-base"
                >
                  <FaWhatsapp
                    size={20}
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                  <span>Send via WhatsApp</span>
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
