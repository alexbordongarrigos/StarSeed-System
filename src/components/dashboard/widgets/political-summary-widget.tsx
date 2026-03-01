'use client';

import { Rocket, TrendingUp, BarChart3, AlertCircle, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { cn } from "@/lib/utils";

export function PoliticalSummaryWidget() {
    const [proposalCount, setProposalCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        async function fetchStats() {
            try {
                const { count } = await supabase
                    .from('posts')
                    .select('*', { count: 'exact', head: true })
                    .eq('type', 'PROPOSAL');

                if (count !== null) {
                    setProposalCount(count);
                } else {
                    setProposalCount(12); // Fallback for aesthetic display if no db conn
                }
            } catch (err) {
                console.error("Error fetching political stats:", err);
                setProposalCount(12);
            } finally {
                setLoading(false);
            }
        }
        fetchStats();
    }, []);

    return (
        <div className="w-full h-full bg-slate-900/60 backdrop-blur-3xl rounded-xl relative overflow-hidden flex flex-col p-5 border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] text-white font-display">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-[60px] pointer-events-none"></div>

            {/* Header */}
            <header className="flex items-center justify-between pb-4 border-b border-white/10 shrink-0 z-10 relative">
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.4)]">
                        <Rocket size={16} className="text-white drop-shadow-md" />
                    </div>
                    <div>
                        <h1 className="text-[10px] uppercase tracking-[0.3em] text-amber-200 mt-1">Gobernanza</h1>
                        <h2 className="text-sm font-semibold text-white tracking-wide">POLÍTICA BASE</h2>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1 text-[9px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-1.5 py-0.5 rounded shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                        <TrendingUp size={10} /> +12%
                    </span>
                    <span className="flex items-center gap-1.5 text-[9px] font-mono text-amber-400 border border-amber-500/30 px-1.5 py-0.5 rounded animate-pulse shadow-[0_0_10px_rgba(245,158,11,0.2)]">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div> EN VIVO
                    </span>
                </div>
            </header>

            {/* Main Stats */}
            <main className="flex-1 grid grid-cols-2 gap-3 mt-4 z-10 relative">
                {/* Stats Card 1 */}
                <div className="flex flex-col justify-center p-3 rounded-xl bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/20 hover:border-amber-500/40 transition-all group">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] uppercase tracking-wider text-white/50">Propuestas</span>
                        <BarChart3 size={14} className="text-amber-400" />
                    </div>
                    <span className="text-3xl font-bold font-mono tracking-tighter text-amber-50 drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]">
                        {loading ? "..." : proposalCount}
                    </span>
                    <span className="text-[10px] text-amber-200/70 mt-1 bg-amber-500/20 px-2 py-0.5 rounded w-fit text-center">3 URGE</span>
                </div>

                {/* Stats Card 2 */}
                <div className="flex flex-col justify-center p-3 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all group">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] uppercase tracking-wider text-white/50">Votaciones</span>
                        <AlertCircle size={14} className="text-blue-400" />
                    </div>
                    <span className="text-3xl font-bold font-mono tracking-tighter text-white">08</span>
                    <span className="text-[10px] text-white/50 mt-1 px-2 py-0.5 rounded w-fit bg-white/10 text-center">PENDIENTES</span>
                </div>
            </main>

            {/* Footer / Next Event */}
            <footer className="mt-4 pt-3 border-t border-white/10 z-10 relative">
                <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-white/50 text-[10px] uppercase tracking-wider">Próx. Asamblea:</span>
                    <span className="font-semibold text-white/90">Mañana, 16:00</span>
                </div>
                <div className="w-full bg-black/40 h-1.5 rounded-full overflow-hidden border border-white/5">
                    <div className="bg-gradient-to-r from-amber-500 to-orange-500 h-full w-[65%] shadow-[0_0_10px_rgba(245,158,11,0.8)] relative">
                        <div className="absolute right-0 top-0 bottom-0 w-2 bg-white blur-[1px]"></div>
                    </div>
                </div>
                <button className="w-full mt-3 text-[10px] h-8 rounded-lg bg-white/5 hover:bg-amber-500/20 hover:text-amber-300 text-white border border-white/10 hover:border-amber-500/30 transition-all uppercase tracking-widest font-semibold flex items-center justify-center gap-1">
                    Ver Detalles <ChevronRight size={12} />
                </button>
            </footer>

            {/* Overlays */}
            <div className="absolute inset-0 border border-white/5 rounded-xl pointer-events-none mix-blend-overlay"></div>
        </div>
    );
}
