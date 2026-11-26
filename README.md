# SpendWise — Personal Budget Tracker

An 8-week progressive web development project built with HTML, CSS, and (in later weeks) JavaScript.

## Current Status: Week 4 (SpendWise Dashboard Shell — Grid & Flexbox)

This update restructures the application into a responsive dashboard shell using CSS Grid for the main layout and Flexbox inside the sidebar, header, and six category cards, with `:root` custom properties, a `@media (prefers-color-scheme: dark)` theme override, and hover/focus card transitions.

## What Each Part Does

- **Sidebar Navigation (`.sidebar`, `.nav-menu`)**: Uses Flexbox to organize the SpendWise brand mark and section navigation links (`Overview`, `Add Expense`, `Expenses`, `Guide`, `Tips Video`).
- **Top Header (`.top-header`)**: Uses Flexbox to align the main title, subtitle, and current period badge.
- **Category Cards (`.category-grid`, `.category-card`)**: Displays six static category cards (`Food`, `Transport`, `Rent`, `Entertainment`, `Savings`, `Utilities`) using Flexbox for internal layout and `200ms` hover/focus transitions.
- **Add Expense Form (`#expense-form`)**: Preserves labeled inputs, category `<select>`, date input, and `<button type="button">`.
- **Expenses Table (`#expenses-table`) & Video (`#video-section`)**: Displays sample expense rows with alternating tints and hover highlights, alongside the embedded budgeting tips video.
- **Responsive & Dark Mode CSS (`style.css`)**: Collapses to a single column below `768px` and overrides `:root` variables for dark color schemes.
  