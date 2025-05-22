# Code Generation Standards

## 1. Quality and Completeness
- **Adherence to Project Standards:** All generated code must strictly adhere to the rules defined in `03-coding-conventions.md` and any relevant framework-specific guidelines (e.g., `react-guidelines.md`).
- **Functional Code:** Generated code should be functional, directly address the user's request, and be as production-ready as possible.
- **Completeness:** Avoid generating overly stubbed-out code unless specifically asked or when a task is explicitly broken down. Aim to provide complete, working snippets or modules.
- **Placeholders:** If placeholder values are unavoidable (e.g., API keys, user-specific configurations), clearly mark them using a consistent format like `{{PLACEHOLDER_DESCRIPTION}}` or `YOUR_ITEM_HERE`. Provide explicit instructions on what kind of value is expected and how to replace it.
- **Error Handling:**
    - Include robust error handling (e.g., try-catch blocks, specific exception handling, null checks, validation) appropriate for the context.
    - Do not silence errors without a clear strategy (e.g., logging and returning a default).
    - Advise the user on potential error states they should consider.
- **Dependencies:** If generated code introduces new external dependencies:
    - Explicitly state them.
    - Provide commands or instructions for installing/managing them (e.g., `npm install package-name`, `pip install package-name`).
    - If multiple options exist for a dependency, briefly explain the choice made.

## 2. Comments and Readability
- **Docstrings/JSDoc:** Generate comprehensive docstrings for all public functions, classes, and methods, detailing purpose, parameters (with types), return values (with types), and any exceptions thrown. Adhere to formats specified in `05-documentation-policy.md`.
- **Inline Comments:** Use inline comments to explain:
    - Complex or non-obvious logic.
    - Important algorithm steps.
    - Workarounds or temporary solutions (and why they are used).
    - `// TODO:` comments for parts that require future attention, with a brief explanation.
- **Readability Focus:** Prioritize clear, readable, and maintainable code. Avoid overly complex one-liners if they sacrifice clarity. Code should be understandable by other developers.

## 3. Scope and Modularity
- **Modularity:** Generate code in a modular fashion. Suggest breaking down large pieces of code into smaller, reusable functions, components, or classes.
- **Single Responsibility Principle (SRP):** Functions, classes, and modules should ideally adhere to the SRP. If a generated piece of code seems to violate SRP, acknowledge it and suggest potential refactoring if appropriate.
- **Avoid Side Effects:** Where possible, prefer pure functions. Clearly document functions with side effects.
- **Immutability:** Favor immutable data structures where practical and idiomatic for the language/framework.

## 4. Iteration, Refinement, and Safety
- **Refactoring Suggestions:** If the AI identifies areas in existing code (if provided for context) that could be refactored for improvement (clarity, performance, security), suggest these changes with explanations and potential before/after examples.
- **Stepwise Generation:** For very complex features or large code blocks, offer to generate code in stages or for specific parts first. Confirm understanding and correctness at each stage.
- **Idempotency:** If generating scripts or functions that modify state or perform operations, consider idempotency where appropriate and highlight it.
- **Security First:** Integrate security best practices from `06-security-considerations.md` directly into generated code. Do not generate code with known vulnerabilities.
- **Performance Considerations:** Write efficient code by default. If a less performant but clearer approach is taken, mention it. If high performance is critical for a piece of code, ask the user for any specific constraints or suggest profiling.
- **Testing in Mind:** Generate code that is easily testable. This includes clear separation of concerns, dependency injection where appropriate, and avoiding tight coupling. Offer to generate unit tests as per `04-testing-guidelines.md`.