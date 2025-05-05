document.addEventListener('DOMContentLoaded', function () {
    // Data object to store dashboard data
    let dashboardData = {
        customers: [
            { name: 'John Doe', phone: '123-456-7890', email: 'john.doe@example.com', course: 'Driving Course', totalFee: 10000, paid: 5000, balance: 5000, branch: 'Branch A', entryDate: '2023-01-01', nextInstallment: '2023-02-01', status: 'Active' },
            { name: 'Jane Smith', phone: '987-654-3210', email: 'jane.smith@example.com', course: '2 Wheeler', totalFee: 5000, paid: 2500, balance: 2500, branch: 'Branch B', entryDate: '2023-02-15', nextInstallment: '2023-03-15', status: 'Active' }
        ],
        expenses: [
            { type: 'Fuel', amount: 5000, date: '2023-04-01', branch: 'Branch A' },
            { type: 'Rent', amount: 10000, date: '2023-04-01', branch: 'Branch B' }
        ],
        testimonials: [
            { name: 'John Doe', course: 'Driving Course', feedback: 'Great driving school!', rating: 5 }
        ]
    };

    // Load data from local storage
    let storedData = localStorage.getItem('dashboardData');

    // If data exists in local storage, parse it
    if (storedData) {
        dashboardData = JSON.parse(storedData);
    }

    // Initialize dashboardData if it doesn't exist in Local Storage
    let dashboardData = JSON.parse(localStorage.getItem('dashboardData')) || {
        customers: [],
        expenses: [],
        testimonials: [],
        employees: [] // Assuming employees data structure
    };

    // Function to update dashboard summary cards
    function updateSummaryCards(data) {
        // Calculate metrics - these are simplified examples, actual calculations might be more complex
        const newCustomersThisMonth = data.customers.filter(c => {
            const entryDate = new Date(c.entryDate);
            const now = new Date();
            return entryDate.getMonth() === now.getMonth() && entryDate.getFullYear() === now.getFullYear();
        }).length;

        const currentMonthExpenses = data.expenses.filter(e => {
             const expenseDate = new Date(e.date);
             const now = new Date();
             return expenseDate.getMonth() === now.getMonth() && expenseDate.getFullYear() === now.getFullYear();
        }).reduce((total, expense) => total + expense.amount, 0);

        const totalBusiness = data.customers.reduce((total, customer) => total + (customer.totalFee || 0), 0);
        const employeeSalaryPaid = data.expenses.filter(e => e.type === 'Salary').reduce((total, expense) => total + expense.amount, 0);
        const totalPaidAmount = data.customers.reduce((total, customer) => total + (customer.paid || 0), 0);
        const totalBalanceAmount = data.customers.reduce((total, customer) => total + (customer.balance || 0), 0);
        const officeRent = data.expenses.filter(e => e.type === 'Rent').reduce((total, expense) => total + expense.amount, 0);
        const rtoFees = data.expenses.filter(e => e.type === 'RTO').reduce((total, expense) => total + expense.amount, 0);
        const totalCollection = totalPaidAmount; // Assuming total collection is total paid
        const totalExpense = data.expenses.reduce((total, expense) => total + expense.amount, 0);
        const otherExpenses = data.expenses.filter(e => e.type === 'Miscellaneous').reduce((total, expense) => total + expense.amount, 0);


        // Update the DOM elements
        document.getElementById('newCustomers').textContent = newCustomersThisMonth;
        document.getElementById('currentMonthExpenses').textContent = currentMonthExpenses.toFixed(2); // Format as currency
        document.getElementById('totalBusiness').textContent = totalBusiness.toFixed(2);
        document.getElementById('employeeSalaryPaid').textContent = employeeSalaryPaid.toFixed(2);
        document.getElementById('paidAmount').textContent = totalPaidAmount.toFixed(2);
        document.getElementById('balanceAmount').textContent = totalBalanceAmount.toFixed(2);
        document.getElementById('officeRent').textContent = officeRent.toFixed(2);
        document.getElementById('rtoFees').textContent = rtoFees.toFixed(2);
        document.getElementById('totalCollection').textContent = totalCollection.toFixed(2);
        document.getElementById('totalExpense').textContent = totalExpense.toFixed(2);
        document.getElementById('otherExpenses').textContent = otherExpenses.toFixed(2);
    }

    // Function to initialize charts (placeholders)
    function initializeCharts(data) {
        // Monthly Income vs. Expenses Chart
        var ctxIncomeExpense = document.getElementById('incomeExpenseChart').getContext('2d');
        new Chart(ctxIncomeExpense, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], // Example labels
                datasets: [
                    {
                        label: 'Income',
                        data: [], // Placeholder for data
                        backgroundColor: 'rgba(0, 123, 255, 0.5)',
                        borderColor: 'rgba(0, 123, 255, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Expenses',
                        data: [], // Placeholder for data
                        backgroundColor: 'rgba(220, 53, 69, 0.5)',
                        borderColor: 'rgba(220, 53, 69, 1)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });

        // Expense Category Breakdown Chart
        var ctxExpenseCategory = document.getElementById('expenseCategoryChart').getContext('2d');
        new Chart(ctxExpenseCategory, {
            type: 'pie',
            data: {
                labels: ['Fuel', 'Rent', 'Salary', 'RTO', 'Miscellaneous'], // Example labels
                datasets: [{
                    data: [], // Placeholder for data
                    backgroundColor: ['#007bff', '#dc3545', '#ffc107', '#28a745', '#6c757d'], // Example colors
                    borderColor: '#fff',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
            }
        });

        // Branch Comparison Chart
        var ctxBranchComparison = document.getElementById('branchComparisonChart').getContext('2d');
        new Chart(ctxBranchComparison, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], // Example labels
                datasets: [
                    {
                        label: 'Branch A',
                        data: [], // Placeholder for data
                        borderColor: '#007bff',
                        fill: false
                    },
                    {
                        label: 'Branch B',
                        data: [], // Placeholder for data
                        borderColor: '#28a745',
                        fill: false
                    }
                ]
            },
            options: {
                 responsive: true,
                maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }


    // --- Event Listeners ---
    // Branch selector dropdown in sidebar (if applicable to this page)
    const branchDropdownItems = document.querySelectorAll('#sidebarMenu .dropdown-item');
    branchDropdownItems.forEach(item => {
        item.addEventListener('click', function(event) {
            event.preventDefault();
            const selectedBranch = this.getAttribute('data-branch');
            // You would typically filter the dashboard data based on the selected branch here
            console.log('Branch selected:', selectedBranch);
            // Example: updateDashboardContent(dashboardData, selectedBranch);
            // For now, just update the button text
            const dropdownButton = this.closest('.dropdown').querySelector('.dropdown-toggle');
            if (dropdownButton) {
                dropdownButton.textContent = `Branch: ${selectedBranch}`;
            }
        });
    });


    // --- Initial Load ---
    updateSummaryCards(dashboardData); // Populate cards on load
    initializeCharts(dashboardData); // Initialize charts on load (with placeholder data)

});
