import React from 'react';
import { Sparkles, Radio, Heart, MessageCircle, PlayCircle, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';

export function CulturalFeedWidget() {
    return (
        <div className="w-full h-full bg-slate-900/60 backdrop-blur-3xl rounded-xl relative overflow-hidden flex flex-col p-5 border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] text-white font-display group">
            {/* Ambient Background Effects */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(ellipse_at_center,rgba(236,72,153,0.15),transparent_70%)] pointer-events-none transition-opacity duration-1000 group-hover:opacity-100 opacity-60"></div>

            {/* Header */}
            <header className="flex items-center justify-between pb-4 border-b border-white/10 shrink-0 z-10 relative">
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-[0_0_15px_rgba(244,63,94,0.4)]">
                        <Radio size={16} className="text-white drop-shadow-md" />
                    </div>
                    <div>
                        <h1 className="text-[10px] uppercase tracking-[0.3em] text-pink-200 mt-1">Ondas de Consciencia</h1>
                        <h2 className="text-sm font-semibold text-white tracking-wide">FEED CULTURAL</h2>
                    </div>
                </div>

                <div className="flex gap-2">
                    <button className="h-7 px-3 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-[10px] tracking-wider uppercase text-pink-200">
                        Top
                    </button>
                    <button className="h-7 px-3 flex items-center justify-center rounded-full bg-pink-500/20 hover:bg-pink-500/30 border border-pink-500/30 transition-colors text-[10px] tracking-wider uppercase font-semibold text-pink-100 shadow-[0_0_10px_rgba(236,72,153,0.2)]">
                        Live
                    </button>
                </div>
            </header>

            {/* Scrollable Feed */}
            <main className="flex-1 overflow-y-auto mt-4 space-y-4 pr-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent z-10 relative">

                {/* Cultural Post 1: Video/Art */}
                <article className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all hover:border-pink-500/30 group/post cursor-pointer">
                    <div className="relative w-full h-24 rounded-lg overflow-hidden mb-3">
                        {/* Placeholder Graphic */}
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 opacity-80 group-hover/post:scale-105 transition-transform duration-700"></div>
                        <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <PlayCircle size={32} className="text-white/80 group-hover/post:text-white transition-colors drop-shadow-lg" />
                        </div>
                        <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/50 backdrop-blur-md border border-white/10 text-[9px] font-mono">03:42</div>
                    </div>

                    <h3 className="text-sm font-semibold text-white mb-1 group-hover/post:text-pink-300 transition-colors">Resonancia Cuántica Vol. 4</h3>
                    <p className="text-xs text-white/50 mb-3 line-clamp-2">Una exploración audiovisual de los estados alterados de la materia mediante frecuencias de luz plasmática.</p>

                    <div className="flex items-center justify-between text-white/40">
                        <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-500"></div>
                            <span className="text-[10px] uppercase tracking-wider font-medium text-white/70">@Kael_V</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1 text-[10px] hover:text-pink-400 transition-colors"><Heart size={12} /> 1.2k</span>
                            <span className="flex items-center gap-1 text-[10px] hover:text-cyan-400 transition-colors"><MessageCircle size={12} /> 84</span>
                        </div>
                    </div>
                </article>

                {/* Cultural Post 2: Text/Poetry */}
                <article className="p-4 rounded-xl bg-gradient-to-br from-rose-500/10 to-transparent border border-rose-500/20 hover:border-rose-500/40 transition-all group/post cursor-pointer relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover/post:opacity-20 transition-opacity">
                        <Sparkles size={48} className="text-rose-400" />
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                        <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-[9px] uppercase tracking-widest border border-rose-500/30">Manifiesto</span>
                        <span className="text-[10px] text-white/40 font-mono">hace 2 horas</span>
                    </div>

                    <h3 className="text-base font-headline font-bold text-white mb-2 leading-tight">La Biología del Código Abierto</h3>
                    <p className="text-xs text-white/70 italic border-l-2 border-rose-500/50 pl-3 mb-4">"No construimos software en StarSeed, cultivamos ecosistemas digitales donde el silicio y el pensamiento convergen..."</p>

                    <div className="flex items-center justify-between text-white/40 border-t border-white/5 pt-3">
                        <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-emerald-400 to-teal-500"></div>
                            <span className="text-[10px] uppercase tracking-wider font-medium text-white/70">@Lyra_Sys</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1 text-[10px] hover:text-rose-400 transition-colors"><Heart size={12} /> 342</span>
                            <span className="flex items-center gap-1 text-[10px] hover:text-cyan-400 transition-colors"><Eye size={12} /> 4.1k</span>
                        </div>
                    </div>
                </article>

            </main>

            {/* Glass Overlay Effects */}
            <div className="absolute inset-0 border border-white/5 rounded-xl pointer-events-none mix-blend-overlay"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none rounded-xl"></div>
        </div>
    );
}
