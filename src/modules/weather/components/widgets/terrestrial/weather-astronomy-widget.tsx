'use client';

import React, { useState, useEffect } from 'react';
import { useWeatherLocation } from '@/modules/weather/context/weather-location-context';
import { fetchWeatherData } from '@/lib/weather-mock';
import { Card } from "@/components/ui/card";
import { MoonStar, Compass, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export function WeatherAstronomyWidget() {
    const { location } = useWeatherLocation();

    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;
        fetchWeatherData(location.lat, location.lon)
            .then(json => {
                setData(json.astronomical);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching weather data:", err);
                setLoading(false);
            });
    }, [location.lat, location.lon]);

    const moonPhaseRaw = data?.moon_phase || 0; // 0-1
    let moonPhaseName = "Nueva";
    if (moonPhaseRaw > 0 && moonPhaseRaw < 0.25) moonPhaseName = "Creciente";
    if (moonPhaseRaw >= 0.25 && moonPhaseRaw < 0.5) moonPhaseName = "Cuarto Creciente";
    if (moonPhaseRaw >= 0.5 && moonPhaseRaw < 0.75) moonPhaseName = "Llena";
    if (moonPhaseRaw >= 0.75 && moonPhaseRaw < 1) moonPhaseName = "Cuarto Menguante";

    return (
        <Card className="@container w-full h-full relative overflow-hidden bg-[#0A0B10]/80 backdrop-blur-md border-[#1a1c2e]/50 p-2 @sm:p-5 group flex flex-col justify-between">
            <Link href="/atmosphere" className="absolute top-2 right-2 p-1.5 rounded-full bg-indigo-500/10 hover:bg-indigo-500/30 text-indigo-300/50 hover:text-indigo-300 transition-colors z-20 cursor-pointer" title="Open Climate App">
                <ExternalLink className="w-3 h-3 @sm:w-4 @sm:h-4" />
            </Link>

            {/* Starry Background */}
            <div className="absolute inset-0 opacity-40 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-[1px] @sm:w-[2px] h-[1px] @sm:h-[2px] bg-white rounded-full blur-[0.5px]"
                        style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}
                        animate={{ opacity: [0.2, 0.8, 0.2] }}
                        transition={{ repeat: Infinity, duration: 1 + Math.random() * 2, ease: "easeInOut", delay: Math.random() }}
                    />
                ))}
            </div>

            <div className="flex items-center justify-between z-10 shrink-0">
                <div className="flex items-center gap-1.5 @sm:gap-2">
                    <div className="p-1 @sm:p-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex-shrink-0">
                        <MoonStar className="w-3.5 @sm:w-5 h-3.5 @sm:h-5 text-indigo-300" />
                    </div>
                    <span className="text-[10px] @sm:text-sm font-medium text-indigo-200/50 uppercase tracking-wider @sm:tracking-widest truncate max-w-[60px] @sm:max-w-none">Astronomía</span>
                </div>
                {loading && <div className="w-3 @sm:w-4 h-3 @sm:h-4 border-2 border-primary/50 border-t-primary rounded-full animate-spin flex-shrink-0" />}
            </div>

            <div className="flex flex-col z-10 mt-1 @sm:mt-4 items-center justify-center py-0.5 @sm:py-2 h-full">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={loading ? 'loading' : 'loaded'}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="flex flex-col items-center w-full"
                    >
                        {loading ? (
                            <span className="text-3xl @sm:text-4xl font-bold text-white/50 blur-sm animate-pulse">--</span>
                        ) : (
                            <>
                                {/* Simple CSS Moon visualization based on phase 0-1 */}
                                <div className="relative w-12 h-12 @xs:w-16 @xs:h-16 @sm:w-20 @sm:h-20 rounded-full bg-slate-800 overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.1)] @sm:shadow-[0_0_30px_rgba(255,255,255,0.1)] flex-shrink-0">
                                    <motion.div
                                        className="absolute inset-0 bg-slate-200"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        style={{
                                            clipPath: `inset(0 ${(1 - moonPhaseRaw) * 100}% 0 0)`
                                        }}
                                    />
                                    {/* Sub-craters */}
                                    <div className="absolute top-3 @sm:top-4 left-3 @sm:left-4 w-2 @sm:w-3 h-2 @sm:h-3 bg-black/10 rounded-full blur-[1px]"></div>
                                    <div className="absolute bottom-4 @sm:bottom-6 right-4 @sm:right-6 w-3 @sm:w-5 h-2.5 @sm:h-4 bg-black/10 rounded-full blur-[1px]"></div>
                                </div>
                                <span className={`text-xs @xs:text-sm @sm:text-xl font-bold font-display tracking-tight text-white drop-shadow-md mt-1 @sm:mt-4 text-center truncate w-full px-1`}>
                                    Fase {moonPhaseName}
                                </span>
                                <span className="text-[8px] @sm:text-[10px] font-bold tracking-wider @sm:tracking-widest uppercase text-indigo-300/50 mt-0.5 @sm:mt-1 truncate max-w-full">
                                    Iluminación: {Math.round(moonPhaseRaw * 100)}%
                                </span>
                            </>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </Card>
    );
}
