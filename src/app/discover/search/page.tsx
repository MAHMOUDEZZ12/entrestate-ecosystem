
'use client';

import { PageHeader } from "@/components/ui/page-header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { DataIntelligenceService, Project } from "@/services/data-intelligence";
import Image from "next/image";

export default function DiscoverSearchPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState<Project[]>([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = () => {
        setLoading(true);
        const dataService = DataIntelligenceService.getInstance();
        const allProjects = dataService.getAllProjects();
        const filteredProjects = allProjects.filter(project =>
            project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.developer.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.area.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setResults(filteredProjects);
        setLoading(false);
    };

    return (
        <div>
            <PageHeader
                title="Discover"
                description="A global search interface for projects, data, and tools."
            />
            <div className="p-8">
                <div className="flex space-x-2">
                    <Input
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search for anything..."
                    />
                    <Button onClick={handleSearch} disabled={loading}>
                        {loading ? 'Searching...' : 'Search'}
                    </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                    {results.map(project => (
                        <div key={project.id} className="border rounded-lg p-4">
                            <Image src={project.thumbnailUrl} alt={project.name} width={300} height={200} className="rounded-lg" />
                            <h4 className="font-semibold mt-2">{project.name}</h4>
                            <p className="text-sm text-muted-foreground">{project.developer}</p>
                            <p className="text-sm text-muted-foreground">{project.area}, {project.city}</p>
                            <p className="text-sm font-semibold mt-2">{project.priceFrom}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
