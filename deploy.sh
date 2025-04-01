#!/bin/bash

# 构建项目
npm run build

# 安装 PM2（如果还没有安装）
npm install -g pm2

# 使用 PM2 启动应用
pm2 start ecosystem.config.js

# 保存 PM2 进程列表
pm2 save

# 设置 PM2 开机自启
pm2 startup 