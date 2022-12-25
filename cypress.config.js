const { defineConfig } = require('cypress')
const allureWriter = require('@shelex/cypress-allure-plugin/writer')

module.exports = defineConfig({
  chromeWebSecurity: false,
  viewportWidth: 1280,
  viewportHeight: 800,
  e2e: {
    baseUrl: 'https://openweathermap.org/',
    experimentalStudio: true,
    env: {
      allure: true,
      apiUrl: 'https://api.openweathermap.org/data/2.5/weather',
      appId: 'caf07bd1f505f0e9540e22f416c97487'
    },
    setupNodeEvents(on, config) {
      allureWriter(on, config)
      on('task', {
        print(s) {
          console.log(s)
          return null
        }
      })
      require('cypress-mochawesome-reporter/plugin')(on)
      return config
    },
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      reportDir: 'mochawesome-report',
      charts: true,
      reportPageTitle: 'Kinokong test',
      embeddedScreenshots: true,
      inlineAssets: true,
      saveAllAttempts: false
    },
    video: false,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 20000
  }
})
