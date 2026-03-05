import Navbar from "@/components/NavBar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import About from "@/components/About";
import StatsSection from "@/components/StatsSection";
import Products from "@/components/Products";

export default function Home() {
  return (
    <main className="bg-white dark:bg-[#060505] text-slate-900 dark:text-slate-100 font-sans overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Features />
      <Products />
      <Pricing />
  
      <Testimonials />
      <FAQ />
          {/* <StatsSection /> */}
      <Contact />
      <Footer />
    </main>
  );
}