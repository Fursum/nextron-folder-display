/** @type {import('next').NextConfig} */
module.exports = {
  experimental: {
    externalDir: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.target = "electron-renderer";
    }
    return config;
  },
};
