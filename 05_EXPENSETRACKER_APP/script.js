document.addEventListener("DOMContentLoaded", () => {
  const inputList = document.getElementById("input-list");
  const inputText = document.getElementById("input-text");
  const inputExpense = document.getElementById("input-expense");
  const addExpenseButton = document.getElementById("add-expense-btn");
  const expenseList = document.getElementById("expense-list");
  const totalPriceDisplay = document.getElementById("total-price");

  let expenses = JSON.parse(localStorage.getItem("expenses")) || []; 
  let totalAmount = calculateTotal();

  renderCart();

  addExpenseButton.addEventListener('click', (e) => {
    e.preventDefault();
    const name = inputText.value.trim();
    const amount = parseFloat(inputExpense.value.trim());

    if(!name || isNaN(amount)) {
        alert("Kuch to dal bhosadike udhar");
        return;
    }

    const expense = {
        id: Date.now(),
        name: name, 
        amount: amount
    };
    expenses.push(expense);
    saveExpensesToLocal();
    renderCart();
    updateTotal();

    inputText.value = "";
    inputExpense.value = "";
  });

  function calculateTotal() {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  };

  function updateTotal() {
    totalAmount = calculateTotal();
    totalPriceDisplay.textContent = totalAmount.toFixed(2);
  };

  function renderCart() {
    expenseList.innerHTML = "";
    expenses.forEach((item, index) => {
        const expenseDiv = document.createElement("div");
        expenseDiv.className = "product";
        expenseDiv.innerHTML = `
        <span>${item.name} - $${item.amount}</span>
        <button data-id="${item.id}" class="delete-btn">Delete</button>
        `;
        expenseList.appendChild(expenseDiv);
    });
    const deleteButtons = expenseList.querySelectorAll(".delete-btn");
    deleteButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = Number(e.target.getAttribute("data-id"));
        expenses = expenses.filter((exp) => exp.id !== id);
        saveExpensesToLocal();
        renderCart();
        updateTotal();
      });
    });
  };

  function saveExpensesToLocal() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  };
});
