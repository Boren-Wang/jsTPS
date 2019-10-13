import {jsTPS_Transaction} from "/src/jsTPS.js"
class AndMask_Transaction extends jsTPS_Transaction {
    
    constructor(initNum, initIntNum, initMask) {
        // KEEP THESE FOR LATER
        super()
        this.num = initNum;
        this.intNum = initIntNum;
        this.mask = initMask;
    }

    /**
     * This transaction simply adds the value to the num.
     */
    doTransaction() {
        this.num.andMask(this.mask);
    }

    /**
     * As the reverse of do, this method substracts from num.
     */
    undoTransaction() {
        this.num.setNum(this.intNum);
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

export default AndMask_Transaction