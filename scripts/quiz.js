"use strict";

const questions = [
	{
		category: "Science: Computers",
		type: "multiple",
		difficulty: "medium",
		question: "What does CPU stand for?",
		correct_answer: "Central Processing Unit",
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
		correct_answer: "Final",
		incorrect_answers: ["Static", "Private", "Public"],
	},
	{
		category: "Science: Computers",
		type: "boolean",
		difficulty: "medium",
		question: "The logo for Snapchat is a Bell.",
		correct_answer: "False",
		incorrect_answers: ["True"],
	},
	{
		category: "Science: Computers",
		type: "boolean",
		difficulty: "hard",
		question:
			"Pointers were not used in the original C programming language; they were added later on in C++.",
		correct_answer: "False",
		incorrect_answers: ["True"],
	},
	{
		category: "Science: Computers",
		type: "multiple",
		difficulty: "easy",
		question:
			"What is the most preferred image format used for logos in the Wikimedia database?",
		correct_answer: ".svg",
		incorrect_answers: [".png", ".jpeg", ".gif"],
	},
	{
		category: "Science: Computers",
		type: "multiple",
		difficulty: "easy",
		question: "In web design, what does CSS stand for?",
		correct_answer: "Cascading Style Sheet",
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
		correct_answer: "Nougat",
		incorrect_answers: ["Ice Cream Sandwich", "Jelly Bean", "Marshmallow"],
	},
	{
		category: "Science: Computers",
		type: "multiple",
		difficulty: "easy",
		question: "On Twitter, what is the character limit for a Tweet?",
		correct_answer: "140",
		incorrect_answers: ["120", "160", "100"],
	},
	{
		category: "Science: Computers",
		type: "boolean",
		difficulty: "easy",
		question: "Linux was first created as an alternative to Windows XP.",
		correct_answer: "False",
		incorrect_answers: ["True"],
	},
	{
		category: "Science: Computers",
		type: "multiple",
		difficulty: "easy",
		question:
			"Which programming language shares its name with an island in Indonesia?",
		correct_answer: "Java",
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

			if (self.currentSeconds <= 0) self.stopTimer(self);
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

const quiz = {
	htmlElements: {
		confirmButton: document.getElementById("confirm"),
	},
	activeQuestions: undefined,
	activeQuestion: undefined,
	points: 0,
	questions: [...questions],
	numberOfQuestion: 5,
	timer,

	// LISTENERS

	singleQuestionListener() {},

	multipleQuestionListener() {},

	submitQuestionListener() {
		// increment counter (activeQuestion)
		// deleteQuestion()
		// next()
		// if not last question : buildQuestion()
		// else showResult
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
		const getRandomElements = (array, numberElements) => {
			if (numberElements === 0) return [];
			const randomIndex = Math.floor(Math.random() * array.length);
			return [
				array[randomIndex],
				...getRandomElements(
					array.filter(element => element !== array[randomIndex]),
					numberElements - 1,
				),
			];
		};
		const availableQuestion = this.questions.filter(getFilterByDifficulty());
		this.activeQuestions = getRandomElements(
			availableQuestion,
			this.numberOfQuestion,
		);
	},

	buildQuestion(question) {},

	deleteQuestion(question) {},

	showResult() {
		// TODO: define how it works
	},

	start() {
		this.selectQuestions("hard");

		this.htmlElements.confirmButton.addEventListener("click", () => {
			if (this.timer.intervalId) this.timer.stopTimer(this.timer);
			else this.timer.startTimer(this.timer, 14);
		});
	},
};

quiz.start();
