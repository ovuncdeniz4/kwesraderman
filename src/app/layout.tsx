import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import { SITE } from "@/lib/constants";
import "./globals.css";

const sans = Outfit({
  variable: "--font-sans",
  subsets: ["latin", "latin-ext"],
});

const serif = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} · ${SITE.office}`,
    template: `%s · ${SITE.name}`,
  },
  description: `${SITE.tagline}. ${SITE.team}, ${SITE.office} bünyesinde Bebek, Etiler ve Sarıyer Boğaz hattı lüks konut danışmanlığı.`,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="tr" className={`${sans.variable} ${serif.variable} h-full`}>
      <body className="flex min-h-full flex-col antialiased">{children}</body>
    </html>
  );
}
