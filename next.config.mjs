/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: config => {
    config.externals.push('@node-rs/argon2', '@node-rs/bcrypt')
    return config
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io'
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com'
      }
    ],
    unoptimized: true
  }
}

export default nextConfig
