"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DISTRICTS, PROPERTY_TYPES, ROOM_OPTIONS } from "@/lib/constants";

export type ListingFormValues = {
  id?: string;
  title: string;
  description: string;
  purpose: string;
  category: string;
  type: string;
  status: string;
  city: string;
  district: string;
  neighborhood: string;
  street: string;
  complex: string;
  rooms: string;
  bathrooms: string;
  grossM2: string;
  netM2: string;
  floor: string;
  floors: string;
  parking: string;
  elevator: boolean;
  amenities: string;
  priceAmount: string;
  priceOnRequest: boolean;
  featured: boolean;
  videoUrl: string;
  images?: { id: string; url: string }[];
};

const empty: ListingFormValues = {
  title: "",
  description: "",
  purpose: "sale",
  category: "residential",
  type: "Daire",
  status: "draft",
  city: "İstanbul",
  district: "Beşiktaş",
  neighborhood: "",
  street: "",
  complex: "",
  rooms: "3+1",
  bathrooms: "",
  grossM2: "",
  netM2: "",
  floor: "",
  floors: "",
  parking: "",
  elevator: false,
  amenities: "",
  priceAmount: "",
  priceOnRequest: true,
  featured: false,
  videoUrl: "",
};

export function ListingForm({ initial }: { initial?: ListingFormValues }) {
  const router = useRouter();
  const values = { ...empty, ...initial };
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");
    const form = new FormData(event.currentTarget);
    const payload = {
      title: String(form.get("title") ?? ""),
      description: String(form.get("description") ?? ""),
      purpose: String(form.get("purpose") ?? "sale"),
      category: "residential",
      type: String(form.get("type") ?? ""),
      status: String(form.get("status") ?? "draft"),
      city: String(form.get("city") ?? "İstanbul"),
      district: String(form.get("district") ?? ""),
      neighborhood: String(form.get("neighborhood") ?? ""),
      street: String(form.get("street") ?? ""),
      complex: String(form.get("complex") ?? ""),
      rooms: String(form.get("rooms") ?? ""),
      bathrooms: Number(form.get("bathrooms") || 0) || null,
      grossM2: Number(form.get("grossM2") || 0) || null,
      netM2: Number(form.get("netM2") || 0) || null,
      floor: Number(form.get("floor") || 0) || null,
      floors: Number(form.get("floors") || 0) || null,
      parking: Number(form.get("parking") || 0) || null,
      elevator: form.get("elevator") === "on",
      amenities: String(form.get("amenities") ?? ""),
      priceAmount: Number(form.get("priceAmount") || 0) || null,
      priceOnRequest: form.get("priceOnRequest") === "on",
      featured: form.get("featured") === "on",
      videoUrl: String(form.get("videoUrl") ?? ""),
    };

    const url = values.id ? `/api/admin/listings/${values.id}` : "/api/admin/listings";
    const response = await fetch(url, {
      method: values.id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = (await response.json()) as { id?: string; error?: string };
    setPending(false);
    if (!response.ok) {
      setError(data.error ?? "Kaydedilemedi.");
      return;
    }

    const listingId = values.id ?? data.id;
    const files = form.getAll("photos") as File[];
    const uploads = files.filter((file) => file instanceof File && file.size > 0);
    if (listingId && uploads.length) {
      const photos = new FormData();
      uploads.forEach((file) => photos.append("photos", file));
      await fetch(`/api/admin/listings/${listingId}/images`, {
        method: "POST",
        body: photos,
      });
    }

    router.push("/admin");
    router.refresh();
  }

  async function onDelete() {
    if (!values.id) return;
    if (!confirm("Bu ilan silinsin mi?")) return;
    await fetch(`/api/admin/listings/${values.id}`, { method: "DELETE" });
    router.push("/admin");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <input name="title" defaultValue={values.title} required className="input md:col-span-2" placeholder="Başlık" />
        <select name="purpose" defaultValue={values.purpose} className="input">
          <option value="sale">Satılık</option>
          <option value="rent">Kiralık</option>
        </select>
        <select name="status" defaultValue={values.status} className="input">
          <option value="draft">Taslak</option>
          <option value="live">Yayında</option>
          <option value="archived">Arşiv</option>
        </select>
        <select name="type" defaultValue={values.type} className="input">
          {PROPERTY_TYPES.map((type) => (
            <option key={type}>{type}</option>
          ))}
        </select>
        <select name="rooms" defaultValue={values.rooms} className="input">
          {ROOM_OPTIONS.map((rooms) => (
            <option key={rooms}>{rooms}</option>
          ))}
        </select>
        <input name="city" defaultValue={values.city} className="input" placeholder="Şehir" />
        <select name="district" defaultValue={values.district} className="input">
          {DISTRICTS.map((district) => (
            <option key={district}>{district}</option>
          ))}
        </select>
        <input name="neighborhood" defaultValue={values.neighborhood} className="input" placeholder="Mahalle" />
        <input name="street" defaultValue={values.street} className="input" placeholder="Sokak" />
        <input name="complex" defaultValue={values.complex} className="input" placeholder="Site / proje" />
        <input name="grossM2" defaultValue={values.grossM2} className="input" placeholder="Brüt m²" />
        <input name="netM2" defaultValue={values.netM2} className="input" placeholder="Net m²" />
        <input name="bathrooms" defaultValue={values.bathrooms} className="input" placeholder="Banyo" />
        <input name="parking" defaultValue={values.parking} className="input" placeholder="Otopark" />
        <input name="floor" defaultValue={values.floor} className="input" placeholder="Kat" />
        <input name="floors" defaultValue={values.floors} className="input" placeholder="Kat sayısı" />
        <input name="priceAmount" defaultValue={values.priceAmount} className="input" placeholder="Fiyat (TRY)" />
        <input name="videoUrl" defaultValue={values.videoUrl} className="input md:col-span-2" placeholder="Video URL" />
        <textarea
          name="description"
          defaultValue={values.description}
          rows={6}
          className="input md:col-span-2"
          placeholder="Açıklama"
        />
        <input
          name="amenities"
          defaultValue={values.amenities}
          className="input md:col-span-2"
          placeholder="Özellikler (virgülle: havuz, asansör, bahçe)"
        />
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="priceOnRequest" defaultChecked={values.priceOnRequest} />
          Fiyat sorun
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="elevator" defaultChecked={values.elevator} />
          Asansör
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="featured" defaultChecked={values.featured} />
          Öne çıkan
        </label>
        <label className="md:col-span-2 text-sm">
          Fotoğraflar
          <input name="photos" type="file" accept="image/*" multiple className="mt-2 block w-full" />
        </label>
      </div>

      {values.images?.length ? (
        <div className="grid grid-cols-3 gap-3">
          {values.images.map((image) => (
            <Image
              key={image.id}
              src={image.url}
              alt=""
              width={320}
              height={112}
              className="h-28 w-full object-cover"
              unoptimized
            />
          ))}
        </div>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <button type="submit" className="btn-primary" disabled={pending}>
          {pending ? "Kaydediliyor..." : "Kaydet"}
        </button>
        {values.id ? (
          <button type="button" onClick={onDelete} className="btn-ghost">
            Sil
          </button>
        ) : null}
      </div>
      {error ? <p className="text-sm text-kw">{error}</p> : null}
    </form>
  );
}
