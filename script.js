const container = document.querySelector(".container");
const btnDiv = document.querySelector(".buttons");
const displayArea = document.querySelector(".display-area");
let activeOperator;

let a = "0";
let b = "";
let operator = "";
let isFirstTerm = true;
let isResult = false;

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
            manageOperation();
        case "komma-button":
            addKomma(btn);
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
    a = "0";
    b = "";
    operator = "";
    isFirstTerm = true;
}

function addNumber(val) {
    if (isFirstTerm) {
        if (isResult) {
            a = val.textContent;
            isResult = false;
        } else {
            a += val.textContent;
        }
        updateDisplay(a);
    } else {
        b += val.textContent;
        updateDisplay(b);
    }
}

function addKomma(val) {
    if (isFirstTerm && !a.includes(".")) {
        addNumber(val);
    } else if (!isFirstTerm && !b.includes(".")) {
        addNumber(val);
    }
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


function selectOperator(choice) {
    if (activeOperator) activeOperator.classList.toggle("active-operator", false);
    activeOperator = choice;
    activeOperator.classList.toggle("active-operator", true);

    if (!isFirstTerm && b != "") {
        if (!operator) operator = choice.textContent;
        a = operate(a, b, operator);
        b = "";
    }
    operator = choice.textContent;
    isFirstTerm = false;
    updateDisplay(a+operator);
}

function manageOperation() {
    if (activeOperator) activeOperator.classList.toggle("active-operator", false);
    if (b != "") {
        a = operate(a, b, operator);
        b = "";
        operator = "";
    }
    isFirstTerm = true;
    isResult = true;
    updateDisplay(a);
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
    return Math.round(result * 10000) / 10000;
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

