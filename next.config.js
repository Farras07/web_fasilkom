/**
 *  @type {import('next').NextConfig} 
 */
module.exports = {
  reactStrictMode: false,
  output: 'export',
  skipTrailingSlashRedirect: true,
  async rewrites() {
    return [
      {
        source: '/berita/:id*',
        destination: '/berita/:id*', // Matched parameters can be used in the destination
      },
    ]
  },
  images: {
    domains: ["localhost", "admincpanel.bemfasilkomupnjatim.com"],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
};
