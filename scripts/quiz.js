"use strict";

const questions = [
	{
		category: "Science: Computers",
		seconds: 90,
		type: "multiple",
		difficulty: "medium",
		question: "What does <em>CPU</em> stand for?",
		correct_answers: ["Central Processing Unit", "polenta"],
		incorrect_answers: [
			"Central Process Unit",
			"Computer Personal Unit",
			"Central Processor Unit",
		],
	},
	{
		category: "Science: Computers",
		type: "multiple",
		difficulty: "hard",
		question:
			"In the programming language Java, which of these keywords would you put on a variable to make sure it doesn&#039;t get modified?",
		correct_answers: ["Final"],
		incorrect_answers: ["Static", "Private", "Public"],
	},
	{
		category: "Science: Computers",
		type: "boolean",
		difficulty: "medium",
		question: "The logo for Snapchat is a Bell.",
		correct_answers: ["False"],
		incorrect_answers: ["True"],
	},
	{
		category: "Science: Computers",
		type: "boolean",
		difficulty: "hard",
		question:
			"Pointers were not used in the original C programming language; they were added later on in C++.",
		correct_answers: ["False"],
		incorrect_answers: ["True"],
	},
	{
		category: "Science: Computers",
		type: "multiple",
		difficulty: "easy",
		question:
			"What is the most preferred image format used for logos in the Wikimedia database?",
		correct_answers: [".svg"],
		incorrect_answers: [".png", ".jpeg", ".gif"],
	},
	{
		category: "Science: Computers",
		type: "multiple",
		difficulty: "easy",
		question: "In web design, what does CSS stand for?",
		correct_answers: ["Cascading Style Sheet"],
		incorrect_answers: [
			"Counter Strike: Source",
			"Corrective Style Sheet",
			"Computer Style Sheet",
		],
	},
	{
		category: "Science: Computers",
		type: "multiple",
		difficulty: "easy",
		question:
			"What is the code name for the mobile operating system Android 7.0?",
		correct_answers: ["Nougat"],
		incorrect_answers: ["Ice Cream Sandwich", "Jelly Bean", "Marshmallow"],
	},
	{
		category: "Science: Computers",
		type: "multiple",
		difficulty: "easy",
		question: "On Twitter, what is the character limit for a Tweet?",
		correct_answers: ["140"],
		incorrect_answers: ["120", "160", "100"],
	},
	{
		category: "Science: Computers",
		type: "boolean",
		difficulty: "easy",
		question: "Linux was first created as an alternative to Windows XP.",
		correct_answers: ["False"],
		incorrect_answers: ["True"],
	},
	{
		category: "Science: Computers",
		type: "multiple",
		difficulty: "easy",
		question:
			"Which programming language shares its name with an island in Indonesia?",
		correct_answers: ["Java"],
		incorrect_answers: ["Python", "C", "Jakarta"],
	},
];

const timer = {
	htmlElements: {
		timerElement: document.getElementById("circle"),
		timeDisplay: document.getElementById("time"),
	},
	totalSeconds: 0,
	currentSeconds: 0,
	intervalId: null,
	callBack: undefined,

	setCallBack(self, callBack) {
		self.callBack = callBack;
	},

	startTimer(self, seconds) {
		self.totalSeconds = seconds;
		self.currentSeconds = seconds;
		self.updateDisplay();
		self.updateAnimation();

		self.intervalId = setInterval(() => {
			self.currentSeconds--;
			self.updateDisplay();
			self.updateAnimation();

			if (self.currentSeconds <= 5)
				self.htmlElements.timerElement.classList.add("pulse");

			if (self.currentSeconds <= 0) {
				self.stopTimer(self);
				self.callBack();
			}
		}, 1000);
	},

	stopTimer(self) {
		clearInterval(self.intervalId);
		self.intervalId = null;
		self.htmlElements.timerElement.classList.remove("pulse");
		// Freeze the CSS animation
		self.htmlElements.timerElement.style.animationPlayState = "paused";
	},

	updateDisplay() {
		this.htmlElements.timeDisplay.textContent = this.currentSeconds;
	},

	updateAnimation() {
		const percentage = (this.currentSeconds / this.totalSeconds) * 100;
		this.htmlElements.timerElement.style.setProperty(
			"--percentage",
			percentage, // 100 - percentage to clockwise
		);
		this.htmlElements.timerElement.style.animationPlayState = "running"; // Restart the animation if it was paused
	},
};

const result = {
	minimum: 50,
	numberOfPoint: undefined,
	totalQuestion: undefined,
	correct: undefined,
	wrong: undefined,
	barColors: ["#D20094", "#0FF"],

	htmlElements: {
		correct: document.getElementById("correct"),
		countCorrect: document.getElementById("count-correct"),
		wrong: document.getElementById("wrong"),
		countWrong: document.getElementById("count-wrong"),
		totalQuestion: document.querySelectorAll(".total-question"),
		chart: document.getElementById("chart"),
		chartTextCorrect: document.querySelector(".chart-text-correct"),
		chartTextWrong: document.querySelector(".chart-text-wrong"),
	},

	init(numberOfPoint, totalQuestion) {
		this.correct = (numberOfPoint * 100) / totalQuestion;
		this.wrong = 100 - this.correct;
		this.numberOfPoint = numberOfPoint;
		this.totalQuestion = totalQuestion;
	},

	show() {
		this.htmlElements.countCorrect.textContent = this.numberOfPoint;
		this.htmlElements.countWrong.textContent =
			this.totalQuestion - this.numberOfPoint;
		this.htmlElements.totalQuestion.forEach(
			el => (el.textContent = this.totalQuestion),
		);
		this.htmlElements.correct.textContent = this.correct;
		this.htmlElements.wrong.textContent = this.wrong;

		new Chart(this.htmlElements.chart, {
			type: "doughnut",
			data: {
				datasets: [
					{
						backgroundColor: this.barColors,
						data: [this.wrong, this.correct],
						borderWidth: 0,
					},
				],
			},
			options: {
				responsive: true, // aggiunge la responsività
				maintainAspectRatio: false, // disabilita il mantenimento del rapporto di aspetto
				cutout: "70%", // Imposta la percentuale di taglio al 70%
				animation: {
					animateRotate: true, // abilita l'animazione di rotazione
					duration: 1500, // specifica la durata dell'animazione (1.5 sec)
				},
				plugins: {
					datalabels: {
						display: false, // nasconde le etichette sui segmenti
					},
				},
			},
		});

		if (this.correct > this.minimum)
			this.htmlElements.chartTextWrong.classList.add("hide");
		else this.htmlElements.chartTextCorrect.classList.add("hide");
	},
};

const quiz = {
	htmlElements: {
		sceneQuiz: document.getElementById("scene-quiz"),
		sceneResults: document.getElementById("scene-results"),
		confirmButton: document.getElementById("confirm"),
		answersContainer: document.getElementById("answers-container"),
		question: document.getElementById("question"),
		questionCounter: document.getElementById("question-counter"),
		totalQuestion: document.getElementById("total-question"),
	},
	activeQuestions: undefined,
	activeQuestion: undefined,
	activeQuestionIndex: 0,
	points: 0,
	questions: [...questions],
	numberOfQuestion: 5,
	timer,
	defaultSecond: 180,
	result,

	getRandomElements(array, numberElements) {
		if (numberElements === 0) return [];
		const randomIndex = Math.floor(Math.random() * array.length);
		return [
			array[randomIndex],
			...this.getRandomElements(
				array.filter(element => element !== array[randomIndex]),
				numberElements - 1,
			),
		];
	},

	// LISTENERS

	singleQuestionListener({ target: button }) {
		this.activeQuestion.allAnswers.forEach(({ button }) => {
			button.classList.remove("btn-answer--selected");
		});
		button.classList.add("btn-answer--selected");
	},

	multipleQuestionListener({ target: button }) {
		button.classList.toggle("btn-answer--selected");
	},

	submitQuestion() {
		this.timer.stopTimer(this.timer);
		this.updateScore();
		this.deleteActiveQuestion();
		if (this.activeQuestionIndex === this.activeQuestions.length)
			this.showResult();
		else {
			this.activeQuestion = this.activeQuestions[this.activeQuestionIndex];
			const seconds = this.buildActiveQuestion();
			this.timer.startTimer(this.timer, seconds);
			this.activeQuestionIndex++;
		}
	},

	// LOGIC

	selectQuestions(difficulty = "all") {
		const filterAll = () => true;
		const filterEasy = question => question.difficulty === "easy";
		const filterMedium = question => question.difficulty === "medium";
		const filterHard = question => question.difficulty === "hard";
		const filterEasyMedium = question =>
			filterEasy(question) || filterMedium(question);

		const getFilterByDifficulty = () => {
			switch (difficulty) {
				case "easy":
					return filterEasy;
				case "medium":
					return filterMedium;
				case "hard":
					return filterHard;
				case "easymedium":
					return filterEasyMedium;
				case "all":
				default:
					return filterAll;
			}
		};

		const availableQuestion = this.questions.filter(getFilterByDifficulty());
		this.activeQuestions = this.getRandomElements(
			availableQuestion,
			this.numberOfQuestion,
		);
	},

	buildActiveQuestion() {
		const mergedAnswers = [
			...Array.from(this.activeQuestion.correct_answers, correct_answer => ({
				text: correct_answer,
				correct: true,
			})),
			...Array.from(
				this.activeQuestion.incorrect_answers,
				incorrect_answer => ({
					text: incorrect_answer,
					correct: false,
				}),
			),
		];
		const allAnswers = this.getRandomElements(
			mergedAnswers,
			mergedAnswers.length,
		);
		allAnswers.forEach(answer => {
			switch (this.activeQuestion.type) {
				case "multiple":
					const button = document.createElement("button");
					button.innerText = answer.text;
					button.classList.add("btn-answer");
					button.addEventListener("click", e => {
						this.activeQuestion.correct_answers.length === 1
							? this.singleQuestionListener(e)
							: this.multipleQuestionListener(e);
					});
					answer.button = button;
					break;

				case "boolean":
					const radioContainer = document.createElement("div");
					radioContainer.classList.add("radio-container");

					const radio = document.createElement("input");
					radio.type = "radio";
					radio.id = answer.text.replace(/[^a-z]/g, "");
					radio.name = "booleanQuestion";

					const label = document.createElement("label");
					label.setAttribute("for", radio.id);
					label.innerText = answer.text;

					radioContainer.appendChild(radio);
					radioContainer.appendChild(label);
					answer.radio = radio;
					answer.radioContainer = radioContainer;
					break;

				default:
					console.log("switch answer type: error");
			}
		});

		this.activeQuestion.allAnswers = allAnswers;

		// display graphic
		this.htmlElements.questionCounter.innerText = this.activeQuestionIndex + 1;

		this.htmlElements.question.innerHTML = this.activeQuestion.question;

		this.htmlElements.answersContainer.className = "answers-container";
		switch (this.activeQuestion.type) {
			case "multiple":
				this.htmlElements.answersContainer.classList.add("multiple");
				break;
			case "boolean":
				this.htmlElements.answersContainer.classList.add("boolean");
				break;
			default:
				break;
		}

		const getElementToDisplay = answer => {
			switch (this.activeQuestion.type) {
				case "multiple":
					return answer.button;
				case "boolean":
					return answer.radioContainer;
				default:
					return null;
			}
		};
		allAnswers.forEach(answer => {
			this.htmlElements.answersContainer.appendChild(
				getElementToDisplay(answer),
			);
		});
		return this.activeQuestion.seconds ?? this.defaultSecond;
	},

	deleteActiveQuestion() {
		this.activeQuestion?.allAnswers.forEach(answer => {
			answer?.button?.remove();
			answer?.radioContainer?.remove();
		});
		this.htmlElements.question.innerHTML = "&nbsp;";
	},

	updateScore() {
		const rightAnswer = answers => {
			if (!answers) return false;
			if (!answers.length) return true;
			const correctIncluded = this.activeQuestion.correct_answers.includes(
				answers[0].text,
			);
			switch (this.activeQuestion.type) {
				case "multiple":
					if (
						answers[0].button.classList.contains("btn-answer--selected") !==
						correctIncluded
					)
						return false;
					break;
				case "boolean":
					if (answers[0].radio.checked !== correctIncluded) return false;
					break;
				default:
					return false;
			}

			return rightAnswer(answers.slice(1));
		};
		if (rightAnswer(this.activeQuestion?.allAnswers)) this.points++;
	},

	showResult() {
		this.htmlElements.sceneQuiz.classList.add("hide");
		this.htmlElements.sceneResults.classList.remove("hide");
		this.result.init(this.points, this.numberOfQuestion);
		this.result.show();
	},

	start() {
		this.selectQuestions("all");
		this.htmlElements.totalQuestion.innerText = this.activeQuestions.length;
		this.timer.setCallBack(this.timer, () => {
			this.submitQuestion();
		});
		this.htmlElements.confirmButton.addEventListener("click", () => {
			this.submitQuestion();
		});
		this.submitQuestion();
	},
};

quiz.start();
