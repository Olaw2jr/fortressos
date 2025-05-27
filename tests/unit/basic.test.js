// tests/unit/basic.test.js
describe('Basic Tests', () => {
  test('true is truthy', () => {
    expect(true).toBe(true);
  });

  test('false is falsy', () => {
    expect(false).toBe(false);
  });

  test('null is null', () => {
    expect(null).toBeNull();
  });
});
