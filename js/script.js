let btnRef = document.querySelectorAll(".button-option");
let popupRef  = document.querySelectorAll(".popup");
let newgameBtn = document.getElementById("new-game");
let restart = document.getElementById("restart");
let msgRef = document.getElementById("message");
//Wininng Pattern Array
let winningPattern = [ 
[0,1,2],
[0,3,6], 
[2,5,8], 
[6,7,8],
[3,4,5],
[1,4,7],
[0,4,8],
[2,4,6],
];

//Player 'X' plays first
let xTurn = true;
let count = 0;

//Disable All Buttons
const disableButtons = () => {
    btnRef.forEach((element) => (element.disabled = true));
    //enable popup
    popupRef.classList.remove("hide");
};

//This function  is executed when a player wins
const winFunction = (letter) => {
    disableButtons();
    if(letter == "X"){
        msgRef.innerHTML = "&#1xF389; <br> 'X' Wins";
    }else{
        msgRef.innerHTML = "&#1xF389; <br> 'O' Wins"
    }
};

//function for draw
const drawFunction = () =>{
    disableButtons();
    msgRef.innerHTML = "&#1xF60E; <br> It's a Draw";
}

//Enable all buttons (for new game and restart)
const enableButtons = () => {
    btnRef.forEach((element) => {
        element.innerText = "";
        element.disabled = "false";
    });
    //disabled popup
    popupRef.classList.add("hide");
};

//New Game
newgameBtn.addEventListener("click", () => {
    count = 0;
    enableButtons();
});

restartBtn.addEventListener("click", () => {
    count = 0;
    enableButtons();
})

//Win Logic
const winChecker = () => {
    //Loop though all win patterns
    for(let i of winningPattern){
        let [element1, element2, element3] = [
            btnRef[i[0]].innerText, 
            btnRef[i[1]].innerText,
            btnRef[i[2]].innerText,
        ];
        //Check if elements are fillied
        //if 3 empty elements  are same and would give win as would
        if(element1 != "" && (element2 != "") & (element3 != "" )){
            if(element1 == element2 && element2 == element3){
                //if all 3 buttons have same values then the value to WinFunction
                winFunction(element1);
            }
        }
    }
};

//Display x/o on click
btnRef.forEach(element => {
    element.addEventListener("click", () => {
        if (xTurn){
            xTurn = false;
            //Display x
            element.innerText = "X";
            element.disabled = true;
        }else {
            xTurn = true;
            //Display Y
            element.innerText = "O";
            element.disabled = true;
        }
        //Increment count on each click
        count += 1;
        if (count == 9){
            drawFunction();
        }
        //Check for win on every click
        winChecker();
    });
});

//Enable Buttons and Disable popup on page load
window.onload = enableButtons;