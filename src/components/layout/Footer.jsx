import Link from "next/link";
import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";
import { FaInstagram } from "react-icons/fa6";
import DevelopedByStaffArc from "../DevelopedByStaffArc";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const products = [
    "Veg Pickles",
    "Non-Veg Pickles",
    "Traditional Podulu",
  ];

  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "#about" },
    { label: "Products", href: "#products" },
    { label: "Bulk Orders", href: "#bulk" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <footer className="bg-[var(--primary)] text-white">
      {/* Top */}
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 xl:px-0">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {/* Brand */}
          <div className="animate-[fadeUp_0.6s_ease-out] text-center sm:text-left">
            <h2 className="mb-2 font-[var(--font-playfair)] text-[36px] font-bold leading-tight">
              Praja Priya Pickles
            </h2>

            <p className="mb-5 text-sm font-medium uppercase tracking-[0.18em] text-[var(--lime)]">
              Homemade &amp; Handcrafted
            </p>

            <p className="max-w-sm text-base leading-8 text-green-100 mx-auto sm:mx-0">
              Authentic homemade Andhra pickles and traditional podulu prepared
              with premium ingredients, traditional recipes, and lots of love.
            </p>

            <div className="mt-7 flex items-center justify-center gap-4 sm:justify-start">
              <a
                href="https://www.instagram.com/me_pachalla_prasad"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Praja Priya Pickles on Instagram"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 transition-all duration-300 hover:scale-110 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--lime)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--primary)]"
              >
                <FaInstagram
                  size={30}
                  className="text-[#E1306C] transition-colors duration-300 hover:text-[#C13584]"
                />
              </a>
            </div>
          </div>

          {/* Products */}
          <div className="text-center sm:text-left">
            <h3 className="mb-7 text-[22px] font-semibold">Our Products</h3>

            <ul className="space-y-4">
              {products.map((product) => (
                <li key={product}>
                  <a
                    href="#products"
                    className="group inline-flex items-center gap-1.5 text-base leading-7 text-green-100 transition-colors duration-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--lime)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--primary)] rounded-sm"
                  >
                    {product}
                    <ArrowUpRight
                      size={15}
                      className="translate-x-0 -translate-y-0 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h3 className="mb-7 text-[22px] font-semibold">Quick Links</h3>

            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  {link.href.startsWith("#") ? (
                    <a
                      href={link.href}
                      className="text-base leading-7 text-green-100 transition-colors duration-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--lime)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--primary)] rounded-sm"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-base leading-7 text-green-100 transition-colors duration-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--lime)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--primary)] rounded-sm"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div id="contact" className="text-center sm:text-left">
            <h3 className="mb-7 text-[22px] font-semibold">Contact Us</h3>

            <div className="space-y-5">
              <div className="flex items-center justify-center gap-3 sm:justify-start">
                <Phone
                  className="shrink-0 text-[var(--lime)]"
                  size={18}
                  aria-hidden="true"
                />

                <a
                  href="tel:+919853866999"
                  className="text-base leading-7 text-green-100 transition-colors duration-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--lime)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--primary)] rounded-sm"
                >
                  +91 98538 66999
                </a>
              </div>

              <div className="flex items-center justify-center gap-3 sm:justify-start">
                <Mail
                  className="shrink-0 text-[var(--lime)]"
                  size={18}
                  aria-hidden="true"
                />

                <a
                  href="mailto:prajapriyapickles@gmail.com"
                  className="break-all text-base leading-7 text-green-100 transition-colors duration-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--lime)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--primary)] rounded-sm"
                >
                  prajapriyapickles@gmail.com
                </a>
              </div>

              <div className="flex items-start justify-center gap-3 sm:justify-start">
                <MapPin
                  className="mt-1 shrink-0 text-[var(--lime)]"
                  size={18}
                  aria-hidden="true"
                />

                <p className="max-w-[220px] text-base leading-8 text-green-100 sm:max-w-none">
                  Main Road, Right Side, 3rd Building, Narkedimilli, Atreyapuram
                  Mandal, Dr. B. R. Ambedkar Konaseema, Andhra Pradesh.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-green-100 lg:flex-row lg:px-8 xl:px-0">
          <p className="text-center lg:text-left">
            © {currentYear} Praja Priya Pickles. All Rights Reserved.
          </p>

          <DevelopedByStaffArc />
        </div>
      </div>
    </footer>
  );
}
