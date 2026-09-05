"use client";

import { useState } from "react";

export function ContactForm({ listingId = "" }: { listingId?: string }) {
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setStatus("idle");
    const form = new FormData(event.currentTarget);

    const response = await fetch("/api/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.get("name"),
        email: form.get("email"),
        phone: form.get("phone"),
        message: form.get("message"),
        listingId,
      }),
    });

    setPending(false);
    setStatus(response.ok ? "ok" : "error");
    if (response.ok) event.currentTarget.reset();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input name="name" required className="input" placeholder="Ad Soyad" />
      <input name="email" type="email" required className="input" placeholder="E-posta" />
      <input name="phone" className="input" placeholder="Telefon" />
      <textarea
        name="message"
        required
        rows={5}
        className="input"
        placeholder="Mesajınız"
      />
      <button type="submit" className="btn-primary w-full" disabled={pending}>
        {pending ? "Gönderiliyor..." : "Gönder"}
      </button>
      {status === "ok" ? (
        <p className="text-sm text-muted">Mesajınız alındı. En kısa sürede dönüş yapacağız.</p>
      ) : null}
      {status === "error" ? (
        <p className="text-sm text-kw">Gönderilemedi. Lütfen tekrar deneyin.</p>
      ) : null}
    </form>
  );
}
