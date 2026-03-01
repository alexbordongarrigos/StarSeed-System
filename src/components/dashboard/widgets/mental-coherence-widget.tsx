import React from 'react';
import { Play, SkipBack, SkipForward, RotateCcw, FastForward, HeartPulse, ActivitySquare, Speaker } from 'lucide-react';

export function MentalCoherenceWidget() {
    return (
        <div className="w-full h-full bg-[#0a0f12]/80 backdrop-blur-3xl rounded-xl relative overflow-hidden flex flex-col items-center justify-between p-4 sm:p-6 border border-white/5 border-t-white/10 shadow-2xl text-slate-100 font-display">
            {/* Background Decoration */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-xl">
                <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-cyan-400/10 rounded-full blur-[80px]"></div>
                <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] bg-pink-500/10 rounded-full blur-[80px]"></div>

                {/* Specific Coherence Orb ambient glow */}
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(circle_at_30%_30%,#13b6ec,transparent),radial-gradient(circle_at_70%_60%,#ec4899,transparent),radial-gradient(circle_at_50%_50%,#ffffff,transparent)] blur-[60px]" />
            </div>

            {/* Title */}
            <div className="text-center relative z-10 w-full mb-2 shrink-0">
                <h1 className="text-xl sm:text-2xl font-light tracking-tight text-white mb-1">Mental Coherence</h1>
                <p className="text-slate-400 text-[10px] sm:text-xs font-light max-w-[200px] sm:max-w-xs mx-auto leading-relaxed">
                    Bioluminescent soundscapes & alpha-wave synchronization.
                </p>
            </div>

            {/* Central Bioluminescent Orb */}
            <div className="relative flex justify-center items-center flex-1 w-full max-h-[220px] min-h-[140px] my-4">
                {/* Pulsating Rings */}
                <div className="absolute w-[60%] max-w-[200px] aspect-square rounded-full border border-cyan-400/20 animate-ping opacity-20 transition-all"></div>
                <div className="absolute w-[45%] max-w-[150px] aspect-square rounded-full border border-pink-500/20 animate-pulse opacity-30 transition-all"></div>

                {/* Main Orb */}
                <div className="absolute w-[50%] max-w-[180px] aspect-square rounded-full z-0 opacity-70 blur-[20px] md:blur-[30px]"
                    style={{ background: 'radial-gradient(circle at 30% 30%, #13b6ec, transparent), radial-gradient(circle at 70% 60%, #ec4899, transparent), radial-gradient(circle at 50% 50%, #ffffff, transparent)' }}>
                </div>

                {/* Inner Core Glass Sphere */}
                <div className="absolute w-[35%] max-w-[120px] aspect-square rounded-full bg-white/5 backdrop-blur-xl border border-white/20 shadow-[inset_0_0_20px_rgba(255,255,255,0.1)] flex items-center justify-center z-10 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-white/20 rounded-full" />
                    <div className="text-center relative z-20">
                        <span className="block text-cyan-300 text-[8px] sm:text-[10px] font-bold tracking-widest uppercase mb-0.5">Coherence</span>
                        <span className="block text-white text-xl sm:text-3xl font-light">94%</span>
                    </div>
                </div>
            </div>

            {/* Audio Player Controls */}
            <div className="w-full max-w-sm mx-auto relative z-10 shrink-0">
                <div className="text-center mb-4">
                    <h3 className="text-white text-sm sm:text-base font-light truncate">14Hz Crystal Resonator</h3>
                    <p className="text-slate-500 text-[8px] sm:text-[10px] tracking-widest uppercase mt-0.5">Binaural Beats</p>
                </div>

                {/* Liquid Timeline Bar */}
                <div className="mb-4">
                    <div className="flex justify-between items-end mb-1.5 px-1">
                        <span className="text-[9px] text-slate-500 font-medium">12:45</span>
                        <span className="text-[9px] text-slate-500 font-medium">20:00</span>
                    </div>
                    <div className="h-1 lg:h-1.5 w-full bg-white/10 rounded-full relative cursor-pointer hover:h-1.5 transition-all group">
                        <div className="absolute top-0 left-0 h-full w-[63%] rounded-full bg-gradient-to-r from-cyan-400 to-pink-500 shadow-[0_0_10px_rgba(19,182,236,0.5)]">
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 h-2 w-2 lg:h-3 lg:w-3 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                    </div>
                </div>

                {/* Playback Actions */}
                <div className="flex items-center justify-center gap-4 sm:gap-6">
                    <button className="text-slate-400 hover:text-white transition-colors">
                        <SkipBack size={18} />
                    </button>
                    <button className="text-slate-400 hover:text-white transition-colors hidden sm:block">
                        <RotateCcw size={16} />
                    </button>

                    <button className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.2)] ml-1 mr-1">
                        <Play size={20} fill="currentColor" className="ml-0.5" />
                    </button>

                    <button className="text-slate-400 hover:text-white transition-colors hidden sm:block">
                        <FastForward size={16} />
                    </button>
                    <button className="text-slate-400 hover:text-white transition-colors">
                        <SkipForward size={18} />
                    </button>
                </div>
            </div>

            {/* Bottom Stats Grid (Only fully visible if there's enough height, else truncated slightly via container queries or hidden) */}
            <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-2 mt-4 pt-4 border-t border-white/10 shrink-0 hidden sm:grid">
                <div className="text-center p-1 sm:p-2">
                    <p className="text-slate-500 text-[8px] uppercase tracking-widest mb-0.5">Focus</p>
                    <p className="text-slate-200 text-sm sm:text-base font-light">Deep</p>
                </div>
                <div className="text-center p-1 sm:p-2 border-l border-white/5">
                    <p className="text-slate-500 text-[8px] uppercase tracking-widest mb-0.5">BPM</p>
                    <p className="text-slate-200 text-sm sm:text-base font-light">60</p>
                </div>
                <div className="text-center p-1 sm:p-2 border-l border-white/5 hidden lg:block">
                    <p className="text-slate-500 text-[8px] uppercase tracking-widest mb-0.5">Sessions</p>
                    <p className="text-slate-200 text-sm sm:text-base font-light">12/30</p>
                </div>
                <div className="text-center p-1 sm:p-2 border-l border-white/5 lg:block">
                    <p className="text-slate-500 text-[8px] uppercase tracking-widest mb-0.5">State</p>
                    <p className="text-cyan-400 text-sm sm:text-base font-light">Optimal</p>
                </div>
            </div>
        </div>
    );
}
