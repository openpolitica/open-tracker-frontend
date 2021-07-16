module.exports = {
  webpack(config, { isServer }) {
    if (isServer) {
      require('./scripts/optimize-svg');
    }
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};
