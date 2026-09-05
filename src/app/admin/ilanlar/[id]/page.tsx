import { notFound } from "next/navigation";
import { ListingForm } from "@/components/admin/ListingForm";
import { parseAmenities } from "@/lib/format";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function EditListingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const listing = await prisma.listing.findUnique({
    where: { id },
    include: { images: { orderBy: { sortOrder: "asc" } } },
  });
  if (!listing) notFound();

  return (
    <div>
      <h1 className="serif text-4xl">İlanı düzenle</h1>
      <div className="mt-8 border border-line bg-paper p-6">
        <ListingForm
          initial={{
            id: listing.id,
            title: listing.title,
            description: listing.description,
            purpose: listing.purpose,
            category: listing.category,
            type: listing.type,
            status: listing.status,
            city: listing.city,
            district: listing.district,
            neighborhood: listing.neighborhood,
            street: listing.street,
            complex: listing.complex,
            rooms: listing.rooms,
            bathrooms: listing.bathrooms?.toString() ?? "",
            grossM2: listing.grossM2?.toString() ?? "",
            netM2: listing.netM2?.toString() ?? "",
            floor: listing.floor?.toString() ?? "",
            floors: listing.floors?.toString() ?? "",
            parking: listing.parking?.toString() ?? "",
            elevator: listing.elevator,
            amenities: parseAmenities(listing.amenities).join(", "),
            priceAmount: listing.priceAmount?.toString() ?? "",
            priceOnRequest: listing.priceOnRequest,
            featured: listing.featured,
            videoUrl: listing.videoUrl,
            images: listing.images,
          }}
        />
      </div>
    </div>
  );
}
