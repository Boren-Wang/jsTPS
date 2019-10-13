import {jsTPS_Transaction} from "/src/jsTPS.js"
class AddToNum_Transaction extends jsTPS_Transaction {
    constructor(initNum, initAmountToAdd) {
        super()
        this.num=initNum
        this.amountToAdd=initAmountToAdd
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

export default AddToNum_Transaction