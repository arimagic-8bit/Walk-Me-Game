// // Creating different views and starting and ending the game

let game // hold my game
let nameScreen
let splashScreen // start game screen
let gameScreen // Game screen
let gameOverScreen // GameOver screen
let rankingScreen
let name
let spanScore

// NAME and Instructions screen OK
// Here, include de RANKING screen after

// Functions

// Create HTML elements
function buildDom (htmlString) {
  const div = document.createElement('div')
  div.innerHTML = htmlString
  return div.children[0]
}

// splash screen

function createSplash (params) {
  splashScreen = buildDom(`
<main class = "start-game">
 <img class="walk-me" src="img/Dog/DogOpening.jpg" alt="Walk me Opening"/>
 <div class ="btn-container">
 <button class="start-button">START</button>
 <button class="ranking-button">RANKING</button>
 </div>
 </main>
 `)
  document.body.appendChild(splashScreen)

  const startButton = splashScreen.querySelector('.start-button')
  startButton.addEventListener('click', startNameScreen)

  const rankingButton = splashScreen.querySelector('.ranking-button')
  rankingButton.addEventListener('click', goToRanking)
}

// name screen
function createNameScreen () {
  nameScreen = buildDom(`
    <main class = "name-screen">
      <form>
        <label>HELLO<br>my name is</label>
        <input id="username" type="text" placeholder="Dog's name" value="">
      </form>
      <div class = "instructions">
        <h3>INSTRUCTIONS</h3>
        <div class = "press-btn">
          <button class ="jump-button">&#x25B2;</button> 
          <p>JUMP!</p>
        </div>
        <div class = "elements">
          <div class = "nasty">
          <p>AVOID THIS</p>
          <img class "nasty-poop" src = "img/Elements/shit-drawing-png-1.png" alt = "Poop IMage"/>
          </div>
          <div class = "good">
          <p>TAKE THIS</p>
          <img class = "bone" src = "img/Elements/bone-drawing-3.png" alt="Bone Draw"/>
          </div>
        </div>
      </div>
        <button class="start-button-name">START</button>
    </main>
  `)
  document.body.appendChild(nameScreen)

  const startButton = nameScreen.querySelector('.start-button-name')
  startButton.addEventListener('click', function (params) {
    name = nameScreen.querySelector('#username').value

    if (name === '') {
      name = 'SUPER DOG'
    }
    startGame()
  })
}

// game screen

function createGameScreen (params) {
  gameScreen = buildDom(`
<main class="game container">
    <header>
      <div class="energy-bar">
        <div class ="energy-yellow">
        </div>
      </div>
      <div class="score">
        <span class="label">SCORE:</span>
        <span class="value"></span>
      </div>
    </header>
    <div class="canvas-container">
      <canvas></canvas>
    </div>
  </main>
`)
  document.body.appendChild(gameScreen)
}

// gameOver screen

function createGameOver (score) {
  gameOverScreen = buildDom(`
    <main class ="game-over">
      <img class="game-over-image" src="img/Dog/Dog Game Over.jpg" alt="Sleepy Dog"/>
      <div class = "score-container">
      <p class "score">Your Score: <span>${score}</span></p>
      </div>
      <div class= "btn-container">
        <button class = "restart-btn">RESTART</button>
        <button class = "menu-btn">MENU</button>
      </div>
    </main>
  `)

  var restartButton = gameOverScreen.querySelector('.restart-btn')
  restartButton.addEventListener('click', startGame)

  var menuButton = gameOverScreen.querySelector('.menu-btn')
  menuButton.addEventListener('click', goToSplash)

  // save the player's score

  spanScore = gameOverScreen.querySelector('span')

  document.body.appendChild(gameOverScreen)
}

// ranking screen

function createRankingScreen (name, newScore) {
  rankingScreen = buildDom(`
    <main class = "ranking-screen">
      <h2>GOOD BOYS RANKING<h2>
      <table id = "scoretable">
        <thead>
          <tr>
            <th>GOOD BOYS RANKING</th>
          </tr>
        </thead>
        <tbody>
          <tr><td id='name1'></td><td id='score1'></td></tr>
          <tr><td id='name2'></td><td id='score2'></td></tr>
          <tr><td id='name3'></td><td id='score3'></td></tr>
          <tr><td id='name4'></td><td id='score4'></td></tr>
          <tr><td id='name5'></td><td id='score5'></td></tr>
          <tr><td id='name6'></td><td id='score6'></td></tr>
          <tr><td id='name7'></td><td id='score7'></td></tr>
          <tr><td id='name8'></td><td id='score8'></td></tr>
          <tr><td id='name9'></td><td id='score9'></td></tr>
          <tr><td id='name10'></td><td id='score10'></td></tr>
        </tbody>
      </table>
      <button class ="return-btn">RETURN</button>
    </main>
  `)

  const returnButton = rankingScreen.querySelector('.return-btn')
  returnButton.addEventListener('click', goToSplash)

  // store player's name and score

  let scoreArray

  if (localStorage.getItem('scoreArray') === null) {
    scoreArray = []
  } else {
    scoreArray = JSON.parse(localStorage.getItem('scoreArray'))
  }

  const newDog = {
    name: name,
    score: newScore
  }

  scoreArray.push(newDog)

  // stringify the array in order to add it to local storage

  localStorage.setItem('scoreArray', JSON.stringify(scoreArray))

  // convert it back into an array in order to get data from local storage

  const scoreBoard = JSON.parse(localStorage.getItem('scoreArray'))
  scoreBoard.sort(function (a, b) {
    return a.score - b.score
  })

  // print the best 5 scores into a table

  for (var i = 0; i < 10; i++) {
    var playersName = rankingScreen.querySelector('#name' + (i + 1))
    var playersScore = rankingScreen.querySelector('#score' + (i + 1))
    if (scoreBoard[i]) {
      playersName.innerHTML = scoreBoard[i].name
      playersScore.innerHTML = scoreBoard[i].score
    } else {
      playersName.innerHTML = ''
      playersScore.innerHTML = ''
    }
  }

  // print the score to the screen
  if (spanScore) {
    console.log(spanScore)
    spanScore.innerText = newScore
  }

  document.body.appendChild(rankingScreen)
}

// go to name screen

function startNameScreen () {
  removeScreen()
  createNameScreen()
}

// start the game, end the game
function startGame (params) {
  removeScreen()
  createGameScreen()

  game = new Game()
  game.gameScreen = gameScreen

  // Start the game
  game.start()

  // when game starts, load the background
}

function endGame (score) {
  removeScreen()
  createGameOver(score)
}

// Remove screen everytime another screen will show

function removeScreen (params) {
  document.body.innerHTML = ''
}

// return to splash screen

function goToSplash () {
  removeScreen()
  createSplash()
}

// go to Ranking screen

function goToRanking () {
  removeScreen()
  createRankingScreen()
}

// Run the start screen when page is loaded

window.addEventListener('load', createSplash)

// ranking screen
