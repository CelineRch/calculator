let container = document.querySelector(".container");

init();

function init() {
    let buttonDiv = document.querySelector(".buttons");
    for (let i = 0; i < 4 * 5; i++) {
        let button = document.createElement("button");
        if (i == 0 || i == 1) { 
            button.classList.toggle("reset-buttons");
        } else {
            button.classList.toggle("normal-button");
        }
        button.textContent = i;
        button.style.height = button.style.width + "px";
        buttonDiv.appendChild(button);
    }
}