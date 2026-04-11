## 2025-02-28 - Missing ARIA Labels on Icon-Only Buttons

**Learning:** Found several icon-only buttons (theme toggle, modal close buttons) missing `aria-label` attributes across different components (`+layout.svelte`, `NotionGallery.svelte`). Without these, screen reader users cannot determine the purpose of these interactive elements.
**Action:** Always ensure that icon-only interactive elements (like buttons or links) have a descriptive `aria-label` or visually hidden text to communicate their function to assistive technologies.

## 2024-04-10 - Accessible Interactive Cards

**Learning:** The project's interactive gallery cards (in components like NotionGallery) previously used generic `<div>` tags with `onclick` handlers, bypassing native keyboard accessibility and requiring `svelte-ignore a11y` comments.
**Action:** Replaced `<div>` containers acting as interactive items with semantic `<button>` tags. Used Tailwind classes `w-full text-left` to preserve original block layout while adding explicit `focus-visible` styles (e.g., `focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:outline-none focus-visible:ring-offset-2`) to ensure that keyboard users have clear visual feedback when tabbing through items.

## 2025-04-11 - State Indicators for Interactive Elements

**Learning:** For components that represent state (like navigation indicating current page or filter tabs indicating selected category), visual styling alone (e.g., background color changes) is insufficient for accessibility. Assistive technologies need explicit state markers.
**Action:** Always use `aria-current="page"` for active navigation links and `aria-pressed="true"` for toggle/filter buttons that are currently active. Ensure these elements also have proper `focus-visible` styles so keyboard users can see where they are tabbing.
