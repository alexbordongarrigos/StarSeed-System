"use client";

import React, { useMemo } from 'react';
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, Zap } from "lucide-react";
import { UnifiedSpaceWeather } from "@/modules/weather/services/space/schema";
import { cn } from "@/lib/utils";

interface MagnetometerWidgetProps {
    data?: UnifiedSpaceWeather;
    loading?: boolean;
}

export const MagnetometerWidget: React.FC<MagnetometerWidgetProps> = ({ data, loading }) => {
    const magData = data?.localMagnetometer;

    // The H component is the horizontal intensity of the magnetic field
    // Normalize it for a visual gauge (Teoloyucan averages ~28,400 nT)
    const hComponent = magData?.hComponent || 28400;

    // Create a dynamic rotation for the compass needle based on the X/Y components
    const heading = useMemo(() => {
        if (!magData?.xComponent || !magData?.yComponent) return 0;
        return Math.atan2(magData.yComponent, magData.xComponent) * (180 / Math.PI);
    }, [magData]);

    // Data-driven crystal intensity based on magnetic field disturbance
    const crystalIntensity = data?.alerts?.magneticDisconnection ? 0.9 : 0.4;

    // Fluctuations (dDt) can be simulated for the visual gauge wobble
    const wobble = data?.alerts?.magneticDisconnection ? 15 : 2;

    return (
        <Card
            crystalTheme="magnetometer"
            crystalIntensity={crystalIntensity}
            className="@container relative overflow-hidden w-full flex-1 shadow-2xl drop-shadow-[0_8px_32px_rgba(0,0,0,0.8)] border-white/10 p-[clamp(0.75rem,2vw,1.5rem)] flex flex-col justify-between group rounded-[clamp(1.25rem,3vw,2rem)] min-h-[clamp(14rem,22vw,20rem)]"
        >

            {/* Background Radar Effect */}
            <div className="absolute inset-0 flex items-center justify-center opacity-10 blur-sm @md:blur-none pointer-events-none" style={{ transform: 'translateZ(-10px)' }}>
                <div className="size-24 @md:size-32 rounded-full border border-green-500/30" />
                <div className="absolute size-32 @md:size-48 rounded-full border border-green-500/20" />
                <div className="absolute size-12 @md:size-16 rounded-full border border-green-500/10" />
                <motion.div
                    className="absolute w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
            </div>

            <div className="relative z-10 flex flex-col items-start justify-between mb-4 gap-2" style={{ transform: 'translateZ(30px)' }}>
                <h3 className="text-sm @md:text-base font-medium text-white/90 tracking-wide flex items-center gap-2 @md:gap-3 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    <Compass className="w-5 h-5 @md:w-6 @md:h-6 text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.5)]" />
                    Magnetometer
                </h3>
                <div className="px-3 py-1 @md:px-4 @md:py-2 rounded-xl backdrop-blur-md bg-white/5 border border-white/10 text-[10px] @md:text-xs font-mono text-green-400 uppercase font-bold tracking-wider shadow-lg drop-shadow-md">
                    STN: {magData?.stationCode || "TEO"}
                </div>
            </div>

            {/* Central Gauge & Data - Using flex-row for wide, flex-col for tall */}
            <div className="relative z-10 flex flex-row @lg:flex-col items-center justify-between @lg:justify-center flex-grow gap-4 @md:gap-6" style={{ transformStyle: 'preserve-3d' }}>

                {/* Visual Gauge */}
                <div className="relative size-24 @md:size-32 rounded-full border-2 @md:border-4 border-slate-700/30 flex items-center justify-center bg-black/10 shadow-xl flex-shrink-0 backdrop-blur-sm" style={{ transform: 'translateZ(60px)' }}>
                    {/* Dial Marks */}
                    {Array.from({ length: 12 }).map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-full h-full p-1.5 @md:p-2 pointer-events-none"
                            style={{ transform: `rotate(${i * 30}deg)` }}
                        >
                            <div className="mx-auto w-[2px] h-2 @md:w-[3px] @md:h-3 bg-white/40 rounded-full shadow-[0_0_5px_rgba(255,255,255,0.5)]" />
                        </div>
                    ))}

                    {/* Needle */}
                    <motion.div
                        className="absolute w-1 @md:w-1.5 h-10 @md:h-12 bg-gradient-to-t from-transparent via-red-500 to-red-500 origin-bottom rounded-full shadow-[0_0_15px_rgba(239,68,68,1)]"
                        style={{ bottom: "50%" }}
                        initial={{ rotate: 0 }}
                        animate={{
                            rotate: heading + (Math.random() * wobble - wobble / 2)
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 50,
                            damping: 10,
                            repeat: Infinity,
                            repeatType: "mirror",
                            duration: 2
                        }}
                    />

                    <div className="absolute size-4 @md:size-5 rounded-full bg-slate-200 border-2 border-slate-900 z-20 shadow-2xl drop-shadow-xl" />
                </div>

                {/* Data Points */}
                <div className="grid grid-cols-1 @sm:grid-cols-2 gap-2 @sm:gap-4 w-full" style={{ transform: 'translateZ(40px)' }}>
                    <div className="bg-black/20 rounded-2xl p-3 @md:p-4 text-center border border-white/10 flex flex-col justify-center backdrop-blur-sm shadow-inner">
                        <div className="text-[10px] @md:text-xs text-white/90 mb-1 @md:mb-2 uppercase tracking-widest font-mono drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">H-Component</div>
                        <div className="text-sm @sm:text-base @md:text-lg font-mono text-green-400 drop-shadow-[0_0_10px_rgba(74,222,128,0.8)]">
                            {loading ? "---" : hComponent.toFixed(1)} <span className="text-[10px] @md:text-xs text-white/50">nT</span>
                        </div>
                    </div>
                    <div className="bg-black/20 rounded-2xl p-3 @md:p-4 text-center border border-white/10 flex flex-col justify-center backdrop-blur-sm shadow-inner">
                        <div className="text-[10px] @md:text-xs text-white/90 mb-1 @md:mb-2 uppercase tracking-widest font-mono drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Z-Component</div>
                        <div className="text-sm @sm:text-base @md:text-lg font-mono text-blue-400 drop-shadow-[0_0_10px_rgba(96,165,250,0.8)]">
                            {loading ? "---" : (magData?.zComponent ? magData.zComponent.toFixed(1) : "---")} <span className="text-[10px] @md:text-xs text-white/50">nT</span>
                        </div>
                    </div>
                </div>

            </div>

        </Card>
    );
};
