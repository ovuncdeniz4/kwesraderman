import Link from "next/link";
import { SITE } from "@/lib/constants";

export function EmptyPortfolio({ title }: { title: string }) {
  return (
    <section className="border border-line bg-paper px-8 py-16 text-center">
      <p className="text-[11px] tracking-[0.24em] text-kw uppercase">Portföy</p>
      <h2 className="serif mx-auto mt-3 max-w-xl text-3xl md:text-4xl">{title}</h2>
      <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-muted">
        Güncel satılık ve kiralık ilanlar admin panelinden yayınlandığında burada
        görünecek. Boğaz hattı için özel seçkiyi şimdiden konuşalım.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <a href={SITE.whatsapp} className="btn-primary">
          WhatsApp
        </a>
        <Link href="/iletisim" className="btn-ghost">
          Evinizi satalım
        </Link>
      </div>
    </section>
  );
}
