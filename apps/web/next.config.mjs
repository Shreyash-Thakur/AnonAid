/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    // We run type checking separately in CI
    ignoreBuildErrors: true,
  },
  eslint: {
    // We run linting separately in CI
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;