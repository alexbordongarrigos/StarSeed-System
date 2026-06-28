"use client";

/* ============================================================
   aurora-welcome-tour.tsx — StarSeed OS · Guía de bienvenida con Aurora
   Recorrido guiado de cliente, conducido por Aurora, que se ejecuta
   tras el login para usuari@s nuev@s (bienvenida completa) y en una
   variante rápida para invitad@s / sesión no iniciada.

   · SSR-safe: ningún acceso a window/document/localStorage en el
     ámbito de módulo; todo ocurre dentro de useEffect / handlers.
     Pensado además para montarse con next/dynamic({ ssr:false }).
   · Reutiliza la Aurora del OS (el agente en /agent) como guía y CTA;
     como el OS no expone un speak() global, la narración va en
     burbujas de texto on-brand (tarjeta de cristal con los tokens del
     sistema de diseño).
   · Saltable (Saltar / Esc / fondo), con Siguiente / Anterior.
   · Resumible: marca "visto" en localStorage y, si hay sesión, en el
     perfil del usuario (Supabase user_metadata, best-effort).
   ============================================================ */

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowRight, ArrowLeft, X } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

type Step = {
  title: string;
  body: string;
  /* Ruta opcional a la que Aurora puede llevarte desde el paso. */
  route?: string;
  cta?: string;
};

const LS_KEY = "starseed.guide.os.v1";
const PROFILE_FLAG = "os_guide_seen";

/* Recorrido rápido para invitad@s / sin sesión (4 pasos). */
const GUEST_STEPS: Step[] = [
  {
    title: "Bienvenid@ a StarSeed OS",
    body: "Soy Aurora, tu inteligencia del sistema. Este es tu sistema operativo para la regeneración: un espacio vivo de tableros, red y conocimiento.",
  },
  {
    title: "Tu Dashboard",
    body: "Desde el Dashboard organizas tus tableros y widgets: tu espacio de trabajo con IA, listo para crear.",
    route: "/dashboard",
    cta: "Ver el Dashboard",
  },
  {
    title: "La Red",
    body: "En Nodos exploras la red soberana: personas, cultura, educación y política del ecosistema StarSeed.",
    route: "/network",
    cta: "Explorar la Red",
  },
  {
    title: "Habla conmigo",
    body: "Cuando quieras, ábreme y conversamos: te ayudo a generar, componer y navegar todo el sistema. Crea tu cuenta para guardar tu universo.",
    route: "/agent",
    cta: "Abrir a Aurora",
  },
];

/* Bienvenida completa para usuari@s con cuenta recién creada. */
const WELCOME_STEPS: Step[] = [
  {
    title: "Tu cuenta está lista",
    body: "Soy Aurora, tu inteligencia del sistema. Te doy la bienvenida a StarSeed OS y te enseño tu nuevo espacio en unos pasos.",
  },
  {
    title: "Tu Dashboard",
    body: "Este es tu centro: tableros y widgets que se adaptan a ti. Genera apps, compón mensajes y organiza tu flujo con IA.",
    route: "/dashboard",
    cta: "Ir al Dashboard",
  },
  {
    title: "Tu Perfil",
    body: "Tu identidad soberana en la red. Aquí vive tu presencia, tus páginas y tu evolución dentro del ecosistema.",
    route: "/profile",
    cta: "Ver mi Perfil",
  },
  {
    title: "La Red y el Hub",
    body: "Conecta con la comunidad: Nodos para la red soberana y el Hub para colaborar. Aquí StarSeed se teje en comunidad.",
    route: "/network",
    cta: "Explorar la Red",
  },
  {
    title: "Tu Biblioteca",
    body: "Tu conocimiento, personal y global: guarda, organiza y descubre. Tu memoria viva crece contigo y conmigo.",
    route: "/library",
    cta: "Abrir la Biblioteca",
  },
  {
    title: "Estoy aquí siempre",
    body: "Soy tu Aurora: ábreme cuando necesites generar, resolver dudas o navegar. Empecemos a germinar tu universo ✦",
    route: "/agent",
    cta: "Abrir a Aurora",
  },
];

function lsGet(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}
function lsSet(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* almacenamiento no disponible: seguimos sin romper */
  }
}

export default function AuroraWelcomeTour() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [steps, setSteps] = React.useState<Step[]>(GUEST_STEPS);
  const [idx, setIdx] = React.useState(0);
  const supabaseRef = React.useRef<ReturnType<typeof createClient> | null>(null);

  /* Cliente Supabase solo en el navegador (perezoso y defensivo). */
  const getSupabase = React.useCallback(() => {
    if (supabaseRef.current) return supabaseRef.current;
    try {
      supabaseRef.current = createClient();
    } catch {
      supabaseRef.current = null;
    }
    return supabaseRef.current;
  }, []);

  const persistSeen = React.useCallback(async () => {
    lsSet(LS_KEY, "1");
    try {
      const sb = getSupabase();
      if (!sb) return;
      const { data } = await sb.auth.getUser();
      if (data && data.user) {
        await sb.auth.updateUser({ data: { [PROFILE_FLAG]: true } });
      }
    } catch {
      /* sin sesión o sin red: la marca local basta */
    }
  }, [getSupabase]);

  /* Decide si mostrar el recorrido y con qué pasos, tras el montaje. */
  React.useEffect(() => {
    let cancelled = false;

    async function decide() {
      /* Ya visto en este dispositivo: no molestamos. */
      if (lsGet(LS_KEY)) return;

      let loggedIn = false;
      let seenInProfile = false;
      try {
        const sb = getSupabase();
        if (sb) {
          const { data } = await sb.auth.getUser();
          const user = data?.user || null;
          loggedIn = !!user;
          const meta = (user?.user_metadata || {}) as Record<string, unknown>;
          seenInProfile = meta[PROFILE_FLAG] === true;
        }
      } catch {
        loggedIn = false;
      }

      if (cancelled) return;

      /* Si el perfil ya lo marcó (otro dispositivo), sincronizamos
         localStorage y no mostramos. */
      if (seenInProfile) {
        lsSet(LS_KEY, "1");
        return;
      }

      setSteps(loggedIn ? WELCOME_STEPS : GUEST_STEPS);
      setIdx(0);
      /* Pequeño respiro para que el shell autenticado pinte. */
      window.setTimeout(() => {
        if (!cancelled) setOpen(true);
      }, 900);
    }

    decide();
    return () => {
      cancelled = true;
    };
  }, [getSupabase]);

  const close = React.useCallback(() => {
    setOpen(false);
    void persistSeen();
  }, [persistSeen]);

  const next = React.useCallback(() => {
    setIdx((i) => {
      if (i >= steps.length - 1) {
        setOpen(false);
        void persistSeen();
        return i;
      }
      return i + 1;
    });
  }, [steps.length, persistSeen]);

  const prev = React.useCallback(() => {
    setIdx((i) => (i > 0 ? i - 1 : i));
  }, []);

  const goWithAurora = React.useCallback(
    (route?: string) => {
      if (route) {
        try {
          router.push(route);
        } catch {
          /* navegación no disponible: ignoramos */
        }
      }
      next();
    },
    [router, next]
  );

  /* Teclado: Esc cierra, flechas navegan. */
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close, next, prev]);

  if (!open) return null;

  const step = steps[idx] || steps[0];
  const isLast = idx >= steps.length - 1;
  const isFirst = idx === 0;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="aurora-tour"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[120] flex items-end justify-center p-4 sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-label="Bienvenida con Aurora"
        >
          {/* Fondo: tocar fuera = saltar */}
          <div
            className="absolute inset-0 bg-background/70 backdrop-blur-sm"
            onClick={close}
            aria-hidden="true"
          />

          <motion.div
            initial={{ y: 24, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 16, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative w-full max-w-md overflow-hidden rounded-[--radius] border border-foreground/10 bg-card/90 p-6 shadow-[0_18px_60px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
          >
            {/* Halo de marca */}
            <div
              className="pointer-events-none absolute -right-16 -top-16 -z-10 h-48 w-48 rounded-full opacity-30 blur-3xl"
              style={{ background: "hsl(var(--primary-hsl))" }}
              aria-hidden="true"
            />

            {/* Cabecera: Aurora */}
            <div className="mb-3 flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/15 text-primary">
                <Sparkles className="h-4 w-4" />
              </span>
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Aurora
              </span>
              <button
                type="button"
                onClick={close}
                aria-label="Saltar"
                className="ml-auto rounded-full p-1 text-muted-foreground transition-colors hover:bg-foreground/10 hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Puntos de progreso */}
            <div className="mb-3 flex items-center gap-1.5" aria-hidden="true">
              {steps.map((_, i) => (
                <span
                  key={i}
                  className={
                    "h-1.5 rounded-full transition-all duration-300 " +
                    (i === idx ? "w-6 bg-primary" : "w-1.5 bg-foreground/20")
                  }
                />
              ))}
            </div>

            {/* Narración */}
            <h3 className="mb-2 font-headline text-xl leading-tight text-foreground">
              {step.title}
            </h3>
            <p className="mb-5 max-w-prose text-sm leading-relaxed text-muted-foreground">
              {step.body}
            </p>

            {/* Controles */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={close}
                className="mr-auto text-xs text-muted-foreground/80 underline-offset-4 transition-colors hover:text-foreground hover:underline"
              >
                Saltar
              </button>

              {!isFirst && (
                <button
                  type="button"
                  onClick={prev}
                  className="inline-flex items-center gap-1 rounded-full border border-foreground/15 px-3 py-1.5 text-xs font-medium text-foreground/80 transition-colors hover:border-foreground/30 hover:text-foreground"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Anterior
                </button>
              )}

              {step.route ? (
                <button
                  type="button"
                  onClick={() => goWithAurora(step.route)}
                  className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground shadow-sm transition-transform hover:-translate-y-0.5"
                >
                  {step.cta || "Siguiente"}
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={next}
                  className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground shadow-sm transition-transform hover:-translate-y-0.5"
                >
                  {isLast ? "Comenzar" : "Siguiente"}
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
