#!/bin/bash
# Auto-deploy script for agentzyra.com
# Run: bash deploy.sh

set -e

REPO_DIR="/root/agentzyra.com"
OUT_DIR="$REPO_DIR/out"
CADDYFILE="/etc/caddy/Caddyfile"

echo "🚀 Deploying agentzyra.com..."

cd "$REPO_DIR"

# Pull latest
echo "📦 Pulling latest..."
git pull origin main 2>/dev/null || true

# Install deps
echo "📦 Installing dependencies..."
npm install --silent

# Build
echo "🔨 Building..."
npm run build

# Deploy
echo "📂 Copying to web root..."
# Caddy serves directly from out/ so no copy needed

# Restart Caddy
echo "🔄 Reloading Caddy..."
systemctl reload caddy 2>/dev/null || systemctl restart caddy

echo "✅ Deploy complete! https://agentzyra.com"
