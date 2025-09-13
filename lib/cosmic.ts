import { createBucketClient } from '@cosmicjs/sdk'
import { Destination, SiteSettings, CosmicResponse } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Simple error helper for Cosmic SDK
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Get site settings
export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    const response = await cosmic.objects.findOne({
      type: 'site-settings',
      slug: 'my-travel-picks-settings'
    }).depth(1);
    
    return response.object as SiteSettings;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    console.error('Error fetching site settings:', error);
    throw new Error('Failed to fetch site settings');
  }
}

// Get all destinations
export async function getDestinations(): Promise<Destination[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'destinations' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    // Sort featured destinations first, then by title
    const destinations = response.objects as Destination[];
    return destinations.sort((a, b) => {
      // Featured destinations come first
      if (a.metadata.featured && !b.metadata.featured) return -1;
      if (!a.metadata.featured && b.metadata.featured) return 1;
      
      // Then sort alphabetically by city name
      return a.metadata.city_name.localeCompare(b.metadata.city_name);
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching destinations:', error);
    throw new Error('Failed to fetch destinations');
  }
}

// Search destinations
export async function searchDestinations(searchTerm: string): Promise<Destination[]> {
  if (!searchTerm.trim()) {
    return await getDestinations();
  }
  
  try {
    // Get all destinations first since Cosmic API search might be limited
    const allDestinations = await getDestinations();
    
    // Filter locally for better search control
    const filteredDestinations = allDestinations.filter(destination => {
      const searchLower = searchTerm.toLowerCase();
      const cityName = destination.metadata.city_name?.toLowerCase() || '';
      const country = destination.metadata.country?.toLowerCase() || '';
      const description = destination.metadata.short_description?.toLowerCase() || '';
      const tags = destination.metadata.tags?.toLowerCase() || '';
      
      return cityName.includes(searchLower) ||
             country.includes(searchLower) ||
             description.includes(searchLower) ||
             tags.includes(searchLower);
    });
    
    return filteredDestinations;
  } catch (error) {
    console.error('Error searching destinations:', error);
    return [];
  }
}