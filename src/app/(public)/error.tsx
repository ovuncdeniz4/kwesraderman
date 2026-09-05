"use client";

// Public route error boundary — shown if a page still throws after listing fallbacks.
export default function PublicError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="mx-auto max-w-3xl px-5 pb-20 pt-36 text-center">
      <h1 className="serif text-5xl">Sayfa yüklenemedi</h1>
      <p className="mt-4 text-muted">
        Bağlantı kurulamadı. Biraz sonra tekrar deneyin.
      </p>
      <button type="button" onClick={reset} className="btn-primary mt-8">
        Yeniden dene
      </button>
    </main>
  );
}
