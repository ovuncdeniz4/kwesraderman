import { NextResponse } from "next/server";
import { listingInputSchema, toListingData } from "@/lib/listing-input";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const parsed = listingInputSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Eksik alanlar" }, { status: 400 });
  }

  const current = await prisma.listing.findUnique({ where: { id } });
  if (!current) return NextResponse.json({ error: "Bulunamadı" }, { status: 404 });

  const listing = await prisma.listing.update({
    where: { id },
    data: toListingData(parsed.data, current.slug),
  });

  return NextResponse.json({ id: listing.id });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  await prisma.listing.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
