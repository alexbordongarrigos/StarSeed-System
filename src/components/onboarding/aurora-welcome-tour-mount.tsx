"use client";

/* ============================================================
   aurora-welcome-tour-mount.tsx — StarSeed OS
   Punto de montaje SSR-safe de la guía de bienvenida con Aurora.
   Carga el recorrido con next/dynamic({ ssr:false }) para que el
   componente (que usa localStorage / Supabase del navegador) nunca
   se renderice en el servidor. Se incluye en el layout autenticado
   (app)/layout.tsx para que aparezca tras el login.
   ============================================================ */

import dynamic from "next/dynamic";

const AuroraWelcomeTour = dynamic(
  () => import("@/components/onboarding/aurora-welcome-tour"),
  { ssr: false }
);

export function AuroraWelcomeTourMount() {
  return <AuroraWelcomeTour />;
}

export default AuroraWelcomeTourMount;
