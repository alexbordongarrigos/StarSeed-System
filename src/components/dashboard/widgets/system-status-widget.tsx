import React from 'react';
import { Settings, Bell, CheckCircle2, AlertTriangle } from 'lucide-react';

export function SystemStatusWidget() {
    return (
        <div className="w-full h-full bg-black/40 backdrop-blur-2xl rounded-xl relative overflow-hidden flex flex-col p-4 md:p-6 border border-cyan-400/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.8)] text-white font-display">
            {/* Header */}
            <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-cyan-400/10 gap-2 shrink-0 z-10">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-cyan-400/10 rounded-lg text-cyan-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                    </div>
                    <div>
                        <h1 className="text-[8px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.4em] text-cyan-400/60 font-medium">StarSeed Trinity</h1>
                        <h2 className="text-lg md:text-xl font-light tracking-wider text-cyan-400 truncate">TELEMETRY & CORE</h2>
                    </div>
                </div>
                
                <div className="flex items-center gap-4 self-end sm:self-auto">
                    <div className="text-right hidden sm:block">
                        <p className="text-[8px] uppercase tracking-widest text-cyan-400/40">Mission Time</p>
                        <p className="font-mono text-sm md:text-base text-cyan-400/90">08:42:11:04</p>
                    </div>
                    <div className="flex gap-2">
                        <button className="h-8 w-8 flex items-center justify-center rounded border border-cyan-400/20 hover:bg-cyan-400/10 transition-colors text-cyan-400">
                            <Settings size={16} />
                        </button>
                        <button className="h-8 w-8 flex items-center justify-center rounded border border-cyan-400/20 hover:bg-cyan-400/10 transition-colors text-cyan-400">
                            <Bell size={16} />
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 py-4 relative z-10 overflow-hidden min-h-[200px]">
                
                {/* Left Side Status - Hidden purely on very small mobile, shown on md and up */}
                <div className="hidden md:flex flex-col justify-between col-span-3 lg:col-span-2 space-y-4">
                    <div className="space-y-4 h-full">
                        <div>
                            <p className="text-[9px] uppercase tracking-widest text-cyan-400/60 mb-2">CPU Cores</p>
                            <div className="flex gap-1.5 h-16 xl:h-24">
                                <div className="flex-1 bg-cyan-400/5 rounded-t-sm relative overflow-hidden ring-1 ring-cyan-400/10">
                                    <div className="absolute bottom-0 w-full bg-gradient-to-t from-cyan-400 to-blue-500 shadow-[0_0_15px_rgba(34,211,238,0.5)] h-[65%]"></div>
                                </div>
                                <div className="flex-1 bg-cyan-400/5 rounded-t-sm relative overflow-hidden ring-1 ring-cyan-400/10">
                                    <div className="absolute bottom-0 w-full bg-gradient-to-t from-cyan-400 to-blue-500 shadow-[0_0_15px_rgba(34,211,238,0.5)] h-[42%]"></div>
                                </div>
                                <div className="flex-1 bg-cyan-400/5 rounded-t-sm relative overflow-hidden ring-1 ring-cyan-400/10">
                                    <div className="absolute bottom-0 w-full bg-gradient-to-t from-cyan-400 to-blue-500 shadow-[0_0_15px_rgba(34,211,238,0.5)] h-[88%]"></div>
                                </div>
                                <div className="flex-1 bg-cyan-400/5 rounded-t-sm relative overflow-hidden ring-1 ring-cyan-400/10">
                                    <div className="absolute bottom-0 w-full bg-gradient-to-t from-cyan-400 to-blue-500 shadow-[0_0_15px_rgba(34,211,238,0.5)] h-[30%]"></div>
                                </div>
                            </div>
                        </div>
                        
                        <div>
                            <p className="text-[9px] uppercase tracking-widest text-cyan-400/60 mb-2">Memory Load</p>
                            <div className="w-full bg-cyan-400/5 h-1.5 rounded-full overflow-hidden border border-cyan-400/10">
                                <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 w-[74.2%]"></div>
                            </div>
                            <p className="text-right font-mono text-[10px] mt-1 text-cyan-400">74.2%</p>
                        </div>
                    </div>
                    
                    <div className="p-3 xl:p-4 border border-cyan-400/20 rounded-lg bg-cyan-400/5">
                        <p className="text-[9px] uppercase tracking-widest text-cyan-400/60 mb-1">Thermal</p>
                        <p className="text-xl xl:text-2xl font-bold text-cyan-400">32.4<span className="text-xs font-light">K</span></p>
                        <p className="text-[8px] xl:text-[9px] text-cyan-400/40 mt-1 uppercase">Stable Resistance</p>
                    </div>
                </div>

                {/* Central Holographic Radar */}
                <div className="col-span-1 md:col-span-6 lg:col-span-8 flex flex-col items-center justify-center relative min-h-[150px]">
                    {/* Decorative Rings */}
                    <div className="absolute w-[80%] max-w-[280px] aspect-square border border-cyan-400/10 rounded-full animate-pulse transition-all"></div>
                    <div className="absolute w-[95%] max-w-[320px] aspect-square border border-cyan-400/5 rounded-full transition-all"></div>
                    <div className="absolute w-[105%] max-w-[360px] aspect-square border-t border-b border-cyan-400/20 rounded-full transition-all"></div>
                    
                    {/* Radar UI */}
                    <div className="relative w-[60%] max-w-[220px] aspect-square flex items-center justify-center">
                        <div className="absolute inset-0 rounded-full border-2 border-cyan-400/20 shadow-[0_0_30px_rgba(34,211,238,0.1)]"></div>
                        <div className="absolute w-full h-px bg-cyan-400/20"></div>
                        <div className="absolute h-full w-px bg-cyan-400/20"></div>
                        
                        {/* Radar Sweep */}
                        <div className="absolute w-1/2 h-1/2 left-1/2 bottom-1/2 origin-bottom-left bg-gradient-to-t from-cyan-400/0 to-cyan-400/40 border-r border-cyan-400 animate-[spin_4s_linear_infinite]" style={{ borderRadius: "100% 0 0 0" }}></div>
                        
                        {/* Center Label */}
                        <div className="z-10 text-center bg-black/40 p-3 rounded-full backdrop-blur-sm border border-cyan-400/10">
                            <p className="text-[8px] md:text-[10px] tracking-[0.2em] md:tracking-[0.3em] text-cyan-400 mb-0.5">QUANTUM</p>
                            <p className="text-xl md:text-3xl font-black text-white drop-shadow-[0_0_10px_#22d3ee]">98.2%</p>
                            <p className="text-[7px] md:text-[8px] text-cyan-400/60 mt-1">RESONANCE SYNC</p>
                        </div>
                    </div>
                    
                    {/* Coordinate Data */}
                    <div className="absolute bottom-0 w-full flex justify-center gap-4 md:gap-8 font-mono text-[8px] md:text-[10px] text-cyan-400/60 tracking-widest hidden sm:flex">
                        <span>X: 192.441</span>
                        <span>Y: 004.882</span>
                        <span>Z: 992.001</span>
                    </div>
                </div>

                {/* Right Side Data */}
                <div className="hidden md:flex flex-col justify-between col-span-3 lg:col-span-2 text-right space-y-4">
                    <div className="space-y-6">
                        <div>
                            <p className="text-[9px] uppercase tracking-widest text-cyan-400/60 mb-2">Network I/O</p>
                            <div className="flex flex-col gap-1.5 items-end">
                                <div className="text-[10px] xl:text-xs text-cyan-400/90 flex gap-2">DL: <span className="font-mono">1.2 GB/s</span></div>
                                <div className="w-full bg-cyan-400/5 h-1 rounded-full overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 w-[85%]"></div>
                                </div>
                                <div className="text-[10px] xl:text-xs text-cyan-400/90 flex gap-2 mt-1">UL: <span className="font-mono">450 MB/s</span></div>
                                <div className="w-full bg-cyan-400/5 h-1 rounded-full overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 w-[32%]"></div>
                                </div>
                            </div>
                        </div>
                        
                        <div>
                            <p className="text-[9px] uppercase tracking-widest text-cyan-400/60 mb-2">Neural Link</p>
                            <div className="inline-flex items-center gap-2 text-cyan-400 font-bold text-[10px] xl:text-xs">
                                <span className="h-2 w-2 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_8px_#22d3ee]"></span>
                                ACTIVE
                            </div>
                        </div>
                    </div>
                    
                    <div className="p-3 xl:p-4 border border-cyan-400/20 rounded-lg bg-cyan-400/5">
                        <p className="text-[9px] uppercase tracking-widest text-cyan-400/60 mb-1">Uptime</p>
                        <p className="text-base xl:text-xl font-bold text-cyan-400 font-mono tracking-tighter">142:18:22</p>
                        <p className="text-[8px] xl:text-[9px] text-cyan-400/40 mt-1 uppercase">Nominal Power</p>
                    </div>
                </div>
            </main>

            {/* Bottom Terminal Output */}
            <footer className="h-20 lg:h-28 bg-black/60 border-t border-cyan-400/10 p-2 md:p-3 font-mono text-[9px] md:text-[10px] overflow-hidden rounded-b-lg shrink-0 z-10">
                <div className="h-full overflow-y-auto pr-2 space-y-1 scrollbar-thin scrollbar-thumb-cyan-400/20 scrollbar-track-transparent">
                    <div className="flex gap-2 text-cyan-400/50">
                        <span className="text-cyan-400/70 shrink-0">[08:42:11]</span>
                        <span className="truncate">INIT QUANTUM RESONANCE CORE... SUCCESS</span>
                    </div>
                    <div className="flex gap-2 text-cyan-400/50">
                        <span className="text-cyan-400/70 shrink-0">[08:42:12]</span>
                        <span className="truncate">NEURAL GRID ESTABLISHED - LATENCY 0.4ms</span>
                    </div>
                    <div className="flex gap-2 text-cyan-400">
                        <span className="text-cyan-400/70 shrink-0">[08:42:13]</span>
                        <span className="flex items-center gap-1.5 truncate">
                            <CheckCircle2 size={10} className="shrink-0" />
                            TELEMETRY HANDSHAKE COMPLETE
                        </span>
                    </div>
                    <div className="flex gap-2 text-amber-400/70 hidden sm:flex">
                        <span className="text-amber-400/90 shrink-0">[08:42:20]</span>
                        <span className="truncate flex items-center gap-1.5"><AlertTriangle size={10}/> WARNING: SECTOR 7 PACKET LOSS DETECTED - REROUTING...</span>
                    </div>
                    <div className="flex gap-2 text-cyan-400/50 hidden md:flex">
                        <span className="text-cyan-400/70 shrink-0">[08:42:25]</span>
                        <span className="truncate">SYSTEM READY. STANDING BY FOR INPUT.</span>
                    </div>
                </div>
            </footer>

            {/* Abstract Background Scanline */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0" style={{ backgroundImage: "linear-gradient(rgba(255, 255, 255, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))", backgroundSize: "100% 2px, 3px 100%" }}></div>
        </div>
    );
}
