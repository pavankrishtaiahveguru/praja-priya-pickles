import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  metadataBase: new URL("https://prajapriyapickles.com"),

  title: {
    default: "Praja Priya Pickles | Authentic Homemade Andhra Pickles",
    template: "%s | Praja Priya Pickles",
  },

  description:
    "Praja Priya Pickles offers authentic homemade Andhra veg pickles, non-veg pickles, traditional podulu, and combo packs at the best prices. Freshly prepared with premium ingredients.",

  keywords: [
    "Praja Priya Pickles",
    "Andhra Pickles",
    "Homemade Pickles",
    "Veg Pickles",
    "Non Veg Pickles",
    "Chicken Pickle",
    "Mutton Pickle",
    "Fish Pickle",
    "Prawns Pickle",
    "Mango Pickle",
    "Gongura Pickle",
    "Podulu",
    "Karam Podi",
    "Andhra Foods",
    "Konaseema Pickles",
  ],

  authors: [
    {
      name: "Praja Priya Pickles",
    },
  ],

  creator: "Praja Priya Pickles",

  openGraph: {
    title: "Praja Priya Pickles",
    description: "Authentic Homemade Andhra Pickles & Traditional Podulu.",
    url: "https://prajapriyapickles.com",
    siteName: "Praja Priya Pickles",
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Praja Priya Pickles",
    description: "Authentic Homemade Andhra Pickles & Traditional Podulu.",
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/icon.png",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-[var(--background)] text-[var(--foreground)] font-sans antialiased">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
