# Esra Derman · Keller Williams Platin

Boğaz hattı lüks konut sitesi. Space İstanbul benzeri ilan vitrini + admin paneli.

## Neon (Vercel Marketplace)

Vercel’den Neon kurduktan sonra **Environment Variables** içine şunları yaz:

| Vercel / Neon değişkeni | Bu projedeki ad |
| --- | --- |
| `POSTGRES_PRISMA_URL` (pooled, `pgbouncer=true`) | `DATABASE_URL` |
| `POSTGRES_URL_NON_POOLING` | `DIRECT_URL` |

Aynı ortamda admin için de ekle:

- `AUTH_SECRET` — en az 16 karakter
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`

İlk deploy `prisma migrate deploy` ile tabloları oluşturur. Arşiv seed’i (2018–2019, `archived`) bir kez:

```bash
# .env içinde Neon URL’leri varken
npm run db:seed
```

Migrate için **pooled URL kullanma** — `DIRECT_URL` non-pooling olmalı.

## Çalıştırma

```bash
cp .env.example .env
# .env içine Neon DATABASE_URL + DIRECT_URL yapıştır
npm install
npx prisma migrate deploy
npm run db:seed
npm run dev
```

- Site: http://localhost:3000
- Admin: http://localhost:3000/admin
- Varsayılan giriş (`.env`): `admin@kwesraderman.com` / `admin1234`

Güncel ilanlar yalnızca admin’den **Yayında** yapınca görünür. Seed edilen 2018–2019 kayıtları arşivdedir; ziyaretçi stoğu olarak çıkmaz.

## Not

Yüklenen görseller `public/uploads` altındadır. Vercel serverless’da bu klasör kalıcı değildir; Blob sonraki adım.
