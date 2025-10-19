
'use client';

import { WorkspaceSidebar } from "@/components/workspace-sidebar";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { TooltipProvider } from "@radix-ui/react-tooltip";

export default function WorkspaceLayout({
  children,
}: {
  children: React.Node;
}) {
  return (
    <TooltipProvider delayDuration={0}>
        <ResizablePanelGroup direction="horizontal" className="h-screen max-h-screen items-stretch">
            <ResizablePanel defaultSize={5} minSize={5} maxSize={8}>
                <WorkspaceSidebar />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={95}>
                {children}
            </ResizablePanel>
        </ResizablePanelGroup>
    </TooltipProvider>
  );
}
