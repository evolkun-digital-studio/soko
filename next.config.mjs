/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export so the site can be hosted anywhere (Vercel, Netlify, cPanel, S3...).
  // Remove `output` if you want a regular Node server build.
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
