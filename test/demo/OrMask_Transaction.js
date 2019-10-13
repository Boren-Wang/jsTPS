import jsTPS_Transaction from "/src/jsTPS"
class OrMask_Transaction extends jTPS_Transaction {
    
    constructor(initNum, initIntNum, initMask) {
        // KEEP THESE FOR LATER
        this.num = initNum;
        this.intNum = initIntNum;
        this.mask = initMask;
    }

    doTransaction() {
        this.num.orMask(mask);
    }

    undoTransaction() {
        this.num.setNum(intNum);
    }

    getSummary() {
        return "Or Mask " + this.mask;
    }
}