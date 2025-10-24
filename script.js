const textSamples = [
    "The keyboard rattles like it's begging for mercy as I race to finish each word before my thoughts scatter into static and vanish into the void.",
    "My fingers move faster than my thoughts and that's saying something because my brain refuses to slow down even when it clearly should.",
    "Every mistake feels like a personal insult from the alphabet itself mocking me for thinking I could ever master the endless rhythm of letters and spaces.",
    "The screen blurs but the chaos in my brain keeps perfect tempo as if speed alone could make the nonsense I'm typing somehow profound.",
    "I type not for glory but to prove the machine can't outpace me even if my accuracy crumbles like my patience halfway through every test."
];

const timer = document.getElementById('timer');
let setTimer = parseInt(timer.textContent);  

let countdown;
let targetText = "";
let calculateAccuracy;
let correctChars;

function startTimer(time){
    clearInterval(countdown);
    timer.textContent = time;

    countdown = setInterval(function() {
        if(time > 0){
            time--;
            timer.textContent = time;
        } else {
            clearInterval(countdown);
            timer.textContent = "TIMES UP!!!"
            userInput.disabled = true;
        }
    }, 1000);
}

const sentenceText = document.getElementById('textDisplay');
const start = document.getElementById('startBtn');

function startBtn() {
    start.textContent = "Redo";

    const randomIndex = Math.floor(Math.random() * textSamples.length);
    targetText = textSamples[randomIndex];
    sentenceText.textContent = targetText;

    userInput.value = "";
    userInput.disabled = false;
    userInput.focus();

    correctChars = 0;
    wpm.textContent = "0.00";
    accuracy.textContent = "100.00%";

    startTimer(30);
}

const userInput = document.getElementById('textInput');

userInput.addEventListener('input', function() {
    const typedText = userInput.value;

    if (typedText === targetText) {
        userInput.disabled = true;
        sentenceText.textContent = "COMPLETE TEST";
        clearInterval(countdown);
    } 

    correctChars = 0;
    for (let i = 0; i < typedText.length; i++) {
        if (typedText[i] === targetText[i]){
            correctChars++;
        }
    }

    getWPM(correctChars);
    getAccuracy(correctChars, targetText.length);
});

const accuracy = document.getElementById('accuracy');

function getAccuracy(correctChars, totalChars){
    if (totalChars === 0) return;
    const calculateAccuracy = (correctChars / totalChars) * 100;
    accuracy.textContent = calculateAccuracy.toFixed(2) + "%";
}

const wpm = document.getElementById('wpm');

function getWPM(correctChars){
    const calculateWPM = (correctChars / 5) / (30 / 60);
    wpm.textContent = calculateWPM.toFixed(2);
}