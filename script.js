var alphabetContainer = document.querySelector('#alphabet-container');
var wordContainer = document.getElementById('word-container');
var startGameContainer = document.getElementById('start-game-container');
var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var alphabetList = [];
let randomWord = "";
var randomWordDict = {};
let randomWordLength = 0;
let gameEndBoolean = false;
let playerTries = 6;

alphabet.split('').forEach(function(letter) {

    // Creates a new letter div element
    var letterButton = document.createElement('button');
    letterButton.className = 'alphabetLetter';
    letterButton.id = "alphabetBtn";
    letterButton.textContent = letter;

    // Appends the button to the container
    alphabetContainer.appendChild(letterButton);
    alphabetList.push(letterButton)
})


async function getRandomWord() {
    const url = "https://random-word-api.herokuapp.com/word";

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const word = data[0];
        console.log("word: ", word)
        randomWord = word;
        randomWordLength = randomWord.length;

        // Clear existing word container
        while (wordContainer.firstChild) {
            wordContainer.removeChild(wordContainer.firstChild);
        }
    
        // Create new word container based on the random word
        randomWord.split("").forEach(function(letter, index) {
            wordContainer.style.display = "flex";
            var letterDiv = document.createElement('div');
            letterDiv.className = 'alphabetLetter';
            letterDiv.id = "alphabetBtn" + index;
            wordContainer.appendChild(letterDiv);
            
            randomWordDict[index] = [letterDiv, letter];
        })
    } catch (error) {
        console.log('There was a problem with the fetch operation: ', error);
        randomWord = "Error";
    }
}

getRandomWord()

async function startGame() {
    const startGameContainer = document.getElementById('start-game-container');
    const gameDisplay = document.getElementById('gameDisplay');
 
    startGameContainer.style.display = "none";
    gameDisplay.style.display = "inline";
 }

 
 function resetHeight(element, reduction){
    // reset the body height to that of the inner browser
    element.style.height = window.innerHeight-reduction + "px";
}
// reset the height whenever the window's resized
window.addEventListener("resize", () => resetHeight(startGameContainer, 10));

// called to initially set the height.
resetHeight(startGameContainer, 10);

alphabetList.forEach(function(letterButton) {
    letterButton.addEventListener("click", function() {
        if (!gameEndBoolean) {
            var letter = this.textContent.toLowerCase();
            var letterInWord = false;
            console.log("Letter: " + letter)

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
            })

            if (letterInWord) {
                letterButton.style.backgroundColor = "green";
            } else {
                letterButton.style.backgroundColor = "var(--title)";
                playerTries -= 1;

                if (playerTries <= 0) {
                    gameEnd("lose");
                }
            }

            if (randomWordLength <= 0) {
                gameEnd("win");
            }
        }
    })
})

function gameEnd(state) {
    gameEndBoolean = true;
    var backgroundColor = "var(--text)";

    if (state === "win") {
        backgroundColor = "green";
    } else {
        backgroundColor = "var(--title)"
    }

    Object.keys(randomWordDict).forEach((key) => {
        var data = randomWordDict[key];
        var letterDiv = data[0];

        letterDiv.style.backgroundColor = backgroundColor;
    })
}