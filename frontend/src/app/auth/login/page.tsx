import { Metadata } from "next";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Accedi | Mia Per Sempre",
  description:
    "Accedi al tuo account Mia Per Sempre per gestire i tuoi annunci di nuda proprietà e contattare proprietari e investitori.",
};

export default function LoginPage() {
  return <LoginForm />;
}
