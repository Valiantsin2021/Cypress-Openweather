const { defineConfig } = require('cypress')
// const { allureCypress } = require('allure-cypress/reporter')
const { lighthouse, prepareAudit } = require('@cypress-audit/lighthouse')
const fs = require('fs')
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
      on('before:browser:launch', (browser = {}, launchOptions) => {
        prepareAudit(launchOptions)
      })

      on('task', {
        lighthouse: lighthouse(lighthouseReport => {
          const dirPath = './PerfReports'
          if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath)
          }
          const name =
            lighthouseReport.lhr.requestedUrl.replace(
              /[-[\]{}()*+!<=:?.\/\\^$|#\s,]/g,
              function (x) {
                return ''
              }
            ) +
            ' - ' +
            lighthouseReport.lhr.fetchTime.split('T')[0]
          fs.writeFileSync(
            `${dirPath}/GLH-(${name}).json`,
            JSON.stringify(lighthouseReport, null, 2)
          )
        })
      })

      // allureCypress(on)
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
