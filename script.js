var alphabetContainer = document.querySelector('#alphabet-container');
var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
let randomWord = "";
var startGameContainer = document.getElementById('start-game-container');

alphabet.split('').forEach(function(letter) {

    // Creates a new letter div element
    var button = document.createElement('div');
    button.className = 'alphabetLetter'
    button.textContent = letter;

    // Appends the button to the container
    alphabetContainer.appendChild(button);
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
        randomWord = word;
    } catch (error) {
        console.log('There was a problem with the fetch operation: ', error);
        randomWord = "Error";
    }
}

function startGame() {
    // getRandomWord();
    // console.log(randomWord)
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