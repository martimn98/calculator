const numbers = document.querySelectorAll(".button.number");
const display = document.querySelector(".screen");
const clearButton = document.querySelector(".button.clear");
const equalButton = document.querySelector(".button.equal");
const signButton = document.querySelector(".button.sign");
const operators = document.querySelectorAll(".button.operator");

let currentOperator = "";
let currentOperatorElement;
let firstNumber;
let currentNumber = "";

let firstInput = false;

const maxDigits = 7;
let currentDigits = 0;

numbers.forEach(element => {
    element.addEventListener('click', numberClick);
});

operators.forEach(element => {
    element.addEventListener('click', operatorClick)
})

clearButton.addEventListener('click', clearDisplay);

equalButton.addEventListener('click', function (e) {
    operate(e, currentOperator, firstNumber, parseInt(currentNumber));
});

signButton.addEventListener('click', signButtonClick);

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
    if(b == 0) return;
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
    display.textContent = currentNumber;

    if(e.currentTarget.textContent === "=")
        clearOperator();

    firstNumber = result;
    firstInput = true;

}
function numberClick(e)
{
    if(currentDigits >= maxDigits) return;

    if(firstInput)
    {
        currentNumber = e.currentTarget.textContent;
        display.textContent = currentNumber;
        currentDigits++;
        firstInput = false;
        return;
    }

    currentNumber += e.currentTarget.textContent;
    currentDigits++;

    display.textContent = currentNumber;
}

function operatorClick(e)
{
    if(currentNumber === "") return;
    
    // If clicking on a different operator
    if(currentOperator != e.currentTarget.textContent)
    {
        if(firstNumber != undefined && currentOperator != ""){
            console.log("first number:" + firstNumber + "\ncurrent number:" + currentNumber);
            operate(e, currentOperator, firstNumber, parseInt(currentNumber));
        }

        clearOperator();

        firstNumber = parseInt(currentNumber);

        e.currentTarget.classList.add("selected");
        currentOperatorElement = e.currentTarget;
        firstInput = true;

        currentDigits = 0;
        currentOperator = e.currentTarget.textContent;
    }
    else if(currentOperator != ""){
        operate(e, currentOperator, firstNumber, parseInt(currentNumber));
        return;
    }

    firstNumber = parseInt(currentNumber);

    e.currentTarget.classList.add("selected");
    currentOperatorElement = e.currentTarget;
    firstInput = true;

    currentDigits = 0;
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
    display.textContent = currentNumber;
    currentDigits = 0;
    firstInput = false;
    
    clearOperator();
}

function signButtonClick()
{
    
    if(currentNumber === "" || currentNumber === undefined || currentNumber === 0) return;

    currentNumber *= -1;

    display.textContent = currentNumber;
}