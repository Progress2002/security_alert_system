# Security Alert System

A lightweight incident reporting and administration web application built with React, TypeScript, Vite and Supabase. The app allows users to submit security incident reports and provides an admin dashboard for reviewing and managing reports.

## Key features

- Submit incident reports (title, description, location, student info)
- View user-specific and all reports (admin)
- Update report status (admin)
- Authentication and role-protected routes
- Built with React Query for data fetching and Supabase for backend/storage

- Collects the user's exact geographic location (latitude/longitude) when a report is submitted
- Google Maps integration for admins: submitted coordinates are displayed on an interactive map so security personnel can locate and track incidents using standard map features (zoom, pan, markers)

## Tech stack

- React 19 + TypeScript
- Vite
- Tailwind CSS
- Supabase (Postgres + Auth)
- React Router, React Query, React Hook Form

## Quick start

Prerequisites

- Node.js (recommended v18+)
- npm

Clone and install

```powershell
git clone git@github.com:Progress2002/security_alert_system.git
cd security_alert_system
npm install
```

Environment

Create a `.env` file in the project root with the following variables (Vite expects variables prefixed with VITE_):

```
VITE_SUPABASE_URL=<your-supabase-url>
VITE_SUPABASE_KEY=<your-supabase-anon-or-service-key>
VITE_GOOGLE_MAPS_API_KEY=<your-google-maps-api-key>
```

Run the app (development)

```powershell
npm run dev
```

Build and preview

```powershell
npm run build
npm run preview
```

Available scripts (from package.json)

- `dev` — start Vite dev server
- `build` — TypeScript build and Vite production build
- `preview` — preview production build
- `lint` — run ESLint

## Project structure (high level)

- `src/` — application source
	- `pages/` — route pages (Home, SignIn, Admin views)
	- `components/` — UI components and layout
	- `services/` — API wrappers (Supabase client + endpoints)
	- `contexts/` — auth context

## Deployment

This project is compatible with static-site platforms such as Vercel. Ensure the VITE_SUPABASE_* environment variables are set in the deployment environment.

## Notes

- Supabase is used for both authentication and data storage. Use a service role key carefully — prefer anon keys for client usage and secure server-side operations.
- This README is intentionally concise. See source files (especially `src/services` and `src/contexts/AuthContext.tsx`) for implementation details.

- The application collects precise user location (with user permission) at report submission. Location coordinates are sent to Supabase and displayed to authorized admin users on a Google Map.
- Privacy & permissions: the app requests location permissions from the user's device/browser at the time of report submission. Make sure your deployment includes a privacy policy and that you follow applicable laws and platform requirements when collecting location data.
- Google Maps API: add `VITE_GOOGLE_MAPS_API_KEY` to the environment and restrict the API key to your domain(s) in the Google Cloud Console.


