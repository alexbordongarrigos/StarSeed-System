import React from 'react';
import { MessageSquare, MoreVertical, Edit2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function MessagesWidget() {
    const messages = [
        { id: 1, sender: 'Nexus Prime', text: 'Sincronización de nodo completada.', time: 'ahora', unread: true, color: 'from-cyan-400 to-blue-500' },
        { id: 2, sender: 'Lyra', text: '¿Revisaste las nuevas variables de estado?', time: '12m', unread: true, color: 'from-purple-400 to-pink-500' },
        { id: 3, sender: 'Consejo Alpha', text: 'Votación abierta: Enmienda 42', time: '1h', unread: false, color: 'from-amber-400 to-orange-500' },
    ];

    return (
        <div className="w-full h-full bg-slate-900/60 backdrop-blur-3xl rounded-xl relative overflow-hidden flex flex-col p-5 border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] text-white font-display">

            {/* Header */}
            <header className="flex items-center justify-between pb-4 border-b border-white/10 shrink-0 z-10 relative">
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.4)]">
                        <MessageSquare size={16} className="text-white drop-shadow-md" />
                    </div>
                    <div>
                        <h1 className="text-[10px] uppercase tracking-[0.3em] text-indigo-200 mt-1">Transmisiones</h1>
                        <h2 className="text-sm font-semibold text-white tracking-wide">MENSAJES RECIBIDOS</h2>
                    </div>
                </div>

                <div className="flex gap-2">
                    <button className="h-7 w-7 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-white">
                        <Edit2 size={12} />
                    </button>
                    <button className="h-7 w-7 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-white">
                        <MoreVertical size={12} />
                    </button>
                </div>
            </header>

            {/* Message List */}
            <main className="flex-1 overflow-y-auto mt-4 space-y-3 pr-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent z-10 relative">
                {messages.map(msg => (
                    <div key={msg.id} className="group cursor-pointer relative">
                        {/* Background Glow for unread */}
                        {msg.unread && (
                            <div className="absolute inset-0 bg-indigo-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        )}
                        <div className={cn(
                            "flex items-start gap-3 p-3 rounded-xl border transition-all relative z-10",
                            msg.unread ? "bg-white/10 border-indigo-500/30 hover:border-indigo-400/50 hover:bg-white/15" : "bg-white/5 border-white/5 hover:bg-white/10"
                        )}>
                            {/* Avatar */}
                            <div className={cn("w-8 h-8 shrink-0 rounded-full bg-gradient-to-tr shadow-inner", msg.color)}></div>

                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-center mb-0.5">
                                    <h3 className={cn("text-xs font-semibold truncate", msg.unread ? "text-white" : "text-white/70")}>{msg.sender}</h3>
                                    <span className="text-[9px] text-white/40 font-mono shrink-0 ml-2">{msg.time}</span>
                                </div>
                                <p className={cn("text-[11px] truncate", msg.unread ? "text-indigo-100 font-medium" : "text-white/50")}>{msg.text}</p>
                            </div>

                            {/* Unread dot */}
                            {msg.unread && (
                                <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.8)] mt-2"></div>
                            )}
                        </div>
                    </div>
                ))}
            </main>

            {/* Overlays */}
            <div className="absolute inset-0 border border-white/5 rounded-xl pointer-events-none mix-blend-overlay"></div>
        </div>
    );
}
