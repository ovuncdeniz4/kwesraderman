import Link from "next/link";
import { getAllListingsAdmin } from "@/lib/listings";
import { statusLabel } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function AdminHomePage() {
  const listings = await getAllListingsAdmin();
  const live = listings.filter((item) => item.status === "live").length;

  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-[11px] tracking-[0.2em] text-kw uppercase">Yönetim</p>
          <h1 className="serif mt-2 text-4xl">Portföy</h1>
          <p className="mt-2 text-sm text-muted">
            {listings.length} kayıt · {live} yayında
          </p>
        </div>
        <Link href="/admin/ilanlar/yeni" className="btn-primary">
          Yeni ilan
        </Link>
      </div>

      <div className="mt-8 overflow-x-auto border border-line bg-paper">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-line text-[11px] tracking-[0.14em] uppercase text-muted">
            <tr>
              <th className="px-4 py-3">Ref</th>
              <th className="px-4 py-3">Başlık</th>
              <th className="px-4 py-3">Tür</th>
              <th className="px-4 py-3">Durum</th>
              <th className="px-4 py-3">Amaç</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {listings.map((listing) => (
              <tr key={listing.id} className="border-b border-line last:border-0">
                <td className="px-4 py-3">{listing.refNo}</td>
                <td className="px-4 py-3">{listing.title}</td>
                <td className="px-4 py-3">{listing.type}</td>
                <td className="px-4 py-3">{statusLabel(listing.status)}</td>
                <td className="px-4 py-3">{listing.purpose === "rent" ? "Kiralık" : "Satılık"}</td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/ilanlar/${listing.id}`} className="underline">
                    Düzenle
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
