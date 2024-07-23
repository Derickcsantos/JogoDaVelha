// Seleção de elementos DOM
let btnRef = document.querySelectorAll(".button-option");
let popupRef = document.querySelectorAll(".popup");
let newgameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById("restart");
let msgRef = document.getElementById("message");

// Padrões de vitória
let winningPattern = [ 
    [0, 1, 2],  // Linhas
    [0, 3, 6],  // Colunas
    [2, 5, 8],  // Diagonais
    [6, 7, 8],  // Linhas
    [3, 4, 5],  // Colunas
    [1, 4, 7],  // Colunas
    [0, 4, 8],  // Diagonais
    [2, 4, 6]   // Diagonais
];

// Variáveis de controle de jogo
let xTurn = true;
let count = 0;

// Função para desabilitar todos os botões
const disableButtons = () => {
    btnRef.forEach((element) => (element.disabled = true));
    popupRef.forEach((element) => element.classList.remove("hide"));
};

// Função chamada quando um jogador vence
const winFunction = (letter) => {
    disableButtons();
    if (letter == "X") {
        msgRef.innerHTML = "&#x1F389; <br> 'X' Wins";
    } else {
        msgRef.innerHTML = "&#x1F389; <br> 'O' Wins";
    }
};

// Função para empate
const drawFunction = () => {
    disableButtons();
    msgRef.innerHTML = "&#x1F60E; <br> It's a Draw";
};

// Função para habilitar todos os botões (novo jogo e reinício)
const enableButtons = () => {
    btnRef.forEach((element) => {
        element.innerText = "";
        element.disabled = false;
    });
    popupRef.forEach((element) => element.classList.add("hide"));
};

// Evento de clique no botão "Novo Jogo"
newgameBtn.addEventListener("click", () => {
    count = 0;
    enableButtons();
});

// Evento de clique no botão "Reiniciar"
restartBtn.addEventListener("click", () => {
    count = 0;
    enableButtons();
});

// Lógica de verificação de vitória
const winChecker = () => {
    for (let pattern of winningPattern) {
        let [element1, element2, element3] = [
            btnRef[pattern[0]].innerText,
            btnRef[pattern[1]].innerText,
            btnRef[pattern[2]].innerText,
        ];
        if (element1 != "" && element2 != "" && element3 != "") {
            if (element1 == element2 && element2 == element3) {
                winFunction(element1);
                return;
            }
        }
    }
    // Verificar empate
    count++;
    if (count === 9) {
        drawFunction();
    }
};

// Evento de clique nos botões de jogo
btnRef.forEach((element) => {
    element.addEventListener("click", () => {
        if (element.innerText === "") { // Verificar se o botão está vazio
            if (xTurn) {
                element.innerText = "X";
            } else {
                element.innerText = "O";
            }
            xTurn = !xTurn; // Alternar turno
            element.disabled = true; // Desabilitar botão após jogada

            // Verificar vitória ou empate após jogada
            winChecker();
        }
    });
});

// Habilitar botões e esconder pop-up ao carregar a página
window.onload = enableButtons;