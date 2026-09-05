# KW Esra Derman — site architecture

Luxury brokerage site modeled on [Space İstanbul](https://www.spaceistanbul.com/tr//).
This is a **web** product (not Expo). Folder names stay under `docs/`, `data/`, and later `app/` / `src/` without parallel duplicates.

## Product shape (Space İstanbul reference)

Space İstanbul is a PHP luxury listing marketplace with:

- Hero + type/price/m² search (Konut / İşyeri / Diğer)
- Featured cards: ref no, sale/rent, type, rooms, baths, district, price, m²
- Listing index: `/tr/satilik`, `/tr/kiralik` with filters (type, location, price, area, rooms, baths, EİDS)
- Listing detail: `/tr/portfoy/{satilik|kiralik}/{slug}/{ref}`
  - gallery, price, ref, district, city, brüt/net, rooms, bathrooms
  - long editorial description, amenity list, assigned consultant
- Extra: projects, e-teklif, corporate (about, branches, team, press, blog), TR/EN, TRY/USD/EUR/GBP
- Legal: KVKK, cookie, appointment forms

We copy the **information architecture and listing card/detail model**, not Space İstanbul assets or copy.

## Data constraint

Esra Derman / Team Derman has **no public live inventory** (KW Platin Karma agent page, sahibinden store, Hepsiemlak, kw.com). Reconstructable history lives in LinkedIn posts (2018–2019). See `data/portfolio.json`.

Until current listings + photos + prices arrive, the site can ship with:

1. Historical archive (status: `archived`)
2. Empty “güncel portföy” state + WhatsApp/call CTA
3. Later: admin or JSON-fed live listings (`status: live`)

## Listing model

Each property:

- `id`, `slug`, `status` (`live` | `archived` | `draft`)
- `purpose` (`sale` | `rent`)
- `category` (`residential` | `commercial` | `land`)
- `type` (daire, villa, yalı, yol yalısı, yalı dairesi, köşk, dubleks, …)
- `title`, `description`
- `location`: city, district, neighborhood, street
- `specs`: grossM2, netM2, rooms, bathrooms, floor, parking, amenities[]
- `price`: amount, currency, `onRequest`
- `media`: images[], videoUrl
- `agent`: name, phone
- `source`: url, publishedAt
- `featured`

## Routes

- `/` featured + search
- `/satilik`, `/kiralik`
- `/portfoy/[slug]`
- `/hakkimizda`, `/iletisim`, `/kvkk`
- `/admin` listing CRUD, `/admin/login`

## Admin

- Cookie session (`AUTH_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`)
- Create / edit / delete listings, photo upload, status: draft | live | archived
- Public site queries `status = live` only

## Scale / ops

- Prisma 6 + Neon Postgres (`DATABASE_URL` pooled, `DIRECT_URL` non-pooling)
- Vercel build runs `prisma generate && prisma migrate deploy && next build`
- Uploads in `public/uploads` (ephemeral on Vercel serverless; Blob is a later step)
- TR-first; EN + currency conversion are Phase 2
- KVKK page + inquiry form
- Footer includes KW independent-office statement

## Do not

- Publish archived 2018–2019 homes as if they are for sale today.
- Use Space İstanbul listing photos or text.
- Invent prices or current availability.
