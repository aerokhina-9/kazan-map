import type { NextConfig } from "next";

// Если репозиторий называется не username.github.io, раскомментируйте и укажите имя репозитория
// Например, если репозиторий называется "kazan-map", то basePath будет "/kazan-map"
// const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  // basePath: basePath, // Раскомментируйте, если репозиторий не в корне GitHub Pages
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
