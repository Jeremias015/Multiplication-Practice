
function getRandomNumber(max) {
    return Math.floor(Math.random() * max);
  }
  
  function generateProblem() {
    const leftNum = getRandomNumber(10);
    const rightNum = getRandomNumber(10);
    const correctAnswer = leftNum * rightNum;
    const answers = [correctAnswer];
    while (answers.length < 4) {
        const randomAnswer = getRandomNumber(25); // 5 * 5 = 25
    if(!answers.includes(randomAnswer)){
        answers.push(randomAnswer);
    }
    }
    return {
        leftNum,
        rightNum,
        correctAnswer,
        answers: shuffleArray(answers)
    };
  }

  /**
 * Utility function to shuffle the items in an array
 * @param {object} arr
 */
function shuffleArray(arr) {
    return arr.sort(function (a, b) { return Math.random() - 0.5 })
  }

  let currentProblemIndex = 0;
  let score = 0;
  let problemSet = [];

  function startNewProblemSet() {
    currentProblemIndex = 0;
    score = 0;
    problemSet = [];
    for (let i = 0; i < 10; i++) {
        problemSet.push(generateProblem());      
    }
    updateProblem();
    updateScore();
  }

  function updateScore() {
    document.querySelector('.currentScore').textContent = score;
    document.querySelector('.currentProblem').textContent = currentProblemIndex;
  }

  function updateProblem(){
    const problem = problemSet[currentProblemIndex];
    document.querySelector('.expression').textContent = `${problem.leftNum} x ${problem.rightNum}`;
    const answersList = document.querySelector('#answers ul');
    answersList.innerHTML = '';
    problem.answers.forEach(answer => {
        const li = document.createElement('li');
        li.textContent = answer;
        li.classList.add('answer');
        li.addEventListener('click', () => handleClickAnswer(answer));
        answersList.appendChild(li);
    });
  }

  function handleClickAnswer(answer) {
    const problem = problemSet[currentProblemIndex];
    if (answer === problem.correctAnswer) {
        score++;        
    }
    currentProblemIndex ++;
    if (currentProblemIndex < problemSet.length) {
        updateProblem();
    }else{
        showSummary();
    }
    updateScore();
  }

  function showSummary() {
    document.querySelectorAll('.show-hide').forEach(el => el.style.display = 'none');
    document.querySelector('.expression').textContent = `Your Final Score is: ${score}`;
    document.querySelector('#btnStartOver').style.display = 'block';
  }

  document.getElementById('btnStartOver').addEventListener('click', () => {
    document.querySelectorAll('.show-hide').forEach(el => el.style.display = 'block');
    startNewProblemSet();
    });

    window.addEventListener('load', () => {
        startNewProblemSet();
    })


