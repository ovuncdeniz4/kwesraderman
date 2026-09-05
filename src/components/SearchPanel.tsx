import { DISTRICTS, PROPERTY_TYPES } from "@/lib/constants";

export function SearchPanel({
  purpose = "sale",
  compact = false,
}: {
  purpose?: "sale" | "rent";
  compact?: boolean;
}) {
  const action = purpose === "rent" ? "/kiralik" : "/satilik";

  return (
    <form
      action={action}
      className={`grid gap-3 bg-paper p-4 text-ink shadow-xl md:grid-cols-12 ${
        compact ? "" : "md:p-5"
      }`}
    >
      <label className="md:col-span-3">
        <span className="mb-1 block text-[10px] tracking-[0.18em] text-muted uppercase">
          Tür
        </span>
        <select name="type" className="input">
          <option value="">Tümü</option>
          {PROPERTY_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </label>
      <label className="md:col-span-3">
        <span className="mb-1 block text-[10px] tracking-[0.18em] text-muted uppercase">
          Bölge
        </span>
        <select name="district" className="input">
          <option value="">İstanbul</option>
          {DISTRICTS.map((district) => (
            <option key={district} value={district}>
              {district}
            </option>
          ))}
        </select>
      </label>
      <label className="md:col-span-4">
        <span className="mb-1 block text-[10px] tracking-[0.18em] text-muted uppercase">
          Anahtar kelime
        </span>
        <input name="q" className="input" placeholder="Bebek, yalı, villa..." />
      </label>
      <div className="flex items-end md:col-span-2">
        <button type="submit" className="btn-primary w-full">
          Ara
        </button>
      </div>
    </form>
  );
}
