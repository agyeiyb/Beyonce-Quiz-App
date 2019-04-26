'use strict';

// Should I start questionNum at 0 instead? I could just have the display render questionNum + 1

const questionSet = [
  { 
    number: 1,
    text: `What is Beyonce’s mother’s name`,
    ans1: `Miss Tina Lawson`,
    ans2: `Miss Christina Knowles`, 
    ans3: `Miss Regina Carter`, 
    ans4: `Miss Alfre Woodward`
  }, 

  {
    number: 2,
    text: `What is the name of the first Girl Group Beyonce was apart of`,
    ans1: `Destiny’s Child`, 
    ans2: `TLC`, 
    ans3: `Gurls Tyme`, 
    ans4: `Dream`
  }, 

  {
    number: 3,
    text: `What was the theme of Beyonce’s Coachella performance?`, 
    ans1: `HBCU Homecoming`,
    ans2: `Bollywood`, 
    ans3: `Royalty`, 
    ans4: `Parisian Spring`
  }, 
  {
    number: 4, 
    text: `Who was the original Destiny’s Child lineup?`,
    ans1: `Farrah Franklin, Michelle Williams, Kelly Rowland, Beyonce Knowles`, 
    ans2: `LeToya Luckett, Latavia Robertson, Beyonce Knowles, Kelly Rowland `, 
    ans3: `Kelly Rowland, Chilli, Lisa Lopez, Beyonce Knowles,`, 
    ans4: `Missy Elliot, Kelly Rowland, Trina, Beyonce`
  }, 
  {
    number: 5,
    text: `What is Beyonce’s middle name?`,
    ans1: `Raina`, 
    ans2: `Veronica`, 
    ans3: `Solange`, 
    ans4: `Giselle`
  }, 
  {
    number: 6,
    text: `What role did Beyonce play in dream Girls?`,
    ans1: `Diana`, 
    ans2: `Deena `, 
    ans3: `Melody`, 
    ans4: `Effie`
  }, 
  {
    number: 7,
    text: `What is the name of Beyonce’s debut album?`,
    ans1: `Beyonce`, 
    ans2: `Dangerously in Love`, 
    ans3: `Lemonade`, 
    ans4: `4`
  }, 
  {
    number: 8,
    text: `What state did Beyonce grow up in?`,
    ans1: `Mississippi`, 
    ans2: `Texas`, 
    ans3: `California`, 
    ans4: `Virginia`
  }, 
  {
    number: 9,
    text: `Who is Beyonce’s husband?`,
    ans1: `Pharrell`, 
    ans2: `Jay-z`, 
    ans3: `Kendrick Lamar`, 
    ans4: `Snoop Dog`
  }, 
  {
    number: 10,
    text: `What is name of Beyonce and Jay-Z’s joint album?`,
    ans1: `Everything is love`, 
    ans2: `Crazy in Love`, 
    ans3: `Love`, 
    ans4: `Love Don't Cost a Thing`
  }
];

const ANSWERS = [ 
  `Miss Tina Lawson`, 
  `Gurls Tyme`, 
  `HBCU Homecoming`, 
  `LeToya Luckett, Latavia Robertson, Beyonce Knowles, Kelly Rowland `, 
  `Giselle`, 
  `Deena`, 
  `Dangerously in Love`, 
  `Texas`, 
  `Jay-Z`, 
  `Everything is love`
];

let questionNum = 1;

let correctAnswers = 0;

function questionTemplate(correctAnswers, question, questionsAnswered) {
  return `
     <section id="question-page" role="main">
    <h2 id="question">${question.text}</h2>
    
    <form>
      <fieldset>
     <label class="answer">
          <input  type="radio" name="radio"></input>
          <span>${question.ans1}</span>
        </label>
  
        <label class="answer" >
          <input type="radio" name="radio" ></input>
          <span>${question.ans2}</span>
        </label>

       <label class="answer" >
          <input type="radio" name="radio" ></input>
          <span>${question.ans3}</span>
        </label>
         <label class="answer" >
          <input type="radio" name="radio" ></input>
          <span>${question.ans4}</span>
        </label>
        
        <button id="js-submit-button">Submit</button>
        
        <div id="status-bar">
      <span id="question-count">Question: ${question.number}/10</span>
      <span id="score-count">Score: ${correctAnswers}/${questionsAnswered}</span>
    </div>
      </fieldset>  
      
  </section>
 
    </form>
  `;
}

function handleStartButton() {
  $('#js-start-button').click(function(event) {
    nextQuestion();
  });
}

function handleSubmitButton() {
  $('#container').on('click', '#js-submit-button', function(event) {
    event.preventDefault()

    const answer = $('input:checked').siblings('span');

    const userIsCorrect = checkUserAnswer(answer);
    if(userIsCorrect) {
      generateCorrectFeedback();
    } else {
      generateIncorrectFeedback();
    }
  });
}

function handleNextButton() {
  $('#container').on('click', '#js-next-button', function(event) {

    if(questionNum === 10) {
      createResultsPage(correctAnswers);
    } else {
      iterateQuestion();
      nextQuestion();
  }
  });
}

function handleRestartButton() {
  $('#container').on('click', '#js-restart-button', function(event) {

    questionNum = 1;

    correctAnswers = 0;

    nextQuestion();
  });
}

function nextQuestion() {

  const question = questionSet[questionNum - 1];

  const questionsAnswered = questionNum - 1;

  $('#container').html(questionTemplate(correctAnswers, question, questionsAnswered));
}

function checkUserAnswer(answer) {
  if(answer.text() === ANSWERS[questionNum - 1]) {
    return true;
  } else {
    return false;
  }
}

function generateCorrectFeedback() {
  $('#container').html(correctFeedback);
  iterateCorrectAnswers();
}

const correctFeedback = `
  <div class="correctFeedback" role="main">
    <h2>Correct!</h2>
    <h3> You are a real fan!<h3>
    <img src = "images/beyonce-2.png" alt= "picture of beyonce against a bright pink background">
    <button id="js-next-button">Next</button>
  </div>
`;

function generateIncorrectFeedback() {
  $('#container').html(incorrectFeedbackTemplate(questionNum));
}

function incorrectFeedbackTemplate(questionNum) {
  return `
    <section class="feedback-page" role="main">
    <h2> You don't know her! </h2>
      <h3>Nope! It was ${ANSWERS[questionNum - 1]}!</h3>
      <img src="images/eyeroll.png" alt="eyeroll icon">
      <button id="js-next-button">Next</button>
    </section>
`;
}

function iterateQuestion() {
  questionNum++;
}

function iterateCorrectAnswers() {
  correctAnswers++;
}

function createResultsPage(correctAnswers) {
  $('#container').html(`
    <section id="final-page">
      <h1>Final Score: ${correctAnswers} out of 10</h1>
      <button id="js-restart-button">Play Again?</button>
    </section>
  `);
}

function handleButtons() {
  handleStartButton();
  handleSubmitButton();
  handleNextButton();
  handleRestartButton();
}

handleButtons();
