import React from 'react';
import { Search, Bell, User, Layers, Settings, ZoomIn, ZoomOut } from 'lucide-react';

export function ExploreNetworkWidget() {
    return (
        <div className="w-full h-full bg-black/20 backdrop-blur-3xl rounded-xl relative overflow-hidden flex flex-col p-4 md:p-6 border border-white/10 shadow-[inset_0_0_20px_rgba(255,255,255,0.02)] text-white font-display">
            {/* Corner Decoration Accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-400/50 rounded-tl-xl pointer-events-none" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-white/20 rounded-tr-xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-white/20 rounded-bl-xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-fuchsia-500/50 rounded-br-xl pointer-events-none" />

            {/* Panel Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start z-10 gap-4 mb-4">
                <div className="space-y-1">
                    <h1 className="text-xl md:text-3xl font-light tracking-wider text-white uppercase font-display">Network Topology</h1>
                    <p className="text-cyan-400/70 text-[10px] md:text-xs tracking-[0.2em] font-medium uppercase">Hyper-Crystal Node Mapping</p>
                </div>

                <div className="flex flex-row sm:flex-col items-end gap-2 font-mono w-full sm:w-auto overflow-hidden">
                    <div className="flex items-center gap-2 md:gap-3 px-3 py-1.5 md:px-4 md:py-2 bg-black/40 border border-white/10 rounded-lg whitespace-nowrap">
                        <span className="h-2 w-2 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_10px_#22d3ee]"></span>
                        <span className="text-[10px] md:text-xs text-slate-400">ACTIVE:</span>
                        <span className="text-sm md:text-lg font-bold text-white tracking-tighter">1204</span>
                    </div>
                    <div className="flex items-center gap-2 md:gap-3 px-3 py-1.5 md:px-4 md:py-2 bg-black/40 border border-white/10 rounded-lg whitespace-nowrap">
                        <span className="h-2 w-2 bg-fuchsia-500 rounded-full animate-pulse shadow-[0_0_10px_#d946ef]"></span>
                        <span className="text-[10px] md:text-xs text-slate-400">SYNC:</span>
                        <span className="text-sm md:text-lg font-bold text-cyan-400 tracking-tighter">MAX</span>
                    </div>
                </div>
            </div>

            {/* 3D-Style Visualization Area */}
            <div className="flex-1 relative mt-2 flex items-center justify-center min-h-[150px]">
                {/* Central Hub Graphic */}
                <div className="absolute inset-0 flex items-center justify-center opacity-70 overflow-hidden">
                    <svg className="w-full h-full filter drop-shadow-[0_0_10px_rgba(34,211,238,0.2)]" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid meet">
                        {/* Connection Lines */}
                        <g stroke="rgba(255,255,255,0.1)" strokeWidth="1">
                            <line x1="400" y1="250" x2="200" y2="100" stroke="url(#cyan-grad-explore)" strokeWidth="2"></line>
                            <line x1="400" y1="250" x2="600" y2="100" stroke="url(#magenta-grad-explore)" strokeWidth="2"></line>
                            <line x1="400" y1="250" x2="650" y2="350" stroke="rgba(255,255,255,0.2)"></line>
                            <line x1="400" y1="250" x2="150" y2="350" stroke="rgba(255,255,255,0.2)"></line>
                            <line x1="200" y1="100" x2="600" y2="100" stroke="rgba(255,255,255,0.1)" strokeDasharray="5,5"></line>
                            <line x1="150" y1="350" x2="650" y2="350" stroke="rgba(255,255,255,0.1)" strokeDasharray="5,5"></line>
                        </g>

                        {/* Gradients */}
                        <defs>
                            <linearGradient id="cyan-grad-explore" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" style={{ stopColor: '#22d3ee', stopOpacity: 1 }}></stop>
                                <stop offset="100%" style={{ stopColor: '#3b82f6', stopOpacity: 0 }}></stop>
                            </linearGradient>
                            <linearGradient id="magenta-grad-explore" x1="100%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" style={{ stopColor: '#d946ef', stopOpacity: 1 }}></stop>
                                <stop offset="100%" style={{ stopColor: '#3b82f6', stopOpacity: 0 }}></stop>
                            </linearGradient>
                        </defs>

                        {/* Nodes */}
                        <circle cx="400" cy="250" r="12" fill="#22d3ee" className="animate-pulse"></circle>
                        <circle cx="200" cy="100" r="8" fill="#ffffff" fillOpacity="0.8"></circle>
                        <circle cx="600" cy="100" r="8" fill="#ffffff" fillOpacity="0.8"></circle>
                        <circle cx="650" cy="350" r="8" fill="#d946ef"></circle>
                        <circle cx="150" cy="350" r="8" fill="#ffffff" fillOpacity="0.8"></circle>

                        {/* Tiny floating nodes */}
                        <circle cx="320" cy="180" r="3" fill="#22d3ee"></circle>
                        <circle cx="480" cy="180" r="3" fill="#d946ef"></circle>
                        <circle cx="350" cy="320" r="3" fill="#ffffff"></circle>
                    </svg>
                </div>

                {/* Overlaying Data Tooltip Example (Desktop mostly focus) */}
                <div className="hidden sm:block absolute top-[40%] left-[65%] transform -translate-y-1/2 -translate-x-1/2 bg-white/5 backdrop-blur-xl p-3 md:p-4 border border-white/20 rounded-lg z-20 shadow-xl">
                    <div className="text-[9px] md:text-[10px] text-cyan-400 uppercase font-mono mb-1">Node Protocol Alpha</div>
                    <div className="text-white text-xs md:text-sm font-bold mb-2">Crystal_Mapping_09</div>
                    <div className="flex gap-4">
                        <div className="text-center">
                            <div className="text-[7px] md:text-[8px] text-slate-400">LATENCY</div>
                            <div className="text-[10px] md:text-xs text-white">4.2ms</div>
                        </div>
                        <div className="text-center">
                            <div className="text-[7px] md:text-[8px] text-slate-400">FLOW</div>
                            <div className="text-[10px] md:text-xs text-cyan-400">98%</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Panel Footer */}
            <div className="mt-auto flex flex-col sm:flex-row justify-between items-center z-10 pt-4 border-t border-white/5 gap-4">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <div className="px-2 py-1 md:px-3 border border-blue-500/30 bg-blue-500/10 rounded-full flex items-center shrink-0">
                        <span className="text-[8px] md:text-[10px] font-mono tracking-tighter text-blue-300">STREAM_ACTIVE</span>
                    </div>
                    <div className="text-[8px] md:text-[10px] font-mono text-slate-500 opacity-60 tracking-widest truncate">
                        DATA: 0x8F2A...9C1
                    </div>
                </div>

                <div className="flex gap-2 w-full sm:w-auto">
                    <button className="flex-1 sm:flex-none px-4 py-1.5 md:px-6 md:py-2 bg-white/5 hover:bg-white/10 rounded-full text-[10px] md:text-xs font-bold border border-white/10 transition-all uppercase tracking-widest whitespace-nowrap">
                        Reset
                    </button>
                    <button className="flex-1 sm:flex-none px-4 py-1.5 md:px-6 md:py-2 bg-blue-600 hover:bg-blue-500 rounded-full text-[10px] md:text-xs font-bold text-white transition-all uppercase tracking-widest shadow-[0_0_15px_rgba(37,99,235,0.4)] whitespace-nowrap">
                        Export Logs
                    </button>
                </div>
            </div>

            {/* Floating Decorative Elements strictly inside widget */}
            <div className="absolute bottom-4 left-4 w-32 h-32 bg-blue-600/20 blur-[60px] rounded-full pointer-events-none"></div>
            <div className="absolute top-4 right-4 w-40 h-40 bg-fuchsia-500/10 blur-[80px] rounded-full pointer-events-none"></div>
        </div>
    );
}
