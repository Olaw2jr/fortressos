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

*(Note: You will need to create a `CODE_OF_CONDUCT.md` file. You can adapt one from a template like the [Contributor Covenant](https://www.contributor-covenant.org/version/2/1/code_of_conduct.html).)*

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

For instructions on how to set up your local development environment to work on FortressOS, please refer to the "Manual Setup for Development" section in our main [README.md](README.md) file or our more detailed `DEVELOPMENT_GUIDE.md` (if available).

Key tools you'll likely need:

- Git
- Node.js (LTS version) & npm/yarn
- Docker & Docker Compose
- An IDE/Text Editor (e.g., VS Code)
- PostgreSQL client

## Development Guidelines

### Branching Strategy

We generally follow a Gitflow-like branching model:

- `main`: Represents the latest stable release. Direct pushes are restricted. Merges happen from `develop` during a release.
- `develop`: The primary development branch where features and fixes are integrated. This should be your base branch for feature development.
- **Feature Branches:** Create new branches off `develop` for new features (e.g., `feat/user-authentication`, `feat/new-reporting-module`).
  - Naming: `feat/<short-description>` or `feature/<short-description>`
- **Bugfix Branches:** Create branches off `develop` (or `main` for hotfixes) for bug fixes (e.g., `fix/login-error`, `fix/asset-sorting-bug`).
  - Naming: `fix/<short-description>` or `bugfix/<short-description>`
- **Hotfix Branches:** For critical bugs in a release, branch off `main` (e.g., `hotfix/critical-security-patch`) and merge back into both `main` and `develop`.

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

- **Frontend (TypeScript/Next.js/React):**
  - Follow the style enforced by ESLint and Prettier (configuration will be provided in the repository).
  - Adhere to React best practices (functional components, hooks, etc.).
  - Use TypeScript for strong typing.
- **Backend (Depends on chosen stack - e.g., TypeScript/Node.js):**
  - Follow style enforced by ESLint and Prettier.
  - Adhere to established patterns for the chosen framework.
- **General:**
  - Write clear, readable, and maintainable code.
  - Add comments where necessary to explain complex logic.
  - Keep functions and modules focused on a single responsibility.

### Testing

- **Unit Tests:** For individual functions, components, and modules. Aim for good coverage.
- **Integration Tests:** To test interactions between different parts of the application.
- **End-to-End (E2E) Tests (Future):** To test user flows through the UI.
- All new features should include relevant tests.
- All bug fixes should ideally include a test that reproduces the bug and verifies the fix.
- Ensure all tests pass (`npm test` or `yarn test`) before submitting a PR.

## Pull Request (PR) Process

1. **Fork the repository** on GitHub to your personal account.
2. **Clone your fork** locally: `git clone https://github.com/Olaw2jr/fortressos.git`
3. **Create a new branch** from `develop` for your changes: `git checkout -b feat/my-new-feature develop`
4. **Make your changes:** Implement your feature or fix the bug. Remember to write tests and adhere to coding guidelines.
5. **Commit your changes** using clear and conventional commit messages.
6. **Push your branch** to your fork: `git push origin feat/my-new-feature`
7. **Open a Pull Request** on the FortressOS GitHub repository:
    - Target the `develop` branch of the main FortressOS repository.
    - Provide a clear title and a detailed description of your changes.
    - Explain the "why" and "what" of your contribution.
    - Reference any related issues (e.g., "Closes #123").
    - Ensure all CI checks (linters, tests, builds) pass.
8. **Code Review:** Project maintainers will review your PR. Be prepared to discuss your changes and address any feedback or requested modifications.
9. **Merge:** Once your PR is approved and passes all checks, a maintainer will merge it into the `develop` branch. Congratulations and thank you!

## Issue Tracker Guidance

- Use GitHub Issues to track bugs and feature requests.
- Use appropriate labels to categorize issues (e.g., `bug`, `enhancement`, `documentation`, `good first issue`, `help wanted`).
- Be respectful and constructive in all discussions.
- Provide as much context as possible when creating or commenting on issues.

## Questions & Communication

- **For specific development questions related to an issue or PR:** Comment directly on the issue/PR.
- **For general discussions, ideas, or help:** Join our [Discord Server](https://discord.gg/YOUR_DISCORD_INVITE_CODE) (replace with your actual link).
- **For discussions about project direction or major features:** Consider starting a GitHub Discussion if the feature is enabled for the repository.

Thank you for contributing to FortressOS! Your efforts help make this project better for everyone.
