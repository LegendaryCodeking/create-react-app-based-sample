const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "ofb7os",
  env: {
    login_url: 'http://51.15.249.106:8888/login',
    register_url: 'http://51.15.249.106:1288/register/',
    health_check_url: 'http://51.15.249.106:1288/healthmocker',
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
