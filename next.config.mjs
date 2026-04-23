/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
    output: 'export',
    trailingSlash: true,
    // On GitHub Pages the site lives at /javedgroup/ — basePath handles asset paths
    basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? '',
    images: {
        unoptimized: true,
    },
};

export default nextConfig;
