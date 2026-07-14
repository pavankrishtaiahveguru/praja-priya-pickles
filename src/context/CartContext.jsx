"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("praja-priya-cart");

    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch {
        setCart([]);
      }
    }
  }, []);

  // Save cart
  useEffect(() => {
    localStorage.setItem("praja-priya-cart", JSON.stringify(cart));
  }, [cart]);

  // Add Product
  const addToCart = (product, weight = "500g") => {
    const existingItem = cart.find(
      (item) => item.id === product.id && item.weight === weight,
    );

    if (existingItem) {
      setCart((prev) =>
        prev.map((item) =>
          item.id === product.id && item.weight === weight
            ? {
                ...item,
                quantity: Math.min(item.quantity + 1, 10),
              }
            : item,
        ),
      );

      return;
    }

    setCart((prev) => [
      ...prev,
      {
        ...product,
        weight,
        quantity: 1,
      },
    ]);
  };

  // Remove Product
  const removeFromCart = (id, weight) => {
    setCart((prev) =>
      prev.filter((item) => !(item.id === id && item.weight === weight)),
    );
  };

  // Increase Qty
  const increaseQty = (id, weight) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.weight === weight
          ? {
              ...item,
              quantity: Math.min(item.quantity + 1, 10),
            }
          : item,
      ),
    );
  };

  // Decrease Qty
  const decreaseQty = (id, weight) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id && item.weight === weight
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  // Update Weight
  const updateWeight = (id, oldWeight, newWeight) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.weight === oldWeight
          ? {
              ...item,
              weight: newWeight,
            }
          : item,
      ),
    );
  };

  // Clear Cart
  const clearCart = () => {
    setCart([]);
  };

  // Total Items
  const getCartCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Total Price
  const getCartTotal = () => {
    return cart.reduce(
      (total, item) => total + Number(item.price || 0) * item.quantity,
      0,
    );
  };

  const value = useMemo(
    () => ({
      cart,
      addToCart,
      removeFromCart,
      increaseQty,
      decreaseQty,
      updateWeight,
      clearCart,
      getCartCount,
      getCartTotal,
    }),
    [cart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
