"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: form.get("email"),
        password: form.get("password"),
      }),
    });
    setPending(false);
    if (!response.ok) {
      setError("Giriş başarısız.");
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-md border border-line bg-paper p-8">
      <p className="text-[11px] tracking-[0.2em] text-kw uppercase">Admin</p>
      <h1 className="serif mt-2 text-4xl">Giriş</h1>
      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        <input name="email" type="email" required className="input" placeholder="E-posta" />
        <input name="password" type="password" required className="input" placeholder="Şifre" />
        <button type="submit" className="btn-primary w-full" disabled={pending}>
          {pending ? "..." : "Giriş yap"}
        </button>
        {error ? <p className="text-sm text-kw">{error}</p> : null}
      </form>
    </div>
  );
}
