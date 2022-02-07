
const squares = Array.from(document.querySelectorAll("#sq"))
const resetBtn = document.querySelector("#reset")
const announcer = document.querySelector(".announcer")
const playerDisplay = document.querySelector("#display-player_playerX")

let board = ['', '', '', '', '', '', '', '', '',]
let currentPlayer = 'X'
let isGamePlaying = true

const playerXwon = 'PLAYERX_WON'
const playerOwon = 'PLAYERO_WON'
const tie = 'Tie'

const winningConditions = [      
[0, 1, 2],
[3, 4, 5],
[6, 7, 8],
[0, 3, 6],
[1, 4, 7],
[2, 5, 8],
[0, 4, 8],
[2, 4, 6]
];

function Result(){
  let gameOver = false
  for (let i = 0; i <= 7; i++){
    const winCondition = winningConditions[i]
    const a = board[winCondition[0]]
    const b = board[winCondition[1]]
    const c = board[winCondition[2]]
    if (a === '' || b === '' || c === '') {
      continue
    } if (a === b && b === c){
      gameOver = true;
      break
    }
  }

  if (gameOver) {
    if (currentPlayer === 'X'){
      announce(playerXwon)
    } else {announce(playerOwon)}
    isGamePlaying = false 
    return
  }

  if (!board.includes(''))
  announce(tie)
}

const announce = function(type){
  if (playerOwon){
    announcer.innerHTML = 'Player <span class="playerO">O</span> Won'
  } if (playerXwon) {
    announcer.innerHTML = 'Player <span class="playerX">X</span> Won'
  } if (tie) {
    announcer.innerHTML = 'Tie'
  } 
  announcer.classList.remove('hide')
}



const isValidAction = function(square){
  if (square.innerText === 'X' || square.innerText === 'O'){
    return false
  } return true
}



    const updateBoard =  (index) => {
        board[index] = currentPlayer;
    }

    
const changeplayer = function(){
  playerDisplay.classList.remove(`player${currentPlayer}`)
  if(currentPlayer !== 'O'){
    currentPlayer === 'X' 
  } else {
    currentPlayer === 'O' 
  }
}



const userAction = function(square, index){
  if(isValidAction(square) && isGamePlaying){
    square.innerText = currentPlayer
    square.classList.add(`player${currentPlayer}`)
    updateBoard(index)
    Result()
    changeplayer()
  }
}


const resetBoard = function(){
  board = ['', '', '', '', '', '', '', '', '',]
  isGamePlaying = true
  announcer.classList.add('hide')

  if (currentPlayer === 'O'){
    changeplayer()
  }
  squares.forEach(function(square){
    square.innerText = ''
    square.classList.remove('playerX');
    square.classList.remove('playerO');
})
  
}


squares.forEach(function(square, index){
  square.addEventListener('click', function(){
    userAction(square, index)
  })
})


resetBtn.addEventListener('click', resetBoard)
