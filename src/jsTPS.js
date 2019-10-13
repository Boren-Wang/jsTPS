class jsTPS {
    constructor() {
        this.transactions = []
        this.mostRecentTransaction = -1
        this.performingDo = false
        this.performingUndo = false
    }

    isPerformingDo = function() {
        return this.performingDo
    }

    isPerformingUnDo = function() {
        return this.performingUndo
    }

    addTransaction = function(transaction) {
        // ARE THERE OLD UNDONE TRANSACTIONS ON THE STACK THAT FIRST
        // NEED TO BE CLEARED OUT, i.e. ARE WE BRANCHING?
        if ((mostRecentTransaction < 0)|| (mostRecentTransaction < (transactions.length-1))) {
            for (let i = transactions.length-1; i > mostRecentTransaction; i--) {
                transactions.splice(i, 1);
            }
        }

        // AND NOW ADD THE TRANSACTION
        transactions.push(transaction);

        // AND EXECUTE IT
        doTransaction();        
    }

    doTransaction = function() {
        if (hasTransactionToRedo()) {
            performingDo = true;
            transaction = transactions[mostRecentTransaction+1];
            transaction.doTransaction();
            mostRecentTransaction++;
            performingDo = false;
        }
    }

    peekUndo = function() {
        if (this.hasTransactionToUndo()) {
            return transactions[mostRecentTransaction];
        }
        else
            return null;
    }

    peekDo = function() {
        if (this.hasTransactionToRedo()) {
            return transactions[mostRecentTransaction+1];
        }
        else
            return null;
    }

    undoTransaction = function() {
        if (this.hasTransactionToUndo()) {
            performingUndo = true;
            transaction = transactions[mostRecentTransaction];
            transaction.undoTransaction();
            this.mostRecentTransaction--;
            performingUndo = false;
        }
    }

    clearAllTransactions = function() {
        // REMOVE ALL THE TRANSACTIONS
        this.transactions = [];
        
        // MAKE SURE TO RESET THE LOCATION OF THE
        // TOP OF THE TPS STACK TOO
        this.mostRecentTransaction = -1;        
    }

    getSize() {
        return this.transactions.length;
    }

    getRedoSize() {
        return this.getSize() - this.mostRecentTransaction - 1;
    }

    getUndoSize() {
        return this.mostRecentTransaction + 1;
    }

    hasTransactionToUndo() {
        return this.mostRecentTransaction >= 0;
    }

    hasTransactionToRedo() {
        return this.mostRecentTransaction < (this.transactions.length-1);
    }

    getSummary() {
        const summary = ('--Number of Transactions: '+this.transactions.length+"\n"+
        "--Current Index on Stack:" + this.mostRecentTransaction+"\n"+
        "--Current Transaction Stack:\n")
        for(let i=0; i<=this.mostRecentTransaction; i++){
            transaction = this.transactions[i]
            summary+="----"+transaction.getSummary()+"\n"
        }
        return summary
    }
} 

class jsTPS_Transaction {
    doTransaction() {

    }

    undoTransaction() {

    }
}