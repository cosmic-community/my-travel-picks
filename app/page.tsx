'use client'

import { useState, useEffect } from 'react';
import { Destination, SiteSettings } from '@/types';
import { getSiteSettings, searchDestinations } from '@/lib/cosmic';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import DestinationCard from '@/components/DestinationCard';

export default function Home() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    async function loadInitialData() {
      try {
        setLoading(true);
        const [settingsData, destinationsData] = await Promise.all([
          getSiteSettings(),
          searchDestinations('')
        ]);
        
        setSettings(settingsData);
        setDestinations(destinationsData);
      } catch (error) {
        console.error('Error loading initial data:', error);
      } finally {
        setLoading(false);
      }
    }

    loadInitialData();
  }, []);

  const handleSearch = async (searchTerm: string) => {
    try {
      setSearchLoading(true);
      const results = await searchDestinations(searchTerm);
      setDestinations(results);
    } catch (error) {
      console.error('Error searching destinations:', error);
    } finally {
      setSearchLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-travel-cream">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-travel-ocean border-t-transparent mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Loading your next adventure...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-travel-cream">
      <Header settings={settings} />
      <SearchBar settings={settings} onSearch={handleSearch} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {searchLoading && (
          <div className="text-center mb-8">
            <div className="inline-flex items-center">
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-travel-ocean border-t-transparent mr-3"></div>
              <span className="text-gray-600">Searching destinations...</span>
            </div>
          </div>
        )}
        
        {destinations.length === 0 && !searchLoading && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🗺️</div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">No destinations found</h3>
            <p className="text-gray-600">Try a different search term or explore our featured destinations.</p>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination, index) => (
            <div key={destination.id} style={{ animationDelay: `${index * 0.1}s` }}>
              <DestinationCard destination={destination} />
            </div>
          ))}
        </div>
      </main>
      
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