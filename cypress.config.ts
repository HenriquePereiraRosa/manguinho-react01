import { defineConfig } from "cypress";

export default defineConfig({
  fixturesFolder: false,

  e2e: {
    baseUrl: "http://localhost:8080",
    supportFile: false,
    specPattern: "tests_e2e/cypress/integration-tests/**/*.cy.{js,jsx,ts,tsx}",
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
    },
  },
});
