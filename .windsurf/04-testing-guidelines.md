# Testing Guidelines

## 1. General Principles
- **Testable Code First:** Code should be written with testability in mind. This often means adhering to principles like SRP, DI (Dependency Injection), and avoiding global state where possible. The AI should flag code it generates if it might be hard to test and suggest alternatives.
- **Test Coverage:** Aim for comprehensive test coverage for all new and significantly modified code. This includes business logic, utility functions, and critical pathways. While the AI cannot measure coverage, it should generate tests for the code it produces.
- **Test Pyramid:** Emphasize unit tests as the foundation, supplemented by integration tests. End-to-end tests should be used more sparingly for critical user flows.
- **Automation:** All tests should be fully automated and runnable with a single command.

## 2. Test Generation Assistance
- **Unit Tests as Default:** For any new function, method, or class generated, also generate corresponding unit tests.
- **Test Case Scenarios:** Generated unit tests should cover:
    - **Happy Path:** Expected inputs and successful outcomes.
    - **Edge Cases:** Boundary values, empty inputs, nulls, zero values, maximum values, etc.
    - **Error Conditions:** Invalid inputs, expected exceptions, failure modes.
    - **Parameterized Tests:** Use parameterized tests where appropriate to test the same logic with different inputs and expected outputs.
- **Mocking and Stubbing:**
    - Use mocks or stubs for external dependencies (e.g., network requests, database calls, file system interactions, time-dependent operations) in unit tests.
    - Clearly indicate what is being mocked and why.
    - Use established mocking libraries for the language/framework (e.g., `unittest.mock` in Python, Jest mocks in JavaScript, Moq for .NET).
- **Integration Test Considerations:** For features that span multiple components, suggest scenarios or skeletons for integration tests.

## 3. Test Frameworks and Tools
- **Project Standard:** Use the project's designated testing framework: [Specify framework, e.g., PyTest for Python, Jest or Mocha/Chai for JavaScript, JUnit for Java, NUnit/xUnit for .NET].
- **Assertion Libraries:** Use the assertion style and library consistent with the chosen framework. Assertions should be clear and expressive.
- **Test Naming:** Test function/method names must be descriptive and indicate:
    - The unit being tested.
    - The scenario being tested.
    - The expected outcome.
    - Example: `test_calculate_discount_with_valid_code_returns_correct_percentage()` or `shouldReturnCorrectPercentage_whenDiscountCodeIsValid()`.

## 4. Test Structure and Practices
- **Arrange-Act-Assert (AAA) / Given-When-Then (GWT):** Structure tests clearly using one of these patterns.
    - **Arrange/Given:** Set up preconditions and inputs.
    - **Act/When:** Execute the code being tested.
    - **Assert/Then:** Verify the outcome and outputs.
- **Independence:** Tests must be independent of each other. The success or failure of one test should not affect others. Avoid shared state between tests.
- **Readability:** Tests are documentation. They should be easy to read and understand.
- **No Logic in Tests:** Avoid complex logic, loops, or conditionals within test cases. Each test should verify one specific aspect.
- **Test Data:** Use clear and realistic test data. For sensitive data, use placeholder or anonymized values.

## 5. Test Maintenance
- **Keep Tests Updated:** When code changes, corresponding tests must be updated or new ones added.
- **No Flaky Tests:** Tests must be deterministic and reliable. If a test is flaky, it should be fixed or removed.