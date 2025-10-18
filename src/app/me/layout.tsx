
'use client';

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { WhatsMAPEngine } from "@/components/intelligence-os/whatsmap-engine";
import { WorkspaceSidebar } from "@/components/workspace-sidebar";
import { EIOSPage } from "@/app/me/ei-os/page"; // Assuming EIOSPage is the main component

export default function EIOSLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    return (
        <TooltipProvider delayDuration={0}>
            <ResizablePanelGroup
                direction="horizontal"
                className="h-full max-h-screen items-stretch bg-background"
            >
                <ResizablePanel defaultSize={5} minSize={5} maxSize={8}>
                    <WorkspaceSidebar />
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={65} minSize={40}>
                    {children}
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={30} minSize={20}>
                    <WhatsMAPEngine activeSuite="community" />
                </ResizablePanel>
            </ResizablePanelGroup>
        </TooltipProvider>
    );
}
