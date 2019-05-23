const withSass = require('@zeit/next-sass')
const withImages = require('next-images')
module.exports = withSass(withImages({
  target: "serverless",
  webpack(config, options) {
    return config
  }
}))
