# RoomFinder - Find Your Perfect Room in Nepal

A modern room finder application built with Next.js 15, MongoDB, and NextAuth. Browse, list, and manage room rentals across Nepal.

## Features

- 🏠 Property listing and browsing
- 🔍 Advanced search functionality
- ❤️ Save favorite properties
- 💬 Inquiry system for property owners
- 📊 Dashboard for property management
- 🔔 Real-time notifications
- 👥 User authentication (Email & Google)
- 🎨 Modern UI with dark mode support
- 📱 Progressive Web App (PWA) support

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Database:** MongoDB with Mongoose
- **Authentication:** NextAuth.js
- **Styling:** Tailwind CSS v4
- **UI Components:** Radix UI
- **Image Upload:** Cloudinary
- **Notifications:** React Hot Toast

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB database
- Cloudinary account (for image uploads)

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd roomfinder
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env.local` file:

```env
# Database
MONGODB_URI=your_mongodb_connection_string

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_key

# Google OAuth (optional)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

4. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Deploy on Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/roomfinder)

1. Push your code to GitHub
2. Import project to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Vercel

Add these in your Vercel project settings:

- `MONGODB_URI`
- `NEXTAUTH_URL` (your Vercel domain)
- `NEXTAUTH_SECRET`
- `GOOGLE_CLIENT_ID` (optional)
- `GOOGLE_CLIENT_SECRET` (optional)
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

## Project Structure

```
roomfinder/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Auth pages (login, signup)
│   ├── (authenticated)/   # Protected pages (profile, favorites)
│   ├── (marketing)/       # Public pages (home, properties)
│   └── dashboard/         # Dashboard pages
├── components/            # React components
├── lib/                   # Utilities and configurations
│   ├── actions/          # Server actions
│   ├── db/               # Database models
│   └── types/            # TypeScript types
└── public/               # Static assets
```

## User Roles

- **User:** Browse properties, save favorites, send inquiries
- **Owner:** List properties, manage inquiries, view analytics
- **Admin:** Full access to all properties, users, and inquiries

## Contributing

Contributions are welcome! Please check [TODO.md](TODO.md) for pending features.

## License

MIT
