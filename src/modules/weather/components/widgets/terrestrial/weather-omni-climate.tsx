import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useWeatherLocation } from '@/modules/weather/context/weather-location-context';
import { fetchWeatherData } from '@/lib/weather-mock';

export function WeatherOmniClimateWidget() {
    const { location } = useWeatherLocation();
    const [weatherData, setWeatherData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const fetchWeather = async () => {
            if (!location || !location.lat || !location.lon) return;
            setLoading(true);
            try {
                const data = await fetchWeatherData(location.lat, location.lon);
                setWeatherData(data);
            } catch (error) {
                console.error("Failed to fetch holistic weather data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchWeather();
    }, [location]);

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 60000);
        return () => clearInterval(timer);
    }, []);

    if (loading || !weatherData) {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center bg-[#0d1117] text-slate-400 p-8 rounded-2xl border border-white/5 font-display min-h-[400px]">
                <div className="w-12 h-12 border-2 border-[#06f9c8] border-t-transparent rounded-full animate-spin mb-4" />
                <p className="text-[10px] uppercase tracking-widest animate-pulse">Establishing atmospheric link...</p>
            </div>
        );
    }

    const temp = Math.round(weatherData.current?.temperature_2m || 0);
    const windSpeed = weatherData.current?.wind_speed_10m || 0;
    const humidity = weatherData.current?.relative_humidity_2m || 0;

    const cloudCover = weatherData.current?.cloud_cover || 0;
    const wmoCode = weatherData.current?.weather_code ?? weatherData.current?.weathercode;

    let condition = "Clear";
    let conditionLabel = "Stable / Clear";
    if (wmoCode !== undefined) {
        if ([1, 2, 3, 45, 48].includes(wmoCode)) { condition = "Cloudy"; conditionLabel = "Stable / Cloudy"; }
        else if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(wmoCode)) { condition = "Rain"; conditionLabel = "Precipitation / Rain"; }
        else if ([71, 73, 75, 77, 85, 86].includes(wmoCode)) { condition = "Snow"; conditionLabel = "Precipitation / Snow"; }
        else if ([95, 96, 99].includes(wmoCode)) { condition = "Thunderstorm"; conditionLabel = "Volatile / Storm"; }
        else if (wmoCode === 0) { condition = "Clear"; conditionLabel = "Stable / Clear"; }
    } else {
        condition = cloudCover > 50 ? "Cloudy" : "Clear";
        conditionLabel = condition === "Cloudy" ? "Stable / Cloudy" : "Stable / Clear";
    }

    const aqi = weatherData.air_quality?.us_aqi || 24;

    return (
        <motion.div
            layout="position"
            className="@container/widget relative w-full h-full flex flex-col gap-3 bg-[#0d1117] text-slate-100 font-display overflow-hidden rounded-2xl p-4 transition-all duration-500 ease-out z-10"
        >
            {/* Background Base */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0d1117] to-slate-900 z-0"></div>

            {/* Header: Location - Always Visible */}
            <motion.header layout="position" className="flex items-center justify-between z-10 shrink-0">
                <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-[#06f9c8]/60 font-bold hidden @[200px]/widget:block">Location Sync</span>
                    <h1 className="text-sm @[250px]/widget:text-lg font-bold tracking-tighter text-white uppercase italic truncate max-w-[120px] @[250px]/widget:max-w-[200px]">{location.name}</h1>
                </div>
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#06f9c8] text-xs @[250px]/widget:text-sm">sensors</span>
                    <span className="material-symbols-outlined text-slate-400 text-sm hidden @[200px]/widget:block">more_vert</span>
                </div>
            </motion.header>

            {/* Main Content Area: Responsive flex direction based on container width */}
            <div className="flex flex-col @[300px]/widget:flex-row gap-4 flex-1 z-10 min-h-0">

                {/* Hero Section: Icon & Temp */}
                <motion.section
                    layout="position"
                    className="flex-1 bg-white/[0.03] backdrop-blur-[24px] border border-[#06f9c8]/10 hover:bg-white/[0.06] hover:border-[#06f9c8]/30 transition-all duration-300 rounded-xl relative overflow-hidden flex flex-row @[300px]/widget:flex-col items-center justify-center p-4 min-h-[120px]"
                >
                    {/* Decorative Scanline Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#06f9c8]/5 via-transparent to-transparent pointer-events-none"></div>

                    {/* Animated Graphic based on condition */}
                    <motion.div layout="position" className="relative w-20 h-20 @[250px]/widget:w-24 @[250px]/widget:h-24 @[300px]/widget:w-28 @[300px]/widget:h-28 flex items-center justify-center mr-4 @[300px]/widget:mr-0 @[300px]/widget:mb-2 shrink-0">
                        {condition === "Clear" && (
                            <>
                                <div className="absolute inset-0 animate-[spin_20s_linear_infinite] opacity-40">
                                    <svg className="w-full h-full text-[#06f9c8]" viewBox="0 0 100 100">
                                        <defs>
                                            <linearGradient id="ray-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                                                <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
                                                <stop offset="50%" stopColor="currentColor" stopOpacity="1" />
                                                <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                                            </linearGradient>
                                        </defs>
                                        <g transform="translate(50,50)">
                                            <rect x="-1" y="-50" width="2" height="100" fill="url(#ray-grad)" />
                                            <rect x="-1" y="-50" width="2" height="100" fill="url(#ray-grad)" transform="rotate(45)" />
                                            <rect x="-1" y="-50" width="2" height="100" fill="url(#ray-grad)" transform="rotate(90)" />
                                            <rect x="-1" y="-50" width="2" height="100" fill="url(#ray-grad)" transform="rotate(135)" />
                                        </g>
                                    </svg>
                                </div>
                                <div className="w-12 h-12 @[250px]/widget:w-16 @[250px]/widget:h-16 @[300px]/widget:w-20 @[300px]/widget:h-20 rounded-full bg-gradient-to-tr from-[#06f9c8] to-emerald-400 relative z-10" style={{ filter: 'drop-shadow(0 0 15px rgba(6, 249, 200, 0.6))', boxShadow: '0 0 30px rgba(6,249,200,0.4)' }}></div>
                            </>
                        )}
                        {condition === "Cloudy" && (
                            <div className="w-full h-full flex flex-col items-center justify-center relative">
                                <motion.div
                                    animate={{ x: [-5, 5, -5], y: [-2, 2, -2] }}
                                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                                    className="w-12 h-6 @[250px]/widget:w-20 @[250px]/widget:h-10 bg-slate-300 rounded-full blur-md opacity-80 z-10"
                                    style={{ boxShadow: 'inset -5px -5px 10px rgba(0,0,0,0.5), 0 0 15px rgba(255,255,255,0.2)' }}
                                />
                                <motion.div
                                    animate={{ x: [3, -10, 3], y: [1, -4, 1] }}
                                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                    className="absolute w-8 h-6 @[250px]/widget:w-16 @[250px]/widget:h-12 bg-slate-400 rounded-full blur-lg opacity-60 top-2 right-2 @[250px]/widget:top-4 @[250px]/widget:right-4 z-0"
                                />
                            </div>
                        )}
                        {condition === "Rain" && (
                            <div className="w-full h-full flex flex-col items-center justify-center relative scale-75 @[250px]/widget:scale-100">
                                <motion.div
                                    animate={{ x: [-5, 5, -5], y: [-2, 2, -2] }}
                                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                    className="w-20 h-10 bg-slate-500 rounded-full blur-md opacity-90 z-20"
                                    style={{ boxShadow: 'inset -10px -10px 20px rgba(0,0,0,0.6), 0 0 30px rgba(255,255,255,0.1)' }}
                                />
                                <div className="absolute inset-x-0 bottom-0 top-12 overflow-hidden flex justify-center gap-2 z-10">
                                    {[...Array(5)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ y: -20, opacity: 0 }}
                                            animate={{ y: 80, opacity: [0, 1, 0] }}
                                            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2, ease: "linear" }}
                                            className="w-[2px] h-6 bg-blue-400/80 rounded-full blur-[1px]"
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                        {condition === "Snow" && (
                            <div className="w-full h-full flex flex-col items-center justify-center relative scale-75 @[250px]/widget:scale-100">
                                <motion.div
                                    animate={{ x: [-8, 8, -8], y: [-3, 3, -3] }}
                                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                                    className="w-20 h-10 bg-slate-200 rounded-full blur-md opacity-80 z-20"
                                    style={{ boxShadow: 'inset -10px -10px 20px rgba(0,0,0,0.2), 0 0 30px rgba(255,255,255,0.4)' }}
                                />
                                <div className="absolute inset-x-0 bottom-0 top-12 overflow-hidden flex justify-center gap-3 z-10">
                                    {[...Array(6)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ y: -10, x: 0, opacity: 0, rotate: 0 }}
                                            animate={{ y: 80, x: Math.sin(i) * 15, opacity: [0, 1, 0], rotate: 360 }}
                                            transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4, ease: "linear" }}
                                            className="w-2 h-2 bg-white rounded-full blur-[1px]"
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                        {condition === "Thunderstorm" && (
                            <div className="w-full h-full flex flex-col items-center justify-center relative scale-75 @[250px]/widget:scale-100">
                                <motion.div
                                    animate={{ x: [-5, 5, -5], y: [-2, 2, -2] }}
                                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                    className="w-20 h-10 bg-slate-700 rounded-full blur-md opacity-90 z-20"
                                    style={{ boxShadow: 'inset -10px -10px 20px rgba(0,0,0,0.8), 0 0 30px rgba(255,255,255,0.1)' }}
                                />
                                <motion.div
                                    animate={{ opacity: [0, 0, 1, 0, 0, 0.5, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, times: [0, 0.8, 0.82, 0.84, 0.9, 0.92, 1] }}
                                    className="absolute inset-0 bg-yellow-200 blur-2xl z-0 rounded-full mix-blend-overlay"
                                />
                                <motion.svg
                                    animate={{ opacity: [0, 0, 1, 0, 0, 1, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, times: [0, 0.8, 0.82, 0.84, 0.9, 0.92, 1] }}
                                    className="absolute w-8 h-12 text-yellow-300 z-30 top-12"
                                    fill="currentColor" viewBox="0 0 24 24"
                                >
                                    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" />
                                </motion.svg>
                                <div className="absolute inset-x-0 bottom-0 top-12 overflow-hidden flex justify-center gap-2 z-10">
                                    {[...Array(5)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ y: -20, opacity: 0 }}
                                            animate={{ y: 80, opacity: [0, 1, 0] }}
                                            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15, ease: "linear" }}
                                            className="w-[2px] h-8 bg-blue-300/80 rounded-full blur-[1px]"
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </motion.div>

                    {/* Temperature */}
                    <div className="flex flex-col items-start @[300px]/widget:items-center justify-center z-20 flex-1">
                        <div className="flex items-start">
                            <motion.span layout="position" className="text-5xl @[250px]/widget:text-6xl @[300px]/widget:text-7xl font-bold tracking-tighter text-white leading-none">{temp}</motion.span>
                            <motion.span layout="position" className="text-2xl @[250px]/widget:text-2xl @[300px]/widget:text-3xl font-light text-[#06f9c8] mt-0 @[250px]/widget:mt-1">°</motion.span>
                        </div>
                        <motion.p layout="position" className="text-[9px] @[250px]/widget:text-xs tracking-[0.2em] @[250px]/widget:tracking-[0.4em] uppercase font-semibold text-[#06f9c8]/80 mt-1">{conditionLabel}</motion.p>
                    </div>
                </motion.section>

                {/* Secondary Metrics: Only visible if width > 250px */}
                <motion.div
                    layout="position"
                    className="hidden @[250px]/widget:flex flex-row @[300px]/widget:flex-col gap-3 flex-1 overflow-hidden"
                >
                    {/* AQI Panel */}
                    <div className="flex-1 bg-white/[0.03] backdrop-blur-[24px] border border-[#06f9c8]/10 hover:bg-white/[0.06] hover:border-[#06f9c8]/30 transition-all rounded-xl p-3 flex flex-col justify-between">
                        <div className="flex items-center justify-between">
                            <span className="material-symbols-outlined text-[#06f9c8] text-sm @[300px]/widget:text-lg">air</span>
                            <span className="text-[8px] @[300px]/widget:text-[9px] uppercase font-bold text-slate-400 tracking-wider">AQI</span>
                        </div>
                        <div className="flex flex-col mt-2">
                            <span className="text-xl font-bold text-white leading-none">{aqi.toString().padStart(3, '0')}</span>
                            <span className="text-[8px] @[300px]/widget:text-[9px] text-[#06f9c8]/60 font-medium">{aqi < 50 ? "EXCELLENT" : "MODERATE"}</span>
                        </div>
                        <div className="hidden @[300px]/widget:block h-1 w-full bg-slate-800 rounded-full overflow-hidden mt-2">
                            <div className="h-full bg-[#06f9c8] shadow-[0_0_8px_rgba(6,249,200,0.8)]" style={{ width: `${Math.min(aqi, 100)}%` }}></div>
                        </div>
                    </div>

                    {/* Wind Panel */}
                    <div className="flex-1 bg-white/[0.03] backdrop-blur-[24px] border border-[#06f9c8]/10 hover:bg-white/[0.06] hover:border-[#06f9c8]/30 transition-all rounded-xl p-3 flex flex-col justify-between overflow-hidden relative">
                        <div className="flex items-center justify-between relative z-10">
                            <span className="material-symbols-outlined text-[#06f9c8] text-sm @[300px]/widget:text-lg">cyclone</span>
                            <span className="text-[8px] @[300px]/widget:text-[9px] uppercase font-bold text-slate-400 tracking-wider">Wind</span>
                        </div>
                        <div className="flex flex-col mt-2 relative z-10">
                            <span className="text-xl font-bold text-white leading-none">{windSpeed}</span>
                            <span className="text-[8px] @[300px]/widget:text-[9px] text-[#06f9c8]/60 font-medium">KM/H</span>
                        </div>
                        {/* Flowing Lines SVG */}
                        <div className="absolute bottom-0 left-0 w-full h-8 @[300px]/widget:h-12 opacity-40 pointer-events-none hidden @[250px]/widget:block">
                            <svg className="w-full h-full pointer-events-none" viewBox="0 0 100 20" preserveAspectRatio="none">
                                <motion.path d="M0,10 Q25,0 50,10 T100,10" fill="none" stroke="#06f9c8" strokeWidth="0.5" animate={{ d: ["M0,10 Q25,0 50,10 T100,10", "M0,10 Q25,20 50,10 T100,10", "M0,10 Q25,0 50,10 T100,10"] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />
                                <motion.path d="M0,15 Q25,5 50,15 T100,15" fill="none" stroke="#06f9c8" strokeWidth="0.5" animate={{ d: ["M0,15 Q25,5 50,15 T100,15", "M0,15 Q25,25 50,15 T100,15", "M0,15 Q25,5 50,15 T100,15"] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} />
                            </svg>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Tertiary Block: Temporal Forecast. Only visible in large heights + widths */}
            {/* We'll use @[300px]/widget for width, but we can't easily query height with tailwind container queries smoothly without plugins. Thus, we'll hide it on very small widths, and use flex-1 on the main container to push it. */}
            <motion.div
                layout="position"
                className="hidden @[300px]/widget:flex bg-white/[0.03] backdrop-blur-[24px] border border-[#06f9c8]/10 hover:bg-white/[0.06] hover:border-[#06f9c8]/30 transition-all rounded-xl p-3 flex-col gap-2 relative overflow-hidden shrink-0 mt-auto min-h-[90px]"
            >
                <div className="flex items-center justify-between shrink-0">
                    <span className="material-symbols-outlined text-[#06f9c8] text-sm">timeline</span>
                    <span className="text-[8px] uppercase font-bold text-slate-400 tracking-wider">Temporal</span>
                </div>

                <div className="flex-1 min-h-[30px] flex flex-col justify-end w-full relative pr-2">
                    <svg className="w-full h-full overflow-visible absolute inset-0" viewBox="0 0 100 40" preserveAspectRatio="none">
                        <defs>
                            <linearGradient id="spark-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#06f9c8" stopOpacity="0.3" />
                                <stop offset="100%" stopColor="#06f9c8" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                        <path d="M0,35 Q10,32 20,28 T40,20 T60,25 T80,15 T100,10" fill="none" stroke="#06f9c8" strokeWidth="2" />
                        <path d="M0,35 Q10,32 20,28 T40,20 T60,25 T80,15 T100,10 L100,40 L0,40 Z" fill="url(#spark-grad)" />
                        <circle cx="100" cy="10" r="2.5" fill="#06f9c8" style={{ filter: 'drop-shadow(0 0 10px rgba(6, 249, 200, 0.8))' }} />
                    </svg>
                </div>
                <div className="flex justify-between text-[8px] text-slate-500 font-mono shrink-0 pt-1">
                    <span>NOW</span><span>+2H</span><span>+4H</span>
                </div>
            </motion.div>

            {/* Bottom Glow */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-20 bg-[#06f9c8]/20 blur-[50px] pointer-events-none z-0"></div>

        </motion.div>
    );
}
