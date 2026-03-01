import { motion, Variants } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useWeatherLocation } from '@/modules/weather/context/weather-location-context';
import { fetchWeatherData } from '@/lib/weather-mock';
import Link from 'next/link';

export function WeatherBasicFloraWidget() {
    const { location } = useWeatherLocation();
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;
        setLoading(true);
        fetchWeatherData(location.lat, location.lon)
            .then(json => {
                if (mounted && json.terrestrial?.current) {
                    setData(json.terrestrial.current);
                    setLoading(false);
                }
            })
            .catch(() => {
                if (mounted) setLoading(false);
            });
        return () => { mounted = false; };
    }, [location.lat, location.lon]);

    const temp = data?.temperature_2m !== undefined ? Math.round(data.temperature_2m) : '--';
    const humidity = data?.relative_humidity_2m !== undefined ? Math.round(data.relative_humidity_2m) : '--';
    const wind = data?.wind_speed_10m !== undefined ? Math.round(data.wind_speed_10m) : '--';
    const weatherCode = data?.weather_code || 0;

    // Add more precise data like precipitation
    const precipitation = data?.precipitation || 0;
    const isRaining = [51, 53, 55, 61, 63, 65, 80, 81, 82].includes(weatherCode);
    const conditionColor = isRaining ? '#00ffff' : '#10b981';
    const conditionIcon = isRaining ? 'water_drop' : 'filter_drama';
    const conditionLabel = isRaining ? 'Precipitation' : 'Stable Ecology';

    return (
        <div className="@container relative w-full h-full bg-slate-950/90 backdrop-blur-2xl rounded-2xl overflow-hidden flex flex-col text-slate-100 font-display border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
            <Link href="/atmosphere" className="absolute top-2 right-2 p-1.5 rounded-full bg-white/5 hover:bg-white/20 text-[#10b981]/50 hover:text-[#10b981] transition-colors z-30 cursor-pointer shadow-lg backdrop-blur-md" title="Open Climate App">
                <span className="material-symbols-outlined text-[10px] @sm:text-[14px]">open_in_new</span>
            </Link>

            {/* Bio-Interface Header */}
            <div className="flex items-center justify-between px-4 @md:px-6 py-2 @md:py-4 z-20 shrink-0">
                <div className="flex items-center gap-4 @md:p-6 max-w-[70%]">
                    <span className="material-symbols-outlined text-xs @md:text-sm text-[#00ffff] drop-shadow-[0_0_8px_rgba(0,255,255,0.6)]">temp_preferences_custom</span>
                    <h1 className="text-xs @md:text-sm font-bold tracking-widest uppercase text-[#00ffff]/80 truncate drop-shadow-md">{location?.name || "Bio-Interface"}</h1>
                </div>
                {loading && <div className="size-4 @md:size-5 rounded-full border-2 border-[#10b981]/50 border-t-[#10b981] animate-spin"></div>}
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col items-center justify-center relative px-4 @md:px-6 w-full py-2 @md:py-4">

                {/* Background Decorative Tendrils */}
                <div className="absolute inset-0 z-0 pointer-events-none opacity-40 overflow-hidden">
                    <div className="absolute -top-4 @md:p-6 -right-10 @md:-right-16 size-24 @md:size-32 bg-[#10b981]/20 rounded-full blur-sm"></div>
                    <div className="absolute -bottom-4 -left-4 size-24 @md:size-32 bg-[#00ffff]/10 rounded-full blur-sm"></div>

                    {/* Animated Floating Spores */}
                    {[...Array(6)].map((_, idx) => (
                        <motion.div
                            key={idx}
                            className="absolute w-1 h-1 bg-[#00ffff] rounded-full opacity-40 blur-[1px]"
                            style={{
                                top: `${Math.random() * 80 + 10}%`,
                                left: `${Math.random() * 80 + 10}%`
                            }}
                            animate={{
                                y: [0, -30, 0],
                                x: [0, Math.random() * 20 - 10, 0],
                                opacity: [0.2, 0.8, 0.2]
                            }}
                            transition={{
                                duration: 5 + Math.random() * 5,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                    ))}
                </div>

                {/* Main Weather Widget Capsule */}
                <div className="w-full bg-[#00ffff]/[0.05] flex-1 backdrop-blur-sm border border-[#00ffff]/[0.15] shadow-[0_4px_24px_-1px_rgba(0,0,0,0.2)] rounded-2xl p-4 @md:p-6 flex flex-col items-center gap-4 @md:p-6 relative z-10 border-t-[#00ffff]/30 overflow-hidden justify-center">

                    {/* Liquid Sphere & Temp Row */}
                    <div className="flex items-center justify-between w-full mt-2 @md:mt-4">
                        {/* Liquid Glass Sphere */}
                        <div className="relative size-24 @md:size-32 flex items-center justify-center shrink-0">
                            <motion.div
                                className="absolute inset-0 rounded-full"
                                style={{
                                    background: `radial-gradient(circle at 30% 30%, ${conditionColor}66, ${conditionColor}1a 50%, rgba(0,0,0,0.8))`,
                                    boxShadow: `inset -5px -5px 15px ${conditionColor}33, 0 0 30px ${conditionColor}4D`
                                }}
                                animate={{ scale: [1, 1.05, 1] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            />
                            {/* Inner Glowing Rays */}
                            <motion.div
                                className={`absolute w-full h-full border border-dashed rounded-full ${isRaining ? 'border-[#00ffff]/40' : 'border-[#10b981]/40'}`}
                                animate={{ rotate: 360 }}
                                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                            />
                            <span className="material-symbols-outlined text-sm @md:text-base text-slate-100" style={{ filter: `drop-shadow(0 0 8px ${conditionColor})` }}>
                                {conditionIcon}
                            </span>

                            {/* Conditional Rain Animation internal to sphere area */}
                            {isRaining && (
                                <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
                                    {[...Array(5)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            className="absolute w-[1.5px] h-3 bg-[#00ffff]/80 rounded-full blur-[0.5px]"
                                            style={{ left: `${30 + Math.random() * 40}%`, top: '-10px' }}
                                            animate={{ y: [0, 80], opacity: [0, 1, 0] }}
                                            transition={{ duration: 0.5 + Math.random() * 0.3, repeat: Infinity, ease: "linear", delay: Math.random() }}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Temperature Display */}
                        <div className="text-right flex flex-col items-end pl-2 @md:pl-4">
                            <h2 className="text-4xl @md:text-6xl font-bold text-slate-100 tracking-tighter leading-none drop-shadow-md">
                                {temp}°
                            </h2>
                            <p className="text-[#10b981] font-medium text-xs @md:text-sm mt-2 @md:mt-4 tracking-wide flex items-center justify-end gap-4 @md:p-6 uppercase">
                                <span className="material-symbols-outlined text-xs @md:text-sm">eco</span>
                                {conditionLabel}
                            </p>
                        </div>
                    </div>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-1 @sm:grid-cols-2 gap-4 @md:p-6 w-full">
                        {/* Wind Speed Capsule */}
                        <div className="bg-[#00ffff]/[0.05] backdrop-blur-[12px] border border-[#00ffff]/10 shadow-lg rounded-2xl p-4 @md:p-6 flex flex-row @sm:flex-col items-center @sm:items-start justify-between @sm:justify-start gap-4 @md:p-6 border-l-2 @md:border-l-4 border-l-[#00ffff]">
                            <div className="flex items-center gap-4 @md:p-6 text-[#00ffff]/80">
                                <span className="material-symbols-outlined text-xs @md:text-sm">air</span>
                                <span className="text-xs @md:text-sm font-bold uppercase tracking-wider">Wind</span>
                            </div>
                            <div className="flex items-end gap-4 @md:p-6">
                                <span className="text-sm @md:text-base font-bold text-slate-100 leading-none">{wind}</span>
                                <span className="text-xs @md:text-sm text-[#00ffff]/60 pb-0">km/h</span>
                            </div>
                        </div>

                        {/* Humidity Capsule */}
                        <div className="bg-[#10b981]/[0.05] backdrop-blur-sm border border-[#10b981]/10 shadow-lg rounded-2xl p-4 @md:p-6 flex flex-row @sm:flex-col items-center @sm:items-start justify-between @sm:justify-start gap-4 @md:p-6 border-l-2 @md:border-l-4 border-l-[#10b981]">
                            <div className="flex items-center gap-4 @md:p-6 text-[#10b981]/80">
                                <span className="material-symbols-outlined text-xs @md:text-sm">humidity_mid</span>
                                <span className="text-xs @md:text-sm font-bold uppercase tracking-wider">Humid</span>
                            </div>
                            <div className="flex items-end gap-4 @md:p-6">
                                <span className="text-sm @md:text-base font-bold text-slate-100 leading-none">{humidity}</span>
                                <span className="text-xs @md:text-sm text-[#10b981]/60 pb-0">%</span>
                            </div>
                        </div>

                        {/* Precipitation Capsule */}
                        <div className="bg-[#00ffff]/[0.05] backdrop-blur-sm border border-[#00ffff]/10 shadow-lg rounded-2xl p-4 @md:p-6 flex flex-row @sm:flex-col items-center @sm:items-start justify-between @sm:justify-start gap-4 @md:p-6 border-l-2 @md:border-l-4 border-l-[#00ffff]">
                            <div className="flex items-center gap-4 @md:p-6 text-[#00ffff]/80">
                                <span className="material-symbols-outlined text-xs @md:text-sm">grain</span>
                                <span className="text-xs @md:text-sm font-bold uppercase tracking-wider">Precip</span>
                            </div>
                            <div className="flex items-end gap-4 @md:p-6">
                                <span className="text-sm @md:text-base font-bold text-slate-100 leading-none">{precipitation}</span>
                                <span className="text-xs @md:text-sm text-[#00ffff]/60 pb-0">mm</span>
                            </div>
                        </div>
                    </div>

                    {/* Organic Detail Overlay (Floral Vines SVG) */}
                    <div className="absolute -bottom-4 -right-4 @md:-right-8 size-24 @md:size-32 pointer-events-none opacity-80 z-0">
                        <svg className="w-full h-full text-[#10b981] fill-none stroke-current stroke-[2px]" style={{ filter: 'drop-shadow(0 0 12px rgba(16, 185, 129, 0.4))' }} viewBox="0 0 100 100">
                            <path d="M100,100 Q80,50 40,70 T0,20"></path>
                            <circle cx="40" cy="70" fill="currentColor" r="4"></circle>
                            <circle cx="80" cy="85" fill="currentColor" r="3"></circle>
                        </svg>
                    </div>
                </div>
            </div>

            {/* Background Image Texture */}
            <div className="absolute inset-0 -z-10 opacity-[0.15]">
                <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC2phbLiIa3ZdmiiQWgjVPL9eUXzNj1qCUSFWa9J2NEemIcmr9cQIdOVx4WLFx1_WIqWp3CKdTz4NhSjdJAN8meKAYt0aX7ftyrjNXRgviLkt9XbX4P7p-kuRnSRf2thiRDoMuCbOzauXi7m-3JFoPbgQmuqhbSjkj1wgU0gqGOR2blvtlSz-S8bBToGOjO_vO8H7k4PmTaJcXxA5fvGCJgjI4s0N-yftKb15oLHGpyp08Eid8OT3JKxCPoakywvvIjRkbafd3gabs')" }}></div>
            </div>
        </div>
    );
}
