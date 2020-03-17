const withFonts = require('next-fonts')

module.exports = withFonts({
  webpack(config) {
    config.target = 'electron-renderer'
    return config
  },
})
