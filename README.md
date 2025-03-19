# FreelanceHub

FreelanceHub is a platform designed to connect freelancers with clients, enabling seamless job postings, proposals, and project management.

## Features

- **Job Posting**: Clients can post jobs with detailed descriptions and requirements.
- **Freelancer Dashboard**: Freelancers can view job postings, submit proposals, and manage their projects.
- **Authentication**: Secure login and registration for both clients and freelancers.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Tailwind CSS**: Styled using Tailwind CSS for a modern and consistent UI.

## Tech Stack

- **Frontend**: Next.js, React
- **Styling**: Tailwind CSS
- **Backend**: Prisma, API routes in Next.js
- **Database**: MongoDB
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm
- MongoDB database

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/FreelanceHub.git
   cd FreelanceHub
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
    If any error shows
    ```bash
    npm install --legacy-peer-deps
    ```
3. Set up the environment variables:

    Create a .env file in the root directory and add the following:
    ```bash
    DATABASE_URL=
    NEXTAUTH_URL=http://localhost:3000
    GITHUB_ID=
    GITHUB_SECRET=
    GOOGLE_CLIENT_ID=
    GOOGLE_CLIENT_SECRET=
    NEXTAUTH_SECRET=
    ```
4. Run database migrations:

    ```bash
    npx prisma generate
    npx prisma db push
    ```
5. Run the project
    ```bash
    npm run dev
    ```
