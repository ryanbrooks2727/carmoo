import type { Metadata } from "next";
import { Poppins, Comfortaa } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-comfortaa",
});

const comfortaa = Comfortaa({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-brand",
});

export const metadata: Metadata = {
  title: "carmoo — Buy & Sell Direct",
  description: "Buy or sell your car directly, for free — no dealer markup, every listing quality-checked. Moving to an EV-only marketplace with a full warranty program as we grow.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${comfortaa.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col" style={{ fontFamily: "var(--font-comfortaa), sans-serif" }}>{children}</body>
    </html>
  );
}
