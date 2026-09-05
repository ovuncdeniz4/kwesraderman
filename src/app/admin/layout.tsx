import Link from "next/link";
import { EsraMark, KwMark } from "@/components/BrandMark";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f3eee6]">
      <div className="border-b border-line bg-paper">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <Link href="/admin" className="flex items-center gap-4">
            <EsraMark className="h-9 w-auto" />
            <KwMark className="hidden h-8 w-auto sm:block" />
          </Link>
          <div className="flex items-center gap-4 text-xs tracking-[0.16em] uppercase">
            <Link href="/">Siteye dön</Link>
            <form action="/api/admin/logout" method="post">
              <button type="submit">Çıkış</button>
            </form>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-5 py-10">{children}</div>
    </div>
  );
}
