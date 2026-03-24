let level = 1;
let score = 0;
let timeLeft = 30;
let timer;
let correctAnswer = 0;

// Start button
document.getElementById("startBtn").addEventListener("click", startGame);

// Start game
function startGame() {
    level = 1;
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
            alert("Game Over! Your score: " + score);
        }

        updateUI();
    }, 1000);
}

// Generate question based on level
function generateQuestion() {

    let a, b, c, question;

    if (level === 1) {
        a = rand(1, 10);
        b = rand(1, 10);
        c = rand(1, 10);

        question = `${a} + ${b} × ${c}`;
        correctAnswer = a + (b * c);
    }

    else if (level === 2) {
        a = rand(5, 20);
        b = rand(1, 10);
        c = rand(1, 10);

        question = `${a} - ${b} × ${c}`;
        correctAnswer = a - (b * c);
    }

    else {
        a = rand(1, 10);
        b = rand(1, 10);
        c = rand(1, 10);

        question = `(${a} + ${b}) × ${c}`;
        correctAnswer = (a + b) * c;
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

        // Level up every 50 points
        if (score % 50 === 0) {
            level++;
        }

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
    document.getElementById("level").innerText = level;
    document.getElementById("timer").innerText = timeLeft;
}

// Utility functions
function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(arr) {
    arr.sort(() => Math.random() - 0.5);
}