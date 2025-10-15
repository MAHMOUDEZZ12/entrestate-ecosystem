
import { PageHeader } from "@/components/ui/page-header";
import { SearchAgentDashboard } from "@/components/cloud-intelligence/search-agent-dashboard";
import { ChatAgentDashboard } from "@/components/cloud-intelligence/chat-agent-dashboard";
import { MegaListingAgentDashboard } from "@/components/cloud-intelligence/mega-listing-agent-dashboard";

export default function CloudIntelligencePage() {
  return (
    <div>
      <PageHeader
        title="Cloud Intelligence Suite"
        description="Your command center for deploying, managing, and monitoring your AI agents."
      />
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
        <SearchAgentDashboard />
        <ChatAgentDashboard />
        <MegaListingAgentDashboard />
      </div>
    </div>
  );
}
