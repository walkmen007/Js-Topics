// 👉 Question 3: Bank Account with Closures

// Implement a BankAccount factory function that:

// Takes an initial balance.

// Provides methods:

// deposit(amount) → increases balance.

// withdraw(amount) → decreases balance (but not below 0).

// getBalance() → returns current balance.

// The balance should not be directly accessible from outside.

// Example usage:



function BankAccount(balance){
    var bankOperation = {
        deposit: (amt)=>{balance += amt; return amt},
        withdraw:(amt)=>{
            if(amt > balance){
                throw new Error("Insufficient funds");
            }else{
                balance -= amt;
                return balance;
            }
           },
        getBalance:()=>{return balance}
    }

    return bankOperation;
}


var userAccount = BankAccount(1000);

console.log("Amt Deposit: ", userAccount.deposit(1000))
console.log("Amt Deposit:", userAccount.deposit(1000))
console.log("Amt Withdraw:", userAccount.withdraw(200))
console.log("Amt Withdraw:", userAccount.withdraw(450));
console.log("Amt Withdraw:", userAccount.withdraw(4500))
console.log("Balance", userAccount.getBalance())