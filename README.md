# My Webserver Setup

This repository contains the complete configuration and setup for my production webserver infrastructure.

## 🏗️ Infrastructure Overview

This setup includes:
- **Nginx** - Reverse proxy and web server
- **SSL/TLS** - Let's Encrypt certificates for all domains
- **Media Stack** - Jellyfin, Sonarr, Radarr, Lidarr, Prowlarr, qBittorrent
- **Monitoring** - Grafana, Prometheus, Node Exporter
- **Web Applications** - Various custom web apps and services
- **Domain Management** - Multiple domain configurations

## 📁 Directory Structure

```
├── nginx/                 # Nginx configuration files
├── domains/              # Domain-specific configurations
├── media-stack/          # Media server stack (Jellyfin, *arr apps)
├── monitoring/           # Monitoring and observability
├── web-phone/           # Web phone application
├── web-phone-deploy/    # Web phone deployment files
├── plane/               # Plane project management
├── doodlr/              # Doodlr drawing application
├── www/                 # Static web content
└── config/              # System configuration files
```

## 🔧 Services

### Web Server
- **Nginx** - Main web server and reverse proxy
- **SSL Certificates** - Automated Let's Encrypt certificates
- **Multiple Domains** - hromp.com, chordispeak.com, minecraftclick.com, etc.

### Media Stack
- **Jellyfin** - Media server
- **Sonarr** - TV show management
- **Radarr** - Movie management  
- **Lidarr** - Music management
- **Prowlarr** - Indexer management
- **qBittorrent** - Torrent client

### Monitoring
- **Grafana** - Dashboards and visualization
- **Prometheus** - Metrics collection
- **Node Exporter** - System metrics

### Applications
- **Web Phone** - VoIP web application
- **Plane** - Project management
- **Doodlr** - Collaborative drawing
- **Minecraft Clicker** - Web game (submodule)

## 🚀 Deployment

This setup is designed for production deployment with:
- Automated SSL certificate renewal
- Docker containerization for services
- Nginx reverse proxy configuration
- Domain-based routing
- Security headers and best practices

## 🔒 Security

- SSL/TLS encryption for all services
- Security headers (HSTS, CSP, etc.)
- Authentication for sensitive services
- Firewall configuration
- Regular security updates

## 📊 Monitoring

- System metrics via Prometheus
- Service health monitoring
- Resource usage tracking
- Alerting for critical issues

## 🛠️ Maintenance

- Automated certificate renewal
- Regular backups
- Log rotation
- Service monitoring
- Security updates

## 📝 Notes

This is a production server setup. All configurations are actively used and should be maintained carefully.

For development or testing, use appropriate staging environments.