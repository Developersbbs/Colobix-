
import Navbar       from "@/components/landing-page/NavBar";
import Hero         from "@/components/landing-page/Hero";
import LogoStrip    from "@/components/landing-page/LogoStrip";
import About        from "@/components/landing-page/About";
import Features     from "@/components/landing-page/Features";
import Products     from "@/components/landing-page/Products";
import Stats        from "@/components/landing-page/StatsSection";
import Pricing      from "@/components/landing-page/Pricing";
import Testimonials from "@/components/landing-page/Testimonials";
import FAQ          from "@/components/landing-page/FAQ";
import Contact      from "@/components/landing-page/Contact";
import Footer       from "@/components/landing-page/Footer";

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