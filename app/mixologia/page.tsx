import type { Metadata } from "next";
import MixologiaContent from "./MixologiaContent";

export const metadata: Metadata = {
  title: "Mixología | Vianey Becerril — Coctelería para Eventos",
  description:
    "Servicio de mixología premium: bar con tus destilados o menú de coctelería personalizado con tequilas, rones, whiskys y vodkas para tu evento.",
  keywords: "mixólogo, coctelería, barra, eventos, tequila, mojito, martini, menú de cocteles",
};

export default function MixologiaPage() {
  return <MixologiaContent />;
}
