var alphabetContainer = document.querySelector("#alphabet-container");
var wordContainer = document.getElementById("word-container");
var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var alphabetList = [];
let randomWord = "";
var randomWordDict = {};
let randomWordLength = 0;
let gameEndBoolean = false;
let playerTries = 6;
var head = document.getElementById("head");
var body = document.getElementById("body");
var leftArm = document.getElementById("left-arm");
var rightArm = document.getElementById("right-arm");
var leftLeg = document.getElementById("left-leg");
var rightLeg = document.getElementById("right-leg");
var hangManPieces = [head, body, leftArm, rightArm, leftLeg, rightLeg];
var centerDiv = document.getElementById("center-div");
var endMessage = document.getElementById("end-message");
var resetButton = document.getElementById("resetButton");

resetButton.onclick = function () {
    resetGame()
};

function resetGame() {
    location.href = "game.html";
    // getRandomWord();
    // drawAlphabets();
}
function drawAlphabets() {
    alphabet.split("").forEach(function (letter) {
        // Creates a new letter div element
        var letterButton = document.createElement("button");
        letterButton.className = "alphabetLetter";
        letterButton.id = "alphabetBtn";
        letterButton.textContent = letter;

        // Appends the button to the container
        alphabetContainer.appendChild(letterButton);
        alphabetList.push(letterButton);
    });
}

async function getRandomWord() {
    const url = "https://random-word-api.herokuapp.com/word";

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const word = data[0];

        randomWord = word;
        randomWordLength = randomWord.length;

        // Clear existing word container
        while (wordContainer.firstChild) {
            wordContainer.removeChild(wordContainer.firstChild);
        }

        // Create new word container based on the random word
        randomWord.split("").forEach(function (letter, index) {
            wordContainer.style.display = "flex";
            var letterDiv = document.createElement("div");
            letterDiv.className = "alphabetLetter";
            letterDiv.id = "alphabetBtn" + index;
            wordContainer.appendChild(letterDiv);

            randomWordDict[index] = [letterDiv, letter];
        });
    } catch (error) {
        console.log("There was a problem with the fetch operation: ", error);
        randomWord = "Error";
    }
}

getRandomWord();
drawAlphabets();
alphabetList.forEach(function (letterButton) {
    letterButton.addEventListener("click", function () {
        if (!gameEndBoolean) {
            var letter = this.textContent.toLowerCase();
            var letterInWord = false;
            console.log("Letter: " + letter);

            Object.keys(randomWordDict).forEach((key) => {
                var data = randomWordDict[key];
                var letterDiv = data[0];
                var wordLetter = data[1];

                if (letter === wordLetter.toLowerCase()) {
                    letterInWord = true;
                    letterDiv.textContent = wordLetter;

                    if (letterButton.style.backgroundColor !== "green") {
                        randomWordLength -= 1;
                    }
                }
            });

            if (letterInWord) {
                letterButton.style.backgroundColor = "green";
            } else {
                if (letterButton.style.backgroundColor != "var(--title)") {
                    playerTries -= 1;
                    endMessage.innerHTML = "Attempts Left: " + playerTries;
                    removeCenterId();
                    var piece = hangManPieces.shift();
                    piece.style.display = "block";
                }

                letterButton.style.backgroundColor = "var(--title)";

                if (playerTries <= 0) {
                    gameEnd("lose");
                }
            }

            if (randomWordLength <= 0) {
                gameEnd("win");
            }
        }
    });
});

function gameEnd(state) {
    gameEndBoolean = true;
    var backgroundColor = "var(--text)";
    var bloodDisplay = document.getElementById("blood-container");

    if (state === "win") {
        backgroundColor = "green";
        var attemptsLeft = "";

        if (playerTries > 1) {
            attemptsLeft = playerTries + " attempts";
        } else {
            attemptsLeft = playerTries + " attempt";
        }

        endMessage.innerHTML = `Congratulations!! You won! You had ${attemptsLeft} left!`;
    } else {
        backgroundColor = "var(--title)";
        bloodDisplay.style.display = "flex";
        endMessage.innerHTML = "Game Over: You Lost. Try again?";
    }

    Object.keys(randomWordDict).forEach((key) => {
        var data = randomWordDict[key];
        var letterDiv = data[0];
        var wordLetter = data[1];

        letterDiv.style.backgroundColor = backgroundColor;
        letterDiv.textContent = wordLetter;
    });
}

function resetHeight(element, reduction) {
    if (playerTries == 6) {
        element.style.height = window.innerHeight - reduction + "px";
    }
}

function removeCenterId() {
    centerDiv.style.display = "block";
    centerDiv.style.height = "auto";
    centerDiv.style.border = "none";
}

resetHeight(centerDiv, 120);

window.addEventListener("resize", () => resetHeight(centerDiv, 120));

window.addEventListener("keydown", function (event) {
    letterKeyPress(event.key);
});

function letterKeyPress(letterKey) {
    alphabetList.forEach(function (letterButton) {
        if (!gameEndBoolean) {
            var letter = letterButton.textContent.toLowerCase();
            if (letter === letterKey) {
                var letterInWord = false;
                console.log("Letter: " + letter);

                Object.keys(randomWordDict).forEach((key) => {
                    var data = randomWordDict[key];
                    var letterDiv = data[0];
                    var wordLetter = data[1];

                    if (letter === wordLetter.toLowerCase()) {
                        letterInWord = true;
                        letterDiv.textContent = wordLetter;

                        if (letterButton.style.backgroundColor !== "green") {
                            randomWordLength -= 1;
                        }
                    }
                });

                if (letterInWord) {
                    letterButton.style.backgroundColor = "green";
                } else {
                    if (letterButton.style.backgroundColor != "var(--title)") {
                        playerTries -= 1;
                        endMessage.innerHTML = "Attempts Left: " + playerTries;
                        removeCenterId();
                        var piece = hangManPieces.shift();
                        piece.style.display = "block";
                    }

                    letterButton.style.backgroundColor = "var(--title)";

                    if (playerTries <= 0) {
                        gameEnd("lose");
                    }
                }

                if (randomWordLength <= 0) {
                    gameEnd("win");
                }
            }
        }
    });
}
