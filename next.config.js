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
            value: 'www.gappy.jp',
          },
        ],
        destination: 'https://gappy.jp/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'gappy-hp-2.vercel.app',
          },
        ],
        destination: 'https://gappy.jp/:path*',
        permanent: true,
      },
      {
        source: '/solutions',
        destination: 'https://gappy.jp/#workflows',
        permanent: true,
      },
      {
        source: '/solutions/platform',
        destination: 'https://gappy.jp/#workflows',
        permanent: true,
      },
      {
        source: '/solutions/partners',
        destination: '/cases',
        permanent: true,
      },
      {
        source: '/solutions/insight',
        destination: '/resources',
        permanent: true,
      },
      {
        source: '/news',
        destination: '/resources',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
