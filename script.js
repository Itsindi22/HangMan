var buttonContainer = document.querySelector('#alphabet-container');
var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
alphabet.split('').forEach(function(letter) {

    // Creates a new button element
    var button = document.createElement('button');
    button.className = 'alphabetBtn'
    button.textContent = letter;

    // Appends the button to the container
    buttonContainer.appendChild(button);
})