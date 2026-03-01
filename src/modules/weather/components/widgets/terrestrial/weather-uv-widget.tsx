'use client';

import React, { useState, useEffect } from 'react';
import { useWeatherLocation } from '@/modules/weather/context/weather-location-context';
import { fetchWeatherData } from '@/lib/weather-mock';
import { Card } from "@/components/ui/card";
import { Sparkles, SunDim, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function WeatherUvWidget() {
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

    // daily.uv_index_max array starts 3 days ago, so "today" is index 3
    const uvIndex = data?.daily?.uv_index_max?.[3] || 0;

    return (
        <Card className="w-full h-full relative overflow-hidden bg-card/60 backdrop-blur-md border-white/10 p-5 group flex flex-col justify-between">
            {/* Ambient animated gradient background */}
            <div className="absolute -inset-10 opacity-30 pointer-events-none">
                <motion.div
                    className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-400/40 via-purple-500/10 to-transparent"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>

            <div className="flex items-center justify-between z-10">
                <div className="flex items-center gap-2">
                    <div className="p-2 rounded-full bg-white/5 border border-white/10">
                        <SunDim className="w-5 h-5 text-yellow-400" />
                    </div>
                    <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Radiación UV</span>
                </div>
                {loading && <div className="w-4 h-4 border-2 border-primary/50 border-t-primary rounded-full animate-spin" />}
            </div>

            <div className="flex flex-col z-10 mt-4 h-full justify-center">
                <div className="flex flex-col items-center justify-center relative py-4">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={loading ? 'loading' : 'loaded'}
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            className="text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)] z-10"
                        >
                            <span className="text-6xl font-bold font-display tracking-tighter">
                                {loading ? '--' : uvIndex}
                            </span>
                        </motion.div>
                    </AnimatePresence>

                    {/* Gauge representation */}
                    <div className="w-full max-w-[120px] h-2 bg-white/10 rounded-full mt-4 overflow-hidden relative">
                        <motion.div
                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-500"
                            initial={{ width: 0 }}
                            animate={{ width: `${(uvIndex / 11) * 100}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                        />
                    </div>
                    <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mt-2 flex items-center gap-1">
                        {!loading && uvIndex > 7 ? 'Muy Alto' : uvIndex > 5 ? 'Alto' : 'Moderado'}
                    </div>
                </div>
            </div>
            {/* Simple liquid animation line at bottom */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-white/5 overflow-hidden">
                <motion.div
                    className="h-full bg-yellow-400 opacity-50"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%", x: ["-100%", "0%"] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                />
            </div>
        </Card>
    );
}
