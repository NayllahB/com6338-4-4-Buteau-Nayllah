var words = [
  'bananas',
  'grapes',
  'carousel',
  'milkshake',
  'javascript',
  'limousine',
  'chocolate',
  'programming',
  'meatloaf',
  'ukulele',
  'mango'
]
// assigns variables to ids
var wordToGuessEl = document.getElementById ('word-to-guess')
var previousWordEl = document.getElementById('previous-word')
var incorrectLettersEl = document.getElementById('incorrect-letters')
var remainingGuessesEl = document.getElementById('remaining-guesses')
var winsEl = document.getElementById('wins')
var lossesEl = document.getElementById('losses')

var currentWord = ''
var shownWord = [] // word that is displayed on screen
var numOfRemainingGuesses = 10
var individualIncorrectLetters = new Set() // 'Set" allows you to store unique values and they can only appear once
var individualGuessedLetters = new Set ()
var numWins = 0
var numLosses = 0

function newGame() {
  if (currentWord) {
    previousWordEl.textContent = currentWord; 
  }

  currentWord = words[Math.floor(Math.random() * words.length)] //randomizes words from array
  shownWord = Array(currentWord.length).fill('_') //created an array so words are replaced with '_'
  numOfRemainingGuesses = 10
  individualIncorrectLetters.clear()
  individualGuessedLetters.clear()

  wordToGuessEl.textContent = shownWord.join('')
  incorrectLettersEl.textContent = ''
  remainingGuessesEl.textContent = numOfRemainingGuesses

  console.log(currentWord)
}

document.onkeyup = function(e){
  var typedLetter = e.key.toLocaleLowerCase()
  // only letters are accepted
  if (!/^[a-z]$/.test(typedLetter) || individualGuessedLetters.has(typedLetter)){
    numOfRemainingGuesses--
  }
  
  individualGuessedLetters.add(typedLetter)

  if (currentWord.includes(typedLetter)) {
    for(var i = 0; i < currentWord.length; i++){
      if(currentWord[i] === typedLetter) {
        shownWord[i] = typedLetter
      }
    }
    wordToGuessEl.textContent = shownWord.join('')
  } else {
    if (!individualIncorrectLetters.has(typedLetter)) {
      individualIncorrectLetters.add(typedLetter)
      incorrectLettersEl.textContent = Array.from(individualIncorrectLetters).join(',')
      numOfRemainingGuesses--
      remainingGuessesEl.textContent = numOfRemainingGuesses
    }
  }
  gameStatus()
}
//manages how many wins or losses
function gameStatus() {
  if (!shownWord.includes('_')){
    numWins++
    winsEl.textContent = numWins
    newGame ()
  } else if(numOfRemainingGuesses === 0){
    numLosses++
    lossesEl.textContent = numLosses
    newGame ()
  }
}

newGame()
