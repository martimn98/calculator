const numbers = document.querySelectorAll(".button.number");
const display = document.querySelector(".screen");

const clearButton = document.querySelector(".button.clear");
const equalButton = document.querySelector(".button.equal");
const signButton = document.querySelector(".button.sign");
const percentButton = document.querySelector(".button.percent");
const dotButton = document.querySelector(".button.dot");

const operators = document.querySelectorAll(".button.operator");

let currentOperator = "";
let currentOperatorElement;
let firstNumber;
let currentNumber = "";

let firstInput = false;

const maxDigits = 7;

numbers.forEach(element => {
    element.addEventListener('click', numberClick);
});

operators.forEach(element => {
    element.addEventListener('click', operatorClick)
})

clearButton.addEventListener('click', clearDisplay);

equalButton.addEventListener('click', function (e) {
    operate(e, currentOperator, firstNumber, parseFloat(currentNumber));
});

signButton.addEventListener('click', signButtonClick);

percentButton.addEventListener('click', percentButtonClick);

dotButton.addEventListener('click', dotButtonClick);

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if(b == 0){
        dividingByZero();
        return;
    }    
    return a / b;
}

function operate(e, operator, a, b)
{
    let result;
    console.log(operator, a, b);

    if(operator === '+')
        result = add(a, b);

    if(operator === '−')
        result = subtract(a, b);
        
    if(operator === 'X')
        result = multiply(a, b);

    if(operator === '/')
        result = divide(a, b);

    currentNumber = result;
    updateDisplay(currentNumber);

    if(e.currentTarget.textContent === "=")
        clearOperator();

    firstNumber = result;
    firstInput = true;

}
function numberClick(e)
{
    if(firstInput)
    {
        currentNumber = e.currentTarget.textContent;
        updateDisplay(currentNumber);
        firstInput = false;
        return;
    }

    currentNumber += e.currentTarget.textContent;

    updateDisplay(currentNumber);
}

function operatorClick(e)
{
    if(currentNumber === "") return;
    
    // If clicking on a different operator
    if(currentOperator != e.currentTarget.textContent)
    {
        if(firstNumber != undefined && currentOperator != ""){
            console.log("first number:" + firstNumber + "\ncurrent number:" + currentNumber);
            operate(e, currentOperator, firstNumber, parseFloat(currentNumber));
        }

        clearOperator();

        firstNumber = parseFloat(currentNumber);

        e.currentTarget.classList.add("selected");
        currentOperatorElement = e.currentTarget;
        firstInput = true;

        currentOperator = e.currentTarget.textContent;
    }
    else if(currentOperator != ""){
        operate(e, currentOperator, firstNumber, parseFloat(currentNumber));
        return;
    }

    firstNumber = parseFloat(currentNumber);

    e.currentTarget.classList.add("selected");
    currentOperatorElement = e.currentTarget;
    firstInput = true;

    currentOperator = e.currentTarget.textContent;
}

function clearOperator()
{
    currentOperator = "";

    operators.forEach( (element) => {
        element.classList.remove("selected");
    });
}

function clearDisplay()
{
    currentNumber = "";
    updateDisplay(currentNumber);
    firstInput = false;
    
    clearOperator();
}

function signButtonClick()
{ 
    if(currentNumber === "" || currentNumber === undefined || currentNumber === 0) return;

    currentNumber *= -1;

    updateDisplay(currentNumber);
}

function percentButtonClick()
{
    currentNumber *= 0.01;

    updateDisplay(currentNumber);

}

function updateDisplay(number)
{
    const numStr = number.toString();
    const digits = numStr.length;
    const parts = numStr.split(".");
    let numToDisplay;
    
    if(digits > maxDigits)
    {
        if(parts[0].length >= maxDigits)
        { 
            numToDisplay = Math.round(parseFloat(number) / (Math.pow(10, parts[0].length - maxDigits + 3)));

            numToDisplay = numToDisplay.toString() + "E" + (parts[0].length - maxDigits + 3).toString();
        }
        else if(parts[0].length + parts[1].length >= maxDigits)
        {
            numToDisplay = Math.round(parseFloat(number) * Math.pow(10, maxDigits - parts[0].length)) / Math.pow(10, maxDigits - parts[0].length);
        }

        display.textContent = numToDisplay;
    }
    else
    {
        display.textContent = currentNumber;
    }
}

function dotButtonClick()
{
    if(currentNumber.indexOf(".") === -1)
    {
        currentNumber += ".";
        updateDisplay(currentNumber);
    }
}

function dividingByZero()
{
    clearDisplay();
    firstInput = true;

    display.textContent = "nope";
}