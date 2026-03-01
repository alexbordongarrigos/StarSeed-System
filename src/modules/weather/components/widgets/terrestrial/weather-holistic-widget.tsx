'use client';
import { useWeatherLocation } from '@/modules/weather/context/weather-location-context';
import { fetchWeatherData } from '@/lib/weather-mock';


import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Card } from "@/components/ui/card";
import { Globe, RefreshCw, Zap, Wind, Maximize2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { ClimateMap } from './climate-map';

export function WeatherHolisticWidget() {
    const { location } = useWeatherLocation();

    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;
        fetchWeatherData(location.lat, location.lon)
            .then(json => {
                setData(json);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching holistic weather data:", err);
                setLoading(false);
            });
    }, [location.lat, location.lon]);

    const temp = data?.terrestrial?.current?.temperature_2m || 0;
    const kpIndex = data?.energetic?.kp || 0;
    const moonPhaseRaw = data?.astronomical?.moon_phase || 0;
    const windSpeed = data?.terrestrial?.current?.wind_speed_10m || 0;

    return (
        <Card className="@container w-full h-full relative overflow-hidden bg-[rgba(16,34,22,0.8)] backdrop-blur-[12px] border border-[#25f46a]/20 group flex flex-col justify-between p-0 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] rounded-[1.5rem]">
            {/* Header Overlay */}
            <div className="absolute top-0 left-0 right-0 p-3 @sm:p-5 flex justify-between items-start z-10 pointer-events-none">
                <div className="flex items-center gap-2 @sm:gap-3 pointer-events-auto">
                    <div className="p-1.5 @sm:p-2 rounded-full bg-[#25f46a]/10 border border-[#25f46a]/30 backdrop-blur-md">
                        <Globe className="w-3 h-3 @sm:w-4 @sm:h-4 text-[#25f46a]" />
                    </div>
                    <span className="text-[10px] @sm:text-xs font-bold text-slate-100 uppercase tracking-widest drop-shadow-md">Biósfera Holográfica</span>
                </div>
                {loading ? (
                    <RefreshCw className="w-3 h-3 @sm:w-4 @sm:h-4 text-[#25f46a] animate-spin" />
                ) : (
                    <div className="flex items-center gap-2 pointer-events-auto">
                        <div className="px-2 py-1 @sm:px-3 @sm:py-1.5 rounded-full bg-[#25f46a]/10 border border-[#25f46a]/30 backdrop-blur-md text-[8px] @sm:text-[9px] font-bold tracking-[0.2em] text-[#25f46a] cursor-help" title={location.name || "Unknown Location"}>
                            CVJ / MX
                        </div>
                        <Link href="/atmosphere" className="p-1.5 @sm:p-2 rounded-full bg-black/60 hover:bg-[#25f46a]/20 border border-white/10 hover:border-[#25f46a]/50 backdrop-blur-md transition-colors group/expand">
                            <Maximize2 className="w-3 h-3 @sm:w-4 @sm:h-4 text-white/70 group-hover/expand:text-[#25f46a] transition-colors" />
                        </Link>
                    </div>
                )}
            </div>

            {/* Map Canvas Context */}
            <div className="absolute inset-0 z-0">
                <ClimateMap />
            </div>

            {/* Data HUD Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-2 @xs:p-3 @sm:p-5 z-10 pointer-events-none flex justify-between items-end">
                <AnimatePresence>
                    {!loading && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex flex-col @sm:flex-row justify-between w-full gap-2 @sm:gap-3"
                        >
                            <div className="flex gap-2 @sm:gap-3">
                                {/* Terrestrial */}
                                <div className="flex flex-col gap-0.5 @sm:gap-1 pointer-events-auto bg-[#080f0a]/60 backdrop-blur-xl p-2 @sm:p-3 rounded-xl border border-[#25f46a]/20 shadow-xl min-w-[60px] @xs:min-w-[80px] @sm:min-w-[100px]">
                                    <span className="text-[7px] @xs:text-[8px] @sm:text-[9px] uppercase tracking-[0.2em] text-[#25f46a] font-bold flex items-center gap-1 mb-0.5 @sm:mb-1">
                                        <Globe className="w-2.5 h-2.5 @sm:w-3 @sm:h-3" /> Earth
                                    </span>
                                    <span className="text-lg @xs:text-xl @sm:text-2xl font-bold font-display text-slate-100">{Math.round(temp)}°C</span>
                                    <span className="text-[8px] @xs:text-[9px] @sm:text-[10px] uppercase font-bold text-slate-400">{windSpeed} <span className="hidden @sm:inline">km/h</span></span>
                                </div>

                                {/* Space */}
                                <div className="hidden @xs:flex flex-col gap-0.5 @sm:gap-1 pointer-events-auto bg-[#080f0a]/60 backdrop-blur-xl p-2 @sm:p-3 rounded-xl border border-[#ff00ff]/20 shadow-xl min-w-[60px] @xs:min-w-[80px] @sm:min-w-[100px]">
                                    <span className="text-[7px] @xs:text-[8px] @sm:text-[9px] uppercase tracking-[0.2em] text-[#ff00ff] font-bold flex items-center gap-1 mb-0.5 @sm:mb-1">
                                        <Zap className="w-2.5 h-2.5 @sm:w-3 @sm:h-3" /> Kp Idx
                                    </span>
                                    <span className="text-lg @xs:text-xl @sm:text-2xl font-bold font-display text-slate-100">{kpIndex}</span>
                                    <span className="text-[8px] @xs:text-[9px] @sm:text-[10px] uppercase font-bold text-slate-400">{kpIndex > 4 ? 'Geotormenta' : 'Estable'}</span>
                                </div>
                            </div>

                            {/* Astronomy */}
                            <div className="hidden @xs:flex flex-col gap-0.5 @sm:gap-1 pointer-events-auto bg-[#080f0a]/60 backdrop-blur-xl p-2 @sm:p-3 rounded-xl border border-white/10 shadow-xl text-left @sm:text-right min-w-[60px] @xs:min-w-[80px] @sm:min-w-[100px]">
                                <span className="text-[7px] @xs:text-[8px] @sm:text-[9px] uppercase tracking-[0.2em] text-slate-300 font-bold flex items-center gap-1 justify-start @sm:justify-end mb-0.5 @sm:mb-1">
                                    <span className="material-symbols-outlined text-[10px] @sm:text-[12px]">dark_mode</span> Luna
                                </span>
                                <span className="text-lg @xs:text-xl @sm:text-2xl font-bold font-display text-slate-100">{Math.round(moonPhaseRaw * 100)}%</span>
                                <div className="w-full h-1 bg-white/10 rounded-full mt-1 @sm:mt-2 overflow-hidden">
                                    <div className="h-full bg-slate-300 shadow-[0_0_8px_rgba(255,255,255,0.8)]" style={{ width: `${moonPhaseRaw * 100}%` }} />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Interactive hint */}
            <div className="absolute top-[50%] right-4 -translate-y-1/2 flex flex-col items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
                <div className="w-8 h-16 rounded-full border border-white/20 flex justify-center p-1 bg-black/20 backdrop-blur-sm">
                    <motion.div
                        className="w-1.5 h-1.5 rounded-full bg-white/50"
                        animate={{ y: [0, 40, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                </div>
                <span className="text-[8px] uppercase tracking-widest text-white/50 rotate-90 mt-4 font-bold">Arrastrar</span>
            </div>
        </Card>
    );
}