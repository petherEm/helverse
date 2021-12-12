module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.coinranking.com', 'www.bing.com', 'coinrevolution.com']
  },
  async rewrites() {
    return [
      {
      source: '/api/:path*',
      destination: `/api/:path*`
      },
    ]
  }

}


// http://localhost:8800/api/:path*


