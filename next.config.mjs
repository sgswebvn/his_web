/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    unoptimized: true
  },
  async redirects() {
    return [
      {
        source: "/cua-hang/:path*",
        destination: "/kham-pha",
        permanent: false
      },
      {
        source: "/gio-hang/:path*",
        destination: "/dat-ve",
        permanent: false
      },
      {
        source: "/thanh-toan/:path*",
        destination: "/dat-ve",
        permanent: false
      },
      {
        source: "/tai-khoan/:path*",
        destination: "/dat-ve",
        permanent: false
      },
      {
        source: "/ve-mistory/:path*",
        destination: "/thong-tin-ho-tro",
        permanent: false
      },
      {
        source: "/san-pham/:path*",
        destination: "/kham-pha",
        permanent: false
      }
    ];
  }
};

export default nextConfig;
