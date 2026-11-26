# Personal Budget Tracker

An 8-week progressive web development project built with HTML, CSS, and (in later weeks) JavaScript.

## Current Status: Week 2

This version expands the Week 1 static skeleton with a structured expense table, a form wrapper with category options, media embeds, interactive `<details>` help text, and CSS selectors.

## What Each Part Does

- **Header (`#main-header`)**: Displays the tracker title, subtitle, and a logo `<img>`.
- **Add Expense Form (`#expense-form`)**: Contains labeled inputs for expense name, amount, and date, a `<select>` dropdown with five categories (`Food`, `Transport`, `Rent`, `Entertainment`, `Other`), and a `<button type="button">`.
- **Interactive Guide (`<details>` / `<summary>`)**: Provides collapsible usage instructions without cluttering the page.
- **Expenses Table (`#expenses-table`)**: Uses `<thead>`, `<tbody>`, `<tr>`, `<th>`, and `<td>` with five sample rows and styled borders, alternating row colors, and hover states.
- **Budgeting Tips Video (`<iframe>`)**: Embeds an educational video on budgeting.
- **Stylesheet (`style.css`)**: Styles layout, cards, form controls, and tables using element, class, ID, descendant, direct child, positional pseudo-class, negation pseudo-class, and `:focus` selectors.
  