import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useWeatherLocation } from '@/modules/weather/context/weather-location-context';
import { fetchWeatherData } from '@/lib/weather-mock';

export function WeatherBasicAuroraWidget() {
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

    const current = data?.current || {};
    const forecastHourly = data?.forecast?.hourly || {};
    const forecastDaily = data?.forecast?.daily || {};

    const temp = current.temperature_2m !== undefined ? Math.round(current.temperature_2m) : '--';
    const humidity = current.relative_humidity_2m !== undefined ? Math.round(current.relative_humidity_2m) : '--';
    const wind = current.wind_speed_10m !== undefined ? Math.round(current.wind_speed_10m) : '--';

    // Determine condition string from WMO code (simplified)
    const wmo = current.weather_code || 0;
    const conditionStr = wmo === 0 ? "Clear Sky" : wmo < 40 ? "Partly Cloudy" : wmo < 70 ? "Rainy" : wmo < 80 ? "Snow" : "Stormy";
    const highTemp = forecastDaily.temperature_2m_max?.[0] ? Math.round(forecastDaily.temperature_2m_max[0]) : '--';

    // Parse next few hours
    const nextHours = [];
    if (forecastHourly.time && forecastHourly.temperature_2m) {
        // Find current index (approximate based on current hour)
        const currentHourStr = new Date().toISOString().slice(0, 14) + "00";
        const idx = forecastHourly.time.findIndex((t: string) => t >= currentHourStr) || 0;

        for (let i = 0; i < 4; i++) {
            if (forecastHourly.time[idx + i * 2]) { // Skip every 2 hours
                const timeStr = new Date(forecastHourly.time[idx + i * 2]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                const icon = [51, 53, 55, 61, 63, 65].includes(forecastHourly.weather_code?.[idx + i * 2]) ? 'rainy' : (forecastHourly.weather_code?.[idx + i * 2] === 0 ? 'sunny' : 'cloud');
                nextHours.push({
                    time: i === 0 ? 'Now' : timeStr,
                    temp: Math.round(forecastHourly.temperature_2m[idx + i * 2]),
                    icon
                });
            }
        }
    }

    return (
        <div className="@container relative w-full h-full min-h-[300px] @sm:min-h-[500px] flex flex-col font-display text-slate-100 rounded-[2rem] overflow-hidden border border-[#895af6]/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]"
            style={{ backgroundColor: '#0F0F23' }}>

            {/* Animated Aurora Ribbons (Decorative) */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                <motion.div
                    className="absolute -top-[10%] -left-[10%] w-[80%] h-[60%] bg-[#895af6] rounded-full blur-[80px] opacity-20"
                    animate={{ x: [0, 50, 0], scale: [1, 1.1, 1] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute -bottom-[10%] -right-[10%] w-[70%] h-[50%] bg-[#22d3ee]/20 rounded-full blur-[80px]"
                    animate={{ y: [0, -30, 0], scale: [1, 1.05, 1] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                />
            </div>

            {/* Top Navigation Bar */}
            <div className="relative z-10 flex items-center justify-between px-4 @sm:px-6 pt-4 @sm:pt-6 pb-2 shrink-0">
                <div className="text-left flex flex-col items-start">
                    <h2 className="text-[8px] @sm:text-[10px] font-medium tracking-widest uppercase text-slate-400">Cosmos Station 01</h2>
                    <div className="flex items-center justify-start gap-1">
                        <span className="material-symbols-outlined text-[10px] text-[#895af6]">location_on</span>
                        <p className="text-[10px] @sm:text-xs font-bold text-slate-100 uppercase tracking-tighter">{location?.name || "Sector 7-G"}</p>
                    </div>
                </div>
                {loading && <div className="w-4 h-4 rounded-full border-2 border-[#895af6]/50 border-t-[#895af6] animate-spin"></div>}
            </div>

            {/* Main HUD Content */}
            <div className="relative z-10 flex flex-1 flex-col items-center justify-start px-4 @sm:px-6 pt-2 @sm:pt-4 gap-4 @sm:gap-6 pb-4">

                {/* Hero Temperature Display */}
                <div className="flex flex-col items-center shrink-0">
                    <div className="relative">
                        <motion.h1
                            className="text-6xl @sm:text-[90px] font-thin leading-none tracking-tighter text-white"
                            style={{ textShadow: '0 0 20px rgba(137, 90, 246, 0.5)' }}
                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                        >
                            {temp}°C
                        </motion.h1>
                        <div className="absolute -right-4 top-0 @sm:top-2 bg-[#895af6]/20 backdrop-blur-md px-2 @sm:px-3 py-0.5 @sm:py-1 rounded-full border border-[#895af6]/30">
                            <p className="text-[8px] @sm:text-[10px] font-bold text-[#895af6] uppercase">Optimal</p>
                        </div>
                    </div>
                    <p className="mt-1 text-slate-400 text-[9px] @sm:text-xs font-light tracking-[0.2em] uppercase text-center mx-auto max-w-[80%]">
                        {conditionStr} • Highs {highTemp}°
                    </p>
                </div>

                {/* Dashboard Layout: Metrics & Moon */}
                <div className="grid w-full grid-cols-1 @sm:grid-cols-2 gap-3 @sm:gap-4 shrink-0">

                    {/* Left: Metrics Vertical Pane */}
                    <div className="flex flex-row @sm:flex-col gap-3 rounded-xl bg-white/[0.03] backdrop-blur-[32px] border-t border-l border-white/20 border-white/10 p-3 @sm:p-5 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] min-h-[80px]">
                        <div className="flex flex-1 items-center gap-2 @sm:gap-3">
                            <div className="flex size-8 @sm:size-10 items-center justify-center rounded-full bg-[#895af6]/10 border border-[#895af6]/20">
                                <span className="material-symbols-outlined text-[#895af6] text-lg @sm:text-xl">air</span>
                            </div>
                            <div>
                                <p className="text-[8px] @sm:text-[10px] font-medium text-slate-400 uppercase leading-none mb-1">Wind</p>
                                <p className="text-sm @sm:text-xl font-bold text-white leading-none">{wind}<span className="text-[10px] @sm:text-xs font-normal text-slate-400 ml-0.5">km/h</span></p>
                            </div>
                        </div>
                        <div className="hidden @sm:block h-[1px] w-full bg-white/5 my-1"></div>
                        <div className="flex flex-1 items-center gap-2 @sm:gap-3">
                            <div className="flex size-8 @sm:size-10 items-center justify-center rounded-full bg-[#22d3ee]/10 border border-[#22d3ee]/20">
                                <span className="material-symbols-outlined text-[#22d3ee] text-lg @sm:text-xl">humidity_low</span>
                            </div>
                            <div>
                                <p className="text-[8px] @sm:text-[10px] font-medium text-slate-400 uppercase leading-none mb-1">Humidity</p>
                                <p className="text-sm @sm:text-xl font-bold text-white leading-none">{humidity}<span className="text-[10px] @sm:text-xs font-normal text-slate-400 ml-0.5">%</span></p>
                            </div>
                        </div>
                    </div>

                    {/* Right: Circular Moon Portal */}
                    <div className="relative hidden @sm:flex items-center justify-center rounded-xl bg-white/[0.03] backdrop-blur-[32px] border-t border-l border-white/20 border-white/10 p-4 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] overflow-hidden h-full">
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#895af6]/10 to-transparent opacity-50"></div>
                        <div className="relative z-10 flex flex-col items-center">
                            <div className="relative size-[72px] rounded-full overflow-hidden bg-[#1a1a1a] flex items-center justify-center" style={{ boxShadow: 'inset -15px -15px 30px rgba(0,0,0,0.8), inset 10px 10px 20px rgba(255,255,255,0.1)' }}>
                                <motion.div
                                    className="absolute inset-0 bg-cover bg-center mix-blend-screen opacity-80"
                                    style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBaP9lDKThomPhS_bxWvuddKkomrL444ywq2OilulUKsgmet61Sqp2TC935ViG9s98g91I3WqLlY9BHbRQWcJz41tV07T_UPk3WNZVjux5IL0H8CRNEZO8E6v3jzQ5zloG9Fxzd3YnUOEOvztmz72-BAVWbxNmqJHPxKzwHmUs9L9Zb4ku-nWBvPy6fmnFj55r5GBOOZ8hHvU_7UN_FFvLtSL-qIV05bcj_LewZtKqEzTNCR4iKqV8dvqBk8qkJF03_QlhONlGNtOc')" }}
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent"></div>
                            </div>
                            <p className="mt-3 text-[9px] font-bold text-white uppercase tracking-widest text-center">Cosmic Body</p>
                        </div>
                    </div>
                </div>

                {/* Horizontal Hourly Forecast */}
                <div className="w-full mt-auto flex-1 flex flex-col justify-end">
                    <div className="flex items-center justify-between mb-2 @sm:mb-3 shrink-0">
                        <h3 className="text-[8px] @sm:text-[10px] font-bold text-slate-100 uppercase tracking-widest">Atmospheric Cycle</h3>
                        <span className="text-[8px] @sm:text-[9px] text-[#895af6] font-bold uppercase underline decoration-[#895af6]/50 underline-offset-4">Next Hours</span>
                    </div>

                    <div className="flex justify-between w-full h-auto min-h-[60px] @sm:min-h-[90px] gap-2 shrink-0">
                        {nextHours.length > 0 ? nextHours.map((hr, idx) => (
                            <div key={idx} className={`flex flex-col items-center justify-center gap-1 @sm:gap-1.5 flex-1 rounded-xl @sm:rounded-2xl bg-white/[0.03] backdrop-blur-[32px] border-t border-l border-white/20 border-white/10 ${idx === 0 ? 'bg-[#895af6]/20 border-[#895af6]/40' : ''} py-2 @sm:py-3`}>
                                <p className="text-[8px] @sm:text-[9px] font-medium text-slate-400 uppercase">{hr.time}</p>
                                <span className="material-symbols-outlined text-white text-base @sm:text-xl" style={idx === 0 ? { filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.6))' } : {}}>{hr.icon}</span>
                                <p className="text-xs @sm:text-sm font-bold text-white">{hr.temp}°</p>
                            </div>
                        )) : (
                            // Placeholder if API format prevents hourly slice loading
                            [...Array(4)].map((_, idx) => (
                                <div key={idx} className={`flex flex-col items-center justify-center gap-1.5 flex-1 rounded-2xl bg-white/[0.03] backdrop-blur-[32px] border-t border-l border-white/20 border-white/10 ${idx === 0 ? 'bg-[#895af6]/20 border-[#895af6]/40' : ''} py-3 animate-pulse`}>
                                    <div className="w-5 @sm:w-6 h-1.5 @sm:h-2 bg-white/20 rounded"></div>
                                    <div className="size-4 @sm:size-6 bg-white/20 rounded-full my-0.5"></div>
                                    <div className="w-3 @sm:w-4 h-2 @sm:h-3 bg-white/20 rounded"></div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
            {/* View Toggle Button */}
            <div className="mt-auto mb-4 mx-4 @sm:mx-6 flex w-auto p-1 rounded-full bg-white/[0.03] backdrop-blur-[32px] border-t border-l border-white/20 border-white/10 shrink-0">
                <button className="flex-1 rounded-full bg-[#895af6] py-1.5 @sm:py-2 text-[8px] @sm:text-[10px] font-black uppercase tracking-widest text-white shadow-lg shadow-[#895af6]/40">Atmospheric</button>
                <button className="flex-1 rounded-full py-1.5 @sm:py-2 text-[8px] @sm:text-[10px] font-black uppercase tracking-widest text-slate-500">Orbital View</button>
            </div>
        </div>
    );
}
