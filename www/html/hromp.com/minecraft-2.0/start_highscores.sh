#!/bin/bash

# Change to the directory containing the script
cd "$(dirname "$0")"

# Activate the virtual environment
source highscores_env/bin/activate

# Start the Flask server
python highscores.py 