## 2024-04-15 - Unrelated concurrent fetches blocking each other

**Learning:** In SvelteKit applications (and single-page apps generally), combining independent API data fetches into a single blocking `Promise.all` is an anti-pattern when they hydrate unrelated UI components. For instance, the YouTube fetch in the linktree route was being artificially delayed by the Spotify fetches. The UI component for YouTube does not depend on Spotify data, so they should load and render independently to improve perceived performance and Time to Interactive (TTI).
**Action:** Extract unrelated concurrent asynchronous operations into separate concurrent execution paths. Await them separately, use independent promise chains, or wrap them in independent async IIFEs so that each UI component can render as soon as its required data is available.

## 2024-04-20 - Intl.DateTimeFormat in Loops

**Learning:** Re-instantiating `Intl.DateTimeFormat` or calling `toLocaleString` on `Date` objects repeatedly inside loops incurs a significant performance penalty compared to doing it once outside the loop.
**Action:** When parsing dates or numbers using Intl APIs within a loop, instantiate the formatter once outside the loop and use `.format()` inside the loop to avoid recreating the expensive object during each iteration.

## 2026-05-29 - Hoist Repeated Computations in Svelte 5 Derived State

**Learning:** When using derived state in Svelte 5 that involves filtering or mapping arrays based on user input, operations like `toLowerCase()` or `trim()` on the input can execute redundantly per item in the array if written inline. This scales poorly with large arrays.
**Action:** Use `$derived.by()` to execute a block of code, allowing you to hoist expensive or repeated computations out of iterative loops (such as `.filter()` or `.map()`) to be computed only once per state change.
