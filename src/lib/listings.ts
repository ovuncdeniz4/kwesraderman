import { prisma } from "@/lib/prisma";
import { parseAmenities } from "@/lib/format";

async function safeListings<T>(label: string, run: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await run();
  } catch (error) {
    console.error(`[listings] ${label}`, error);
    return fallback;
  }
}

export async function getLiveListings(filters?: {
  purpose?: "sale" | "rent";
  type?: string;
  district?: string;
  q?: string;
}) {
  const listings = await safeListings(
    "getLiveListings",
    () =>
      prisma.listing.findMany({
        where: {
          status: "live",
          ...(filters?.purpose ? { purpose: filters.purpose } : {}),
          ...(filters?.type ? { type: filters.type } : {}),
          ...(filters?.district ? { district: filters.district } : {}),
        },
        include: { images: { orderBy: { sortOrder: "asc" } } },
        orderBy: [{ featured: "desc" }, { updatedAt: "desc" }],
      }),
    [],
  );

  if (!filters?.q) return listings;

  const q = filters.q.toLocaleLowerCase("tr-TR");
  return listings.filter((listing) => {
    const haystack = [
      listing.title,
      listing.description,
      listing.neighborhood,
      listing.district,
      listing.type,
      listing.rooms,
    ]
      .join(" ")
      .toLocaleLowerCase("tr-TR");
    return haystack.includes(q);
  });
}

export async function getFeaturedListings() {
  return safeListings(
    "getFeaturedListings",
    () =>
      prisma.listing.findMany({
        where: { status: "live", featured: true },
        include: { images: { orderBy: { sortOrder: "asc" } } },
        orderBy: { updatedAt: "desc" },
        take: 6,
      }),
    [],
  );
}

export async function getLiveListingBySlug(slug: string) {
  return safeListings(
    "getLiveListingBySlug",
    () =>
      prisma.listing.findFirst({
        where: { slug, status: "live" },
        include: { images: { orderBy: { sortOrder: "asc" } } },
      }),
    null,
  );
}

export async function getAllListingsAdmin() {
  return prisma.listing.findMany({
    include: { images: { orderBy: { sortOrder: "asc" } } },
    orderBy: { updatedAt: "desc" },
  });
}

export function listingCard(listing: {
  slug: string;
  purpose: string;
  type: string;
  title: string;
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
  images: { url: string }[];
  amenities: string;
}) {
  return {
    ...listing,
    amenityList: parseAmenities(listing.amenities),
    cover: listing.images[0]?.url ?? null,
  };
}

export async function nextRefNo() {
  const last = await prisma.listing.findFirst({
    orderBy: { refNo: "desc" },
    select: { refNo: true },
  });
  return (last?.refNo ?? 1000) + 1;
}
