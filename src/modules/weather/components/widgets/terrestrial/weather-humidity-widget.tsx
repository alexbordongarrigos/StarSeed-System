import React, { useState, useEffect } from 'react';
import { useWeatherLocation } from '@/modules/weather/context/weather-location-context';
import { fetchWeatherData } from '@/lib/weather-mock';
import { Card } from "@/components/ui/card";
import { Droplet, Umbrella } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function WeatherHumidityWidget() {
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

    const humidity = data?.current?.relative_humidity_2m || 0;
    const precipProb = data?.hourly?.precipitation_probability?.[0] || 0;

    // Derived data for Large View
    const hourlyHumidity = data?.hourly?.relative_humidity_2m?.slice(0, 12) || Array(12).fill(0);
    const hourlyTimes = data?.hourly?.time?.slice(0, 12) || Array(12).fill("00:00");

    // Gauge calculation setup
    const radius = 30; // Base radius for SVG calculation, scaled by CSS
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (humidity / 100) * circumference;

    return (
        <Card className="@container w-full h-full relative overflow-hidden bg-card/60 backdrop-blur-md border-white/10 p-2 @md:p-4 @lg:p-5 flex flex-col justify-between group">
            {/* Animated water waves background */}
            <div className="absolute left-0 right-0 bottom-0 opacity-20 pointer-events-none flex flex-col justify-end h-full">
                <motion.div
                    className="w-[200%] h-[40%] bg-blue-500/40 rounded-[100%] absolute bottom-[-10%] blur-xl"
                    animate={{ x: ["-25%", "0%", "-25%"] }}
                    transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                />
            </div>

            {/* Header (Top) */}
            <motion.div layout="position" className="flex items-center justify-between z-10 shrink-0">
                <div className="flex items-center gap-1.5 @md:gap-2">
                    <div className="p-1 @md:p-2 rounded-full bg-white/5 border border-white/10 flex-shrink-0">
                        <Droplet className="w-3.5 @md:w-5 h-3.5 @md:h-5 text-blue-400" />
                    </div>
                    {/* Hide text on very small containers */}
                    <span className="hidden @xs:inline-block text-[10px] @md:text-sm font-medium text-muted-foreground uppercase tracking-wider @md:tracking-widest truncate">Humedad</span>
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
                            <div className="flex flex-row items-center justify-between @sm:gap-4">
                                {/* Primary Metric */}
                                <motion.div layout="position" className="flex flex-col @sm:flex-row @sm:items-baseline gap-0.5 @sm:gap-2">
                                    <span className="text-3xl @xs:text-4xl @sm:text-5xl @md:text-6xl font-bold font-display tracking-tighter text-slate-200 drop-shadow-md leading-none">
                                        {humidity}
                                    </span>
                                    <span className="text-xs @sm:text-sm @md:text-xl font-medium text-blue-400 opacity-80">%</span>
                                </motion.div>

                                {/* Gauge Indicator - Hidden on extra small, shown on small+ */}
                                <motion.div layout="position" className="hidden @sm:flex relative items-center justify-center w-12 @md:w-16 h-12 @md:h-16 shrink-0">
                                    <svg className="w-full h-full transform -rotate-90 pointer-events-none" viewBox="0 0 80 80">
                                        {/* Background track */}
                                        <circle
                                            cx="40" cy="40" r={radius}
                                            fill="transparent"
                                            className="stroke-slate-800"
                                            strokeWidth="6"
                                        />
                                        {/* Active filled track */}
                                        <motion.circle
                                            cx="40" cy="40" r={radius}
                                            fill="transparent"
                                            className="stroke-blue-500 drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]"
                                            strokeWidth="6"
                                            strokeLinecap="round"
                                            strokeDasharray={circumference}
                                            initial={{ strokeDashoffset: circumference }}
                                            animate={{ strokeDashoffset }}
                                            transition={{ duration: 1.5, ease: "easeOut" }}
                                        />
                                    </svg>
                                    <Droplet className="absolute w-4 @md:w-5 h-4 @md:h-5 text-blue-300 opacity-60" />
                                </motion.div>
                            </div>

                            {/* Secondary Information - Precipitation Prob - Medium+ */}
                            <motion.div layout="position" className="hidden @xs:flex mt-1 @sm:mt-2 items-center justify-between">
                                <div className="flex flex-col">
                                    <span className="text-[8px] @md:text-xs text-muted-foreground uppercase tracking-wider @md:tracking-widest flex items-center gap-1">
                                        Precipitación <Umbrella className="w-2.5 h-2.5" />
                                    </span>
                                    <div className="flex items-center gap-1 mt-0.5 @md:mt-1 text-[10px] @md:text-sm font-semibold text-sky-300">
                                        {precipProb}% Probabilidad
                                    </div>
                                </div>
                            </motion.div>

                            {/* Tertiary Information (Humidity Chart) - Large+ Container */}
                            <motion.div layout="position" className="hidden @lg:flex mt-6 flex-col gap-2">
                                <div className="h-16 w-full flex items-end gap-1 px-1">
                                    {hourlyHumidity.map((hum: number, index: number) => {
                                        return (
                                            <div key={index} className="flex-1 flex flex-col items-center gap-1 group/bar">
                                                <div className="w-full flex justify-center h-full items-end relative">
                                                    {/* Tooltip on hover */}
                                                    <div className="absolute -top-6 bg-black/80 backdrop-blur-sm text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20 shadow-xl border border-white/10">
                                                        {hum}%
                                                    </div>
                                                    <motion.div
                                                        className="w-full max-w-[12px] rounded-t-sm transition-all duration-300 bg-blue-500/40 group-hover/bar:bg-blue-400 group-hover/bar:shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                                                        initial={{ height: 0 }}
                                                        animate={{ height: `${hum}%` }}
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
