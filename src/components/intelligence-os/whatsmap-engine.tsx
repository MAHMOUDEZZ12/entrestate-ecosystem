
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Bot, User } from "lucide-react";
import { useState } from "react";

export function WhatsMAPEngine() {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([
        { from: 'bot', text: 'Welcome to the WhatsMAP Engine. How can I help you orchestrate your next move?' }
    ]);
    const [loading, setLoading] = useState(false);

    const handleSend = async () => {
        if (!input.trim()) return;

        const newMessages = [...messages, { from: 'user', text: input }];
        setMessages(newMessages);
        setInput('');
        setLoading(true);

        // Simulate AI response based on WhatsMAP logic
        // This would call a new, powerful "whatsmap" flow
        await new Promise(resolve => setTimeout(resolve, 1500));
        let botResponse = "I'm sorry, I don't understand that command. Try 'generate brochure for project-id' or 'launch meta campaign for listing-id'.";
        if (input.toLowerCase().includes('brochure')) {
            botResponse = "Understood. Generating a new brochure for project 'dxboffplan-emaar-beachfront'. I'll place the final asset in your Creative Hub Asset Manager. You can then drag it to a campaign.";
        } else if (input.toLowerCase().includes('meta campaign')) {
            botResponse = "Initiating Meta campaign launch for listing 'pf-savanna-creek-beach'. I've created a draft in your Meta Intelligence Suite. Please review and approve for publishing.";
        }
        
        setMessages([...newMessages, { from: 'bot', text: botResponse }]);
        setLoading(false);
    };

    return (
        <Card className="h-full flex flex-col">
            <CardHeader>
                <CardTitle>WhatsMAP Conversational Engine</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col">
                <ScrollArea className="flex-grow p-4 border rounded-lg mb-4">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex items-start mb-4 ${msg.from === 'user' ? 'justify-end' : ''}`}>
                            {msg.from === 'bot' && <Bot className="h-6 w-6 mr-2" />}
                            <p className={`p-2 rounded-lg ${msg.from === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                                {msg.text}
                            </p>
                            {msg.from === 'user' && <User className="h-6 w-6 ml-2" />}
                        </div>
                    ))}
                </ScrollArea>
                <div className="flex space-x-2">
                    <Textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="e.g., 'Find me 3-bedroom villas in Arabian Ranches with a budget of 5M and create a client presentation.'"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSend();
                            }
                        }}
                    />
                    <Button onClick={handleSend} disabled={loading}>
                        {loading ? 'Thinking...' : 'Send'}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
