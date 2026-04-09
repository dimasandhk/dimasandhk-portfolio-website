## 2025-02-28 - Missing ARIA Labels on Icon-Only Buttons

**Learning:** Found several icon-only buttons (theme toggle, modal close buttons) missing `aria-label` attributes across different components (`+layout.svelte`, `NotionGallery.svelte`). Without these, screen reader users cannot determine the purpose of these interactive elements.
**Action:** Always ensure that icon-only interactive elements (like buttons or links) have a descriptive `aria-label` or visually hidden text to communicate their function to assistive technologies.
