import type {NextConfig} from 'next';





const nextConfig: NextConfig = {
  output: 'export', // ✅ Enables static HTML export
  trailingSlash: true, // ✅ Helps Firebase Hosting routing
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  images: {
    unoptimized: true, // ✅ Required for static hosting
    remotePatterns: [
      { protocol: 'https', hostname: 'placehold.co', pathname: '/**' },
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
      { protocol: 'https', hostname: 'picsum.photos', pathname: '/**' },
    ],
  },
};

export default nextConfig;
