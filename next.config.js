/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  env: {
    ApiPath: "http://localhost:8080",
  },
};

module.exports = nextConfig;
