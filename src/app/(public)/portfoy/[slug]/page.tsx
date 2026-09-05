import Image from "next/image";
import { notFound } from "next/navigation";
import { ContactForm } from "@/components/ContactForm";
import { SITE } from "@/lib/constants";
import { formatLocation, formatPrice, parseAmenities, purposeLabel } from "@/lib/format";
import { getLiveListingBySlug } from "@/lib/listings";

export const dynamic = "force-dynamic";

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const listing = await getLiveListingBySlug(slug);
  if (!listing) notFound();

  const amenities = parseAmenities(listing.amenities);

  return (
    <main className="mx-auto w-full max-w-7xl px-5 pb-20 pt-28 md:px-8">
      <p className="text-[11px] tracking-[0.2em] text-muted uppercase">
        {purposeLabel(listing.purpose)} · {listing.type} · Ref {listing.refNo}
      </p>
      <h1 className="serif mt-3 max-w-4xl text-4xl md:text-5xl">{listing.title}</h1>
      <p className="mt-3 text-muted">{formatLocation(listing)}</p>

      <div className="mt-8 grid gap-2 md:grid-cols-2">
        {listing.images.length === 0 ? (
          <div className="flex min-h-[360px] items-end bg-ink p-6 text-ivory">
            <p className="text-sm tracking-[0.16em] uppercase">{listing.type}</p>
          </div>
        ) : (
          listing.images.map((image) => (
            <div key={image.id} className="relative min-h-[280px] bg-ink">
              <Image
                src={image.url}
                alt={listing.title}
                fill
                className="object-cover"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            </div>
          ))
        )}
      </div>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1.4fr_0.8fr]">
        <article>
          <p className="serif text-3xl">
            {formatPrice(listing.priceAmount, listing.priceOnRequest, listing.priceCurrency)}
          </p>
          <dl className="mt-8 grid grid-cols-2 gap-4 text-sm md:grid-cols-3">
            {listing.rooms ? (
              <div className="border border-line bg-paper p-4">
                <dt className="text-[11px] tracking-[0.16em] text-muted uppercase">Oda</dt>
                <dd className="mt-1">{listing.rooms}</dd>
              </div>
            ) : null}
            {listing.bathrooms ? (
              <div className="border border-line bg-paper p-4">
                <dt className="text-[11px] tracking-[0.16em] text-muted uppercase">Banyo</dt>
                <dd className="mt-1">{listing.bathrooms}</dd>
              </div>
            ) : null}
            {listing.grossM2 ? (
              <div className="border border-line bg-paper p-4">
                <dt className="text-[11px] tracking-[0.16em] text-muted uppercase">Brüt</dt>
                <dd className="mt-1">{listing.grossM2} m²</dd>
              </div>
            ) : null}
            {listing.netM2 ? (
              <div className="border border-line bg-paper p-4">
                <dt className="text-[11px] tracking-[0.16em] text-muted uppercase">Net</dt>
                <dd className="mt-1">{listing.netM2} m²</dd>
              </div>
            ) : null}
            {listing.parking ? (
              <div className="border border-line bg-paper p-4">
                <dt className="text-[11px] tracking-[0.16em] text-muted uppercase">Otopark</dt>
                <dd className="mt-1">{listing.parking}</dd>
              </div>
            ) : null}
            {listing.elevator ? (
              <div className="border border-line bg-paper p-4">
                <dt className="text-[11px] tracking-[0.16em] text-muted uppercase">Asansör</dt>
                <dd className="mt-1">Var</dd>
              </div>
            ) : null}
          </dl>
          <p className="mt-8 whitespace-pre-line text-base leading-8 text-ink/90">
            {listing.description}
          </p>
          {amenities.length ? (
            <ul className="mt-8 flex flex-wrap gap-2">
              {amenities.map((item) => (
                <li key={item} className="border border-line px-3 py-1 text-xs tracking-[0.08em] uppercase">
                  {item}
                </li>
              ))}
            </ul>
          ) : null}
        </article>

        <aside className="h-fit border border-line bg-paper p-6">
          <p className="text-[11px] tracking-[0.2em] text-muted uppercase">Danışman</p>
          <h2 className="serif mt-2 text-3xl">{SITE.name}</h2>
          <p className="mt-1 text-sm text-muted">{SITE.office}</p>
          <a href={SITE.phoneHref} className="mt-4 block text-sm">
            {SITE.phone}
          </a>
          <a href={SITE.whatsapp} className="btn-primary mt-6 w-full">
            WhatsApp
          </a>
          <div className="mt-8">
            <ContactForm listingId={listing.id} />
          </div>
        </aside>
      </div>
    </main>
  );
}
