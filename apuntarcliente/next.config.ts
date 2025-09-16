const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://apuntar-backend:8080/api/:path*',
      },
    ]
  }
}

module.exports = nextConfig
