## 2024-04-15 - Unrelated concurrent fetches blocking each other

**Learning:** In SvelteKit applications (and single-page apps generally), combining independent API data fetches into a single blocking `Promise.all` is an anti-pattern when they hydrate unrelated UI components. For instance, the YouTube fetch in the linktree route was being artificially delayed by the Spotify fetches. The UI component for YouTube does not depend on Spotify data, so they should load and render independently to improve perceived performance and Time to Interactive (TTI).
**Action:** Extract unrelated concurrent asynchronous operations into separate concurrent execution paths. Await them separately, use independent promise chains, or wrap them in independent async IIFEs so that each UI component can render as soon as its required data is available.

## 2024-04-20 - Intl.DateTimeFormat in Loops

**Learning:** Re-instantiating `Intl.DateTimeFormat` or calling `toLocaleString` on `Date` objects repeatedly inside loops incurs a significant performance penalty compared to doing it once outside the loop.
**Action:** When parsing dates or numbers using Intl APIs within a loop, instantiate the formatter once outside the loop and use `.format()` inside the loop to avoid recreating the expensive object during each iteration.
## 2024-05-08 - Redundant String Computations in Filter Loops

**Learning:** When using `$derived` or `$derived.by` in Svelte 5 to filter arrays based on a text search query, applying `searchQuery.toLowerCase()` and `searchQuery.trim()` inside the `.filter()` callback forces the engine to recalculate those strings for every single item in the array, introducing an O(N) penalty for string operations.
**Action:** Always hoist invariant search string computations (like `.trim()` and `.toLowerCase()`) outside the loop or `.filter()` callback. In Svelte 5, use `$derived.by(() => { ... })` to pre-calculate these values once before iterating. Also, utilize early returns to avoid running expensive text search assertions if the item has already failed an easier check (like a category match).
