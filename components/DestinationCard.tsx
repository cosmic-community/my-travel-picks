import { Destination } from '@/types';

interface DestinationCardProps {
  destination: Destination;
}

export default function DestinationCard({ destination }: DestinationCardProps) {
  const { metadata } = destination;
  
  if (!metadata) {
    return null;
  }

  const cityName = metadata.city_name;
  const country = metadata.country;
  const description = metadata.short_description;
  const travelPhoto = metadata.travel_photo;
  const affiliateLink = metadata.affiliate_link;
  const featured = metadata.featured;

  return (
    <div className="destination-card animate-fade-up relative">
      {featured && (
        <div className="featured-badge">
          ✨ Featured
        </div>
      )}
      
      {travelPhoto && (
        <div className="overflow-hidden rounded-t-2xl">
          <img
            src={`${travelPhoto.imgix_url}?w=800&h=512&fit=crop&auto=format,compress`}
            alt={`${cityName}, ${country}`}
            width="400"
            height="256"
            className="destination-card-image"
          />
        </div>
      )}
      
      <div className="p-6">
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">
          {cityName}
        </h3>
        
        <p className="text-lg text-gray-600 mb-1">
          {country}
        </p>
        
        <p className="text-gray-700 mb-6 leading-relaxed">
          {description}
        </p>
        
        <a
          href={affiliateLink}
          target="_blank"
          rel="noopener noreferrer"
          className="book-now-button inline-block text-center w-full"
        >
          Book Now
        </a>
      </div>
    </div>
  );
}