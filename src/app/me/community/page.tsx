
'use client';

import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Bell, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { generateCommunityPost } from "@/ai/flows/community/generate-community-post";

export default function CommunityHubPage() {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchPosts = async () => {
        setLoading(true);
        const postTypes: any[] = ['market-insight', 'daily-tip', 'conversation-starter', 'who-knows-question', 'top-rank-announcement'];
        const newPosts = [];
        for (const postType of postTypes) {
            try {
                const post = await generateCommunityPost({ postType, market: { name: 'Dubai' } });
                newPosts.push({ ...post, id: Date.now() + Math.random() });
            } catch (error) {
                console.error(`Error generating post of type ${postType}:`, error);
            }
        }
        setPosts(newPosts);
        setLoading(false);
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const MyDayRing = () => (
        <Card className="mb-4">
            <CardContent className="p-4 flex items-center justify-center">
                <Button size="lg" className="rounded-full w-32 h-32 bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg">
                    <Bell className="h-12 w-12" />
                </Button>
                <div className="ml-4">
                    <p className="font-semibold">Just closed a deal?</p>
                    <p className="text-sm text-muted-foreground">Ring the MyDay Bell and celebrate with the community!</p>
                </div>
            </CardContent>
        </Card>
    );

    const CommunityPost = ({ post }: { post: any }) => (
        <Card className="mb-4">
            <CardContent className="p-4">
                <div className="flex items-start">
                    <Avatar>
                        <AvatarImage src={`https://i.pravatar.cc/150?u=${post.author}`} />
                        <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="ml-4">
                        <p className="font-semibold">{post.author} <span className="text-sm text-muted-foreground"> - {post.authorTitle}</span></p>
                        <p className="mt-1">{post.content}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );

    return (
        <div className="grid grid-cols-12 gap-8 p-8">
            <div className="col-span-8">
                <PageHeader title="Community Hub" description="The pulse of the Dubai real estate market." />
                <Card className="mb-4">
                    <CardContent className="p-4">
                        <Textarea placeholder="Share an update, ask a question..." />
                        <Button className="mt-2">Post</Button>
                    </CardContent>
                </Card>
                <MyDayRing />
                {loading ? <p>Loading feed...</p> : posts.map(post => <CommunityPost key={post.id} post={post} />)}
            </div>
            <div className="col-span-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Calendar className="h-5 w-5 mr-2" />
                            Industry Events
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {/* Placeholder for events calendar */}
                        <p className="text-sm text-muted-foreground">No upcoming events.</p>
                    </CardContent>
                </Card>
                <Card className="mt-4">
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Sparkles className="h-5 w-5 mr-2" />
                            Launch Calendar
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {/* Placeholder for launch calendar */}
                        <p className="text-sm text-muted-foreground">No upcoming launches.</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
