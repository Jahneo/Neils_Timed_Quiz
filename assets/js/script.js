// Formulating the test question and have the answer to prompt user if there anwers is wrong or correct
var questions = [{
    question: "1. Commonly used data types DO NOT include :?",
    choices: ["1. strings", "2. boolean", "3. alert", "4. number"],
    correctAnswer: "3. alert"
  
}, {
    question: "2. The condition in an if / else statement is enclosed within ___ .",
    choices: ["1. quotes",  "2. curly brackets", "3. parenthesis", "4. square brackets"],
    correctAnswer: "3. parenthesis"
}, {
   question: "3. Arrays in Javascript can be used to store ____.",
    choices: ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all the above"],
    correctAnswer: "4. all the above"
}, {
    question: "4. String values must be enclosed within ____ when being assigned to variables.",
    choices: ["1. commas", "2. curly brackets", "3. quotes", "4. parenthesis"],
    correctAnswer: "3. quotes"
}, {
    question: "5. A very useful tool for used during development and debugging for printing content to the debugger is;",
    choices: ["1. JavaScript", "2. terminal / bash", "3. for loops", "4. console.log "],
    correctAnswer: "4. console.log "
}];
// Declared variables
var score = 0;
var questionIndex = 0;

// Start to test response and tabulated codes
// Declared variables
var currentTime = document.querySelector("#currentTime");
var timer = document.querySelector("#startTime");
var questionsDiv = document.querySelector("#questionsDiv");
var wrapper = document.querySelector("#wrapper");

// Seconds left is 10 seconds per question:
var secondsLeft = 76;
// Holds interval time
var holdInterval = 0;
// Holds penalty time
var penalty = 10;
// Creates new element
var ulCreate = document.createElement("ul");

// Triggers timer on button, shows user a display on the screen
timer.addEventListener("click", function () {
    // We are checking zero because its originally set to zero
    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            secondsLeft--;
            currentTime.textContent = "Time: " + secondsLeft;

            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                allDone();
                currentTime.textContent = "Time's up!";
            }
        }, 1000);
    }
    render(questionIndex);
});

// Renders questions and choices to page: 
function render(questionIndex) {
    // Clears existing data 
    questionsDiv.innerHTML = "";
    ulCreate.innerHTML = "";
    // For loops to loop through all info in array
    for (var i = 0; i < questions.length; i++) {
        // Appends question only
        var userQuestion = questions[questionIndex].question;
        var userChoices = questions[questionIndex].choices;
        questionsDiv.textContent = userQuestion;
    }
    // New for each for question choices
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionsDiv.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}
// Event to compare choices with answer
function compare(event) {
    var element = event.target;

    if (element.matches("li")) {

        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        // Correct condition 
        if (element.textContent == questions[questionIndex].correctAnswer) {
            score++;
            createDiv.textContent = "Correct!";
            // Correct condition 
        } else {
            // Will deduct -10 seconds for wrong answers
            secondsLeft = secondsLeft - penalty;
            createDiv.textContent = "Wrong!";
        }

    }
    // Question Index determines number question user is on
    questionIndex++;

    if (questionIndex >= questions.length) {
        // All done will append last page with user stats
        allDone();
        createDiv.textContent = "End of quiz!" + " " + "You got  " + score + "/" + questions.length + " Correct!";
    } else {
        render(questionIndex);
    }
    questionsDiv.appendChild(createDiv);

}
// All done will append last page
function allDone() {
    questionsDiv.innerHTML = "";
    currentTime.innerHTML = "";

    // Heading:
    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "All Done!"

    questionsDiv.appendChild(createH1);

    // Paragraph
    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    questionsDiv.appendChild(createP);

    // Calculates time remaining and replaces it with score
    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        createP.textContent = "Your final score is: " + timeRemaining;

        questionsDiv.appendChild(createP2);
    }

    // Label
    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials: ";

    questionsDiv.appendChild(createLabel);

    // input
    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = " ";

    questionsDiv.appendChild(createInput);

    // submit
    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";
    
    questionsDiv.appendChild(createSubmit);
    var initials = createInput.value;
    // Event listener to capture initials and local storage for initials and score
    
    createSubmit.addEventListener("click", function () {
        var initials = createInput.value;
        if (initials === null) {
            console.log("No value entered!");

        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            console.log(finalScore);
            var getScore = localStorage.getItem("getScore");
            if (getScore === null) {
                getScore = [];
            } else {
                getScore = JSON.parse(getScore);
            }
            console.log(finalScore);
            getScore.push(finalScore);
            var newScore = JSON.stringify(getScore);
            localStorage.setItem("getScore", newScore);
            // Travels to final page
            window.location.replace("./Tabulated_High_Score.html");
        }
    });

}