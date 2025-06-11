import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

/* const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
}); */

const inter = Inter({
  subsets: ['latin'], // Common subset
  weight: ['400', '700'], // Example: Regular and Bold
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "Personal Monster Siren Radio",
  description: "Data sourced from Hypergraph Monster Siren",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable}`}>
        {children}
      </body>
    </html>
  );
}
