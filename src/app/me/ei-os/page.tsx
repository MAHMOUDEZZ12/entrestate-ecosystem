
'use client';

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { WhatsMAPEngine } from "@/components/intelligence-os/whatsmap-engine";
import { WorkspaceSidebar } from "@/components/workspace-sidebar";
import  CommunityHubPage  from "@/app/me/community/page";
import  LeadIntelligencePage  from "@/app/me/lead-intelligence/page";
import  MetaIntelligencePage  from "@/app/me/meta-intelligence/page";
import  CreativeHubPage  from "@/app/me/creative-hub/page";
import  ListingPortalPage  from "@/app/me/listing-portal/page";
import SuperSellerSuitePage from "@/app/me/super-seller-suite/page";


export default function EIOSPage() {
    return (
        <TooltipProvider delayDuration={0}>
            <ResizablePanelGroup
                direction="horizontal"
                className="h-full max-h-screen items-stretch"
            >
                <ResizablePanel defaultSize={5} minSize={5} maxSize={10}>
                    <WorkspaceSidebar />
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={65} minSize={40}>
                    <Tabs defaultValue="community">
                        <div className="bg-background/95 p-2 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                            <TabsList>
                                <TabsTrigger value="community">Community Hub</TabsTrigger>
                                <TabsTrigger value="lead-intelligence">Lead Intelligence</TabsTrigger>
                                <TabsTrigger value="listing-intelligence">Listing Intelligence</TabsTrigger>
                                <TabsTrigger value="meta-intelligence">Meta Intelligence</TabsTrigger>
                                <TabsTrigger value="creative-intelligence">Creative Intelligence</TabsTrigger>
                                <TabsTrigger value="super-seller-suite">SuperSellerSuite</TabsTrigger>
                            </TabsList>
                        </div>
                        <Separator />
                        <TabsContent value="community" className="m-0">
                            <ScrollArea className="h-[calc(100vh-52px)]">
                                <CommunityHubPage />
                            </ScrollArea>
                        </TabsContent>
                        <TabsContent value="lead-intelligence" className="m-0">
                           <ScrollArea className="h-[calc(100vh-52px)]">
                                <LeadIntelligencePage />
                            </ScrollArea>
                        </TabsContent>
                        <TabsContent value="listing-intelligence" className="m-0">
                           <ScrollArea className="h-[calc(100vh-52px)]">
                                <ListingPortalPage />
                            </ScrollArea>
                        </TabsContent>
                        <TabsContent value="meta-intelligence" className="m-0">
                           <ScrollArea className="h-[calc(100vh-52px)]">
                                <MetaIntelligencePage />
                            </ScrollArea>
                        </TabsContent>
                        <TabsContent value="creative-intelligence" className="m-0">
                           <ScrollArea className="h-[calc(100vh-52px)]">
                                <CreativeHubPage />
                            </ScrollArea>
                        </TabsContent>
                        <TabsContent value="super-seller-suite" className="m-0">
                           <ScrollArea className="h-[calc(100vh-52px)]">
                                <SuperSellerSuitePage />
                            </ScrollArea>
                        </TabsContent>
                    </Tabs>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={30} minSize={20}>
                    <WhatsMAPEngine />
                </ResizablePanel>
            </ResizablePanelGroup>
        </TooltipProvider>
    );
}
