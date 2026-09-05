import { ListingForm } from "@/components/admin/ListingForm";

export default function NewListingPage() {
  return (
    <div>
      <h1 className="serif text-4xl">Yeni ilan</h1>
      <div className="mt-8 border border-line bg-paper p-6">
        <ListingForm />
      </div>
    </div>
  );
}
