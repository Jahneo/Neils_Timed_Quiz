// Quiz most have a high score 
//declare variables to store high score

var highScore = document.querySelector("#highScore");

// variables to reset or clear high score
var clear = document.querySelector("#clear");

//variable to restart quiz or Retake 
var reTake = document.querySelector("#reTake");

// on the click of the button the scores are reset/cleared from local storage
clear.addEventListener("click",function(){
    localStorage.clear();
    location.reload();
});

// call on the function to get all scores and intials to for Tabulate_High_Score page
var getScore = localStorage.getItem("getScore");
getScore=JSON.parse(getScore)

if(getScore !== null) {
    for (var i = 0; i < getScore.length; i++) {

        var highScoreList = document.createElement("list");
        highScoreList.textContent =  getScore[i].initials +   "   "   + getScore[i].score;
        highScore.appendChild(highScoreList);
    }
}

// function to append values to the list score list
reTake.addEventListener("click", function() {
    window.location.replace("./index.html");
});
