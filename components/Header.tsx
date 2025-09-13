import { SiteSettings } from '@/types';

interface HeaderProps {
  settings: SiteSettings | null;
}

export default function Header({ settings }: HeaderProps) {
  const siteTitle = settings?.metadata?.site_title || 'My Travel Picks';
  const headerTagline = settings?.metadata?.header_tagline || 'Discover Your Next Adventure';
  const siteLogo = settings?.metadata?.site_logo;

  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          {siteLogo && (
            <div className="mb-6">
              <img 
                src={`${siteLogo.imgix_url}?w=200&h=80&fit=crop&auto=format,compress`}
                alt={siteTitle}
                width="200"
                height="80"
                className="mx-auto rounded-lg shadow-sm"
              />
            </div>
          )}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            {siteTitle}
          </h1>
          {headerTagline && (
            <p className="text-xl text-gray-600 font-light">
              {headerTagline}
            </p>
          )}
        </div>
      </div>
    </header>
  );
}