# Contributing to FortressOS 🛡️

First off, thank you for considering contributing to FortressOS! We're excited to have you join our community. Whether you're fixing a bug, proposing a new feature, improving documentation, or helping others, your contributions are valuable and appreciated.

This document provides guidelines for contributing to FortressOS to ensure a smooth and effective collaboration process.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
  - [Reporting Bugs](#reporting-bugs)
  - [Suggesting Enhancements](#suggesting-enhancements)
  - [Working on Issues](#working-on-issues)
  - [Submitting Pull Requests](#submitting-pull-requests)
  - [Improving Documentation](#improving-documentation)
  - [Translations](#translations)
- [Getting Started (Development Environment)](#getting-started-development-environment)
- [Tech Stack Overview](#tech-stack-overview)
- [Development Guidelines](#development-guidelines)
  - [Branching Strategy](#branching-strategy)
  - [Commit Messages](#commit-messages)
  - [Coding Style](#coding-style)
  - [Testing](#testing)
- [Pull Request Process](#pull-request-process)
- [Issue Tracker Guidance](#issue-tracker-guidance)
- [Questions & Communication](#questions--communication)

## Code of Conduct

All contributors and participants in the FortressOS community are expected to abide by our [Code of Conduct](CODE_OF_CONDUCT.md). Please read it to understand the standards of behavior we expect and what actions will be taken in case of violations. We are committed to fostering an open, welcoming, and inclusive environment.

## How Can I Contribute?

There are many ways to contribute to FortressOS:

### Reporting Bugs

If you encounter a bug, please help us by reporting it!

1. **Search existing issues:** Before creating a new issue, please check if the bug has already been reported on our [GitHub Issues](https://github.com/Olaw2jr/fortressos/issues).
2. **Create a new issue:** If it's a new bug, provide a clear and descriptive title and include as much information as possible:
    - Steps to reproduce the bug.
    - Expected behavior.
    - Actual behavior.
    - Screenshots or error messages (if applicable).
    - Your FortressOS version, browser, and operating system.
    - For UI/component issues, specify the affected Shadcn UI component(s).
    - For data validation issues, include relevant schema information.
    - Use the "Bug Report" issue template if available.

### Suggesting Enhancements

We welcome suggestions for new features or improvements to existing functionality.

1. **Search existing issues/discussions:** See if your idea has already been proposed or discussed.
2. **Create a new issue/discussion:** Clearly describe your enhancement proposal:
    - What problem does it solve?
    - How would it work? What is your envisioned user experience?
    - Are there any alternatives you've considered?
    - Use the "Feature Request" issue template if available.

### Working on Issues

You can find issues to work on by Browse our [GitHub Issues](https://github.com/Olaw2jr/fortressos/issues). Look for issues labeled `help wanted` or `good first issue` if you're new.

1. If you want to work on an issue, please comment on it to indicate your interest and to avoid duplicated effort.
2. The maintainers can then assign the issue to you.

### Submitting Pull Requests

If you have code changes, documentation improvements, or other contributions, please submit them as a Pull Request (PR). See the [Pull Request Process](#pull-request-process) section below for details.

### Improving Documentation

Clear documentation is crucial! If you find areas where our documentation (Readme, user guides, developer docs, code comments) can be improved, please submit a PR or open an issue.

### Translations

If you're fluent in other languages, helping translate FortressOS would be a fantastic contribution. (Details on the translation process will be added as this capability is developed).

## Getting Started (Development Environment)

For instructions on how to set up your local development environment to work on FortressOS, please refer to the "Manual Setup for Development" section in our main [README.md](README.md) file or our more detailed [DEVELOPMENT_GUIDE.md](DEVELOPMENT_GUIDE.md).

## Tech Stack Overview

FortressOS is built with modern web technologies. Understanding our tech stack will help you contribute effectively:

- **Frontend Framework**: [Next.js](https://nextjs.org/) - React framework with server-side rendering, API routes, and file-based routing
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/) - Collection of reusable components built with Radix UI and Tailwind CSS
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **Database ORM**: [Prisma](https://www.prisma.io/) - Type-safe database client for Node.js and TypeScript
- **Data Validation**: [Zod](https://zod.dev/) - TypeScript-first schema validation library

Familiarity with these technologies will help you contribute effectively, but we welcome contributors at all skill levels. If you're new to any of these technologies, check out their respective documentation to learn more.

Key tools you'll likely need:

- Git
- Node.js (LTS version) & npm/yarn
- Docker & Docker Compose
- An IDE/Text Editor (e.g., VS Code)
- PostgreSQL client

## Development Guidelines

### Branching Strategy

We follow a simplified GitFlow workflow to manage our codebase effectively:

- **Main Branch (`main`):** Represents the production-ready state of the project. Should always be stable.
- **Development Branch (`develop`):** Serves as the integration branch for new features and bug fixes. The primary branch for development.
- **Feature Branches:** For developing new features or enhancements.
  - Always branch off from `develop`.
  - Naming: `feat/<short-description>` (e.g., `feat/user-risk-assessment-api`)
- **Bug Fix Branches:** For addressing bugs.
  - Branch off from `develop` (or relevant branch).
  - Naming: `fix/<short-description>` or `bugfix/<short-description>`
- **Hotfix Branches:** For critical bugs in a release, branch off `main` (e.g., `hotfix/critical-security-patch`) and merge back into both `main` and `develop`.

Consider using GitHub's branch protection rules to ensure quality standards are met before merging to important branches.

### Commit Messages

Please follow a structured commit message format to maintain clarity and consistency in our commit history. We recommend [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).

- **Format:** `<type>(<scope>): <subject>`
  - `<type>`: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `perf`, `ci`, `build`, etc.
  - `<scope>` (optional): Module or part of the codebase affected (e.g., `auth`, `risk-assessment`, `ui`).
  - `<subject>`: Concise description of the change, imperative mood (e.g., "Add user login endpoint", not "Added user login endpoint").
- **Body (optional):** More detailed explanation if needed.
- **Footer (optional):** Reference issue numbers (e.g., `Closes #123`, `Fixes #456`).

Example:

```bash
feat(auth): implement password reset functionality

Adds a new API endpoint and UI flow to allow users to reset their forgotten passwords via email verification.

Closes #78
```

### Coding Style

- **Next.js/React:**
  - Follow the Next.js App Router patterns and conventions.
  - Use React Server Components where appropriate to reduce client-side JavaScript.
  - Implement functional components with React Hooks.
  - Structure your components following the project's established patterns.
  - Use TypeScript for strong typing.

- **Shadcn UI & Tailwind CSS:**
  - Use Shadcn UI components whenever possible instead of creating new ones.
  - Follow the Tailwind CSS class ordering convention.
  - Avoid inline styles; use Tailwind classes or CSS modules instead.
  - Ensure responsive design is implemented for all UI components.

- **Prisma ORM:**
  - Follow the established schema design patterns in `prisma/schema.prisma`.
  - Use Prisma Client for all database operations.
  - Implement transactions for operations that require multiple database changes.
  - Write efficient queries to minimize database load.

- **Zod Schema:**
  - Create consistent validation schemas in dedicated schema files.
  - Reuse schema components where possible.
  - Ensure proper error messages for validation failures.

- **General:**
  - Follow the style enforced by ESLint and Prettier.
  - Write clear, readable, and maintainable code.
  - Add meaningful comments for complex logic.
  - Keep functions and modules focused on a single responsibility.
  - Use meaningful variable and function names.
  - Practice proper error handling throughout the codebase.

### Testing

- **Unit Tests:** 
  - Use Jest for testing utility functions and isolated logic.
  - Use React Testing Library for component testing.
  - Write tests for Zod schemas to ensure validation works as expected.
  - Aim for good coverage of critical business logic.

- **Integration Tests:** 
  - Test interactions between different parts of the application.
  - Test Prisma database operations with test databases.
  - Test API routes with mocked requests/responses.

- **End-to-End (E2E) Tests:**
  - Use Playwright or Cypress to test complete user flows.
  - Focus on critical user journeys through the application.

- **Testing Best Practices:**
  - All new features should include relevant tests.
  - Bug fixes should include a test that reproduces the bug and verifies the fix.
  - Mock external services appropriately.
  - Use testing utilities provided by Next.js for testing app router components.
  - Ensure all tests pass (`npm test` or `yarn test`) before submitting a PR.

- **Performance Testing:**
  - Consider using Lighthouse or other performance tools for critical pages.
  - Verify bundle sizes haven't increased significantly with new changes.

## Pull Request (PR) Process

1. **Fork the repository** on GitHub to your personal account.
2. **Clone your fork** locally: `git clone https://github.com/Olaw2jr/fortressos.git`
3. **Create a new branch** from `develop` for your changes: `git checkout -b feat/my-new-feature develop`
4. **Make your changes:** Implement your feature or fix the bug. Remember to write tests and adhere to coding guidelines.
5. **Run checks locally:** Before pushing, run:
   - `npm run lint` or `yarn lint` to ensure code style compliance
   - `npm run test` or `yarn test` to run the test suite
   - `npm run build` or `yarn build` to verify the build succeeds
6. **Commit your changes** using [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) format.
7. **Push your branch** to your fork: `git push origin feat/my-new-feature`
8. **Open a Pull Request** on the FortressOS GitHub repository:
   - Target the `develop` branch of the main repository.
   - Use our PR template to provide all necessary information.
   - Include screenshots for UI changes.
   - Explain the "why" and "what" of your contribution.
   - Reference any related issues (e.g., "Closes #123").
   - Ensure all CI checks (linters, tests, builds) pass.
   - Add labels relevant to your PR (e.g., `enhancement`, `bug`, `documentation`).
9. **Code Review:** Project maintainers will review your PR. Be prepared to discuss your changes and address feedback.
10. **Merge:** Once approved and passing all checks, a maintainer will merge it into the `develop` branch.

PRs that add new features or make significant changes should update relevant documentation, including README files and inline code documentation.

## Issue Tracker Guidance

- Use GitHub Issues to track bugs and feature requests.
- Use appropriate labels to categorize issues:
  - **Type Labels**: `bug`, `enhancement`, `documentation`, etc.
  - **Priority Labels**: `high-priority`, `medium-priority`, `low-priority`
  - **Status Labels**: `in-progress`, `needs-review`, `blocked`
  - **Component Labels**: `ui`, `api`, `database`, `authentication`, etc.
  - **Scope Labels**: `shadcn-ui`, `tailwind`, `prisma`, `zod`, `next.js`
  - **Experience Labels**: `good-first-issue`, `help-wanted`
- Provide detailed reproduction steps for bugs.
- For UI issues, include screenshots or screen recordings when possible.
- Link PRs to relevant issues using GitHub's built-in syntax (e.g., `Fixes #123`).
- Be respectful and constructive in all discussions.
- Close resolved issues promptly with a clear explanation of the resolution.

## Questions & Communication

- **For specific development questions related to an issue or PR:** Comment directly on the issue/PR.
- **For general discussions, ideas, or help:** Join our [Discord Server](https://discord.gg/YOUR_DISCORD_INVITE_CODE) (replace with your actual link).
- **For discussions about project direction or major features:** Use GitHub Discussions organized by category.
- **For quick technical questions about our stack:**
  - Next.js questions: Use the #next-js channel in Discord
  - UI component questions: Use the #shadcn-ui channel in Discord
  - Database/Prisma questions: Use the #prisma channel in Discord
  - Schema validation questions: Use the #zod channel in Discord

When asking questions, provide context, include code examples when relevant, and be specific about what you're trying to accomplish.

Thank you for contributing to FortressOS! Your efforts help make this project better for everyone.

---

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Shadcn UI Documentation](https://ui.shadcn.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Zod Documentation](https://zod.dev/)
- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
