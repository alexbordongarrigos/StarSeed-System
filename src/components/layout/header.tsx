"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { UserNav } from "./user-nav";
import { NotificationCenter } from "./notification-center";

export function AppHeader() {
  return (
    <header
      className="flex items-center gap-[clamp(0.5rem,1vw,1rem)] border-b bg-background/80 backdrop-blur-xl transition-all duration-300"
      style={{
        height: 'clamp(3rem, 4vw, 3.75rem)',
        paddingInline: 'clamp(0.75rem, 2vw, 1.5rem)',
      }}
    >
      {/* Search Bar — Centered, fluid width */}
      <div className="flex-1 flex justify-center">
        <form className="w-full max-w-[clamp(16rem,40vw,28rem)]">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar funciones, documentos..."
              className="w-full appearance-none bg-background/80 pl-8 shadow-none rounded-[var(--radius-xl)]"
              style={{ fontSize: 'var(--text-fluid-sm)' }}
            />
          </div>
        </form>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-[clamp(0.25rem,0.5vw,0.5rem)]">
        <NotificationCenter />
        <UserNav />
      </div>
    </header>
  );
}
