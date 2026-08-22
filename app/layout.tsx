import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Airbnb — Alojamientos y experiencias",
  description:
    "Clon de la interfaz de Airbnb construido con Next.js, React y Tailwind CSS.",
};

const RootLayout = ({ children }: LayoutProps<"/">) => (
  <html lang="es" className={`${inter.variable} h-full antialiased`}>
    <body className="min-h-full flex flex-col bg-white text-ink">{children}</body>
  </html>
);

export default RootLayout;
