import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: "export", // Закоментовано для SSR
  // Для SSR потрібен Firebase Blaze план!
  // Розкоментуй "output: export" для статичного експорту на безкоштовному плані
};

export default nextConfig;
