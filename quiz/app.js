const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            { text: "Blue whale", correct: true },
            { text: "Shark", correct: false },
            { text: "giraffe", correct: false },
            { text: "ELephant", correct: false },
        ]
    },
    {
        question: "Which is the smallest animal in the world?",
        answers: [
            { text: "Shark", correct: false },
            { text: " Etruscan shrew", correct: true },
            { text: "giraffe", correct: false },
            { text: "ELephant", correct: false },
        ]
    },
    {
        question: "Which is the smallest continent in the world?",
        answers: [
            { text: "antarctica", correct: false },
            { text: "asia", correct: false },
            { text: "Australia", correct: true },
            { text: "africa", correct: false },
        ]
    },
    {
        question: "Which is the largest continent in the world?",
        answers: [
            { text: "africa", correct: false },
            { text: "north america", correct: false },
            { text: "europe", correct: false },
            { text: "asia", correct: true },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerBtn = document.getElementById("answer-buttons");
const nextBtn = document.getElementById("next-btn");

let CurrentQnIdx = 0;
let score = 0;


function startQuiz() {
    CurrentQnIdx = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQn();

}

function showQn() {
    resetState();

    let currentQn = questions[CurrentQnIdx];
    let QnNo = CurrentQnIdx + 1;
    questionElement.innerHTML = QnNo + ". " + currentQn.question;



    currentQn.answers.forEach(answers => {
        const button = document.createElement("button");
        button.innerHTML = answers.text;
        button.classList.add("btn");
        answerBtn.appendChild(button);
        if (answers.correct) {
            button.dataset.correct = answers.correct;
        }

        button.addEventListener("click", selectAnswer);

    });

}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    }
    else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerBtn.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;


    });
    nextBtn.style.display = "block";
}


function resetState() {
    nextBtn.style.display = "none";
    while (answerBtn.firstChild) {
        answerBtn.removeChild(answerBtn.firstChild)
    }
}

nextBtn.addEventListener("click",()=>{
    if(CurrentQnIdx<questions.length){
        handleNextBtn();
    }
    else{
        startQuiz();
    }
})

function handleNextBtn(){
    CurrentQnIdx++;
    if(CurrentQnIdx<questions.length){
        showQn();
    }
    else{
        showScore();
    }
}

function showScore(){
    resetState();
    questionElement.innerHTML=`You Scored ${score} out of ${questions.length}`;
    nextBtn.innerHTML="Play Again";
    nextBtn.style.display="block";
}
startQuiz();

