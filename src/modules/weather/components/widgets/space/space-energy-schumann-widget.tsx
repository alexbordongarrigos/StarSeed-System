'use client';

import React, { useState, useEffect } from 'react';
import { useWeatherLocation } from '@/modules/weather/context/weather-location-context';
import { fetchWeatherData } from '@/lib/weather-mock';
import { Card } from "@/components/ui/card";
import { Waves, Activity, RadioTower, Database } from "lucide-react";
import { motion } from "framer-motion";

export function SpaceEnergySchumannWidget() {
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



    if (loading || !data?.energetic?.schumann) {
        return (
            <Card
                crystalTheme="schumann"
                crystalIntensity={0.3}
                className="relative overflow-hidden w-full h-full border-white/10 p-[clamp(0.75rem,2vw,1.5rem)] flex items-center justify-center min-h-[clamp(14rem,22vw,20rem)] shadow-[0_8px_32px_rgba(0,0,0,0.5)] rounded-[clamp(1.25rem,3vw,2rem)]"
            >
                <div className="flex flex-col items-center gap-4">
                    <motion.div
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="w-24 h-24 @md:w-32 @md:h-32 rounded-full border border-teal-500/50 flex items-center justify-center"
                    >
                        <Waves className="w-12 h-12 @md:w-16 @md:h-16 text-teal-400" />
                    </motion.div>
                    <p className="text-teal-500/70 font-mono text-xs @md:text-sm tracking-widest uppercase mt-4">Calibrating Resonators...</p>
                </div>
            </Card>
        );
    }

    const { current, history } = data.energetic.schumann;

    // Determine status color based on fluctuation
    const isElevated = current.status === 'elevated' || current.amplitude > 30;
    const statusColor = isElevated ? 'text-teal-400 drop-shadow-[0_0_8px_rgba(45,212,191,0.8)]' : 'text-blue-400/80';
    const chartGradient = isElevated ? 'from-teal-500/40 to-emerald-500/5' : 'from-blue-500/30 to-indigo-500/5';

    // Find min/max for chart scaling
    const maxAmplitude = Math.max(...history.map((h: any) => h.amplitude), 50);
    const minAmplitude = Math.min(...history.map((h: any) => h.amplitude), 0);

    return (
        <Card
            crystalTheme="schumann"
            crystalIntensity={isElevated ? 0.8 : 0.4}
            className="@container relative overflow-hidden w-full h-full border-white/10 shadow-2xl drop-shadow-[0_8px_32px_rgba(0,0,0,0.8)] rounded-[clamp(1.25rem,3vw,2rem)] p-[clamp(0.75rem,2vw,1.5rem)] min-h-[clamp(14rem,22vw,20rem)] group flex flex-col justify-between"
        >
            {/* Background Spectrogram Scanline Effects */}
            <div className="absolute inset-0 z-0 overflow-hidden opacity-30 pointer-events-none rounded-3xl mix-blend-overlay">
                <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.2)_50%)] bg-[length:100%_4px] z-10" />
                <motion.div
                    animate={{ y: ['0%', '100%'] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute top-0 left-0 w-full h-[2px] bg-teal-500/50 blur-[1px] shadow-[0_0_15px_rgba(45,212,191,0.8)] z-10"
                />
            </div>

            {/* Header */}
            <div className="relative z-10 flex flex-col justify-between items-start mb-4 gap-2 @sm:gap-0" style={{ transform: 'translateZ(40px)' }}>
                <div>
                    <h3 className="text-white font-medium tracking-wide flex items-center gap-2 @md:gap-3 text-sm @md:text-base drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                        <RadioTower className="w-5 h-5 @md:w-6 @md:h-6 text-teal-400 drop-shadow-[0_0_8px_rgba(45,212,191,0.5)]" />
                        Schumann Resonance
                    </h3>
                    <p className="hidden @xs:block text-[10px] @md:text-xs text-white/70 mt-1 uppercase tracking-wider font-mono drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">Global Electromagnetic Frequency</p>
                </div>
                <div className="mt-2 @sm:mt-0 px-3 py-1 @md:px-4 @md:py-2 rounded-xl border border-white/20 backdrop-blur-md bg-white/10 flex items-center gap-2 shadow-lg drop-shadow-lg">
                    <Activity className={`w-4 h-4 @md:w-5 @md:h-5 ${statusColor}`} />
                    <span className={`text-[10px] @md:text-xs uppercase font-mono font-bold tracking-wider ${statusColor} drop-shadow-md`}>
                        {current.status}
                    </span>
                </div>
            </div>

            {/* Current Metrics Display */}
            <div className="relative z-10 grid grid-cols-2 gap-4 mb-4" style={{ transform: 'translateZ(60px)' }}>
                <div className="flex flex-col">
                    <span className="text-[10px] @md:text-xs text-white/60 uppercase tracking-widest font-mono mb-1 @md:mb-2 drop-shadow-md">Base Freq</span>
                    <div className="flex items-baseline gap-1 @md:gap-2">
                        <span className="text-4xl @sm:text-5xl @md:text-6xl font-bold font-mono tracking-tighter text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] leading-none">
                            {current.base_frequency}
                        </span>
                        <span className="text-xs @md:text-sm font-mono text-teal-400 drop-shadow-md">Hz</span>
                    </div>
                </div>
                <div className="flex flex-col items-end">
                    <span className="text-[10px] @md:text-xs text-white/60 uppercase tracking-widest font-mono mb-1 @md:mb-2 drop-shadow-md">Amplitude</span>
                    <div className="flex items-baseline gap-1 @md:gap-2">
                        <span className={`text-3xl @sm:text-4xl @md:text-5xl font-light font-mono tracking-tight leading-none ${statusColor} drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]`}>
                            {Math.round(current.amplitude)}
                        </span>
                        <span className="text-[10px] @md:text-xs font-mono text-white/60 drop-shadow-md">pT</span>
                    </div>
                </div>
            </div>

            {/* Dynamic 24h Spectrogram Chart */}
            <div className="relative z-10 flex-1 mt-auto w-full min-h-[100px] @md:min-h-[150px] rounded-2xl border border-white/10 bg-black/20 backdrop-blur-md overflow-hidden flex items-end px-3 @sm:px-4 @md:px-6 pb-2 @md:pb-4 pt-4 shadow-inner">
                {/* Y-Axis Labels (Simulated) */}
                <div className="hidden @sm:flex absolute left-2 @md:left-4 top-2 @md:top-4 bottom-2 @md:bottom-4 flex-col justify-between text-[10px] @md:text-xs font-mono text-white/50 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
                    <span>{Math.round(maxAmplitude)}</span>
                    <span>{Math.round(maxAmplitude / 2)}</span>
                    <span>0</span>
                </div>

                {/* Vertical Grid Lines */}
                <div className="absolute inset-0 flex justify-between px-6 @sm:px-12 pointer-events-none">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="w-px h-full bg-white/10" />
                    ))}
                </div>

                <div className="relative w-full h-full flex items-end justify-between gap-[1px] pl-4 @sm:pl-10 z-10">
                    {history.slice(-18).map((point: any, i: number) => {
                        // Normalize height percentage
                        const heightPct = Math.max(10, ((point.amplitude - minAmplitude) / (maxAmplitude - minAmplitude)) * 100);

                        // Color coding based on frequency shift from 7.83
                        const shift = Math.abs(point.freq - 7.83);
                        let barColor = "bg-blue-500/60";
                        if (shift > 0.1) barColor = "bg-teal-400/80 shadow-[0_0_8px_rgba(45,212,191,0.5)]";
                        if (shift > 0.2) barColor = "bg-emerald-400/100 shadow-[0_0_12px_rgba(52,211,153,0.7)]";

                        return (
                            <div key={i} className="relative w-full flex flex-col justify-end items-center group/bar h-full">
                                {/* Tooltip */}
                                <div className="absolute -top-6 bg-black/90 border border-white/20 px-2 py-1 rounded text-[9px] font-mono text-white opacity-0 group-hover/bar:opacity-100 transition-opacity z-20 whitespace-nowrap pointer-events-none drop-shadow-xl">
                                    {point.freq}Hz | {Math.round(point.amplitude)}pT
                                </div>

                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: `${heightPct}%` }}
                                    transition={{ duration: 1, delay: i * 0.05, type: "spring" }}
                                    className={`w-full rounded-t-sm ${barColor} group-hover/bar:brightness-150 transition-all border-t border-white/30`}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Footer Meta */}
            <div className="hidden @sm:flex relative z-10 justify-between items-center mt-3 @md:mt-4 border-t border-white/20 pt-2 @md:pt-4" style={{ transform: 'translateZ(20px)' }}>
                <span className="text-[10px] @md:text-xs font-mono text-white/50 tracking-widest flex items-center gap-2 drop-shadow-md">
                    <Database className="w-3 h-3 @md:w-4 @md:h-4" />
                    LIVE TELEMETRY
                </span>
                <span className="text-[10px] @md:text-xs font-mono text-teal-400/80 drop-shadow-md">
                    Δ {current.fluctuation > 0 ? '+' : ''}{current.fluctuation}Hz SHIFT
                </span>
            </div>
        </Card>
    );
}
