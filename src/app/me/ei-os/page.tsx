
'use client';

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { WhatsMAPEngine } from "@/components/intelligence-os/whatsmap-engine";
import { WorkspaceSidebar } from "@/components/workspace-sidebar";
import CommunityHubPage from "@/app/me/community/page";
import LeadIntelligencePage from "@/app/me/lead-intelligence/page";
import MetaIntelligencePage from "@/app/me/meta-intelligence/page";
import CreativeHubPage from "@/app/me/creative-hub/page";
import ListingPortalPage from "@/app/me/listing-portal/page";
import SuperSellerSuitePage from "@/app/me/super-seller-suite/page";
import CloudIntelligencePage from "@/app/me/cloud-intelligence/page";
import { useState } from "react";

export default function EIOSPage() {
    const [activeTab, setActiveTab] = useState("community");

    return (
        <TooltipProvider delayDuration={0}>
            <ResizablePanelGroup
                direction="horizontal"
                className="h-full max-h-screen items-stretch bg-background"
                id="main-layout"
            >
                <ResizablePanel defaultSize={5} minSize={5} maxSize={8} id="sidebar-panel">
                    <WorkspaceSidebar />
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={65} minSize={40} id="main-panel">
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col h-full">
                        <div className="bg-background/95 p-2 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
                            <TabsList className="grid w-full grid-cols-7">
                                <TabsTrigger value="community">Community</TabsTrigger>
                                <TabsTrigger value="lead-intelligence">Leads</TabsTrigger>
                                <TabsTrigger value="listing-intelligence">Listings</TabsTrigger>
                                <TabsTrigger value="meta-intelligence">Meta</TabsTrigger>
                                <TabsTrigger value="creative-intelligence">Creative</TabsTrigger>
                                <TabsTrigger value="super-seller-suite">Seller Suite</TabsTrigger>
                                <TabsTrigger value="cloud-intelligence">Cloud</TabsTrigger>
                            </TabsList>
                        </div>
                        <div className="flex-grow overflow-y-auto">
                            <TabsContent value="community" className="m-0 h-full">
                                <ScrollArea className="h-full">
                                    <CommunityHubPage />
                                </ScrollArea>
                            </TabsContent>
                            <TabsContent value="lead-intelligence" className="m-0 h-full">
                               <ScrollArea className="h-full">
                                    <LeadIntelligencePage />
                                </ScrollArea>
                            </TabsContent>
                            <TabsContent value="listing-intelligence" className="m-0 h-full">
                               <ScrollArea className="h-full">
                                    <ListingPortalPage />
                                </ScrollArea>
                            </TabsContent>
                            <TabsContent value="meta-intelligence" className="m-0 h-full">
                               <ScrollArea className="h-full">
                                    <MetaIntelligencePage />
                                </ScrollArea>
                            </TabsContent>
                            <TabsContent value="creative-intelligence" className="m-0 h-full">
                               <ScrollArea className="h-full">
                                    <CreativeHubPage />
                                </ScrollArea>
                            </TabsContent>
                            <TabsContent value="super-seller-suite" className="m-0 h-full">
                               <ScrollArea className="h-full">
                                    <SuperSellerSuitePage />
                                </ScrollArea>
                            </TabsContent>
                            <TabsContent value="cloud-intelligence" className="m-0 h-full">
                               <ScrollArea className="h-full">
                                    <CloudIntelligencePage />
                                </ScrollArea>
                            </TabsContent>
                        </div>
                    </Tabs>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={30} minSize={20} id="whatsmap-panel">
                    <WhatsMAPEngine activeSuite={activeTab} />
                </ResizablePanel>
            </ResizablePanelGroup>
        </TooltipProvider>
    );
}
