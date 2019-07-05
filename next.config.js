const withImages = require('next-images')
const withFonts = require('next-fonts');
const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');

// module.exports = withImages(withCSS(withSass()));

module.exports = withImages(withFonts(withCSS(withSass({
  target: "serverless",
  webpack(config, options) {
    return config
  }
}))))