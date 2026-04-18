## 2024-04-15 - Unrelated concurrent fetches blocking each other

**Learning:** In SvelteKit applications (and single-page apps generally), combining independent API data fetches into a single blocking `Promise.all` is an anti-pattern when they hydrate unrelated UI components. For instance, the YouTube fetch in the linktree route was being artificially delayed by the Spotify fetches. The UI component for YouTube does not depend on Spotify data, so they should load and render independently to improve perceived performance and Time to Interactive (TTI).
**Action:** Extract unrelated concurrent asynchronous operations into separate concurrent execution paths. Await them separately, use independent promise chains, or wrap them in independent async IIFEs so that each UI component can render as soon as its required data is available.

## 2024-04-18 - Expensive Intl initializations in render loops

**Learning:** Instantiating new `Intl.DateTimeFormat` instances inside loops (such as calling `toLocaleDateString()` or `toLocaleString()` in an `{#each}` block or `for` loop) is an expensive operation that can noticeably degrade frontend rendering performance, especially for long lists.
**Action:** Always instantiate `Intl.DateTimeFormat` once outside the loop and reuse its `.format()` method inside the loop.
