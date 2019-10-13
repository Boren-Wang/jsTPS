import jsTPS_Transaction from "/src/jsTPS"
class AddToNum_Transaction extends jsTPS_Transaction {
    constructor(initNum, initAmountToAdd) {
        this.num=initNum
        this.amoutToAdd=initAmountToAdd
    }

    /**
     * This transaction simply adds the value to the num.
     */
    doTransaction() {
        let oldNum = this.num.getNum();
        let newNum = oldNum + this.amountToAdd;
        this.num.setNum(newNum);
    }

    /**
     * As the reverse of do, this method substracts from num.
     */
    undoTransaction() {
        let oldNum = this.num.getNum();
        let newNum = oldNum - this.amountToAdd;
        this.num.setNum(newNum);
    }

    /**
     * Provides a textual summary of this transaction.
     * 
     * @return A string storing a textual summary of this object.
     */
    getSummary() {
        return "Add " + amountToAdd;
    }
}