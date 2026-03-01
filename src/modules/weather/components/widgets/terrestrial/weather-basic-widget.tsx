'use client';

import React, { useState, useEffect } from 'react';
import { useWeatherLocation } from '@/modules/weather/context/weather-location-context';
import { fetchWeatherData } from '@/lib/weather-mock';
import { Card } from "@/components/ui/card";
import { CloudRain, Wind, ThermometerSun, MapPin, Sparkles, Cloud, Sun, History, CalendarClock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type TabType = 'current' | 'forecast' | 'history';

export function WeatherBasicWidget() {
    const { location } = useWeatherLocation();

    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<TabType>('current');

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

    const cur = data?.current || {};
    const temp = cur.temperature_2m || 0;
    const windSpeed = cur.wind_speed_10m || 0;
    const humidity = cur.relative_humidity_2m || 0;
    const cloudCover = cur.cloud_cover || 0;
    const weatherCode = cur.weather_code || 0;

    // Determine realistic weather visual states
    const isRaining = [51, 53, 55, 61, 63, 65, 80, 81, 82].includes(weatherCode);
    const isCloudy = cloudCover > 50 || [2, 3].includes(weatherCode);
    const isHot = temp > 25;

    // Daily Forecast Math (past_days=3 means index 3 is today, 4 is tomorrow, 2 is yesterday)
    const daily = data?.daily || {};
    const forecastMax = daily?.temperature_2m_max?.[4] || 0;
    const forecastMin = daily?.temperature_2m_min?.[4] || 0;
    const historyMax = daily?.temperature_2m_max?.[2] || 0; // Yesterday

    const bgGradient = isRaining ? 'from-slate-700/80 to-indigo-900/80'
        : isCloudy ? 'from-slate-400/80 to-slate-600/80'
            : isHot ? 'from-orange-400/80 to-rose-600/80'
                : 'from-sky-400/80 to-blue-600/80';

    return (
        <Card className={`@container w-full h-full relative overflow-hidden bg-background-dark backdrop-blur-[20px] border border-white/10 flex flex-col justify-between group rounded-[1.5rem] hover:border-[#13b6ec] hover:shadow-[0_0_20px_rgba(19,182,236,0.4)] transition-all duration-500`}>
            {/* Ethereal Background + Realistic Layout */}
            <div className={`absolute inset-0 bg-gradient-to-br ${bgGradient} opacity-40 transition-colors duration-1000`} />
            <div className="absolute top-0 right-0 w-1/3 h-full bg-[#13b6ec]/10 blur-[120px] pointer-events-none z-0"></div>
            <div className="absolute bottom-0 left-0 w-1/4 h-full bg-[#8a2be2]/10 blur-[120px] pointer-events-none z-0"></div>

            {/* Sun Rays Animation */}
            {!isRaining && !isCloudy && (
                <motion.div
                    className="absolute -top-10 -right-10 w-48 @sm:w-64 h-48 @sm:h-64 bg-yellow-300/30 rounded-full blur-[40px] @sm:blur-[60px] pointer-events-none"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
            )}

            {/* Clouds Animation */}
            {isCloudy && (
                <div className="absolute inset-0 opacity-40 pointer-events-none overflow-hidden">
                    <motion.div
                        className="absolute top-10 -left-20 w-32 @sm:w-48 h-12 @sm:h-20 bg-white/40 blur-2xl rounded-full"
                        animate={{ x: [0, 500] }}
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div
                        className="absolute top-20 @sm:top-24 -left-40 w-48 @sm:w-64 h-16 @sm:h-24 bg-white/30 blur-3xl rounded-full"
                        animate={{ x: [0, 600] }}
                        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                    />
                </div>
            )}

            {/* Rain Drops Animation */}
            {isRaining && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-60">
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-0.5 h-4 @sm:h-6 bg-blue-200/60 rounded-full blur-[1px]"
                            style={{ left: `${Math.random() * 100}%`, top: -20 }}
                            animate={{ y: [0, 400], opacity: [0, 1, 0] }}
                            transition={{ duration: 0.6 + Math.random() * 0.4, repeat: Infinity, ease: "linear", delay: Math.random() }}
                        />
                    ))}
                </div>
            )}

            {/* Header & Location */}
            <div className="flex justify-between items-start z-10 w-full p-2 @sm:p-4 pb-0 shrink-0">
                <div className="flex items-center gap-1 @sm:gap-1.5 text-white drop-shadow-md">
                    <MapPin className="w-3 @sm:w-4 h-3 @sm:h-4 flex-shrink-0" />
                    <span className="text-[9px] @sm:text-xs font-bold tracking-widest uppercase truncate max-w-[80px] @sm:max-w-none">{location.name.split(',')[0]}</span>
                </div>
                {loading && <div className="w-3 @sm:w-4 h-3 @sm:h-4 border-2 border-white/50 border-t-white rounded-full animate-spin flex-shrink-0" />}
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col items-center justify-center z-10 py-1 @sm:py-2 relative">
                <AnimatePresence mode="wait">
                    {activeTab === 'current' && (
                        <motion.div key="current" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="flex flex-col items-center w-full px-2 @sm:px-4">
                            <div className="flex items-center gap-1 @sm:gap-4">
                                {isRaining ? <CloudRain className="w-6 @xs:w-8 @sm:w-12 h-6 @xs:h-8 @sm:h-12 text-blue-200 drop-shadow-lg flex-shrink-0" />
                                    : isCloudy ? <Cloud className="w-6 @xs:w-8 @sm:w-12 h-6 @xs:h-8 @sm:h-12 text-slate-200 drop-shadow-lg flex-shrink-0" />
                                        : <Sun className="w-6 @xs:w-8 @sm:w-12 h-6 @xs:h-8 @sm:h-12 text-yellow-300 drop-shadow-lg flex-shrink-0" />}

                                <div className="flex items-start drop-shadow-[0_0_15px_rgba(19,182,236,0.5)]">
                                    <span className="text-4xl @xs:text-[60px] @sm:text-[100px] leading-none font-bold tracking-tighter text-white">
                                        {loading ? '--' : Math.round(temp)}
                                    </span>
                                    <span className="text-lg @xs:text-2xl @sm:text-4xl font-black mt-0.5 @sm:mt-2 text-[#13b6ec]">°C</span>
                                </div>
                            </div>

                            {/* Current Metrics Grid inspired by Stitch */}
                            <div className="grid grid-cols-3 gap-1 @xs:gap-1.5 @sm:gap-3 w-full mt-2 @sm:mt-6">
                                <div className="bg-white/5 hover:bg-white/10 transition-colors backdrop-blur-md border border-white/5 rounded-lg @sm:rounded-xl p-1 @xs:p-1.5 @sm:p-3 flex flex-col items-center gap-0.5 @sm:gap-1 group/item">
                                    <Wind className="w-2.5 @xs:w-3.5 @sm:w-5 h-2.5 @xs:h-3.5 @sm:h-5 text-white/70 group-hover/item:text-[#13b6ec] transition-colors" />
                                    <span className="text-[8px] @xs:text-[10px] @sm:text-sm font-bold text-white group-hover/item:text-[#13b6ec] transition-colors">{loading ? '-' : Math.round(windSpeed)} <span className="text-[6px] @xs:text-[8px] @sm:text-[10px] font-light opacity-70">km/h</span></span>
                                </div>
                                <div className="bg-white/5 hover:bg-white/10 transition-colors backdrop-blur-md border border-white/5 rounded-lg @sm:rounded-xl p-1 @xs:p-1.5 @sm:p-3 flex flex-col items-center gap-0.5 @sm:gap-1 group/item">
                                    <CloudRain className="w-2.5 @xs:w-3.5 @sm:w-5 h-2.5 @xs:h-3.5 @sm:h-5 text-[#13b6ec]" />
                                    <span className="text-[8px] @xs:text-[10px] @sm:text-sm font-bold text-white group-hover/item:text-[#13b6ec] transition-colors">{loading ? '-' : Math.round(humidity)}<span className="text-[6px] @xs:text-[8px] @sm:text-[10px] font-light opacity-70">%</span></span>
                                </div>
                                <div className="bg-white/5 hover:bg-white/10 transition-colors backdrop-blur-md border border-white/5 rounded-lg @sm:rounded-xl p-1 @xs:p-1.5 @sm:p-3 flex flex-col items-center gap-0.5 @sm:gap-1 group/item">
                                    <Sparkles className="w-2.5 @xs:w-3.5 @sm:w-5 h-2.5 @xs:h-3.5 @sm:h-5 text-[#8a2be2] group-hover/item:text-[#13b6ec] transition-colors" />
                                    <span className="text-[8px] @xs:text-[10px] @sm:text-sm font-bold text-white group-hover/item:text-[#13b6ec] transition-colors">{loading ? '-' : daily?.uv_index_max?.[3] || 0} <span className="text-[6px] @xs:text-[8px] @sm:text-[10px] font-light opacity-70">UV</span></span>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'forecast' && (
                        <motion.div key="forecast" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="flex flex-col items-center w-full px-2 @sm:px-4">
                            <CalendarClock className="w-5 @xs:w-6 @sm:w-8 h-5 @xs:h-6 @sm:h-8 text-white/80 mb-0.5 @sm:mb-2 drop-shadow-lg" />
                            <h4 className="text-[8px] @xs:text-[10px] @sm:text-xs uppercase font-bold text-white/70 tracking-widest mb-1 @sm:mb-4">Mañana</h4>
                            <div className="flex items-center gap-3 @xs:gap-4 @sm:gap-6 text-white drop-shadow-md">
                                <div className="flex flex-col items-center">
                                    <span className="text-[8px] @xs:text-[10px] @sm:text-sm font-medium text-white/60">Máx</span>
                                    <span className="text-xl @xs:text-2xl @sm:text-4xl font-black">{Math.round(forecastMax)}°</span>
                                </div>
                                <div className="h-6 @xs:h-8 @sm:h-12 w-px bg-white/20"></div>
                                <div className="flex flex-col items-center">
                                    <span className="text-[8px] @xs:text-[10px] @sm:text-sm font-medium text-white/60">Mín</span>
                                    <span className="text-xl @xs:text-2xl @sm:text-4xl font-black opacity-80">{Math.round(forecastMin)}°</span>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'history' && (
                        <motion.div key="history" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="flex flex-col items-center justify-center w-full px-2 @sm:px-4 h-full">
                            <History className="w-5 @xs:w-6 @sm:w-8 h-5 @xs:h-6 @sm:h-8 text-white/80 mb-0.5 @sm:mb-2 drop-shadow-lg" />
                            <h4 className="text-[8px] @xs:text-[10px] @sm:text-xs uppercase font-bold text-white/70 tracking-widest mb-1 @sm:mb-4 text-center">Ayer (Máx.)</h4>
                            <div className="text-white drop-shadow-md flex items-start">
                                <span className="text-3xl @xs:text-4xl @sm:text-5xl font-black leading-none">{Math.round(historyMax)}</span>
                                <span className="text-lg @xs:text-xl @sm:text-2xl font-bold text-white/80">°</span>
                            </div>
                            <span className="text-[7.5px] @xs:text-[10px] @sm:text-xs text-white/80 mt-1 @sm:mt-2 text-center max-w-[90%] font-medium leading-tight">Desviación: {temp > historyMax ? '+' : ''}{Math.round(temp - historyMax)}°C ayer.</span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Custom Interactive Tab Navigation */}
            <div className="flex justify-center p-2 @sm:p-3 z-20 shrink-0">
                <div className="flex bg-black/60 backdrop-blur-xl rounded-full p-0.5 @sm:p-1 border border-white/10 relative">
                    {/* Animated pill background */}
                    <motion.div
                        className="absolute inset-y-0.5 @sm:inset-y-1 bg-white/20 rounded-full shadow-lg"
                        initial={false}
                        animate={{
                            left: activeTab === 'current' ? '2px' : activeTab === 'forecast' ? '33.33%' : 'calc(66.66% - 2px)',
                            width: 'calc(33.33%)'
                        }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />

                    <button onClick={() => setActiveTab('current')} className={`relative z-10 px-2 @sm:px-4 py-1 @sm:py-1.5 text-[8px] @sm:text-[10px] uppercase tracking-wider @sm:tracking-widest font-bold rounded-full transition-colors ${activeTab === 'current' ? 'text-white' : 'text-white/50 hover:text-white/80'}`}>
                        Actual
                    </button>
                    <button onClick={() => setActiveTab('forecast')} className={`relative z-10 px-2 @sm:px-4 py-1 @sm:py-1.5 text-[8px] @sm:text-[10px] uppercase tracking-wider @sm:tracking-widest font-bold rounded-full transition-colors ${activeTab === 'forecast' ? 'text-white' : 'text-white/50 hover:text-white/80'}`}>
                        Próx<span className="hidden @sm:inline">imo</span>
                    </button>
                    <button onClick={() => setActiveTab('history')} className={`relative z-10 px-2 @sm:px-4 py-1 @sm:py-1.5 text-[8px] @sm:text-[10px] uppercase tracking-wider @sm:tracking-widest font-bold rounded-full transition-colors ${activeTab === 'history' ? 'text-white' : 'text-white/50 hover:text-white/80'}`}>
                        Antes
                    </button>
                </div>
            </div>
        </Card>
    );
}
