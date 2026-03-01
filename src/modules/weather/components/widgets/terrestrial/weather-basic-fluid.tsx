'use client';

import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { useWeatherLocation } from '@/modules/weather/context/weather-location-context';
import { fetchWeatherData } from '@/lib/weather-mock';
import { Card } from "@/components/ui/card";
import Link from 'next/link';

export function WeatherBasicFluidWidget() {
    const { location } = useWeatherLocation();
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;
        setLoading(true);
        fetchWeatherData(location.lat, location.lon)
            .then(json => {
                if (mounted && json.terrestrial) {
                    setData(json.terrestrial);
                    setLoading(false);
                }
            })
            .catch(() => {
                if (mounted) setLoading(false);
            });
        return () => { mounted = false; };
    }, [location.lat, location.lon]);

    const cur = data?.current || {};
    const temp = cur.temperature_2m !== undefined ? Math.round(cur.temperature_2m) : '--';
    const windSpeed = cur.wind_speed_10m !== undefined ? Math.round(cur.wind_speed_10m) : '--';
    const humidity = cur.relative_humidity_2m !== undefined ? Math.round(cur.relative_humidity_2m) : '--';
    const uv = data?.daily?.uv_index_max?.[0] || 'Low';

    // Moon phase approximation
    const getMoonPhase = () => "Waxing Crescent";

    const wmo = cur.weather_code || 0;
    const conditionStr = wmo === 0 ? "Clear Fluid Skies" : wmo < 40 ? "Partly Cloudy" : wmo < 70 ? "Liquid Fall" : wmo < 80 ? "Snow" : "Atmospheric Storm";
    const statusLabel = wmo < 40 ? "Stable" : "Active";

    return (
        <Card className="@container w-full h-full p-0 flex flex-col justify-between group overflow-hidden border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] bg-slate-950/90 backdrop-blur-2xl font-display relative">
            <Link href="/atmosphere" className="absolute top-2 right-2 p-1.5 rounded-full bg-white/10 hover:bg-white/30 text-white/70 hover:text-white transition-colors z-30 cursor-pointer shadow-lg backdrop-blur-md" title="Open Climate App">
                <span className="material-symbols-outlined text-[10px] @sm:text-[14px]">open_in_new</span>
            </Link>

            <div className="relative w-full h-full rounded-[1.5rem] @sm:rounded-[2rem] overflow-hidden flex flex-col items-center justify-center p-4 @md:p-6 text-slate-100">

                {/* Fluid Animated Background */}
                <motion.div
                    className="absolute inset-0 z-0 opacity-80"
                    style={{
                        background: 'linear-gradient(-45deg, #001F3F, #067ff9, #007FFF, #101a23)',
                        backgroundSize: '400% 400%'
                    }}
                    animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                    transition={{ duration: 15, ease: "linear", repeat: Infinity }}
                />

                {/* Subtle Map Underlay */}
                <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none mix-blend-overlay">
                    <img className="w-full h-full object-cover" alt="Texture map" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLN44IbgwOykG_zIkHLXtp7xCE-Uhmn-g6ZFYpMR2xYqvttPkaExRC9X0h1npnYgZvkjhzgcN-nOBk22Dn3wZTtzFE8tngj7vE_XBtlPnK3JoIY02DZZvGEag2pjHgN1k3QjIb4MemQaiGfcDOP9D821NvT_Xs95jWpyeUKA2Id9a8Y57epochRXBWr3lTNud9m7t1xRV1ObLC7ET7Ql6tRvB4KoVD60gF5tg60QTuA6eJbLq_BVOHovbg3Zt7CyVO-mMB8TRxMEg" />
                </div>

                {/* Main Hyper-Crystal Container */}
                <motion.div
                    className="absolute inset-2 @md:inset-4 flex flex-col items-center justify-center p-4 @md:p-6 z-10 overflow-hidden rounded-2xl"
                    style={{
                        backgroundColor: 'rgba(5, 10, 20, 0.4)',
                        backdropFilter: 'blur(30px)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        boxShadow: 'inset 0 0 20px rgba(6, 127, 249, 0.2), 0 25px 50px -12px rgba(0, 0, 0, 0.8)'
                    }}
                    animate={{ scale: [1, 1.01, 1] }}
                    transition={{ duration: 8, ease: "easeInOut", repeat: Infinity }}
                >
                    {/* Top Status */}
                    <div className="absolute top-4 @md:p-6 flex items-center gap-4 @md:p-6 px-4 @md:px-6 py-2 @md:py-4 rounded-full bg-black/60 border border-white/10 z-20 backdrop-blur-md">
                        <span className={`size-4 @md:size-5 rounded-full animate-pulse ${statusLabel === 'Stable' ? 'bg-[#32CD32]' : 'bg-[#FFBF00]'}`}></span>
                        <span className="text-xs @md:text-sm font-bold tracking-[0.2em] text-white/90 uppercase drop-shadow-md">Atmosphere: {statusLabel}</span>
                        {loading && <span className="ml-2 @md:ml-4 size-4 @md:size-5 border border-white/50 border-t-white rounded-full animate-spin"></span>}
                    </div>

                    {/* Left & Right floating pills */}
                    <div className="absolute inset-0 pointer-events-none z-20 p-2 @sm:p-4">
                        {/* Wind Pill */}
                        <motion.div className="absolute top-[10%] @sm:top-[15%] left-[2%] @sm:left-[5%] bg-white/[0.03] backdrop-blur-[12px] border border-white/[0.08] rounded-full px-2 @sm:px-4 py-1.5 @sm:py-2 flex items-center gap-1 @sm:gap-2 scale-75 @sm:scale-100 origin-top-left"
                            animate={{ y: [0, -5, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
                            <span className="material-symbols-outlined text-[#32CD32] text-[10px] @sm:text-sm">air</span>
                            <div className="flex flex-col">
                                <span className="text-[6px] @sm:text-[8px] font-bold text-white/40 leading-none mb-[2px] uppercase tracking-widest">Wind</span>
                                <span className="text-[8px] @sm:text-[10px] font-bold text-white leading-none">{windSpeed} km/h</span>
                            </div>
                        </motion.div>

                        {/* Humidity Pill */}
                        <motion.div className="absolute bottom-[10%] @sm:bottom-[20%] left-[2%] @sm:left-[8%] bg-white/[0.03] backdrop-blur-[12px] border border-white/[0.08] rounded-full px-2 @sm:px-4 py-1.5 @sm:py-2 flex items-center gap-1 @sm:gap-2 scale-75 @sm:scale-100 origin-bottom-left"
                            animate={{ y: [0, -3, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}>
                            <span className="material-symbols-outlined text-[#067ff9] text-[10px] @sm:text-sm">water_drop</span>
                            <div className="flex flex-col">
                                <span className="text-[6px] @sm:text-[8px] font-bold text-white/40 leading-none mb-[2px] uppercase tracking-widest">Humidity</span>
                                <span className="text-[8px] @sm:text-[10px] font-bold text-white leading-none">{humidity}%</span>
                            </div>
                        </motion.div>

                        {/* UV Pill */}
                        <motion.div className="absolute top-[18%] @sm:top-[25%] right-[2%] @sm:right-[5%] bg-white/[0.03] backdrop-blur-[12px] border border-white/[0.08] rounded-full px-2 @sm:px-4 py-1.5 @sm:py-2 flex items-center gap-1 @sm:gap-2 scale-75 @sm:scale-100 origin-top-right"
                            animate={{ y: [0, -6, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}>
                            <span className="material-symbols-outlined text-[#FFBF00] text-[10px] @sm:text-sm">light_mode</span>
                            <div className="flex flex-col">
                                <span className="text-[6px] @sm:text-[8px] font-bold text-white/40 leading-none mb-[2px] uppercase tracking-widest">UV Index</span>
                                <span className="text-[8px] @sm:text-[10px] font-bold text-white leading-none">{uv} Idx</span>
                            </div>
                        </motion.div>

                        {/* celestial Pill */}
                        <motion.div className="absolute bottom-[18%] @sm:bottom-[25%] right-[2%] @sm:right-[8%] bg-white/[0.03] backdrop-blur-[12px] border border-white/[0.08] rounded-full px-2 @sm:px-4 py-1.5 @sm:py-2 flex items-center gap-1 @sm:gap-2 scale-75 @sm:scale-100 origin-bottom-right"
                            animate={{ y: [0, -4, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}>
                            <span className="material-symbols-outlined text-slate-100 text-[10px] @sm:text-sm">brightness_3</span>
                            <div className="flex flex-col">
                                <span className="text-[6px] @sm:text-[8px] font-bold text-white/40 leading-none mb-[2px] uppercase tracking-widest">Celestial</span>
                                <span className="text-[8px] @sm:text-[10px] font-bold text-white leading-none">{getMoonPhase()}</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Central Focal Point */}
                    <div className="flex flex-col items-center gap-4 @md:p-6 text-center z-10 mt-2 @md:mt-4 pointer-events-auto">
                        <p className="text-white/80 text-sm @md:text-base font-medium tracking-[0.3em] uppercase truncate max-w-[80vw] drop-shadow-md">{location?.name || "Deep Void System"}</p>
                        <div className="relative -my-2 @md:-my-4 flex justify-center items-center">
                            <h2 className="text-white text-base font-light tracking-[0.1em] leading-none"
                                style={{ textShadow: '0 0 30px rgba(6, 127, 249, 0.8), 0 0 60px rgba(255, 255, 255, 0.4)' }}>
                                {temp}°
                            </h2>
                        </div>
                        <div className="flex flex-col items-center mt-2 @md:mt-4">
                            <p className="text-white text-sm @md:text-base font-medium tracking-widest uppercase drop-shadow-lg">{conditionStr}</p>
                            <div className="mt-2 @md:mt-4 flex gap-4 @md:p-6">
                                <Link href="/atmosphere" className="bg-[#067ff9] hover:bg-[#067ff9]/80 text-white font-bold py-2 @md:py-4 px-4 @md:px-6 rounded-full transition-all flex items-center gap-4 @md:p-6 text-xs @md:text-sm shadow-[0_4px_15px_rgba(6,127,249,0.5)]">
                                    Deep Scan <span className="material-symbols-outlined text-sm @md:text-base">arrow_forward</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                    {/* Refraction Glow Points */}
                    <div className="absolute top-0 left-1/4 w-24 @sm:w-32 h-1 bg-white/20 blur-xl"></div>
                    <div className="absolute bottom-0 right-1/3 w-32 @sm:w-48 h-1 bg-[#067ff9]/50 blur-xl"></div>
                </motion.div>
            </div>
        </Card>
    );
}
