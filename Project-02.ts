import inquirer from 'inquirer';

type Account = {
    balance: number;
};

const account: Account = {
    balance: 1000, // Initial balance
};

async function showMainMenu() {
    const answer = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'Welcome to the ATM. Please choose an action:',
            choices: ['Check Balance', 'Deposit Money', 'Withdraw Money', 'Exit'],
        },
    ]);

    switch (answer.action) {
        case 'Check Balance':
            checkBalance();
            break;
        case 'Deposit Money':
            depositMoney();
            break;
        case 'Withdraw Money':
            withdrawMoney();
            break;
        case 'Exit':
            exitATM();
            break;
    }
}

function checkBalance() {
    console.log(`Your current balance is $${account.balance}`);
    returnToMainMenu();
}

async function depositMoney() {
    const answer = await inquirer.prompt([
        {
            type: 'number',
            name: 'amount',
            message: 'Enter the amount to deposit:',
            validate: (input: number) => {
                return input > 0 ? true : 'Please enter a valid amount.';
            },
        },
    ]);

    account.balance += answer.amount;
    console.log(`$${answer.amount} deposited successfully! Your new balance is $${account.balance}`);
    returnToMainMenu();
}

async function withdrawMoney() {
    const answer = await inquirer.prompt([
        {
            type: 'number',
            name: 'amount',
            message: 'Enter the amount to withdraw:',
            validate: (input: number) => {
                if (input <= 0) {
                    return 'Please enter a valid amount.';
                } else if (input > account.balance) {
                    return 'Insufficient balance.';
                }
                return true;
            },
        },
    ]);

    account.balance -= answer.amount;
    console.log(`$${answer.amount} withdrawn successfully! Your new balance is $${account.balance}`);
    returnToMainMenu();
}

function exitATM() {
    console.log('Thank you for using the ATM. Goodbye!');
    process.exit(); // Exit the application
}

function returnToMainMenu() {
    inquirer.prompt([
        {
            type: 'confirm',
            name: 'continue',
            message: 'Do you want to perform another action?',
        },
    ]).then(answer => {
        if (answer.continue) {
            showMainMenu();
        } else {
            exitATM();
        }
    });
}

showMainMenu();