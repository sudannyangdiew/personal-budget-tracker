// ==========================================
// 1. STATE ARRAYS & BUDGET CONFIGURATION
// ==========================================
const OWNER_NAME = "Sudan Nyang";
const APP_TITLE = `${OWNER_NAME}'s SpendWise`;
const CURRENCY = "$";

const categoryBudgets = [
  { name: "Food", limit: 200 },
  { name: "Transport", limit: 100 },
  { name: "Rent", limit: 350 },
  { name: "Entertainment", limit: 50 },
  { name: "Savings", limit: 150 },
  { name: "Utilities", limit: 80 }
];

const sampleExpenses = [
  { id: 1, name: "Groceries", amount: 42.5, category: "Food", date: "2026-11-02" },
  { id: 2, name: "Matatu Commute", amount: 4.0, category: "Transport", date: "2026-11-04" },
  { id: 3, name: "Monthly Rent", amount: 350.0, category: "Rent", date: "2026-11-05" },
  { id: 4, name: "Movie Night", amount: 15.0, category: "Entertainment", date: "2026-11-10" },
  { id: 5, name: "Mobile Data Bundle", amount: 12.0, category: "Utilities", date: "2026-11-14" }
];

let monthlyBudget = 1000;
let expenses = [...sampleExpenses];
let activeFilter = "All";

// ==========================================
// 2. DOM REFERENCES
// ==========================================
const expenseForm = document.getElementById("expense-form");
const expenseNameInput = document.getElementById("expense-name");
const expenseAmountInput = document.getElementById("expense-amount");
const expenseCategorySelect = document.getElementById("expense-category");
const expenseDateInput = document.getElementById("expense-date");
const formMessageEl = document.getElementById("form-message");
const resetSampleBtn = document.getElementById("reset-sample-btn");

const budgetForm = document.getElementById("budget-form");
const monthlyBudgetInput = document.getElementById("monthly-budget-input");
const categoryFilterSelect = document.getElementById("category-filter");

const expensesTbody = document.getElementById("expenses-tbody");
const summaryBudgetEl = document.getElementById("summary-budget");
const summarySpentEl = document.getElementById("summary-spent");
const summaryRemainingEl = document.getElementById("summary-remaining");
const summaryUsageEl = document.getElementById("summary-usage");
const budgetStatusBadgeEl = document.getElementById("budget-status-badge");
const budgetFeedbackEl = document.getElementById("budget-feedback");

// ==========================================
// 3. CALCULATION & DECISION HELPERS
// ==========================================
function formatCurrency(amount) {
  const value = Number.isFinite(amount) ? amount : 0;
  return `${CURRENCY}${value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
}

function getTotalSpent(list) {
  let total = 0;
  for (let i = 0; i < list.length; i++) {
    total += Number(list[i].amount) || 0;
  }
  return total;
}

function getCategorySpent(list, categoryName) {
  let categoryTotal = 0;
  for (const item of list) {
    if (item.category === categoryName) {
      categoryTotal += Number(item.amount) || 0;
    }
  }
  return categoryTotal;
}

function evaluateBudgetHealth(budget, totalSpent) {
  const remaining = budget - totalSpent;
  const usagePercent = budget > 0 ? (totalSpent / budget) * 100 : 0;

  if (budget <= 0) {
    return {
      remaining,
      usagePercent,
      badgeText: "No Budget Set",
      badgeClass: "status-warn",
      message: `${OWNER_NAME}'s monthly budget is $0.00—enter a budget above to track remaining balance.`
    };
  }

  if (remaining < 0) {
    return {
      remaining,
      usagePercent,
      badgeText: "Over Budget",
      badgeClass: "status-over",
      message: `Alert: ${OWNER_NAME} is ${formatCurrency(Math.abs(remaining))} over the monthly budget (${usagePercent.toFixed(1)}% used).`
    };
  }

  if (usagePercent >= 80) {
    return {
      remaining,
      usagePercent,
      badgeText: "Near Limit",
      badgeClass: "status-warn",
      message: `Caution: ${OWNER_NAME} has used ${usagePercent.toFixed(1)}% of the budget (${formatCurrency(remaining)} left).`
    };
  }

  return {
    remaining,
    usagePercent,
    badgeText: "Within Budget",
    badgeClass: "status-ok",
    message: `On track: ${OWNER_NAME} has ${formatCurrency(remaining)} remaining (${usagePercent.toFixed(1)}% used).`
  };
}

// ==========================================
// 4. DOM RENDERING FUNCTIONS (LOOPS)
// ==========================================
function renderSummary() {
  const totalSpent = getTotalSpent(expenses);
  const status = evaluateBudgetHealth(monthlyBudget, totalSpent);

  summaryBudgetEl.textContent = formatCurrency(monthlyBudget);
  summarySpentEl.textContent = formatCurrency(totalSpent);
  summaryRemainingEl.textContent = formatCurrency(status.remaining);
  summaryUsageEl.textContent = `${status.usagePercent.toFixed(1)}%`;

  budgetStatusBadgeEl.textContent = status.badgeText;
  budgetStatusBadgeEl.className = `status-badge ${status.badgeClass}`;

  budgetFeedbackEl.textContent = status.message;
  budgetFeedbackEl.className = `feedback-banner ${status.badgeClass}`;
}

function renderCategoryCards() {
  const cards = document.querySelectorAll(".category-card");

  for (const card of cards) {
    const categoryName = card.dataset.category;
    let budgetInfo = null;

    for (const item of categoryBudgets) {
      if (item.name === categoryName) {
        budgetInfo = item;
        break;
      }
    }

    const limit = budgetInfo ? budgetInfo.limit : 100;
    const spent = getCategorySpent(expenses, categoryName);
    const pct = limit > 0 ? Math.round((spent / limit) * 100) : 0;

    const tagEl = card.querySelector(".category-tag");
    const spentEl = card.querySelector(".amount-spent");
    const budgetEl = card.querySelector(".amount-budget");

    if (tagEl) tagEl.textContent = `${pct}%`;
    if (spentEl) spentEl.textContent = formatCurrency(spent);
    if (budgetEl) budgetEl.textContent = `of ${formatCurrency(limit)}`;

    if (spent > limit) {
      card.classList.add("card-over");
    } else {
      card.classList.remove("card-over");
    }
  }
}

function renderExpenseTable() {
  expensesTbody.innerHTML = "";

  const visibleExpenses = [];
  for (const expense of expenses) {
    if (activeFilter === "All" || expense.category === activeFilter) {
      visibleExpenses.push(expense);
    }
  }

  if (visibleExpenses.length === 0) {
    const emptyRow = document.createElement("tr");
    const emptyCell = document.createElement("td");
    emptyCell.colSpan = 5;
    emptyCell.className = "empty-row-cell";
    emptyCell.textContent =
      activeFilter === "All"
        ? `No expenses recorded yet for ${OWNER_NAME}.`
        : `No expenses in "${activeFilter}".`;
    emptyRow.appendChild(emptyCell);
    expensesTbody.appendChild(emptyRow);
    return;
  }

  for (const expense of visibleExpenses) {
    const row = document.createElement("tr");

    const nameCell = document.createElement("td");
    nameCell.textContent = expense.name;

    const amountCell = document.createElement("td");
    amountCell.textContent = formatCurrency(expense.amount);

    const categoryCell = document.createElement("td");
    categoryCell.textContent = expense.category;

    const dateCell = document.createElement("td");
    dateCell.textContent = expense.date || "—";

    const actionCell = document.createElement("td");
    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "delete-btn";
    deleteBtn.dataset.id = String(expense.id);
    deleteBtn.textContent = "Delete";
    actionCell.appendChild(deleteBtn);

    row.append(nameCell, amountCell, categoryCell, dateCell, actionCell);
    expensesTbody.appendChild(row);
  }
}

function renderDashboard() {
  renderSummary();
  renderCategoryCards();
  renderExpenseTable();
}

// ==========================================
// 5. EVENT LISTENERS & USER INTERACTIONS
// ==========================================
expenseForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = expenseNameInput.value.trim();
  const amount = Number.parseFloat(expenseAmountInput.value);
  const category = expenseCategorySelect.value;
  const date = expenseDateInput.value || new Date().toISOString().slice(0, 10);

  if (!name) {
    formMessageEl.textContent = "Please enter an expense name.";
    expenseNameInput.focus();
    return;
  }

  if (Number.isNaN(amount) || amount <= 0) {
    formMessageEl.textContent = "Please enter an expense amount greater than 0.";
    expenseAmountInput.focus();
    return;
  }

  formMessageEl.textContent = "";

  const newExpense = {
    id: Date.now(),
    name,
    amount,
    category,
    date
  };

  expenses.push(newExpense);
  expenseForm.reset();
  expenseCategorySelect.value = category;
  renderDashboard();
});

budgetForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const updatedBudget = Number.parseFloat(monthlyBudgetInput.value);

  if (Number.isNaN(updatedBudget) || updatedBudget < 0) {
    budgetFeedbackEl.textContent = "Enter a valid non-negative monthly budget.";
    budgetFeedbackEl.className = "feedback-banner status-over";
    return;
  }

  monthlyBudget = updatedBudget;
  renderDashboard();
});

categoryFilterSelect.addEventListener("change", (event) => {
  activeFilter = event.target.value;
  renderExpenseTable();
});

expensesTbody.addEventListener("click", (event) => {
  const target = event.target;
  if (!target.classList.contains("delete-btn")) {
    return;
  }

  const idToDelete = Number(target.dataset.id);
  const updatedList = [];
  for (const item of expenses) {
    if (item.id !== idToDelete) {
      updatedList.push(item);
    }
  }
  expenses = updatedList;
  renderDashboard();
});

resetSampleBtn.addEventListener("click", () => {
  expenses = [...sampleExpenses];
  activeFilter = "All";
  categoryFilterSelect.value = "All";
  formMessageEl.textContent = "";
  renderDashboard();
});

// Initialize default date and render initial dashboard
if (expenseDateInput && !expenseDateInput.value) {
  expenseDateInput.value = new Date().toISOString().slice(0, 10);
}
renderDashboard();