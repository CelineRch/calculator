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
            updateDisplay("");
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
            updateDisplay(operate(a, b, operator));
            break;
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
        a += val.textContent;
        updateDisplay(a);
    } else {
        b += val.textContent;
        updateDisplay(b);
    }
}

function selectOperator(choice) {
    if (!isFirstTerm && b != "") {
        let result = operate(a, b, operator);
        a = result;
    }
    operator = choice.textContent;
    isFirstTerm = false;
    updateDisplay(a+operator);
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
        case "X":
            result = multiply(a, b);
            break;
        case "/":
            result = divide(a, b);
            break;
        case "%":
            result = divide(a, 100);
            break;
    }
    reset();
    return result;
}

function add(a, b) {
    return Number(a) + Number(b);
}

function substract(a, b) {
    return Number(a) - Number(b);
}

function multiply(a, b) {
    return Number(a) * Number(b);
}

function divide(a, b) {
    return Number(a) / Number(b);
}

