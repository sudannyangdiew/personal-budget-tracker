# SpendWise — Personal Budget Tracker

An 8-week progressive web development project built with HTML, CSS, and JavaScript.

## What SpendWise Does

SpendWise is a personal budgeting dashboard that tracks monthly budgets and expenses across categories such as Food, Transport, Rent, Entertainment, Savings, and Utilities. In Week 6, it adds a JavaScript foundation (`script.js`) that gathers user input via browser prompts, computes total spending and remaining balance, and prints structured summaries to the developer console.

## JavaScript Concepts Implemented

- **Variables & Data Types**: Uses `const` and `let` with strings (`appName`, `currencySymbol`), numbers (`monthlyBudget`, expense amounts), booleans (`isBudgetActive`), arrays (`initialExpenses`, `expenses`), and objects (each expense record).
- **Conditionals & Validation**: Checks for empty or invalid numeric entries (`Number.isNaN`, `Number.isFinite`, `budget <= 0`) and determines whether the user is within or over budget.
- **Loops**: Iterates through the `expenses` array using `for...of` to sum total spending.
- **Functions**: Separates formatting, validation, calculations, input collection, and console output into focused, reusable functions.
- **Browser Prompts & Console Output**: Collects input with `prompt()` / `confirm()` and displays labeled results using `console.group()`, `console.log()`, and `console.table()`.

## How Variables Are Used

- `appName` and `currencySymbol` store constant display settings (`"SpendWise"` and `"$"`).
- `monthlyBudget` holds the active monthly budget limit, updated when the user enters a budget value.
- `isBudgetActive` tracks whether the budgeting session is active.
- `initialExpenses` stores default sample expenses, while `expenses` holds the active list of expense objects that grows when a new expense is added during the prompt flow.

## How User Input Is Collected

`collectBudgetSessionInput()` uses `prompt()` to ask for the monthly budget and, if confirmed via `confirm()`, prompts for the expense name, amount, and category. `parsePositiveAmount()` converts the text input with `Number.parseFloat()` and falls back safely if the input is blank, cancelled, or negative.

## How Calculations Are Performed

- `calculateTotalExpenses(expenseList)` loops over each expense item and adds `item.amount` to a running total.
- `calculateRemainingBalance(budget, totalSpent)` subtracts `totalSpent` from `budget` (`budget - totalSpent`), showing positive funds left or a negative deficit if overspent.
- `calculateBudgetUsagePercent(budget, totalSpent)` computes `(totalSpent / budget) * 100` to show how much of the budget has been used.

## How Functions Help Organize the Code

Breaking the logic into small single-purpose functions (`formatMoney`, `parsePositiveAmount`, `calculateTotalExpenses`, `calculateRemainingBalance`, `calculateBudgetUsagePercent`, `collectBudgetSessionInput`, `displayBudgetSummary`, and `runSpendWiseFoundation`) keeps each task easy to read, test, and reuse as SpendWise expands into full DOM interaction in later weeks.
