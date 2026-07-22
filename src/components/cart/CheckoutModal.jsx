"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, ArrowLeft } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useCart } from "@/context/CartContext";

const fieldClass =
  "h-12 w-full rounded-xl border border-[#E5E7EB] bg-[#FCFCFA] px-4 text-[15px] text-[#17301F] placeholder:text-gray-400 outline-none transition-all duration-300 focus:border-[#085B2D] focus:bg-white focus:ring-2 focus:ring-[#085B2D]/15";

const labelClass = "mb-1.5 block text-[13px] font-semibold text-[#4B5A50]";

const weightLabel = (weight) => {
  if (!weight) return "1kg";
  if (weight === "halfKg" || weight === "500g" || weight === "500") {
    return "500g";
  }
  if (weight === "oneKg" || weight === "1kg" || weight === "1 Kg") {
    return "1kg";
  }
  return weight;
};

const getDisplayName = (item) => item?.name || item?.title || "Product";
const getDisplayWeight = (item) => {
  if (item?.type === "combo") {
    return item?.weight || "1kg";
  }

  return item?.weight || "1kg";
};
const getDisplayPrice = (item) => item?.price ?? 0;

const REQUIRED_FIELDS = [
  "name",
  "mobile",
  "address",
  "city",
  "district",
  "state",
  "pincode",
];

// Fixed delivery charge applied once per order (not per product).
const DELIVERY_CHARGE = 100;

// Small delay (ms) before clearing the cart / closing the modal, giving the
// browser time to actually open the WhatsApp window before we reset state.
const CART_CLEAR_DELAY_MS = 800;

// Converts a raw string like "ap" or "AP" or "andhra pradesh" into
// Title Case (e.g. "Ap", "Andhra Pradesh") after trimming whitespace.
const toTitleCase = (value) =>
  value
    .trim()
    .toLowerCase()
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

export default function CheckoutModal({ open, onClose }) {
  const { cart, getCartTotal, clearCart } = useCart();

  // Derived pricing values — single source of truth used by both the
  // Order Summary UI and the WhatsApp message so totals always match.
  const subtotal = getCartTotal();
  const grandTotal = subtotal + DELIVERY_CHARGE;

  // step: "summary" | "details"
  const [step, setStep] = useState("summary");

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    address: "",
    city: "",
    district: "",
    state: "",
    pincode: "",
    notes: "",
  });

  // Lock body scroll while the modal is open, restore on close/unmount.
  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  // Every time the modal is freshly opened, start back at the summary step.
  // (Form values are intentionally NOT cleared here — only on a completed
  // WhatsApp order via clearCart — so re-opening mid-edit doesn't lose data.)
  useEffect(() => {
    if (open) setStep("summary");
  }, [open]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Mobile / Pincode: digits only, hard-capped at their max length.
    if (name === "mobile") {
      setForm((prev) => ({
        ...prev,
        mobile: value.replace(/\D/g, "").slice(0, 10),
      }));
      return;
    }

    if (name === "pincode") {
      setForm((prev) => ({
        ...prev,
        pincode: value.replace(/\D/g, "").slice(0, 6),
      }));
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ===== Modified =====
  // Mobile Number must exist AND be exactly 10 digits.
  const isMobileValid =
    form.mobile.trim().length > 0 && /^\d{10}$/.test(form.mobile);
  const isPincodeValid = /^\d{6}$/.test(form.pincode);
  const areRequiredFieldsFilled = REQUIRED_FIELDS.every(
    (field) => form[field].trim() !== "",
  );
  const isFormValid =
    areRequiredFieldsFilled && isMobileValid && isPincodeValid;

  const showMobileError = form.mobile.length > 0 && !isMobileValid;
  const showPincodeError = form.pincode.length > 0 && !isPincodeValid;

  const handleWhatsApp = () => {
    if (
      !form.name ||
      !isMobileValid ||
      !form.address ||
      !form.city ||
      !form.district ||
      !form.state ||
      !form.pincode
    ) {
      alert("Please fill all required fields.");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    const whatsappNumber = "919853866999"; // <-- Replace with your number

    // Normalize customer-entered values before building the message.
    const customerName = form.name.trim();
    const customerMobile = form.mobile.trim();
    const customerAddress = form.address.trim();
    const customerCity = form.city.trim();
    const customerDistrict = form.district.trim();
    const customerState = toTitleCase(form.state);
    const customerPincode = form.pincode.trim();
    const customerNotes = form.notes.trim();

    let message = `🛒 *New Order - Praja Priya Pickles*\n\n`;

    message += `👤 *Customer Details*\n\n`;
    message += `Name : ${customerName}\n`;
    message += `Mobile : ${customerMobile}\n`;

    message += `\n📍 *Delivery Address*\n\n`;
    message += `Address : ${customerAddress}\n`;
    message += `City : ${customerCity}\n`;
    message += `District : ${customerDistrict}\n`;
    message += `State : ${customerState}\n`;
    message += `Pincode : ${customerPincode}\n`;

    if (customerNotes) {
      message += `Additional Notes : ${customerNotes}\n`;
    }

    message += `\n🛍️ *Products*\n`;

    cart.forEach((item, index) => {
      const displayName = getDisplayName(item);
      const displayWeight = weightLabel(getDisplayWeight(item));
      const itemSubtotal = getDisplayPrice(item) * item.quantity;

      message += `\n*${index + 1}*. ${displayName}\n`;
      message += `Weight : ${displayWeight}\n`;

      if (item?.type === "combo" && item?.selectedItems?.length) {
        message += `Selected Pickles :\n`;

        item.selectedItems.forEach((selectedItem) => {
          message += `• ${selectedItem}\n`;
        });
      }

      message += `Quantity : ${item.quantity}\n`;
      message += `Price : ₹${getDisplayPrice(item)}\n`;
      message += `Subtotal : ₹${itemSubtotal}\n`;
    });

    message += `\n━━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `Subtotal : ₹${subtotal}\n`;
    message += `Delivery Charge : ₹${DELIVERY_CHARGE}\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `💰 *Grand Total : ₹${grandTotal}*`;

    const encodedMessage = encodeURIComponent(message);

    const popup = window.open(
      `https://wa.me/${whatsappNumber}?text=${encodedMessage}`,
      "_blank",
    );

    // Only clear the cart / close the modal if the popup/tab was actually
    // opened — prevents accidental cart clearing if the browser blocks it.
    if (popup) {
      setTimeout(() => {
        clearCart();
        onClose();
      }, CART_CLEAR_DELAY_MS);
    }
  };

  const subtitle =
    step === "summary"
      ? "Review your order before continuing."
      : "Just a few more details to complete your order.";

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="checkout-modal-title"
            className="fixed left-1/2 top-1/2 z-[120] flex max-h-[85vh] w-[95%] max-w-[640px] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-2xl bg-white shadow-[0_30px_80px_rgba(8,91,45,0.18)]"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#EEF2E6] px-6 py-6 sm:px-8">
              <div>
                <h2
                  id="checkout-modal-title"
                  className="font-[var(--font-playfair)] text-2xl font-bold text-[#17301F] sm:text-3xl"
                >
                  Checkout
                </h2>

                <p className="mt-1 text-sm text-gray-500 sm:text-base">
                  {subtitle}
                </p>
              </div>

              <button
                onClick={onClose}
                aria-label="Close checkout"
                className="rounded-full p-2 text-[#17301F] transition-colors duration-300 hover:bg-[#F2F6EE] hover:text-[#085B2D]"
              >
                <X />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-8">
              <AnimatePresence mode="wait" initial={false}>
                {step === "summary" ? (
                  <motion.div
                    key="summary"
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <h3 className="mb-4 text-lg font-bold text-[#17301F]">
                      Your Order
                    </h3>

                    <div className="rounded-2xl border border-[#EEF2E6] bg-[#FAFCF7] p-5">
                      <div className="flex flex-col gap-4">
                        {cart.map((item, index) => (
                          <div
                            key={`${item.id}-${item.weight}-${index}`}
                            className="flex items-center gap-4"
                          >
                            <div className="relative h-[60px] w-[60px] shrink-0 overflow-hidden rounded-xl bg-white">
                              <Image
                                src={item.image}
                                alt={getDisplayName(item)}
                                fill
                                sizes="60px"
                                className="object-cover"
                              />
                            </div>

                            <div className="min-w-0 flex-1">
                              <p className="truncate text-[15px] font-semibold text-[#17301F]">
                                {getDisplayName(item)}
                              </p>
                              <p className="text-[13px] text-gray-500">
                                {weightLabel(getDisplayWeight(item))} · Qty:{" "}
                                {item.quantity} · ₹{getDisplayPrice(item)} each
                              </p>

                              {item?.type === "combo" &&
                                item?.selectedItems?.length > 0 && (
                                  <div className="mt-2 rounded-lg border border-[#EEF2E6] bg-white/70 px-3 py-2">
                                    <p className="text-[11px] font-semibold uppercase tracking-wide text-[#085B2D]">
                                      Selected Pickles
                                    </p>
                                    <ul className="mt-1 space-y-1">
                                      {item.selectedItems.map(
                                        (selectedItem, selectedIndex) => (
                                          <li
                                            key={`${item.id}-${selectedItem}-${selectedIndex}`}
                                            className="text-[12px] text-gray-600"
                                          >
                                            • {selectedItem}
                                          </li>
                                        ),
                                      )}
                                    </ul>
                                  </div>
                                )}
                            </div>

                            <p className="shrink-0 text-[15px] font-semibold text-[#085B2D]">
                              ₹{getDisplayPrice(item) * item.quantity}
                            </p>
                          </div>
                        ))}

                        {cart.length === 0 && (
                          <p className="text-sm text-gray-500">
                            Your cart is empty.
                          </p>
                        )}
                      </div>

                      <div className="mt-5 space-y-2 border-t border-[#EEF2E6] pt-4">
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <span>Subtotal</span>
                          <span>₹{subtotal}</span>
                        </div>

                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <span>Delivery</span>
                          {/* <span className="font-semibold text-[#085B2D]">
                            Extra
                          </span> */}
                          <span className="font-semibold text-orange-500">
                            + ₹{DELIVERY_CHARGE}
                          </span>
                        </div>

                        <div className="mt-2 flex items-center justify-between border-t border-[#EEF2E6] pt-3">
                          <span className="text-base font-bold text-[#17301F]">
                            Grand Total
                          </span>
                          <span className="text-2xl font-bold text-[#085B2D]">
                            ₹{grandTotal}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="details"
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 24 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <h3 className="mb-5 text-lg font-bold text-[#17301F]">
                      Customer Information
                    </h3>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="name" className={labelClass}>
                          Full Name *
                        </label>
                        <input
                          id="name"
                          name="name"
                          placeholder="Enter Full Name"
                          value={form.name}
                          onChange={handleChange}
                          className={fieldClass}
                        />
                      </div>

                      <div>
                        <label htmlFor="mobile" className={labelClass}>
                          Mobile Number *
                        </label>
                        <input
                          id="mobile"
                          name="mobile"
                          inputMode="numeric"
                          placeholder="Enter 10-digit mobile number"
                          value={form.mobile}
                          onChange={handleChange}
                          maxLength={10}
                          className={`${fieldClass} ${
                            showMobileError
                              ? "border-red-400 focus:border-red-400 focus:ring-red-100"
                              : ""
                          }`}
                        />
                        {showMobileError && (
                          <p className="mt-1 text-xs text-red-500">
                            Enter a valid 10-digit mobile number.
                          </p>
                        )}
                      </div>

                      <div className="sm:col-span-2">
                        <label htmlFor="address" className={labelClass}>
                          House / Street Address *
                        </label>
                        <input
                          id="address"
                          name="address"
                          placeholder="House no., street, area"
                          value={form.address}
                          onChange={handleChange}
                          className={fieldClass}
                        />
                      </div>

                      <div>
                        <label htmlFor="city" className={labelClass}>
                          City *
                        </label>
                        <input
                          id="city"
                          name="city"
                          placeholder="City"
                          value={form.city}
                          onChange={handleChange}
                          className={fieldClass}
                        />
                      </div>

                      <div>
                        <label htmlFor="district" className={labelClass}>
                          District *
                        </label>
                        <input
                          id="district"
                          name="district"
                          placeholder="District"
                          value={form.district}
                          onChange={handleChange}
                          className={fieldClass}
                        />
                      </div>

                      <div>
                        <label htmlFor="state" className={labelClass}>
                          State *
                        </label>
                        <input
                          id="state"
                          name="state"
                          placeholder="State"
                          value={form.state}
                          onChange={handleChange}
                          className={fieldClass}
                        />
                      </div>

                      <div>
                        <label htmlFor="pincode" className={labelClass}>
                          Pincode *
                        </label>
                        <input
                          id="pincode"
                          name="pincode"
                          inputMode="numeric"
                          placeholder="6-digit pincode"
                          value={form.pincode}
                          onChange={handleChange}
                          maxLength={6}
                          className={`${fieldClass} ${
                            showPincodeError
                              ? "border-red-400 focus:border-red-400 focus:ring-red-100"
                              : ""
                          }`}
                        />
                        {showPincodeError && (
                          <p className="mt-1 text-xs text-red-500">
                            Enter a valid 6-digit pincode.
                          </p>
                        )}
                      </div>

                      <div className="sm:col-span-2">
                        <label htmlFor="notes" className={labelClass}>
                          Additional Notes
                        </label>
                        <textarea
                          id="notes"
                          rows={4}
                          name="notes"
                          placeholder="Delivery instructions, preferences, etc."
                          value={form.notes}
                          onChange={handleChange}
                          className="min-h-[120px] w-full resize-none rounded-xl border border-[#E5E7EB] bg-[#FCFCFA] p-4 text-[15px] text-[#17301F] placeholder:text-gray-400 outline-none transition-all duration-300 focus:border-[#085B2D] focus:bg-white focus:ring-2 focus:ring-[#085B2D]/15"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="flex flex-col gap-3 border-t border-[#EEF2E6] bg-white px-6 py-5 sm:flex-row sm:px-8">
              {step === "summary" ? (
                <>
                  <button
                    onClick={onClose}
                    className="order-2 flex-1 rounded-full border border-[#085B2D] py-4 font-semibold text-[#085B2D] transition-all duration-300 hover:bg-[#085B2D] hover:text-white sm:order-1"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={() => setStep("details")}
                    disabled={cart.length === 0}
                    className="order-1 flex-1 rounded-full bg-[#085B2D] py-4 font-semibold text-white transition-all duration-300 hover:bg-[#40bf53] disabled:cursor-not-allowed disabled:opacity-50 sm:order-2"
                  >
                    Continue
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setStep("summary")}
                    className="order-2 flex flex-1 items-center justify-center gap-2 rounded-full border border-[#085B2D] py-4 font-semibold text-[#085B2D] transition-all duration-300 hover:bg-[#085B2D] hover:text-white sm:order-1"
                  >
                    <ArrowLeft size={18} />
                    Back
                  </button>

                  <button
                    onClick={handleWhatsApp}
                    disabled={!isFormValid}
                    aria-disabled={!isFormValid}
                    className="order-1 flex flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] py-4 font-semibold text-white shadow-[0_10px_25px_rgba(37,211,102,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#20BA5A] hover:shadow-[0_14px_32px_rgba(37,211,102,0.45)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:bg-[#25D366] disabled:hover:shadow-[0_10px_25px_rgba(37,211,102,0.35)] sm:order-2"
                  >
                    <FaWhatsapp size={20} />
                    Continue to WhatsApp
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
