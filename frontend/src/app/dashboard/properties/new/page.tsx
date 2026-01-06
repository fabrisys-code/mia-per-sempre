import { Metadata } from "next";
import PropertyForm from "./PropertyForm";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export const metadata: Metadata = {
  title: "Pubblica Annuncio | Mia Per Sempre",
  description: "Pubblica il tuo annuncio di nuda proprietà su Mia Per Sempre",
};

export default function NewPropertyPage() {
  return (
    <ProtectedRoute>
      <PropertyForm />
    </ProtectedRoute>
  );
}
