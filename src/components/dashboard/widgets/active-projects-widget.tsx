import React from 'react';
import { ChevronRight, Network, Rocket, Terminal, Layers } from 'lucide-react';

export function ActiveProjectsWidget() {
    return (
        <div className="w-full h-full bg-[#0a060c]/80 backdrop-blur-3xl rounded-xl relative overflow-hidden flex flex-col p-4 sm:p-6 border border-[#a60df2]/20 shadow-2xl text-slate-100 font-display">
            {/* Ambient Background Glows */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#a60df2]/10 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-indigo-600/10 rounded-full blur-[80px] pointer-events-none" />

            {/* Widget Header */}
            <div className="flex justify-between items-start mb-4 z-10 shrink-0">
                <div>
                    <div className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#a60df2]/10 border border-[#a60df2]/20 text-[#a60df2] text-[8px] font-bold tracking-widest uppercase mb-2">
                        Quantum Stream
                    </div>
                    <h3 className="text-lg sm:text-2xl font-bold text-white tracking-tight">Active <span className="text-[#a60df2]">Genesis</span></h3>
                    <p className="text-slate-500 text-[10px] sm:text-xs">Priority collaboration sequence</p>
                </div>

                <div className="flex gap-2">
                    <div className="hidden sm:flex flex-col items-end mr-4">
                        <span className="text-xl font-bold text-white">98%</span>
                        <span className="text-[8px] text-slate-500 uppercase tracking-widest">Uptime Sync</span>
                    </div>
                    <button className="px-3 py-1.5 h-fit rounded-full border border-[#a60df2]/30 text-[#a60df2] text-[10px] sm:text-xs font-bold hover:bg-[#a60df2]/10 transition-colors uppercase tracking-widest whitespace-nowrap hidden sm:block">
                        Sync
                    </button>
                </div>
            </div>

            {/* Scrollable Projects Container */}
            <div className="flex-1 overflow-y-auto space-y-3 z-10 pr-1 scrollbar-thin scrollbar-thumb-[#a60df2]/20 scrollbar-track-transparent">

                {/* Project Card 1 */}
                <div className="bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-lg flex items-center p-3 relative overflow-hidden group border border-white/5 hover:border-[#a60df2]/40 transition-all cursor-pointer">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#a60df2]/80 to-indigo-600 transition-all group-hover:w-1.5" />

                    <div className="flex-1 flex items-center gap-3 sm:gap-4 pl-2">
                        {/* Progress Ring */}
                        <div className="relative w-10 h-10 sm:w-12 sm:h-12 shrink-0">
                            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                                <circle className="stroke-white/5" cx="18" cy="18" fill="none" r="16" strokeWidth="3"></circle>
                                <circle className="stroke-[#a60df2] drop-shadow-[0_0_8px_rgba(166,13,242,0.6)]" cx="18" cy="18" fill="none" r="16" strokeDasharray="100" strokeDashoffset="25" strokeLinecap="round" strokeWidth="3"></circle>
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center text-[9px] font-bold text-white">75%</div>
                        </div>
                        <div className="min-w-0">
                            <h4 className="text-white font-semibold text-sm sm:text-base truncate">Orbit Redesign</h4>
                            <p className="text-slate-400 text-[9px] sm:text-xs truncate">Lead: Aether Visionary</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 ml-2">
                        <div className="flex -space-x-2 hidden sm:flex">
                            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-[#110816] bg-slate-800" />
                            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-[#110816] bg-slate-700" />
                            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-[#110816] bg-slate-600" />
                        </div>
                        <button className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-400 group-hover:bg-[#a60df2]/20 group-hover:text-white transition-colors">
                            <ChevronRight size={14} />
                        </button>
                    </div>
                </div>

                {/* Project Card 2 */}
                <div className="bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-lg flex items-center p-3 relative overflow-hidden group border border-white/5 hover:border-[#a60df2]/40 transition-all cursor-pointer">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#a60df2]/80 to-indigo-600 transition-all group-hover:w-1.5" />

                    <div className="flex-1 flex items-center gap-3 sm:gap-4 pl-2">
                        <div className="relative w-10 h-10 sm:w-12 sm:h-12 shrink-0">
                            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                                <circle className="stroke-white/5" cx="18" cy="18" fill="none" r="16" strokeWidth="3"></circle>
                                <circle className="stroke-[#a60df2] drop-shadow-[0_0_8px_rgba(166,13,242,0.6)]" cx="18" cy="18" fill="none" r="16" strokeDasharray="100" strokeDashoffset="58" strokeLinecap="round" strokeWidth="3"></circle>
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center text-[9px] font-bold text-white">42%</div>
                        </div>
                        <div className="min-w-0">
                            <h4 className="text-white font-semibold text-sm sm:text-base truncate">Lunar Hub</h4>
                            <p className="text-slate-400 text-[9px] sm:text-xs truncate">Lead: Selene Architect</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 ml-2">
                        <div className="flex -space-x-2 hidden sm:flex">
                            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-[#110816] bg-indigo-900" />
                            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-[#110816] bg-indigo-800" />
                        </div>
                        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#a60df2] flex items-center justify-center text-[8px] font-bold text-white border-2 border-[#110816] hidden sm:flex z-10 -ml-2">
                            +3
                        </div>
                        <button className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-400 group-hover:bg-[#a60df2]/20 group-hover:text-white transition-colors">
                            <ChevronRight size={14} />
                        </button>
                    </div>
                </div>

                {/* Project Card 3 */}
                <div className="bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-lg flex items-center p-3 relative overflow-hidden group border border-white/5 hover:border-[#a60df2]/40 transition-all cursor-pointer">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#a60df2]/80 to-indigo-600 transition-all group-hover:w-1.5" />

                    <div className="flex-1 flex items-center gap-3 sm:gap-4 pl-2">
                        <div className="relative w-10 h-10 sm:w-12 sm:h-12 shrink-0">
                            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                                <circle className="stroke-white/5" cx="18" cy="18" fill="none" r="16" strokeWidth="3"></circle>
                                <circle className="stroke-[#a60df2] drop-shadow-[0_0_8px_rgba(166,13,242,0.6)]" cx="18" cy="18" fill="none" r="16" strokeDasharray="100" strokeDashoffset="10" strokeLinecap="round" strokeWidth="3"></circle>
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center text-[9px] font-bold text-white">90%</div>
                        </div>
                        <div className="min-w-0">
                            <h4 className="text-white font-semibold text-sm sm:text-base truncate">Bio-Neural Interface</h4>
                            <p className="text-slate-400 text-[9px] sm:text-xs truncate">Lead: Neuro Linker</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 ml-2">
                        <div className="flex -space-x-2 hidden sm:flex">
                            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-[#110816] bg-cyan-900" />
                            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-[#110816] bg-cyan-800" />
                        </div>
                        <button className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-400 group-hover:bg-[#a60df2]/20 group-hover:text-white transition-colors">
                            <ChevronRight size={14} />
                        </button>
                    </div>
                </div>

            </div>

            <div className="mt-3 flex justify-center shrink-0">
                <a className="text-slate-500 hover:text-[#a60df2] text-[10px] sm:text-sm font-medium flex items-center gap-2 transition-colors group cursor-pointer">
                    View All Project Architectures
                    <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </a>
            </div>

        </div>
    );
}
