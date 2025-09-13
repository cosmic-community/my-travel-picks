// Base Cosmic object interface
interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Site Settings type
export interface SiteSettings extends CosmicObject {
  type: 'site-settings';
  metadata: {
    site_title?: string;
    site_logo?: {
      url: string;
      imgix_url: string;
    };
    header_tagline?: string;
    search_placeholder?: string;
    footer_text?: string;
  };
}

// Destination type
export interface Destination extends CosmicObject {
  type: 'destinations';
  metadata: {
    city_name: string;
    country: string;
    short_description: string;
    travel_photo: {
      url: string;
      imgix_url: string;
    };
    affiliate_link: string;
    featured?: boolean;
    tags?: string;
  };
}

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}

// Type guards for runtime validation
export function isSiteSettings(obj: CosmicObject): obj is SiteSettings {
  return obj.type === 'site-settings';
}

export function isDestination(obj: CosmicObject): obj is Destination {
  return obj.type === 'destinations';
}