import type { Metadata } from "next";
import "@fontsource/mali/500.css";
import "@fontsource/mali/600.css";
import "@fontsource/mali/700.css";
import "@fontsource/spectral/400.css";
import "@fontsource/spectral/500.css";
import "@fontsource/quicksand/500.css";
import "@fontsource/quicksand/600.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "SOKO Café & Bakery — Slow coffee. Fresh bakes.",
  description:
    "SOKO is a cosy café & bakery for slow coffee, flaky croissants and good days. Visit us, order a SOKO box, or join the neighbourhood list.",
  icons: { icon: "/img/logo-full.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/* Browser extensions add their own attributes to <body> before React
          hydrates; this stops that from being reported as a hydration mismatch. */}
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
