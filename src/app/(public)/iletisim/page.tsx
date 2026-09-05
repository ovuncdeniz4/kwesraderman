import { ContactForm } from "@/components/ContactForm";
import { SITE } from "@/lib/constants";

export const metadata = { title: "İletişim" };

export default function ContactPage() {
  return (
    <main className="mx-auto grid w-full max-w-7xl gap-12 px-5 pb-20 pt-32 md:grid-cols-2 md:px-8">
      <div>
        <p className="text-[11px] tracking-[0.22em] text-kw uppercase">İletişim</p>
        <h1 className="serif mt-3 text-5xl">Konuşalım.</h1>
        <p className="mt-5 max-w-md text-base leading-8 text-muted">
          Satılık veya kiralık bir ev arıyorsanız, ya da mülkünüzü doğru değerde
          pazara çıkarmak istiyorsanız yazın.
        </p>
        <div className="mt-8 space-y-3 text-sm leading-7">
          <p>
            <a href={SITE.phoneHref}>{SITE.phone}</a>
          </p>
          <p>
            Ofis: <a href={SITE.officePhoneHref}>{SITE.officePhone}</a>
          </p>
          <p>{SITE.address}</p>
          <p>
            <a href={SITE.instagram}>Instagram</a>
            {" · "}
            <a href={SITE.linkedin}>LinkedIn</a>
          </p>
        </div>
      </div>
      <div className="border border-line bg-paper p-6">
        <ContactForm />
      </div>
    </main>
  );
}
