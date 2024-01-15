let btnRef = document.querySelectorAll(".button-option");
let popupRef = document.querySelector(".popup");
let newgameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById("restart");
let msgRef = document.getElementById("message");
//Winning Pattern Array
let winningPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [2, 5, 8],
  [6, 7, 8],
  [3, 4, 5],
  [1, 4, 7],
  [0, 4, 8],
  [2, 4, 6],
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

//Enable all buttons (For New Game and Restart)
const enableButtons = () => {
  btnRef.forEach((element) => {
    element.innerText = "";
    element.disabled = false;
  });
  //disable popup
  popupRef.classList.add("hide");
};

// Function to select a random message
const getRandomMessage = () => {
  const gifOptions = ["gifs/gif.gif","gifs/gif1.gif", "gifs/gif2.gif", "gifs/gif3.gif","gifs/gif4.gif","gifs/gif5.gif","gifs/gif6.gif","gifs/gif7.gif","gifs/gif8.gif","gifs/gif9.gif","gifs/gif10.gif"];
  const randomIndex = Math.floor(Math.random() * gifOptions.length);
  return gifOptions[randomIndex];
};

const winFunction = (letter) => {
    disableButtons();
    // const gifFileName = "gif3.gif";
    const gifFileName = getRandomMessage();
    const gifFilePath = `./${gifFileName}`;
  
    if (letter === "X") {
      msgRef.innerHTML = `<img src="${gifFilePath}" alt="Winning GIF"> <br> X is the Winner`;
    } else {
      msgRef.innerHTML = `<img src="${gifFilePath}" alt="Winning GIF"> <br> O is the Winner`;
    }
  };
  
  // Function to select a random gameover message
const getRandomGameoverMessage = () => {
  const gameoverOptions = ["gameover/gameover.gif", "gameover/gameover1.gif", "gameover/gameover2.gif", "gameover/gameover3.gif", "gameover/gameover4.gif", "gameover/gameover5.gif", "gameover/gameover6.gif", "gameover/gameover7.gif"];
  const randomIndex = Math.floor(Math.random() * gameoverOptions.length);
  return gameoverOptions[randomIndex];
};

  //Function for draw
  const drawFunction = () => {
    disableButtons();
    const gifFileName = getRandomGameoverMessage();
    const gifFilePath = `./${gifFileName}`;

    msgRef.innerHTML = `<img src="${gifFilePath}" alt="Winning GIF"> <br> It's a Draw`;
};



//New Game
newgameBtn.addEventListener("click", () => {
  count = 0;
  enableButtons();
});
restartBtn.addEventListener("click", () => {
  count = 0;
  enableButtons();
});

//Win Logic
const winChecker = () => {
  //Loop through all win patterns
  for (let i of winningPattern) {
    let [element1, element2, element3] = [
      btnRef[i[0]].innerText,
      btnRef[i[1]].innerText,
      btnRef[i[2]].innerText,
    ];
    //Check if elements are filled
    //If 3 empty elements are same and would give win as would
    if (element1 != "" && (element2 != "") & (element3 != "")) {
      if (element1 == element2 && element2 == element3) {
        //If all 3 buttons have same values then pass the value to winFunction
        winFunction(element1);
      }
    }
  }
};

//Display X/O on click
btnRef.forEach((element) => {
  element.addEventListener("click", () => {
    if (xTurn) {
      xTurn = false;
      //Display X
      element.innerText = "X";
      element.disabled = true;
    } else {
      xTurn = true;
      //Display 0
      element.innerText = "O";
      element.disabled = true;
    }
    //Increment count on each click
    count += 1;
    if (count == 9) {
      drawFunction();
    }
    //Check for win on every click
    winChecker();
  });
});
//Enable Buttons and disable popup on page load
window.onload = enableButtons;