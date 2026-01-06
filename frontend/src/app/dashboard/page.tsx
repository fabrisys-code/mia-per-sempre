import { Metadata } from "next";
import DashboardClient from "./DashboardClient";

export const metadata: Metadata = {
  title: "Dashboard | Mia Per Sempre",
  description: "Gestisci i tuoi annunci di nuda proprietà e il tuo profilo.",
};

export default function DashboardPage() {
  return <DashboardClient />;
}
