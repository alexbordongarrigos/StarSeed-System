'use client';

import React, { useState, useEffect } from 'react';
import { useWeatherLocation } from '@/modules/weather/context/weather-location-context';
import { fetchWeatherData } from '@/lib/weather-mock';
import { Card } from "@/components/ui/card";
import { Wind, Navigation, Activity } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function WeatherWindWidget() {
    const { location } = useWeatherLocation();

    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;
        setLoading(true);
        fetchWeatherData(location.lat, location.lon)
            .then(json => {
                if (mounted) {
                    setData(json.terrestrial);
                    setLoading(false);
                }
            })
            .catch(err => {
                console.error("Error fetching weather data:", err);
                if (mounted) setLoading(false);
            });
        return () => { mounted = false; };
    }, [location.lat, location.lon]);

    const windSpeed = data?.current?.wind_speed_10m || 0;

    // Derived wind data for Large view
    const hourlySpeeds = data?.hourly?.wind_speed_10m?.slice(0, 12) || Array(12).fill(0);
    const hourlyTimes = data?.hourly?.time?.slice(0, 12) || Array(12).fill("00:00");
    const maxSpeed = Math.max(...hourlySpeeds, 1); // Avoid division by zero

    return (
        <Card className="@container w-full h-full relative overflow-hidden bg-card/60 backdrop-blur-md border-white/10 p-2 @md:p-4 @lg:p-5 flex flex-col justify-between group">
            {/* Animated wind lines background */}
            <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute h-[1px] bg-gradient-to-r from-transparent via-white to-transparent w-[100px] @sm:w-[200px]"
                        style={{ top: `${10 * i + 10}%`, left: '-200px' }}
                        animate={{ left: '100%' }}
                        transition={{
                            repeat: Infinity,
                            duration: 1 + Math.random() * 4,
                            ease: "linear",
                            delay: Math.random() * 2
                        }}
                    />
                ))}
            </div>

            {/* Header (Top) */}
            <motion.div layout="position" className="flex items-center justify-between z-10 shrink-0">
                <div className="flex items-center gap-1.5 @md:gap-2">
                    <div className="p-1 @md:p-2 rounded-full bg-white/5 border border-white/10 flex-shrink-0">
                        <Wind className="w-3.5 @md:w-5 h-3.5 @md:h-5 text-slate-300" />
                    </div>
                    {/* Hide text on very small containers */}
                    <span className="hidden @xs:inline-block text-[10px] @md:text-sm font-medium text-muted-foreground uppercase tracking-wider @md:tracking-widest truncate">Viento</span>
                </div>
                {loading && <div className="w-3 @md:w-4 h-3 @md:h-4 border-2 border-primary/50 border-t-primary rounded-full animate-spin flex-shrink-0" />}
            </motion.div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col justify-center min-h-0 relative z-10 mt-1 @md:mt-4">
                <AnimatePresence mode="wait">
                    {loading ? (
                        <motion.div
                            key="loading"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="flex items-center justify-center h-full"
                        >
                            <span className="text-3xl font-bold text-white/50 blur-sm animate-pulse">--</span>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="loaded"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex flex-col h-full justify-between"
                        >
                            {/* Primary Metric - Scales based on container */}
                            <motion.div layout="position" className="flex flex-col @sm:flex-row @sm:items-baseline gap-0.5 @sm:gap-2">
                                <span className="text-3xl @xs:text-4xl @sm:text-5xl @md:text-6xl font-bold font-display tracking-tighter text-slate-200 drop-shadow-md leading-none">
                                    {windSpeed}
                                </span>
                                <span className="text-xs @sm:text-sm @md:text-xl font-medium text-slate-400 opacity-70">km/h</span>
                            </motion.div>

                            {/* Secondary Information - Medium+ Container */}
                            <motion.div layout="position" className="hidden @xs:flex mt-1 @sm:mt-2 items-center justify-between">
                                <div className="flex flex-col">
                                    <span className="text-[8px] @md:text-xs text-muted-foreground uppercase tracking-wider @md:tracking-widest">Dirección</span>
                                    <div className="flex items-center gap-1 mt-0.5 @md:mt-1 text-[10px] @md:text-sm font-semibold text-slate-300">
                                        Noreste <Navigation className="w-2.5 @md:w-3 h-2.5 @md:h-3 text-sky-400 rotate-45" />
                                    </div>
                                </div>
                            </motion.div>

                            {/* Tertiary Information (Forecast Chart) - Large+ Container */}
                            <motion.div layout="position" className="hidden @lg:flex mt-6 flex-col gap-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-muted-foreground uppercase tracking-widest font-semibold flex items-center gap-1.5">
                                        <Activity className="w-3.5 h-3.5" /> Ráfagas (12h)
                                    </span>
                                </div>
                                <div className="h-20 w-full flex items-end gap-1 px-1">
                                    {hourlySpeeds.map((speed: number, index: number) => {
                                        const heightPercent = Math.max((speed / maxSpeed) * 100, 5);
                                        const isPeak = speed === maxSpeed;
                                        return (
                                            <div key={index} className="flex-1 flex flex-col items-center gap-1 group/bar">
                                                <div className="w-full flex justify-center h-full items-end relative">
                                                    {/* Tooltip on hover */}
                                                    <div className="absolute -top-6 bg-black/80 backdrop-blur-sm text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20 shadow-xl border border-white/10">
                                                        {speed} km/h
                                                    </div>
                                                    <motion.div
                                                        className={`w-full max-w-[12px] rounded-t-sm transition-all duration-300 ${isPeak ? 'bg-sky-400' : 'bg-slate-500/50 group-hover/bar:bg-sky-500/70'}`}
                                                        initial={{ height: 0 }}
                                                        animate={{ height: `${heightPercent}%` }}
                                                        transition={{ duration: 0.5, delay: index * 0.05 }}
                                                    />
                                                </div>
                                                <span className="text-[8px] text-muted-foreground/50 truncate w-full text-center">
                                                    {index % 3 === 0 ? hourlyTimes[index] : ''}
                                                </span>
                                            </div>
                                        )
                                    })}
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </Card>
    );
}
