const form = document.getElementById("proceed-form");
const popup = document.getElementById("popup");
const settings = document.getElementById("settings");
const wrapper = document.querySelector(".wrapper");

form.addEventListener("submit", e => {
	e.preventDefault();
	popup.showModal();
});

popup.addEventListener("click", e => {
	if (!wrapper.contains(e.target)) popup.close();
});

settings.addEventListener("submit", e => {
	e.preventDefault();
	location.href = "quiz.html?questions=10&difficulty=easy";
});
