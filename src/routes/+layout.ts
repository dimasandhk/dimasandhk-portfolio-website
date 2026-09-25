import { dev } from '$app/environment';
import { injectAnalytics } from '@vercel/analytics/sveltekit';

injectAnalytics({ mode: dev ? 'development' : 'production' });

// One URL per page: /projects (never /projects/). SvelteKit 308-redirects the slashed form.
export const trailingSlash = 'never';
