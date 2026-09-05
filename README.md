# Esra Derman · Keller Williams Platin

Boğaz hattı lüks konut sitesi. Space İstanbul benzeri ilan vitrini + admin paneli.

## Çalıştırma

```bash
cp .env.example .env
npm install
npx prisma db push
npm run db:seed
npm run dev
```

- Site: http://localhost:3000
- Admin: http://localhost:3000/admin
- Varsayılan giriş (`.env`): `admin@kwesraderman.com` / `admin1234`

Güncel ilanlar yalnızca admin’den **Yayında** yapınca görünür. Seed edilen 2018–2019 kayıtları arşivdedir; ziyaretçi stoğu olarak çıkmaz.

## Not

SQLite yerel/dev içindir. Üretimde `DATABASE_URL` ile Postgres’e geçin; yüklenen görseller `public/uploads` altındadır.
