import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import About from "@/components/sections/About";
import BulkOrders from "@/components/sections/BulkOrders";
import Contact from "@/components/sections/Contact";
import Hero from "@/components/sections/Hero";
import Products from "@/components/sections/Products";

export default function Page() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Products />
      <BulkOrders />
      <Contact />
      <Footer />
    </>
  );
}
