
import { PageHeader } from "@/components/ui/page-header";
import { SalesPilot } from "@/components/lead-intelligence/sales-pilot";

export default function LeadIntelligencePage() {
  return (
    <div>
      <PageHeader
        title="Lead Intelligence Suite"
        description="Your AI-powered command center for every lead."
      />
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
        <SalesPilot />
      </div>
    </div>
  );
}
