#!/usr/bin/env bash
# Runs before `next build`: the website opens the app's own screens from
# public/app, so a build without them would ship an empty app panel.
#
# - Flutter installed: rebuild public/app from the current app code.
# - No Flutter (e.g. a hosting build): use the public/app already there, or an
#   app hosted elsewhere via NEXT_PUBLIC_PIAX_APP_URL; otherwise stop.
set -euo pipefail

here="$(cd "$(dirname "$0")" && pwd)"

if [[ -n "${NEXT_PUBLIC_PIAX_APP_URL:-}" ]]; then
  echo "prebuild: app screens served from $NEXT_PUBLIC_PIAX_APP_URL"
elif [[ -f "$here/../public/app/index.html" ]]; then
  echo "prebuild: using existing public/app bundle"
elif command -v flutter >/dev/null 2>&1 && [[ -f "$here/../../piax/pubspec.yaml" || -f "$here/../../pubspec.yaml" ]]; then
  bash "$here/build-app.sh"
else
  echo "prebuild: public/app is missing and Flutter isn't installed." >&2
  echo "  Run 'npm run build:app' where Flutter is installed, or set NEXT_PUBLIC_PIAX_APP_URL." >&2
  exit 1
fi

