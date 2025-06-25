document.addEventListener('DOMContentLoaded', () => {

    const startBtn = document.getElementById("start-btn");
    const nextBtn = document.getElementById("next-btn");
    const restartBtn = document.getElementById("restart-btn");
    const questionContainer = document.getElementById("question-container");
    const questionText = document.getElementById("question-text");
    const choiceList = document.getElementById("choice-list");
    const resultContainer = document.getElementById("result-container");
    const scoreDisplay = document.getElementById("score");
    const noteDisplay = document.getElementById("note");

    const questions = [

        {
            question: "Which of the Planet is famously known as Red-Planet?",
            choices: ["Mars", "Earth", "Saturn", "Venus"],
            answer: "Mars"
        },
        {
            question: "What is Capital of France?",
            choices: ["New York", "Paris", "London", "Wimbeldon"],
            answer: "Paris"
        },
        {
            question: "Who is world's richest man currently?",
            choices: ["Mukesh Ji", "Mark Ji", "Bill Ji", "Elon Ji"],
            answer: "Elon Ji"
        }

    ];

    let currentQuestionIndex = 0;
    let score = 0;

    startBtn.addEventListener('click', startQuiz);

    nextBtn.addEventListener('click', nextQuestion);

    restartBtn.addEventListener('click', restartQuiz);

    function startQuiz() {
        noteDisplay.classList.add("hidden");
        startBtn.classList.add("hidden");
        resultContainer.classList.add("hidden");
        questionContainer.classList.remove("hidden");
        showQuestion();
    }

    function showQuestion() {
        nextBtn.classList.add("hidden");
        questionText.textContent = questions[currentQuestionIndex].question;
        choiceList.innerHTML = "";
        questions[currentQuestionIndex].choices.forEach(choice => {
            const li = document.createElement("li");
            li.textContent = choice;
            li.addEventListener('click', () => selectAnswer(choice));
            choiceList.appendChild(li);
        });
    }

    function selectAnswer(choice) {
        nextBtn.classList.remove("hidden");
        if(choice === questions[currentQuestionIndex].answer) {
            score++;
        }
        else {score--};
    }

    function nextQuestion() {
        currentQuestionIndex++;
        if(currentQuestionIndex < questions.length) {
            showQuestion();
        }
        else {
            showResult();
        }
    }

    function showResult() {
        questionContainer.classList.add("hidden");
        resultContainer.classList.remove("hidden");
        scoreDisplay.textContent = `${score} out of ${questions.length}`;
    }

    function restartQuiz() {
        resultContainer.classList.add("hidden");
        currentQuestionIndex = 0;
        score = 0;
        startQuiz();
    }
})