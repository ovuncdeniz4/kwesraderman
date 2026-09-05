import { PrismaClient } from "@prisma/client";
import { readFileSync } from "fs";
import { join } from "path";
import { slugify } from "../src/lib/format";

const prisma = new PrismaClient();

type ArchiveItem = {
  slug: string;
  purpose: "sale" | "rent";
  category: string;
  type: string;
  title: string;
  description: string;
  location: {
    city?: string;
    district?: string;
    neighborhood?: string;
    street?: string;
    complex?: string;
  };
  specs?: {
    grossM2?: number;
    rooms?: string;
    bathrooms?: number;
    floor?: number;
    floors?: number;
    parking?: number;
    elevator?: boolean;
    amenities?: string[];
  };
  featured?: boolean;
};

async function main() {
  const raw = readFileSync(join(process.cwd(), "data/portfolio.json"), "utf8");
  const data = JSON.parse(raw) as { listings: ArchiveItem[] };

  let ref = 1001;
  for (const item of data.listings) {
    const slug = item.slug || slugify(item.title);
    await prisma.listing.upsert({
      where: { slug },
      update: {},
      create: {
        slug,
        refNo: ref,
        status: "archived",
        purpose: item.purpose,
        category: item.category,
        type: item.type,
        title: item.title,
        description: item.description,
        city: item.location.city ?? "İstanbul",
        district: item.location.district ?? "",
        neighborhood: item.location.neighborhood ?? "",
        street: item.location.street ?? "",
        complex: item.location.complex ?? "",
        grossM2: item.specs?.grossM2,
        rooms: item.specs?.rooms ?? "",
        bathrooms: item.specs?.bathrooms,
        floor: item.specs?.floor,
        floors: item.specs?.floors,
        parking: item.specs?.parking,
        elevator: item.specs?.elevator ?? false,
        amenities: JSON.stringify(item.specs?.amenities ?? []),
        priceOnRequest: true,
        featured: false,
      },
    });
    ref += 1;
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
