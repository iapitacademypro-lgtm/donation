/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
    ],
    // Ensure image optimizer serves images inline instead of as attachments
    contentDispositionType: 'inline',
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;