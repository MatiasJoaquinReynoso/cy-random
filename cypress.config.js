const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://www.saucedemo.com/",
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    chromeWebSecurity: false,
  },
  env:{
    adminUser:{
      username: 'standard_user',
      password: 'secret_sauce'
    },
    userInfo:{
      firstname: 'Matias',
      lastname: 'Reynoso',
      zipCode: '2000'
    },
  },
  reporter: 'cypress-mochawesome-reporter',
  viewportHeight: 1000,
  viewportWidth: 1400,
});
