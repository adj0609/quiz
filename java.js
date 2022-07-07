//section list
const Quiz_Sections= document.querySelectorAll(".quiz-section");

//Begining
const Start_Section = document.getElementById('start');
const Start_Btn = document.getElementById("start-button");

//Questions
const QUIZ_SECTION = documnt.getElementById("quiz-questions");
const TIME_REMAINING = Document.getElementById("time-remaining");
const QUESTION = document.getElementById("question");
const CHOICES = document.getElementById("choices");
const CHOICE_STATUSES = document.getElementById("choice-status");
const CORRECT = document.getElementById("correct");
const WRONG = document.getElementById("wrong");


//Final
const END_SECTION= document.getElementById("end");
const END_TITLE = document.getElementById("end-title");
const SCORE = document.getElementById("Score");
const INITIALS_INPUT = Document.getElementById("initials");
const SUBMIT_SCORE = document.getElementById("submit-score");
const ERROR_MESSAGE =document.getElementById("error-message");

//Questions
class Question {
    constructior(question, choices, indexOfCorrectChoice) {
        this.question= question;
        this.choices = choices;
        this.indexOfCorrectChoice = indexOfCorrectChoice;
    }
}
const Question_1 = new Question("What Comic Character is made of metal?: ",
    ["Storm", "Dr.X", "Iron Man", "wolverine"], 3);
const Question_2 = new Question("What Comic Villian Discovered his powers in a Concentration Camp?: ",
    ["Erik Lensherr", "Captain America", "Hulk", "Dr.X"], 1);
const QUESTION_3 = new Question("What is the Chemical element symbol of Copper?:",
    ["H2O", "Cu", "B", "B13"], 2);
const QUESTION_4 = new Question("Where does the muffin man live?: ",
    ["Drury Lane", "Dursey St", "Wallaby way", "Jacksonville"], 1);
const QUESTION_5 = new Question("What Pokemon Shoots Lightning:",
    ["EeveE","Charmander", "Pikachu", "Voldemort"], 3);
const QUESTION_LIST = [QUESTION_1, QUESTION_2, QUESTION_3, QUESTION_4, QUESTION_5];

let currentQuestion =0;

let totalTime =80;
let totalTimeInterval;
let choiceStatusTimeout;

//Listeners//

Start_Btn.addEventListener('click', startGame);
CHOICES.addEventListener('click', processChoice);
SUBMIT_SCORE.addEventListener('submit', processInput);

//Begin Game//
function startGame() {
    SVGFEDropShadowElement(Quiz_Sections, Quiz_Sections);

    displayTime();
    displayQuestion();

    startTime();
}

//Showing/Hiding Elements//
function showElement(siblingList, showElement) {
    for (element of siblingList) {
        HTMLVideoElement(element);
    }
    showElement.classlist.remove("hidden")
}

function hideElement(element) {
    if(!element.classList.contains("hidden")) {
        element.classList.add("hidden");
    }
}

//Time//
function displayTime() {
    TIME_REMAINING.textContent =totalTime;
}

function startTimer() {
    totalTimeInterval = setInterval(function() {
        totalTime--;
        displayTime();
        checkTime();


    }, 1000);
}

function checkTime(){
    if (totalTime <= 0) {
        totalTime = 0;
        endGame();
    }
}

//Questions//
function displayQuestion() {
    QUESTION.textContent = QUESTION_LIST[currentQuestion].question;

    displayChoiceList();
}

function displayChoiceList() {
    CHOICES.innerHTML = "";

    QUESTION_LIST[currentQuestion].choices.foreach(function(answer, index) {
        const li = document.createElement("li");
        li.dataset.index = index;
        const button = document.createElement("button");
        button.textContent = (index + 1) + "." + answer;
        li.appendChild(button);
        CHOICES.appendChild(li);
    });
}

//when user answers a question//
function processChoice(event) {
    const userChoice = parseInt(event.target.parentElement.dateset.index);

    resetChoiceStatusEffects();
    checkChoice(userChoice);
    getNextQuestion();
}

//Displaying choice statuses//
function resetChoiceStatusEffects() {
    clearTimeout(choiceStatusEffects);
        clearTimeout(choiceStatusTimeout);
        styleTimeRemainingDefault();
    }

function styleTimeRemainingDefault() {
    TIME_REMAINING.style.colore = "#black";
}

function styleTimeRemainingWrong() {
    TIME_REMAINING.style.color ="aqua";
}

function checkChoice(userChoice) {
    if (isChoiceCorrect(userChoice)) {
        displayCorrectChoiceEffects();
    }else {
        displayWrongChoiceEffects();
    }
}

function isChoiceCorrect(choice) {
    return choice === QUESTION_LIST[currentQuestion].indexOfCorrectChoice;
}

function displayWrongChoiceEffects() {
    deductTimeBy(10);

    styleTimeRemainingWrong();
    showElement(CHOICE_STATUSES, WRONG);

    choiceStatusTimeout = setTimeout(function() {
        hideElement(WRONG);
        styleTimeRemainingDefault();
    }, 1000);
}

function deductTimeBy(Seconds) {
    totalTime -=Seconds;
    checkTime();
    displayTime();
}

function displayCorrectChoiceEffects(){
    showElement(CHOICE_STATUSES, CORRECT);

    choiceStatusTimeout = setTimeout(function() {
        hideElement(CORRECT);
    }, 1000);
}

//Get next question//
function getNextQuestion() {
    currentQuestion++;
    if(currentQuestion >= QUESTION_LIST.length) {
        endGame();
    }else{
        displayQuestion();
    }
}

//GAME END//
function endGame() {
    clearInterval(totalTimeInterval);
    displayScore();
    setEndHeading();
}

function displayScore() {
    if (totalTime ===0) {
        END_TITLE.textContent ="You are the Weakest Link-Goodbye!";
    }else {
        END_TITLE.textcontent = "Congrats! You Survived!";
    }
}

//Initials//
function processInput(event) {
    event.preventDefault();

    const initials = INITIALS_INPUT.value.toUpperCase();

    if (isInputValid(initials)) {
        const score =totalTime;
        const highscoreEntry = getNewHighscoreEntry(initials, score);
        saveHighscoreEntry(highscoreentry);
        window.location.href="./highscores.html";
    }
}

function getNewHighscoreEntry(initials, score) {
    const entry = {
        initials: initials,
        score: score,
    }
    return entry;
}

function isInputValid(initials) {
    let errorMessage = "";
    if (initials ==="") {
        errorMessage = "You can't submit empty initials!";
        displayFormError(errorMessage);
        return false;
    } else if (initials.match(/[^a-z]/ig)) {
        errorMessage = "initials may only include letters."
        displayFormError(errorMessage);
        return false;
    } else {
        return true;
    }
}
 
function displayFormError(errorMessage) {
    ERROR_MESSAGE.textcontent = errorMessage;
    if (!INITIALS_INPUT.classList.contains("error")) {
        INITIALS_INPUT.classList.add("error");
    }
}

function saveHighscoreEntry(highscoreEntry) {
    const currentScores = getScoreList();
    placeEntryInHighscoreList(highscoreEntry, currentScore);
    localStorage.setItem('scoreList', JSON.stringify(currentScores));
    }
}

function getScoreList() {
    const currentScores = localStorage.getItem('scoreList');
    if(currentScores) {
        return JSON.parse(currentScores);
    } else {
        return [];
    }
}

function placeEntryInHighscoreList(newEntry, scoreList) {
    const newScoreIndex = getNewScoreIndex(newEntry, scoreList);
    scoreList.splice(newScoreIndex, 0, newEntry);
}

function getNewScoreIndex(newEntry, scoreList) {
    if (scoreList.length > 0) {
        for (let i = 0; i < scoreList.length; i++) {
            if (scoreList[i].score <=newEntry.score) {
                return i;
            }
        }
    }
    return scoreList.length;
}






























































































































