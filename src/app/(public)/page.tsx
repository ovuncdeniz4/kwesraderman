import Link from "next/link";
import { EmptyPortfolio } from "@/components/EmptyPortfolio";
import { ListingCard } from "@/components/ListingCard";
import { SearchPanel } from "@/components/SearchPanel";
import { SITE } from "@/lib/constants";
import { listingCard, getFeaturedListings, getLiveListings } from "@/lib/listings";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [featured, live] = await Promise.all([
    getFeaturedListings(),
    getLiveListings(),
  ]);
  const cards = (featured.length ? featured : live.slice(0, 6)).map(listingCard);

  return (
    <main>
      <section className="hero-grid relative flex min-h-[88vh] items-end text-ivory">
        <div className="mx-auto w-full max-w-7xl px-5 pb-16 pt-36 md:px-8 md:pb-20">
          <p className="text-[11px] tracking-[0.28em] uppercase text-ivory/70">
            {SITE.office} · {SITE.team}
          </p>
          <h1 className="serif mt-4 max-w-3xl text-5xl leading-[1.05] md:text-7xl">
            Boğaz hattında
            <br />
            seçkin adresler.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-ivory/75">
            Bebek, Etiler, Ulus ve Sarıyer’de yalı, villa ve lüks konut. Esra
            Derman — dekorasyon editörlüğünden gayrimenkul danışmanlığına.
          </p>
          <div className="mt-10 max-w-5xl">
            <SearchPanel />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="text-[11px] tracking-[0.22em] text-kw uppercase">Öne çıkanlar</p>
            <h2 className="serif mt-2 text-4xl">Güncel portföy</h2>
          </div>
          <Link href="/satilik" className="hidden text-xs tracking-[0.18em] uppercase md:inline">
            Tümünü gör
          </Link>
        </div>
        {cards.length === 0 ? (
          <EmptyPortfolio title="Yeni seçki yayına hazırlanıyor." />
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {cards.map((listing) => (
              <ListingCard key={listing.slug} {...listing} />
            ))}
          </div>
        )}
      </section>

      <section className="bg-ink text-ivory">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:grid-cols-2 md:px-8">
          <div>
            <p className="text-[11px] tracking-[0.22em] uppercase text-stone">Danışman</p>
            <h2 className="serif mt-3 text-4xl md:text-5xl">Esra Derman</h2>
            <p className="mt-6 max-w-lg text-sm leading-8 text-stone">
              House Beautiful ve InStyle Home dekorasyon editörlüğü, ardından 2015’ten
              beri Keller Williams Platin / Team Derman. Avrupa Yakası Boğaz
              hattında yalı ve lüks konut.
            </p>
            <Link href="/hakkimizda" className="btn-ghost mt-8 border-ivory/40">
              Hikâyeyi oku
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ["Bölge", "Bebek, Etiler, Ulus, Sarıyer"],
              ["Odak", "Yalı, villa, prestij daire"],
              ["Ofis", "KW Platin, Akatlar"],
              ["İletişim", SITE.phone],
            ].map(([label, value]) => (
              <div key={label} className="border border-white/10 p-5">
                <p className="text-[11px] tracking-[0.18em] uppercase text-stone">{label}</p>
                <p className="mt-2 text-sm leading-6">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
