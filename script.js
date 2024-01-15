var alphabetContainer = document.querySelector('#alphabet-container');
var wordContainer = document.getElementById('word-container');
var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
let randomWord = "";
var startGameContainer = document.getElementById('start-game-container');

alphabet.split('').forEach(function(letter) {

    // Creates a new letter div element
    var button = document.createElement('div');
    button.className = 'alphabetLetter';
    button.textContent = letter;

    // Appends the button to the container
    alphabetContainer.appendChild(button);
})

// randomWord.split("").forEach(function(letter) {
//     wordContainer.style.display = "flex";
//     var button = document.createElement('div');
//     button.className = 'alphabetLetter';
//     wordContainer.appendChild(button);
// })

// async function getRandomWord() {
//     const url = "https://random-word-api.herokuapp.com/word";

//     try {
//         const response = await fetch(url);
//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data = await response.json();
//         const word = data[0];
//         randomWord = word;
//     } catch (error) {
//         console.log('There was a problem with the fetch operation: ', error);
//         randomWord = "Error";
//     }
// }

function getRandomWord() {
    return new Promise(async (resolve, reject) => {
        const url = "https://random-word-api.herokuapp.com/word";
 
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            const word = data[0];
            resolve(word);
        } catch (error) {
            console.log('There was a problem with the fetch operation: ', error);
            reject('Error');
        }
    });
 }

 
// function startGame() {
//     const startGameContainer = document.getElementById('start-game-container');
//     const gameDisplay = document.getElementById('gameDisplay');

//     startGameContainer.style.display = "none";
//     gameDisplay.style.display = "inline";
    
//     getRandomWord();
//  }

getRandomWord().then(word => {
    randomWord = word;
    console.log(word);
})
async function startGame() {
    const startGameContainer = document.getElementById('start-game-container');
    const gameDisplay = document.getElementById('gameDisplay');
 
    startGameContainer.style.display = "none";
    gameDisplay.style.display = "inline";
    
    // await getRandomWord().then(word => {
    //     randomWord = word;
    // });
 
    // Clear existing word container
    while (wordContainer.firstChild) {
        wordContainer.removeChild(wordContainer.firstChild);
    }
 
    // Create new word container based on the random word
    randomWord.split("").forEach(function(letter) {
        wordContainer.style.display = "flex";
        var button = document.createElement('div');
        button.className = 'alphabetLetter';
        wordContainer.appendChild(button);
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