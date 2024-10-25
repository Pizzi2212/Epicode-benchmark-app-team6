const form = document.getElementById("proceed-form");
const popup = document.getElementById("popup");
const wrapper = document.querySelector(".wrapper");
const closeButton = document.querySelector(".close");
const settings = document.getElementById("settings");
const difficulty = document.getElementById("difficulty");
const difficultyLabel = document.getElementById("difficulty-label");
const allCheckbox = document.getElementById("all");
const questionSlider = document.getElementById("questions");
const questionsLabel = document.getElementById("questions-label");

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
			props.difficulty = "easymedium";
			props.labelText = `<span class="easy">Easy</span>-<span class="medium">Medium</span>`;
			props.color = "#0f0";
			break;
		case 3:
			props.difficulty = "medium";
			props.labelText = `<span class="medium">Medium</span>`;
			props.color = "#ff0";
			break;
		case 4:
			props.difficulty = "mediumhard";
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

const getQuestionsProperties = value => {
	const props = {
		questions: undefined,
		labelText: undefined,
		color: undefined,
	};
	switch (parseInt(value)) {
		case 1:
			props.questions = 8;
			props.color = "#0f0";
			break;
		case 2:
			props.questions = 15;
			props.color = "#0f0";
			break;
		case 3:
			props.questions = 25;
			props.color = "#ff0";
			break;
		case 0:
		case 4:
		default:
			props.color = "#f00";
			break;
	}
	props.labelText = `${props.questions ?? "All"}`;
	return props;
};

const getRootProp = slider => {
	switch (slider) {
		case difficulty:
			return "--difficulty-slider-color";
		case questionSlider:
			return "--questions-slider-color";
	}
};

popup.addEventListener("click", e => {
	if (!wrapper.contains(e.target)) popup.close();
});

closeButton.addEventListener("click", () => {
	popup.close();
});

form.addEventListener("submit", e => {
	e.preventDefault();
	updateDifficulty();
	updateQuestions();
	popup.showModal();
});

settings.addEventListener("submit", e => {
	e.preventDefault();
	const parameters = [];

	const questions = getQuestionsProperties(questionSlider.value);
	if (questions.questions) parameters.push(`questions=${questions.questions}`);

	if (!allCheckbox.checked)
		parameters.push(
			`difficulty=${getDifficultyProperties(difficulty.value).difficulty}`,
		);

	location.href = `quiz.html?${parameters.join("&")}`;
});

const setSliderColor = ({ slider, steps }, color) => {
	const value = parseInt(slider.value);
	const percentage = ((value - 1) / steps) * 100;
	slider.style.background = `linear-gradient(to right, ${color} 0%, ${color} ${percentage}%, gray ${percentage}%, gray 100%)`;
	slider.style.setProperty(getRootProp(slider), color);
};

function sliderUpdateDifficulty() {
	allCheckbox.checked = false;
}

function updateDifficulty() {
	const difficultyProps = getDifficultyProperties(
		allCheckbox.checked ? 0 : difficulty.value,
	);
	setSliderColor({ slider: difficulty, steps: 4 }, difficultyProps.color);
	difficultyLabel.innerHTML = difficultyProps.labelText;
}

difficulty.addEventListener("change", () => {
	sliderUpdateDifficulty();
	updateDifficulty();
});

allCheckbox.addEventListener("change", updateDifficulty);

function updateQuestions() {
	const questionProps = getQuestionsProperties(questionSlider.value);
	questionsLabel.innerHTML = questionProps.labelText;
	setSliderColor({ slider: questionSlider, steps: 3 }, questionProps.color);
}

questionSlider.addEventListener("change", updateQuestions);
