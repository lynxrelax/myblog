#!/bin/bash

# 设置错误时退出
set -e

# 颜色输出
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${GREEN}开始部署流程...${NC}"

# 检查本地更改
if [ -n "$(git status --porcelain)" ]; then
    echo -e "${RED}本地有未提交的更改，请先提交或暂存更改${NC}"
    exit 1
fi

# 拉取最新代码
echo -e "${GREEN}拉取最新代码...${NC}"
git pull origin master

# 安装依赖
echo -e "${GREEN}安装依赖...${NC}"
npm install

# 清理构建文件
echo -e "${GREEN}清理构建文件...${NC}"
rm -rf .next

# 构建项目
echo -e "${GREEN}构建项目...${NC}"
npm run build

# 检查构建是否成功
if [ ! -f ".next/BUILD_ID" ]; then
    echo -e "${RED}构建失败，请检查错误信息${NC}"
    exit 1
fi

# 推送到 GitHub
echo -e "${GREEN}推送到 GitHub...${NC}"
git push origin master

# 部署到服务器
echo -e "${GREEN}部署到服务器...${NC}"
ssh -i lynxblogkey.pem ubuntu@52.90.7.160 << 'EOF'
    cd /var/www/lynx-blog
    
    # 拉取最新代码
    git pull origin master
    
    # 安装依赖
    npm install
    
    # 清理构建文件
    rm -rf .next
    
    # 构建项目
    npm run build
    
    # 重启应用
    pm2 restart lynx-blog
    
    # 检查应用状态
    if pm2 show lynx-blog | grep -q "online"; then
        echo "应用已成功重启"
    else
        echo "应用重启失败，请检查日志"
        pm2 logs lynx-blog --lines 50
        exit 1
    fi
    
    # 检查端口监听
    if ! sudo lsof -i :3000 > /dev/null; then
        echo "应用未监听 3000 端口"
        exit 1
    fi
    
    # 检查 Nginx 配置
    if ! sudo nginx -t; then
        echo "Nginx 配置错误"
        exit 1
    fi
    
    # 重启 Nginx
    sudo systemctl restart nginx
EOF

echo -e "${GREEN}部署完成！${NC}" 