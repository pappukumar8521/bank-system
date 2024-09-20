let customers = [];

function createAccount() {
    const name = document.getElementById('name').value;
    const accountType = document.getElementById('accountType').value;
    const accountNumber = document.getElementById('accountNumber').value;
    const balance = parseFloat(document.getElementById('balance').value);

    // Validate minimum balance
    if (balance < 500) {
        displayMessage("Minimum balance is 500.", "error");
        return;
    }

    // Check if account number is unique
    if (!isAccountNumberUnique(accountNumber)) {
        displayMessage("Account number must be unique!", "error");
        return;
    }

    const customer = {
        name,
        accountNumber,
        balance,
        accountType,
    };

    customers.push(customer);
    displayMessage("Account created successfully!", "success");
    clearForm();
}

function isAccountNumberUnique(accountNumber) {
    return !customers.some(customer => customer.accountNumber === accountNumber);
}

function clearForm() {
    document.getElementById('name').value = '';
    document.getElementById('accountNumber').value = '';
    document.getElementById('balance').value = '';
}

function checkBalance() {
    const accountNumber = document.getElementById('actionAccountNumber').value;
    const customer = findCustomer(accountNumber);

    if (customer) {
        displayMessage(`Balance: ${customer.balance} INR`, "success");
    } else {
        displayMessage("Account not found!", "error");
    }
}

function creditAccount() {
    const accountNumber = document.getElementById('actionAccountNumber').value;
    const amount = parseFloat(prompt("Enter amount to credit:"));

    if (amount <= 0) {
        displayMessage("Amount should be positive!", "error");
        return;
    }

    const customer = findCustomer(accountNumber);

    if (customer) {
        customer.balance += amount;
        displayMessage(`Credited successfully. New balance: ${customer.balance} INR`, "success");
    } else {
        displayMessage("Account not found!", "error");
    }
}

function debitAccount() {
    const accountNumber = document.getElementById('actionAccountNumber').value;
    const amount = parseFloat(prompt("Enter amount to debit:"));

    if (amount <= 0) {
        displayMessage("Amount should be positive!", "error");
        return;
    }

    const customer = findCustomer(accountNumber);

    if (customer) {
        if (customer.balance - amount < 500) {
            displayMessage("Insufficient balance! Minimum balance should be 500.", "error");
        } else {
            customer.balance -= amount;
            displayMessage(`Debited successfully. New balance: ${customer.balance} INR`, "success");
        }
    } else {
        displayMessage("Account not found!", "error");
    }
}

function deleteAccount() {
    const accountNumber = document.getElementById('actionAccountNumber').value;
    const index = customers.findIndex(c => c.accountNumber === accountNumber);

    if (index !== -1) {
        customers.splice(index, 1);
        displayMessage("Account deleted successfully!", "success");
    } else {
        displayMessage("Account not found!", "error");
    }
}

function findCustomer(accountNumber) {
    return customers.find(c => c.accountNumber === accountNumber);
}

function displayMessage(message, type) {
    const messageBox = document.getElementById('message');
    messageBox.innerText = message;
    messageBox.className = `message ${type}`;
}
