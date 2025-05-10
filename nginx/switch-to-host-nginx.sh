#!/bin/bash

set -e

echo "Stopping Dockerized nginx..."
docker compose -f /root/media-stack/docker-compose-nginx.yml down

echo "Starting host nginx..."
systemctl start nginx

echo "Checking nginx status..."
systemctl status nginx --no-pager

echo "\nIf you need to revert, run:"
echo "  systemctl stop nginx"
echo "  docker compose -f /root/media-stack/docker-compose-nginx.yml up -d" 