# Bolt Journal
## 2026-04-14 - [Independent UI API Fetching]
**Learning:** Grouping independent API requests required for UI rendering in a single `Promise.all` array creates unnecessary synchronization barriers. If one request is slow, it blocks parsing and rendering for all other data, hurting progressive rendering and User Experience.
**Action:** Split independent API data fetches that hydrate unrelated UI components into concurrent execution paths. Let them parse their JSON asynchronously and independently update their state to enable immediate partial UI updates.
