/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/docs',
        destination: 'https://unified-labs.gitbook.io/unified-labs-docs/',
      },
      {
        source: '/docs/:path*',
        destination: 'https://unified-labs.gitbook.io/unified-labs-docs/:path*',
      },
    ]
  },
}

module.exports = nextConfig
