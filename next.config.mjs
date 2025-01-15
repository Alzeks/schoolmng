/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https', //can scip
                hostname: 'images.pexels.com'
            },
            {
                protocol: "https",
                hostname: "upload.wikimedia.org",
            },
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
            },
        ]
    }
};

export default nextConfig;
