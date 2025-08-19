const container = document.querySelector(".container");
const btnDiv = document.querySelector(".buttons");
const displayArea = document.querySelector(".display-area");

let a = "";
let b = "";
let operator = "";
let isFirstTerm = true;

init();

function init() {
    btnDiv.addEventListener("click", (event) => {
        let btn = event.target.closest("button");
        if (btn) {
            buttonClicked(btn);
        }
    })
}

function buttonClicked(btn) {
    let type = btn.className;
    switch (type) {
        case "reset-button":
            reset();
            break;
        case "delete-button":
            deleteNumber();
            break;
        case "numeric-button":
            addNumber(btn);
            break;
        case "operator-button":
            selectOperator(btn);
            break;
        case "equal-button":
            operate(a, b, operator);
        default:
            break;
    }
}

function updateDisplay(content) {
    if (!content) content = "0";
    while (content[0] == 0 && content.length > 1) content = content.slice(1);
    displayArea.textContent = content;
}

function reset() {
    a = "";
    b = "";
    operator = "";
    updateDisplay("");
    isFirstTerm = true;
}

function deleteNumber() {
    if (isFirstTerm) {
        a = a.slice(0, -1);
        updateDisplay(a);
    } else {
        b = b.slice(0, -1);
        updateDisplay(b);
    }
}

function addNumber(val) {
    if (isFirstTerm) {
        console.log(a);
        a += val.textContent;
        console.log(a);
        updateDisplay(a);
    } else {
        b += val.textContent;
        updateDisplay(b);
    }
}

function selectOperator(choice) {
    operator = choice.textContent;
    isFirstTerm = false;
    updateDisplay(a+operator)
}

function operate(a, b, operator) {
    let result;
    switch (operator) {
        case "+":
            result = add(a, b);
            break;
        case "-":
            result = substract(a, b);
            break;
        case "x":
            result = multiply(a, b);
            break;
        case "/":
            result = divide(a, b);
            break;
        case "%":
            result = divide(a, 100);
            break;
    }
    displayArea.textContent = result;
}

function add(a, b) {
    return a + b;
}

function substract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

