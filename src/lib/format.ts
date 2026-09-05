export function slugify(input: string): string {
  return input
    .toLocaleLowerCase("tr-TR")
    .replaceAll("ğ", "g")
    .replaceAll("ü", "u")
    .replaceAll("ş", "s")
    .replaceAll("ı", "i")
    .replaceAll("ö", "o")
    .replaceAll("ç", "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function formatPrice(
  amount: number | null | undefined,
  onRequest: boolean,
  currency = "TRY",
): string {
  if (onRequest || amount == null) {
    return "Fiyat sorun";
  }

  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatLocation(listing: {
  neighborhood?: string | null;
  district?: string | null;
  city?: string | null;
}): string {
  return [listing.neighborhood, listing.district, listing.city]
    .filter(Boolean)
    .join(", ");
}

export function purposeLabel(purpose: string): string {
  return purpose === "rent" ? "Kiralık" : "Satılık";
}

export function parseAmenities(raw: string): string[] {
  try {
    const value = JSON.parse(raw) as unknown;
    return Array.isArray(value) ? value.filter((item) => typeof item === "string") : [];
  } catch {
    return raw
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }
}

export function statusLabel(status: string): string {
  if (status === "live") return "Yayında";
  if (status === "archived") return "Arşiv";
  return "Taslak";
}
