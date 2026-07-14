"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import CartDrawer from "@/components/cart/CartDrawer";
import CheckoutModal from "@/components/cart/CheckoutModal";

const navLinks = [
  { name: "Home", href: "#home", sectionId: "home" },
  { name: "About", href: "#about", sectionId: "about" },
  { name: "Products", href: "#products", sectionId: "products" },
  { name: "Bulk Orders", href: "#bulk", sectionId: "bulk" },
  { name: "Contact", href: "#contact", sectionId: "contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const { cart, getCartCount } = useCart();

  const cartCount =
    typeof getCartCount === "function"
      ? getCartCount()
      : (cart ?? []).reduce((total, item) => total + item.quantity, 0);

  const handleCartClick = () => {
    setCartOpen(true);
  };

  const handleCartClose = () => {
    setCartOpen(false);
  };

  const handleCheckoutOpen = () => {
    setCartOpen(false);
    setCheckoutOpen(true);
  };

  const handleCheckoutClose = () => {
    setCheckoutOpen(false);
  };

  useEffect(() => {
    const sections = navLinks
      .map((item) => document.getElementById(item.sectionId))
      .filter(Boolean);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      {
        root: null,
        threshold: [0.1, 0.2, 0.3],
        rootMargin: "-10% 0px -40% 0px",
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (event, href) => {
    event.preventDefault();
    setIsOpen(false);

    const targetId = href.replace("#", "");
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", href);
      setActiveSection(targetId);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[#C5EA58] bg-white/95 backdrop-blur-md">
        <div className="relative mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            href="#home"
            onClick={(event) => handleNavClick(event, "#home")}
            className="flex items-center gap-3"
          >
            <Image
              src="/logo/logo.png"
              alt="Praja Priya Pickles"
              width={90}
              height={90}
              priority
              className="h-auto w-16 sm:w-20 md:w-24 lg:w-28"
            />
            <div>
              <h1 className="font-[var(--font-playfair)] text-xl font-bold text-[var(--primary)]">
                Praja Priya
              </h1>

              <p className="text-xs font-medium tracking-wide text-gray-600">
                Homemade Pickles
              </p>
            </div>
          </Link>

          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-10 md:flex">
            {navLinks.map((item) => {
              const isActive = activeSection === item.sectionId;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={(event) => handleNavClick(event, item.href)}
                  className={`group relative inline-flex py-2 text-[17px] font-semibold transition-colors duration-300 ${
                    isActive
                      ? "text-[var(--primary)]"
                      : "text-gray-700 hover:text-[var(--primary)]"
                  }`}
                >
                  <span className="relative inline-flex w-fit">
                    {item.name}
                  </span>

                  <span
                    className={`absolute -bottom-1 left-0 h-[2.5px] w-full origin-center rounded-full bg-[var(--primary)] transition-transform duration-300 ease-out ${
                      isActive
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={handleCartClick}
              aria-label="Shopping Cart"
              className="relative flex h-11 w-11 items-center justify-center rounded-full border border-[#E5E7EB] bg-white transition-all duration-300 hover:border-[#085B2D] hover:bg-[#085B2D] hover:text-white"
            >
              <ShoppingCart size={22} />

              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#D93736] px-1 text-[11px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              className="text-[var(--primary)] md:hidden"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="border-t border-gray-200 bg-white md:hidden">
            <div className="mx-auto flex w-full max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8">
              {navLinks.map((item) => {
                const isActive = activeSection === item.sectionId;

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={(event) => handleNavClick(event, item.href)}
                    className={`py-3 text-lg font-medium transition ${
                      isActive
                        ? "text-[var(--primary)]"
                        : "text-gray-700 hover:text-[var(--primary)]"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </header>

      <CartDrawer
        open={cartOpen}
        onClose={handleCartClose}
        onCheckout={handleCheckoutOpen}
      />

      <CheckoutModal open={checkoutOpen} onClose={handleCheckoutClose} />
    </>
  );
}
