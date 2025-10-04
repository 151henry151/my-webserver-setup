#!/usr/bin/env bash
set -euo pipefail

# update-and-redeploy.sh
# Safely update doodlr submodule to latest upstream, rebuild containers, reload nginx, and run health checks.
# Usage: sudo bash /home/henry/webserver/doodlr/update-and-redeploy.sh [--no-stash] [--no-nginx]

WEBROOT="/home/henry/webserver"
SUBMODULE_PATH="/home/henry/webserver/doodlr/app"
COMPOSE_FILE="/home/henry/webserver/doodlr/docker/docker-compose.yml"
NGINX_CONF_DIR="/home/henry/webserver/nginx/conf.d"

DO_STASH=1
DO_NGINX=1

for arg in "$@"; do
  case "$arg" in
    --no-stash)
      DO_STASH=0
      ;;
    --no-nginx)
      DO_NGINX=0
      ;;
    *)
      echo "Unknown argument: $arg" >&2
      exit 2
      ;;
  esac
done

log() { printf "[%s] %s\n" "$(date '+%Y-%m-%d %H:%M:%S')" "$*"; }

update_submodule() {
  log "Updating doodlr submodule…"
  cd "$SUBMODULE_PATH"

  # Clear any unresolved merge/rebase state first
  if [ -n "$(git diff --name-only --diff-filter=U)" ]; then
    log "Detected unresolved merge state; aborting and resetting"
    git merge --abort || true
    git rebase --abort || true
    git reset --hard
    git clean -fd
  fi

  if [ "$DO_STASH" -eq 1 ]; then
    if ! git diff --quiet || ! git diff --cached --quiet || [ -n "$(git ls-files --others --exclude-standard)" ]; then
      log "Stashing local changes in submodule"
      git stash push -u -m 'update-and-reploy auto-stash' || true
    fi
  fi

  git fetch origin --tags
  local default_branch
  default_branch=$(git remote show origin | sed -n 's/\s*HEAD branch: \(.*\)/\1/p')
  if [ -z "$default_branch" ]; then default_branch=main; fi
  log "Default branch detected: $default_branch"

  git checkout "$default_branch"
  git pull --ff-only origin "$default_branch"

  if git stash list | grep -q 'update-and-redeploy auto-stash'; then
    log "Popping submodule stash"
    git stash pop || log "Stash pop had conflicts; please resolve inside $SUBMODULE_PATH"
  fi

  log "Submodule now at: $(git rev-parse --short HEAD)"
}

rebuild_containers() {
  log "Rebuilding and restarting doodlr containers…"
  cd "$WEBROOT/doodlr"
  docker compose -f "$COMPOSE_FILE" build --pull
  docker compose -f "$COMPOSE_FILE" up -d
}

reload_nginx() {
  if [ "$DO_NGINX" -eq 0 ]; then
    log "Skipping nginx reload per flag"
    return 0
  fi
  log "Testing and reloading nginx…"
  nginx -t
  ln -sf "$NGINX_CONF_DIR"/*.conf /etc/nginx/conf.d/
  systemctl reload nginx
}

health_checks() {
  log "Running health checks…"
  # Backend
  if curl -fsS "http://127.0.0.1:18000/health" >/dev/null; then
    log "Backend OK at http://127.0.0.1:18000/health"
  else
    log "Backend health check FAILED"
  fi
  # Frontend dev server
  if curl -fsSI "http://127.0.0.1:18080/" >/dev/null; then
    log "Frontend dev server OK at http://127.0.0.1:18080/"
  else
    log "Frontend dev server check FAILED"
  fi
  # Public endpoints
  if curl -fsSI "https://hromp.com/doodlr/" >/dev/null; then
    log "Public static OK at https://hromp.com/doodlr/"
  else
    log "Public static check FAILED"
  fi
  if curl -fsSI "https://hromp.com/doodlr/app/" >/dev/null; then
    log "Public app OK at https://hromp.com/doodlr/app/"
  else
    log "Public app check FAILED"
  fi
  if curl -fsS "https://hromp.com/doodlr/api/health" >/dev/null; then
    log "Public API OK at https://hromp.com/doodlr/api/health"
  else
    log "Public API check FAILED"
  fi
}

main() {
  update_submodule
  rebuild_containers
  reload_nginx
  health_checks
  log "Done."
}

main "$@" 