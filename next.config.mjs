/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "utfs.io",
      },
      {
        hostname: "cdn-icons-png.flaticon.com"
      }
    ],
  },
};

export default nextConfig;
