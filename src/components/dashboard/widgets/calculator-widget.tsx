import React, { useState } from 'react';
import { Calculator, Equal, Delete, History } from 'lucide-react';
import { cn } from '@/lib/utils';

export function CalculatorWidget() {
    const [display, setDisplay] = useState('0');

    // Aesthetic placeholder functions
    const handlePress = (val: string) => {
        if (display === '0') setDisplay(val);
        else if (display.length < 12) setDisplay(display + val);
    };

    const clear = () => setDisplay('0');

    const gridBtn = (label: string, colSpan = 1, isAction = false, isAccent = false) => (
        <button
            onClick={() => isAction ? (label === 'C' ? clear() : null) : handlePress(label)}
            className={cn(
                "h-10 rounded-lg flex items-center justify-center text-sm font-medium transition-all active:scale-95 border",
                colSpan > 1 && `col-span-${colSpan}`,
                isAccent
                    ? "bg-amber-500/20 text-amber-300 border-amber-500/30 hover:bg-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.2)]"
                    : isAction
                        ? "bg-cyan-500/10 text-cyan-300 border-cyan-500/20 hover:bg-cyan-500/20"
                        : "bg-white/5 text-white border-white/5 hover:bg-white/10 hover:border-white/10 backdrop-blur-md"
            )}
        >
            {label}
        </button>
    );

    return (
        <div className="w-full h-full bg-slate-900/60 backdrop-blur-3xl rounded-xl relative overflow-hidden flex flex-col p-4 border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] text-white font-display group">
            {/* Background Effects */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-cyan-500/10 opacity-30 pointer-events-none group-hover:rotate-12 transition-transform duration-1000"></div>

            {/* Header */}
            <header className="flex items-center justify-between pb-3 shrink-0 z-10 relative">
                <div className="flex items-center gap-2">
                    <Calculator size={14} className="text-amber-400" />
                    <h2 className="text-[10px] font-semibold text-white tracking-widest uppercase">Calculadora Cuántica</h2>
                </div>
                <button className="text-white/40 hover:text-white transition-colors">
                    <History size={14} />
                </button>
            </header>

            {/* Display Screen */}
            <div className="mb-4 relative z-10">
                <div className="absolute inset-0 bg-cyan-900/20 blur-md rounded-lg"></div>
                <div className="relative bg-black/40 border border-cyan-500/30 rounded-lg p-3 flex flex-col items-end justify-end h-16 shadow-[inset_0_2px_15px_rgba(0,0,0,0.5)]">
                    <span className="text-cyan-400/50 text-[10px] absolute top-2 left-3 font-mono tracking-widest">OUTPUT</span>
                    <span className="text-2xl font-mono text-cyan-50 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)] tracking-tighter truncate w-full text-right">{display}</span>
                </div>
            </div>

            {/* Keypad */}
            <div className="flex-1 grid grid-cols-4 gap-2 z-10 relative font-mono">
                {gridBtn('C', 1, true)}
                {gridBtn('±', 1, true)}
                {gridBtn('%', 1, true)}
                {gridBtn('/', 1, true, true)}

                {gridBtn('7')}
                {gridBtn('8')}
                {gridBtn('9')}
                {gridBtn('X', 1, true, true)}

                {gridBtn('4')}
                {gridBtn('5')}
                {gridBtn('6')}
                {gridBtn('-', 1, true, true)}

                {gridBtn('1')}
                {gridBtn('2')}
                {gridBtn('3')}
                {gridBtn('+', 1, true, true)}

                {gridBtn('0', 2)}
                {gridBtn('.')}
                <button
                    className="h-10 rounded-lg flex items-center justify-center text-sm font-medium transition-all active:scale-95 border bg-gradient-to-br from-amber-500 to-orange-600 text-white border-white/20 shadow-[0_0_20px_rgba(245,158,11,0.4)]"
                >
                    <Equal size={16} />
                </button>
            </div>

            {/* Glass Overlays */}
            <div className="absolute inset-0 border border-white/5 rounded-xl pointer-events-none mix-blend-overlay"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none rounded-xl"></div>
        </div>
    );
}
