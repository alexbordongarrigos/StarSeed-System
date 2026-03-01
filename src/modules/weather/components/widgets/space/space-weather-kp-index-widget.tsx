"use client";

import React, { useMemo } from 'react';
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, AlertTriangle } from "lucide-react";
import { UnifiedSpaceWeather } from "@/modules/weather/services/space/schema";
import { cn } from "@/lib/utils";

interface KpIndexWidgetProps {
    data?: UnifiedSpaceWeather;
    loading?: boolean;
}

export const KpIndexWidget: React.FC<KpIndexWidgetProps> = ({ data, loading }) => {
    const currentKp = useMemo(() => {
        if (!data?.kpIndex || data.kpIndex.length === 0) return 0;
        return data.kpIndex[data.kpIndex.length - 1].value;
    }, [data]);

    // Map Kp index to crystal intensity (0-1) — drives animation speed and glow
    const crystalIntensity = useMemo(() => Math.min(1, currentKp / 7), [currentKp]);

    // Map Kp index to colors and glow intensity
    const severityColor = useMemo(() => {
        if (currentKp >= 6) return "from-red-600 to-purple-900";
        if (currentKp >= 4) return "from-orange-500 to-red-600";
        if (currentKp >= 3) return "from-yellow-400 to-orange-500";
        return "from-emerald-400 to-cyan-600";
    }, [currentKp]);

    const textColor = useMemo(() => {
        if (currentKp >= 6) return "text-red-400";
        if (currentKp >= 4) return "text-orange-400";
        if (currentKp >= 3) return "text-yellow-400";
        return "text-emerald-400";
    }, [currentKp]);

    return (
        <Card
            crystalTheme="emerald"
            crystalIntensity={crystalIntensity}
            className="@container relative overflow-hidden w-full flex-1 min-h-[clamp(10rem,18vw,14rem)] shadow-2xl drop-shadow-[0_8px_32px_rgba(0,0,0,0.8)] border-white/10 p-[clamp(0.75rem,2vw,1.5rem)] flex flex-col justify-center items-center group rounded-[clamp(1.25rem,3vw,2rem)]"
        >

            {/* Pulsing Core Glow */}
            <motion.div
                className={cn("absolute inset-0 opacity-10 bg-gradient-to-tr mix-blend-overlay", severityColor)}
                animate={{
                    opacity: [0.15, 0.3, 0.15],
                    scale: [1, 1.05, 1]
                }}
                transition={{
                    duration: Math.max(1, 6 - currentKp), // Pulses faster at higher Kp
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                style={{ transform: 'translateZ(-10px)' }}
            />

            {/* Earth Sphere Grid */}
            <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none" style={{ transform: 'translateZ(-5px)' }}>
                <Globe className="size-24 @md:size-32 text-white" strokeWidth={0.5} />
            </div>

            <motion.div layout="position" className="relative z-10 text-center flex flex-col items-center w-full justify-between h-full" style={{ transformStyle: 'preserve-3d' }}>

                {/* Header for Med/Large Context */}
                <h3 className="hidden @sm:block text-xs @md:text-sm font-bold text-white/90 tracking-widest uppercase mb-2 @md:mb-4 w-full text-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" style={{ transform: 'translateZ(30px)' }}>
                    Planetary K-Index
                </h3>

                {/* Primary Metric */}
                <div className="relative flex items-center justify-center flex-grow" style={{ transform: 'translateZ(60px)' }}>
                    <AnimatePresence mode="wait">
                        {loading ? (
                            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-4xl @sm:text-5xl @md:text-6xl @lg:text-7xl font-black text-white/20 blur-sm">0</motion.div>
                        ) : (
                            <motion.div
                                key="loaded"
                                className={cn("text-4xl @sm:text-5xl @md:text-6xl @lg:text-7xl font-black tracking-tighter drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)] leading-none", textColor)}
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ type: "spring", stiffness: 100, damping: 10 }}
                            >
                                {currentKp.toFixed(1)}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {currentKp >= 5 && !loading && (
                        <motion.div
                            className="absolute -right-4 @sm:-right-8 -top-4 @sm:-top-6 text-red-500"
                            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 1, repeat: Infinity }}
                        >
                            <AlertTriangle className="size-6 @sm:size-8 drop-shadow-[0_0_15px_rgba(239,68,68,1)]" />
                        </motion.div>
                    )}
                </div>

                {/* Status Text for Med/Large Context */}
                <p className="hidden @sm:block mt-2 @md:mt-4 text-xs @md:text-sm font-medium text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" style={{ transform: 'translateZ(40px)' }}>
                    {loading ? "Calculando..." : (currentKp >= 5 ? "Tormenta Geomagnética" : currentKp >= 4 ? "Actividad Elevada" : "Condiciones Tranquilas")}
                </p>

                {/* History sparkline placeholder ONLY in Large Context */}
                <div className="hidden @lg:flex absolute bottom-0 left-0 right-0 h-12 items-end gap-1 opacity-80" style={{ transform: 'translateZ(20px)' }}>
                    {data?.kpIndex?.slice(-8).map((k: any, i: number) => (
                        <motion.div
                            key={i}
                            className={cn(
                                "flex-1 rounded-t-sm shadow-[0_0_10px_rgba(255,255,255,0.2)]",
                                k.value >= 5 ? "bg-red-500/80" : k.value >= 4 ? "bg-orange-500/80" : "bg-emerald-500/80"
                            )}
                            initial={{ height: 0 }}
                            animate={{ height: `${(k.value / 9) * 100}%` }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                        />
                    ))}
                </div>
            </motion.div>
        </Card>
    );
};
