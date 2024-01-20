var startGameContainer = document.getElementById('start-game-container');
document.getElementById("startButton").onclick = function() {
    location.href = "game.html"
};

function resetHeight(element, reduction){
    // reset the body height to that of the inner browser
    element.style.height = window.innerHeight-reduction + "px";
}

// reset the height whenever the window's resized
window.addEventListener("resize", () => resetHeight(startGameContainer, 10));

// called to initially set the height.
resetHeight(startGameContainer, 10);