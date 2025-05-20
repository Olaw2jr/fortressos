# FortressOS Development Guide 🛠️

Welcome, contributor! This guide provides detailed instructions for setting up your development environment, understanding our project structure, and following our development workflows for FortressOS.

We're thrilled to have you on board!

## Table of Contents

1. [Introduction](#1-introduction)
2. [Prerequisites](#2-prerequisites)
3. [Project Structure](#3-project-structure)
4. [Environment Setup](#4-environment-setup)
    * [4.1 Cloning the Repository](#41-cloning-the-repository)
    * [4.2 Monorepo Setup (Yarn Workspaces)](#42-monorepo-setup-yarn-workspaces)
    * [4.3 Environment Variables](#43-environment-variables)
    * [4.4 Database Setup (PostgreSQL)](#44-database-setup-postgresql)
    * [4.5 Backend Setup (NestJS)](#45-backend-setup-nestjs)
    * [4.6 Frontend Setup (Next.js)](#46-frontend-setup-nextjs)
    * [4.7 Running the Full Stack](#47-running-the-full-stack)
5. [Development Workflow](#5-development-workflow)
    * [5.1 Branching Strategy](#51-branching-strategy)
    * [5.2 Making Changes](#52-making-changes)
    * [5.3 API Communication](#53-api-communication)
6. [Coding Standards & Conventions](#6-coding-standards--conventions)
    * [6.1 TypeScript](#61-typescript)
    * [6.2 Linters & Formatters (ESLint, Prettier)](#62-linters--formatters-eslint-prettier)
    * [6.3 Naming Conventions](#63-naming-conventions)
    * [6.4 API Design](#64-api-design)
7. [Testing](#7-testing)
    * [7.1 Running Tests](#71-running-tests)
    * [7.2 Writing Tests](#72-writing-tests)
8. [Debugging](#8-debugging)
9. [Working with the Database](https://www.google.com/search?q=%239-working-with-the-database)
    * [9.1 Migrations (TypeORM)](#91-migrations-typeorm)
    * [9.2 Seeding Data](#92-seeding-data)
    * [9.3 Database GUI Clients](#93-database-gui-clients)
10. [Building for Production (Locally)](#10-building-for-production-locally)
11. [Common Issues & Troubleshooting](#11-common-issues--troubleshooting)
12. [Keeping Your Fork Updated](#12-keeping-your-fork-updated)

---

## 1. Introduction

This guide is intended for developers contributing code to FortressOS. It complements the general information in `README.md` and `CONTRIBUTING.md`. Our goal is to make the development process as smooth and efficient as possible.

## 2. Prerequisites

Please ensure you have the following tools installed on your system:

* **Git:** Latest stable version.
* **Node.js:** LTS version (e.g., v18.x or v20.x). Check `.nvmrc` if present. We recommend using [nvm](https://github.com/nvm-sh/nvm) to manage Node.js versions.
* **Yarn:** Latest stable version (v1.x classic or v3.x berry - project will specify). For this guide, we'll assume Yarn v1.x.
  * `npm install -g yarn`
* **Docker & Docker Compose:** Latest stable versions (for running PostgreSQL easily, or for full app testing).
* **IDE/Text Editor:** We recommend [Visual Studio Code (VS Code)](https://code.visualstudio.com/) with the following extensions:
  * ESLint
  * Prettier - Code formatter
  * EditorConfig for VS Code
  * DotENV (for `.env` file syntax highlighting)
  * (Optional) Prisma or TypeORM extensions if specific ORM is chosen.
  * (Optional) REST Client or Thunder Client for API testing.
* **PostgreSQL Client:** A GUI tool like [pgAdmin](https://www.pgadmin.org/), [DBeaver](https://dbeaver.io/), or [Postico](https://eggerapps.at/postico2/) (macOS) can be helpful.

## 3. Project Structure

FortressOS is structured as a monorepo using Yarn Workspaces. This means the frontend, backend, and any shared packages are managed within a single Git repository.

A typical structure might look like this:

```
fortressos/
├── apps/
│   ├── backend/         # NestJS backend application
│   │   ├── src/
│   │   ├── test/
│   │   ├── Dockerfile
│   │   └── package.json
│   └── frontend/        # Next.js frontend application
│       ├── app/
│       ├── components/
│       ├── public/
│       ├── Dockerfile
│       └── package.json
├── packages/
│   └── shared-types/    # Shared TypeScript types/interfaces between frontend & backend
│       ├── src/
│       └── package.json
├── database/
│   ├── migrations/      # Database migration files
│   └── seeds/           # Database seed files
├── .env.example         # Example environment variables for the entire stack
├── .eslintrc.js
├── .prettierrc.js
├── docker-compose.yml   # For running services like PostgreSQL, or the full app
├── package.json         # Root package.json for Yarn Workspaces
└── yarn.lock
```

*(Note: This structure is an example. The actual `apps/` or `services/` and `packages/` naming might differ slightly.)*

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

4.3 Environment Variables
Environment variables are crucial for configuring the application.

Root .env (for Docker Compose):
If a docker-compose.yml at the root manages services like PostgreSQL, it might use variables from a root .env file. Copy .env.example to .env in the root directory and configure it.

Bash

cp .env.example .env
Backend .env:
Navigate to the backend app directory (e.g., apps/backend) and copy its example environment file.

Bash

cd apps/backend
cp .env.example .env
Edit apps/backend/.env with your database credentials, JWT secrets, API ports, etc. Key variables:

DATABASE_HOST, DATABASE_PORT, DATABASE_USER, DATABASE_PASSWORD, DATABASE_NAME
JWT_SECRET, JWT_EXPIRES_IN
PORT (e.g., 3001 or 5000)
Frontend .env.local:
Navigate to the frontend app directory (e.g., apps/frontend) and copy its example environment file. Next.js uses .env.local for local overrides.

Bash

cd apps/frontend
cp .env.example .env.local
Edit apps/frontend/.env.local. Key variables:

NEXT_PUBLIC_API_URL (e.g., <http://localhost:3001/api> - pointing to your local backend)
PORT (e.g., 3000 - if different from Next.js default)
Ensure your .env and .env.local files are added to .gitignore at their respective levels (they usually are by default in .gitignore templates).

4.4 Database Setup (PostgreSQL)
You can run PostgreSQL using Docker (recommended for ease) or a local installation.

Using Docker (Recommended):
A docker-compose.yml file might be provided in the root of the project or in the database directory to easily spin up a PostgreSQL instance.

Bash

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
