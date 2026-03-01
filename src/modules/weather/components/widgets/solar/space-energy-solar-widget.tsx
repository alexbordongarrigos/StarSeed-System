'use client';

import React, { useState, useEffect } from 'react';
import { useWeatherLocation } from '@/modules/weather/context/weather-location-context';
import { fetchWeatherData } from '@/lib/weather-mock';
import { Card } from "@/components/ui/card";
import { Sun, Activity, Zap, ShieldAlert, Target } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function SpaceEnergySolarWidget() {
    const { location } = useWeatherLocation();
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            const wData = await fetchWeatherData(location.lat, location.lon);
            setData(wData);
            setLoading(false);
        };
        loadData();
    }, [location]);

    if (loading || !data?.energetic?.solar_activity) {
        return (
            <Card className="relative overflow-hidden w-full h-full bg-slate-950/80 backdrop-blur-3xl border-white/10 p-6 flex items-center justify-center min-h-[300px] shadow-[0_8px_32px_rgba(0,0,0,0.5)] rounded-3xl">
                <div className="flex flex-col items-center gap-4">
                    <motion.div
                        animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="w-16 h-16 rounded-full border-t-2 border-r-2 border-orange-500/50"
                    />
                    <p className="text-orange-500/70 font-mono text-sm tracking-widest uppercase animate-pulse">Scanning Corona...</p>
                </div>
            </Card>
        );
    }

    const { flare_class, cme_active, cme_speed_kms, sunspot_regions } = data.energetic.solar_activity;

    // Determine threat level color
    const getFlareColor = (fc: string) => {
        if (fc.startsWith('X')) return 'text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]';
        if (fc.startsWith('M')) return 'text-orange-500 drop-shadow-[0_0_15px_rgba(249,115,22,0.8)]';
        if (fc.startsWith('C')) return 'text-yellow-500 drop-shadow-[0_0_10px_rgba(234,179,8,0.5)]';
        return 'text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.4)]';
    };

    const cmeColor = cme_active ? 'text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]' : 'text-emerald-400/70';

    return (
        <Card className="@container relative overflow-hidden w-full h-full bg-slate-950/80 backdrop-blur-3xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] rounded-3xl border-white/10 p-4 @md:p-6 min-h-[250px] @sm:min-h-[350px] group flex flex-col justify-between">
            {/* Background Solar Flare Effects */}
            <div className="absolute inset-0 z-0 overflow-hidden opacity-30 pointer-events-none">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-32 -right-32 w-64 h-64 @md:w-96 @md:h-96 bg-orange-600/20 rounded-full blur-[80px] @md:blur-[100px]"
                />
                {cme_active && (
                    <motion.div
                        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.8, 0.3] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-0 right-0 w-full h-full bg-red-600/10 rounded-full blur-[80px] @md:blur-[120px]"
                    />
                )}
            </div>

            <div className="relative z-10 flex flex-col @sm:flex-row justify-between items-start gap-2 @sm:gap-0">
                <div>
                    <h3 className="text-white/80 font-medium tracking-wide flex items-center gap-2 @md:gap-3 text-sm @md:text-base">
                        <Sun className="w-5 h-5 @md:w-6 @md:h-6 text-orange-400" />
                        Solar Activity
                    </h3>
                    <p className="hidden @xs:block text-[10px] @md:text-xs text-white/40 mt-1 uppercase tracking-wider font-mono">Real-time Heliosphere</p>
                </div>
                <div className={`px-3 py-1 @md:px-4 @md:py-2 rounded-xl border border-white/10 backdrop-blur-md flex items-center gap-2 ${cme_active ? 'bg-red-500/20 border-red-500/50' : 'bg-white/5'}`}>
                    {cme_active ? <ShieldAlert className="w-3 h-3 @md:w-4 @md:h-4 text-red-400" /> : <Activity className="w-4 h-4 @md:w-5 @md:h-5 text-emerald-400" />}
                    <span className={`text-[10px] @md:text-xs font-mono font-bold uppercase tracking-wider ${cmeColor}`}>
                        {cme_active ? 'CME DETECTED' : 'QUIET'}
                    </span>
                </div>
            </div>

            {/* Main Visual Data Hub */}
            <div className="relative z-10 flex-1 flex flex-col items-center justify-center my-4 @md:my-8 pointer-events-none">
                <div className="relative flex items-center justify-center">
                    {/* Glowing Sun Representation */}
                    <motion.div
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="relative w-28 h-28 @md:w-40 @md:h-40 rounded-full bg-gradient-to-br from-yellow-300 via-orange-500 to-red-600 shadow-[0_0_40px_rgba(249,115,22,0.4)] @md:shadow-[0_0_60px_rgba(249,115,22,0.4)] flex items-center justify-center"
                    >
                        {/* Sunspots */}
                        <div className="absolute top-6 left-6 @md:top-8 @md:left-8 w-1.5 h-1.5 @md:w-2 @md:h-2 bg-black/60 rounded-full blur-[1px]" />
                        <div className="absolute bottom-8 right-10 @md:bottom-10 @md:right-12 w-2 h-2 @md:w-3 @md:h-3 bg-black/50 rounded-full blur-[1px]" />

                        <div className="text-center z-10 bg-black/60 backdrop-blur-sm px-3 py-1.5 @md:px-4 @md:py-2 rounded-xl border border-white/10 pointer-events-auto">
                            <div className={`text-2xl @md:text-4xl font-black font-mono tracking-tighter ${getFlareColor(flare_class)}`}>
                                {flare_class}
                            </div>
                            <div className="text-[8px] @md:text-[10px] text-white/80 uppercase tracking-widest mt-0.5 @md:mt-1">Class</div>
                        </div>
                    </motion.div>

                    {/* Orbiting Elements */}
                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute w-[180px] h-[180px] @md:w-[240px] @md:h-[240px] border border-white/5 rounded-full"
                    >
                        <div className="absolute -top-1 left-1/2 w-1.5 h-1.5 @md:w-2 @md:h-2 bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,1)] rounded-full" />
                    </motion.div>
                </div>
            </div>

            {/* Bottom Metrics Bar */}
            <div className="relative z-10 grid grid-cols-2 @lg:grid-cols-3 gap-2 @sm:gap-4 mt-auto">
                <div className="hidden @lg:flex bg-black/40 backdrop-blur-md rounded-2xl p-3 @md:p-4 border border-white/5 flex-col items-center justify-center group-hover:bg-white/5 transition-colors">
                    <Zap className="w-4 h-4 @md:w-5 @md:h-5 text-orange-400 mb-1 @md:mb-2" />
                    <span className="text-lg @md:text-2xl font-mono text-white/90 font-light">{data.energetic.solar_wind.speed || '--'}</span>
                    <span className="text-[8px] @md:text-[10px] text-white/50 uppercase tracking-widest mt-1">Wind (km/s)</span>
                </div>
                <div className="bg-black/40 backdrop-blur-md rounded-2xl p-3 @md:p-4 border border-white/5 flex flex-col items-center justify-center group-hover:bg-white/5 transition-colors">
                    <Target className="w-4 h-4 @md:w-5 @md:h-5 text-purple-400 mb-1 @md:mb-2" />
                    <span className="text-lg @md:text-2xl font-mono text-white/90 font-light">{sunspot_regions}</span>
                    <span className="text-[8px] @md:text-[10px] text-white/50 uppercase tracking-widest mt-1">Sunspots</span>
                </div>
                <div className="bg-black/40 backdrop-blur-md rounded-2xl p-3 @md:p-4 border border-white/5 flex flex-col items-center justify-center group-hover:bg-white/5 transition-colors">
                    <Activity className="w-4 h-4 @md:w-5 @md:h-5 text-rose-400 mb-1 @md:mb-2" />
                    <span className="text-lg @md:text-2xl font-mono text-white/90 font-light">{cme_speed_kms || '--'}</span>
                    <span className="text-[8px] @md:text-[10px] text-white/50 uppercase tracking-widest mt-1">CME (km/s)</span>
                </div>
            </div>
        </Card>
    );
}
