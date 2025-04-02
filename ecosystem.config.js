module.exports = {
  apps: [
    {
      name: 'lynx-blog',
      script: 'node_modules/next/dist/bin/next',
      args: 'start',
      cwd: '/var/www/lynx-blog',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        HOST: '0.0.0.0'
      },
      watch: false,
      instances: 1,
      exec_mode: 'fork',
      max_memory_restart: '1G',
      error_file: '/var/log/pm2/lynx-blog-error.log',
      out_file: '/var/log/pm2/lynx-blog-out.log',
      time: true
    },
  ],
} 