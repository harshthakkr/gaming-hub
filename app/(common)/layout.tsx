"use client";

import { SessionProvider } from "next-auth/react";
import { CollectionProvider } from "@/context/CollectionContext";
import { PageShell } from "@/components/overdrive/PageShell";
import { TopBar } from "@/components/overdrive/TopBar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <CollectionProvider>
        <PageShell>
          <TopBar />
          {children}
        </PageShell>
      </CollectionProvider>
    </SessionProvider>
  );
}
