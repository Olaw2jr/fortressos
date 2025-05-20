# FortressOS 🛡️ - Open-Source Risk Management Platform

**FortressOS is a modern, self-hostable, open-source platform designed to help organizations of all sizes effectively identify, assess, treat, and monitor their IT and cybersecurity risks.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub Issues](https://img.shields.io/github/issues/Olaw2jr/fortressos.svg?style=flat-square)](https://github.com/Olaw2jr/fortressos/issues)
[![GitHub Stars](https://img.shields.io/github/stars/Olaw2jr/fortressos.svg?style=flat-square&logo=github)](https://github.com/Olaw2jr/fortressos/stargazers)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-007ACC?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=flat-square&logo=docker)](https://www.docker.com/)

## Table of Contents

- [🚀 Overview](#-overview)
- [✨ Key Features](#-key-features)
- [🎯 Why FortressOS?](#-why-fortressos)
- [🛠️ Tech Stack](#️-tech-stack)
- [🏁 Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Option 1: Quick Start with Docker (Recommended for Users)](#option-1-quick-start-with-docker-recommended-for-users)
  - [Option 2: Manual Setup for Development (For Contributors)](#option-2-manual-setup-for-development-for-contributors)
- [📖 Usage](#-usage)
- [🤝 Contributing](#-contributing)
- [🗺️ Roadmap](#️-roadmap)
- [📜 License](#-license)
- [💬 Support & Community](#-support--community)
- [🙏 Acknowledgements](#-acknowledgements)

---

## 🚀 Overview

In today's complex digital landscape, managing IT and cybersecurity risks is paramount. However, many organizations, especially Small to Medium-sized Enterprises (SMEs), find commercial GRC (Governance, Risk, and Compliance) tools to be expensive, overly complex, or restrictive.

**FortressOS** aims to democratize effective risk management by providing a powerful, flexible, and transparent open-source solution. Built with a modern technology stack, it offers an intuitive user experience and aligns with industry best practices and standards like ISO 2700x, NIST RMF, and CIS Controls. Whether you're establishing a new risk management program or looking for a better way to manage an existing one, FortressOS is designed to adapt to your needs.

## ✨ Key Features

FortressOS provides a comprehensive suite of tools to manage your risk lifecycle:

- **🛡️ Asset Management:** Maintain a detailed inventory of your critical assets, their value, and ownership.
- **🔬 Threat & Vulnerability Management:** Identify and track threats and vulnerabilities relevant to your assets. Import data from common scanning tools.
- **⚖️ Risk Assessment (Qualitative & Quantitative):**
  - Conduct **qualitative assessments** using configurable risk matrices (Likelihood x Impact).
  - Perform **quantitative assessments** by calculating Single Loss Expectancy (SLE), Annualized Rate of Occurrence (ARO), and Annualized Loss Expectancy (ALE).
- **🔗 Risk Register:** A centralized dashboard to view, track, and manage all identified risks.
- **⚙️ Control Management:** Define, implement, and monitor security controls. Map controls from standard libraries (NIST 800-53, ISO 27002, CIS Controls) or create custom ones.
- **📊 Compliance Tracking (Coming Soon):** Map controls to compliance frameworks (ISO 27001, PCI DSS, etc.) and track your compliance posture.
- **📈 Reporting & Dashboards:** Visualize your risk landscape with intuitive dashboards and generate insightful reports.
- **👤 User & Role Management:** Secure access with Role-Based Access Control (RBAC).
- **🐳 Dockerized & 12-Factor:** Easy to deploy, self-host, and scale, following modern cloud-native principles.
- **🎨 Modern UI/UX:** Built with Next.js and shadcn/ui for a clean, responsive, and enjoyable user experience.

## 🎯 Why FortressOS?

- **🌐 Truly Open Source:** Free to use, modify, and distribute under the MIT license. No vendor lock-in.
- **💻 Self-Hostable:** Maintain full control over your data and deployment environment.
- **✨ Modern & Intuitive:** Say goodbye to clunky interfaces. Enjoy a clean, user-friendly design.
- **🔧 Customizable & Extensible:** Adapt the platform to your specific needs. The open-source nature allows for community-driven enhancements.
- **🔗 Standards-Aligned:** Incorporates principles from leading risk management frameworks (NIST, ISO).
- **👥 Community-Driven:** Be part of a growing community shaping the future of open-source risk management.

## 💪️ Tech Stack

FortressOS is built with a modern and robust technology stack:

- **Framework:** [Next.js](https://nextjs.org/) with App Router architecture
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/) - beautifully designed components built with Radix UI and Tailwind CSS
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- **Language:** [TypeScript](https://www.typescriptlang.org/) for type safety and better developer experience
- **Database:** [PostgreSQL](https://www.postgresql.org/) with [Prisma ORM](https://www.prisma.io/) for type-safe database access
- **Validation:** [Zod](https://zod.dev/) for schema validation and type inference
- **Authentication:** [NextAuth.js](https://next-auth.js.org/) for flexible authentication
- **State Management:** React Context and hooks for local state, [TanStack Query](https://tanstack.com/query/v4) for server state
- **Testing:** [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) for unit/component tests, [Playwright](https://playwright.dev/) for E2E testing
- **Deployment:** [Docker](https://www.docker.com/) for containerization and easy deployment

## 🏁 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.17.0 or later)
- [npm](https://www.npmjs.com/), [yarn](https://yarnpkg.com/), or [pnpm](https://pnpm.io/) (package manager)
- [Docker](https://docs.docker.com/get-docker/) (for containerized deployment and PostgreSQL)
- [Git](https://git-scm.com/) (for version control)
- Minimum system resources: 2 CPU cores, 4GB RAM

### Option 1: Quick Start with Docker (Recommended for Users)

This is the easiest way to get FortressOS up and running.

1. **Clone the repository:**

    ```bash
    git clone [https://github.com/Olaw2jr/fortressos.git](https://github.com/Olaw2jr/fortressos.git)
    cd fortressos
    ```

2. **Configure Environment Variables:**
    Copy the `.env.example` file to `.env` and update the necessary configurations (e.g., database credentials, application secrets).

    ```bash
    cp .env.example .env
    # Open .env and edit the variables
    ```

3. **Run with Docker Compose:**

    ```bash
    docker-compose up -d
    ```

4. **Access FortressOS:**
    Open your web browser and navigate to `http://localhost:YOUR_APP_PORT` (e.g., `http://localhost:3000` - check your `docker-compose.yml` or `.env` for the exact port).

### Option 2: Manual Setup for Development (For Contributors)

For those who want to contribute to FortressOS development:

1. **Fork and Clone the repository:**

    ```bash
    git clone https://github.com/Olaw2jr/fortressos.git
    cd fortressos
    ```

2. **Install Dependencies:**

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3. **Set up environment variables:**

   Create a `.env.local` file in the root directory:

    ```bash
    cp .env.example .env.local
    ```

   Update the environment variables, particularly the database connection:

    ```env
    # Database connection
    DATABASE_URL="postgresql://postgres:password@localhost:5432/fortressos?schema=public"
    
    # NextAuth.js configuration
    NEXTAUTH_SECRET="your-secret-key"
    NEXTAUTH_URL="http://localhost:3000"
    ```

4. **Setup PostgreSQL Database:**

   Option A: Using Docker (recommended):

    ```bash
    # Start a PostgreSQL container
    docker run --name fortressos-db -e POSTGRES_PASSWORD=password -e POSTGRES_USER=postgres -e POSTGRES_DB=fortressos -p 5432:5432 -d postgres:14
    ```

   Option B: Use an existing PostgreSQL installation and create a database named `fortressos`.

5. **Set up the database schema with Prisma:**

    ```bash
    # Generate Prisma client
    npx prisma generate
    
    # Run database migrations
    npx prisma migrate dev
    
    # Seed the database (if available)
    npx prisma db seed
    ```

6. **Start the development server:**

    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```

7. **Access FortressOS:**

   Open your web browser and navigate to `http://localhost:3000`

*For more detailed development setup instructions, please see `DEVELOPMENT_GUIDE.md` (link to a future, more detailed guide).*

## 📖 Usage

Once FortressOS is running:

1. **Register/Login:** Create an administrator account or log in if one already exists.
2. **Dashboard:** Get an overview of your current risk posture.
3. **Asset Management:** Start by populating your asset inventory. Define your critical systems, data, and applications.
4. **Threats & Vulnerabilities:** Identify potential threats and known vulnerabilities associated with your assets.
5. **Risk Assessment:**
    - Create new risk assessments.
    - Link assets, threats, and vulnerabilities to define risk scenarios.
    - Perform qualitative or quantitative analysis.
6. **Risk Treatment:** Define treatment plans for identified risks (Mitigate, Avoid, Transfer, Accept) and link them to controls.
7. **Control Management:** Implement and track security controls.

Refer to the (upcoming) **User Documentation** for detailed guides on each module.

## 🤝 Contributing

FortressOS is an open-source project, and we welcome contributions from the community! Whether you're a developer, designer, security professional, or technical writer, there are many ways to help.

- 🌟 **Star the project** on GitHub!
- 🐛 **Report bugs** or suggest features by creating an issue.
- 📝 **Improve documentation** (README, user guides, developer docs).
- 💻 **Contribute code:**
  - Help with Next.js App Router implementation
  - Create or improve Shadcn UI components
  - Optimize Tailwind CSS usage
  - Enhance Prisma schema and database operations
  - Implement robust data validation with Zod
  - Improve testing coverage
- 🎨 **UI/UX improvements:** Help make FortressOS even more user-friendly with modern component patterns.
- 🧪 **Testing:** Write unit, integration, or end-to-end tests.
- 🌐 **Translations:** Help make FortressOS accessible in more languages.

We follow modern development best practices:

- **TypeScript** for type safety
- **Component-driven architecture** with Shadcn UI
- **Responsive design** with Tailwind CSS
- **Type-safe database access** with Prisma ORM
- **Schema validation** with Zod
- **Git workflow** with feature branches and pull requests
- **Automated testing** with Jest and React Testing Library

Please read our [**CONTRIBUTING.md**](CONTRIBUTING.md) for details on our code of conduct, development process, and how to submit pull requests. For technical details about the development environment setup and workflow, see [**DEVELOPMENT_GUIDE.md**](DEVELOPMENT_GUIDE.md).

## 🗯️ Roadmap

We have an exciting vision for FortressOS! Here's a glimpse of what we're planning (subject to change based on community feedback):

- **v1.0:** Core Risk Management
  - Modern Next.js App Router architecture
  - Responsive UI with Shadcn UI components and Tailwind CSS
  - Type-safe database operations with Prisma ORM
  - Schema validation with Zod
  - Asset management module
  - Threat and vulnerability tracking
  - Qualitative and quantitative risk assessment
  - Basic control management
  - Risk register dashboard
  - Docker deployment
  - Comprehensive test suite

- **Post-v1.0:**
  - Enhanced Compliance Management Modules (ISO 27001, PCI DSS, etc.).
  - Advanced Control Management & Effectiveness Testing.
  - Workflow Automation for Risk Treatment & Reviews.
  - API for integrations.
  - Advanced Reporting & Analytics.
  - Multi-language support.
  - (Potentially) AI/ML assisted risk identification.

For a more detailed roadmap, please check our [Project Board/Roadmap Document](LINK_TO_YOUR_ROADMAP).

## 📜 License

FortressOS is released under the [MIT License](LICENSE.md).

## 💬 Support & Community

- **GitHub Issues:** For bug reports and feature requests.
- **Discord Server:** Join our [Discord community](https://discord.gg/YOUR_DISCORD_INVITE_CODE) for discussions, help, and to connect with other users and contributors.
- **(Future) Forum/Mailing List:** (To be established)

## 🙏 Acknowledgements

- Thanks to all contributors who will help make FortressOS a reality.
- Inspiration from various open-source GRC/security projects and industry best practices.
- The developers of the fantastic open-source libraries and tools that FortressOS is built upon.

---

**Help us build the future of open-source risk management!**

## Additional Resources

### Official Documentation

- [Next.js App Router Documentation](https://nextjs.org/docs/app)
- [Shadcn UI Components](https://ui.shadcn.com/docs/components)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Prisma ORM Documentation](https://www.prisma.io/docs)
- [Zod Schema Validation](https://zod.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [NextAuth.js Authentication](https://next-auth.js.org/getting-started/introduction)
- [TanStack Query (React Query)](https://tanstack.com/query/latest/docs/react/overview)

### Development Best Practices

- [Next.js Best Practices](https://nextjs.org/docs/app/building-your-application/routing/route-handlers#good-to-know)
- [React Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
- [Automated Testing Best Practices](https://testing-library.com/docs/react-testing-library/intro)
- [GitHub Flow](https://docs.github.com/en/get-started/quickstart/github-flow)

### Community Resources

- [Next.js Discord](https://discord.com/invite/nextjs)
- [Prisma Discord](https://discord.com/invite/prisma)
- [Tailwind CSS Discord](https://discord.com/invite/tailwindcss)
