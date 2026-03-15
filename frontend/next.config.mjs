/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/assets/bike/:slug*',
        destination: '/assets/hero-bg.png',
        has: [{ type: 'header', key: 'referer', value: '.*' }],
      },
      // Silencing specific missing textures by mapping them to hero-bg
      {
        source: '/assets/bike/image_:hash*',
        destination: '/assets/hero-bg.png',
      }
    ]
  },
};

export default nextConfig;
