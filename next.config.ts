import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "focusreactive.com",
        pathname: "/**",
      },
    ],
  },
  i18n: {
    locales: ["en", "sv"],
    defaultLocale: "en",
    localeDetection: false,
  },
};

export default nextConfig;
