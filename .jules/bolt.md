## 2024-04-15 - Unrelated concurrent fetches blocking each other

**Learning:** In SvelteKit applications (and single-page apps generally), combining independent API data fetches into a single blocking `Promise.all` is an anti-pattern when they hydrate unrelated UI components. For instance, the YouTube fetch in the linktree route was being artificially delayed by the Spotify fetches. The UI component for YouTube does not depend on Spotify data, so they should load and render independently to improve perceived performance and Time to Interactive (TTI).
**Action:** Extract unrelated concurrent asynchronous operations into separate concurrent execution paths. Await them separately, use independent promise chains, or wrap them in independent async IIFEs so that each UI component can render as soon as its required data is available.

## 2024-04-20 - Intl.DateTimeFormat in Loops

**Learning:** Re-instantiating `Intl.DateTimeFormat` or calling `toLocaleString` on `Date` objects repeatedly inside loops incurs a significant performance penalty compared to doing it once outside the loop.
**Action:** When parsing dates or numbers using Intl APIs within a loop, instantiate the formatter once outside the loop and use `.format()` inside the loop to avoid recreating the expensive object during each iteration.

## 2024-05-18 - Hoist search query transformations in Svelte 5 with $derived.by

**Learning:** In Svelte 5, using a standard `$derived` block for filtering loops with reactive string transformations (like `.toLowerCase()` or `.trim()`) causes those transformations to be redundantly re-calculated for _every_ item in the array during iteration. Svelte 5 provides `$derived.by()` to encapsulate reactive statements, allowing us to hoist these expensive computations outside the loop so they are only calculated once per reactivity trigger.
**Action:** Always use `$derived.by` instead of `$derived` when filtering or mapping over arrays if there are reactive primitive values that require transformation before being compared. Additionally, include early returns within the loop (e.g., `if (!query) return true;`) to skip further checks.
