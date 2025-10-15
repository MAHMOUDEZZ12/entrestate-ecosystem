
'use client';

import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CloneListingForm } from "@/components/listing-portal/clone-listing-form";

export default function CreateListingPage() {
    return (
        <div>
            <PageHeader
                title="Create a New Listing"
                description="Follow the steps below to create a new, AI-powered listing."
            >
                <Link href="/me/listing-portal">
                    <Button variant="outline">Back to Dashboard</Button>
                </Link>
            </PageHeader>
            <div className="space-y-4">
                <CloneListingForm />
            </div>
        </div>
    );
}
