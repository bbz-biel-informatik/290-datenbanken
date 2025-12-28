#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
BUILD_DIR="$SCRIPT_DIR/build"
EXT_SRC="$SCRIPT_DIR/slides/extensions"
EXT_DEST="$BUILD_DIR/extensions"

mkdir -p "$BUILD_DIR"

if [ -d "$EXT_SRC" ]; then
  rm -rf "$EXT_DEST"
  cp -R "$EXT_SRC" "$EXT_DEST"
fi

echo "Starting Marp preview (output -> $BUILD_DIR/slides.html)"
marp "$SCRIPT_DIR/slides/slides.md" \
  --html \
  --watch \
  --preview \
  -o "$BUILD_DIR/slides.html"
