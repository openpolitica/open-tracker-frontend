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
  env: {
    api: `https://api.${process.env.NEXT_PUBLIC_ENVIRONMENT}.congreso.openpolitica.com/api/`,
  },
};
