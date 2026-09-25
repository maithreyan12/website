#!/usr/bin/env bash
# Builds the PIAX Flutter app for the web and places it at website/public/app,
# where the website's AppPanel opens it (/app/index.html?embed=1&open=…).
#
# Usage (from website/):  npm run build:app
# Pass API_BASE_URL to point the app at a different backend, e.g.
#   API_BASE_URL=https://api.piax.care npm run build:app
set -euo pipefail

here="$(cd "$(dirname "$0")" && pwd)"
if [[ -f "$here/../../piax/pubspec.yaml" ]]; then
  repo="$(cd "$here/../../piax" && pwd)"
elif [[ -f "$here/../piax/pubspec.yaml" ]]; then
  repo="$(cd "$here/../piax" && pwd)"
else
  repo="$(cd "$here/../.." && pwd)"
fi
out="$here/../public/app"

defines=(--dart-define=ENVIRONMENT=production)
if [[ -n "${API_BASE_URL:-}" ]]; then
  defines+=(--dart-define=API_BASE_URL="$API_BASE_URL")
fi

cd "$repo"
flutter build web --release --base-href /app/ "${defines[@]}" -o "$out"
echo "PIAX app built into $out"
