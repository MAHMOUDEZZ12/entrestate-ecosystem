
'use client';

import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, CheckCircle, Sparkles } from "lucide-react";
import LandingHeader from "@/app/landing-header";
import LandingFooter from "@/app/landing-footer";
import { useParams } from 'next/navigation';
import { useEffect, useState } from "react";
import { generateSuiteDescription } from "@/ai/flows/marketplace/generate-suite-description";
import { Skeleton } from "@/components/ui/skeleton";

const suites: { [key: string]: { name: string } } = {
    "lead-intelligence": { name: "Lead Intelligence Suite" },
    "listing-intelligence": { name: "Listing Intelligence Dashboard" },
    "meta-intelligence": { name: "Meta Intelligence Suite" },
    "creative-intelligence": { name: "Creative Intelligence Suite" },
    "super-seller-suite": { name: "SuperSellerSuite" },
    "cloud-intelligence": { name: "Cloud Intelligence Suite" },
};

export default function SolutionPage() {
    const params = useParams();
    const slug = params.slug as string;
    const suite = suites[slug];
    const [details, setDetails] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (suite) {
            const fetchDescription = async () => {
                setLoading(true);
                try {
                    const description = await generateSuiteDescription({
                        suiteName: suite.name,
                        market: { name: "Dubai" },
                    });
                    setDetails(description);
                } catch (error) {
                    console.error(`Error fetching description for ${suite.name}:`, error);
                } finally {
                    setLoading(false);
                }
            };
            fetchDescription();
        }
    }, [suite]);

    if (!suite) {
        return <div>Solution not found.</div>;
    }

    return (
        <div className="bg-background">
            <LandingHeader />
            <main>
                <PageHeader
                    title={suite.name}
                    description={loading ? <Skeleton className="h-6 w-1/2 mx-auto" /> : details?.tagline}
                />
                <div className="container mx-auto px-4 md:px-8 py-12">
                   {loading ? (
                       <p>Loading details...</p>
                   ) : details ? (
                       <div className="grid md:grid-cols-3 gap-8">
                           <div className="md:col-span-2">
                               <Card>
                                   <CardHeader>
                                       <CardTitle>The Power of {suite.name}</CardTitle>
                                   </CardHeader>
                                   <CardContent>
                                       <p className="text-muted-foreground mb-6">{details.description}</p>
                                       <h3 className="font-semibold mb-4">Key Features:</h3>
                                       <ul className="space-y-3">
                                           {details.features.map((feature: any) => (
                                               <li key={feature.name} className="flex items-start">
                                                   <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                                                   <div>
                                                       <span className="font-semibold">{feature.name}:</span>
                                                       <span className="text-muted-foreground"> {feature.description}</span>
                                                   </div>
                                               </li>
                                           ))}
                                       </ul>
                                   </CardContent>
                               </Card>
                           </div>
                           <div className="md:col-span-1">
                                <Card className="sticky top-24 bg-muted/50">
                                   <CardHeader>
                                       <CardTitle className="flex items-center gap-2"><Sparkles className="h-5 w-5 text-primary" /> Market Edge</CardTitle>
                                   </CardHeader>
                                   <CardContent>
                                       <p className="text-muted-foreground mb-4">{details.marketContext}</p>
                                       <Link href="/discover" className="w-full">
                                            <Button className="w-full">
                                                Get Started <ArrowRight className="ml-2 h-4 w-4" />
                                            </Button>
                                        </Link>
                                   </CardContent>
                               </Card>
                           </div>
                       </div>
                   ) : (
                       <p>Could not load details for this suite.</p>
                   )}
                </div>
            </main>
            <LandingFooter />
        </div>
    );
}
