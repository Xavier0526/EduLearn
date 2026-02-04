function findQuiz(quizId) {
    document.querySelectorAll(".quiz").forEach(quiz => {
        quiz.classList.remove("current");
    });
    document.getElementById(quizId).classList.add("current");
}

function goHome() { // go back to quizzes page
    findQuiz("quizzespage");
}

function prepQuiz(type) {
    findQuiz(type);
    switch(type) {
        case "history": fetchquestionshis(); break;
        case "math": fetchquestionsmath(); break;
        case "science": fetchquestionsci(); break;
        case "geography": fetchquestionsgeo(); break;
        case "general": fetchquestionsgen(); break;
        case "animemanga": fetchquestionsam(); break;
    }
}

let currentquestionIndexhis = 0;
let questionshis = [];
let scorehis = 0;
let correcthis = 0;
let wronghis = 0;

// Function to fetch Qns from API (History)
async function fetchquestionshis(){
    try{
        const response = await fetch(
            "https://opentdb.com/api.php?amount=10&category=23&type=multiple"
        );
        const data = await response.json();
        questionshis = data.results; // store fetch questions in array
        displayquestionhis(); //Display first Qns
    } catch (error) {
        console.log("Error fetching questions", error); // Log errors that occur during fetching
    }
}

//Function to display the current Qns & its multiple choices
function displayquestionhis(){
    const questionElementhis = document.getElementById("questionhis");
    const choicesElementhis = document.getElementById("choiceshis");
    const currentquestionhis = questionshis[currentquestionIndexhis];

    // Display Qns
    questionElementhis.innerHTML = currentquestionhis.question;
    choicesElementhis.innerHTML = ""; //Clear any previous choice from HTML

    //Display incorrect choices as buttons and assign even listener to each for checking of answer
    currentquestionhis.incorrect_answers.forEach((choice) => {
        const choiceButton = document.createElement("button");
        choiceButton.textContent = choice;
        choiceButton.classList.add("choice-btn");
        choiceButton.onclick = () => checkAnswerhis(choice);
        choicesElementhis.appendChild(choiceButton);
    })

    //Display correct choices and assign event listener to each for checking of answer
    const correcthisChoiceButton = document.createElement("button");
    correcthisChoiceButton.textContent = currentquestionhis.correct_answer;
    correcthisChoiceButton.classList.add("choice-btn");
    correcthisChoiceButton.onclick = () => checkAnswerhis(currentquestionhis.correct_answer);
    choicesElementhis.appendChild(correcthisChoiceButton);
}

function checkAnswerhis(choice) {
    const resultElementhis = document.getElementById("resulthis");
    const currentquestionhis = questionshis[currentquestionIndexhis];

    if(choice === currentquestionhis.correct_answer){
        resultElementhis.textContent = "Correct";
        scorehis++;
        correcthis++;
    } else {
        resultElementhis.textContent = "Incorrect";
        wronghis++;
    }
    setTimeout(nextquestionhis, 1000);
}

// Function to move to the next Qns or restart when end
function nextquestionhis(){
    const resultElementhis = document.getElementById("resulthis");
    resultElementhis.textContent = ""; // Clear any old result messages

    currentquestionIndexhis++; //moving to next Qns
    if(currentquestionIndexhis < questionshis.length){
        displayquestionhis() // Display the next Qns if have
    } else {
        alert(`Your Score: ${scorehis} / ${questionshis.length} \nCorrect: ${correcthis} Wrong: ${wronghis} \nTry Again?`);
        currentquestionIndexhis = 0; //Reset the question when new sets of quiz starts again
        scorehis = 0; // Reset the score when new sets of quiz starts
        correcthis = 0; // Reset correct questions when new sets of quiz starts
        wronghis = 0; // Reset wrong questions when new sets of quiz starts
        fetchquestionshis(); // Restarts the quiz by fetching new questions
    }
}

let currentquestionIndexmath = 0;
let questionsmath = [];
let scoremath = 0;
let correctmath = 0;
let wrongmath = 0;

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


let currentquestionIndexgeo = 0;
let questionsgeo = [];
let scoregeo = 0;
let correctgeo = 0;
let wronggeo = 0;


// Function to fetch Qns from API (Geography)
async function fetchquestionsgeo(){
    try{
        const response = await fetch(
            "https://opentdb.com/api.php?amount=10&category=22&type=multiple"
        );
        const data = await response.json();
        questionsgeo = data.results; // store fetch questions in array
        displayquestiongeo(); //Display first Qns
    } catch (error) {
        console.log("Error fetching questions", error); // Log errors that occur during fetching
    }
}

//Function to display the current Qns & its multiple choices
function displayquestiongeo(){
    const questionElementgeo = document.getElementById("questiongeo");
    const choicesElementgeo = document.getElementById("choicesgeo");
    const currentquestiongeo = questionsgeo[currentquestionIndexgeo];

    // Display Qns
    questionElementgeo.innerHTML = currentquestiongeo.question;
    choicesElementgeo.innerHTML = ""; //Clear any previous choice from HTML

    //Display incorrect choices as buttons and assign even listener to each for checking of answer
    currentquestiongeo.incorrect_answers.forEach((choice) => {
        const choiceButton = document.createElement("button");
        choiceButton.textContent = choice;
        choiceButton.classList.add("choice-btn");
        choiceButton.onclick = () => checkAnswergeo(choice);
        choicesElementgeo.appendChild(choiceButton);
    })

    //Display correct choices and assign event listener to each for checking of answer
    const correctgeoChoiceButton = document.createElement("button");
    correctgeoChoiceButton.textContent = currentquestiongeo.correct_answer;
    correctgeoChoiceButton.classList.add("choice-btn");
    correctgeoChoiceButton.onclick = () => checkAnswergeo(currentquestiongeo.correct_answer);
    choicesElementgeo.appendChild(correctgeoChoiceButton);
}

function checkAnswergeo(choice) {
    const resultElementgeo = document.getElementById("resultgeo");
    const currentquestiongeo = questionsgeo[currentquestionIndexgeo];

    if(choice === currentquestiongeo.correct_answer){
        resultElementgeo.textContent = "Correct";
        scoregeo++;
        correctgeo++;
    } else {
        resultElementgeo.textContent = "Incorrect";
        wronggeo++;
    }
    setTimeout(nextquestiongeo, 1000);
}

// Function to move to the next Qns or restart when end
function nextquestiongeo(){
    const resultElementgeo = document.getElementById("resultgeo");
    resultElementgeo.textContent = ""; // Clear any old result messages

    currentquestionIndexgeo++; //moving to next Qns
    if(currentquestionIndexgeo < questionsgeo.length){
        displayquestiongeo() // Display the next Qns if have
    } else {
        alert(`Your Score: ${scoregeo} / ${questionsgeo.length} \nCorrect: ${correctgeo} Wrong: ${wronggeo} \nTry Again?`);
        currentquestionIndexgeo = 0; //Reset the question when new sets of quiz starts again
        scoregeo = 0; // Reset the score when new sets of quiz starts
        correctgeo = 0; // Reset correct questions when new sets of quiz starts
        wronggeo = 0; // Reset wrong questions when new sets of quiz starts
        fetchquestionsgeo(); // Restarts the quiz by fetching new questions
    }
}

let currentquestionIndexgen = 0;
let questionsgen = [];
let scoregen = 0;
let correctgen = 0;
let wronggen = 0;


// Function to fetch Qns from API (General Knowledge)
async function fetchquestionsgen(){
    try{
        const response = await fetch(
            "https://opentdb.com/api.php?amount=10&category=9&type=multiple"
        );
        const data = await response.json();
        questionsgen = data.results; // store fetch questions in array
        displayquestiongen(); //Display first Qns
    } catch (error) {
        console.log("Error fetching questions", error); // Log errors that occur during fetching
    }
}

//Function to display the current Qns & its multiple choices
function displayquestiongen(){
    const questionElementgen = document.getElementById("questiongen");
    const choicesElementgen = document.getElementById("choicesgen");
    const currentquestiongen = questionsgen[currentquestionIndexgen];

    // Display Qns
    questionElementgen.innerHTML = currentquestiongen.question;
    choicesElementgen.innerHTML = ""; //Clear any previous choice from HTML

    //Display incorrect choices as buttons and assign even listener to each for checking of answer
    currentquestiongen.incorrect_answers.forEach((choice) => {
        const choiceButton = document.createElement("button");
        choiceButton.textContent = choice;
        choiceButton.classList.add("choice-btn");
        choiceButton.onclick = () => checkAnswergen(choice);
        choicesElementgen.appendChild(choiceButton);
    })

    //Display correct choices and assign event listener to each for checking of answer
    const correctgenChoiceButton = document.createElement("button");
    correctgenChoiceButton.textContent = currentquestiongen.correct_answer;
    correctgenChoiceButton.classList.add("choice-btn");
    correctgenChoiceButton.onclick = () => checkAnswergen(currentquestiongen.correct_answer);
    choicesElementgen.appendChild(correctgenChoiceButton);
}

function checkAnswergen(choice) {
    const resultElementgen = document.getElementById("resultgen");
    const currentquestiongen = questionsgen[currentquestionIndexgen];

    if(choice === currentquestiongen.correct_answer){
        resultElementgen.textContent = "Correct";
        scoregen++;
        correctgen++;
    } else {
        resultElementgen.textContent = "Incorrect";
        wronggen++;
    }
    setTimeout(nextquestiongen, 1000);
}

// Function to move to the next Qns or restart when end
function nextquestiongen(){
    const resultElementgen = document.getElementById("resultgen");
    resultElementgen.textContent = ""; // Clear any old result messages

    currentquestionIndexgen++; //moving to next Qns
    if(currentquestionIndexgen < questionsgen.length){
        displayquestiongen() // Display the next Qns if have
    } else {
        alert(`Your Score: ${scoregen} / ${questionsgen.length} \nCorrect: ${correctgen} Wrong: ${wronggen} \nTry Again?`);
        currentquestionIndexgen = 0; //Reset the question when new sets of quiz starts again
        scoregen = 0; // Reset the score when new sets of quiz starts
        correctgen = 0; // Reset correct questions when new sets of quiz starts
        wronggen = 0; // Reset wrong questions when new sets of quiz starts
        fetchquestionsgen(); // Restarts the quiz by fetching new questions
    }
}

let currentquestionIndexam = 0;
let questionsam = [];
let scoream = 0;
let correctam = 0;
let wrongam = 0;


// Function to fetch Qns from API (Anime/Manga)
async function fetchquestionsam(){
    try{
        const response = await fetch(
            "https://opentdb.com/api.php?amount=10&category=31&type=multiple"
        );
        const data = await response.json();
        questionsam = data.results; // store fetch questions in array
        displayquestionam(); //Display first Qns
    } catch (error) {
        console.log("Error fetching questions", error); // Log errors that occur during fetching
    }
}

//Function to display the current Qns & its multiple choices
function displayquestionam(){
    const questionElementam = document.getElementById("questionam");
    const choicesElementam = document.getElementById("choicesam");
    const currentquestionam = questionsam[currentquestionIndexam];

    // Display Qns
    questionElementam.innerHTML = currentquestionam.question;
    choicesElementam.innerHTML = ""; //Clear any previous choice from HTML

    //Display incorrect choices as buttons and assign even listener to each for checking of answer
    currentquestionam.incorrect_answers.forEach((choice) => {
        const choiceButton = document.createElement("button");
        choiceButton.textContent = choice;
        choiceButton.classList.add("choice-btn");
        choiceButton.onclick = () => checkAnsweram(choice);
        choicesElementam.appendChild(choiceButton);
    })

    //Display correct choices and assign event listener to each for checking of answer
    const correctamChoiceButton = document.createElement("button");
    correctamChoiceButton.textContent = currentquestionam.correct_answer;
    correctamChoiceButton.classList.add("choice-btn");
    correctamChoiceButton.onclick = () => checkAnsweram(currentquestionam.correct_answer);
    choicesElementam.appendChild(correctamChoiceButton);
}

function checkAnsweram(choice) {
    const resultElementam = document.getElementById("resultam");
    const currentquestionam = questionsam[currentquestionIndexam];

    if(choice === currentquestionam.correct_answer){
        resultElementam.textContent = "Correct";
        scoream++;
        correctam++;
    } else {
        resultElementam.textContent = "Incorrect";
        wrongam++;
    }
    setTimeout(nextquestionam, 1000);
}

// Function to move to the next Qns or restart when end
function nextquestionam(){
    const resultElementam = document.getElementById("resultam");
    resultElementam.textContent = ""; // Clear any old result messages

    currentquestionIndexam++; //moving to next Qns
    if(currentquestionIndexam < questionsam.length){
        displayquestionam() // Display the next Qns if have
    } else {
        alert(`Your Score: ${scoream} / ${questionsam.length} \nCorrect: ${correctam} Wrong: ${wrongam} \nTry Again?`);
        currentquestionIndexam = 0; //Reset the question when new sets of quiz starts again
        scoream = 0; // Reset the score when new sets of quiz starts
        correctam = 0; // Reset correct questions when new sets of quiz starts
        wrongam = 0; // Reset wrong questions when new sets of quiz starts
        fetchquestionsam(); // Restarts the quiz by fetching new questions
    }
}






