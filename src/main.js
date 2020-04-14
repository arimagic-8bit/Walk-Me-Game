// // Creating different views and starting and ending the game

let game // hold my game
let splashScreen // start game screen
let gameScreen // Game screen
let gameOverScreen // GameOver screen

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
 <button class="start-button">START</button>
 </main>
 `)
  document.body.appendChild(splashScreen)

  const startButton = splashScreen.querySelector('button')
  startButton.addEventListener('click', function (params) {
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
      <h2>Dog fell asleep</h2>
      <p>Your Score: <span>${score}</span></p>
      <img/>
      <button>RESTART</button>
    </main>
  `)

  var restartButton = gameOverScreen.querySelector('button')
  restartButton.addEventListener('click', startGame)

  document.body.appendChild(gameOverScreen)
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

// Run the start screen when page is loaded

window.addEventListener('load', createSplash)

// ranking screen
