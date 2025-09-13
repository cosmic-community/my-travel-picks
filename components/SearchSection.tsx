'use client'

import { useState, useEffect } from 'react';
import { Destination, SiteSettings } from '@/types';
import { searchDestinations } from '@/lib/cosmic';
import SearchBar from '@/components/SearchBar';
import DestinationCard from '@/components/DestinationCard';

interface SearchSectionProps {
  settings: SiteSettings | null;
  initialDestinations: Destination[];
}

export default function SearchSection({ settings, initialDestinations }: SearchSectionProps) {
  const [destinations, setDestinations] = useState<Destination[]>(initialDestinations);
  const [searchLoading, setSearchLoading] = useState(false);

  const handleSearch = async (searchTerm: string) => {
    try {
      setSearchLoading(true);
      const results = await searchDestinations(searchTerm);
      setDestinations(results);
    } catch (error) {
      console.error('Error searching destinations:', error);
      // Fall back to initial destinations on error
      setDestinations(initialDestinations);
    } finally {
      setSearchLoading(false);
    }
  };

  return (
    <>
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
            <div 
              key={destination.id} 
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <DestinationCard destination={destination} />
            </div>
          ))}
        </div>
      </main>
    </>
  );
}