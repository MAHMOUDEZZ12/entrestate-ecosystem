
'use client';

import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle, Bot, BrainCircuit } from "lucide-react";
import { useParams } from 'next/navigation';

const courseData: { [key: string]: any } = {
    "mastering-meta-intelligence": {
        title: "Mastering the Meta Intelligence Suite",
        modules: [
            { title: "Understanding Your Audience with AI", content: "Learn how to leverage market data to create hyper-targeted ad audiences." },
            { title: "Generative Ad Creative", content: "Create compelling, on-brand ad copy and visuals in seconds." },
            { title: "Campaign Orchestration & Optimization", content: "Launch, monitor, and optimize your campaigns with an AI co-pilot." },
        ]
    },
    // Add other course data here
};

export default function CoursePage() {
    const params = useParams();
    const course = courseData[params.slug as string];

    if (!course) {
        return <div>Course not found.</div>;
    }

    return (
        <div className="bg-background">
            <main>
                <PageHeader
                    title={course.title}
                    description="An interactive learning module from the Entrestate Academy."
                />
                <div className="container mx-auto px-4 md:px-8 py-12">
                   <div className="grid md:grid-cols-3 gap-8">
                        <div className="md:col-span-2 space-y-6">
                            {course.modules.map((module: any, index: number) => (
                                <Card key={index}>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <BrainCircuit className="h-5 w-5 text-primary" />
                                            Module {index + 1}: {module.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground">{module.content}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                        <div className="md:col-span-1">
                            <Card className="sticky top-24">
                                <CardHeader>
                                    <CardTitle>AI Learning Assistant</CardTitle>
                                    <CardDescription>Ask me anything about this course.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {/* Placeholder for a mini-WhatsMAP for this course */}
                                    <p className="text-sm text-center text-muted-foreground p-4 border rounded-md">
                                        <Bot className="h-6 w-6 mx-auto mb-2" />
                                        Your AI Tutor is ready to help.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                   </div>
                </div>
            </main>
        </div>
    );
}
