// ==========================================
// 1. APPLICATION DATA & VARIABLES
// ==========================================
const appName = "SpendWise";
const currencySymbol = "$";
let monthlyBudget = 1000;
let isBudgetActive = true;

// Baseline expense items (objects inside an array)
const initialExpenses = [
  { name: "Groceries", amount: 42.5, category: "Food", date: "2026-11-02" },
  { name: "Matatu Commute", amount: 4.0, category: "Transport", date: "2026-11-04" },
  { name: "Monthly Rent", amount: 350.0, category: "Rent", date: "2026-11-05" },
  { name: "Movie Night", amount: 15.0, category: "Entertainment", date: "2026-11-10" },
  { name: "Mobile Data Bundle", amount: 12.0, category: "Utilities", date: "2026-11-14" }
];

let expenses = [...initialExpenses];

// ==========================================
// 2. REUSABLE CALCULATION & FORMAT FUNCTIONS
// ==========================================

/**
 * Formats a numeric value as currency (e.g., 42.5 -> "$42.50").
 */
function formatMoney(value) {
  const safeNumber = Number.isFinite(value) ? value : 0;
  return `${currencySymbol}${safeNumber.toFixed(2)}`;
}

/**
 * Parses a prompt string into a non-negative number, falling back if invalid.
 */
function parsePositiveAmount(rawInput, fallbackValue) {
  if (rawInput === null || rawInput.trim() === "") {
    return fallbackValue;
  }
  const parsed = Number.parseFloat(rawInput);
  if (Number.isNaN(parsed) || parsed < 0) {
    return fallbackValue;
  }
  return parsed;
}

/**
 * Calculates total spending across an array of expense objects.
 */
function calculateTotalExpenses(expenseList) {
  let total = 0;
  for (const item of expenseList) {
    total += Number(item.amount) || 0;
  }
  return total;
}

/**
 * Calculates remaining budget (positive = remaining, negative = over budget).
 */
function calculateRemainingBalance(budget, totalSpent) {
  return budget - totalSpent;
}

/**
 * Calculates percentage of the budget used.
 */
function calculateBudgetUsagePercent(budget, totalSpent) {
  if (budget <= 0) {
    return 0;
  }
  return (totalSpent / budget) * 100;
}

// ==========================================
// 3. USER INPUT COLLECTION VIA PROMPTS
// ==========================================

/**
 * Prompts the user for monthly budget and an optional new expense.
 */
function collectBudgetSessionInput() {
  const budgetPrompt = prompt(
    `Welcome to ${appName}!\nEnter your monthly budget (default: ${monthlyBudget}):`,
    String(monthlyBudget)
  );
  monthlyBudget = parsePositiveAmount(budgetPrompt, monthlyBudget);

  const addNew = confirm("Would you like to log a new expense right now?");
  if (!addNew) {
    return null;
  }

  const nameInput = prompt("Enter expense name (e.g., Lunch):", "Lunch");
  const expenseName =
    nameInput && nameInput.trim() !== "" ? nameInput.trim() : "Misc Expense";

  const amountInput = prompt("Enter expense amount:", "15");
  const expenseAmount = parsePositiveAmount(amountInput, 0);

  const categoryInput = prompt(
    "Enter category (Food, Transport, Rent, Entertainment, Savings, Utilities, Other):",
    "Food"
  );
  const expenseCategory =
    categoryInput && categoryInput.trim() !== ""
      ? categoryInput.trim()
      : "Other";

  const newExpense = {
    name: expenseName,
    amount: expenseAmount,
    category: expenseCategory,
    date: new Date().toISOString().slice(0, 10)
  };

  expenses.push(newExpense);
  return newExpense;
}

// ==========================================
// 4. CONSOLE DISPLAY FUNCTION
// ==========================================

/**
 * Logs a clearly labeled budgeting summary to the browser console.
 */
function displayBudgetSummary(budget, expenseList, latestAddedExpense) {
  const totalSpent = calculateTotalExpenses(expenseList);
  const remainingBalance = calculateRemainingBalance(budget, totalSpent);
  const usagePercent = calculateBudgetUsagePercent(budget, totalSpent);
  const statusLabel =
    remainingBalance >= 0 ? "Within Budget" : "Over Budget";

  console.group(`${appName} — Budget Summary`);
  console.log("Tracker Active:", isBudgetActive);
  console.log("Monthly Budget:", formatMoney(budget));
  console.log("Total Expenses Count:", expenseList.length);
  console.log("Total Spent:", formatMoney(totalSpent));
  console.log("Budget Used:", `${usagePercent.toFixed(1)}%`);
  console.log("Remaining Balance:", formatMoney(remainingBalance));
  console.log("Budget Status:", statusLabel);

  if (latestAddedExpense) {
    console.log("Newly Added Expense:", latestAddedExpense);
  }

  console.table(expenseList);
  console.groupEnd();
}

// ==========================================
// 5. ENTRY POINT
// ==========================================

function runSpendWiseFoundation() {
  const addedExpense = collectBudgetSessionInput();
  displayBudgetSummary(monthlyBudget, expenses, addedExpense);
}

runSpendWiseFoundation();