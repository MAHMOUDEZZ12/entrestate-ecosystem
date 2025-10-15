
import { PublicWhatsMAPChat } from "@/components/public-whatsmap-chat";
import LandingHeader from "@/app/landing-header";
import LandingFooter from "@/app/landing-footer";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <LandingHeader />
      <main className="flex-grow flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold">The Future of Real Estate is Intelligent</h1>
          <p className="mt-2 text-lg text-muted-foreground">Welcome to the Entrestate Intelligence Operating System.</p>
        </div>
        <PublicWhatsMAPChat />
      </main>
      <LandingFooter />
    </div>
  );
}
