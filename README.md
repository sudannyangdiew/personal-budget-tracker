# Sudan Nyang's SpendWise — Personal Budget Tracker

An 8-week progressive web development project built by **Sudan Nyang** using HTML, CSS, and JavaScript.

## What Improvements Were Made This Week

- Renamed the tracker across the page title, header, sidebar, and feedback messages to **Sudan Nyang's SpendWise**.
- Replaced static-only page data with live DOM rendering for the budget summary cards, six category cards, and expense table.
- Added interactive controls to add expenses, update the monthly budget, filter expenses by category, delete individual expense rows, and reload sample expenses.

## How Conditionals Are Used

- **Input validation**: `if (!name)` and `if (Number.isNaN(amount) || amount <= 0)` stop invalid expense entries and show clear inline error messages.
- **Budget health evaluation**: `evaluateBudgetHealth()` uses `if / else if` branches (`budget <= 0`, `remaining < 0`, `usagePercent >= 80`, and default within-budget state) to set the status badge, feedback banner, and remaining balance message.
- **Category & filter checks**: Conditionals match expense categories against `categoryBudgets`, highlight over-limit category cards with `.card-over`, and filter visible rows when a category filter is active.

## How Arrays Are Used to Store Data

- `categoryBudgets` is an array of category objects (`{ name, limit }`) defining monthly limits for `Food`, `Transport`, `Rent`, `Entertainment`, `Savings`, and `Utilities`.
- `sampleExpenses` holds initial expense records, while `expenses` is the working array of expense objects (`{ id, name, amount, category, date }`) updated when expenses are added or removed.

## How the DOM Is Updated

- `renderSummary()` updates text content and status classes on `#summary-budget`, `#summary-spent`, `#summary-remaining`, `#summary-usage`, `#budget-status-badge`, and `#budget-feedback`.
- `renderCategoryCards()` updates each `.category-card` spent amount, budget target, usage percentage badge, and `.card-over` class.
- `renderExpenseTable()` clears `#expenses-tbody` and builds `<tr>` and `<td>` elements dynamically via `document.createElement()` (or shows an empty-state row when no items match).

## How User Interactions Are Handled Through Events

- `expenseForm` listens for `"submit"` (`event.preventDefault()`) to validate inputs, push a new expense into `expenses`, reset the form, and re-render the dashboard.
- `budgetForm` listens for `"submit"` to update `monthlyBudget` and recalculate remaining balance.
- `categoryFilterSelect` listens for `"change"` to filter table rows by category.
- `expensesTbody` uses event delegation on `"click"` to detect `.delete-btn` clicks, remove the matching expense by `id`, and update totals and category cards.
- `resetSampleBtn` listens for `"click"` to restore `sampleExpenses`.

## Challenges Encountered and How They Were Resolved

- **Keeping category cards, table rows, and summary totals in sync**: Adding or deleting an expense affects three parts of the UI at once. Centralizing `renderDashboard()` to call `renderSummary()`, `renderCategoryCards()`, and `renderExpenseTable()` ensures every section stays consistent after any state change.
- **Handling filtered or empty tables cleanly**: Filtering by a category can result in zero matching rows even when `expenses` is non-empty. Separating `visibleExpenses` from `expenses` in `renderExpenseTable()` lets the table show a category-specific empty message while keeping total spending accurate across all logged expenses.
  