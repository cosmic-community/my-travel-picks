import { Destination } from '@/types';

interface DestinationCardProps {
  destination: Destination;
}

export default function DestinationCard({ destination }: DestinationCardProps) {
  const { metadata } = destination;
  
  return (
    <div className="destination-card group">
      <div className="relative overflow-hidden rounded-xl mb-4">
        {metadata.featured && (
          <div className="absolute top-3 left-3 z-10">
            <span className="featured-badge">
              ⭐ Featured
            </span>
          </div>
        )}
        
        <img
          src={`${metadata.travel_photo.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
          alt={metadata.city_name}
          width="800"
          height="600"
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>
      
      <div className="space-y-3">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-1">
            {metadata.city_name}
          </h3>
          <p className="text-travel-ocean font-medium">
            📍 {metadata.country}
          </p>
        </div>
        
        <p className="text-gray-600 line-clamp-3">
          {metadata.short_description}
        </p>
        
        {metadata.tags && (
          <div className="flex flex-wrap gap-2">
            {metadata.tags.split(',').slice(0, 3).map((tag, index) => (
              <span 
                key={index} 
                className="tag"
              >
                {tag.trim()}
              </span>
            ))}
          </div>
        )}
        
        <div className="pt-4">
          <a
            href={metadata.affiliate_link}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-button w-full"
          >
            Explore {metadata.city_name} ✈️
          </a>
        </div>
      </div>
    </div>
  );
}