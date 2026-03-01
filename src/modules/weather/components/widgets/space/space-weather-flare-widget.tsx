"use client";

import React, { useMemo } from 'react';
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Activity } from "lucide-react";
import { UnifiedSpaceWeather } from "@/modules/weather/services/space/schema";
import { cn } from "@/lib/utils";

interface FlareWidgetProps {
    data?: UnifiedSpaceWeather;
    loading?: boolean;
}

export const XRayFlareWidget: React.FC<FlareWidgetProps> = ({ data, loading }) => {
    const latestFlare = useMemo(() => {
        if (!data?.xRayFlux || data.xRayFlux.length === 0) return { classLabel: "A1.0", flux: 1e-8 };
        return data.xRayFlux[data.xRayFlux.length - 1];
    }, [data]);

    const flareClass = latestFlare.classLabel.charAt(0);

    // Map flare class to crystal intensity
    const crystalIntensity = useMemo(() => {
        switch (flareClass) {
            case 'X': return 1.0;
            case 'M': return 0.8;
            case 'C': return 0.5;
            default: return 0.3;
        }
    }, [flareClass]);

    const intensityColor = useMemo(() => {
        switch (flareClass) {
            case 'X': return "text-fuchsia-500 drop-shadow-[0_0_15px_rgba(217,70,239,0.8)]";
            case 'M': return "text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]";
            case 'C': return "text-orange-500 drop-shadow-[0_0_10px_rgba(249,115,22,0.6)]";
            case 'B': return "text-yellow-400 drop-shadow-[0_0_5px_rgba(250,204,21,0.4)]";
            default: return "text-blue-400";
        }
    }, [flareClass]);

    const bgGlow = useMemo(() => {
        switch (flareClass) {
            case 'X': return "from-fuchsia-900/20 via-red-900/10";
            case 'M': return "from-red-900/20 via-orange-900/10";
            case 'C': return "from-orange-900/10 via-yellow-900/5";
            default: return "from-blue-900/10 via-slate-900/5";
        }
    }, [flareClass]);

    // Dynamic graph mapping based on last 10 readings
    const history = data?.xRayFlux || [];
    const maxFlux = Math.max(...history.map(h => h.flux), 1e-5); // Base scale of M-class

    return (
        <Card
            crystalTheme="flare"
            crystalIntensity={crystalIntensity}
            className={cn(
                "@container relative overflow-hidden w-full flex-1 min-h-[clamp(10rem,18vw,14rem)] shadow-2xl drop-shadow-[0_8px_32px_rgba(0,0,0,0.8)] border-white/10 p-[clamp(0.75rem,2vw,1.5rem)] flex flex-col justify-between group rounded-[clamp(1.25rem,3vw,2rem)]",
                flareClass === 'X' || flareClass === 'M' ? "border-red-500/50" : ""
            )}>

            {/* Background Dynamic Flare Element */}
            <div className={cn("absolute inset-0 bg-gradient-radial opacity-30 mix-blend-overlay", bgGlow)} style={{ transform: 'translateZ(-10px)' }} />

            {flareClass === 'X' && (
                <motion.div
                    className="absolute inset-0 bg-fuchsia-500/10 mix-blend-overlay"
                    animate={{ opacity: [0, 0.3, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    style={{ transform: 'translateZ(-5px)' }}
                />
            )}

            <motion.div layout="position" className="relative z-10 flex flex-col items-center justify-between h-full w-full" style={{ transformStyle: 'preserve-3d' }}>

                {/* Header */}
                <div className="flex items-center justify-between w-full mb-2 @md:mb-4" style={{ transform: 'translateZ(30px)' }}>
                    <h3 className="text-sm @md:text-base font-bold text-white tracking-widest flex items-center gap-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                        <Flame className={cn("w-5 h-5 @md:w-6 @md:h-6 drop-shadow-xl", intensityColor)} />
                        <span className="drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">X-RAY FLUX</span>
                    </h3>
                    <div className={cn("px-3 py-1 @md:px-4 @md:py-2 rounded-lg border font-mono text-[10px] @md:text-xs tracking-widest shadow-lg",
                        flareClass === 'X' || flareClass === 'M' ? "bg-red-500/20 border-red-500 text-red-100" : "bg-white/10 border-white/20 text-white/90"
                    )}>
                        {loading ? "LOAD" : "LIVE"}
                    </div>
                </div>

                {/* Primary Metric - Scales fluidly */}
                <div className="relative z-10 flex-grow flex items-center justify-center" style={{ transform: 'translateZ(60px)' }}>
                    <AnimatePresence mode="wait">
                        {loading ? (
                            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-5xl @sm:text-6xl @md:text-7xl font-black text-white/20 blur-sm">--</motion.div>
                        ) : (
                            <motion.div
                                key="loaded"
                                className={cn("text-5xl @sm:text-6xl @md:text-7xl @lg:text-8xl font-black tracking-tighter drop-shadow-2xl", intensityColor)}
                                initial={{ scale: 0.9 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                            >
                                {latestFlare.classLabel}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Extended Information for Med/Large Context */}
                <div className="hidden @md:flex flex-col relative z-10 mt-auto w-full pt-4" style={{ transform: 'translateZ(40px)' }}>
                    <div className="flex justify-between items-center text-xs @md:text-sm text-white/70 mb-4 font-mono uppercase drop-shadow-md">
                        <span>{history[0]?.timestamp?.split('T')[1]?.slice(0, 5) || "-"}</span>
                        <span className="flex items-center gap-2"><Activity className="w-4 h-4" /> {latestFlare.flux.toExponential(2)} W/m²</span>
                    </div>

                    {/* Real-time SVG Sparkline Graph - Only in Large */}
                    <div className="hidden @lg:flex h-12 w-full border-b border-white/20 relative items-end">
                        {history.map((pt: any, i: number) => {
                            // Logarithmic scale mapping 1e-8 to 1e-3
                            const logVal = Math.max(0, Math.log10(pt.flux) + 8);
                            const logMax = Math.log10(maxFlux) + 8;
                            const heightPct = Math.min(100, Math.max(2, (logVal / logMax) * 100));

                            const isHigh = pt.classLabel.startsWith('M') || pt.classLabel.startsWith('X');

                            return (
                                <motion.div
                                    key={i}
                                    className={cn(
                                        "flex-1 mx-[2px] rounded-t border-t border-t-white/30 opacity-90 shadow-[0_0_10px_rgba(255,255,255,0.2)]",
                                        isHigh ? "bg-gradient-to-t from-red-500/40 to-fuchsia-500 text-transparent" : "bg-gradient-to-t from-blue-500/40 to-cyan-400 text-transparent"
                                    )}
                                    initial={{ height: 0 }}
                                    animate={{ height: `${heightPct}%` }}
                                    transition={{ delay: i * 0.05, duration: 0.5 }}
                                />
                            );
                        })}
                    </div>
                </div>
            </motion.div>
        </Card>
    );
};
