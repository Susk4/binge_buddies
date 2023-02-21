/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["lh3.googleusercontent.com", "image.tmdb.org"],
    unoptimized: true,
  },
};

module.exports = nextConfig;
