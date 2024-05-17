/**
 * @file This is the support JS written for CMPT276 asn1
 * @copyright ShiYu Feng 2024
 */

const table = document.getElementsByTagName("table")[0]
let rows = 2

// Function to add a data table row
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
    // Calculate percent via index math since numbers is a collection of inputs
    // 0 is weight, 1 is numerator and 2 is denominator
    // following the logic 3+0 is the second weight, 3+1 is the second....
    // so 3*index+1 gets the numerator of the index's row
    ans.innerText = numbers[3*(index-1)+1].value/numbers[3*(index-1)+2].value
}

function calculateMean() {
    let sum = 0
    // Sum the percentages
    for (let i=1; i<=rows; i++) {
        calculatePercentage(i)
        sum += Number(document.getElementById("A"+i+"-percent").innerText)
    }
    // Sum divide by amount of rows
    let ans = sum / rows
    document.getElementById("result").innerText = ans+" ("+ ans*100 +"/100)"
}

function calculateWeighted() {
    let sum = 0
    let weights = 0
    // sum the weights and weight*percent
    for (let i=1; i<=rows; i++) {
        calculatePercentage(i)
        weights += Number(numbers[3*(i-1)].value)
        sum += numbers[3*(i-1)].value * Number(document.getElementById("A"+i+"-percent").innerText)
    }
    // sum divided by weights
    let ans = sum / weights
    document.getElementById("result").innerText = ans+" ("+ ans*100 +"/100)"
}

// Add pre-defined rows
for (let i=1; i<rows; i++) {
    addFormattedRow(i+1)
}


// Event Listeners
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

