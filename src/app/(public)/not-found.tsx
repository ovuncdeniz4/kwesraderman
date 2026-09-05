import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-5 pb-20 pt-36 text-center">
      <h1 className="serif text-5xl">İlan bulunamadı</h1>
      <p className="mt-4 text-muted">Bu portföy yayında değil veya kaldırılmış olabilir.</p>
      <Link href="/satilik" className="btn-primary mt-8">
        Satılığa dön
      </Link>
    </main>
  );
}
