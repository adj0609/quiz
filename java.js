const restartBtn = document.getElementById('restart');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const submitBtn= document.getElementById('submit');
const trueBtn= document.getElementById('True');
const falseBtn= document.getElementById('False');
const userScore= document.getElementById('user-score');
const questionText = document.getElementById('question-text');

let currentQuestion = 0;
var score = 0;

let question = [
    {
        question: "Do you know the muffin man?",
        answer: [
            {option:"Of Course",answer:true},
            {option:"No I'm Lame!",answer:false}
        ]

    },
    {
        question: "Does he live on Drury Lane",
        answer: [
            {option:"Yes",answer:true},
            {option:"That doesn't seem right",answer:false}
        ]
    },
    {    question:"Where is Drury Lane",
        answer: [
            {option:"London,",answer:true},
            {option:"Dublin",answer:false},
            {option:"Gotham",answer:false}
        ]
    }
]
        
        
 
        
        restartBtn.addEventLister ('click',restart);
        prevBtn.addEventListener('click',prev);
        nextBtn.addEventListener('click',next);
        submitBtn.addEventListener('click',submit);

function beginQuiz(){
    currentQuestion = 0;
    questionText.innerHTML = questions[currentQuestion].question;
    trueBtn.innerHTML = question[currentQuestion].question;
    trueBtn.onclick = () => {
        let ano=0;
        if(question[currentQuestion].answers[ano].answer){
            if(score<3){
                score++;
            }
        }
        userScore.innerHTML = score;
        if(currentquestion<2){
            next();
        }
    }
    falseBtn.innerHTML = questions[currentQuestion].answer[1].option;
falseBtn.onclick =() => {
    let ano=1;
    if(question[currentQuestion].answer[ano].answer){
        if(score<3){
            score++;
        }
    }
    userScore.innerHTML = score;
    if(currentQuestion<3){
        next();
    }
}
prevBtn.classList.add('hide');
}
beginQuiz();

function restart(){
    currentQuestion = 0;
    prevBtn.classlist.remove('hide');
    nextBtn.classlist.remove('hide');
    submitBtn.classlist.remove('hide');
    trueBtn.classlist.remove('hide');
    falseBtn.classlist.remove('hide');
    score = 0;
    userScore.innerHTML = score;
    beginQuiz();
}

function next(){
    currentQuestion++;
    if(currentQuestion>=2){
        nextBtn.classlist.add('hide');
        prevBtn.classList.remove('hide');
   }
questionText.innerHTML = question[currentQuestion].question;
trueBtn.innerHTML = question[currentQuestion].answers[0].option;
trueBtn.onclick = () => {
    let ano=0;
    if(question[currentQuestion].answer[ano].answer){
        if(score<3){
            score++;
            
        }
    }
}
userScore.innerHTML = score;
if(currentQuestion<2){
    next();
}

}
falseBtn.innerHTML = questsion[currentQuestion].answer[1].option;
falseBtn.onclick = () => {
    let ano=1;
    if(question[currentQuestion].answer[ano].answer){
        if(score<3){
            score++;
        }
    }
    userScore.innerHTML = score;
    if(currentQuestion<2){
        next();
    }
}
prevBtn.classList.remove('hide');

function prev(){
    currentQuestion--;
    if(currentQeustion<=0){
        prevBtn.classList.add('hide');
        nextBtn.classList.remove('hide');
    }
}
questionText.innerHTML = question[currentQuestion].question;
trueBtn.innerHTML = question[currentQuestion].answer[0].option;
trueBtn.onclick = () => {
    let ano=0;
    if(question[currentQuestion].answer[ano].answer){
        if(score<3){
            score++;
        }
    }
    userScore.innerHTML = score;
    if(currentQuestion<2){
        score++;
    }
}
falseBtn.innerHTML = question[currentQuestion].answers[1].option;
falseBtn.onclick = () => {
    let ano=1;
    if(question[currentQuestion].answers[ano].answer){
        if(score<3){
            next();
        }
    }
    nextBtn.classList.remove('hide');
}

function submit(){
    prevBtn.classList.add('hide');
    nextBtn.classlist.add('hide');
    submitBtn.classlist.add('hide');
    trueBtn.classlist.add('hide')
    falseBtn.classlist.add('hide');
    questionText.innerHTML = "Congratulations";
}