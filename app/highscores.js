const highScores=JSON.parse(localStorage.getItem('highScores')) || [];
const highScoresList=document.getElementById('highScoresList');
highScoresList.innerHTML= highScores.map(scores => { return `<li class="high-scores">${scores.name} - ${scores.score}</li>`; }).join("");

console.log(highScoresList);

highScores.forEach(element => {console.log(element);
    
});
