import jsTPS_Transaction from "/src/jsTPS"
class AndMask_Transaction extends jTPS_Transaction {
    
    constructor(initNum, initIntNum, initMask) {
        // KEEP THESE FOR LATER
        this.num = initNum;
        this.intNum = initIntNum;
        this.mask = initMask;
    }

    /**
     * This transaction simply adds the value to the num.
     */
    doTransaction() {
        this.num.andMask(mask);
    }

    /**
     * As the reverse of do, this method substracts from num.
     */
    undoTransaction() {
        this.num.setNum(intNum);
    }

    /**
     * Provides a textual summary of this transaction.
     * 
     * @return A string storing a textual summary of this object.
     */
    getSummary() {
        return "And Mask " + this.mask;
    }
}