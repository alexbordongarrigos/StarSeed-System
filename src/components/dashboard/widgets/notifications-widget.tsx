import React from 'react';
import { Bell, AlertTriangle, Info, CheckCircle, Flame } from 'lucide-react';
import { cn } from '@/lib/utils';

export function NotificationsWidget() {
    const notifications = [
        { id: 1, type: 'critical', title: 'Sobrecarga de Red P2P', desc: 'Banda ancha global en 98% de capacidad.', time: '2m', icon: Flame },
        { id: 2, type: 'warning', title: 'Anomalía Detectada', desc: 'Posible bifurcación en sector Terra-4.', time: '15m', icon: AlertTriangle },
        { id: 3, type: 'success', title: 'Bloque Minz Verificado', desc: 'Sincronización cuántica estable.', time: '1h', icon: CheckCircle },
        { id: 4, type: 'info', title: 'Actualización de Sistema', desc: 'Módulos V4 listos para descarga.', time: '3h', icon: Info },
    ];

    return (
        <div className="w-full h-full bg-slate-900/60 backdrop-blur-3xl rounded-xl relative overflow-hidden flex flex-col p-5 border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] text-white font-display">

            {/* Ambient Alert Glow - pulses if critical exists */}
            <div className="absolute top-0 right-0 w-full h-32 bg-gradient-to-b from-rose-500/10 to-transparent pointer-events-none animate-pulse"></div>

            {/* Header */}
            <header className="flex items-center justify-between pb-4 border-b border-white/10 shrink-0 z-10 relative">
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-rose-500 to-orange-600 flex items-center justify-center shadow-[0_0_15px_rgba(244,63,94,0.4)]">
                        <Bell size={16} className="text-white drop-shadow-md" />
                    </div>
                    <div>
                        <h1 className="text-[10px] uppercase tracking-[0.3em] text-rose-200 mt-1">Monitoreo Sensorial</h1>
                        <h2 className="text-sm font-semibold text-white tracking-wide">ALERTAS DEL SISTEMA</h2>
                    </div>
                </div>

                <button className="text-[9px] uppercase tracking-widest px-2 py-1 rounded bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-white/70">
                    Limpiar
                </button>
            </header>

            {/* Notifications List */}
            <main className="flex-1 overflow-y-auto mt-4 space-y-2 pr-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent z-10 relative">
                {notifications.map(note => {
                    const Icon = note.icon;
                    return (
                        <div key={note.id} className={cn(
                            "flex items-start gap-3 p-3 rounded-lg border transition-all cursor-default relative overflow-hidden group",
                            note.type === 'critical' ? "bg-rose-500/10 border-rose-500/30 hover:bg-rose-500/20" :
                                note.type === 'warning' ? "bg-amber-500/5 border-amber-500/20 hover:bg-amber-500/10" :
                                    note.type === 'success' ? "bg-emerald-500/5 border-emerald-500/20 hover:bg-emerald-500/10" :
                                        "bg-white/5 border-white/5 hover:bg-white/10"
                        )}>

                            {/* Side accent line */}
                            <div className={cn(
                                "absolute left-0 top-0 bottom-0 w-1 opacity-70 group-hover:opacity-100 transition-opacity",
                                note.type === 'critical' ? "bg-rose-500" :
                                    note.type === 'warning' ? "bg-amber-500" :
                                        note.type === 'success' ? "bg-emerald-500" :
                                            "bg-cyan-500"
                            )}></div>

                            <div className={cn(
                                "mt-0.5 shrink-0",
                                note.type === 'critical' ? "text-rose-400" :
                                    note.type === 'warning' ? "text-amber-400" :
                                        note.type === 'success' ? "text-emerald-400" :
                                            "text-cyan-400"
                            )}>
                                <Icon size={14} />
                            </div>

                            <div className="flex-1 min-w-0">
                                <h3 className="text-[11px] font-bold text-white mb-0.5 flex justify-between">
                                    {note.title}
                                    <span className="text-[9px] text-white/40 font-mono font-normal tracking-wider">{note.time}</span>
                                </h3>
                                <p className="text-[10px] text-white/60 leading-snug">{note.desc}</p>
                            </div>
                        </div>
                    )
                })}
            </main>

            {/* Overlays */}
            <div className="absolute inset-0 border border-white/5 rounded-xl pointer-events-none mix-blend-overlay"></div>
        </div>
    );
}
