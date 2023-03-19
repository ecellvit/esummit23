/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
  env: {
    NEXT_PUBLIC_SERVER: process.env.NEXT_PUBLIC_SERVER
  }
};

module.exports = nextConfig;
