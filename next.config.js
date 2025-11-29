/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'gappy-hp-2.vercel.app',
          },
        ],
        destination: 'https://official.gappy.jp/:path*',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
