
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Sparkles } from "lucide-react";

const solutions = [
    {
        title: "Lead Intelligence Suite",
        description: "A lead-by-lead command center that transforms every lead into a project.",
        href: "/me/lead-intelligence"
    },
    {
        title: "Listing Intelligence Dashboard",
        description: "A dynamic workspace that provides agents with a comprehensive, data-driven overview of their listings.",
        href: "/me/listing-portal"
    },
    {
        title: "Meta Intelligence Suite",
        description: "A true AI-powered command center for the entire Meta ecosystem.",
        href: "/me/meta-intelligence"
    },
    {
        title: "Creative Intelligence Suite",
        description: "A unified, intelligent workspace that seamlessly integrates with the rest of the Entrestate OS.",
        href: "/me/creative-hub"
    },
    {
        title: "SuperSellerSuite",
        description: "An app-based ecosystem of generative AI tools designed to deliver an unprecedented level of lead intelligence and workflow automation.",
        href: "/me/super-seller-suite"
    },
    {
        title: "Cloud Intelligence Suite",
        description: "The engine that will power the next generation of real estate applications.",
        href: "/me/cloud-intelligence"
    }
];

export default function SolutionsPage() {
    return (
        <div>
            <PageHeader
                title="Our Solutions"
                description="An overview of all the suites and verticals that the Entrestate OS has to offer."
            />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 p-8">
                {solutions.map((solution, index) => (
                    <Card key={index} className="flex flex-col">
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Sparkles className="h-5 w-5 mr-2 text-accent" />
                                {solution.title}
                            </CardTitle>
                            <CardDescription>{solution.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow flex items-end">
                            <Link href={solution.href}>
                                <Button>Learn More</Button>
                            </Link>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
