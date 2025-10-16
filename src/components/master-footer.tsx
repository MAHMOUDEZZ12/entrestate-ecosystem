
import Link from 'next/link';
import { Bot, Sparkles } from 'lucide-react';

const sections = {
  "Ecosystem": [
    { name: "EI-OS Workspace", href: "/me/ei-os" },
    { name: "Community Hub", href: "/me/community" },
    { name: "Public Discovery Hub", href: "/discover" },
  ],
  "Suites": [
    { name: "Lead Intelligence", href: "/solutions/lead-intelligence" },
    { name: "Listing Intelligence", href: "/solutions/listing-intelligence" },
    { name: "Meta Intelligence", href: "/solutions/meta-intelligence" },
    { name: "Creative Intelligence", href: "/solutions/creative-intelligence" },
    { name: "SuperSellerSuite", href: "/solutions/super-seller-suite" },
    { name: "Cloud Intelligence", href: "/solutions/cloud-intelligence" },
  ],
  "Resources": [
    { name: "Appstore", href: "/appstore" },
    { name: "Action Flow Library", href: "/flows" },
    { name: "Academy", href: "/academy" },
    { name: "Market Library", href: "/market-library" },
  ],
  "Company": [
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ],
};

export function MasterFooter() {
  return (
    <footer className="bg-muted/20 border-t">
      <div className="container mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1">
             <Link href="/" className="flex items-center gap-2">
                <Bot className="h-6 w-6 text-primary" />
                <span className="font-bold text-lg">Entrestate OS</span>
             </Link>
             <p className="text-xs text-muted-foreground mt-2">The AI-Native Operating System for Real Estate.</p>
          </div>
          {Object.entries(sections).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-semibold mb-4">{title}</h3>
              <ul className="space-y-2">
                {links.map(link => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-8 border-t pt-4 text-center text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Entrestate. All rights reserved. Powered by Gemini.</p>
        </div>
      </div>
    </footer>
  );
}
