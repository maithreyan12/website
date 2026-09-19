/**
 * The website doesn't re-build features the PIAX app already has. It opens the
 * app's own screens — the Flutter web build (repo root `web/` + `lib/`) — in
 * the AppPanel overlay, so shopping, the size finder, plans and the tracker
 * look and work exactly as they do in the app.
 *
 * Protocol (see lib/core/services/web_bridge.dart in the Flutter app):
 *   website → app   {type: 'piax:open', open: <AppScreen>, ...params}
 *                   or the first load: <APP_URL>?embed=1&open=<AppScreen>&...params
 *   app → website   {type: 'piax:ready'}  {type: 'piax:cart', count}
 *                   {type: 'piax:cycle', last: 'yyyy-mm-dd', cycle, period}  (her saved cycle)
 */

/** Where the Flutter web build is served. `npm run build:app` puts it at /app. */
export const APP_URL = process.env.NEXT_PUBLIC_PIAX_APP_URL || '/app/index.html';

export type AppScreen =
  | 'home'
  | 'shop'
  | 'care'
  | 'chat'
  | 'learn'
  | 'profile'
  | 'cart'
  | 'add' // params.items = "<productId>:<packs>:<mm>,…"; params.mode = 'box' sets the bag to exactly these packs
  | 'box' // the app's Build your box; params.packs = "<mm>:<packs>,…"
  | 'product' // params.id = product id
  | 'size-finder'
  | 'plans'
  | 'tracker' // params last (yyyy-mm-dd), cycle, period: the calculator's values, if she changed them
  | 'calendar'
  | 'assistants'
  | 'stores'
  | 'orders';

export interface AppEntry {
  open: AppScreen;
  params?: Record<string, string>;
}

export function appEntryUrl(entry: AppEntry): string {
  const query = new URLSearchParams({ embed: '1', open: entry.open, ...entry.params });
  return `${APP_URL}${APP_URL.includes('?') ? '&' : '?'}${query.toString()}`;
}

export function appOrigin(): string {
  return new URL(APP_URL, window.location.href).origin;
}
