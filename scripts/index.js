const form = document.getElementById("proceed-form");
const popup = document.getElementById("popup");
const wrapper = document.querySelector(".wrapper");
const closeButton = document.querySelector(".close");
const settings = document.getElementById("settings");
const difficulty = document.getElementById("difficulty");
const difficultyLabel = document.getElementById("difficulty-label");
const allCheckbox = document.getElementById("all");

const getDifficultyProperties = value => {
	const props = {
		difficulty: undefined,
		labelText: undefined,
		color: undefined,
	};
	switch (parseInt(value)) {
		case 1:
			props.difficulty = "easy";
			props.labelText = `<span class="easy">Easy</span>`;
			props.color = "#0f0";
			break;
		case 2:
			props.difficulty = "easy-medium";
			props.labelText = `<span class="easy">Easy</span>-<span class="medium">Medium</span>`;
			props.color = "#0f0";
			break;
		case 3:
			props.difficulty = "medium";
			props.labelText = `<span class="medium">Medium</span>`;
			props.color = "#ff0";
			break;
		case 4:
			props.difficulty = "medium-hard";
			props.labelText = `<span class="medium">Medium</span>-<span class="hard">Hard</span>`;
			props.color = "#ff0";
			break;
		case 5:
			props.difficulty = "hard";
			props.labelText = `<span class="hard">Hard</span>`;
			props.color = "#f00";
			break;
		case 0:
		default:
			props.difficulty = "all";
			props.labelText = `<span class="all">All</span>`;
			props.color = "#fff";
			break;
	}
	return props;
};

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
	const questionsParameter = 5;
	const difficultyParameter = getDifficultyProperties(
		allCheckbox.checked ? 0 : difficulty.value,
	).difficulty;
	location.href = `quiz.html?questions=10&difficulty=${difficultyParameter}`;
});

const setSliderColor = (slider, color) => {
	slider.style.background = color;
	slider.style.setProperty("--thumb-color", color);
};

const updateDifficulty = () => {
	const difficultyProps = getDifficultyProperties(
		allCheckbox.checked ? 0 : difficulty.value,
	);
	setSliderColor(difficulty, difficultyProps.color);
	difficultyLabel.innerHTML = difficultyProps.labelText;
};

difficulty.addEventListener("change", updateDifficulty);

allCheckbox.addEventListener("change", updateDifficulty);

// START
updateDifficulty();
