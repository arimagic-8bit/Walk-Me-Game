# Walk-Me! 🐕

### Description

Walk me! is an endless runner game. how says it's name is a never ending game. You are a dog that wants to return home, after a long park walk. In your journey you will have to avoid other dog's poop and gain energies eating bones before you get tired.

### MVP (DOM - CANVAS)

A dog that only jumps and has to continue running without touching negative elements (poop) and preventing the energy bar from lowering touching positive elements (bones). You will gain score while you are still running, and you will lose the game if the energy bar lowers to 0.

### Data structure

1. index.html

2. style.css

3. main.js

4. game.js

5. player.js

6. obstacle.js

7. background.js

#### 1. index.html file

#### 2. Main file

- buildDom
- createStartScreen / removeStartScreen
- createNameScreen / removeNameScreen
- createGameScreen / removeGameScreen
- createGameOverScreen / removeGameOverScreen
- createRankingScreen/ removeRankingScreen
- startGame / endGame

#### 3. Game Constructor

##### **Properties**

- canvas
- ctx
- player
- name
- obstacles
- food
- gameIsOver
- energy
- score
- gameScreen
- energyYellow
- background (x6)
- maxNumberObstacles
- maxNumberFood
- gameSound

##### **Methods**

- start
- startLoop
- checkCollision
- gameOver

#### 4. Player Constructor

##### **Properties**

- canvas
- ctx
- x position
- y position
- size
- energy
- image
- ySpeed
- jumping
- dogTop
- dogBottom
- screenTop
- screenBottom
- jumpSound
- barkSound
- hitSound

##### **Methods**

drawDog
setJump
handleScreenCollision
updateDogPosition
removeEnergy
addEnergy
didCollideWithObs
didCollideWithFood

#### 5. Obstacle & Food Constructor

##### **Properties**

- canvas
- ctx
- x position
- y position
- size
- speed
- image

##### **Methods**

- drawObstacle & drawFood
- updateObsPosition & updateFoodPosition
- isInsideScreen

#### 6. Background Constructor

##### **Properties**

- speed
- x position
- x secundary position
- canvas
- ctx
- image

##### **Methods**

- move
- draw

### States and States Transitions

- startScreen
  - Start the game
  - Goes to nameScreen when Start button is clicked
  - Goes to rankingScreen when Ranking button is clicked
- nameScreen
- Saves player's name
- Shows game's instructions
- Goes to gameScreen when Start button is clicked
- gameScreen
  - Game running while energy bar > 0
  - Goes to gameoverScreen if energy bar < 0
- gameoverScreen
  - Shows Game Over message, Restart button and Menu button
  - Saves player's score
  - Goes back to Game Screen when Restart button is clicked
  - Goes back to startScreen when Menu button is clicked
- rankingScreen
  - Shows a ranking chart with all the players' name and score
  - Returns to startScreen when Return button is clicked

### Tasks

- Setup git & GitHub

- Create and connect files: main.js, player.js, obstacle.js,

- BuildDom in main.js

- Create 3 screens in main.js

- Create screen transitions in main.js

- Create Game constructor

- Create loop in game.js

- Create Player constructor

- Create Obstacle constructor

- Draw obstacles in game.js

- Move obstacles in game.js

- Move player in game.js

- Check Collisions in game.js

- Check game result in game.js

- Create bonus constructor and check bonus in game.js

- Create scoreboard in main.js

- Pause game in game.js

- Add audios, img and fonts

### Backlog

- Bark bonus when collide to some delicious food and use it to avoid some negative element.
- Increase energy bar when eating
- Decrease energy bar by time and collide to negative elements
- Increase game difficulty by time (it moves faster or appears more negative elements)
- Dog name registration and scoreboard (to compete again other players)
- Sounds and visual effects (when collides, looses, barks or eats)
- Some food will have a punctuation multiplier

### Links

**Trello**

https://trello.com/b/E9ePiygb/walk-me-game

**Git**

https://arimagic-8bit.github.io/Walk-Me-Game/

**Slides**

https://docs.google.com/presentation/d/1zmoszPUtXOAKnxzbJQJQeGl9yeWb4ec2Pi5imxzahug/edit#slide=id.g838f2ca63a_0_0
