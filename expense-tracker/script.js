document.addEventListener('DOMContentLoaded', function() {
    const expenseForm = document.getElementById('expense-form');
    const expenseNameInput = document.getElementById('expense-name');
    const expenseAmountInput = document.getElementById('expense-amount');
    const expenseList = document.getElementById('expense-list');
    const totalExpense = document.getElementById('total-expense');

    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    const renderExpenses = () => {
        expenseList.innerHTML = '';
        let total = 0;
        expenses.forEach((expense, index) => {
            const expenseItem = document.createElement('div');
            expenseItem.classList.add('expense-item');
            expenseItem.innerHTML = `
                <span>${expense.name}</span>
                <span>$${expense.amount}</span>
                <button onclick="editExpense(${index})">Edit</button>
                <button onclick="deleteExpense(${index})">Delete</button>
            `;
            expenseList.appendChild(expenseItem);
            total += parseFloat(expense.amount);
        });
        totalExpense.innerText = `Total: $${total.toFixed(2)}`;
    };

    window.editExpense = (index) => {
        const newName = prompt('Enter new name:', expenses[index].name);
        const newAmount = prompt('Enter new amount:', expenses[index].amount);
        if (newName !== null && newAmount !== null) {
            expenses[index].name = newName;
            expenses[index].amount = newAmount;
            localStorage.setItem('expenses', JSON.stringify(expenses));
            renderExpenses();
        }
    };

    window.deleteExpense = (index) => {
        expenses.splice(index, 1);
        localStorage.setItem('expenses', JSON.stringify(expenses));
        renderExpenses();
    };

    expenseForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const expenseName = expenseNameInput.value;
        const expenseAmount = expenseAmountInput.value;
        expenses.push({ name: expenseName, amount: expenseAmount });
        localStorage.setItem('expenses', JSON.stringify(expenses));
        renderExpenses();
        expenseForm.reset();
    });

    renderExpenses();
});
