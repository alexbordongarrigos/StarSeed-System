'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useWeatherLocation } from '@/modules/weather/context/weather-location-context';
import { fetchWeatherData } from '@/lib/weather-mock';
import { Card } from "@/components/ui/card";
import Link from 'next/link';

export function WeatherBasicCrystallineWidget() {
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
                console.error("Error fetching weather data:", err);
                setLoading(false);
            });
    }, [location.lat, location.lon]);

    const cur = data?.terrestrial?.current || {};
    const temp = cur.temperature_2m || 0;
    const windSpeed = cur.wind_speed_10m || 0;
    const humidity = cur.relative_humidity_2m || 0;
    const uv = data?.terrestrial?.daily?.uv_index_max?.[3] || 0;
    const moonPhaseStr = data?.astronomical?.moon_phase > 0.5 ? 'WANING' : 'WAXING';

    // Holographic Flicker Animation
    const hologramFlicker: Variants = {
        initial: { opacity: 0, scaleY: 0.005, filter: 'brightness(2) contrast(2)' },
        animate: {
            opacity: [0, 1, 0.8, 1],
            scaleY: 1,
            filter: 'brightness(1) contrast(1)',
            transition: { duration: 0.4, times: [0, 0.2, 0.3, 1], ease: "easeOut" }
        }
    };

    const lineScan: Variants = {
        animate: {
            y: ["-100%", "300%"],
            transition: { duration: 3, repeat: Infinity, ease: "linear" }
        }
    };

    return (
        <Card className="@container w-full h-full p-0 flex flex-col justify-between group overflow-hidden border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] bg-slate-950/90 backdrop-blur-2xl">
            <Link href="/atmosphere" className="absolute top-2 right-2 p-1.5 rounded-full bg-white/5 hover:bg-white/20 text-[#007FFF]/50 hover:text-[#007FFF] transition-colors z-30 cursor-pointer shadow-lg backdrop-blur-md" title="Open Climate App">
                <span className="material-symbols-outlined text-[10px] @sm:text-[14px]">open_in_new</span>
            </Link>

            <div className="flex items-center justify-center w-full h-full bg-transparent font-['JetBrains_Mono'] overflow-hidden relative rounded-[1.5rem]">
                {/* Background Subtle Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] @md:bg-[size:32px_32px]" />

                <AnimatePresence>
                    {!loading && (
                        <motion.div
                            variants={hologramFlicker}
                            initial="initial"
                            animate="animate"
                            className="relative w-full h-full flex flex-col justify-between bg-black/60 border border-white/20 p-4 @md:p-6 overflow-hidden shadow-[inset_0_0_50px_rgba(0,127,255,0.1)] rounded-2xl"
                        >
                            {/* Chromatic Aberration / Rainbow Edges */}
                            <div className="absolute inset-0 border-t-2 border-t-[#007FFF]/40 border-b-2 border-b-[#FFbf00]/40 mix-blend-screen pointer-events-none rounded-[1.5rem]" />
                            <div className="absolute inset-0 border-l-2 border-l-[#39FF14]/40 border-r-2 border-r-[#007FFF]/40 mix-blend-screen pointer-events-none rounded-[1.5rem]" />

                            {/* Scanline Effect */}
                            <motion.div
                                variants={lineScan}
                                animate="animate"
                                className="absolute inset-0 w-full h-10 @sm:h-20 bg-gradient-to-b from-transparent via-[#007FFF]/10 to-transparent z-0 pointer-events-none"
                            />

                            {/* HUD Layout Elements */}
                            <div className="relative z-10 flex flex-col h-full justify-between">

                                {/* Top Header Row */}
                                <div className="flex justify-between items-start border-b border-white/10 pb-2 @md:pb-4">
                                    <div className="flex flex-col">
                                        <span className="text-xs @md:text-sm text-[#007FFF] tracking-[0.2em] font-light">STRATOSPHERE_READOUT</span>
                                        <span className="text-xs @md:text-sm text-white/40 mt-2 @md:mt-4 uppercase tracking-widest">{location.name.split(',')[0]}</span>
                                    </div>
                                    <div className="text-right flex flex-col items-end">
                                        <span className="text-xs @md:text-sm text-[#39FF14] animate-pulse">● SYS_STABLE</span>
                                        <div className="flex gap-4 @md:p-6 mt-2 @md:mt-4">
                                            {[1, 2, 3, 4, 5].map(i => <div key={i} className={`  ${i < 4 ? 'bg-[#39FF14]' : 'bg-white/10'}`} />)}
                                        </div>
                                    </div>
                                </div>

                                {/* Central Temperature Data Block */}
                                <div className="flex items-center justify-between py-2 @md:py-4 flex-1">
                                    <div className="relative flex-1">
                                        <motion.span
                                            animate={{ opacity: [1, 0.8, 1] }}
                                            transition={{ duration: 0.1, repeat: Infinity, repeatDelay: 5 }}
                                            className="text-base @sm:text-base leading-none font-extralight text-[#F8F9FA] flex items-start truncate overflow-visible"
                                        >
                                            {temp}<span className="text-sm @md:text-base text-[#007FFF] ml-1 mt-2 @md:mt-4">°C</span>
                                        </motion.span>
                                        <div className="absolute -bottom-4 left-0 w-3/4 h-[1px] bg-gradient-to-r from-[#007FFF] via-white to-transparent" />
                                    </div>

                                    {/* Geometric Moon Graphic */}
                                    <div className=" h-24 @md:h-32 border border-white/20 rounded-full flex items-center justify-center relative overflow-hidden group ml-2 @md:ml-4 shrink-0">
                                        <div className="absolute inset-0 bg-gradient-to-br from-[#FFbf00]/20 to-transparent" />
                                        <div className="  rounded-full border border-dashed border-[#FFbf00]/40 animate-[spin_10s_linear_infinite]" />
                                        <span className="absolute text-xs @md:text-sm text-[#FFbf00] tracking-widest bottom-4 font-bold hidden @sm:block">{moonPhaseStr}</span>
                                    </div>
                                </div>

                                {/* Bottom Metric Brackets */}
                                <div className="grid grid-cols-1 @sm:grid-cols-3 gap-2 pt-2 @sm:pt-4 border-t border-white/10">
                                    <MetricBracket label="AIR_VEL" value={`${Math.round(windSpeed)}`} unit="KH" color="#39FF14" />
                                    <MetricBracket label="MOIST_LVL" value={`${Math.round(humidity)}`} unit="PCT" color="#007FFF" />
                                    <MetricBracket label="PHOTON_UV" value={`${uv}`} unit="IDX" color="#FFbf00" />
                                </div>
                            </div>

                            {/* Refractive Corner Accents */}
                            <div className="absolute top-0 left-0 w-3 @sm:w-4 h-3 @sm:h-4 border-t-2 border-l-2 border-[#39FF14] rounded-tl-[1.5rem]" />
                            <div className="absolute top-0 right-0 w-3 @sm:w-4 h-3 @sm:h-4 border-t-2 border-r-2 border-[#007FFF] rounded-tr-[1.5rem]" />
                            <div className="absolute bottom-0 left-0 w-3 @sm:w-4 h-3 @sm:h-4 border-b-2 border-l-2 border-[#FFbf00] rounded-bl-[1.5rem]" />
                            <div className="absolute bottom-0 right-0 w-3 @sm:w-4 h-3 @sm:h-4 border-b-2 border-r-2 border-white/40 rounded-br-[1.5rem]" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </Card>
    );
};

const MetricBracket = ({ label, value, unit, color }: { label: string, value: string, unit: string, color: string }) => (
    <div className="flex flex-row @sm:flex-col justify-between @sm:justify-start group cursor-crosshair items-center @sm:items-start w-full">
        <span className="text-xs @md:text-sm mb-0 @sm:mb-2 @md:mb-4 opacity-50 tracking-widest uppercase" style={{ color }}>{label}</span>
        <div className="flex items-center text-xs @md:text-sm tracking-widest text-[#F8F9FA]">
            <span className="opacity-40 mr-1 hidden @sm:inline">[</span>
            <span className="font-mono font-bold">{value} <span className="text-xs @md:text-sm opacity-70 font-normal">{unit}</span></span>
            <span className="opacity-40 ml-1 hidden @sm:inline">]</span>
        </div>
        <motion.div
            initial={{ width: 0 }}
            whileHover={{ width: '100%' }}
            className="h-[1px] bg-current mt-1 opacity-40 transition-all w-0 group-hover:w-full hidden @sm:block"
            style={{ color }}
        />
    </div>
);
