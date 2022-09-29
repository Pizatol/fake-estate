


// const nextConfig = {
//     reactStrictMode: false,
//     images: {
//         domains: ["firebasestorage.googleapis.com" ],
//     },
// };

// module.exports = nextConfig;

module.exports = {
  experimental: { images: { allowFutureImage: true } },
  images: {
    domains: ["firebasestorage.googleapis.com" ],
  },
}