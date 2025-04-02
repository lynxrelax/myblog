#!/bin/bash

# 设置错误时退出
set -e

# 颜色输出
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# 检查是否有 --force 参数
FORCE=false
if [ "$1" = "--force" ]; then
  FORCE=true
  echo -e "${YELLOW}强制模式已启用${NC}"
fi

echo -e "${GREEN}开始部署流程...${NC}"

# 检查本地更改
if [ -n "$(git status --porcelain)" ]; then
    echo -e "${RED}错误：本地有未提交的更改，请先提交或暂存更改${NC}"
    git status
    exit 1
fi

# 拉取最新代码
echo -e "${GREEN}拉取最新代码...${NC}"
git pull origin master || {
    echo -e "${RED}错误：拉取代码失败${NC}"
    exit 1
}

# 安装依赖
echo -e "${GREEN}安装依赖...${NC}"
npm install || {
    echo -e "${RED}错误：依赖安装失败${NC}"
    exit 1
}

# 清理构建文件
echo -e "${GREEN}清理构建文件...${NC}"
if [ "$FORCE" = true ]; then
  echo -e "${YELLOW}执行完全清理...${NC}"
  rm -rf .next
  rm -rf node_modules/.cache
else
  echo -e "${YELLOW}执行增量清理...${NC}"
  rm -rf .next/cache
fi

# 构建项目
echo -e "${GREEN}构建项目...${NC}"
if [ "$FORCE" = true ]; then
  echo -e "${YELLOW}执行完全构建...${NC}"
  npm run build || {
    echo -e "${RED}错误：构建失败${NC}"
    exit 1
  }
else
  echo -e "${YELLOW}执行增量构建...${NC}"
  NEXT_TELEMETRY_DISABLED=1 npm run build || {
    echo -e "${RED}错误：构建失败${NC}"
    exit 1
  }
fi

# 检查构建是否成功
if [ ! -f ".next/BUILD_ID" ]; then
    echo -e "${RED}错误：构建失败，缺少 BUILD_ID 文件${NC}"
    exit 1
fi

# 推送到 GitHub
echo -e "${GREEN}推送到 GitHub...${NC}"
git push origin master || {
    echo -e "${RED}错误：推送代码失败${NC}"
    exit 1
}

# 服务器信息
SSH_KEY="lynxblogkey.pem"
SERVER_USER="ubuntu"
SERVER_IP="52.70.167.235"
PROJECT_DIR="/var/www/lynx-blog"

echo -e "${GREEN}部署到服务器 ($SERVER_IP)...${NC}"

# 检查SSH连接和密钥权限
if [ ! -f "$SSH_KEY" ]; then
    echo -e "${RED}错误：SSH密钥文件 $SSH_KEY 不存在${NC}"
    exit 1
fi

chmod 600 "$SSH_KEY" || {
    echo -e "${RED}错误：无法设置SSH密钥权限${NC}"
    exit 1
}

# 检查服务器基本状态
echo -e "${YELLOW}检查服务器状态...${NC}"
if ! ssh -i "$SSH_KEY" -o BatchMode=yes -o ConnectTimeout=5 "$SERVER_USER@$SERVER_IP" true; then
    echo -e "${RED}错误：无法连接到服务器${NC}"
    echo -e "${YELLOW}请检查："
    echo "1. 服务器IP是否正确 ($SERVER_IP)"
    echo "2. SSH密钥文件是否正确 ($SSH_KEY)"
    echo "3. 服务器安全组是否开放22端口"
    echo "4. 服务器SSH服务是否运行${NC}"
    exit 1
fi

# 执行远程部署
echo -e "${GREEN}执行远程部署命令...${NC}"
ssh -i "$SSH_KEY" "$SERVER_USER@$SERVER_IP" "FORCE=$FORCE bash -s" << 'EOF'
    # 远程脚本开始
    set -e
    GREEN='\033[0;32m'
    RED='\033[0;31m'
    YELLOW='\033[1;33m'
    NC='\033[0m'
    
    echo -e "${GREEN}进入项目目录 $PROJECT_DIR...${NC}"
    cd "$PROJECT_DIR" || {
        echo -e "${RED}错误：无法进入项目目录${NC}"
        exit 1
    }
    
    echo -e "${GREEN}拉取最新代码...${NC}"
    git pull origin master || {
        echo -e "${RED}错误：拉取代码失败${NC}"
        exit 1
    }
    
    echo -e "${GREEN}安装依赖...${NC}"
    npm install || {
        echo -e "${RED}错误：依赖安装失败${NC}"
        exit 1
    }
    
    echo -e "${GREEN}清理构建文件...${NC}"
    if [ "$FORCE" = true ]; then
      echo -e "${YELLOW}执行完全清理...${NC}"
      rm -rf .next
      rm -rf node_modules/.cache
    else
      echo -e "${YELLOW}执行增量清理...${NC}"
      rm -rf .next/cache
    fi
    
    echo -e "${GREEN}构建项目...${NC}"
    npm run build || {
        echo -e "${RED}错误：构建失败${NC}"
        exit 1
    }
    
    echo -e "${GREEN}重启应用...${NC}"
    pm2 restart lynx-blog || {
        echo -e "${RED}错误：重启应用失败${NC}"
        pm2 logs lynx-blog --lines 50
        exit 1
    }
    
    echo -e "${YELLOW}检查应用状态...${NC}"
    if ! pm2 show lynx-blog | grep -q "online"; then
        echo -e "${RED}错误：应用未运行${NC}"
        pm2 logs lynx-blog --lines 50
        exit 1
    fi
    
    echo -e "${YELLOW}检查端口监听...${NC}"
    if ! sudo lsof -i :3000 > /dev/null; then
        echo -e "${RED}错误：应用未监听3000端口${NC}"
        exit 1
    fi
    
    echo -e "${YELLOW}检查Nginx配置...${NC}"
    if ! sudo nginx -t; then
        echo -e "${RED}错误：Nginx配置无效${NC}"
        sudo cat /etc/nginx/sites-enabled/default
        exit 1
    fi
    
    echo -e "${GREEN}重启Nginx...${NC}"
    sudo systemctl restart nginx || {
        echo -e "${RED}错误：重启Nginx失败${NC}"
        sudo journalctl -u nginx --no-pager -n 50
        exit 1
    }
    
    echo -e "${GREEN}服务器部署完成！${NC}"
EOF

echo -e "${GREEN}部署完成！${NC}"
echo -e "${YELLOW}请访问: http://$SERVER_IP${NC}"