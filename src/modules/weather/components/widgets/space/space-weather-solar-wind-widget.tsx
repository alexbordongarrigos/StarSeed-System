"use client";

import React, { useEffect, useState } from 'react';
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Activity, Wind, Thermometer, Database } from "lucide-react";
import { cn } from "@/lib/utils";
import { UnifiedSpaceWeather } from "@/modules/weather/services/space/schema";

interface SolarWindWidgetProps {
    data?: UnifiedSpaceWeather;
    loading?: boolean;
}

export const SolarWindWidget: React.FC<SolarWindWidgetProps> = ({ data, loading }) => {
    const [particles, setParticles] = useState(Array.from({ length: 20 }));

    // Dynamic particle speed based on solar wind
    const windSpeed = data?.solarWind?.speed || 400; // default 400km/s
    const speedNormalized = Math.max(0.5, Math.min(3, windSpeed / 400));

    // Data-driven crystal intensity — faster wind = more intense visual
    const crystalIntensity = Math.min(1, speedNormalized / 2);

    return (
        <Card
            crystalTheme="solar-wind"
            crystalIntensity={crystalIntensity}
            className="@container relative overflow-hidden w-full flex-1 min-h-[clamp(11rem,20vw,16rem)] shadow-2xl drop-shadow-[0_8px_32px_rgba(0,0,0,0.8)] border-white/10 p-[clamp(0.75rem,2vw,1.5rem)] rounded-[clamp(1.25rem,3vw,2rem)] flex flex-col justify-between group"
        >
            {/* 3D Particle Background Simulation */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-20 mix-blend-overlay" style={{ transform: 'translateZ(-20px)' }}>
                {particles.map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full bg-gradient-to-r from-orange-500/80 to-yellow-300/80 blur-[2px]"
                        style={{
                            width: Math.random() * 6 + 2,
                            height: Math.random() * 2 + 1,
                            top: `${Math.random() * 100}%`,
                            left: `-10%`,
                        }}
                        animate={{
                            x: ["0vw", "120vw"],
                            y: [0, (Math.random() - 0.5) * 50]
                        }}
                        transition={{
                            duration: (Math.random() * 5 + 3) / speedNormalized,
                            repeat: Infinity,
                            ease: "linear",
                            delay: Math.random() * 5
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 flex flex-col items-start mb-4" style={{ transform: 'translateZ(40px)' }}>
                <h3 className="text-sm @md:text-base font-bold text-white tracking-widest flex items-center gap-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    <Wind className="w-5 h-5 @md:w-6 @md:h-6 text-orange-400 drop-shadow-[0_0_8px_rgba(251,146,60,0.5)]" />
                    SOLAR WIND
                </h3>
                {loading && <div className="w-4 h-4 @md:w-5 @md:h-5 rounded-full border-2 border-orange-500 border-t-transparent animate-spin" />}
            </div>

            <div className="relative z-10 grid grid-cols-2 @lg:grid-cols-4 gap-3 @md:gap-4 flex-grow" style={{ transform: 'translateZ(60px)' }}>
                <MetricCard
                    icon={<Activity />}
                    label="Speed"
                    value={data?.solarWind?.speed ? `${data.solarWind.speed.toFixed(1)}` : "---"}
                    unit="km/s"
                    color="text-orange-400"
                />
                <MetricCard
                    icon={<Database />}
                    label="Density"
                    value={data?.solarWind?.density ? `${data.solarWind.density.toFixed(1)}` : "---"}
                    unit="p/cm³"
                    color="text-blue-400"
                />
                <MetricCard
                    icon={<Thermometer />}
                    label="Temp"
                    value={data?.solarWind?.temperature ? `${(data.solarWind.temperature / 1000).toFixed(0)}k` : "---"}
                    unit="K"
                    color="text-red-400"
                />
                <MetricCard
                    icon={<Activity />}
                    label="IMF Bz"
                    value={data?.solarWind?.bz !== undefined && data.solarWind.bz !== null ? `${data.solarWind.bz.toFixed(1)}` : "---"}
                    unit="nT"
                    color={data?.solarWind?.bz && data.solarWind.bz < 0 ? "text-red-500" : "text-green-400"}
                />
            </div>
        </Card>
    );
};

const MetricCard = ({ icon, label, value, unit, color }: any) => (
    <div
        className="bg-black/20 border border-white/10 rounded-2xl p-3 @md:p-4 flex flex-col justify-center backdrop-blur-sm transition-all hover:bg-black/30 hover:scale-[1.05] cursor-default shadow-inner"
        style={{ transform: 'translateZ(20px)', transformStyle: 'preserve-3d' }}
    >
        <div className="flex items-center gap-2 mb-1 @md:mb-2 text-white/90 text-[10px] @md:text-xs font-semibold uppercase tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            {React.cloneElement(icon, { className: "w-3 h-3 @md:w-4 @md:h-4 hidden @sm:block shadow-sm" })}
            <span className="truncate">{label}</span>
        </div>
        <div className="flex items-baseline gap-1">
            <span className={cn("text-lg @md:text-2xl font-black font-mono tracking-tighter drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] leading-none", color)}>
                {value}
            </span>
            <span className="text-[10px] @md:text-xs text-white/50 font-bold ml-1 drop-shadow-sm">{unit}</span>
        </div>
    </div>
);
