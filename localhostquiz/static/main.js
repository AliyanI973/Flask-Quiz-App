

const dtf = ""


$.ajax({
  url: 'http://localhost:5000/quiz-data',
  type: 'GET',
  success: function(data) {
      console.log(data);
  },
  error: function(error) {
      console.error('Error:', error);
  }
});

const dataToSend = {
  name: 'John Doe',
  age: 30
};

$.ajax({
  url: 'http://localhost:5000/quiz',
  type: 'POST',
  contentType: 'application/json',
  data: JSON.stringify(dataToSend),
  success: function(data) {
      console.log(data);
  },
  error: function(error) {
      console.error('Error:', error);
  }
});












// fetch(`${window.location}/result`)
// .then(response => response.json())
// .then(data => {
//     console.log(ansData); // Access your data object here
//     // Redirect to another page with JavaScript
//     window.location.href = '{{ url_for("result") }}';
// })
// .catch(error => console.error('Error:', error));









































// Clock
// const startingMinutes = ids2.length;
// let time = startingMinutes  * 60;
// const countDownEl = document.getElementById('countdown');

// setInterval(updateCountdown, 1000)

// function updateCountdown(){
// const minutes = Math.floor(time /60);
// let seconds = time % 20;

// // seconds = seconds < 10 ? '0'+seconds : seconds;

// countDownEl.innerHTML = `${minutes}: ${seconds}`;
//     time --;
// }
// Stop quiz on time when 0:00

// if(minutes==0 && seconds==0){
    
// } 

// function startClock() {
//   const clockElement = document.getElementById('clock');
//   let seconds = 60;

//   const intervalId = setInterval(() => {
//     seconds--;
//     clockElement.textContent = seconds;

//     if (seconds === 0) {
//       clearInterval(intervalId);
//       // Add any code here to execute when the clock stops
//       console.log('Clock stopped!');
//     }
//   }, 1000); // Update every second
// }

// startClock();


// const startingMinutes = ids2.length;
// let time = startingMinutes  * 20;
// const countDownEl = document.getElementById('countdown');

// setInterval(updateCountdown, 1000)

// function updateCountdown(){
//   const minutes = Math.floor(time /60);
//   let seconds = time % 60;
//   // seconds = seconds < 10 ? '0'+seconds : seconds;
//   countDownEl.innerHTML = `${minutes}: ${seconds}`;
//   time --;
// }

// if(minutes==0 && seconds==0){
//   // Stop Interval
//   // Quiz done
//   clearInterval(updateCountdown)
// }

      

// Quiz Data
const dtf = {{ df|tojson }}

let quiz_complete = true;

var parsedDtf = JSON.parse(dtf)

// Making Data into a javasript object
function QuizDataset(id, question, option1, option2, option3, option4, option5, answer){
  this.id = id
  this.question = question
  this.option1 = option1
  this.option2 = option2
  this.option3 = option3
  this.option4 = option4
  this.option5 = option5
  this.answer = answer
}

// Dataset created to show in the quiz
for(var i in parsedDtf){
  var questionData = new QuizDataset(parsedDtf["id"], parsedDtf["Question"], parsedDtf["Option1"], parsedDtf["Option2"], parsedDtf["Option3"], parsedDtf["Option4"], parsedDtf["Option5"], parsedDtf["Answer"])
}

// const shuffledQuestion, currentQuestionIndex;

const ids2 = Object.values(parsedDtf["id"])
// Taking Random Index no.
function returnRandomId(arr){
const randomId = Math.floor(Math.random() * arr.length)
console.log('Random Index:', randomId);
return randomId
}

// Chaniging Questions and Options
let nextBtn = document.querySelector('#nextquestion')
let radioButtons = document.querySelectorAll('input[name="option"]')

var ansData = [];

// document.querySelector('input[name="Choose"]:checked').checked = false;
// dont loop on null values

let id = 0;
nextQuestion(id); //returnRandomId(ids2)
nextBtn.addEventListener("click", ()=>{
  // Check for Null Input ############
  // if(document.querySelector('input[name="quiz-ans"]:checked').value == null){
  //   document.getElementById('error-show').innerHTML = "Enter the input please"
  // }
  // else{
  var element = {}
  current_question = document.querySelector("#questions")
  keyR = current_question.getAttribute('name')
  element['id'] = current_question.getAttribute('name')
  element['question'] = current_question.textContent
  element["student_ans"] = document.querySelector('input[name="quiz-ans"]:checked').value
  element["correct_ans"] = questionData['answer'][Number(keyR)]
  ansData.push({element: element})
  console.log(ansData)
  // removing by id
  // const delQuestion = Object.keys(questionData)
  // delQuestion.forEach((keyR)=>{
  //   // console.log(questionData[keyR])
  // });
  // console.log(keyR)
  for (var objK in questionData){
      if (questionData[objK].hasOwnProperty(keyR)){
        delete questionData[objK][keyR]
      }
    }
  // var randoms = returnRandomId(ids2)
  // id = questionData['id'][randoms]
  // if (id !== undefined){
  id++;
  nextQuestion(id);
  // }
  // else{
  //   delete ids2[randoms]
  //   console.log(ids2)
  //   ids2.reduce
  //   // console.error('Error: returnRandomId returned undefined.');
  // }
  
  var ele = document.getElementsByName("quiz-ans");
  for(var i=0;i<ele.length;i++){
      ele[i].checked = false;
    }

  if (id >= 5){
    var quizbox = document.querySelector('#quizBox');
    quizbox.style.display = 'none'
    var quizDone = document.querySelector('.quiz-done')
    quizDone.style.display = 'block'
    quiz_complete = true;
    console.log("Yes Quiz Complete" + quiz_complete)
  }
  // }
  // document.querySelector('input[name="Choose"]:checked').checked = false; alternative
  //document.getElementById('error-show').innerHTML = "Enter the input please"
  // console.log(ans)
});

// return to flask
// redirect to results

function nextQuestion(index){
    qtag = document.getElementById('questions').setAttribute('name', index)
    document.getElementById('questionid').innerHTML = questionData["id"][index] + ".  " 
    document.getElementById('questions').innerHTML = questionData["question"][index] // JSON.stringify(questionData["question"][index])
    var opt1 = document.getElementById('input1').value = questionData["option1"][index] // JSON.stringify(questionData["option1"][index])
    document.getElementById('option1').innerHTML = opt1;
    var opt2 = document.getElementById('input2').value = questionData["option2"][index]  //JSON.stringify(questionData["option2"][index])
    document.getElementById('option2').innerHTML = opt2;
    var opt3 = document.getElementById('input3').value = questionData["option3"][index] //JSON.stringify(questionData["option3"][index])
    document.getElementById('option3').innerHTML = opt3;
    var opt4 = document.getElementById('input4').value = questionData["option4"][index] //JSON.stringify(questionData["option4"][index])
    document.getElementById('option4').innerHTML = opt4;
    var opt5 = document.getElementById('input5').value = questionData["option5"][index] // JSON.stringify(questionData["option5"][index])
    document.getElementById('option5').innerHTML = opt5;
}

function sendtoServer(){
  var xml = new XMLHttpRequest();
  xml.open("POST", "{{ url_for('result') }}", true)
  xml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xml.onload = function(){
    var dataReply = JSON.parse(this.responseText)
  }
}

// document.querySelector('nextquestion').onclick = nextQuestion(returnRandomId(ids2)) Uncaught TypeError: Cannot set properties of null (setting 'onclick')
// use this type of onclick so that the data is already visible and only needs the buttons to change it


finishBtn = document.getElementById('finish-button');
let WindowOrigin = window.origin;
finishBtn.addEventListener('click', ()=>{
      
    if (quiz_complete == true){
      console.log(JSON.stringify(ansData))
      /*

      $.ajax({
        url: '{{ url_for("result") }}',
        type: 'POST',
        data: {
          answer_data : ansData
        },
        success: function(response) {
          console.log(response); // Handle the successful response
        },
        error: function(error) {
          console.error(error); // Handle errors
        }
      });
      */


      function sendAnswerData() {
        fetch('{{ url_for("quizpage") }}', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(ansData)
        })
        .then(response => response.json())
        .then(data => {
          console.log(data); // Handle the response data here
        })
        .catch(error => {
          console.error(error);
        });
      }
      window.location.href = '{{ url_for("result") }}';
        
      /*
function sendData() { 
      var value = document.getElementById('input').value; 
      $.ajax({ 
          url: '/quizpage', 
          type: 'POST', 
          contentType: 'application/json', 
          data: ansData, 
          // success: function(response) { 
          //     document.getElementById('output').innerHTML = response.result; 
          // }, 
          // error: function(error) { 
          //     console.log(error); 
          // } 
      }); 
  }
*/

      


    };
});




// Stop quiz on time when 0:00
