var assert = chai.assert;
import {jsTPS} from "/src/jsTPS.js"
import Num from "/test/demo/Num.js"
import AddToNum_Transaction from "/test/demo/AddToNum_Transaction.js"
import AndMask_Transaction from "/test/demo/AndMask_Transaction.js"
import OrMask_Transaction from "/test/demo/OrMask_Transaction.js"
// const jsTPS = require("/src/jsTPS")
// const Num = require("/test/demo/Num.js")
let tps
let num 
describe("Test Add", function() {
    it("Num should be 0 when first initiated", function() {
        tps = new jsTPS();
        num = new Num();
        assert.equal(num.getNum(), 0)
    })

    it("After an 'add 5 transaction', num should be 5; transaction stack size should be 1; redo size should be 0; undo size should be 1", function() {
        // ADD 5 TRANSACTION
        tps.addTransaction(new AddToNum_Transaction(num, 5));
        assert.equal(5, num.getNum());
        assert.equal(1, tps.getSize());
        assert.equal(0, tps.getRedoSize());
        assert.equal(1, tps.getUndoSize());
    })
    
    it("After an 'add 10 transaction', num should be 15; transaction stack size should be 2; redo size should be 0; and undo size should be 2", function() {
        // ADD 10 TRANSACTION
        tps.addTransaction(new AddToNum_Transaction(num, 10));
        assert.equal(15, num.getNum());
        assert.equal(2, tps.getSize());
        assert.equal(0, tps.getRedoSize());
        assert.equal(2, tps.getUndoSize());
    })

    it("After an 'add 20 transaction', num should be 35; transaction stack size should be 3; redo size should be 0; and undo size should be 3", function() {
        // ADD 20 TRANSACTION
        tps.addTransaction(new AddToNum_Transaction(num, 20));
        assert.equal(35, num.getNum());
        assert.equal(3, tps.getSize());
        assert.equal(0, tps.getRedoSize());
        assert.equal(3, tps.getUndoSize());
    })
});

describe("Test AndMask", function() {
    it("Num should be 0 when first initiated", function() {
        tps = new jsTPS();
        num = new Num();
        assert.equal(num.getNum(), 0)
    })

    it("12 after an 'AndMask transaction' with 4 should be 4", function() {
        tps.addTransaction(new AddToNum_Transaction(num, 12));
        tps.addTransaction(new AndMask_Transaction(num, num.getNum(), 4));
        assert.equal(4, num.getNum());
        assert.equal(2, tps.getSize());
    })
})

describe("Test OrMask", function() {
    it("Num should be 0 when first initiated", function() {
        tps = new jsTPS();
        num = new Num();
        assert.equal(num.getNum(), 0)
    })

    it("12 after an 'OrMask transaction' with 4 should be 12", function() {
        tps.addTransaction(new AddToNum_Transaction(num, 12));
        tps.addTransaction(new OrMask_Transaction(num, num.getNum(), 4));
        assert.equal(12, num.getNum());
        assert.equal(2, tps.getSize());
    })
})

describe("Test Undoing of Transactions", function() {
    it("Num should be 0 when first initiated", function() {
        tps = new jsTPS();
        num = new Num();
        assert.equal(num.getNum(), 0)
    })

    it("Transaction stack should not have transactionToUndo and transactionToRedo when first initiated", function() {
        assert.isNotTrue(tps.hasTransactionToUndo());
        assert.isNotTrue(tps.hasTransactionToRedo());
    })

    it("After 3 transactions, transaction stack should be 3; redo size should be 0; and undo size should be 3", function() {
        tps.addTransaction(new AddToNum_Transaction(num, 5));
        tps.addTransaction(new AddToNum_Transaction(num, 10));
        tps.addTransaction(new AddToNum_Transaction(num, 20));
        assert.isTrue(tps.hasTransactionToUndo());
        assert.isNotTrue(tps.hasTransactionToRedo());
        assert.equal(35, num.getNum());
        assert.isTrue(tps.hasTransactionToUndo());
        assert.equal(3, tps.getSize());
        assert.equal(0, tps.getRedoSize());
        assert.equal(3, tps.getUndoSize());
    })

    it("Undo one transaction", function(){
        tps.undoTransaction();
        assert.isTrue(tps.hasTransactionToUndo());
        assert.isTrue(tps.hasTransactionToRedo());
        assert.equal(15, num.getNum());
        assert.equal(3, tps.getSize());
        assert.equal(1, tps.getRedoSize());
        assert.equal(2, tps.getUndoSize());
    })

    it("Undo an another transaction", function(){
        tps.undoTransaction();
        assert.isTrue(tps.hasTransactionToUndo());
        assert.isTrue(tps.hasTransactionToRedo());
        assert.equal(5, num.getNum());
        assert.equal(3, tps.getSize());
        assert.equal(2, tps.getRedoSize());
        assert.equal(1, tps.getUndoSize());
    })

    it("Undo one more another transaction", function(){
        tps.undoTransaction();
        assert.isNotTrue(tps.hasTransactionToUndo());
        assert.isTrue(tps.hasTransactionToRedo());
        assert.equal(0, num.getNum());
        assert.equal(3, tps.getSize());
        assert.equal(3, tps.getRedoSize());
        assert.equal(0, tps.getUndoSize());
    })

    it("We have on more to undo so this should do nothing", function(){
        tps.undoTransaction();
        assert.isNotTrue(tps.hasTransactionToUndo());
        assert.isTrue(tps.hasTransactionToRedo());
        assert.equal(0, num.getNum());
        assert.equal(3, tps.getSize());
        assert.equal(3, tps.getRedoSize());
        assert.equal(0, tps.getUndoSize());
    })
})

describe("Test Redoing of Transactions", function() {
    it("Num should be 0 when first initiated", function() {
        tps = new jsTPS();
        num = new Num();
        assert.equal(num.getNum(), 0)
    })

    it("Transaction stack should not have transactionToUndo and transactionToRedo when first initiated", function() {
        assert.isNotTrue(tps.hasTransactionToUndo());
        assert.isNotTrue(tps.hasTransactionToRedo());
    })

    it("After 3 transactions, transaction stack should be 3; redo size should be 0; and undo size should be 3", function() {
        tps.addTransaction(new AddToNum_Transaction(num, 5));
        tps.addTransaction(new AddToNum_Transaction(num, 10));
        tps.addTransaction(new AddToNum_Transaction(num, 20));
        assert.isTrue(tps.hasTransactionToUndo());
        assert.isNotTrue(tps.hasTransactionToRedo());
        assert.equal(35, num.getNum());
        assert.isTrue(tps.hasTransactionToUndo());
        assert.equal(3, tps.getSize());
        assert.equal(0, tps.getRedoSize());
        assert.equal(3, tps.getUndoSize());
    })

    it("Undo a transaction and redo it", function(){
        tps.undoTransaction();
        tps.doTransaction();
        assert.isTrue(tps.hasTransactionToUndo());
        assert.isNotTrue(tps.hasTransactionToRedo());
        assert.equal(35, num.getNum());
        assert.equal(3, tps.getSize());
        assert.equal(0, tps.getRedoSize());
        assert.equal(3, tps.getUndoSize());
    })

    it("Undo two transactions and then redo them", function(){
        tps.undoTransaction();
        tps.undoTransaction();
        tps.doTransaction();
        tps.doTransaction();
        assert.isTrue(tps.hasTransactionToUndo());
        assert.isNotTrue(tps.hasTransactionToRedo());
        assert.equal(35, num.getNum());
        assert.equal(3, tps.getSize());
        assert.equal(0, tps.getRedoSize());
        assert.equal(3, tps.getUndoSize());
    })

    it("Undo all three transactions and redo them", function(){
        tps.undoTransaction();
        tps.undoTransaction();
        tps.undoTransaction();
        tps.doTransaction();
        tps.doTransaction();
        tps.doTransaction();
        assert.isTrue(tps.hasTransactionToUndo());
        assert.isNotTrue(tps.hasTransactionToRedo());
        assert.equal(35, num.getNum());
        assert.equal(3, tps.getSize());
        assert.equal(0, tps.getRedoSize());
        assert.equal(3, tps.getUndoSize());
    })

    it("Undo all three transactions and redo two", function(){
        tps.undoTransaction();
        tps.undoTransaction();
        tps.undoTransaction();
        tps.doTransaction();
        tps.doTransaction();
        assert.isTrue(tps.hasTransactionToUndo());
        assert.isTrue(tps.hasTransactionToRedo());
        assert.equal(15, num.getNum());
        assert.equal(3, tps.getSize());
        assert.equal(1, tps.getRedoSize());
        assert.equal(2, tps.getUndoSize());
    })

    it("Undo all three transactions and redo four, which should not produce an error but the last redo should do nothing", function(){
        tps.undoTransaction();
        tps.undoTransaction();
        tps.undoTransaction();
        tps.doTransaction();
        tps.doTransaction();
        tps.doTransaction();
        tps.doTransaction();
        assert.isTrue(tps.hasTransactionToUndo());
        assert.isNotTrue(tps.hasTransactionToRedo());
        assert.equal(35, num.getNum());
        assert.equal(3, tps.getSize());
        assert.equal(0, tps.getRedoSize());
        assert.equal(3, tps.getUndoSize());
    })

})

    describe("Test Clearing of Transactions", function() {
        it("Num should be 0 when first initiated", function() {
            tps = new jsTPS();
            num = new Num();
            assert.equal(num.getNum(), 0)
        })
    
        it("After 3 transactions, transaction stack should be 3; redo size should be 0; and undo size should be 3", function() {
            tps.addTransaction(new AddToNum_Transaction(num, 5));
            tps.addTransaction(new AddToNum_Transaction(num, 10));
            tps.addTransaction(new AddToNum_Transaction(num, 20));
            assert.isTrue(tps.hasTransactionToUndo());
            assert.isNotTrue(tps.hasTransactionToRedo());
            assert.equal(35, num.getNum());
            assert.isTrue(tps.hasTransactionToUndo());
            assert.equal(3, tps.getSize());
            assert.equal(0, tps.getRedoSize());
            assert.equal(3, tps.getUndoSize());
        })

        it("Clear all transactions", function() {
            tps.clearAllTransactions();
            assert.equal(35, num.getNum());
            assert.equal(0, tps.getSize());
            assert.equal(0, tps.getRedoSize());
            assert.equal(0, tps.getUndoSize());
        })

        it("After 3 transactions again", function() {
            tps.addTransaction(new AddToNum_Transaction(num, 5));
            tps.addTransaction(new AddToNum_Transaction(num, 10));
            tps.addTransaction(new AddToNum_Transaction(num, 20));
            assert.isTrue(tps.hasTransactionToUndo());
            assert.isNotTrue(tps.hasTransactionToRedo());
            assert.equal(70, num.getNum());
            assert.isTrue(tps.hasTransactionToUndo());
            assert.equal(3, tps.getSize());
            assert.equal(0, tps.getRedoSize());
            assert.equal(3, tps.getUndoSize());
        })

        it("Clear all transactions out agian", function() {
            tps.clearAllTransactions();
            assert.equal(70, num.getNum());
            assert.equal(0, tps.getSize());
            assert.equal(0, tps.getRedoSize());
            assert.equal(0, tps.getUndoSize());
        })

        it("After 3 transactions again", function() {
            tps.addTransaction(new AddToNum_Transaction(num, 5));
            tps.addTransaction(new AddToNum_Transaction(num, 10));
            tps.addTransaction(new AddToNum_Transaction(num, 20));
            assert.isTrue(tps.hasTransactionToUndo());
            assert.isNotTrue(tps.hasTransactionToRedo());
            assert.equal(105, num.getNum());
            assert.isTrue(tps.hasTransactionToUndo());
            assert.equal(3, tps.getSize());
            assert.equal(0, tps.getRedoSize());
            assert.equal(3, tps.getUndoSize());
        })
    })