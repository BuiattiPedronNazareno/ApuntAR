const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://backend:8080/api/:path*',
      },
      {
        source: '/uploads/:path*',
        destination: 'http://backend:8080/uploads/:path*',
      }
    ]
  }
}

module.exports = nextConfig
