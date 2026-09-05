import { mkdir, writeFile } from "fs/promises";
import { join } from "path";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const listing = await prisma.listing.findUnique({ where: { id } });
  if (!listing) return NextResponse.json({ error: "Bulunamadı" }, { status: 404 });

  const form = await request.formData();
  const files = form.getAll("photos").filter((item): item is File => item instanceof File);
  if (!files.length) return NextResponse.json({ ok: true, count: 0 });

  const dir = join(process.cwd(), "public/uploads", id);
  await mkdir(dir, { recursive: true });

  const last = await prisma.listingImage.findFirst({
    where: { listingId: id },
    orderBy: { sortOrder: "desc" },
  });
  let order = last?.sortOrder ?? -1;

  for (const file of files) {
    const safe = file.name.replace(/[^\w.\-]+/g, "-");
    const name = `${Date.now()}-${safe}`;
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(join(dir, name), buffer);
    order += 1;
    await prisma.listingImage.create({
      data: {
        listingId: id,
        url: `/uploads/${id}/${name}`,
        sortOrder: order,
      },
    });
  }

  return NextResponse.json({ ok: true, count: files.length });
}
