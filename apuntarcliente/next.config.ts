const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://backend:8080/api/:path*',
      },
      {
        source: '/uploads/:path*',
        destination: 'http://backend:8080/api/uploads/:path*',
      }
    ]
  },
  async headers() {
    return [
      {
        source: '/uploads/:path*',
        headers: [
          { key: 'Cache-Control', value: 'no-store, max-age=0' }
        ],
      },
    ]
  }

}

module.exports = nextConfig
