# Coding Conventions

## 1. Naming Conventions
- **Clarity and Descriptiveness:** All identifiers (variables, functions, classes, constants, etc.) MUST be descriptive and clearly indicate their purpose. Avoid overly short or cryptic names (e.g., `x`, `val`, `idx`, `fn`). Prefer self-documenting names.
- **Language-Specific Standards:**
    - **Python:**
        - `snake_case` for functions, methods, variables, and module names.
        - `PascalCase` (CapWords) for class names.
        - `UPPER_SNAKE_CASE` for constants.
        - Leading underscore (`_`) for internal/protected members, double leading underscore (`__`) for name mangling if necessary (use sparingly).
    - **JavaScript/TypeScript:**
        - `camelCase` for variables, functions, and methods.
        - `PascalCase` for class names, interfaces, types, and enums.
        - `UPPER_SNAKE_CASE` for constants (e.g., global or module-level constants).
    - **Java:**
        - `camelCase` for variables and methods.
        - `PascalCase` for class and interface names.
        - `UPPER_SNAKE_CASE` for constants.
- *[Project Owner: Add/modify rules for other languages used in the project, e.g., C#, Go, Ruby, etc. Be specific about your team's preferences if they deviate from common standards.]*
- **Boolean Variables/Functions:** Prefix boolean variables and functions that return a boolean with `is`, `has`, `can`, `should` (e.g., `isActive`, `hasPermission`, `canExecute`).

## 2. Formatting and Style
- **Indentation:** Use 4 spaces for indentation. **DO NOT USE TABS.** *[Project Owner: Adjust if your standard is different, e.g., "2 spaces"]*
- **Line Length:** Keep lines of code to a maximum of 100 characters. *[Project Owner: Adjust as needed, e.g., "80 characters" or "120 characters". Mention if a soft limit vs. hard limit.]*
- **Brace Style:**
    - **JavaScript/Java/C#:** Use Allman style (opening braces on a new line). *[Project Owner: Or specify K&R style - "opening braces on the same line as the statement/declaration"]*
    - **Python:** Not applicable (uses indentation).
- **Whitespace:** Use whitespace judiciously to improve readability (e.g., around operators, after commas, between logical blocks of code).
- **Code Linters/Formatters:**
    - This project uses [Specify Linter/Formatter, e.g., ESLint with Airbnb config, Prettier, Black, Pylint with a specific pylintrc].
    - All generated code must conform to the rules defined in the project's linter/formatter configuration files.
    - If conflicts arise between these guidelines and the linter config, the linter config takes precedence.

## 3. Best Practices
- **DRY (Don't Repeat Yourself):** Encapsulate reusable logic in functions, methods, or classes. Avoid duplicated code blocks.
- **KISS (Keep It Simple, Stupid):** Prefer simple, straightforward solutions over overly complex or clever ones.
- **YAGNI (You Ain't Gonna Need It):** Do not add functionality or code that is not currently required.
- **Avoid Magic Numbers/Strings:** Use named constants or enums instead of embedding literal values directly in code, especially if they appear multiple times or their meaning isn't immediately obvious.
- **Early Returns/Guard Clauses:** Use guard clauses or early returns to reduce nesting and improve readability in functions.
- **File and Directory Structure:** Follow the existing project structure for new files. If unsure, ask or suggest a logical placement. Name files descriptively and in lowercase with hyphens or underscores as per project convention (e.g., `user-authentication-service.js` or `user_auth_service.py`).

## 4. Language-Specific Guidelines
- **Python:**
    - Strictly follow PEP 8.
    - Use f-strings for string formatting (Python 3.6+).
    - Utilize type hints (Python 3.5+).
- **JavaScript/TypeScript:**
    - Prefer `const` for variable declarations by default; use `let` only if rebinding is necessary. Avoid `var`.
    - Use strict equality (`===` and `!==`) over loose equality (`==` and `!=`).
    - For TypeScript, ensure types are as specific as possible. Avoid `any` unless absolutely necessary and justified. Use interfaces or types for object shapes.
- *[Project Owner: Add other language-specific conventions or links to detailed style guides used by the team.]*