#!/usr/bin/env bash
set -euo pipefail

# Placeholder pour télécharger des vidéos libres de droit.
# Exemple d'utilisation : ./scripts/download-videos.sh https://cdn.coverr.co/videos/coverr-colorful-lights-1234/1080p.mp4 aurora.mp4

ASSETS_DIR="app/renderer/assets/videos"
mkdir -p "$ASSETS_DIR"

if [ "$#" -lt 2 ]; then
  echo "Usage: $0 <url> <filename>" >&2
  exit 1
fi

curl -L "$1" -o "$ASSETS_DIR/$2"
