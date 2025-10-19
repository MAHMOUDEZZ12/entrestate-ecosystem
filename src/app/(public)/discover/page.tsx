
'use client';

import { PageHeader } from "@/components/ui/page-header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Project } from "@/services/data-intelligence";
import Image from "next/image";
import { Search, BrainCircuit, BarChart, Bot } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { runWhatsMAP } from "@/ai/flows/core-ai/whatsmap";
import { AnimatePresence, motion } from "framer-motion";

export default function DiscoverPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [interpretation, setInterpretation] = useState('');

    const handleSearch = async () => {
        setLoading(true);
        setResults([]);
        setInterpretation('');

        try {
            const result = await runWhatsMAP({ query: searchTerm, isPublic: true });
            const textResponse = result.response.find(r => r.type === 'text');
            if (textResponse) {
                setInterpretation(textResponse.data.text);
            }
            setResults(result.response.filter(r => r.type !== 'text'));
        } catch (error) {
            console.error("Search failed:", error);
        } finally {
            setLoading(false);
        }
    };

    const ResultComponent = ({ component, index }: { component: any, index: number }) => {
        if (component.type === 'project-carousel' || component.type === 'project_results') {
            return (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                     <h3 className="text-xl font-bold mb-4">Search Results</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {component.data.projects.map((project: Project) => (
                            <Card key={project.id}>
                                <CardContent className="p-3">
                                    <Image src={project.thumbnailUrl} alt={project.name} width={30_0} height={200} className="rounded-lg mb-2" />
                                    <h4 className="font-semibold text-sm">{project.name}</h4>
                                    <p className="text-xs text-muted-foreground">{project.developer}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </motion.div>
            );
        }
        return null;
    };

    return (
        <div className="p-4 md:p-8">
            <PageHeader
                title="Discover the Market"
                description="Use our AI-powered search to get instant, intelligent answers."
            />
            <div className="max-w-2xl mx-auto">
                <div className="flex space-x-2">
                    <Input
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="e.g., 'Show me 3-bedroom villas in Arabian Ranches under 5M'"
                    />
                    <Button onClick={handleSearch} disabled={loading}>
                        {loading ? 'Thinking...' : <Search />}
                    </Button>
                </div>
            </div>
            <div className="mt-8 max-w-4xl mx-auto">
                <AnimatePresence>
                    {loading && <p>Searching...</p>}
                    {interpretation && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <Card className="bg-primary/5 border-primary/20 mb-4">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-sm"><Bot /> Gemini's Understanding</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p>"{interpretation}"</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}
                    <div className="space-y-4">
                        {results.map((r, i) => <ResultComponent key={i} component={r} index={i} />)}
                    </div>
                </AnimatePresence>
            </div>
        </div>
    );
}
