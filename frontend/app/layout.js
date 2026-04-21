import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import Header from "@/components/Header";
import { neobrutalism } from "@clerk/themes";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Servd - AI Recipes Platform",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: neobrutalism,
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="icon" href="/logo.png" sizes="any" />
        </head>
        <body className={`${inter.className}`}>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Toaster richColors />

          {/* Footer */}
          <footer className="relative border-t border-stone-200 bg-[#FDFCFB] overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.07),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(0,0,0,0.02),transparent_34%)]" />

            <div className="relative max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 py-12 md:py-14">

              {/* Top Section */}
              <div className="grid md:grid-cols-[1.1fr_1fr] gap-10 md:gap-14 items-center">

                {/* Brand */}
                <div className="flex items-center gap-4">
                  <div className="rounded-2xl border border-stone-200 bg-white shadow-sm p-2.5 ring-1 ring-stone-100">
                    <Image
                      src="/logo.png"
                      alt="Servd Logo"
                      width={48}
                      height={48}
                      className="w-10 md:w-11"
                    />
                  </div>

                  <div>
                    <h3 className="text-xl md:text-2xl font-bold tracking-tight text-stone-900">
                      Servd
                    </h3>
                    <p className="text-[11px] uppercase tracking-[0.30em] text-orange-500 font-semibold">
                      Premium AI Kitchen Platform
                    </p>
                  </div>
                </div>

                {/* Feature Pills */}
                <div className="flex flex-wrap md:justify-end gap-2.5 max-w-md ml-auto">
                  {[
                    "AI Powered",
                    "Smart Recipes",
                    "Modern UX",
                    "Built for Home Chefs",
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="px-4 py-2 rounded-full border border-stone-200 bg-white text-sm font-medium text-stone-700 shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="mt-10 h-px bg-linear-to-r from-transparent via-stone-300 to-transparent" />

              {/* Bottom Section */}
              <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-5">

                {/* Left */}
                <div className="text-center md:text-left">
                  <p className="text-sm text-stone-400">
                    © 2025 NutriChef · Designed for modern kitchens
                  </p>
                </div>

                {/* Right */}
                <div className="flex flex-col md:items-end items-center gap-3">
                  {/* Credit */}
                  <p className="text-sm text-stone-500 text-center md:text-right leading-relaxed">
                    Reimagined & Developed by{" "}
                    <span className="font-semibold text-stone-900">
                      Anurag Thakur
                    </span>
                  </p>
           
                </div>
              </div>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
