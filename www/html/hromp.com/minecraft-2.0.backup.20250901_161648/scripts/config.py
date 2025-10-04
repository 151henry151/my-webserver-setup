#!/usr/bin/env python3
"""
Configuration file for Minecraft Clicker
Loads email settings from environment variables or config file
"""

import os
from pathlib import Path

# Email Configuration
# These can be overridden by environment variables
EMAIL_CONFIG = {
    'SMTP_SERVER': os.getenv('SMTP_SERVER', 'mail.spacemail.com'),
    'SMTP_PORT': int(os.getenv('SMTP_PORT', '465')),
    'SMTP_USERNAME': os.getenv('SMTP_USERNAME', ''),
    'SMTP_PASSWORD': os.getenv('SMTP_PASSWORD', ''),
    'FROM_EMAIL': os.getenv('FROM_EMAIL', 'minecraftclicker@hromp.com')
}

def load_config_from_file(config_file='email_config.txt'):
    """Load configuration from a file if it exists"""
    config_path = Path(__file__).parent / config_file
    
    if config_path.exists():
        try:
            with open(config_path, 'r') as f:
                for line in f:
                    line = line.strip()
                    if line and not line.startswith('#') and '=' in line:
                        key, value = line.split('=', 1)
                        key = key.strip()
                        value = value.strip()
                        
                        if key in EMAIL_CONFIG:
                            if key == 'SMTP_PORT':
                                EMAIL_CONFIG[key] = int(value)
                            else:
                                EMAIL_CONFIG[key] = value
                                
            print(f"Loaded email configuration from {config_file}")
        except Exception as e:
            print(f"Warning: Could not load config file {config_file}: {e}")
    else:
        print(f"Config file {config_file} not found, using environment variables")

def get_email_config():
    """Get the current email configuration"""
    return EMAIL_CONFIG.copy()

# Load configuration when module is imported
load_config_from_file() 