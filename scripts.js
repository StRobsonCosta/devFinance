const Modal = {
    open(){
        document
            .querySelector('.modal-overlay')
            .classList
            .add('active')    
    },
    close(){
        document
            .querySelector('.modal-overlay')
            .classList
            .remove('active')        
    }
}

// const transactions = [
//     {
//         id:1,
//         description: 'luz',
//         amount: -50000,
//         date: '23/01/2021',
//     },
//     {
//         id:2,
//         description: 'website',
//         amount: 5000000,
//         date: '23/01/2021',
//     },
//     {
//         id:3,
//         description: 'internet',
//         amount: -20000,
//         date: '23/01/2021',
//     },
// ]

const Transaction = {
   // all:transactions,
    all: [
        {
            id:1,
            description: 'luz',
            amount: -50000,
            date: '23/01/2021',
        },
        {
            id:2,
            description: 'website',
            amount: 5000000,
            date: '23/01/2021',
        },
        {
            id:3,
            description: 'internet',
            amount: -20000,
            date: '23/01/2021',
        },
    ],
    add(transaction){
        Transaction.all.push(transaction)
    },

    remove(index) {
        Transaction.all.splice(index, 1)

        App.reload()
    },

    incomes(){
       let income = 0;
       //pegar td transação
       //p cada transação,
       Transaction.all.forEach(transaction => {
           //se for maior q 0
           if(transaction.amount > 0 ) {
               //somar a uma variavel e retornar variavel
               income += transaction.amount;
           }
       }) 
       return income;

    },
    expenses(){
        let expense = 0;
       Transaction.all.forEach(transaction => {
           if(transaction.amount < 0 ) {
               expense += transaction.amount;
           }
       }) 
       return expense;

    },
    total(){
        return Transaction.incomes() + Transaction.expenses();
    }
}

const DOM = {
    transactionContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction,index){
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction)
        DOM.transactionContainer.appendChild(tr)
    },

    innerHTMLTransaction(Transaction) {
        const CSSclass = transaction.amount > 0 ? "income" : "expense"

        const amount = Utils.formatCurrency(transaction.amount)

        const html = `        
            <td class="description">${transaction.description}</td>
            <td class="${CSSclass}">${transaction.amount}</td>
            <td class="date">${transaction.date}</td>
            <td>
                <img src="./assets/minus.svg" alt="Remover Transação">
            </td>        
        `
        return html
    },

    updateBalance() {
        document
            .getElementById('incomeDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.incomes()) 
        document
            .getElementById('expenseDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.expenses())
        document
            .getElementById('totalDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.total())
    },

    clearTransactions() {
        DOM.transactionContainer.innerHTML = ""
    }
}

const Utils = {
    formatCurrency(value) {
        const signal = Number(valeu) < 0 ? "-" : ""
        value = String(value).replace(/\D/g, "")
        value = Number(value) / 100
        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })
        return signal + value
    }
}

const App = {
    init() {
        transactions.forEach(function(transaction){
            DOM.addTransaction(transactions)
        })
        DOM.updateBalance()
    },
    reload() {
        DOM.clearTransactions()
        App.init()
    }
}

App.init()
