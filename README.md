# My Travel Picks

![My Travel Picks Preview](https://imgix.cosmicjs.com/0443abc0-90a6-11f0-bcbd-9176d0adbb08-photo-1488646953014-85cb44e25828-1757770314388.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern, minimal travel landing page showcasing beautiful destinations with GetYourGuide affiliate integration. Built for social media bio links and optimized for mobile-first discovery.

## ✨ Features

- **Beautiful Destination Cards** - Large travel photos with smooth hover animations
- **Real-Time Search** - Instantly filter destinations by name, country, or tags  
- **Featured Destinations** - Highlight special locations with priority placement
- **Mobile-Optimized** - Perfect for Instagram/TikTok bio link traffic
- **Affiliate Integration** - GetYourGuide booking links with proper tracking
- **Dynamic Content** - Powered by Cosmic CMS for easy updates
- **Responsive Design** - Beautiful on all devices with rounded corners and soft shadows
- **Clean Typography** - Poppins font for modern, elegant appeal

## ## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=68c571ce0a2eeaef39f42bc3&clone_repository=68c5732a0a2eeaef39f42bd6)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a modern, minimal, and beautiful travel landing page called 'My Travel Picks'.
> The page should display a grid of destination cards. Each card has: a large travel photo, the city name, a short description, and a button 'Book Now' that links to my GetYourGuide affiliate link.
> Add a search bar at the top so users can quickly search for a destination.
> At the top, display my custom travel logo in the header.
> Use clean fonts like Lato or Poppins, rounded corners, soft shadows, and smooth hover animations on the cards.
> The style should feel light, elegant, and perfect for a travel brand.
> Make sure the website is mobile-friendly and optimized for Instagram/TikTok users coming from bio links."

### Code Generation Prompt

> Based on the content model I created for the travel landing page prompt above, now build a complete web application that showcases this content. Include a modern, responsive design with proper navigation, content display, and user-friendly interface.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠️ Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling with custom design system
- **Cosmic CMS** - Headless CMS for content management
- **Poppins Font** - Clean, modern typography
- **Responsive Design** - Mobile-first approach

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account with your travel content

### Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   bun install
   ```

3. Copy the environment variables:
   ```bash
   cp .env.example .env.local
   ```

4. Add your Cosmic credentials to `.env.local`:
   ```env
   COSMIC_BUCKET_SLUG=your-bucket-slug
   COSMIC_READ_KEY=your-read-key
   COSMIC_WRITE_KEY=your-write-key
   ```

5. Run the development server:
   ```bash
   bun dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📖 Cosmic SDK Examples

### Fetching Site Settings
```typescript
import { cosmic } from '@/lib/cosmic'

const settings = await cosmic.objects.findOne({
  type: 'site-settings',
  slug: 'my-travel-picks-settings'
}).depth(1)

console.log(settings.object.metadata.site_title) // "My Travel Picks"
```

### Getting All Destinations
```typescript
const destinations = await cosmic.objects.find({
  type: 'destinations'
}).props(['id', 'title', 'slug', 'metadata']).depth(1)

console.log(destinations.objects) // Array of destination objects
```

### Search Destinations
```typescript
const searchResults = await cosmic.objects.find({
  type: 'destinations',
  $or: [
    { 'metadata.city_name': { $regex: searchTerm, $options: 'i' } },
    { 'metadata.country': { $regex: searchTerm, $options: 'i' } },
    { 'metadata.tags': { $regex: searchTerm, $options: 'i' } }
  ]
}).depth(1)
```

## 🎨 Cosmic CMS Integration

This app leverages two main content types:

### Site Settings (Singleton)
- **Site Title** - Main site title
- **Site Logo** - Custom travel logo for header
- **Header Tagline** - Subtitle under logo
- **Search Placeholder** - Search bar placeholder text
- **Footer Text** - Footer content

### Destinations
- **City Name** - Destination city
- **Country** - Country location
- **Short Description** - Brief card description (max 200 chars)
- **Travel Photo** - Large, high-quality destination image
- **GetYourGuide Affiliate Link** - Booking link with affiliate tracking
- **Featured** - Toggle for priority display
- **Tags** - Comma-separated search tags

## 🌐 Deployment Options

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add your environment variables in Vercel dashboard
4. Deploy!

### Deploy to Netlify

1. Push your code to GitHub
2. Connect your repository to [Netlify](https://netlify.com)
3. Set build command to `bun run build`
4. Set output directory to `.next`
5. Add environment variables
6. Deploy!

---

**Built with Cosmic** - The headless CMS for modern web applications.
<!-- README_END -->