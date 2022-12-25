let constants = {
  header: 'OpenWeater',
  subheader:
    'Weather forecasts, nowcasts and history in a fast and elegant way',
  menu: [
    'Guide',
    'Api',
    'Dashboard',
    'Marketplace',
    'Pricing',
    'Maps',
    'Our Initiatives',
    'Partners',
    'Blog',
    'For Business',
    'Sign In',
    'Support',
    'FAQ',
    'How to start',
    'Ask a question'
  ],
  citiesES: ['Marbella', 'Málaga', 'Sevilla'],
  citiesEN: ['Marbella', 'Malaga', 'Seville'],
  requests: [
    {
      method: 'GET',
      url: Cypress.env('apiUrl'),
      qs: {
        appid: Cypress.env('appId'),
        id: 2514169,
        // lon: '-4.8824474',
        // lat: '36.510071',
        units: 'metric'
      }
    },
    {
      method: 'GET',
      url: Cypress.env('apiUrl'),
      qs: {
        appid: Cypress.env('appId'),
        id: 2514256,
        // lon: '-4.42',
        // lat: '36.719444',
        units: 'metric'
      }
    },
    {
      method: 'GET',
      url: Cypress.env('apiUrl'),
      qs: {
        appid: Cypress.env('appId'),
        id: 2510911,
        // lon: '-5.994072',
        // lat: '37.392529',
        units: 'metric'
      }
    }
  ]
}
module.exports = constants
