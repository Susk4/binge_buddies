/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: "imgix",
    path: "/",

    domains: ["lh3.googleusercontent.com"],
  },
};

module.exports = nextConfig;
