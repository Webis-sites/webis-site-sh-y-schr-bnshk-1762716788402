/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
  },
  async headers() {
    return [
      {
        source: '/(.*)', // applies to all routes
        headers: [
          {
            key: 'X-Frame-Options',
            value: '', // or remove if you want full iframe access
          },
          {
            key: 'Content-Security-Policy',
            value: 'frame-ancestors *', // allows all domains to embed your site
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;