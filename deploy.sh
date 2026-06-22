#!/bin/bash
set -e

cd /root/agentzyra.com

# Pull latest changes
git pull origin main

# Install dependencies & build
npm install --legacy-peer-deps
npm run build

# Copy to web server directory
cp -r out/* /var/www/agentzyra.com/
chown -R caddy:caddy /var/www/agentzyra.com

echo "✅ Deployed successfully!"
