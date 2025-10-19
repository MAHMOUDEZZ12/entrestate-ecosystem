
'use client';

import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

const solutions = [
    {
        id: "lead-intelligence",
        title: "Lead Intelligence Suite",
        description: "A lead-by-lead command center that transforms every lead into a project.",
    },
    {
        id: "listing-intelligence",
        title: "Listing Intelligence Dashboard",
        description: "A dynamic workspace that provides agents with a comprehensive, data-driven overview of their listings.",
    },
    {
        id: "meta-intelligence",
        title: "Meta Intelligence Suite",
        description: "A true AI-powered command center for the entire Meta ecosystem.",
    },
    {
        id: "creative-intelligence",
        title: "Creative Intelligence Suite",
        description: "A unified, intelligent workspace that seamlessly integrates with the rest of the Entrestate OS.",
    },
    {
        id: "super-seller-suite",
        title: "SuperSellerSuite",
        description: "An app-based ecosystem of generative AI tools designed to deliver an unprecedented level of lead intelligence and workflow automation.",
    },
    {
        id: "cloud-intelligence",
        title: "Cloud Intelligence Suite",
        description: "The engine that will power the next generation of real estate applications.",
    }
];

export default function SolutionsPage() {
    return (
        <div className="bg-background">
            <main>
                <PageHeader
                    title="Our Solutions"
                    description="An overview of all the suites and verticals that the Entrestate OS has to offer."
                />
                <div className="container mx-auto px-4 md:px-8 py-12">
                     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {solutions.map(solution => (
                            <Card key={solution.id} className="flex flex-col">
                                <CardHeader>
                                    <CardTitle className="flex items-start gap-2">
                                        <Sparkles className="h-6 w-6 text-primary mt-1" />
                                        <span>{solution.title}</span>
                                    </CardTitle>
                                    <CardDescription>{solution.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="flex-grow" />
                                <CardFooter>
                                    <Link href={`/solutions/${solution.id}`} className="w-full">
                                        <Button className="w-full">
                                            Learn More <ArrowRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </Link>
                                </CardFooter>
                            </Card>
                        ))}
                     </div>
                </div>
            </main>
        </div>
    );
}
