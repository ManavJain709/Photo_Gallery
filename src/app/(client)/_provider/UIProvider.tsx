// app/providers.tsx
"use client";

import { NextUIProvider } from "@nextui-org/react";

export function UIProviders({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider className="h-full w-full">
      <main className="light text-foreground bg-background h-full w-full">
        {children}
      </main>
    </NextUIProvider>
  );
}
