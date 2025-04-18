module.exports = {
  apps: [
    {
      name: 'potato37',
      script: 'node_modules/next/dist/bin/next',
      args: 'start',
      env: {
        NODE_ENV: 'production',
        PORT: 3007,
      },
    },
  ],
};
