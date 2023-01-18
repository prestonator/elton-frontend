/** @type {import('next').NextConfig} */

const configs = require('./configs.json');

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost"],
  },
}

module.exports = nextConfig
