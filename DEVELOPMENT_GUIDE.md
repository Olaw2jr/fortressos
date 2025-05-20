# FortressOS Development Guide 🛠️

Welcome, contributor! This guide provides detailed instructions for setting up your development environment, understanding our project structure, and following our development workflows for FortressOS.

We're thrilled to have you on board and look forward to your contributions to our Next.js application.

## Table of Contents

1. [Introduction](#1-introduction)
2. [Prerequisites](#2-prerequisites)
3. [Project Structure](#3-project-structure)
4. [Environment Setup](#4-environment-setup)
    * [4.1 Cloning the Repository](#41-cloning-the-repository)
    * [4.2 Installing Dependencies](#42-installing-dependencies)
    * [4.3 Environment Variables](#43-environment-variables)
    * [4.4 Database Setup (PostgreSQL)](#44-database-setup-postgresql)
    * [4.5 Running the Development Server](#45-running-the-development-server)
5. [Development Workflow](#5-development-workflow)
    * [5.1 Branching Strategy](#51-branching-strategy)
    * [5.2 Making Changes](#52-making-changes)
    * [5.3 Working with the Next.js App Router](#53-working-with-the-nextjs-app-router)
    * [5.4 Server Components vs. Client Components](#54-server-components-vs-client-components)
    * [5.5 API Routes and Server Actions](#55-api-routes-and-server-actions)
6. [UI Development](#6-ui-development)
    * [6.1 Shadcn UI Components](#61-shadcn-ui-components)
    * [6.2 Tailwind CSS Conventions](#62-tailwind-css-conventions)
    * [6.3 Responsive Design Guidelines](#63-responsive-design-guidelines)
7. [Data Management](#7-data-management)
    * [7.1 Prisma ORM Basics](#71-prisma-orm-basics)
    * [7.2 Schema Migrations](#72-schema-migrations)
    * [7.3 Zod Schema Validation](#73-zod-schema-validation)
    * [7.4 Form Handling](#74-form-handling)
8. [Coding Standards & Conventions](#8-coding-standards--conventions)
    * [8.1 TypeScript Best Practices](#81-typescript-best-practices)
    * [8.2 Linters & Formatters (ESLint, Prettier)](#82-linters--formatters-eslint-prettier)
    * [8.3 Naming Conventions](#83-naming-conventions)
    * [8.4 Code Organization](#84-code-organization)
9. [Testing](#9-testing)
    * [9.1 Running Tests](#91-running-tests)
    * [9.2 Writing Component Tests](#92-writing-component-tests)
    * [9.3 API Testing](#93-api-testing)
    * [9.4 E2E Testing](#94-e2e-testing)
10. [Performance Optimization](#10-performance-optimization)
11. [Debugging](#11-debugging)
12. [Deployment](#12-deployment)

---

## 1. Introduction

This guide is intended for developers contributing code to FortressOS. It complements the general information in `README.md` and `CONTRIBUTING.md` and focuses specifically on the technical aspects of working with our Next.js application.

FortressOS is built with a modern web technology stack centered around:

* **Next.js** with the App Router architecture
* **Shadcn UI** components for consistent and accessible interfaces
* **Tailwind CSS** for styling
* **Prisma ORM** for database management
* **Zod** for schema validation

This guide will help you understand how these technologies work together in our project and how to contribute effectively.

## 2. Prerequisites

Please ensure you have the following tools installed on your system:

* **Git:** Latest stable version
* **Node.js:** v18.17.0 or later (Next.js 14 requirement). We recommend using [nvm](https://github.com/nvm-sh/nvm) to manage Node.js versions
* **Package Manager:** npm (included with Node.js), yarn, or pnpm. This guide will use npm in examples, but equivalent commands exist for other managers
* **Docker:** Latest stable version (optional, but recommended for running PostgreSQL)
* **PostgreSQL:** Version 14 or later (can be run via Docker)
* **IDE/Text Editor:** We recommend [Visual Studio Code](https://code.visualstudio.com/) with the following extensions:

  * ESLint
  * Prettier
  * Tailwind CSS IntelliSense
  * Prisma VS Code Extension
  * PostCSS Language Support
  * GitHub Copilot (optional but helpful)

### Recommended VS Code Extensions

For the best development experience, we recommend installing the following VS Code extensions:

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "prisma.prisma",
    "csstools.postcss",
    "github.copilot",
    "mikestead.dotenv",
    "formulahendry.auto-rename-tag"
  ]
}
```

You can save this as `.vscode/extensions.json` in your project to recommend these extensions to other contributors.

## 3. Project Structure

FortressOS follows the Next.js App Router architecture, making use of React Server Components and other modern patterns. This structure enables better performance, improved SEO, and a great developer experience.

### Directory Layout

Here's the overall project structure:

```plaintext
fortressos/
├── .github/          # GitHub workflows and issue templates
├── .vscode/          # VS Code configurations
├── app/              # Next.js App Router structure
│   ├── (auth)/       # Authentication routes (grouped)
│   ├── api/          # API routes
│   ├── dashboard/    # Dashboard pages
│   ├── error.tsx      # Global error handling
│   ├── layout.tsx     # Root layout with providers
│   └── page.tsx       # Home page
├── components/       # React components
│   ├── ui/           # Shadcn UI components
│   ├── forms/        # Form components
│   ├── layouts/      # Layout components
│   └── dashboard/    # Dashboard-specific components
├── config/           # Configuration files
│   ├── site.ts       # Site metadata
│   └── dashboard.ts   # Dashboard configuration
├── lib/              # Utility functions
│   ├── actions/      # Server actions
│   ├── utils/        # Helper utilities
│   ├── validations/  # Zod schemas
│   └── db.ts         # Prisma client singleton
├── prisma/           # Prisma ORM files
│   ├── schema.prisma # Database schema
│   ├── migrations/   # Database migrations
│   └── seed.ts       # Database seed script
├── public/           # Static assets
├── styles/           # Global styles
├── types/            # TypeScript type definitions
├── .env.example      # Example environment variables
├── .eslintrc.js      # ESLint configuration
├── next.config.js    # Next.js configuration
├── package.json      # Project dependencies
├── postcss.config.js # PostCSS configuration for Tailwind
├── tailwind.config.js # Tailwind CSS configuration
└── tsconfig.json    # TypeScript configuration
```

### Key Directories Explained

#### `/app` Directory

This is the core of the Next.js App Router architecture. Each folder represents a route segment, and special files define behavior:

* `page.tsx` - Renders a UI at a specific route
* `layout.tsx` - Defines shared layouts for pages
* `loading.tsx` - Creates loading UI for segments
* `error.tsx` - Handles errors within segments
* `route.ts` - API endpoints (replaces Next.js pages API routes)

Route groups (folders in parentheses like `(auth)`) organize routes without affecting the URL structure.

#### `/components` Directory

Contains all React components, organized by purpose:

* `/ui` - Shadcn UI components and their customizations
* `/forms` - Form components with React Hook Form and Zod validation
* `/layouts` - Layout components for page structure
* Feature-specific folders for domain components

#### `/lib` Directory

Contains utility functions, helpers, and service modules:

* `/actions` - Server Actions for forms and data mutations
* `/validations` - Zod schemas for data validation
* `/utils` - Utility functions used throughout the application
* `db.ts` - Prisma client with connection management

#### `/prisma` Directory

Manages database interactions using Prisma ORM:

* `schema.prisma` - Defines database schema and relationships
* `/migrations` - Generated SQL migration files
* `seed.ts` - Script to populate database with initial data

## 4. Environment Setup

This section will guide you through setting up your local development environment for FortressOS.

### 4.1 Cloning the Repository

Start by cloning the repository to your local machine:

```bash
# Clone the repository
git clone https://github.com/Olaw2jr/fortressos.git

# Navigate to the project directory
cd fortressos
```

### 4.2 Installing Dependencies

Install the project dependencies using your preferred package manager:

```bash
# Using npm
npm install

# Using yarn
yarn install

# Using pnpm
pnpm install
```

### 4.3 Environment Variables

FortressOS uses environment variables for configuration. Create a `.env.local` file in the root directory by copying the example:

```bash
cp .env.example .env.local
```

Edit the `.env.local` file to set up your local environment variables:

```env
# Database connection (PostgreSQL)  
DATABASE_URL="postgresql://postgres:password@localhost:5432/fortressos?schema=public"

# NextAuth configuration
NEXTAUTH_SECRET="your-nextauth-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Feature flags (if any)
NEXT_PUBLIC_FEATURE_FLAG_EXAMPLE=true
```

### 4.4 Database Setup (PostgreSQL)

FortressOS uses PostgreSQL as its database with Prisma ORM for database operations.

#### Using Docker (Recommended)

The easiest way to run PostgreSQL is using Docker:

```bash
# Start PostgreSQL container
docker run --name fortressos-db -e POSTGRES_PASSWORD=password -e POSTGRES_USER=postgres -e POSTGRES_DB=fortressos -p 5432:5432 -d postgres:14
```

Alternatively, if you have a `docker-compose.yml` file in the project, you can use:

```bash
docker-compose up -d db
```

#### Using Local PostgreSQL Installation

If you prefer to use a local PostgreSQL installation:

1. Install PostgreSQL on your machine
2. Create a database for the project: `createdb fortressos`
3. Update the `DATABASE_URL` in your `.env.local` file accordingly

#### Setup Database Schema

After your PostgreSQL instance is running, set up the database schema using Prisma:

```bash
# Generate Prisma client
npx prisma generate

# Run migrations to create database schema
npx prisma migrate dev

# Seed the database with initial data (if available)
npx prisma db seed
```

### 4.5 Running the Development Server

Start the Next.js development server:

```bash
# Using npm
npm run dev

# Using yarn
yarn dev

# Using pnpm
pnpm dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## 5. Development Workflow

This section covers the recommended development workflow for contributing to FortressOS.

### 5.1 Branching Strategy

We follow a simplified Git Flow branching strategy:

* **main**: Production branch. Only merged into from `develop` after thorough testing.
* **develop**: Primary development branch. Feature branches are created from and merged back into this branch.
* **feature/\<feature-name\>**: For new features or enhancements.
* **fix/\<bug-name\>**: For bug fixes.
* **hotfix/\<hotfix-name\>**: For urgent fixes to production code.

When starting work on a new feature or fix:

```bash
# Ensure you're on the develop branch and it's up to date
git checkout develop
git pull origin develop

# Create a new feature branch
git checkout -b feature/your-feature-name
```

### 5.2 Making Changes

As you work on the codebase, follow these best practices:

* Make small, focused commits with clear commit messages
* Follow the coding standards and conventions (detailed in section 8)
* Write or update tests as you make changes
* Run linters and tests locally before pushing

```bash
# Run linting
npm run lint

# Run tests
npm run test
```

### 5.3 Working with the Next.js App Router

FortressOS uses Next.js with the App Router, which is fundamentally different from the traditional Pages Router.

#### Key Concepts

* **Folder-based routing**: Each folder in the `app` directory represents a route segment
* **Special files**:
  * `page.tsx`: UI for a route
  * `layout.tsx`: Shared UI for a segment and its children
  * `loading.tsx`: Loading UI
  * `error.tsx`: Error UI
  * `route.ts`: API endpoints

#### Route Groups

We use route groups (folders in parentheses like `(auth)`) to organize related routes without affecting the URL structure.

#### Adding New Pages

To add a new page to the application:

1. Determine the route path (e.g., `/dashboard/analytics`)
2. Create the appropriate directory structure (`app/dashboard/analytics`)
3. Add a `page.tsx` file with the page content

```tsx
// app/dashboard/analytics/page.tsx
export default function AnalyticsPage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Analytics Dashboard</h1>
      {/* Page content */}
    </div>
  );
}
```

### 5.4 Server Components vs. Client Components

Next.js App Router uses React Server Components (RSC) by default. Understanding when to use server vs. client components is crucial:

#### Server Components (Default)

Use for:

* Data fetching
* Accessing backend resources directly
* Keeping sensitive data on the server
* Large dependencies that shouldn't be sent to the client

```tsx
// A server component (default)
async function UserProfile({ userId }: { userId: string }) {
  // This data fetching occurs on the server
  const user = await prisma.user.findUnique({ where: { id: userId } });
  
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}
```

#### Client Components

Use for:

* Interactivity and event listeners
* Browser APIs
* React hooks (useState, useEffect, etc.)
* Client-side only libraries

To create a client component, add the `"use client"` directive at the top of the file:

```tsx
"use client";

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

### 5.5 API Routes and Server Actions

FortressOS leverages both API Routes and Server Actions for server-side operations.

#### API Routes

For creating REST or GraphQL endpoints, define route handlers in `app/api` directory:

```ts
// app/api/users/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  const data = await request.json();
  const user = await prisma.user.create({ data });
  return NextResponse.json(user, { status: 201 });
}
```

#### Server Actions

For form submissions and data mutations, use Server Actions:

```tsx
// app/actions/createUser.ts
'use server';

import { prisma } from '@/lib/db';
import { userSchema } from '@/lib/validations/user';

export async function createUser(formData: FormData) {
  const rawData = Object.fromEntries(formData.entries());
  
  // Validate with Zod
  const validatedData = userSchema.parse(rawData);
  
  // Create user in database
  const user = await prisma.user.create({
    data: validatedData
  });
  
  return { success: true, user };
}
```

### 5.6 Submitting Pull Requests

When your changes are ready for review:

1. Push your branch to the remote repository:

```bash
git push origin feature/your-feature-name
```

2. Create a pull request from your branch to the `develop` branch
3. Provide a clear description of your changes
4. Address any feedback from code reviewers
5. Once approved, your changes will be merged

## 6. Working with Shadcn UI and Tailwind CSS

FortressOS uses Shadcn UI components built on Tailwind CSS for its user interface.

### 6.1 Shadcn UI Components

Shadcn UI is not a traditional component library but rather a collection of reusable components that you copy into your project.

#### Adding a New Component

To add a Shadcn UI component to the project:

```bash
npx shadcn-ui@latest add button
```

This will add the button component to the `components/ui` directory. You can then import and use it in your application:

```tsx
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <Button variant="outline">Click me</Button>
  );
}
```

#### Customizing Components

One advantage of Shadcn UI is that you own the components and can customize them as needed. To modify a component:

1. Locate the component in the `components/ui` directory
2. Edit the component to match your requirements
3. The changes will be applied throughout the application

### 6.2 Tailwind CSS Usage

FortressOS follows Tailwind CSS best practices for styling:

* Use utility classes directly in JSX for styling
* Create consistent UI with reusable components
* Leverage the `tailwind.config.js` file for theme customization

#### Example of Tailwind Usage

```tsx
<div className="flex items-center space-x-4 rounded-lg bg-white p-4 shadow-md dark:bg-gray-800">
  <div className="flex-shrink-0">
    <img className="h-12 w-12 rounded-full" src="/avatar.jpg" alt="User avatar" />
  </div>
  <div>
    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Jane Doe</h3>
    <p className="text-sm text-gray-500 dark:text-gray-400">Product Manager</p>
  </div>
</div>
```

#### Custom Theme Configuration

The theme is customized in the `tailwind.config.js` file:

```js
// tailwind.config.js
module.exports = {
  darkMode: ["class"],
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        // Other color definitions...
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
```

## 4. Environment Setup

### 4.1 Cloning the Repository

1. **Fork** the main FortressOS repository (`https://github.com/yourusername/fortressos`) to your GitHub account.
2. **Clone your fork** locally:

    ```bash
    git clone [https://github.com/YOUR_GITHUB_USERNAME/fortressos.git](https://github.com/YOUR_GITHUB_USERNAME/fortressos.git)
    cd fortressos
    ```

3. **Add the upstream repository:**

    ```bash
    git remote add upstream [https://github.com/yourusername/fortressos.git](https://github.com/yourusername/fortressos.git)
    ```

### 4.2 Monorepo Setup (Yarn Workspaces)

Install all dependencies for all workspaces (frontend, backend, shared packages) from the root directory:

```bash
yarn install
```

This command will link the local packages (e.g., shared-types) so they can be imported directly by the frontend and backend.

### 4.3 Environment Variables

Environment variables are crucial for configuring the application.

Root .env (for Docker Compose):
If a docker-compose.yml at the root manages services like PostgreSQL, it might use variables from a root .env file. Copy .env.example to .env in the root directory and configure it.

```Bash

cp .env.example .env
Backend .env:
Navigate to the backend app directory (e.g., apps/backend) and copy its example environment file.
```

```Bash

cd apps/backend
cp .env.example .env
Edit apps/backend/.env with your database credentials, JWT secrets, API ports, etc. Key variables:

DATABASE_HOST, DATABASE_PORT, DATABASE_USER, DATABASE_PASSWORD, DATABASE_NAME
JWT_SECRET, JWT_EXPIRES_IN
PORT (e.g., 3001 or 5000)
Frontend .env.local:
Navigate to the frontend app directory (e.g., apps/frontend) and copy its example environment file. Next.js uses .env.local for local overrides.
```

```Bash

cd apps/frontend
cp .env.example .env.local
Edit apps/frontend/.env.local. Key variables:

NEXT_PUBLIC_API_URL (e.g., <http://localhost:3001/api> - pointing to your local backend)
PORT (e.g., 3000 - if different from Next.js default)
Ensure your .env and .env.local files are added to .gitignore at their respective levels (they usually are by default in .gitignore templates).
```

### 4.4 Database Setup (PostgreSQL)

You can run PostgreSQL using Docker (recommended for ease) or a local installation.

Using Docker (Recommended):
A docker-compose.yml file might be provided in the root of the project or in the database directory to easily spin up a PostgreSQL instance.

```Bash
# From the root directory, if docker-compose.yml includes postgres

docker-compose up -d postgres # Or a specific service name for postgres

# If you have a separate docker-compose for the DB in database/

cd database
docker-compose up -d
Ensure the PostgreSQL version matches project requirements.
The database name, user, and password should match what you've set in apps/backend/.env. You might need to manually create the database and user initially if the Docker setup doesn't do it automatically, or connect with a superuser to create them.
Manual PostgreSQL Installation:
If you have PostgreSQL installed locally:

Ensure the service is running.
Create a dedicated user and database for FortressOS:
SQL

CREATE USER fortressos_user WITH PASSWORD 'your_secure_password';
CREATE DATABASE fortressos_db OWNER fortressos_user;
(Adjust names and password to match your .env configuration.)
4.5 Backend Setup (NestJS)
Assuming the backend is in apps/backend:

Navigate to the backend directory:

Bash

cd apps/backend
Install dependencies (if you skipped the root yarn install or need to re-verify):

Bash

yarn install
Run Database Migrations:
We'll assume TypeORM is used with NestJS. The package.json in apps/backend should have scripts for migrations.

Bash

yarn typeorm:migration:run # Or a similar script like `yarn db:migrate`
(See the Working with the Database section for more on migrations.)

Seed Initial Data (Optional):
If there's a seeding script:

Bash

yarn db:seed # Or a similar script
Start the Backend Development Server:

Bash

yarn start:dev
This will typically start the NestJS server on the port defined in apps/backend/.env (e.g., <http://localhost:3001>). It will watch for file changes and automatically reload.

4.6 Frontend Setup (Next.js)
Assuming the frontend is in apps/frontend:

Navigate to the frontend directory:
Bash

cd apps/frontend
Install dependencies (if you skipped the root yarn install or need to re-verify):
Bash

yarn install
Start the Frontend Development Server:
Bash

yarn dev
This will start the Next.js development server, usually on <http://localhost:3000>.
4.7 Running the Full Stack
Ensure your PostgreSQL database is running.
Start the backend development server (e.g., in one terminal).
Start the frontend development server (e.g., in another terminal).
Open your browser and navigate to the frontend URL (e.g., <http://localhost:3000>).
5. Development Workflow
5.1 Branching Strategy
Please refer to the Branching Strategy section in CONTRIBUTING.md. Always create feature or bugfix branches off the develop branch.

5.2 Making Changes
Backend: Modify files within apps/backend/src. The dev server should auto-reload.
Frontend: Modify files within apps/frontend/. The Next.js dev server supports Fast Refresh.
Shared Packages: If you modify code in packages/shared-types, both frontend and backend dev servers (if configured correctly with Yarn Workspaces and watching) might pick up changes. Sometimes a restart of the consuming service (frontend/backend) might be needed.
5.3 API Communication
The frontend communicates with the backend via HTTP requests to API endpoints.
The NEXT_PUBLIC_API_URL in the frontend's .env.local file defines the base URL for these requests.
Ensure Cross-Origin Resource Sharing (CORS) is configured correctly on the backend to allow requests from your local frontend development server (e.g., <http://localhost:3000>). NestJS provides easy ways to configure CORS.
6. Coding Standards & Conventions
6.1 TypeScript
Utilize TypeScript's features for strong typing across both frontend and backend.
Define clear interfaces and types for data structures, API payloads, and props.
Store shared types (e.g., API request/response DTOs, entity models) in the packages/shared-types workspace to ensure consistency.
Enable strict mode and other recommended compiler options in tsconfig.json.
6.2 Linters & Formatters (ESLint, Prettier)
The project is configured with ESLint for code analysis and Prettier for code formatting.
Configurations (.eslintrc.js, .prettierrc.js, .editorconfig) are at the root and potentially overridden/extended in workspaces.
It's crucial to format your code before committing.
Bash

# From the root, to lint all workspaces

yarn lint
yarn lint:fix # To automatically fix issues

yarn format # To format all files with Prettier
Consider configuring your IDE to auto-format on save using these tools.
6.3 Naming Conventions
Variables & Functions: camelCase
Classes & Interfaces (Types): PascalCase
Constants: UPPER_SNAKE_CASE
Files (Components/Modules): kebab-case.ts or PascalCase.tsx for React components. Follow existing patterns within each workspace.
6.4 API Design
(Assuming RESTful for now)

Follow RESTful principles for API endpoint design.
Use appropriate HTTP verbs (GET, POST, PUT, DELETE, PATCH).
Use clear and consistent URL naming (e.g., /api/v1/users, /api/v1/risks/:id).
Version your API (e.g., /api/v1/).
Use standard HTTP status codes for responses.
Request and response bodies should generally be JSON.
7. Testing
7.1 Running Tests
Each workspace (apps/backend, apps/frontend, packages/*) will have its own test scripts defined in its package.json.

Backend (NestJS/Jest):

Bash

cd apps/backend
yarn test         # Run all unit and integration tests
yarn test:watch   # Run tests in watch mode
yarn test:cov     # Run tests and generate coverage report
yarn test:e2e     # Run end-to-end tests (if configured)
Frontend (Next.js/Jest/React Testing Library):

Bash

cd apps/frontend
yarn test         # Run all tests
yarn test:watch   # Run tests in watch mode
To run all tests for all workspaces from the root (if configured):

Bash

# This might require a root script in the main package.json

yarn test:all
7.2 Writing Tests
Unit Tests: Isolate and test individual functions, modules, or components. Mock dependencies where necessary.
Integration Tests (Backend): Test interactions between different modules, services, and the database layer. NestJS provides utilities for this.
Component Tests (Frontend): Use React Testing Library to test React components by interacting with them as a user would.
Strive for meaningful test coverage. Quality over quantity.
Refer to the testing documentation for NestJS, Jest, and React Testing Library.
8. Debugging
Frontend (Next.js):
Use browser developer tools (Console, Network, Sources tabs).
VS Code's JavaScript debugger can be attached to the browser process.
console.log() is your friend for quick checks.
Backend (NestJS):
Use VS Code's Node.js debugger. Configure a launch.json file in .vscode at the root or in apps/backend/.vscode. Example launch.json for NestJS:
JSON

{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "attach",
      "name": "Attach to NestJS",
      "port": 9229, // Default inspect port
      "restart": true,
      "skipFiles": ["<node_internals>/**"]
    }
  ]
}
Then run your backend dev server with the inspect flag:
Bash

yarn start:dev --inspect-brk # or check package.json for specific debug script
Use console.log() or NestJS's built-in LoggerService.
9. Working with the Database
(Assuming TypeORM for NestJS)

9.1 Migrations (TypeORM)
Database schema changes should be managed through migration files.

Generating a Migration:
After making changes to your TypeORM entities in apps/backend/src, you can generate a migration file:

Bash

cd apps/backend
yarn typeorm:migration:generate -n MyMigrationName

# Example: yarn typeorm:migration:generate -n CreateUserTable

This will create a new migration file in database/migrations (or the configured path). Review the generated SQL and adjust if necessary.

Running Migrations:
To apply pending migrations to your database:

Bash

cd apps/backend
yarn typeorm:migration:run # or yarn db:migrate
Reverting Migrations:
To revert the last applied migration:

Bash

cd apps/backend
yarn typeorm:migration:revert # or yarn db:migrate:undo
Always commit your migration files along with your entity changes.

9.2 Seeding Data
Seed files can be used to populate the database with initial or test data.

Create seed files (e.g., in database/seeds).
Run the seeding script (e.g., yarn db:seed) as defined in apps/backend/package.json. This script would typically use TypeORM's entity manager or query builder to insert data.
9.3 Database GUI Clients
Using a GUI client like pgAdmin or DBeaver can be helpful to inspect your database schema, view data, and run queries directly. Connect using the credentials from your apps/backend/.env file.

10. Building for Production (Locally)
To test production builds locally (though actual deployment is via Docker):

Backend:

Bash

cd apps/backend
yarn build
yarn start:prod # This would run the compiled JavaScript from the 'dist' folder
Frontend:

Bash

cd apps/frontend
yarn build
yarn start # This serves the optimized Next.js production build
11. Common Issues & Troubleshooting
Port Conflicts: Ensure backend and frontend ports are unique and not used by other applications.
Environment Variables: Double-check that all .env files are correctly configured and loaded.
Database Connection Issues: Verify database service is running, credentials are correct, and network access is allowed.
CORS Errors: Ensure the backend allows requests from the frontend's origin during development.
Yarn Workspace Issues: If changes in packages/shared-types are not reflected, try restarting the dev servers or running yarn install again from the root. Sometimes yarn cache clean followed by yarn install can help.
Outdated Dependencies: Run yarn outdated in workspaces or the root to check for updates. Update carefully and test thoroughly.
12. Keeping Your Fork Updated
To keep your local fork and its develop branch up-to-date with the upstream FortressOS develop branch:

Ensure your current working directory is clean.
Fetch changes from upstream:
Bash

git fetch upstream
Checkout your local develop branch:
Bash

git checkout develop
Merge changes from upstream/develop into your local develop:
Bash

git merge upstream/develop
Push the updated develop branch to your fork on GitHub (optional, but good practice):
Bash

git push origin develop
When starting a new feature branch, always branch off your updated local develop branch.
Thank you for taking the time to read this guide! If you have suggestions for improving it, please open an issue or a PR. Happy coding!

---

**Key Considerations for You:**

1. **Backend Stack Confirmation:** This guide heavily assumes a Node.js/NestJS/TypeORM backend and Yarn Workspaces. If you choose a different backend stack (e.g., Python/FastAPI with SQLAlchemy/Alembic, or Go with GORM), you'll need to significantly update sections like "Backend Setup", "Working with the Database (Migrations)", "Debugging (Backend)", etc., with the relevant commands and tools for that stack.
2. **Monorepo Tooling:** Confirm if Yarn Workspaces is the chosen tool, or if alternatives like Lerna, Turborepo, or Nx will be used. The setup and commands might vary slightly.
3. **Specific Script Names:** The `package.json` scripts (`db:migrate`, `db:seed`, `typeorm:migration:run`, `start:dev`, etc.) are examples. You'll need to ensure these match the actual scripts in your project's `package.json` files.
4. **`.nvmrc`:** If you add an `.nvmrc` file to the root to specify the Node.js version, mention it in the prerequisites.
5. **Detailed `.env.example` files:** Ensure these are comprehensive in each app directory (`apps/backend/.env.example`, `apps/frontend/.env.example`).
6. **Simplicity vs. Detail:** This guide is quite detailed. You might choose to simplify sections or link out to framework-specific documentation for very common tasks to keep it more focused on FortressOS specifics.
7. **Review and Update:** This is a living document. As the project evolves, tools change, or conventions are refined, this guide will need updates.

This `DEVELOPMENT_GUIDE.md` should give your contributors a very solid starting point!
