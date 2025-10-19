
'use client';

import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Check, Sparkles, ArrowRight } from "lucide-react";

const pricingTiers = [
    {
        name: "Pro Agent",
        price: "$99",
        description: "For the ambitious agent who needs an AI-powered co-pilot.",
        features: [
            "Lead Intelligence Suite",
            "Listing Intelligence Dashboard",
            "Meta Intelligence Suite",
            "500,000 AI Tokens/month",
            "Community Hub Access",
        ],
        cta: "Get Started with Pro"
    },
    {
        name: "Agency",
        price: "$299",
        description: "For teams who need to collaborate and scale their operations.",
        features: [
            "All Pro Agent features",
            "Creative Intelligence Suite",
            "SuperSellerSuite",
            "2,000,000 AI Tokens/month",
            "Team Collaboration (3 Seats)",
            "Advanced Reporting",
        ],
        cta: "Choose Agency"
    },
    {
        name: "Enterprise",
        price: "Contact Us",
        description: "For market leaders who need unlimited power and dedicated support.",
        features: [
            "All Agency features",
            "Cloud Intelligence Suite (API Access)",
            "Unlimited AI Tokens",
            "Dedicated Support & Onboarding",
            "Custom Integrations",
        ],
        cta: "Contact Sales"
    }
];

export default function MarketplacePage() {
    return (
        <div className="bg-background">
            <main>
                <PageHeader
                    title="Pricing & Plans"
                    description="Choose the plan that's right for your business. Unlock the power of the Entrestate OS."
                />
                <div className="container mx-auto px-4 md:px-8 py-12">
                     <div className="grid md:grid-cols-3 gap-8 items-stretch">
                        {pricingTiers.map(tier => (
                            <Card key={tier.name} className={`flex flex-col ${tier.name === 'Agency' ? 'border-primary shadow-lg' : ''}`}>
                                <CardHeader>
                                    <CardTitle className="text-xl">{tier.name}</CardTitle>
                                    <CardDescription>{tier.description}</CardDescription>
                                    <p className="text-4xl font-bold pt-4">{tier.price} <span className="text-sm font-normal text-muted-foreground">{tier.name !== "Enterprise" && "/ month"}</span></p>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <ul className="space-y-3">
                                        {tier.features.map(feature => (
                                            <li key={feature} className="flex items-start gap-3">
                                                <Check className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                                <CardFooter>
                                    <Button className="w-full" size="lg" variant={tier.name === 'Agency' ? 'default' : 'outline'}>
                                        {tier.cta} <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                     </div>
                </div>
            </main>
        </div>
    );
}
