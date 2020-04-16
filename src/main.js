// // Creating different views and starting and ending the game

let game // hold my game
let nameScreen
let splashScreen // start game screen
let gameScreen // Game screen
let gameOverScreen // GameOver screen
let rankingScreen
let name
let spanScore

// sounds

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
 <audio controls='true' class = 'sound' src='sounds/menuSound.mp3'>If stream does not start automatically press the play button</audio >
 </main>
 `)

  document.body.appendChild(splashScreen)

  const soundMenu = splashScreen.querySelector('.sound')
  soundMenu.volume = 0.1

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
          <img class = "BadDog" src = "img/Dog/BadDog.jpg" alt = "Sad Dog Image"
          </div>
          <div>
          <img class= "nasty-poop" src = "img/Elements/shit-drawing-png-1.png" alt = "Poop IMage"/>
          </div>
          </div>
          <div class = "good">
            <img class = "GoodDog" src = "img/Dog/GoodDog.jpg" alt = "Happy Dog Image"
          </div>
          <div>
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
    console.log(name)
    startGame(name)
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

function createRankingScreen () {
  rankingScreen = buildDom(`
    <main class = "ranking-screen">
      <table id = "scoretable">
        <thead>
          <tr>
            <th>GOOD BOYS RANKING</th>
          </tr>
        </thead>
        <tbody>
          <tr><td class= "name-table" id='name1'></td><td id='score1'></td></tr>
          <tr><td class= "name-table" id='name2'></td><td id='score2'></td></tr>
          <tr><td class= "name-table" id='name3'></td><td id='score3'></td></tr>
          <tr><td class= "name-table" id='name4'></td><td id='score4'></td></tr>
          <tr><td class= "name-table" id='name5'></td><td id='score5'></td></tr>
          <tr><td class= "name-table" id='name6'></td><td id='score6'></td></tr>
          <tr><td class= "name-table" id='name7'></td><td id='score7'></td></tr>
          <tr><td class= "name-table" id='name8'></td><td id='score8'></td></tr>
          <tr><td class= "name-table" id='name9'></td><td id='score9'></td></tr>
          <tr><td class= "name-table" id='name10'></td><td id='score10'></td></tr>
        </tbody>
      </table>
      <button class ="return-btn">RETURN</button>
    </main>
  `)

  const returnButton = rankingScreen.querySelector('.return-btn')
  returnButton.addEventListener('click', goToSplash)

  // convert it back into an array in order to get data from local storage

  const scoreBoard = JSON.parse(localStorage.getItem('scoreArray'))
  if (scoreBoard) {
    scoreBoard.sort(function (a, b) {
      return b.score - a.score
    })

    // print the best 5 scores into a table

    for (var i = 0; i < 10; i++) {
      var playersName = rankingScreen.querySelector('#name' + (i + 1))
      var playersScore = rankingScreen.querySelector('#score' + (i + 1))
      if (scoreBoard[i]) {
        playersName.innerHTML = scoreBoard[i].name
        console.log(scoreBoard[i].name)
        playersScore.innerHTML = scoreBoard[i].score
        console.log(scoreBoard[i].score)
      } else {
        playersName.innerHTML = ''
        playersScore.innerHTML = ''
      }
    }
  }

  document.body.appendChild(rankingScreen)
}

// go to name screen

function startNameScreen () {
  removeScreen()
  createNameScreen()
}

// start the game, end the game
function startGame (name) {
  removeScreen()
  createGameScreen()

  game = new Game(name)
  game.gameScreen = gameScreen

  // Start the game
  game.start()

  // when game starts, load the background
}

function endGame (score, name) {
  removeScreen()
  createGameOver(score)
  saveScoreandName(score, name)
}

function saveScoreandName (newScore, name) {
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
  console.log(scoreArray)
  // stringify the array in order to add it to local storage

  localStorage.setItem('scoreArray', JSON.stringify(scoreArray))
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
