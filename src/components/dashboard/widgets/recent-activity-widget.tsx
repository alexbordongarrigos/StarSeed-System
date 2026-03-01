'use client';

import { History, FileEdit, Users, Zap, CheckCircle2 } from "lucide-react";

export function RecentActivityWidget() {
    const activities = [
        { id: 1, icon: FileEdit, text: "Editaste 'Jardines Comunitarios'", time: "Hace 2h", color: "text-blue-400 bg-blue-500/10 border-blue-500/30" },
        { id: 2, icon: Zap, text: "Nueva propuesta viral", time: "Hace 5h", color: "text-amber-400 bg-amber-500/10 border-amber-500/30" },
        { id: 3, icon: Users, text: "Te uniste a 'Asamblea Norte'", time: "Ayer", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30" },
        { id: 4, icon: CheckCircle2, text: "Tarea completada", time: "Ayer", color: "text-purple-400 bg-purple-500/10 border-purple-500/30" },
    ];

    return (
        <div className="w-full h-full bg-slate-900/60 backdrop-blur-3xl rounded-xl relative overflow-hidden flex flex-col p-5 border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] text-white font-display">
            {/* Ambient Background Effects */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-[50px] pointer-events-none"></div>

            <header className="flex items-center justify-between pb-4 border-b border-white/10 shrink-0 z-10 relative">
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                        <History size={16} className="text-white/80" />
                    </div>
                    <div>
                        <h1 className="text-[10px] uppercase tracking-[0.3em] text-white/50 mt-1">Bitácora</h1>
                        <h2 className="text-sm font-semibold text-white tracking-wide">ACTIVIDAD RECIENTE</h2>
                    </div>
                </div>
            </header>

            <main className="flex-1 space-y-4 overflow-y-auto mt-4 pr-1 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent z-10 relative">
                {activities.map((activity, index) => (
                    <div key={activity.id} className="relative pl-8 pb-2 last:pb-0 group">
                        {/* Timeline line */}
                        {index !== activities.length - 1 && (
                            <div className="absolute left-[11px] top-7 bottom-[-10px] w-px bg-white/10 group-hover:bg-white/20 transition-colors" />
                        )}

                        {/* Timeline dot */}
                        <div className={`absolute left-0 top-1 h-6 w-6 rounded-full border flex items-center justify-center z-10 ${activity.color} shadow-sm group-hover:scale-110 transition-transform`}>
                            <activity.icon className="h-3 w-3" />
                        </div>

                        <div className="flex flex-col pt-1.5 hover:translate-x-1 transition-transform">
                            <span className="text-xs font-medium text-white/90">{activity.text}</span>
                            <span className="text-[10px] text-white/40 font-mono mt-0.5">{activity.time}</span>
                        </div>
                    </div>
                ))}
            </main>

            {/* Glass Overlay Effects */}
            <div className="absolute inset-0 border border-white/5 rounded-xl pointer-events-none mix-blend-overlay"></div>
        </div>
    );
}
