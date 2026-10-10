module.exports = {
  ci: {
    collect: {
      url: ["http://localhost:3000/"],
      numberOfRuns: 3,
      startServerCommand: "pnpm start",
      startServerReadyPattern: "Ready in",
      startServerReadyTimeout: 60_000,
    },
    assert: {
      assertions: {
        "categories:performance": ["warn", { minScore: 0.8 }],
        "first-contentful-paint": ["error", { maxNumericValue: 2000 }],
      },
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
};
