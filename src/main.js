// // Creating different views and starting and ending the game

let game // hold my game
let nameScreen
let splashScreen // start game screen
let gameScreen // Game screen
let gameOverScreen // GameOver screen
let rankingScreen
let nameChange

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
 <button class= "ranking-button">RANKING</button>
 </div>
 </main>
 `)
  document.body.appendChild(splashScreen)

  const startButton = splashScreen.querySelector('.start-button')
  startButton.addEventListener('click', function (params) {
    startNameScreen()
  })
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
    nameChange = nameScreen.querySelector('#username').value

    if (nameChange === '') {
      nameChange = 'SUPER DOG'
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

  document.body.appendChild(gameOverScreen)
}

// ranking screen

function createRankingScreen (playerName, newScore) {
  rankingScreen = buildDom(`
    <main class = "ranking-screen">
    <h2>GOOD BOYS RANKING<h2>
    <div>
    </div>
    <button class ="return-btn">RETURN</button>
    </main>
  `)

  document.body.appendChild(rankingScreen)

  // get the scores if they already exist

  const topScoresString = localStorage.getItem('topScores')
  const topScoresArr = JSON.parse(topScoresString)

  // update the existing ones
  const newScoreObj = { dog: playerName, score: newScore }
  topScoresArr.push(newScoreObj)

  // save back to localStorage
  const updatedScoreStr = JSON.stringify(topScoresArr)
  localStorage.setItem('topScores', updatedScoreStr)

  // return the updated scores

  return topScoresArr
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

// Run the start screen when page is loaded

window.addEventListener('load', createSplash)

// ranking screen
