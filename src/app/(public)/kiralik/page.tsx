import { EmptyPortfolio } from "@/components/EmptyPortfolio";
import { ListingCard } from "@/components/ListingCard";
import { SearchPanel } from "@/components/SearchPanel";
import { listingCard, getLiveListings } from "@/lib/listings";

export const dynamic = "force-dynamic";
export const metadata = { title: "Kiralık" };

export default async function KiralikPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; district?: string; q?: string }>;
}) {
  const params = await searchParams;
  const listings = (
    await getLiveListings({
      purpose: "rent",
      type: params.type,
      district: params.district,
      q: params.q,
    })
  ).map(listingCard);

  return (
    <main className="mx-auto w-full max-w-7xl px-5 pb-20 pt-32 md:px-8">
      <p className="text-[11px] tracking-[0.22em] text-kw uppercase">Portföy</p>
      <h1 className="serif mt-2 text-5xl">Kiralık</h1>
      <div className="mt-8">
        <SearchPanel purpose="rent" compact />
      </div>
      <p className="mt-6 text-sm text-muted">{listings.length} ilan</p>
      {listings.length === 0 ? (
        <div className="mt-8">
          <EmptyPortfolio title="Kiralık ilan henüz yayınlanmadı." />
        </div>
      ) : (
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {listings.map((listing) => (
            <ListingCard key={listing.slug} {...listing} />
          ))}
        </div>
      )}
    </main>
  );
}
