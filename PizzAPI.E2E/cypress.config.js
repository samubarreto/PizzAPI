import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) { },
    baseUrl: "http://localhost:5000",
    viewportWidth: 1600,
    viewportHeight: 900,
    video: true,
    videoCompression: false
  },
});
