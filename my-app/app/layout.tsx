import type { Metadata } from "next";
import { Bodoni_Moda , Inter } from "next/font/google";
import "./globals.css";

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700", "800"],
});



export const metadata: Metadata = {
  title: "Colobix – Your Servers, Our Priority",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${bodoni.variable} ${inter.variable}`}
        style={{
          fontFamily: "var(--font-body), sans-serif",
          background: "#ffffff",
          color: "#1C0A2E",
          margin: 0,
        }}
      >
        {children}
      </body>
    </html>
  );
}