## 2025-02-28 - Missing ARIA Labels on Icon-Only Buttons

**Learning:** Found several icon-only buttons (theme toggle, modal close buttons) missing `aria-label` attributes across different components (`+layout.svelte`, `NotionGallery.svelte`). Without these, screen reader users cannot determine the purpose of these interactive elements.
**Action:** Always ensure that icon-only interactive elements (like buttons or links) have a descriptive `aria-label` or visually hidden text to communicate their function to assistive technologies.

## 2024-04-10 - Accessible Interactive Cards

**Learning:** The project's interactive gallery cards (in components like NotionGallery) previously used generic `<div>` tags with `onclick` handlers, bypassing native keyboard accessibility and requiring `svelte-ignore a11y` comments.
**Action:** Replaced `<div>` containers acting as interactive items with semantic `<button>` tags. Used Tailwind classes `w-full text-left` to preserve original block layout while adding explicit `focus-visible` styles (e.g., `focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:outline-none focus-visible:ring-offset-2`) to ensure that keyboard users have clear visual feedback when tabbing through items.

## 2025-02-28 - Stateful Interactive Elements Accessibility

**Learning:** Found multiple places (navigation links, filter tabs, year selection tabs) where visual state (active/selected) was conveyed only through CSS classes, meaning screen readers couldn't identify the active element. Relying only on visual cues excludes users with visual impairments.
**Action:** Always pair visual active states with semantic ARIA attributes (`aria-current="page"` for navigation links, `aria-pressed="true"` for toggle buttons/tabs). Additionally, always apply clear `focus-visible` styles to ensure keyboard users have a visible focus indicator when navigating these elements.

## 2025-02-28 - Tooltip Keyboard Accessibility

**Learning:** Hover-triggered tooltips (e.g., using `group-hover:opacity-100` in Tailwind) are invisible to keyboard-only users who navigate via the Tab key, unless explicit focus states are also defined.
**Action:** Always pair `group-hover` visibility classes with `group-focus-visible` classes (like `group-focus-visible:opacity-100 group-focus-visible:visible`) on tooltip elements so they appear when the parent interactive element receives keyboard focus.

## 2025-02-28 - Modal Keyboard Controls

**Learning:** Custom modal backdrops that act as interactive overlays (e.g., `role="button" tabindex="0"`) often lack comprehensive keyboard support. Users expect to close modals with the `Escape` key at any point, and with `Enter` or `Space` when the backdrop itself is focused.
**Action:** Ensure custom modal overlays handle `keydown` events for `Escape` globally within the modal context, and handle `Enter` and `Space` specifically when `e.target === e.currentTarget` on the backdrop itself.
