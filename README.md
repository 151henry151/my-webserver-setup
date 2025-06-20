# Solar System Calculator

A single-file interactive web tool for building scale models of the solar system and calculating distances between planets.

## Features
- Enter a sun diameter and get all planet diameters and distances to scale
- Calculate the distance between any two solar system objects
- All logic and UI in a single HTML file (no dependencies)

## Usage
Just serve `index.html` with any static web server or open it directly in your browser.

## Example nginx configuration
To serve this app at `https://yourdomain.com/solarsystem/`:

```nginx
server {
    listen 443 ssl;
    server_name yourdomain.com;
    root /var/www/html/solarsystem;

    location /solarsystem/ {
        index index.html;
        try_files $uri $uri/ /solarsystem/index.html;
    }
}
```

- Place `index.html` in `/var/www/html/solarsystem/`
- Adjust `server_name` and `root` as needed

## License
MIT

## Author
Created by [hromp.com](https://hromp.com)

# Webserver Project: Current State and Structure

This repository manages all web-facing services, static sites, and reverse proxy configurations for the romptele.com ecosystem. It is designed for clarity, maintainability, and secure integration with the media-stack and other services.

## Directory Structure (Key Locations)

```
webserver/
├── assets/                # Shared static assets (e.g., images, favicons)
├── configuration/         # Centralized config files (not always used)
├── credentials.ini        # Real API keys and secrets (never commit!)
├── credentials.ini.example# Example credentials file
├── domains/               # Domain records, organized by TLD
├── media-stack/           # Local copy or integration of media-stack (if present)
├── monitoring/            # Prometheus/Grafana configs and dashboards
├── nginx/
│   ├── conf.d/            # All nginx server block configs (see below)
│   ├── snippets/          # Shared nginx config fragments
│   └── auth/              # .htpasswd and other auth files
├── .gitignore             # Protects sensitive files
└── README.md              # This file
```

## Nginx Host Integration & Config Management

- **Nginx runs on the host** (not in Docker).
- All nginx config files are maintained in `webserver/nginx/conf.d/` and symlinked into `/etc/nginx/conf.d/`:
  ```bash
  ln -sf /home/henry/webserver/nginx/conf.d/*.conf /etc/nginx/conf.d/
  systemctl reload nginx
  ```
- **To modify a service/domain config:**
  1. Edit the relevant `.conf` file in `nginx/conf.d/`.
  2. Re-run the `ln -sf ...` command above to update the live configs.
  3. Reload nginx.
- **Shared proxy headers** are managed in `nginx/snippets/proxy-headers.conf` and included where needed.
- **HTTP Basic Auth** for admin and Grafana is managed via `.htpasswd` in `nginx/auth/`.

## Currently Reverse-Proxied Services & Domains

- **romptele.com**: Static site at `/var/www/html/romptele.com` (nginx config: `romptele.com.conf`)
- **admin.romptele.com**: Admin dashboard (protected by HTTP Basic Auth, serves `/var/www/html/romptele.com/admin.html`)
- **ampache.romptele.com**: Web-based music server (host-based install, see media-stack docs)
- **lidarr.romptele.com**: Lidarr music manager (reverse proxies to `localhost:8686`)
- **grafana.romptele.com**: Grafana dashboards (reverse proxies to `localhost:3000`, HTTP Basic Auth enabled)
- **jellyfin.conf, jellyseerr.conf, prowlarr.conf, qbittorrent.conf, radarr.conf, sonarr.conf**: Media-stack services, all reverse proxied to their respective localhost ports

## Static Site Locations

- **romptele.com**: `/var/www/html/romptele.com` (owned by `www-data`)
  - Main site: `index.html`
  - Admin dashboard: `admin.html`
  - Assets: `/var/www/html/romptele.com/assets/`

## Media-Stack Integration

- The server integrates with a local or submodule copy of media-stack (see `media-stack/` directory).
- All media-stack services are exposed on localhost and reverse proxied by host nginx.
- Nginx configs for these services are version-controlled here and symlinked into `/etc/nginx/conf.d/`.
- See the media-stack README for more details on service setup and integration.

## Monitoring

- **monitoring/** contains Prometheus and Grafana configs and dashboards for observability.
- Grafana is available at `grafana.romptele.com` (HTTP Basic Auth required).

## Assets

- Shared images and favicons are in `assets/img/` and referenced by nginx configs and static sites.

## Credentials & Security

- Real secrets are stored in `credentials.ini` (never committed).
- Example credentials for onboarding are in `credentials.ini.example`.
- HTTP Basic Auth files are in `nginx/auth/`.

## Making Changes

- **To update a service or domain config:** Edit the relevant file in `nginx/conf.d/`, re-symlink, and reload nginx.
- **To add a new domain/service:** Add a new config in `nginx/conf.d/`, symlink, reload nginx, and update DNS as needed.
- **To update static site content:** Edit files in `/var/www/html/romptele.com` (or other relevant web roots).
- **To update shared assets:** Place new files in `assets/img/` and reference them as needed.

## Submodules

This repository includes several submodules for standalone projects:

- **mercator-day-night**: Real-time day/night terminator map at `/mercator/`
- **solar-system-calculator**: Solar system scale model calculator at `/solar-system-calculator/`

### Submodule Deployment

When deploying to production, ensure submodules are properly initialized:

```bash
git submodule update --init --recursive
```

This ensures all submodule files are downloaded and available for nginx to serve.

---

**This structure is designed for clarity, maintainability, and secure integration of all web-facing services and static sites.** 