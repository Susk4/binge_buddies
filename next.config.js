/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "image.tmdb.org",
      "www.gravatar.com",
    ],
  },
};

module.exports = nextConfig;
