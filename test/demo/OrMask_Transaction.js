import {jsTPS_Transaction} from "/src/jsTPS.js"
class OrMask_Transaction extends jsTPS_Transaction {
    
    constructor(initNum, initIntNum, initMask) {
        // KEEP THESE FOR LATER
        super()
        this.num = initNum;
        this.intNum = initIntNum;
        this.mask = initMask;
    }

    doTransaction() {
        this.num.orMask(this.mask);
    }

    undoTransaction() {
        this.num.setNum(this.intNum);
    }

    getSummary() {
        return "Or Mask " + this.mask;
    }
}

export default OrMask_Transaction