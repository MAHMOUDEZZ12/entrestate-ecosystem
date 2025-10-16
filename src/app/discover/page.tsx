
'use client';

import { PageHeader } from "@/components/ui/page-header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { DataIntelligenceService, Project } from "@/services/data-intelligence";
import Image from "next/image";
import { Search, BrainCircuit, BarChart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function DiscoveryHubPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState<any>({ fast: [], smart: null, deep: null });
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        setLoading(true);
        const dataService = DataIntelligenceService.getInstance();
        const allProjects = dataService.getAllProjects();

        // Simulate API calls for all three modes
        const fastResults = allProjects.filter(project =>
            project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.developer.toLowerCase().includes(searchTerm.toLowerCase())
        ).slice(0, 6);

        const smartResult = {
            interpretation: `Searching for modern, family-friendly villas with high investment potential near top-rated schools.`,
            projects: allProjects.slice(2, 5),
        };

        const deepResult = {
            prediction: `Projects in the 'Dubailand' area are predicted to have a 15% increase in rental yield over the next 24 months.`,
            historicalData: `This trend is consistent with a 12% year-over-year growth in the same area.`,
        };
        
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network latency

        setResults({ fast: fastResults, smart: smartResult, deep: deepResult });
        setLoading(false);
    };

    return (
        <div className="p-4 md:p-8">
            <PageHeader
                title="The Discovery Hub"
                description="The triple-engine of discovery: keyword, semantic, and predictive search in one."
            />
            <div className="p-8 max-w-4xl mx-auto">
                <div className="flex space-x-2">
                    <Input
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search for '2-bed villas in Arabian Ranches under 5M'..."
                        className="p-6 text-lg"
                    />
                    <Button onClick={handleSearch} disabled={loading} size="lg">
                        {loading ? 'Searching...' : <Search className="h-6 w-6" />}
                    </Button>
                </div>

                {loading ? (
                    <p className="text-center mt-8">Gemini is searching...</p>
                ) : (
                    <div className="mt-12 space-y-8">
                        {results.smart && (
                             <Card className="bg-primary/5 border-primary/20">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2"><BrainCircuit className="h-5 w-5 text-primary" /> Smart Search Interpretation</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="font-semibold text-lg">"{results.smart.interpretation}"</p>
                                </CardContent>
                            </Card>
                        )}

                        {results.fast.length > 0 && (
                            <div>
                                <h2 className="text-2xl font-bold mb-4">Fast Search Results</h2>
                                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {results.fast.map((project: Project) => (
                                        <Card key={project.id}>
                                            <CardContent className="p-3">
                                                <Image src={project.thumbnailUrl} alt={project.name} width={300} height={200} className="rounded-lg mb-2" />
                                                <h4 className="font-semibold text-sm">{project.name}</h4>
                                                <p className="text-xs text-muted-foreground">{project.developer}</p>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        )}

                        {results.deep && (
                             <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2"><BarChart className="h-5 w-5 text-primary" /> Deep Search Analysis</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                     <div>
                                        <h4 className="font-semibold text-sm">Prediction:</h4>
                                        <p className="text-muted-foreground text-sm">{results.deep.prediction}</p>
                                     </div>
                                     <div>
                                        <h4 className="font-semibold text-sm">Historical Context:</h4>
                                        <p className="text-muted-foreground text-sm">{results.deep.historicalData}</p>
                                     </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
