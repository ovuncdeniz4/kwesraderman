import Image from "next/image";
import Link from "next/link";
import { formatLocation, formatPrice, purposeLabel } from "@/lib/format";

type ListingCardProps = {
  slug: string;
  title: string;
  purpose: string;
  type: string;
  neighborhood: string;
  district: string;
  city: string;
  rooms: string;
  bathrooms: number | null;
  grossM2: number | null;
  priceAmount: number | null;
  priceOnRequest: boolean;
  priceCurrency: string;
  refNo: number;
  cover: string | null;
};

export function ListingCard(listing: ListingCardProps) {
  return (
    <Link
      href={`/portfoy/${listing.slug}`}
      className="group block bg-paper shadow-[0_1px_0_rgba(20,20,20,0.04)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-ink">
        {listing.cover ? (
          <Image
            src={listing.cover}
            alt={listing.title}
            fill
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
            sizes="(min-width: 1024px) 33vw, 100vw"
          />
        ) : (
          <div className="flex h-full items-end bg-gradient-to-br from-[#2a2722] to-[#111] p-5">
            <p className="text-[11px] tracking-[0.2em] text-ivory/70 uppercase">
              {listing.type}
            </p>
          </div>
        )}
        <div className="absolute left-4 top-4 flex gap-2 text-[10px] tracking-[0.16em] uppercase">
          <span className="bg-ivory px-2 py-1 text-ink">{purposeLabel(listing.purpose)}</span>
          <span className="bg-kw px-2 py-1 text-white">{listing.type}</span>
        </div>
      </div>
      <div className="space-y-3 px-5 py-5">
        <p className="text-[11px] tracking-[0.16em] text-muted uppercase">
          {formatLocation(listing)} · Ref {listing.refNo}
        </p>
        <h3 className="serif text-xl leading-snug">{listing.title}</h3>
        <div className="flex flex-wrap gap-4 text-sm text-muted">
          {listing.rooms ? <span>{listing.rooms}</span> : null}
          {listing.bathrooms ? <span>{listing.bathrooms} banyo</span> : null}
          {listing.grossM2 ? <span>{listing.grossM2} m²</span> : null}
        </div>
        <p className="text-sm tracking-[0.08em] uppercase">
          {formatPrice(listing.priceAmount, listing.priceOnRequest, listing.priceCurrency)}
        </p>
      </div>
    </Link>
  );
}
