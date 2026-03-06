
import Navbar       from "@/components/NavBar";
import Hero         from "@/components/Hero";
import LogoStrip    from "@/components/LogoStrip";
import About        from "@/components/About";
import Features     from "@/components/Features";
import Products     from "@/components/Products";
import Stats        from "@/components/StatsSection";
import Pricing      from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import FAQ          from "@/components/FAQ";
import Contact      from "@/components/Contact";
import Footer       from "@/components/Footer";

export default function Home() {
  return (
    <main style={{ background: "#fff", color: "#12002e", overflowX: "hidden" }}>
      {/* <Cursor /> */}
      <Navbar />
      <Hero />
      <LogoStrip />
      <About />
      <Features />
      <Products />
      <Stats />
      <Pricing />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}