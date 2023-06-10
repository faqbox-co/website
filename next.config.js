/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
        port: "",
        pathname: "/*/**"
      }
    ]
  },
  experimental: {
    largePageDataBytes: 1.5 * 1024 * 1024
  }
};

module.exports = nextConfig;
