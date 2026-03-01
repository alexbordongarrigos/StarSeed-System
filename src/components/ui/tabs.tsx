"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import * as React from "react";

import { useAppearance } from "@/context/appearance-context";
import { cn } from "@/lib/utils";

const Tabs = TabsPrimitive.Root;

// Lazy import SplineUIWrapper — avoids build failure from @splinetool/react-spline exports issue
const SplineUIWrapper = React.lazy(() => import("./spline-ui-wrapper").then(m => ({ default: m.SplineUIWrapper })));

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => {
  const { config } = useAppearance();
  // Check for 'glass' preset being active OR 'primary' mode
  // config.styling.style does not exist. We check crystalPreset or mode.
  const isGlassPreset = config.styling.crystalPreset !== 'none';
  const isPrimary = config.themeStore.activeMode === 'primary';
  const isCrystal = isGlassPreset || isPrimary;

  if (isPrimary) {
    return (
      <div className="relative group/tabs inline-flex items-center justify-center rounded-lg overflow-hidden border border-white/10 shadow-lg bg-black/10 backdrop-blur-[2px]">
        <React.Suspense fallback={null}>
          <SplineUIWrapper
            sceneUrl="https://prod.spline.design/f-FmokKwZQASiVE9/scene.splinecode"
            className="absolute inset-0 z-0 opacity-80 group-hover/tabs:opacity-100 transition-opacity duration-500 pointer-events-none"
          />
        </React.Suspense>
        <TabsPrimitive.List
          ref={ref}
          className={cn(
            "inline-flex items-center justify-center rounded-full bg-transparent p-1 text-foreground relative z-10 w-full h-full drop-shadow-sm",
            className,
          )}
          {...props}
        />
      </div>
    )
  }

  return (
    <TabsPrimitive.List
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-full p-1 text-muted-foreground/70 bento-base",
        isCrystal && "crystal-tab-list bg-transparent",
        className,
      )}
      {...props}
    />
  );
});
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => {
  const { config } = useAppearance();
  // Check for 'glass' preset being active OR 'primary' mode
  const isGlassPreset = config.styling.crystalPreset !== 'none';
  const isPrimary = config.themeStore.activeMode === 'primary';
  const isCrystal = isGlassPreset || isPrimary;

  if (isPrimary) {
    return (
      <TabsPrimitive.Trigger
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-full px-5 py-2 text-sm font-medium outline-offset-2 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:opacity-50",
          "text-foreground/70 hover:text-foreground data-[state=active]:bg-foreground/10 data-[state=active]:text-foreground data-[state=active]:shadow-lg border border-transparent data-[state=active]:border-foreground/20 backdrop-blur-sm",
          className,
        )}
        {...props}
      />
    );
  }

  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-full px-5 py-2 text-sm font-medium outline-offset-2 transition-all hover:text-muted-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm data-[state=active]:shadow-black/5",
        isCrystal && "crystal-tab-trigger data-[state=active]:bg-transparent data-[state=active]:shadow-none",
        className,
      )}
      {...props}
    />
  );
});
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70",
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsContent, TabsList, TabsTrigger };
