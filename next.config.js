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
    api:
      process.env.NEXT_PUBLIC_ENVIRONMENT === 'production'
        ? 'https://api.congreso.openpolitica.com/api/'
        : 'https://api.dev.congreso.openpolitica.com/api/',
    hotjar: {
      id: 2879782,
      version: 6,
    },
  },
};
