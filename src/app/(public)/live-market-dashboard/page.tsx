
'use client';

import { PageHeader } from "@/components/ui/page-header";
import { DataSegmentationDashboard } from "@/components/cloud-intelligence/data-segmentation-dashboard";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function LiveMarketDashboardPage() {
    return (
        <div className="bg-background">
            <main>
                <PageHeader
                    title="Live Dubai Market Dashboard"
                    description="A real-time overview of the Dubai property market, powered by the Entrestate Cloud."
                />
                <div className="container mx-auto px-4 md:px-8 py-12">
                    <DataSegmentationDashboard />
                    <Card className="mt-8 text-center">
                        <CardHeader>
                            <CardTitle>Harness This Intelligence for Your Business</CardTitle>
                            <CardDescription>This live dashboard is powered by our Cloud Intelligence Suite. Deploy our Search, Chat, and Market Data APIs to build your own next-generation real estate applications.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Link href="/solutions/cloud-intelligence">
                                <Button size="lg">
                                    Explore the Cloud Intelligence Suite <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}
