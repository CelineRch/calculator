const container = document.querySelector(".container");
const buttonDiv = document.querySelector(".buttons");

init();

function init() {
    createButtons();
}

function createButtons() {
    const labels = [
    "", "C", "AC", "%",
    "X", "7", "8", "9",
    "/", "4", "5", "6",
    "-", "1", "2", "3",
    "+", "0", ".", "="
];

    for (let i = 1; i <= 4 * 5; i++) {
        let button = document.createElement("button");
        if (i == 0 || i == 1) { 
            button.classList.toggle("reset-buttons");
        } else {
            button.classList.toggle("normal-button");
        }        
        button.id = "btn" + i;
        button.textContent = labels[i - 1];
        buttonDiv.appendChild(button);
    }
}