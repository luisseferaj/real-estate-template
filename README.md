# Real Estate Agency Website Template

A modern, full-stack real estate website built with Next.js, Supabase, and Cloudinary. Includes a complete admin panel, bilingual support, and everything you need to launch a professional real estate agency website.

## Features

- 🏠 Property listings with search and filtering
- 📸 Photo gallery and video support per property
- 🌍 Bilingual support (English + any language)
- 📢 News/notifications system with photo and video
- 👥 Agent profiles management
- 📊 Editable stats section
- 🗺️ Area/city cards
- 🔐 Secure admin panel
- ☁️ Cloudinary image/video uploads
- 📱 Fully responsive
- 🔍 SEO ready (sitemap, robots.txt, Open Graph)
- ⚡ Deployed on Vercel (free tier)

## Tech Stack

- **Frontend**: Next.js 15, Tailwind CSS
- **Database**: Supabase (free tier)
- **Storage**: Cloudinary (free tier)
- **Hosting**: Vercel (free tier)
- **Auth**: Supabase Auth

## Setup Guide

### 1. Clone the repository
```bash
git clone your-repo-url
cd real-estate
npm install
```

### 2. Set up Supabase
1. Create a free account at [supabase.com](https://supabase.com)
2. Create a new project
3. Go to SQL Editor and run the schema from `database/schema.sql`
4. Go to Authentication → Users → Add user (this is your admin login)

### 3. Set up Cloudinary
1. Create a free account at [cloudinary.com](https://cloudinary.com)
2. Go to Settings → Upload → Upload presets → Add preset
3. Name it `real-estate`, set to **Unsigned**

### 4. Environment variables
Create a `.env.local` file in the root:

NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name

### 5. Add your photos
Add these files to the `/public` folder:
- `logo.jpeg` — your company logo
- `description.jpeg` — company photo/flyer (shown on homepage)
- `images/hero-architecture.jpg` — hero section background
- `images/cta-city.jpg` — CTA section background
- `cities/area1.jpg`, `cities/area2.jpg` etc. — area card photos
- Favicon files (generate at [favicon.io](https://favicon.io))

### 6. Configure your company info
Edit `lib/config.ts`:
```typescript
export const config = {
  companyName: "Your Company Name",
  tagline: "Your tagline here",
  phone: "+1 234 567 890",
  email: "hello@yourcompany.com",
  whatsapp: "1234567890",
  instagram: "@yourinstagram",
  address: "Your City, Your Country",
  founderName: "Your Name",
  founderRole: "Your Role",
  aboutDescription: "Your company description",
  missionStatement: "Your mission statement",
  slogan: "Your slogan",
  instagramUrl: "https://instagram.com/yourinstagram",
  whatsappUrl: "https://wa.me/1234567890",
  siteUrl: "https://yourwebsite.com",
  siteDescription: "Your SEO description",
}
```

### 7. Update area cards
Edit `components/areas-section.tsx` — update the `areas` array with your cities/neighborhoods.

### 8. Deploy to Vercel
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repository
3. Add environment variables in Vercel dashboard
4. Deploy!

### 9. Set up admin account
Go to `yoursite.com/admin` and log in with the credentials you created in Supabase.

## Admin Panel

Access at `/admin` — manage:
- **Properties** — add/edit/delete listings with photos, gallery, video
- **Notifications** — post news and announcements
- **Agents** — manage team members
- **Stats** — edit homepage statistics

## Database Schema

Run this SQL in your Supabase SQL Editor to create all tables:

See `database/schema.sql`

## Customization

### Colors
Edit `app/globals.css` — change the CSS variables for primary/accent colors.

### Languages
The template supports bilingual content. English is default. To add another language, edit `lib/i18n.ts`.

### Currency
Change `currency` in `lib/config.ts`.

## Support

For questions or customization help, contact luisseferaj1@gmail.com.

## 🚀 Get the full version
[Buy on Gumroad](https://luisseferaj.gumroad.com/l/iyndv?_gl=1*1or4ohf*_ga*MTY4MzIzNzk5Mi4xNzg2NTIxMjQw*_ga_6LJN6D94N6*czE3ODcwMzk4NTMkbzUkZzEkdDE3ODcwNDEyMzEkajI1JGwwJGgw)

## License

This template is licensed for single use. One license per website.
