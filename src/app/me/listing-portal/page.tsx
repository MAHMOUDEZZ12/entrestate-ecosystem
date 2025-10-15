
'use client';

import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ListingPerformance } from "@/components/listing-portal/listing-performance";
import { UnifiedMarketRegistry } from "@/components/listing-portal/unified-market-registry";
import { ListingVerifier } from "@/components/listing-portal/listing-verifier";

export default function ListingPortalPage() {
    return (
        <div>
            <PageHeader
                title="Listing Intelligence Dashboard"
                description="Your AI-powered command center for your property listings."
            >
                <Link href="/me/listing-portal/create-listing">
                    <Button>Create New Listing</Button>
                </Link>
            </PageHeader>
            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
                <UnifiedMarketRegistry />
                <ListingVerifier />
                <ListingPerformance />
            </div>
        </div>
    );
}
