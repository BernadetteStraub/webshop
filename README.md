# Webshop Mark Manufaktur

A full-stack web application built with a Node.js backend, Angular frontend, and Prisma ORM for database management.

## Features
- REST API powered by Node.js and Express
- Frontend built with Angular and Angular Material
- Prisma ORM for database interactions
- Authentication and authorization
- CRUD operations

## Tech Stack
### Backend:
- Node.js
- Express.js
- Prisma ORM
- PostgreSQL

### Frontend:
- Angular
- Angular Material
- TypeScript

## Prerequisites
Ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/)
- [Angular CLI](https://angular.io/cli)
- [PostgreSQL](https://www.postgresql.org/)
- [Prisma CLI](https://www.prisma.io/)

## Installation

### Backend Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/yourproject.git
   cd yourproject/backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Configure environment variables:
   Create a `.env` file in the `backend` directory and add the following:
   ```env
   DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/DATABASE_NAME"
   JWT_SECRET="your_jwt_secret"
   ```
4. Initialize Prisma:
   ```sh
   npx prisma migrate dev --name init
   ```
5. Start the backend server:
   ```sh
   npm run dev
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```sh
   cd ../frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Configure environment variables:
   Create an `environment.ts` file inside `src/environments/`:
   ```ts
   export const environment = {
     production: false,
     apiUrl: 'http://localhost:3000/api'
   };
   ```
4. Start the Angular development server:
   ```sh
   ng serve
   ```

## Usage
- Open `http://localhost:4200` to view the Angular frontend.
- API requests will be handled by the Node.js backend running on `http://localhost:3000`.

## Scripts
### Backend
- `npm run dev` - Start the backend server in development mode
- `npm run build` - Build the backend
- `npx prisma studio` - Open Prisma Studio for database management

### Frontend
- `ng serve` - Start the frontend in development mode
- `ng build` - Build the frontend for production

## Deployment
For production, configure the backend and frontend build processes accordingly. Ensure environment variables are properly set up.
