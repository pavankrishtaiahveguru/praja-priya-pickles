"use client";

import { FaWhatsapp } from "react-icons/fa6";

export default function FloatingWhatsApp() {
  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/40" />

      <a
        href="https://wa.me/919853866999"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_30px_rgba(37,211,102,0.35)] transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:shadow-[0_12px_35px_rgba(37,211,102,0.5)]"
      >
        <FaWhatsapp size={34} />
      </a>
    </div>
  );
}
