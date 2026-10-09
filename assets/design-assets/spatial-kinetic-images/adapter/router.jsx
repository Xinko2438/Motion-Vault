import { useSyncExternalStore } from 'react';
const valid = new Set(['/', '/paper', '/spiral']);
function pathname() { const route = location.hash.slice(1) || '/'; return valid.has(route) ? route : '/'; }
function subscribe(listener) { addEventListener('hashchange', listener); return () => removeEventListener('hashchange', listener); }
export function usePathname() { return useSyncExternalStore(subscribe, pathname); }
export function Link({href, children, ...props}) {
    const route = href === './paper' ? '/paper' : href === './spiral' ? '/spiral' : '/';
    return <a {...props} href={'#' + route}>{children}</a>;
}
