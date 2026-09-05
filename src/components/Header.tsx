"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { EsraMark, KwMark } from "@/components/BrandMark";
import { SITE } from "@/lib/constants";

const NAV = [
  { href: "/satilik", label: "Satılık" },
  { href: "/kiralik", label: "Kiralık" },
  { href: "/hakkimizda", label: "Hakkında" },
  { href: "/iletisim", label: "İletişim" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const onHero = pathname === "/";

  return (
    <header
      className={`absolute inset-x-0 top-0 z-40 ${
        onHero ? "text-ivory" : "text-ink"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-5 md:px-8">
        <Link href="/" className="flex items-center gap-5" onClick={() => setOpen(false)}>
          <EsraMark variant={onHero ? "light" : "dark"} className="h-11 w-auto" />
          <span className={`hidden h-8 w-px md:block ${onHero ? "bg-white/25" : "bg-line"}`} />
          <KwMark variant={onHero ? "light" : "dark"} className="hidden h-9 w-auto md:block" />
        </Link>

        <nav className="hidden items-center gap-8 text-[12px] tracking-[0.22em] uppercase lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`hover:opacity-70 ${pathname.startsWith(item.href) ? "opacity-100" : "opacity-80"}`}
            >
              {item.label}
            </Link>
          ))}
          <a href={SITE.whatsapp} className="btn-primary">
            WhatsApp
          </a>
        </nav>

        <button
          type="button"
          className="text-xs tracking-[0.2em] uppercase lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
        >
          {open ? "Kapat" : "Menü"}
        </button>
      </div>

      {open ? (
        <div className="border-t border-white/15 bg-ink px-5 py-6 text-ivory lg:hidden">
          <div className="flex flex-col gap-4 text-sm tracking-[0.18em] uppercase">
            {NAV.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ))}
            <a href={SITE.whatsapp} onClick={() => setOpen(false)}>
              WhatsApp
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
