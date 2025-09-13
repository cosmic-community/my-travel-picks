import { Destination, SiteSettings } from '@/types';
import { getSiteSettings, getDestinations } from '@/lib/cosmic';
import Header from '@/components/Header';
import SearchSection from '@/components/SearchSection';

export default async function Home() {
  let settings: SiteSettings | null = null;
  let destinations: Destination[] = [];

  try {
    // Fetch data on the server
    const [settingsData, destinationsData] = await Promise.all([
      getSiteSettings(),
      getDestinations()
    ]);
    
    settings = settingsData;
    destinations = destinationsData;
  } catch (error) {
    console.error('Error loading data:', error);
  }

  return (
    <div className="min-h-screen bg-travel-cream">
      <Header settings={settings} />
      
      {/* Pass initial destinations to client component for search */}
      <SearchSection 
        settings={settings} 
        initialDestinations={destinations} 
      />
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-600">
              {settings?.metadata?.footer_text || '© 2024 My Travel Picks. Happy travels! ✈️'}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}