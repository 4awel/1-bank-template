loadAccounts();
async function loadAccounts() {
    const response = await axios.get('/accounts');
    const accounts = response.data;
    console.log(response);
    renderAccounts(accounts)
}

function renderAccounts(accounts) {
    let accountsNode = document.querySelector('#accounts');
    accountsNode.innerHTML = '';
    for (let i = 0; i < accounts.length; i++) {
        const account = accounts[i];
        accountsNode.innerHTML += `
        <button type="button" class="list-group-item list-group-item-action button-accounts">
            <span>${account.owner}</span>
            <span>${account.creditcard}</span>
        </button>
        `;
    }
    const nodes = document.querySelectorAll('.button-accounts');
    for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const account = accounts[i];
        node.addEventListener('click', function () {
            renderBalance(account)
            loadTransactions(account)
            loudIncomes(account)
            loudExpences(account)
        });
    }
}
function renderBalance(account) {
    let balanceNode = document.querySelector('#balance');
    balanceNode.innerHTML = `${account.balance} руб`;
}

async function loadTransactions(account) {
    const response = await axios.get('/transactions/all', {
        params: {
            account: account._id
        }
    });
    const transactions = response.data;
    console.log(response);
    renderTransactions(transactions)
}

function renderTransactions(transactions) {
    let transactionNode = document.querySelector('#transactions');
    transactionNode.innerHTML = '';
    for (let i = 0; i < transactions.length; i++) {
        let className = '';
        const transaction = transactions[i];
        if (transaction.value < 0) {
            className = 'minustr';
        } else {
            className = 'plustr';
        }
        transactionNode.innerHTML += `
        <button type="button" class="list-group-item ${className}">
            <span>${transaction.value}</span>
            <span>${transaction.category}</span>
        </button>
        `;
    }
}

async function loudIncomes(account) {
    const response = await axios.get('/transactions/income', {
        params: {
            account: account._id
        }
    });
    const incomes = response.data;
    console.log(response) 
    renderIncomes(incomes) 
}

function renderIncomes(incomes) {
    const buttonIncomes = document.querySelector('.bt-1');
    buttonIncomes.addEventListener('click', function() {
        let transactionNode = document.querySelector('#transactions');
        transactionNode.innerHTML = '';
        for (let i = 0; i < incomes.length; i++) {
            let income = incomes[i];
            
            if (income.value > 0) {
                transactionNode.innerHTML += `
            <button type="button" class="list-group-item plustr">
                <span>${income.value}</span>
                <span>${income.category}</span>
            </button>
            `;
            }
        }
    });
}

async function loudExpences(account) {
    const response = await axios.get('/transactions/expences', {
        params: {
            account: account._id
        }
    });
    const expences = response.data;
    console.log(response) 
    renderExpences(expences)
}

function renderExpences(expences) {
    const buttonExpences = document.querySelector('.bt-2');
    buttonExpences.addEventListener('click', function() {
        let transactionNode = document.querySelector('#transactions');
        transactionNode.innerHTML = '';
        for (let i = 0; i < expences.length; i++) {
            let expence = expences[i];
            
            if (expence.value < 0) {
                transactionNode.innerHTML += `
            <button type="button" class="list-group-item minustr">
                <span>${expence.value}</span>
                <span>${expence.category}</span>
            </button>
            `;
            }
        }
    });
}