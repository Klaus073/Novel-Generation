# Public AI

## Frontend Environment Variables

To run the frontend of this project, you will need to set up the following environment variables:

- `VITE_SUPABASE_URL`: The URL of your Supabase project. This URL is used by the frontend to connect to Supabase for data fetching and manipulation.
- `VITE_SUPABASE_KEY`: The API key of your Supabase project. This key is used by the frontend to authenticate and authorize requests to your Supabase project.
- `VITE_SITE_URL`: The URL of the live backend (without a forward slash on the end) to make API calls.
  To set up these environment variables:

1. Create a `.env` file in the root of the frontend folder.
2. Add the required environment variables in the following format:

VITE_SUPABASE_URL=https://your-supabase-url.com
VITE_SUPABASE_KEY=your-supabase-api-key
VITE_SITE_URL=https://the-backend-url.com

3. Replace `https://your-supabase-url.com` with the actual URL of your Supabase project.
4. Replace `your-supabase-api-key` with the actual API key of your Supabase project.
5. Replace `https://the-backend-url.com` with the actual URL to make API calls to backend

## Running the Project

To run the frontend of this project, follow these steps:

1. Install dependencies using `npm install` or `yarn install`.
2. Start the development server using `npm run dev` or `yarn dev`.
3. Open your browser and navigate to the specified address to view the project.

### Step By Step Guide

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

### Installation

1. **Clone the repository:**

   ```bash
   git clone ssh
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

### Configuration

1. **Create a `.env` file in the root of the project:**

   ```bash
   touch .env
   ```

2. **Add the following environment variables to `.env`:**

   ```env
   VITE_SUPABASE_URL:
   VITE_SUPABASE_KEY:
   VITE_SITE_URL:
   ```

### Running the Project

```bash
npm run dev
```
