#!/bin/bash

# Minecraft Highscores Service Management Script

SERVICE_NAME="minecraft-highscores.service"

case "$1" in
    start)
        echo "Starting $SERVICE_NAME..."
        systemctl start $SERVICE_NAME
        ;;
    stop)
        echo "Stopping $SERVICE_NAME..."
        systemctl stop $SERVICE_NAME
        ;;
    restart)
        echo "Restarting $SERVICE_NAME..."
        systemctl restart $SERVICE_NAME
        ;;
    status)
        echo "Status of $SERVICE_NAME:"
        systemctl status $SERVICE_NAME
        ;;
    logs)
        echo "Recent logs for $SERVICE_NAME:"
        journalctl -u $SERVICE_NAME -f
        ;;
    enable)
        echo "Enabling $SERVICE_NAME to start on boot..."
        systemctl enable $SERVICE_NAME
        ;;
    disable)
        echo "Disabling $SERVICE_NAME from starting on boot..."
        systemctl disable $SERVICE_NAME
        ;;
    *)
        echo "Usage: $0 {start|stop|restart|status|logs|enable|disable}"
        echo ""
        echo "Commands:"
        echo "  start   - Start the highscores service"
        echo "  stop    - Stop the highscores service"
        echo "  restart - Restart the highscores service"
        echo "  status  - Show service status"
        echo "  logs    - Show service logs (follow mode)"
        echo "  enable  - Enable service to start on boot"
        echo "  disable - Disable service from starting on boot"
        exit 1
        ;;
esac 