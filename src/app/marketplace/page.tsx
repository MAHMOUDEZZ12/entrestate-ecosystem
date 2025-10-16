
'use client';

import { PageHeader } from "@/components/ui/page-header";
import { useEffect, useState } from "react";
import { generateSuiteDescription } from "@/ai/flows/marketplace/generate-suite-description";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

const suites = [
    { id: "lead-intelligence", name: "Lead Intelligence Suite" },
    { id: "listing-intelligence", name: "Listing Intelligence Dashboard" },
    { id: "meta-intelligence", name: "Meta Intelligence Suite" },
    { id: "creative-intelligence", name: "Creative Intelligence Suite" },
    { id: "super-seller-suite", name: "SuperSellerSuite" },
    { id: "cloud-intelligence", name: "Cloud Intelligence Suite" },
];

export default function MarketplacePage() {
    const [suiteDetails, setSuiteDetails] = useState<any>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDescriptions = async () => {
            const details: any = {};
            for (const suite of suites) {
                try {
                    const description = await generateSuiteDescription({
                        suiteName: suite.name,
                        market: { name: "Dubai" },
                    });
                    details[suite.id] = description;
                } catch (error) {
                    console.error(`Error fetching description for ${suite.name}:`, error);
                }
            }
            setSuiteDetails(details);
            setLoading(false);
        };

        fetchDescriptions();
    }, []);

    return (
        <div>
            <PageHeader
                title="Marketplace"
                description="Your AI-powered command center for discovering and activating new capabilities."
            />
            {loading ? (
                <p className="p-8">Loading suites...</p>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 p-8">
                    {suites.map(suite => {
                        const details = suiteDetails[suite.id];
                        return (
                            <Card key={suite.id} className="flex flex-col">
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <Sparkles className="h-5 w-5 mr-2 text-accent" />
                                        {suite.name}
                                    </CardTitle>
                                    {details && <CardDescription>{details.tagline}</CardDescription>}
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    {details ? (
                                        <div>
                                            <p className="text-sm mb-4">{details.description}</p>
                                            <h4 className="font-semibold mb-2">Key Features:</h4>
                                            <ul className="list-disc pl-5 mb-4 text-sm">
                                                {details.features.map((feature: any) => (
                                                    <li key={feature.name}><strong>{feature.name}:</strong> {feature.description}</li>
                                                ))}
                                            </ul>
                                            <Card className="bg-muted p-3">
                                                <p className="text-sm font-semibold">Market Edge:</p>
                                                <p className="text-sm">{details.marketContext}</p>
                                            </Card>
                                        </div>
                                    ) : (
                                        <p>Loading details...</p>
                                    )}
                                </CardContent>
                                <div className="p-6 pt-0">
                                     <Button>Activate Suite</Button>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
