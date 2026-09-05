import { z } from "zod";
import { slugify } from "@/lib/format";

export const listingInputSchema = z.object({
  title: z.string().min(3),
  description: z.string().default(""),
  purpose: z.enum(["sale", "rent"]),
  category: z.string().default("residential"),
  type: z.string().min(2),
  status: z.enum(["draft", "live", "archived"]),
  city: z.string().default("İstanbul"),
  district: z.string().default(""),
  neighborhood: z.string().default(""),
  street: z.string().default(""),
  complex: z.string().default(""),
  rooms: z.string().default(""),
  bathrooms: z.number().nullable(),
  grossM2: z.number().nullable(),
  netM2: z.number().nullable(),
  floor: z.number().nullable(),
  floors: z.number().nullable(),
  parking: z.number().nullable(),
  elevator: z.boolean().default(false),
  amenities: z.string().default(""),
  priceAmount: z.number().nullable(),
  priceOnRequest: z.boolean().default(true),
  featured: z.boolean().default(false),
  videoUrl: z.string().default(""),
});

export function toListingData(input: z.infer<typeof listingInputSchema>, slug?: string) {
  const amenities = input.amenities
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  return {
    title: input.title,
    description: input.description,
    purpose: input.purpose,
    category: input.category,
    type: input.type,
    status: input.status,
    city: input.city,
    district: input.district,
    neighborhood: input.neighborhood,
    street: input.street,
    complex: input.complex,
    rooms: input.rooms,
    bathrooms: input.bathrooms,
    grossM2: input.grossM2,
    netM2: input.netM2,
    floor: input.floor,
    floors: input.floors,
    parking: input.parking,
    elevator: input.elevator,
    amenities: JSON.stringify(amenities),
    priceAmount: input.priceAmount,
    priceOnRequest: input.priceOnRequest,
    featured: input.featured,
    videoUrl: input.videoUrl,
    slug: slug ?? slugify(input.title),
  };
}
