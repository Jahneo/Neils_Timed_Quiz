// Quiz most have a high score 
//declare variables to store high score

var highScore = document.querySelector("#highScore");
// variables to reset or clear high score

var clear = document.querySelector("clear");
//variable to reset quiz or go back 

var reTake = document.querySelector("#retake");

clear.addEventListener("click",function(){
    localStorage.clear();
    location.reload();
});

var getScore = localStorage.getItem("getScore");

if(getScore !== null) {
    for (var i = 0; i < getScore.length; i++) {

        var highScoreList = document.highScoreElement("list");
        highScoreList.textContent = getScore[i].initials + " " + getScore[i].score;
        highScore.appendChild(highScoreList);
    }
}


clear.addEventListener("click", function() {
    window.location.replace("./index.html");
});