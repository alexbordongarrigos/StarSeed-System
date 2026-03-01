import React, { useState, useEffect } from 'react';
import { useWeatherLocation } from '@/modules/weather/context/weather-location-context';
import { fetchWeatherData } from '@/lib/weather-mock';
import { Card } from "@/components/ui/card";
import { Tornado, Factory, Activity, ShieldAlert } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function WeatherAirQualityWidget() {
    const { location } = useWeatherLocation();

    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;
        setLoading(true);
        fetchWeatherData(location.lat, location.lon)
            .then(json => {
                if (mounted) {
                    setData(json);
                    setLoading(false);
                }
            })
            .catch(err => {
                console.error("Error fetching weather data:", err);
                if (mounted) setLoading(false);
            });
        return () => { mounted = false; };
    }, [location.lat, location.lon]);

    const aqi = data?.terrestrial?.current?.us_aqi || 0;
    const pm25 = data?.terrestrial?.air_quality?.current?.pm2_5 || 12; // Fallback for aesthetic

    // Derived data for Large View
    const hourlyAqi = data?.terrestrial?.hourly?.us_aqi?.slice(0, 12) || Array(12).fill(0);
    const hourlyTimes = data?.terrestrial?.hourly?.time?.slice(0, 12) || Array(12).fill("00:00");
    const maxAqi = Math.max(...hourlyAqi, 150); // Minimum scale for AQI

    // AQI Status logic
    let aqiColor = "text-emerald-400";
    let bgPulse = "bg-emerald-500/20";
    let statusText = "Excelente";
    if (aqi > 50) { aqiColor = "text-yellow-400"; bgPulse = "bg-yellow-500/20"; statusText = "Regular"; }
    if (aqi > 100) { aqiColor = "text-orange-500"; bgPulse = "bg-orange-500/30"; statusText = "Mala"; }
    if (aqi > 150) { aqiColor = "text-red-500"; bgPulse = "bg-red-500/30"; statusText = "Peligrosa"; }

    return (
        <Card className="@container w-full h-full relative overflow-hidden bg-card/60 backdrop-blur-md border-white/10 p-2 @md:p-4 @lg:p-5 flex flex-col justify-between group">
            {/* Background pulsating particle effect via framer motion */}
            <div className="absolute inset-0 opacity-30 pointer-events-none flex items-center justify-center">
                <motion.div
                    className={`w-32 @sm:w-48 h-32 @sm:h-48 rounded-full blur-[40px] ${bgPulse}`}
                    animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                />
            </div>

            {/* Header (Top) */}
            <motion.div layout="position" className="flex items-center justify-between z-10 shrink-0">
                <div className="flex items-center gap-1.5 @md:gap-2">
                    <div className="p-1 @md:p-2 rounded-full bg-white/5 border border-white/10 flex-shrink-0">
                        <Tornado className={`w-3.5 @md:w-5 h-3.5 @md:h-5 ${aqiColor}`} />
                    </div>
                    {/* Hide text on very small containers */}
                    <span className="hidden @xs:inline-block text-[10px] @md:text-sm font-medium text-muted-foreground uppercase tracking-wider @md:tracking-widest truncate">Calidad Aire</span>
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
                                    {aqi}
                                </span>
                                <span className={`text-xs @sm:text-sm @md:text-xl font-medium ${aqiColor} opacity-90`}>
                                    ICA
                                </span>
                            </motion.div>

                            {/* Secondary Information - Status & Pollutants - Medium+ Container */}
                            <motion.div layout="position" className="hidden @xs:flex mt-1 @sm:mt-2 items-center justify-between">
                                <div className="flex flex-col">
                                    <span className="text-[8px] @md:text-xs text-muted-foreground uppercase tracking-wider @md:tracking-widest">Estado</span>
                                    <div className={`flex items-center gap-1 mt-0.5 @md:mt-1 text-[10px] @md:text-sm font-semibold ${aqiColor}`}>
                                        <ShieldAlert className="w-2.5 @md:w-3 h-2.5 @md:h-3" /> {statusText}
                                    </div>
                                </div>
                                <div className="flex flex-col hidden @sm:flex">
                                    <span className="text-[8px] @md:text-xs text-muted-foreground uppercase tracking-wider @md:tracking-widest flex items-center gap-1">
                                        <Factory className="w-2.5 @md:w-3 h-2.5 @md:h-3" /> PM 2.5
                                    </span>
                                    <span className="text-[10px] @md:text-sm font-semibold text-white mt-0.5 @md:mt-1 font-display tracking-wider">
                                        {pm25} <span className="text-[8px] @md:text-[10px] opacity-50">µg/m³</span>
                                    </span>
                                </div>
                            </motion.div>

                            {/* Tertiary Information (Forecast Chart) - Large+ Container */}
                            <motion.div layout="position" className="hidden @lg:flex mt-6 flex-col gap-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-muted-foreground uppercase tracking-widest font-semibold flex items-center gap-1.5">
                                        <Activity className="w-3.5 h-3.5" /> Pronóstico AQI (12h)
                                    </span>
                                </div>
                                <div className="h-20 w-full flex items-end gap-1 px-1">
                                    {hourlyAqi.map((val: number, index: number) => {
                                        const heightPercent = Math.max((val / maxAqi) * 100, 5);
                                        // Dynamic color per bar based on value
                                        let bColor = "bg-emerald-500/40 group-hover/bar:bg-emerald-400 group-hover/bar:shadow-[0_0_8px_rgba(16,185,129,0.5)]";
                                        if (val > 50) bColor = "bg-yellow-500/40 group-hover/bar:bg-yellow-400 group-hover/bar:shadow-[0_0_8px_rgba(234,179,8,0.5)]";
                                        if (val > 100) bColor = "bg-orange-500/40 group-hover/bar:bg-orange-400 group-hover/bar:shadow-[0_0_8px_rgba(249,115,22,0.5)]";
                                        if (val > 150) bColor = "bg-red-500/40 group-hover/bar:bg-red-400 group-hover/bar:shadow-[0_0_8px_rgba(239,68,68,0.5)]";

                                        return (
                                            <div key={index} className="flex-1 flex flex-col items-center gap-1 group/bar">
                                                <div className="w-full flex justify-center h-full items-end relative">
                                                    {/* Tooltip on hover */}
                                                    <div className="absolute -top-6 bg-black/80 backdrop-blur-sm text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20 shadow-xl border border-white/10">
                                                        {val} ICA
                                                    </div>
                                                    <motion.div
                                                        className={`w-full max-w-[12px] rounded-t-sm transition-all duration-300 ${bColor}`}
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
