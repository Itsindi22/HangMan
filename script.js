var alphabetContainer = document.querySelector('#alphabet-container');
var wordContainer = document.getElementById('word-container');
var startGameContainer = document.getElementById('start-game-container');
var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
let randomWord = "";

alphabet.split('').forEach(function(letter) {

    // Creates a new letter div element
    var letterDiv = document.createElement('button');
    letterDiv.className = 'alphabetLetter';
    letterDiv.id = "alphabetBtn";
    letterDiv.textContent = letter;

    // Appends the button to the container
    alphabetContainer.appendChild(letterDiv);
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
    
    // Clear existing word container
    while (wordContainer.firstChild) {
        wordContainer.removeChild(wordContainer.firstChild);
    }
 
    // Create new word container based on the random word
    randomWord.split("").forEach(function() {
        wordContainer.style.display = "flex";
        var letterDiv = document.createElement('div');
        letterDiv.className = 'alphabetLetter';
        wordContainer.appendChild(letterDiv);
    })
 }

 
 function resetHeight(element, reduction){
    // reset the body height to that of the inner browser
    element.style.height = window.innerHeight-reduction + "px";
}
// reset the height whenever the window's resized
window.addEventListener("resize", () => resetHeight(startGameContainer, 10));

// called to initially set the height.
resetHeight(startGameContainer, 10);