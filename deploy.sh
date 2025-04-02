#!/bin/bash

# 设置颜色输出
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

# 检查是否有 --force 参数
FORCE=false
if [ "$1" = "--force" ]; then
  FORCE=true
fi

# 设置错误时退出
set -e

echo "开始部署流程..."

# 拉取最新代码
echo -e "${GREEN}拉取最新代码...${NC}"
git pull origin master

# 安装依赖
echo -e "${GREEN}安装依赖...${NC}"
npm install

# 清理构建文件
echo -e "${GREEN}清理构建文件...${NC}"
if [ "$FORCE" = true ]; then
  echo "执行完全清理..."
  rm -rf .next
  rm -rf node_modules/.cache
else
  echo "执行增量清理..."
  rm -rf .next/cache
fi

# 构建项目
echo -e "${GREEN}构建项目...${NC}"
if [ "$FORCE" = true ]; then
  echo "执行完全构建..."
  npm run build
else
  echo "执行增量构建..."
  NEXT_TELEMETRY_DISABLED=1 npm run build
fi

# 推送到 GitHub
echo -e "${GREEN}推送到 GitHub...${NC}"
git push origin master

# 部署到服务器
echo -e "${GREEN}部署到服务器 (52.70.167.235)...${NC}"
ssh -i lynxblogkey.pem ubuntu@52.70.167.235 << 'EOF'
  cd /var/www/lynx-blog
  echo "进入项目目录 ..."
  
  echo "拉取最新代码..."
  git fetch origin
  git reset --hard origin/master
  
  echo "安装依赖..."
  npm install
  
  echo "清理构建文件..."
  if [ "$FORCE" = true ]; then
    rm -rf .next
    rm -rf node_modules/.cache
  else
    rm -rf .next/cache
  fi
  
  echo "构建项目..."
  npm run build
  
  echo "重启应用..."
  pm2 restart lynx-blog
  
  echo "检查应用状态..."
  pm2 status lynx-blog
  
  echo "检查端口..."
  netstat -tuln | grep :3000
EOF