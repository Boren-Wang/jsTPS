// console.log("connected!")
import {jsTPS} from "/src/jsTPS.js"
import Num from "/test/demo/Num.js"
import AddToNum_Transaction from "/test/demo/AddToNum_Transaction.js"

let tps = new jsTPS()
let num = new Num()

let loadNum = function() {
    document.getElementById("num").innerHTML='Num:<br>'+num.getNum()
}
let loadSummary = function() {
    let summary = tps.getSummary()
    document.getElementById("summary").innerHTML="Transaction Stack Summary:<br>"+summary
}   

document.getElementById("add").addEventListener("click", function(){
    let amountToAdd = Number(document.getElementById("amount").value)
    tps.addTransaction(new AddToNum_Transaction(num, amountToAdd))
    loadNum()
    loadSummary()
})

document.getElementById("undo").addEventListener("click", function(){
    tps.undoTransaction()
    loadNum()
    loadSummary()
})

document.getElementById("redo").addEventListener("click", function(){
    tps.doTransaction()
    loadNum()
    loadSummary()
})

document.getElementById("clear").addEventListener("click", function(){
    tps.clearAllTransactions()
    loadNum()
    loadSummary()
})

document.getElementById("reset").addEventListener("click", function(){
    tps.clearAllTransactions()
    num.setNum(0)
    loadNum()
    loadSummary()
})