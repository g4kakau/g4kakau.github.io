#!/usr/bin/env bash
set -euo pipefail

input="${1:-}"
name="${2:-}"
mode="${3:-invert-hue}"

if [[ -z "$input" ]]; then
  echo "Usage: $0 input.pdf [output-name] [invert|invert-hue]"
  echo "Example: $0 cube-coordinate.pdf"
  echo "Example: $0 cube-coordinate.pdf cube-coordinate invert-hue"
  exit 1
fi

if [[ ! -f "$input" ]]; then
  echo "File not found: $input"
  exit 1
fi

if ! command -v magick >/dev/null 2>&1; then
  echo "Error: ImageMagick 'magick' command not found."
  echo "Install with: brew install imagemagick"
  exit 1
fi

if ! command -v gs >/dev/null 2>&1; then
  echo "Error: Ghostscript 'gs' command not found."
  echo "Install with: brew install ghostscript"
  exit 1
fi

if [[ -z "$name" ]]; then
  name="$(basename "$input" .pdf)"
fi

light="${name}-light.png"
dark="${name}-dark.png"

magick -density 300 "$input" -quality 100 "$light"

case "$mode" in
  invert)
    magick "$light" -channel RGB -negate +channel "$dark"
    ;;
  invert-hue)
    magick "$light" -channel RGB -negate +channel -modulate 100,100,200 "$dark"
    ;;
  *)
    echo "Unknown mode: $mode"
    echo "Use: invert or invert-hue"
    exit 1
    ;;
esac

echo "Generated:"
echo "  $light"
echo "  $dark"
