import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Colobix – Enterprise Server Infrastructure",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={outfit.variable}
        style={{ fontFamily: "var(--font-outfit), sans-serif", background: "#ffffff", color: "#1a0533", margin: 0 }}
      >
        {children}
      </body>
    </html>
  );
}