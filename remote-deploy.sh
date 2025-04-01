#!/bin/bash

# 设置错误时退出
set -e

# 服务器信息
SERVER_USER="ubuntu"
SERVER_IP="3.91.247.126"
KEY_FILE="lynxblogkey.pem"
APP_DIR="lynx-blog"
REPO_URL="https://github.com/lynxrelax/myblog.git"

echo "🚀 开始远程部署流程..."

# 确保密钥文件权限正确
chmod 600 $KEY_FILE

# 连接到服务器并执行命令
ssh -i $KEY_FILE $SERVER_USER@$SERVER_IP << EOF
    # 检查应用目录是否存在
    if [ ! -d "~/$APP_DIR" ]; then
        echo "📁 创建应用目录..."
        mkdir -p ~/$APP_DIR
    fi

    # 进入应用目录
    cd ~/$APP_DIR

    # 检查是否为 Git 仓库
    if [ ! -d ".git" ]; then
        echo "🔄 初始化 Git 仓库..."
        git init
        git remote add origin $REPO_URL
        git fetch origin
        git checkout -b master
        git pull origin master
    else
        # 清理未跟踪的文件
        echo "🧹 清理未跟踪的文件..."
        git clean -fd
        git reset --hard

        # 拉取最新代码
        echo "📥 拉取最新代码..."
        git pull origin master
    fi

    # 清理 node_modules
    echo "🧹 清理 node_modules..."
    rm -rf node_modules

    # 安装依赖（使用 --no-optional 减少内存使用）
    echo "📦 安装依赖..."
    npm install --no-optional --production=false

    # 构建项目
    echo "🏗️ 构建项目..."
    NODE_OPTIONS="--max-old-space-size=512" ./node_modules/.bin/next build

    # 检查 PM2 是否已安装
    if ! command -v pm2 &> /dev/null; then
        echo "📦 安装 PM2..."
        npm install -g pm2
    fi

    # 检查应用是否已在运行
    if pm2 list | grep -q "$APP_DIR"; then
        echo "🔄 重启应用..."
        pm2 restart $APP_DIR
    else
        echo "🚀 启动应用..."
        pm2 start npm --name "$APP_DIR" -- start
    fi

    # 保存 PM2 进程列表
    echo "💾 保存 PM2 进程列表..."
    pm2 save

    # 检查应用状态
    echo "📊 检查应用状态..."
    pm2 status

    # 检查 Nginx 配置
    echo "🔍 检查 Nginx 配置..."
    sudo nginx -t

    # 重启 Nginx
    echo "🔄 重启 Nginx..."
    sudo systemctl restart nginx

    # 检查 Nginx 状态
    echo "📊 检查 Nginx 状态..."
    sudo systemctl status nginx

    # 检查应用日志
    echo "📝 检查应用日志..."
    pm2 logs $APP_DIR --lines 50
EOF

echo "✅ 远程部署完成！" 