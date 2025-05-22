# Documentation Policy

## 1. Code-Level Documentation (Docstrings & Comments)
- **Mandatory Docstrings:** All public/exported classes, methods, functions, and modules MUST have comprehensive docstrings.
    - **Python:** Follow PEP 257 for docstring conventions (e.g., reStructuredText or Google style).
    - **JavaScript/TypeScript:** Use JSDoc format. For TypeScript, leverage TSDoc annotations.
    - **Java:** Use JavaDoc conventions.
- **Docstring Content:** Docstrings MUST include:
    - A concise summary of the object's purpose and functionality.
    - Detailed descriptions of all parameters/arguments (name, type, purpose, optional/required).
    - Description of the return value (type, what it represents).
    - Any exceptions or errors that can be raised or returned.
    - Example usage snippets where helpful for clarity.
- **Inline Comments:** Use inline comments for:
    - Explaining complex or non-obvious logic.
    - Clarifying business rules implemented in code.
    - Marking `// TODO:`, `// FIXME:`, `// HACK:` with a brief explanation and ideally a ticket number or author.
- **Clarity and Conciseness:** Documentation should be clear, concise, grammatically correct, and free of jargon where possible.

## 2. README Files
- **Project README (`README.md`):** The root `README.md` must contain:
    - Project title and a brief description.
    - Prerequisites and installation instructions.
    - How to run the application and tests.
    - Key scripts and build commands.
    - Overview of project structure.
    - Contribution guidelines (or link to `CONTRIBUTING.md`).
    - License information (or link to `LICENSE.md`).
- **Module/Component READMEs:** Significant modules, packages, or microservices within the project should have their own `README.md` files detailing:
    - Purpose and functionality of the module.
    - API documentation (if applicable).
    - Specific setup or usage instructions.
    - Dependencies specific to that module.

## 3. API Documentation (if applicable)
- **Specification Standard:** Use OpenAPI Specification (OAS) / Swagger for documenting RESTful APIs. [Specify version, e.g., OAS 3.0].
- **Content:** API documentation must include:
    - All available endpoints (path, HTTP method).
    - Detailed request parameters (path, query, header, cookie).
    - Request body schemas (JSON, XML, etc.) with field descriptions, types, and validation rules.
    - Response schemas for all possible status codes, including error responses.
    - Authentication and authorization mechanisms.
    - Rate limiting information.
    - Versioning strategy.
- **Tooling:** Use tools like Swagger Editor, Swagger UI, ReDoc, or Stoplight Elements for generating and displaying API documentation.
- **Keep Updated:** API documentation must be kept in sync with API changes. Consider automating generation from code annotations or integration tests.

## 4. Design Documents & Architectural Overviews
- **Location:** Store design documents, architectural diagrams, and decision logs in a designated project wiki or `/docs` directory in the repository.
- **Content:** These documents should cover:
    - High-level system architecture.
    - Key design decisions and their rationale (e.g., using Architecture Decision Records - ADRs).
    - Data models and flows.
    - Interaction between major components or services.
- **Diagrams:** Use tools like PlantUML, Mermaid, Lucidchart, or draw.io for creating diagrams. Store source files for diagrams (e.g., `.puml`, `.md` for Mermaid) in version control.

## 5. Contribution Guidelines
- Create a `CONTRIBUTING.md` file outlining:
    - How to set up the development environment.
    - Coding standards (link to `03-coding-conventions.md`).
    - Branching strategy (e.g., GitFlow).
    - Pull request process and review expectations.
    - How to run linters and tests.