import { Metadata } from "next";
import RegisterForm from "./RegisterForm";

export const metadata: Metadata = {
  title: "Registrati | Mia Per Sempre",
  description:
    "Crea il tuo account gratuito su Mia Per Sempre. Pubblica annunci di nuda proprietà o cerca opportunità di investimento immobiliare.",
};

export default function RegisterPage() {
  return <RegisterForm />;
}
