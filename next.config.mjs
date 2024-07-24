/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    unoptimized: true,
    domains: ["gaezzange.s3.ap-northeast-2.amazonaws.com"],
  },
};
export default nextConfig;
