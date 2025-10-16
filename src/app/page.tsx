
'use client';

import LandingHeader from "@/app/landing-header";
import LandingFooter from "@/app/landing-footer";
import { PageHeader } from "@/components/ui/page-header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Project } from "@/services/data-intelligence";
import Image from "next/image";
import { Search, BrainCircuit, BarChart, Bot, Sparkles, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { runWhatsMAP } from "@/ai/flows/core-ai/whatsmap";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

export default function HomePage() {
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
            // A real implementation would have a better way to distinguish interpretation
            const textResponse = result.response.find(r => r.type === 'text');
            if (textResponse) {
                setInterpretation(textResponse.data.text);
            }
            setResults(result.response.filter(r => r.type !== 'text' && r.type !== 'onboarding'));

        } catch (error) {
            console.error("Search failed:", error);
        } finally {
            setLoading(false);
        }
    };

    const ResultComponent = ({ component, index }: { component: any, index: number }) => {
        // This would be a more robust component mapping in a real app
        if (component.type === 'project-carousel' || component.type === 'project_results') {
            return (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                     <h3 className="text-xl font-bold mb-4">Search Results</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {component.data.projects.map((project: Project) => (
                            <Card key={project.id}>
                                <CardContent className="p-3">
                                    <Image src={project.thumbnailUrl} alt={project.name} width={300} height={200} className="rounded-lg mb-2" />
                                    <h4 className="font-semibold text-sm">{project.name}</h4>
                                    <p className="text-xs text-muted-foreground">{project.developer}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </motion.div>
            );
        }
         if (component.type === 'pdf-generation-cta') {
            return (
                 <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                    <Card className="bg-muted/50">
                        <CardContent className="p-4 flex items-center justify-between">
                            <p className="font-semibold">Would you like a detailed PDF comparison?</p>
                            <Button>Generate PDF</Button>
                        </CardContent>
                    </Card>
                </motion.div>
            )
        }
        return null;
    };

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <LandingHeader />
            <main className="flex-grow">
                <section className="relative text-center py-20 md:py-32">
                     <div
                        className="absolute inset-x-0 top-0 -z-10 transform-gpu overflow-hidden blur-3xl"
                        aria-hidden="true"
                    >
                        <div
                        className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                        style={{
                            clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                        />
                    </div>
                    <div className="container mx-auto px-4">
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">The Future of Real Estate is an Agent</h1>
                        <p className="mt-6 text-lg max-w-2xl mx-auto text-muted-foreground">
                            Not a person, but an intelligence. Meet the Entrestate OS—a unified AI ecosystem that thinks, creates, and sells for you.
                        </p>
                        <div className="mt-10 max-w-2xl mx-auto">
                             <div className="flex space-x-2">
                                <Input
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Ask the market... e.g., 'Compare Emaar Beachfront and DAMAC Lagoons in a PDF'"
                                    className="p-6 text-lg"
                                />
                                <Button onClick={handleSearch} disabled={loading} size="lg">
                                    {loading ? 'Thinking...' : <Search className="h-6 w-6" />}
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="container mx-auto px-4 md:px-8 pb-20">
                    <AnimatePresence>
                         {loading && <p className="text-center">Gemini is searching the market...</p>}
                         {interpretation && (
                             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <Card className="bg-primary/5 border-primary/20 mb-8">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2 text-base"><Bot className="h-5 w-5 text-primary" /> Gemini's Understanding</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="font-semibold text-lg">"{interpretation}"</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                         )}
                        <div className="space-y-6">
                            {results.map((r, i) => <ResultComponent key={i} component={r} index={i} />)}
                        </div>
                    </AnimatePresence>
                     <AnimatePresence>
                        {results.length > 0 && (
                             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: results.length * 0.1 }}>
                                <Card className="mt-8 text-center bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                                    <CardHeader>
                                        <CardTitle>This is Just the Beginning.</CardTitle>
                                        <CardDescription className="text-blue-100">You've seen a fraction of what our AI can do. Sign up to unlock the full Intelligence OS.</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Link href="/login">
                                            <Button size="lg" variant="secondary">
                                                Unlock All Features <ArrowRight className="ml-2 h-4 w-4" />
                                            </Button>
                                        </Link>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </section>

            </main>
            <LandingFooter />
        </div>
    );
}

