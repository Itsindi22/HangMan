var buttonContainer = document.querySelector('#alphabet-container');
var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
alphabet.split('').forEach(function(letter) {

    // Creates a new letter div element
    var button = document.createElement('div');
    button.className = 'alphabetLetter'
    button.textContent = letter;

    // Appends the button to the container
    buttonContainer.appendChild(button);
})