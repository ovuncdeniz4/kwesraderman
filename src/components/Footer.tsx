import Link from "next/link";
import { EsraMark, KwMark } from "@/components/BrandMark";
import { SITE } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="mt-auto bg-ink text-ivory">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-4 md:px-8">
        <div className="space-y-5 md:col-span-2">
          <EsraMark variant="light" className="h-12 w-auto" />
          <KwMark variant="light" className="h-10 w-auto" />
          <p className="max-w-md text-sm leading-7 text-stone">
            {SITE.tagline}. Bebek, Etiler, Ulus ve Sarıyer Boğaz hattında satılık
            ve kiralık lüks konut danışmanlığı.
          </p>
        </div>

        <div>
          <p className="text-[11px] tracking-[0.22em] uppercase text-stone">Keşfet</p>
          <div className="mt-4 flex flex-col gap-2 text-sm">
            <Link href="/satilik">Satılık portföy</Link>
            <Link href="/kiralik">Kiralık portföy</Link>
            <Link href="/hakkimizda">Hakkında</Link>
            <Link href="/iletisim">İletişim</Link>
            <Link href="/kvkk">KVKK</Link>
          </div>
        </div>

        <div>
          <p className="text-[11px] tracking-[0.22em] uppercase text-stone">Ofis</p>
          <div className="mt-4 space-y-3 text-sm leading-6 text-stone">
            <p>{SITE.address}</p>
            <p>
              <a href={SITE.phoneHref} className="text-ivory">
                {SITE.phone}
              </a>
              <br />
              Ofis:{" "}
              <a href={SITE.officePhoneHref} className="text-ivory">
                {SITE.officePhone}
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-5 py-5 text-xs leading-6 text-stone md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} {SITE.name} · {SITE.team} · {SITE.office}</p>
          <p>{SITE.ownership}</p>
        </div>
      </div>
    </footer>
  );
}
