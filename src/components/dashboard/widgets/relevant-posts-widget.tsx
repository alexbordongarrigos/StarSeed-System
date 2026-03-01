import React, { useState } from 'react';
import { Layers, Zap, Hexagon, Feather, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export function RelevantPostsWidget() {
    const [activeTab, setActiveTab] = useState<'all' | 'ontocracy' | 'nexus'>('all');

    const tabs = [
        { id: 'all', label: 'Global', icon: Layers },
        { id: 'ontocracy', label: 'Ontocracia', icon: Hexagon },
        { id: 'nexus', label: 'Nexus', icon: Zap },
    ] as const;

    const posts = [
        { id: 1, type: 'nexus', tag: 'Actualización', title: 'Nueva versión del motor cuántico v4.2', author: 'Nexus Core', time: '2h' },
        { id: 2, type: 'ontocracy', tag: 'Propuesta', title: 'Ajuste de parámetros éticos en la red', author: 'Consejo Alpha', time: '5h' },
        { id: 3, type: 'culture', tag: 'Arte', title: 'Exhibición: Sueños del Silicio Transparente', author: 'Lyra', time: '12h' },
    ];

    return (
        <div className="w-full h-full bg-slate-900/60 backdrop-blur-3xl rounded-xl relative overflow-hidden flex flex-col p-5 border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] text-white font-display">

            {/* Header */}
            <header className="flex items-center justify-between pb-3 shrink-0 z-10 relative">
                <div className="flex items-center gap-2">
                    <Feather size={14} className="text-purple-400" />
                    <h2 className="text-[10px] font-semibold text-white tracking-widest uppercase">Destacados</h2>
                </div>
                <button className="text-[9px] uppercase tracking-wider text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1 font-semibold">
                    Ver Red <ChevronRight size={10} />
                </button>
            </header>

            {/* Elegant Tabs */}
            <div className="flex gap-1 p-1 bg-black/40 rounded-lg border border-white/5 mb-4 relative z-10">
                {tabs.map(tab => {
                    const isActive = activeTab === tab.id;
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as 'all' | 'ontocracy' | 'nexus')}
                            className={cn(
                                "flex-1 flex items-center justify-center gap-1.5 py-1.5 text-[10px] uppercase tracking-wider font-semibold rounded-md transition-all",
                                isActive
                                    ? "bg-purple-500/20 text-purple-200 shadow-[0_0_10px_rgba(168,85,247,0.2)] border border-purple-500/30"
                                    : "text-white/40 hover:text-white/70 hover:bg-white/5"
                            )}
                        >
                            <Icon size={10} />
                            {tab.label}
                        </button>
                    )
                })}
            </div>

            {/* Posts List */}
            <main className="flex-1 space-y-2 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-white/10 z-10 relative">
                {posts.map(post => (
                    <div key={post.id} className="p-3 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-purple-500/30 rounded-lg transition-all cursor-pointer group">
                        <div className="flex justify-between items-start mb-1">
                            <span className={cn(
                                "text-[8px] uppercase tracking-widest px-1.5 py-0.5 rounded border font-semibold",
                                post.type === 'nexus' ? "text-cyan-300 border-cyan-500/30 bg-cyan-500/10" :
                                    post.type === 'ontocracy' ? "text-amber-300 border-amber-500/30 bg-amber-500/10" :
                                        "text-pink-300 border-pink-500/30 bg-pink-500/10"
                            )}>
                                {post.tag}
                            </span>
                            <span className="text-[9px] text-white/40 font-mono">{post.time}</span>
                        </div>
                        <h3 className="text-xs font-medium text-white/90 group-hover:text-purple-300 transition-colors leading-snug mb-1">
                            {post.title}
                        </h3>
                        <p className="text-[10px] text-white/50">Por <span className="text-white/70">{post.author}</span></p>
                    </div>
                ))}
            </main>

            {/* Overlays */}
            <div className="absolute inset-0 border border-white/5 rounded-xl pointer-events-none mix-blend-overlay z-20"></div>
        </div>
    );
}
