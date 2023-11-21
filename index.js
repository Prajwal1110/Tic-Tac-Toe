const boxes =document.querySelectorAll(".box");
const gameInfo=document.querySelector(".game-info");
const newGameBtn= document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions=[
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
 
//lets create the function to initialse the game
function initGame(){
    currentPlayer="X";
    
    gameGrid=["","","","","","","","",""]
    //UI pr empty bhi krna padega boxes ko
    boxes.forEach((box,index) => {
        box.innerText= "";
        boxes[index].style.pointerEvents="all"; 
        ///one more thing is missing, initialsie box with css properties again
        box.classList=`box box${index+1}`;
    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText=`Current Player - ${currentPlayer}`;
  
}

  initGame();

function swapTurn()
{
    if(currentPlayer === "X")
    {
        currentPlayer = "O";
    }
    else{
        currentPlayer="X";
    }
    //UI Update
    gameInfo.innerContent = `Current Player - ${currentPlayer}`;
}
 
function checkGameOver(){ 

    let winner = "";
    winningPositions.forEach((position) => {  
        if ((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]]))
        boxes.forEach((box) => {
            box.style.pointerEvents = "none";
        });

        if(gameGrid[position[0]]==="X" )
        winner="X";
    else
        winner="O";
        {
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })

        
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    if (winner !== "") {
        gameInfo.textContent = `Winner is - ${winner}`;
        newGameBtn.classList.add("active");
        return;
    }

    // Here is not winner yet Check for tie
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if (box !== "") {
            fillCount++; 
        }
    });

    if (fillCount === 9) {
        gameInfo.textText = "Game Tied !";
        newGameBtn.classList.add("active");
    }
}


function handleClick(index){
    if(gameGrid[index]=== ""){
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents="none";
        //swap karo turn ko
        swapTurn();
        gameInfo.textContent = `Current Player - ${currentPlayer} `;
        //chek koi jeet toh nahi gya
        checkGameOver();
    }
}
   
boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        handleClick(index);
    })
});


newGameBtn.addEventListener("click",initGame);
//1 