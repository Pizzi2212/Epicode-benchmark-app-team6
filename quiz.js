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
	duration: undefined,
	timeLeft: undefined,
	timerInterval: undefined,
	radius: undefined,
	circumference: undefined,

	htmlElements: {
		circle: document.querySelector(".foreground-circle"),
		timeDisplay: document.getElementById("time"),
		startButton: document.getElementById("start-btn"),
	},

	startTimerLister(e, self) {
		e.preventDefault();
		self.startTimer();
	},

	updateTimer(self) {
		// Update the text display
		self.htmlElements.timeDisplay.textContent = self.timeLeft;

		// Stop when the timer reaches 0
		if (self.timeLeft <= 1) clearInterval(self.timerInterval);

		// Calculate how much of the circle should be visible
		self.htmlElements.circle.style.strokeDashoffset =
			self.circumference -
			((self.timeLeft - 1) / self.duration) * self.circumference;

		self.timeLeft--;
	},

	startTimer() {
		this.timeLeft = this.duration; // Reset the time left
		this.htmlElements.circle.style.strokeDashoffset = 0; // Reset the circle
		this.htmlElements.timeDisplay.textContent = this.timeLeft; // Reset the time display

		// Start the countdown
		this.timerInterval = setInterval(() => this.updateTimer(this), 1000);
	},

	init(duration) {
		this.duration = duration;
		this.timeLeft = duration;

		// Set the circumference of the circle (2 * Math.PI * radius)
		this.radius = this.htmlElements.circle.r.baseVal.value;
		this.circumference = 2 * Math.PI * this.radius;

		// Initial stroke dash offset
		this.htmlElements.circle.style.strokeDasharray = this.circumference;
		this.htmlElements.circle.style.strokeDashoffset = 0;
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

	buildQuestion(question) {
		this.selectQuestions();
		const currentQuestion = document.getElementById("question");
		const answerContainer = document.getElementById("answers-container");
		const answers = [];
		for (let i = 0; i < questions.length; i++) {
			answers.push(questions[i].correct_answer);
			answers.push(questions[i].incorrect_answers);
		}
	},

	deleteQuestion(question) {},

	showResult() {
		// TODO: define how it works
	},

	start() {
		this.timer.init(10);
		// this.activeQuestion = this.selectQuestions();
		this.selectQuestions("hard");
		console.log(this.activeQuestions);
		this.htmlElements.confirmButton.addEventListener("click", e => {
			this.timer.startTimerLister(e, this.timer);
		});
	},
};

quiz.start();
