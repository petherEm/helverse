module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.coinranking.com', 'www.bing.com', 'coinrevolution.com']
  },
  async rewrites() {
    return [
      {
      source: '/api/:path*',
      destination: `http://localhost:8800/api/:path*`
      },
    ]
  }

}


