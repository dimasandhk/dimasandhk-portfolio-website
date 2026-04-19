## 2024-04-15 - Unrelated concurrent fetches blocking each other

**Learning:** In SvelteKit applications (and single-page apps generally), combining independent API data fetches into a single blocking `Promise.all` is an anti-pattern when they hydrate unrelated UI components. For instance, the YouTube fetch in the linktree route was being artificially delayed by the Spotify fetches. The UI component for YouTube does not depend on Spotify data, so they should load and render independently to improve perceived performance and Time to Interactive (TTI).
**Action:** Extract unrelated concurrent asynchronous operations into separate concurrent execution paths. Await them separately, use independent promise chains, or wrap them in independent async IIFEs so that each UI component can render as soon as its required data is available.
## 2024-04-19 - Inefficient Date formatting in loops

**Learning:** Calling `new Date().toLocaleString()` or `new Date().toLocaleDateString()` inside loops (like over GitHub contributions or YouTube videos) has significant performance overhead because it creates a new `Intl.DateTimeFormat` instance for every single iteration.
**Action:** Instantiate a single `Intl.DateTimeFormat` instance outside the loop (or outside the function if the format is constant), and call `formatter.format(date)` inside the loop to drastically improve formatting performance.
