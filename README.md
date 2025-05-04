# Webserver Project Structure

This repository provides a clear, organized, and secure way to manage multiple web projects, domains, and server configurations on your server.

## Directory Structure

```
webserver/
├── assets/                # Static assets, images, etc.
├── configuration/         # Centralized configuration files
│   ├── conf/              # Service configuration (nginx, etc.)
│   └── yml/               # Docker Compose and YAML configs
├── credentials.ini        # Your real API keys and secrets (never commit!)
├── credentials.ini.example# Example credentials file (safe to share)
├── domains/               # All managed domains, organized by TLD
│   ├── com/
│   │   ├── romptele.com/
│   │   ├── mailromp.com/
│   │   └── ...
│   ├── org/
│   │   └── vtcna.org/
│   ├── market/
│   │   └── romp.market/
│   ├── network/
│   │   └── romp.network/
│   ├── pw/
│   │   └── romp.pw/
│   └── work/
│       └── romp.work/
├── admin-tools/           # Scripts/utilities for server management (optional)
├── nginx/
│   └── conf.d/            # Nginx server block configs (symlinked to /etc/nginx/conf.d/)
├── .gitignore             # Ensures sensitive files are not committed
└── README.md              # This file
```

## Key Concepts

- **Domains**: Each domain is organized by its TLD for easy navigation and scalability.
- **Configuration**: Centralized in the `configuration/` and `nginx/conf.d/` directories for easy access and editing.
- **Credentials**: Store real secrets in `credentials.ini` (never commit this file). Use `credentials.ini.example` as a template for onboarding or sharing.
- **Version Control**: The project is git-initialized, with `.gitignore` protecting sensitive files.

## Nginx Host Integration

Nginx is managed directly on the host (not in Docker). All nginx configuration files are maintained in `webserver/nginx/conf.d/` and symlinked into `/etc/nginx/conf.d/` for the system nginx to load:

```bash
ln -s /home/henry/webserver/nginx/conf.d/* /etc/nginx/conf.d/
```

After updating configs, reload nginx:

```bash
systemctl reload nginx
```

This setup allows you to keep all nginx configs in version control and update them easily, while the host nginx always uses the latest versions.

## Static Site Locations

- **romptele.com** static site files are located at:
  ```
  /var/www/html/romptele.com
  ```
  - The nginx config for `romptele.com` is in `webserver/nginx/conf.d/romptele.com.conf` and is symlinked into `/etc/nginx/conf.d/`.
  - All files in `/var/www/html/romptele.com` are owned by `www-data` for proper web server permissions.

- **admin.romptele.com** serves the admin dashboard from the same directory, but is protected by HTTP Basic Auth (see `.htpasswd` in `/etc/nginx/auth/`).

## Media-Stack Integration

This server also runs the [media-stack](https://github.com/navilg/media-stack) project for media management (Jellyfin, Radarr, Sonarr, Prowlarr, Jellyseerr, qBittorrent, etc.).

- **Project Source:** [media-stack on GitHub](https://github.com/navilg/media-stack)
- **Local Setup Notes:**
  - `media-stack` services are managed via Docker Compose and organized under their own directory structure.
  - Nginx is managed on the host, with configs in this repository and symlinked into `/etc/nginx/conf.d/`.
  - All media-stack services expose their ports to the host, allowing nginx to reverse proxy to them via `localhost:PORT`.
  - This differs from the default media-stack setup, where nginx is run as a container and proxies via container names.

Refer to the [media-stack README](https://github.com/navilg/media-stack#readme) for more details on the upstream project, but keep in mind these local integration differences.

---

**This structure is designed for flexibility, security, and ease of use as your web projects and domain portfolio grow.** 