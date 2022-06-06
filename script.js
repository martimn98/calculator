let displayContent = "";

const numbers = document.querySelectorAll(".button.number");
const display = document.querySelector(".screen");
const clearButton = document.querySelector(".button.clear");
const equalButton = document.querySelector(".button.equal");
const operators = document.querySelectorAll(".button.operator");
let currentOperator = "";
let currentOperatorElement;
let firstNumber;
let secondNumber;

let displayingOperator = false;

const maxDigits = 7;
let currentDigits = 0;

numbers.forEach(element => {
    element.addEventListener('click', numberClick);
});

operators.forEach(element => {
    element.addEventListener('click', operatorClick)
})

clearButton.addEventListener('click', clearDisplay);
equalButton.addEventListener('click', function () {
    operate(currentOperator, firstNumber, parseInt(displayContent));
});

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

function operate(operator, a, b)
{
    let result;
    console.log(operator, a, b);

    if(operator === '+')
        result = add(a, b);

    if(operator === '-')
        result = subtract(a, b);
        
    if(operator === 'X')
        result = multiply(a, b);

    if(operator === '/')
        result = divide(a, b);

    displayContent = result;
    display.textContent = displayContent;

    clearOperator();

    firstNumber = result;

}
function numberClick(e)
{
    if(currentDigits >= maxDigits) return;

    if(displayingOperator)
    {
        displayContent = e.currentTarget.textContent;
        display.textContent = displayContent;
        currentDigits++;
        return;
    }

    displayContent += e.currentTarget.textContent;
    currentDigits++;

    display.textContent = displayContent;
}

function operatorClick(e)
{
    if(displayContent === "") return;

    if(currentOperator != ""){
        operate(currentOperator, firstNumber, parseInt(displayContent));
        return;
    }

    firstNumber = parseInt(displayContent);

    e.currentTarget.classList.add("selected");
    currentOperatorElement = e.currentTarget;
    displayingOperator = true;

    currentDigits = 0;
    currentOperator = e.currentTarget.textContent;
}

function clearOperator()
{
    if(currentOperatorElement != undefined)
        currentOperatorElement.classList.remove("selected");
}

function clearDisplay()
{
    displayContent = "";
    display.textContent = displayContent;
    currentDigits = 0;
    displayingOperator = false;
}