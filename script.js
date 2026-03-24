let score = 0;
let timeLeft = 30;
let timer;
let correctAnswer = 0;
let difficulty = "";

// Set difficulty
function setDifficulty(level) {
    difficulty = level;

    document.getElementById("difficulty-screen").style.display = "none";
    document.getElementById("game").style.display = "block";

    startGame();
}

// Start game
function startGame() {
    score = 0;
    timeLeft = 30;

    clearInterval(timer);
    startTimer();
    generateQuestion();
    updateUI();
}

// Timer
function startTimer() {
    timer = setInterval(() => {
        timeLeft--;

        if (timeLeft <= 0) {
            clearInterval(timer);
            alert("Game Over! Score: " + score);
        }

        updateUI();
    }, 1000);
}

// Generate question
function generateQuestion() {

    let a = rand(1, 10);
    let b = rand(1, 10);
    let c = rand(1, 10);
    let question = "";

    // EASY: + - *
    if (difficulty === "easy") {
        let ops = ["+", "-", "*"];
        let op = ops[rand(0, 2)];

        question = `${a} ${op} ${b}`;
        correctAnswer = eval(question);
    }

    // MEDIUM: + - * / (clean division)
    else if (difficulty === "medium") {
        let ops = ["+", "-", "*", "/"];
        let op1 = ops[rand(0, 3)];
        let op2 = ops[rand(0, 3)];

        // Ensure clean division
        if (op1 === "/") {
            b = rand(1, 10);
            a = b * rand(1, 10);
        }

        if (op2 === "/") {
            c = rand(1, 10);
            b = c * rand(1, 10);
        }

        question = `${a} ${op1.replace("/", "÷")} ${b} ${op2.replace("/", "÷")} ${c}`;
        correctAnswer = eval(`${a} ${op1} ${b} ${op2} ${c}`);
    }

    // HARD: (), powers, /, + - *
    else {
        let power = rand(2, 3);

        let divisor = rand(1, 5);
        let base = divisor * rand(1, 5); // ensures clean division

        question = `(${a} + ${b}) × ${c} + ${base} ÷ ${divisor} + ${a}^${power}`;
        correctAnswer = (a + b) * c + (base / divisor) + Math.pow(a, power);
    }

    document.getElementById("question").innerText = question;
    generateOptions();
}

// Generate options
function generateOptions() {
    let optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";

    let options = [correctAnswer];

    while (options.length < 4) {
        let wrong = correctAnswer + rand(-10, 10);
        if (!options.includes(wrong) && wrong >= 0) {
            options.push(wrong);
        }
    }

    shuffle(options);

    options.forEach(opt => {
        let btn = document.createElement("div");
        btn.classList.add("option");
        btn.innerText = opt;

        btn.onclick = () => checkAnswer(opt, btn);

        optionsDiv.appendChild(btn);
    });
}

// Check answer
function checkAnswer(selected, btn) {

    if (selected === correctAnswer) {
        btn.classList.add("correct");
        score += 10;
        setTimeout(generateQuestion, 500);
    } else {
        btn.classList.add("wrong");
        score -= 5;
    }

    updateUI();
}

// Update UI
function updateUI() {
    document.getElementById("score").innerText = score;
    document.getElementById("timer").innerText = timeLeft;
}

// Helpers
function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(arr) {
    arr.sort(() => Math.random() - 0.5);
}
