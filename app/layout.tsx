import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Cormorant_Garamond, Manrope } from "next/font/google";

import "@/app/globals.css";
import { AppShell } from "@/components/app-shell";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"]
});

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"]
});

export const metadata: Metadata = {
  title: "Europe 2026",
  description: "Private family trip planner for a Europe 2026 holiday."
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="font-sans antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
