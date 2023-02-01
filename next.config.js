/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: 'build',
  reactStrictMode: true,
  images: {
    domains: ['lh3.googleusercontent.com', 'graph.facebook.com'],
  },
}

module.exports = nextConfig
