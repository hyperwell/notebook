const path = require('path')
const webpack = require('webpack')

const requiredArgs = []

if (process.env === 'production') {
  require('dotenv').config({
    path: path.join(__dirname, '.env'),
  })
}

if (requiredArgs.some(arg => !process.env[arg])) {
  console.error(`Not all required environment variables have been specified.
  Please inspect \`.env.example\`. Required are:
  ${JSON.stringify(requiredArgs, null, 2)}`)
  process.exit(1)
}

const args = requiredArgs.reduce(
  (acc, curr) => ({
    ...acc,
    [`process.env.${curr}`]: JSON.stringify(process.env[curr]),
  }),
  {}
)

module.exports = {
  webpack: config => {
    config.entry.backend = './backend/index.js'
    config.entry.preload = './main/preload.js'
    config.plugins.push(new webpack.DefinePlugin(args))

    return config
  },
}
