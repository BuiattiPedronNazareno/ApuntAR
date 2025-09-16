const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://backend:8080/api/:path*',
      },
      {
        source: '/api/uploads/:path*',
        destination: 'http://backend:8080/uploads/:path*',
      }
    ]
  },
  async headers() {
    return [
      {
        source: '/api/uploads/:path*',
        headers: [
          { key: 'Cache-Control', value: 'no-store, max-age=0' }
        ],
      },
    ]
  }

}

module.exports = nextConfig
