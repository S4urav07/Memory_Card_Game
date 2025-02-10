let emojiIcons = ['🍎', '🍌', '🍇', '🍓', '🍊', '🍉', '🍍', '🥝'];
let cards = [], flippedCards = [], matchedCards = [], score = 0, timer, timeElapsed = 0;

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function startGame() {
    matchedCards = []; flippedCards = []; score = 0; timeElapsed = 0;
    clearInterval(timer);
    document.getElementById("score").innerText = "Score: 0";
    document.getElementById("timer").innerText = "Time: 0s";
    
    cards = [...emojiIcons, ...emojiIcons];
    shuffle(cards);
    document.getElementById("game-board").innerHTML = "";
    
    cards.forEach(icon => {
        let card = document.createElement("div");
        card.classList.add("card");
        card.dataset.icon = icon;
        card.addEventListener("click", flipCard);
        document.getElementById("game-board").appendChild(card);
    });
    timer = setInterval(() => {
        timeElapsed++;
        document.getElementById("timer").innerText = `Time: ${timeElapsed}s`;
    }, 1000);
}

function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains("flipped")) {
        this.classList.add("flipped");
        this.innerText = this.dataset.icon;
        flippedCards.push(this);
        if (flippedCards.length === 2) setTimeout(checkMatch, 500);
    }
}

function checkMatch() {
    if (flippedCards[0].dataset.icon === flippedCards[1].dataset.icon) {
        matchedCards.push(...flippedCards);
        document.getElementById("score").innerText = `Score: ${++score}`;
    } else {
        flippedCards.forEach(card => {
            card.classList.remove("flipped");
            card.innerText = "";
        });
    }
    flippedCards = [];
    if (matchedCards.length === cards.length) {
        clearInterval(timer);
        alert(`You Win! Score: ${score} in ${timeElapsed}s`);
    }
}

startGame();
