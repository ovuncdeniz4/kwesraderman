import { NextResponse } from "next/server";
import { listingInputSchema, toListingData } from "@/lib/listing-input";
import { nextRefNo } from "@/lib/listings";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/format";

export async function POST(request: Request) {
  const parsed = listingInputSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Eksik alanlar" }, { status: 400 });
  }

  let slug = slugify(parsed.data.title);
  const exists = await prisma.listing.findUnique({ where: { slug } });
  if (exists) slug = `${slug}-${Date.now().toString().slice(-4)}`;

  const listing = await prisma.listing.create({
    data: {
      ...toListingData(parsed.data, slug),
      refNo: await nextRefNo(),
    },
  });

  return NextResponse.json({ id: listing.id, slug: listing.slug });
}
