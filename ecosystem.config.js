module.exports = {
  apps: [
    {
      name: 'lynx-blog',
      script: 'npm',
      args: 'start',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
} 