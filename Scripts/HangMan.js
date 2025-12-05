/**
 * Created by Salma Essam  on 23/06/2024.
 */
const hangmanImage = document.querySelector(".hangManBox img");
const keyboardDiv = document.querySelector(".keyboard");
const wordDisplay = document.querySelector(".wordDisplay");
const guessesText = document.querySelector(".guessesText b");
const hangmanModal = document.querySelector(".hangManModal");
const playAgainbtn = document.querySelector(".playAgain");

let currentWord,
	correctWords = [],
	wrongWord = 0;
const maxGuesses = 6;

// reset Game
const resetGame = () => {
	correctWords = [];
	wrongWord = 0;
	hangmanImage.src = "Images/hangman-" + wrongWord + ".svg";
	guessesText.innerText = wrongWord + " / " + maxGuesses;
	keyboardDiv
		.querySelectorAll("button")
		.forEach((btn) => (btn.disabled = false));
	wordDisplay.innerHTML = currentWord
		.split("")
		.map(() => '<li class="letter"></li>')
		.join("");
	hangmanModal.classList.remove("show");
};

// select word and hint from wordList
const onRandomWord = () => {
	const { word, hint } =
		wordList[Math.floor(Math.random() * wordList.length)];
	currentWord = word;
	document.querySelector(".hintText").innerText = hint;
	wordDisplay.innerHTML = word
		.split("")
		.map(() => '<li class="letter"></li>')
		.join("");
	resetGame();
};
// Game Over result
const GameOver = (isVictory) => {
	setTimeout(() => {
		const modalText = isVictory
			? "You Found The Word :"
			: "The Correct Word Was :";
		hangmanModal.querySelector("img").src = `Images/${
			isVictory ? "Victory" : "lost"
		}.gif`;
		hangmanModal.querySelector("h4").innerText = `${
			isVictory ? "Congrats!" : "Game Over!"
		}`;
		hangmanModal.querySelector(
			"p"
		).innerHTML = `${modalText} <b>${currentWord}</b>`;
		hangmanModal.classList.add("show");
	}, 300);
};
// display letters, update disabled buttons and guesses result
const initGame = (button, clickedLetter) => {
	// get list items once to avoid repeated DOM queries
	const letterNodes = wordDisplay.querySelectorAll("li");

	if (currentWord.includes(clickedLetter)) {
		for (let i = 0; i < currentWord.length; i++) {
			if (currentWord[i] === clickedLetter) {
				// only reveal if not already revealed
				const node = letterNodes[i];
				if (!node.classList.contains("guessed")) {
					correctWords.push(clickedLetter);
					node.innerText = clickedLetter;
					node.classList.add("guessed");
				}
			}
		}
	} else {
		wrongWord++;
		hangmanImage.src = `Images/hangman-${wrongWord}.svg`;
	}

	// disable the clicked button and update guesses text
	button.disabled = true;
	guessesText.innerText = `${wrongWord} / ${maxGuesses}`;

	// check for end conditions
	if (wrongWord === maxGuesses) return GameOver(false);
	if (correctWords.length === currentWord.length) return GameOver(true);
};

// create keyboard buttons dynamicly and addlistner to button
for (let i = 97; i <= 122; i++) {
	const button = document.createElement("button");
	button.innerText = String.fromCharCode(i);
	keyboardDiv.appendChild(button);
	button.addEventListener("click", (e) =>
		initGame(e.target, String.fromCharCode(i))
	);
}
// add event to playagain btn to reset the Game and Play Again
playAgainbtn.addEventListener("click", onRandomWord);

onRandomWord();
