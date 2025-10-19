
'use client';

import { MasterHeader } from '@/components/master-header';
import { MasterFooter } from '@/components/master-footer';
import DiscoverPage from './discover/page'; // We will use the discover page as the new homepage

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <MasterHeader />
      <main className="flex-grow">
        <DiscoverPage />
      </main>
      <MasterFooter />
    </div>
  );
}
