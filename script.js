let emojiIcons = ['🍎', '🍌', '🍇', '🍓', '🍊', '🍉', '🍍', '🥝', '🍒', '🍑', '🍋', '🍍', '🍇', '🍏', '🍊', '🍎', '🍋', '🍌', '🍓', '🍏'];
        let letterIcons = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        let animalIcons = ['🐱', '🐶', '🐮', '🐯', '🐵', '🐰', '🐸', '🐴', '🐶', '🐱', '🐺', '🐯', '🐻', '🦁', '🐴', '🦓', '🐺', '🦁', '🐸', '🐱'];

        let icons;
        let cards = [];
        let flippedCards = [];
        let matchedCards = [];
        let score = 0;
        let timer;
        let timeElapsed = 0;

        function shuffle(array) {
            return array.sort(() => Math.random() - 0.5);
        }

        function startGame() {
            matchedCards = [];
            flippedCards = [];
            score = 0;
            timeElapsed = 0;
            clearInterval(timer);
            document.getElementById("timer").innerText = "Time: 0s";
            document.getElementById("score").innerText = "Score: 0";

            let difficulty = document.getElementById("difficulty").value;
            let theme = document.getElementById("theme").value;

            if (theme === "emojis") {
                icons = emojiIcons;
            } else if (theme === "letters") {
                icons = letterIcons;
            } else {
                icons = animalIcons;
            }

            let numCards, numPairs;

            if (difficulty === "easy") {
                numCards = 16;  // 4x4 grid (16 cards)
                numPairs = 8;   // 8 pairs
            } else if (difficulty === "medium") {
                numCards = 36;  // 6x6 grid (36 cards)
                numPairs = 18;  // 18 pairs
            } else {
                numCards = 64;  // 8x8 grid (64 cards)
                numPairs = 32;  // 32 pairs
            }

            // Create cards based on numPairs
            cards = [...icons.slice(0, numPairs), ...icons.slice(0, numPairs)];
            shuffle(cards);
            document.getElementById("game-board").innerHTML = "";
            let board = document.getElementById("game-board");

            // Set grid layout based on difficulty
            if (difficulty === "easy") {
                board.style.gridTemplateColumns = "repeat(4, 100px)";
            } else if (difficulty === "medium") {
                board.style.gridTemplateColumns = "repeat(6, 100px)";
            } else {
                board.style.gridTemplateColumns = "repeat(8, 100px)";
            }

            cards.forEach((icon, index) => {
                let card = document.createElement("div");
                card.classList.add("card");
                card.dataset.icon = icon;
                card.addEventListener("click", flipCard);
                board.appendChild(card);
            });

            // Start Timer
            timer = setInterval(updateTimer, 1000);
        }

        function updateTimer() {
            timeElapsed++;
            document.getElementById("timer").innerText = `Time: ${timeElapsed}s`;
        }

        function flipCard() {
            if (flippedCards.length < 2 && !this.classList.contains("flipped")) {
                this.classList.add("flipped");
                this.innerHTML = this.dataset.icon;
                playSound("flipSound");
                flippedCards.push(this);
                if (flippedCards.length === 2) {
                    setTimeout(checkMatch, 500);
                }
            }
        }

        function checkMatch() {
            if (flippedCards[0].dataset.icon === flippedCards[1].dataset.icon) {
                flippedCards.forEach(card => card.classList.add("matched"));
                matchedCards.push(...flippedCards);
                score++;
                document.getElementById("score").innerText = `Score: ${score}`;
                playSound("matchSound");
            } else {
                flippedCards.forEach(card => {
                    card.classList.remove("flipped");
                    card.innerHTML = "";
                });
            }
            flippedCards = [];
            if (matchedCards.length === cards.length) {
                clearInterval(timer);
                setTimeout(() => alert(`You Win! Your Score: ${score} in ${timeElapsed} seconds!`), 100);
            }
        }

        function playSound(soundId) {
            let sound = document.getElementById(soundId);
            sound.currentTime = 0;
            sound.play();
        }

        startGame();