import withPWAInit from "next-pwa";
const withPWA = withPWAInit({
  dest: "public",
  register: true,
  skipWaiting: true,
});
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
    domains: ["gaezzange.s3.ap-northeast-2.amazonaws.com"],
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};
export default withPWA(nextConfig);
