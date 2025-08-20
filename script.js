const container = document.querySelector(".container");
const btnDiv = document.querySelector(".buttons");
const displayArea = document.querySelector(".display-area");
let activeOperator;

let a = "0";
let b = "";
let operator = "";
let isFirstTerm = true;
let isResult = false;

const keyMap = {
    '0': 'btn0',
    '1': 'btn1',
    '2': 'btn2',
    '3': 'btn3',
    '4': 'btn4',
    '5': 'btn5',
    '6': 'btn6',
    '7': 'btn7',
    '8': 'btn8',
    '9': 'btn9',

    '.': 'btnDot',

    '%': 'btnPercent',
    '*': 'btnMultiply',
    '/': 'btnDivide',
    '-': 'btnMinus',
    '+': 'btnPlus',

    '=': 'btnEqual',
    'Enter': 'btnEqual'
};

init();

function init() {
    btnDiv.addEventListener("click", (event) => {
        let btn = event.target.closest("button");
        if (btn) {
            buttonClicked(btn);
        }
    });

    document.addEventListener("keydown", (event) => {
        let btn = btnDiv.querySelector("#"+keyMap[event.key]);
        switch (event.key) {
            case "0":
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
                addNumber(btn);
                break;

            case "+":
            case "-":
            case "*":
            case "/":
            case "%":
                selectOperator(btn);
                break;

            case "=":
            case "Enter":
                manageOperation();
                break;

            case "Backspace":
            case "Delete":
                deleteNumber();
                break;

            case ".":
            case ",":
                addKomma(btn);
                break;

            default:
                return;
        }
    });
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
            break;
        case "komma-button":
            addKomma(btn);
            break;
        default:
            break;
    };
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
    if (activeOperator) activeOperator.classList.toggle("active-operator", false);
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
    } else if (b != "") {
        b = b.slice(0, -1);
        updateDisplay(b);
    } else {
        operator = "";
        isFirstTerm = true;
        activeOperator.classList.toggle("active-operator", false);
        updateDisplay(a);
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
    updateDisplay(a);
}

function manageOperation() {
    if (activeOperator) {
        activeOperator.classList.toggle("active-operator", false);
    }
    if (b != "") {
        a = operate(a, b, operator);
        b = "";
        operator = "";
    }
    isFirstTerm = true;
    isResult = true;
    
    if (a.toString().length > 10) a = Number(a).toExponential();
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
    if (b == "0") {
        alert("Nice try, but you cannot divide by 0 :c");
        reset();
        return;
    }
    return Number(a) / Number(b);
}

