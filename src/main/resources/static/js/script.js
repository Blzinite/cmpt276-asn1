/**
 * @file This is the support JS written for CMPT276 asn1
 * @copyright ShiYu Feng 2024
 */

const table = document.getElementsByTagName("table")[0]
let rows = 2

function addFormattedRow(index) {
    let row = table.insertRow();
    let cell = row.insertCell()
    cell.innerHTML = "Activity " + index
    cell = row.insertCell()
    cell.innerHTML = "A" + index
    cell = row.insertCell()
    cell.innerHTML = "<input type=\"number\">"
    cell = row.insertCell()
    let callFunc = '<input type="number" onchange="calculatePercentage('+index+');">'
    cell.innerHTML = callFunc +' / '+ callFunc
    cell = row.insertCell()
    cell.setAttribute("id", "A"+index+"-percent")
}
function calculatePercentage(index) {
    let ans = document.getElementById("A"+index+"-percent")
    ans.innerText = numbers[3*(index-1)+1].value/numbers[3*(index-1)+2].value
}

function calculateMean() {
    let sum = 0
    for (let i=1; i<=rows; i++) {
        calculatePercentage(i)
        sum += Number(document.getElementById("A"+i+"-percent").innerText)
    }
    let ans = sum / rows
    document.getElementById("result").innerText = ans+" ("+ ans*100 +"/100)"
}

function calculateWeighted() {
    let sum = 0
    let weights = 0
    for (let i=1; i<=rows; i++) {
        calculatePercentage(i)
        weights += Number(numbers[3*(i-1)].value)
        sum += numbers[3*(i-1)].value * Number(document.getElementById("A"+i+"-percent").innerText)
    }
    let ans = sum / weights
    document.getElementById("result").innerText = ans+" ("+ ans*100 +"/100)"
}

for (let i=1; i<rows; i++) {
    addFormattedRow(i+1)
}

let addRow = document.querySelector('input[value="ADD ROW"]')
addRow.addEventListener('click', function (evt){
    evt.preventDefault()
    addFormattedRow(++rows)
})

let numbers = document.getElementsByTagName("input")

let meanButton = document.querySelector('input[value="MEAN"]')
meanButton.addEventListener('click', function (evt){
    evt.preventDefault()
    calculateMean()
})

let weightedButton = document.querySelector('input[value="WEIGHTED"]')
weightedButton.addEventListener('click', function (evt){
    evt.preventDefault()
    calculateWeighted()
})

