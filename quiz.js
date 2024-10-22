"use strict";

const questions = [
	{},
	// ....
];

const quiz = {
	htmlElements: {},
	activeQuestions: undefined,
	activeQuestion: undefined,
	points: 0,

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

	selectQuestions(difficulty = "all") {},

	buildQuestion(question) {},

	deleteQuestion(question) {},

	showResult() {
		// TODO: define how it works
	},

	start() {},
};
