// Extend the global interface to include our custom properties
declare global {
  // eslint-disable-next-line no-var
  var ratelimits: Map<string, number> | undefined;
}

export {};
