
import { PageHeader } from "@/components/ui/page-header";
import { AssetManager } from "@/components/creative-hub/asset-manager";
import { TemplateLibrary } from "@/components/creative-hub/template-library";
import { PDFEditor } from "@/components/creative-hub/pdf-editor";
import { LandingPageBuilder } from "@/components/creative-hub/landing-page-builder";

export default function CreativeHubPage() {
  return (
    <div>
      <PageHeader
        title="Creative Intelligence Suite"
        description="Your AI-powered command center for all your creative needs."
      />
      <div className="space-y-4">
        <AssetManager />
        <TemplateLibrary />
        <div className="grid gap-4 md:grid-cols-2">
            <PDFEditor />
            <LandingPageBuilder />
        </div>
      </div>
    </div>
  );
}
