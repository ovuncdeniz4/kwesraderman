import { SITE } from "@/lib/constants";

export const metadata = { title: "Hakkında" };

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-5 pb-20 pt-32 md:px-8">
      <p className="text-[11px] tracking-[0.22em] text-kw uppercase">Hakkında</p>
      <h1 className="serif mt-3 text-5xl">Esra Derman</h1>
      <p className="mt-6 text-lg leading-8 text-muted">{SITE.tagline}</p>
      <div className="mt-10 space-y-6 text-base leading-8">
        <p>
          Yakın Doğu Üniversitesi İletişim Fakültesi Radyo-TV-Sinema mezunu. 2006–2007’de
          Elif’in Günlüğü dizisinde sanat yönetmenliği; ardından House Beautiful
          (Turkuvaz) ve InStyle / InStyle Home (Mutlu Dergi Grubu) bünyesinde
          dekorasyon editörlüğü.
        </p>
        <p>
          Şubat 2015’ten beri Keller Williams Platin’de Team Derman ile çalışıyor.
          Uzmanlık alanı Avrupa Yakası Boğaz hattı: Bebek, Etiler, Ulus, Tarabya,
          Baltalimanı ve Rumeli Hisarı’nda yalı, villa ve prestij daire.
        </p>
        <p>
          Ofis: KW Platin, Akatlar — {SITE.address}
        </p>
      </div>
    </main>
  );
}
