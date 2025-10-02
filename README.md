# 🎮 Gaming Hub

A modern, full-stack gaming discovery platform built with Next.js 15, featuring comprehensive game information, user authentication, and a beautiful responsive design.

**[Live Demo](https://gaming-hub.harshthkkr.dev)**

![Gaming Hub](https://img.shields.io/badge/Next.js-15.5.0-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![Prisma](https://img.shields.io/badge/Prisma-6.16.1-2D3748?style=for-the-badge&logo=prisma)

## Features

### Core Functionality

- **Game Discovery**: Browse and search through thousands of games
- **Advanced Filtering**: Filter by genres, platforms, developers, and release years
- **Detailed Game Pages**: Comprehensive game information including screenshots, ratings, release date and time to beat
- **Search Functionality**: Intelligent search with real-time results
- **Upcoming Games**: Track games releasing soon
- **Gaming Events**: Stay updated with gaming industry events

### User Features

- **Google OAuth Authentication**: Secure login with NextAuth.js
- **User Profiles**: Personalized gaming experience
- **Wishlist System**: Save games for later
- **Theme Toggle**: Dark/Light mode support
- **Responsive Design**: Optimized for all device sizes

## Tech Stack

### Frontend

- **Framework**: Next.js 15.5.0 with App Router
- **Language**: TypeScript 5.0
- **Styling**: Tailwind CSS 4.0
- **Theme**: Next Themes 0.4.6

### Backend

- **API Routes**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM 6.16.1
- **Authentication**: NextAuth.js 5.0 (Beta)
- **HTTP Client**: Axios 1.11.0

### Data Source

- **Gaming Data**: IGDB (Internet Game Database) API

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- PostgreSQL database
- IGDB API credentials
- Google OAuth credentials

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/harshthakkr/gaming-hub.git
   cd gaming-hub
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**

   Create `.env` file (for database configuration):

   ```bash
   touch .env
   ```

   Add your database URL to `.env`:

   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/gaming_hub"
   ```

   Create `.env.local` file (for other variables):

   ```bash
   cp .env.example .env.local
   ```

   Fill in your actual values in `.env.local`:

   ```env
   # Application URL (for server-side API calls)
   NEXT_PUBLIC_APP_URL="http://localhost:3000"

   # IGDB API
   NEXT_PUBLIC_BASE_URL="https://api.igdb.com/v4"
   NEXT_PUBLIC_CLIENT_ID="your_igdb_client_id"
   NEXT_PUBLIC_CLIENT_SECRET="your_igdb_client_secret"
   NEXT_PUBLIC_ACCESS_TOKEN="Bearer your_igdb_access_token"

   # NextAuth.js (Google OAuth)
   AUTH_SECRET="your_auth_secret"
   AUTH_GOOGLE_ID="your_google_client_id"
   AUTH_GOOGLE_SECRET="your_google_client_secret"
   ```

   **For production**, create `.env.production` and update the app URL:

   ```env
   NEXT_PUBLIC_APP_URL="https://your-production-domain.com"
   ```

4. **Database Setup**

   ```bash
   # Generate Prisma client
   npx prisma generate

   # Run database migrations
   npx prisma migrate dev

   # Optional: Open Prisma Studio
   npx prisma studio
   ```

5. **Run the development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## API Endpoints

### Games

- `GET /api/games` - Get all games with pagination
- `GET /api/games/[slug]` - Get detailed game information
- `GET /api/search?q=[query]` - Search games by name

### Categories

- `GET /api/genres` - Get all game genres
- `GET /api/genres/[slug]` - Get games by genre
- `GET /api/platforms` - Get all gaming platforms
- `GET /api/platforms/[slug]` - Get games by platform
- `GET /api/developers` - Get all game developers
- `GET /api/developers/[slug]` - Get games by developer

### Special Collections

- `GET /api/2025` - Get games releasing in 2025
- `GET /api/upcoming-games` - Get upcoming game releases
- `GET /api/events` - Get gaming events
- `GET /api/events/[slug]` - Get specific event details

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Contact

Harsh Thakkar - [@harshthkkr](https://x.com/harshthkkr)

---

**Built with 🖤 for gamers**
