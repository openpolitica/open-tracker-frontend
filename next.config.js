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
    ogImage: 'https://open-tracker-og-image.vercel.app/api/og-image/',
    baseURL: 'https://tuku.pe',
    hotjar: {
      id: 2879782,
      version: 6,
    },
    grafanaDashboard:
      'https://grafana.data.congreso.openpolitica.com/d/23_rPc87z/exploracion-asistencias-y-votaciones-plenos-2021-2026?orgId=1&kiosk&theme=light',
  },
};
