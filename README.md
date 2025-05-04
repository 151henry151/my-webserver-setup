# Webserver Project Structure

This repository is designed to help you manage multiple web projects, domains, and server configurations in a clear, organized, and secure way.

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
│   ├── .com/
│   │   ├── romptele.com/
│   │   ├── mailromp.com/
│   │   └── ...
│   ├── .org/
│   │   └── vtcna.org/
│   ├── .market/
│   │   └── romp.market/
│   ├── .network/
│   │   └── romp.network/
│   ├── .pw/
│   │   └── romp.pw/
│   └── .work/
│       └── romp.work/
├── admin-tools/           # Scripts/utilities for server management (optional)
├── .gitignore             # Ensures sensitive files are not committed
└── README.md              # This file
```

## Key Concepts

- **Domains**: Each domain is organized by its TLD for easy navigation and scalability.
- **Configuration**: Centralized in the `configuration/` directory for easy access and editing.
- **Credentials**: Store real secrets in `credentials.ini` (never commit this file). Use `credentials.ini.example` as a template for onboarding or sharing.
- **Version Control**: The project is git-initialized, with `.gitignore` protecting sensitive files.

## Getting Started

1. **Clone the repository** (or copy the structure).
2. **Copy `credentials.ini.example` to `credentials.ini`** and fill in your own API keys and secrets.
3. **Add or update domain directories** as you register/manage new domains.
4. **Edit configuration files** in the `configuration/` directory as needed.
5. **Use admin tools/scripts** for common server management tasks (optional).

## Security Notes
- Never commit `credentials.ini` or any real secrets to version control.
- Review and update `.gitignore` as needed to protect sensitive files.

## Extending the Project
- Add new TLD directories as you acquire domains with new extensions.
- Add new configuration or asset directories as your stack grows.
- Automate domain and config management with scripts in `admin-tools/`.

---

**This structure is designed for flexibility, security, and ease of use as your web projects and domain portfolio grow.** 