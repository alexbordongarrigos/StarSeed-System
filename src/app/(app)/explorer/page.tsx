"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Search,
    Sparkles,
    Mic,
    Globe,
    BookOpen,
    Palette,
    Cpu,
    Users,
    ArrowRight,
    Copy,
    Download,
    Bot,
    Filter,
    BrainCircuit,
    Compass
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { toast } from "sonner";

// --- Types ---

type Domain = 'ALL' | 'POLITICS' | 'EDUCATION' | 'CULTURE' | 'SYSTEM';
type AgentPersona = 'RESEARCHER' | 'CREATIVE' | 'ACTIVIST' | 'SYSTEM_ARCHITECT';

interface SearchResult {
    id: string;
    title: string;
    description: string;
    type: string;
    domain: Domain;
    relevance: number;
    tags: string[];
}

// --- Mock Data ---

const mockResults: SearchResult[] = [
    { id: "1", title: "Propuesta de Holocracia Cuántica", description: "Un marco de gobernanza descentralizada basado en nodos fractales y contratos inteligentes ontocráticos.", type: "DOC", domain: "POLITICS", relevance: 98, tags: ["governance", "web3", "democracy"] },
    { id: "2", title: "Curso: Historia del Futuro", description: "Módulo educativo interactivo sobre la evolución transhumanista y paradigmas postcapitalistas.", type: "COURSE", domain: "EDUCATION", relevance: 95, tags: ["history", "transhumanism"] },
    { id: "3", title: "Pack de Texturas Biomecánicas v2", description: "Assets 3D de alta resolución con superficies orgánico-tecnológicas para entornos virtuales inmersivos.", type: "ASSET", domain: "CULTURE", relevance: 88, tags: ["3d", "art", "creative"] },
    { id: "4", title: "Monitor de Red Neural StarSeed", description: "Herramienta de diagnóstico en tiempo real para analizar la salud y sincronía de los nodos de la red.", type: "APP", domain: "SYSTEM", relevance: 92, tags: ["dev", "network", "tool"] },
    { id: "5", title: "Manifiesto Ontocrático v3.1", description: "Documento fundacional que define los principios de mérito, transparencia y gobernanza descentralizada de StarSeed.", type: "DOC", domain: "POLITICS", relevance: 97, tags: ["ontocracy", "manifesto", "governance"] },
    { id: "6", title: "Física Cuántica Aplicada: Guía Avanzada", description: "Tratado completo sobre entrelazamiento cuántico, no-localidad y sus implicaciones para sistemas conscientes.", type: "ARTICLE", domain: "EDUCATION", relevance: 91, tags: ["quantum", "physics", "consciousness"] },
    { id: "7", title: "Colección Musical: Frequencies 001", description: "Álbum de 12 pistas generadas algorítmicamente con frecuencias de resonancia binaural para estados elevados.", type: "AUDIO", domain: "CULTURE", relevance: 84, tags: ["music", "binaural", "generative"] },
    { id: "8", title: "API: Exocortex Personal v0.9", description: "Interfaz para conectar agentes IA personales con el grafo de conocimiento colectivo de StarSeed.", type: "APP", domain: "SYSTEM", relevance: 89, tags: ["api", "ai", "exocortex"] },
    { id: "9", title: "Curso: Permacultura Digital Regenerativa", description: "Aplicación de principios de permacultura al diseño de sistemas digitales sostenibles y comunidades en red.", type: "COURSE", domain: "EDUCATION", relevance: 86, tags: ["permaculture", "ecology", "systems"] },
    { id: "10", title: "Exposición: Geometría Sagrada Generativa", description: "40 obras de arte generativo basadas en patrones de la naturaleza con código fuente abierto para replicar.", type: "ASSET", domain: "CULTURE", relevance: 80, tags: ["sacred-geometry", "generative", "open-source"] },
    { id: "11", title: "Constitución de Seeds: Economía Libre", description: "Protocolo económico basado en contribución real, con mecanismos anti-acumulación y flujo libre de recursos en la red.", type: "DOC", domain: "POLITICS", relevance: 94, tags: ["economy", "seeds", "anti-monopoly"] },
];

export default function ExplorerPage() {
    const [query, setQuery] = useState("");
    const [activeDomain, setActiveDomain] = useState<Domain>('ALL');
    const [activeAgent, setActiveAgent] = useState<AgentPersona>('RESEARCHER');
    const [isSearching, setIsSearching] = useState(false);

    const handleSearch = () => {
        setIsSearching(true);
        // Simulate AI search delay
        setTimeout(() => setIsSearching(false), 1500);
    };

    const handleReplicate = (itemTitle: string) => {
        toast.success(`"${itemTitle}" replicado en tu Biblioteca.`);
    };

    const filteredResults = mockResults.filter(r =>
        (activeDomain === 'ALL' || r.domain === activeDomain) &&
        (r.title.toLowerCase().includes(query.toLowerCase()) || r.description.toLowerCase().includes(query.toLowerCase()))
    );

    return (
        <div className="flex flex-col min-h-screen pb-20 px-[clamp(0.75rem,2vw,2rem)] py-[clamp(0.75rem,1.5vw,1.5rem)] max-w-[1200px] mx-auto gap-[clamp(1.5rem,3vw,3rem)]">

            {/* --- HERO SECTION: Neural Search --- */}
            <div className="flex flex-col items-center justify-center gap-[clamp(1rem,2vw,2rem)] mt-[clamp(1.5rem,4vw,5rem)]">

                <div className="text-center space-y-[clamp(0.25rem,0.75vw,1rem)] relative z-10 max-w-2xl">
                    <div className="flex items-center justify-center gap-3 mb-2">
                        <div className="p-2.5 rounded-2xl bg-primary/20 text-primary backdrop-blur-md">
                            <Compass className="w-8 h-8" />
                        </div>
                        <Badge variant="outline" className="border-primary/30 text-primary/80 tracking-widest uppercase text-[10px] font-semibold">
                            Red Global
                        </Badge>
                    </div>
                    <h1 className="page-title font-headline text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 filter drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                        Explorador Universal
                    </h1>
                    <p className="page-subtitle text-muted-foreground mx-auto">
                        Navega por el conocimiento colectivo, perfiles destacados, y herramientas del ecosistema.
                    </p>
                </div>

                {/* Neural Input Interface */}
                <div className="w-full max-w-3xl relative z-10 mt-6">
                    {/* Context/Agent Ring */}
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md border border-primary/30 px-4 py-1.5 rounded-full flex items-center gap-2 text-xs font-medium text-primary shadow-[0_0_15px_rgba(56,189,248,0.2)]">
                        <Bot className="w-3 h-3" />
                        <span className="text-muted-foreground">Agente Activo:</span>
                        <Select value={activeAgent} onValueChange={(v) => setActiveAgent(v as AgentPersona)}>
                            <SelectTrigger className="h-6 border-0 bg-transparent text-primary p-0 text-xs w-auto gap-1 focus:ring-0">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-black/90 border-white/10">
                                <SelectItem value="RESEARCHER">Investigador Riguroso</SelectItem>
                                <SelectItem value="CREATIVE">Musa Creativa</SelectItem>
                                <SelectItem value="ACTIVIST">Activista Social</SelectItem>
                                <SelectItem value="SYSTEM_ARCHITECT">Arquitecto de Sistemas</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Search Controls */}
                    <div className="flex flex-col md:flex-row gap-4 relative z-20">
                        <div className="flex-1 relative group">
                            <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity rounded-xl pointer-events-none" />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5 group-focus-within:text-primary transition-colors" />
                            <Input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Busca nodos, artículos, herramientas o personas..."
                                className="w-full pl-12 pr-12 h-14 text-base backdrop-blur-xl bg-background/40 border-primary/20 focus-visible:border-primary/50 focus-visible:ring-1 focus-visible:ring-primary/30"
                                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                            />
                            <Button
                                size="icon"
                                variant="ghost"
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary btn-pill"
                            >
                                <Mic className="w-5 h-5" />
                            </Button>
                        </div>
                        <Button onClick={handleSearch} size="lg" className="h-14 px-8 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transition-all duration-300">
                            {isSearching ? <Sparkles className="w-5 h-5 animate-spin" /> : "Explorar"}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-2 md:gap-4 px-4">
                {[
                    { id: 'ALL', label: 'Todo', icon: Globe },
                    { id: 'POLITICS', label: 'Política', icon: Users },
                    { id: 'EDUCATION', label: 'Educación', icon: BookOpen },
                    { id: 'CULTURE', label: 'Cultura', icon: Palette },
                    { id: 'SYSTEM', label: 'Sistema', icon: Cpu },
                ].map((scope) => (
                    <button
                        key={scope.id}
                        onClick={() => setActiveDomain(scope.id as Domain)}
                        className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border",
                            activeDomain === scope.id
                                ? "bg-primary text-primary-foreground border-primary shadow-lg scale-105"
                                : "bg-background/30 text-muted-foreground border-white/10 hover:text-white hover:bg-white/5"
                        )}
                    >
                        <scope.icon className="w-4 h-4" />
                        {scope.label}
                    </button>
                ))}
            </div>

            {/* --- RESULTS MATRIX --- */}
            <div className="space-y-6 px-[clamp(0.75rem,2vw,2rem)]">
                <div className="flex items-center justify-between text-sm text-muted-foreground border-b border-white/5 pb-2">
                    <span>Resultados ({filteredResults.length})</span>
                    <div className="flex items-center gap-2 cursor-pointer hover:text-white"><Filter className="w-3 h-3" /> Filtros Avanzados</div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                    {filteredResults.map((result) => (
                        <GlassCard key={result.id} className="p-0 flex flex-col md:flex-row overflow-hidden group hover:border-primary/50 transition-colors">
                            {/* Visual/Icon Area */}
                            <div className={cn(
                                "w-full md:w-32 bg-gradient-to-br flex items-center justify-center p-6",
                                result.domain === 'POLITICS' && "from-orange-500/20 to-red-600/10 text-orange-400",
                                result.domain === 'EDUCATION' && "from-blue-500/20 to-cyan-600/10 text-blue-400",
                                result.domain === 'CULTURE' && "from-purple-500/20 to-pink-600/10 text-purple-400",
                                result.domain === 'SYSTEM' && "from-emerald-500/20 to-green-600/10 text-emerald-400",
                            )}>
                                <BrainCircuit className="w-10 h-10 opacity-80" />
                            </div>

                            {/* Content */}
                            <div className="flex-1 p-5 flex flex-col gap-3">
                                <div className="flex justify-between items-start">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <Badge variant="outline" className="text-[10px] py-0 h-5 border-white/10">{result.type}</Badge>
                                            <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{result.domain}</span>
                                        </div>
                                        <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">{result.title}</h3>
                                    </div>
                                    <span className="text-xs font-mono text-emerald-400">{result.relevance}% Match</span>
                                </div>

                                <p className="text-sm text-gray-400 line-clamp-2">{result.description}</p>

                                <div className="flex gap-2 mt-auto pt-2">
                                    {result.tags.map(tag => (
                                        <span key={tag} className="text-[10px] text-muted-foreground">#{tag}</span>
                                    ))}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="p-4 border-l border-white/5 flex flex-col items-center justify-center gap-2 bg-black/20">
                                <Button onClick={() => handleReplicate(result.title)} size="sm" className="w-full gap-2 bg-white/5 hover:bg-white/20 text-white border border-white/10">
                                    <Copy className="w-3 h-3" /> Replicar
                                </Button>
                                <Button size="sm" variant="ghost" className="w-full gap-2 text-muted-foreground hover:text-white">
                                    <ArrowRight className="w-3 h-3" /> Abrir
                                </Button>
                            </div>
                        </GlassCard>
                    ))}
                </div>
            </div>
        </div>
    );
}
