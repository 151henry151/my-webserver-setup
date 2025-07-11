#!/bin/bash

# Detailed script to update all submodules and commit changes to the webserver project
# Usage: ./update-submodules.bash

set -e  # Exit on any error

echo "=== Submodule Update Script ==="
echo "Date: $(date)"
echo ""

# Change to the webserver directory
cd "$(dirname "$0")"

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo "❌ Error: Not in a git repository"
    exit 1
fi

echo "✅ Git repository found"

# Check if we have uncommitted changes (excluding ignored files)
if ! git diff-index --quiet HEAD --; then
    echo "⚠️  Warning: You have uncommitted changes. Please commit or stash them first."
    echo "Run 'git status' to see what needs to be committed."
    echo ""
    echo "Current uncommitted changes:"
    git status --porcelain
    echo ""
    echo "If these are just runtime files (logs, databases, etc.), you can safely commit them."
    echo "Otherwise, please handle them manually before running this script."
    echo ""
    read -p "Do you want to proceed anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Aborted."
        exit 1
    fi
fi

echo "✅ Ready to proceed with submodule updates"

# Show current submodule status
echo ""
echo "Current submodule status:"
git submodule status

# Update all submodules to their latest remote versions
echo ""
echo "🔄 Updating all submodules..."
git submodule update --remote

# Check if any submodules were updated
if git diff-index --quiet HEAD --; then
    echo ""
    echo "✅ No submodule updates found. All submodules are up to date."
    exit 0
fi

# Show what submodules were updated
echo ""
echo "📝 Submodules updated:"
git diff --cached --name-only

# Show the specific changes (commit hashes)
echo ""
echo "📊 Submodule commit changes:"
git diff --cached --submodule=log

# Show what will be committed (excluding submodule changes)
echo ""
echo "📋 Files to be committed (excluding submodules):"
git diff --cached --name-only | grep -v "domains/com/hromp.com/public_html/pipedream" | grep -v "domains/com/hromp.com/public_html/weatherpage" | grep -v "media-stack" | grep -v "www/html/hromp.com/" || echo "No additional files to commit"

# Commit the submodule updates
echo ""
echo "💾 Committing submodule updates..."
git add .
git commit -m "Update submodules to latest versions - $(date '+%Y-%m-%d %H:%M:%S')"

# Push the changes to remote
echo ""
echo "🚀 Pushing changes to remote..."
git push

echo ""
echo "=== ✅ Submodule Update Complete ==="
echo "All submodules have been updated and changes pushed to remote."
echo "Date: $(date)" 