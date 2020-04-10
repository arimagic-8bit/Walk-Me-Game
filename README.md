# Walk-Me! 🐕

### Description

Walk me! is an endless runner game. how says it's name is a never ending game. You are a dog that wants to return home, after  a long park walk. In your journey you will have to avoid other dog's poop and gain energies eating bones before you get tired.

### MVP (DOM - CANVAS)

A dog that only jumps and has to continue running without touching negative elements (poop) and preventing the energy bar from lowering touching positive elements (bones). You will gain score while you are still running, and you will lose the game if the energy bar lowers to 0. 

### Data structure

1. index.html

2. style.css

3. main.js

4. game.js

5. player.js

6. obstacle.js

7. bonus.js

#### 1. index.html file

#### 2. Main file

- buildDom
- createStartScreen / removeStartScreen
- createGameScreen / removeGameScreen
- createGameOverScreen / removeGameOverScreen
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
- energy bar
- loopCount
- timeScore

##### **Methods**

- start
- startLoop
- checkCollision
- gameOver
- reduceEnergy
- printEnergy
- printScore

#### 4. Player Constructor

##### **Properties**

- canvas
- ctx
- x position
- y position
- width
- height
- lives
- image
- direction

##### **Methods**

draw
jump
collidedWithObstacle
catchedFood
removeEnergy
addEnergy

#### 5. Obstacle Constructor

##### **Properties**

- canvas
- ctx
- x position
- y position
- width
- height
- row
- speed
- image

##### **Methods**

- draw

#### 6. Bonus Constructor

##### **Properties**

##### **Methods**

### States and States Transitions

- startScreen
  - Start the game
  - Goes to gameScreen when Start button is clicked
- gameScreen
  - Game running while energy bar > 0
  - Goes to gameoverScreen if energy bar < 0 
- gameoverScreen
  - Shows Game Over message and Restart button
  - Goes back to Game Screen when Restart button is clicked

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

https://github.com/arimagic-8bit/Walk-Me-Game

**Slides**

URls for the project presentation (slides) Link Slides.com
