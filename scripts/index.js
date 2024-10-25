const form = document.getElementById("proceed-form");
const popup = document.getElementById("popup");
const wrapper = document.querySelector(".wrapper");
const closeButton = document.querySelector(".close");
const settings = document.getElementById("settings");
const difficulty = document.getElementById("difficulty");
const difficultyLabel = document.getElementById("difficulty-label");

const valueToDifficulty = value => {};

popup.addEventListener("click", e => {
	if (!wrapper.contains(e.target)) popup.close();
});

closeButton.addEventListener("click", () => {
	popup.close();
});

form.addEventListener("submit", e => {
	e.preventDefault();
	popup.showModal();
});

settings.addEventListener("submit", e => {
	e.preventDefault();
	location.href = "quiz.html?questions=10&difficulty=easy";
});

difficulty.addEventListener("change", () => {
	console.log(difficulty.value);
});
