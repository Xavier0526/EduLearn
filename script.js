let currentquestionIndexmath = 0;
let questionsmath = [];
let scoremath = 0;
let correctmath = 0;
let wrongmath = 0;


function findQuiz(quizId) {
    document.querySelectorAll(".quiz").forEach(quiz => {
        quiz.classList.remove("current");
    });
    document.getElementById(quizId).classList.add("current");
}

function goHome() { // go back to quizzes page
    findQuiz("quizzespage");
}

// Function to fetch Qns from API (Math)
async function fetchquestionsmath(){
    try{
        const response = await fetch(
            "https://opentdb.com/api.php?amount=10&category=19&type=multiple"
        );
        const data = await response.json();
        questionsmath = data.results; // store fetch questions in array
        displayquestionmath(); //Display first Qns
    } catch (error) {
        console.log("Error fetching questions", error); // Log errors that occur during fetching
    }
}

//Function to display the current Qns & its multiple choices
function displayquestionmath(){
    const questionElementmath = document.getElementById("questionmath");
    const choicesElementmath = document.getElementById("choicesmath");
    const currentquestionmath = questionsmath[currentquestionIndexmath];

    // Display Qns
    questionElementmath.innerHTML = currentquestionmath.question;
    choicesElementmath.innerHTML = ""; //Clear any previous choice from HTML

    //Display incorrect choices as buttons and assign even listener to each for checking of answer
    currentquestionmath.incorrect_answers.forEach((choice) => {
        const choiceButton = document.createElement("button");
        choiceButton.textContent = choice;
        choiceButton.classList.add("choice-btn");
        choiceButton.onclick = () => checkAnswermath(choice);
        choicesElementmath.appendChild(choiceButton);
    })

    //Display correct choices and assign event listener to each for checking of answer
    const correctmathChoiceButton = document.createElement("button");
    correctmathChoiceButton.textContent = currentquestionmath.correct_answer;
    correctmathChoiceButton.classList.add("choice-btn");
    correctmathChoiceButton.onclick = () => checkAnswermath(currentquestionmath.correct_answer);
    choicesElementmath.appendChild(correctmathChoiceButton);
}

function checkAnswermath(choice) {
    const resultElementmath = document.getElementById("resultmath");
    const currentquestionmath = questionsmath[currentquestionIndexmath];

    if(choice === currentquestionmath.correct_answer){
        resultElementmath.textContent = "Correct";
        scoremath++;
        correctmath++;
    } else {
        resultElementmath.textContent = "Incorrect";
        wrongmath++;
    }
    setTimeout(nextquestionmath, 1000);
}

// Function to move to the next Qns or restart when end
function nextquestionmath(){
    const resultElementmath = document.getElementById("resultmath");
    resultElementmath.textContent = ""; // Clear any old result messages

    currentquestionIndexmath++; //moving to next Qns
    if(currentquestionIndexmath < questionsmath.length){
        displayquestionmath() // Display the next Qns if have
    } else {
        alert(`Your Score: ${scoremath} / ${questionsmath.length} \nCorrect: ${correctmath} Wrong: ${wrongmath} \nTry Again?`);
        currentquestionIndexmath = 0; //Reset the question when new sets of quiz starts again
        scoremath = 0; // Reset the score when new sets of quiz starts
        correctmath = 0; // Reset correct questions when new sets of quiz starts
        wrongmath = 0; // Reset wrong questions when new sets of quiz starts
        fetchquestionsmath(); // Restarts the quiz by fetching new questions
    }
}

fetchquestionsmath(); //load to start the quiz again


let currentquestionIndexsci = 0;
let questionssci = [];
let scoresci = 0;
let correctsci = 0;
let wrongsci = 0;


// Function to fetch Qns from API (Science)
async function fetchquestionssci(){
    try{
        const response = await fetch(
            "https://opentdb.com/api.php?amount=10&category=17&type=multiple"
        );
        const data = await response.json();
        questionssci = data.results; // store fetch questions in array
        displayquestionsci(); //Display first Qns
    } catch (error) {
        console.log("Error fetching questions", error); // Log errors that occur during fetching
    }
}

//Function to display the current Qns & its multiple choices
function displayquestionsci(){
    const questionElementsci = document.getElementById("questionsci");
    const choicesElementsci = document.getElementById("choicessci");
    const currentquestionsci = questionssci[currentquestionIndexsci];

    // Display Qns
    questionElementsci.innerHTML = currentquestionsci.question;
    choicesElementsci.innerHTML = ""; //Clear any previous choice from HTML

    //Display incorrect choices as buttons and assign even listener to each for checking of answer
    currentquestionsci.incorrect_answers.forEach((choice) => {
        const choiceButton = document.createElement("button");
        choiceButton.textContent = choice;
        choiceButton.classList.add("choice-btn");
        choiceButton.onclick = () => checkAnswersci(choice);
        choicesElementsci.appendChild(choiceButton);
    })

    //Display correct choices and assign event listener to each for checking of answer
    const correctsciChoiceButton = document.createElement("button");
    correctsciChoiceButton.textContent = currentquestionsci.correct_answer;
    correctsciChoiceButton.classList.add("choice-btn");
    correctsciChoiceButton.onclick = () => checkAnswersci(currentquestionsci.correct_answer);
    choicesElementsci.appendChild(correctsciChoiceButton);
}

function checkAnswersci(choice) {
    const resultElementsci = document.getElementById("resultsci");
    const currentquestionsci = questionssci[currentquestionIndexsci];

    if(choice === currentquestionsci.correct_answer){
        resultElementsci.textContent = "Correct";
        scoresci++;
        correctsci++;
    } else {
        resultElementsci.textContent = "Incorrect";
        wrongsci++;
    }
    setTimeout(nextquestionsci, 1000);
}

// Function to move to the next Qns or restart when end
function nextquestionsci(){
    const resultElementsci = document.getElementById("resultsci");
    resultElementsci.textContent = ""; // Clear any old result messages

    currentquestionIndexsci++; //moving to next Qns
    if(currentquestionIndexsci < questionssci.length){
        displayquestionsci() // Display the next Qns if have
    } else {
        alert(`Your Score: ${scoresci} / ${questionssci.length} \nCorrect: ${correctsci} Wrong: ${wrongsci} \nTry Again?`);
        currentquestionIndexsci = 0; //Reset the question when new sets of quiz starts again
        scoresci = 0; // Reset the score when new sets of quiz starts
        correctsci = 0; // Reset correct questions when new sets of quiz starts
        wrongsci = 0; // Reset wrong questions when new sets of quiz starts
        fetchquestionssci(); // Restarts the quiz by fetching new questions
    }
}

fetchquestionssci(); //load to start the quiz again



