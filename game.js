var question=document.getElementById('question');
var choice=Array.from(document.getElementsByClassName('choice-text'));
var progeressBarText=document.getElementById('progressText');
var scoreText=document.getElementById('score');
var progressBarFullStyle=document.getElementById('progressBarFull');
var loaderhide=document.getElementById("loader");
const gameersrt=document.getElementById('game');

var currQues=0;
let acceptAnswer=false;
let score=0;
let quesCounter=0;
let availQuestions=[];

let questions=[];
fetch("questions.json")
    .then( res =>{
        return res.json();
    })
    .then(loadedQues =>{
        questions = loadedQues;
        startGame();
    })
    .catch(err =>{
        console.error(err);
    });
    


let maxQues=3;
let scoreBonus=10;

startGame= ()=>{
    score=0;
    quesCounter=0;
    availQuestions=[...questions];
    gameersrt.classList.remove('hidden');
    loaderhide.classList.add('hidden');
    getQuestion();
}
getQuestion=()=>{
    if(availQuestions.length===0 || quesCounter>=maxQues){
        localStorage.setItem('mostRecentScore',score);
        return window.location.assign('/end.html');
    }
    quesCounter++;
    progressBarFullStyle.style.width=`${(quesCounter/maxQues)*100}%`;
    progeressBarText.innerText=`Question${quesCounter}/${maxQues}`;
    let quesIndex=Math.floor(Math.random()*availQuestions.length);
    currQues=availQuestions[quesIndex];
    question.innerText=currQues.question;
    choice.forEach(currChoice =>{
        const choiceNumber = currChoice.dataset['number'];
        currChoice.innerText=currQues['choice'+choiceNumber];
    })
    availQuestions.splice(quesIndex,1);
    acceptAnswer=true;

}
choice.forEach(currChoice =>{
    currChoice.addEventListener('click',e =>{
        if(!acceptAnswer)  return;
        acceptAnswer=false;
        let selectChoice=e.target;
        let selectAns=selectChoice.dataset['number'];
        console.log(selectAns==currQues.answer);

        let result=(selectAns==currQues.answer)?'correct':'incorrect';

        if(result === 'correct'){
            incrementScore(scoreBonus);
        }
        currChoice.parentElement.classList.add(result);
       setTimeout(() => {
            currChoice.parentElement.classList.remove(result);
            getQuestion();
        
       },1000); 

    })
})

incrementScore = (inc) => {
    score+=inc;
    scoreText.innerText=score;
}

