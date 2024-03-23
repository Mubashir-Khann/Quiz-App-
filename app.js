// Import the functions you need from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js";
import {
  getDatabase,
  ref,
  onChildAdded,
} from "https://www.gstatic.com/firebasejs/9.6.0/firebase-database.js";

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyDIxo85Z7ESZsgYhC-YuQm8A9-K5xN22SQ",
  authDomain: "quizapp-7833d.firebaseapp.com",
  databaseURL: "https://quizapp-7833d-default-rtdb.firebaseio.com",
  projectId: "quizapp-7833d",
  storageBucket: "quizapp-7833d.appspot.com",
  messagingSenderId: "674424495313",
  appId: "1:674424495313:web:7f3de07f6a99e3c385b9f0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();

// Array to store data from Database
var questions = [];

// Getting Data From Database
async function getDataFromDatabase() {
  return new Promise((resolve, reject) => {
    var reference = ref(db, "questions/");
    onChildAdded(reference, function (data) {
      questions.push(data.val());
      console.log(questions);
      resolve();
    });
  });
}
// }

// Wait for data to fetch from the database, then render
async function startQuiz() {
  await getDataFromDatabase();
  renderQuestion();
}

// All HTML Elements Importing
var currQuestion = document.getElementById("currQuestion");
var totalQuestion = document.getElementById("totalQuestion");
var question = document.getElementById("question");
var renderAns = document.getElementById("answer-parent");

var indexNum = 0;
var score = 0;

// This function works when the Next button is clicked
window.nextQuestion = function () {
  indexNum++;
  renderQuestion();
};

// This function counts the user's score
window.currAnswer = function (a, b) {
  if (a == b) {
    score++;
    console.log(score);
  }
  nextQuestion();
};

// This function renders the user's questions after fetching
function renderQuestion() {
  currQuestion.innerHTML = indexNum + 1;
  totalQuestion.innerHTML = questions.length;

  if (indexNum < questions.length) {
    question.innerHTML = questions[indexNum].question;

    renderAns.innerHTML = "";
    for (var i = 0; i < questions[indexNum].options.length; i++) {
      renderAns.innerHTML += `<div class="answer">
        <button onclick="currAnswer('${questions[indexNum].options[i]}','${questions[indexNum].correctAns}')">${questions[indexNum].options[i]}</button>
      </div>`;
    }
  } else {
    alert("Quiz is over" + score);
    currQuestion.innerHTML = "Completed";
  }
}

startQuiz();
