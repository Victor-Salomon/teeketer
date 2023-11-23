import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Navigation/Header";
import Footer from "@/components/Navigation/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Keeper Ticketing",
  description: "A dApp built with Keeper, powered by Ternoa.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} antialiased h-full`}>
        <div className="flex flex-col h-full">
          <Header />
          <main className="flex-1 container m-auto pt-24 pb-12">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
