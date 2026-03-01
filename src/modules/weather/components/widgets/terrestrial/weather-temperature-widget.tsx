'use client';

import React, { useState, useEffect } from 'react';
import { useWeatherLocation } from '@/modules/weather/context/weather-location-context';
import { fetchWeatherData } from '@/lib/weather-mock';
import { Card } from "@/components/ui/card";
import { ThermometerSun, AlertCircle, ExternalLink, Droplets } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export function WeatherTemperatureWidget() {
    const { location } = useWeatherLocation();

    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;
        fetchWeatherData(location.lat, location.lon)
            .then(json => {
                setData(json.terrestrial);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching weather data:", err);
                setLoading(false);
            });
    }, [location.lat, location.lon]);

    const tempTemp = data?.current?.temperature_2m || 0;
    const precipProb = data?.hourly?.precipitation_probability?.[0] || 0;

    // Determine color based on temperature
    let tempColor = "text-sky-400";
    let glowColor = "shadow-sky-500/20";
    if (tempTemp > 25) { tempColor = "text-orange-500"; glowColor = "shadow-orange-500/30"; }
    else if (tempTemp > 30) { tempColor = "text-red-500"; glowColor = "shadow-red-500/40"; }

    return (
        <Card className="@container w-full h-full relative overflow-hidden bg-card/60 backdrop-blur-md border-white/10 p-2 @sm:p-5 group flex flex-col justify-between">
            <Link href="/atmosphere" className="absolute top-2 right-2 p-1.5 rounded-full bg-white/5 hover:bg-white/20 text-white/50 hover:text-white transition-colors z-20 cursor-pointer" title="Open Climate App">
                <ExternalLink className="w-3 h-3 @sm:w-4 @sm:h-4" />
            </Link>

            {/* Background ambient glow based on temp */}
            <div className={`absolute top-0 right-0 w-24 @sm:w-32 h-24 @sm:h-32 rounded-full blur-[40px] @sm:blur-[60px] opacity-20 transition-colors duration-1000 ${tempTemp > 25 ? 'bg-orange-500' : 'bg-sky-500'}`} />

            <div className="flex items-center justify-between z-10 shrink-0">
                <div className="flex items-center gap-1.5 @sm:gap-2">
                    <div className="p-1 @sm:p-2 rounded-full bg-white/5 border border-white/10 flex-shrink-0">
                        <ThermometerSun className={`w-3.5 @sm:w-5 h-3.5 @sm:h-5 ${tempColor}`} />
                    </div>
                    <span className="text-[10px] @sm:text-sm font-medium text-muted-foreground uppercase tracking-wider @sm:tracking-widest truncate max-w-[60px] @sm:max-w-none">Temperatura</span>
                </div>
                {loading && <div className="w-3 @sm:w-4 h-3 @sm:h-4 border-2 border-primary/50 border-t-primary rounded-full animate-spin flex-shrink-0" />}
            </div>

            <div className="flex flex-col z-10 mt-1 @sm:mt-4">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={loading ? 'loading' : 'loaded'}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-baseline gap-0.5 @sm:gap-1"
                    >
                        {loading ? (
                            <span className="text-3xl @sm:text-4xl font-bold text-white/50 blur-sm animate-pulse">--°</span>
                        ) : (
                            <div className="flex flex-col">
                                <div className="flex items-baseline gap-0.5 @sm:gap-1">
                                    <span className={`text-3xl @xs:text-4xl @sm:text-6xl font-bold font-display tracking-tighter ${tempColor} drop-shadow-lg leading-none`}>
                                        {Math.round(tempTemp)}
                                    </span>
                                    <span className={`text-base @sm:text-2xl font-medium ${tempColor} opacity-70`}>°C</span>
                                </div>
                                <div className="flex items-center gap-1 mt-1 text-[10px] @sm:text-xs text-sky-400 font-medium">
                                    <Droplets className="w-2.5 h-2.5 @sm:w-3 @sm:h-3" />
                                    <span>{precipProb}% Precip</span>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>

                <div className="mt-1 @sm:mt-2 text-[9px] @sm:text-xs text-muted-foreground flex items-center gap-1 truncate max-w-[100px] @xs:max-w-full">
                    <AlertCircle className="w-2 @sm:w-3 h-2 @sm:h-3 flex-shrink-0" /> <span className="truncate">Live / {location.name.split(',')[0]}</span>
                </div>
            </div>

            {/* Simple liquid animation line at bottom */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-white/5 overflow-hidden">
                <motion.div
                    className={`h-full ${tempTemp > 25 ? 'bg-orange-500' : 'bg-sky-500'} opacity-50`}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%", x: ["-100%", "0%"] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                />
            </div>
        </Card>
    );
}
