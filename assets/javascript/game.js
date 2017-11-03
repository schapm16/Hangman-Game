var alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p",
                "q","r","s","t","u","v","w","x","y","z"];

var dictionary = ["football" , "trampoline", "truck", "television", 
                 "automobile", "blizzard", "guitar", "building", "javascript"];
var selectWord; 
var selectWordLength;

var wordDisplay;

var letterGuess;

var correctLetterGuess;
var wrongLettersGuessed;
var allLettersGuessed;

var numGuesses;
var numWins;
var gameWon;
var first = true;



//Function to create initial wordDisplay HTML -- All "_"
function wordDisplayInitial () {
    var initialHTML = "";
    for (var i = 0; i <selectWordLength; i++) {
        wordDisplay.push("_")
        initialHTML = initialHTML + " " + wordDisplay[i];
    }
    
    document.getElementById("wordDisplay").innerHTML = 
    initialHTML;
}
//-------------------------------------------------------

//Function to update wordDisplay HTML as user plays
function wordDisplayUpdate (wordDisplay) {
    var newHTML ="";
    
    for (var i = 0; i <selectWordLength; i++) {
    newHTML = newHTML + " " + wordDisplay[i];
    }
    
    document.getElementById("wordDisplay").innerHTML = newHTML;
}
//-----------------------------------------------------


//Function to update wrongLettersGuessed HTML as user plays
function wrongLettersGuessedUpdate (wrongLettersGuessed) {
    var newHTML = wrongLettersGuessed.join(", ");
    document.getElementById("wrongLettersGuessed").innerHTML = newHTML;
    
}
//----------------------------------------------------------

//Function to update numGuesses HTML as user plays and end a losing game.
function numGuessesUpdate() {
    numGuesses--;
    document.getElementById("numGuesses").innerHTML = numGuesses;
    
    if (numGuesses < 1) {
        document.getElementById("lostScreen").style.visibility = "visible";
    }
}
//------------------------------------------------------------

//Function to update numWins HTML as user plays.
function numWinsUpdate() {
    
    if (selectWord === wordDisplay.join("")) {
        numWins++;
        document.getElementById("numWins").innerHTML = numWins;
        gameWon = true;
        document.getElementById("winScreen").style.visibility = "visible";
        
    }
    
}
//---------------------------------------------------------------

//Function to select a new word after user wins round.
function newWord () {
    selectWord = dictionary[Math.floor(Math.random()*dictionary.length)]; 
    selectWordLength = selectWord.length;
    
    wordDisplay = [];
    
    correctLetterGuess = [];
    wrongLettersGuessed = [];
    allLettersGuessed = [];
    
    if (numGuesses < 1) {
        numWins = 0;
        document.getElementById("lostScreen").style.visibility = "hidden";
        document.getElementById("numWins").innerHTML = numWins;
    }
    
    numGuesses = 6;
    
    wordDisplayInitial();
    
    document.getElementById("wrongLettersGuessed").innerHTML = "";
    document.getElementById("numGuesses").innerHTML = numGuesses;
    
    gameWon = false;
    
}

//Function to initiate the first game on key press.
function firstGame() {
    selectWord = dictionary[Math.floor(Math.random()*dictionary.length)]; 
    selectWordLength = selectWord.length;
    
    wordDisplay = [];
    
    correctLetterGuess = [];
    wrongLettersGuessed = [];
    allLettersGuessed = [];
    
    numGuesses = 6;
    numWins = 0;
    
    first = false;
    
    document.getElementById("numGuesses").innerHTML = numGuesses;
    document.getElementById("numWins").innerHTML = numWins;
    
    //Push the initial wordDisplay HTML to screen
    wordDisplayInitial();
    //-----------------------------------------------------------
    
    document.getElementById("openingScreen").style.visibility = "hidden";
}


// Function --  onkeyup management
document.onkeyup = function(event) {
    
    document.getElementById("message").innerHTML = "";
    
    letterGuess = event.key;
    
    if (first === true) {
        firstGame();
    } else {
    
        if (alphabet.includes(letterGuess)) {
            
            if (numGuesses > 0) {
                
                if (!gameWon) {
                
                    if (allLettersGuessed.includes(letterGuess)) {
                        document.getElementById("message").innerHTML =
                        "Letter already guessed!  Pick another.";
                        
                    } else {
                        gameplay();
                    }
                    
                } else {
                    newWord();
                    document.getElementById("winScreen").style.visibility 
                    = "hidden";
                }
                    
            } else {
                newWord();
            }
            
        } else {
            document.getElementById("message").innerHTML =
            "That is not a letter! Try Again.";
        }
    }
}
//------------------------------------------------


        
//Function -- code for user gameplay
function gameplay ()    {
    
    allLettersGuessed.push(letterGuess);
    
    if (selectWord.includes(letterGuess)) {
        
        //Determine index number of correct letter guesses
        for (var i = 0; i < selectWordLength; i++) {
            if (selectWord[i] === letterGuess) {
                correctLetterGuess.push(i);
            }
        }
        
        //Update wordDisplay array to replace "_" with correct letter
        for (var i = 0; i < correctLetterGuess.length; i++) {
            wordDisplay[correctLetterGuess[i]] = letterGuess;
        }

        //Push updated wordDisplay HTML to screen as user plays
        wordDisplayUpdate(wordDisplay);
        //--------------------------------------
        
        //Update numWins
        numWinsUpdate();
        //---------------------------------------
        
        //Restart array that shows index numbers of correct letters 
        //in selectWord
        correctLetterGuess = [];
    
    } else {
        wrongLettersGuessed.push(letterGuess);
        wrongLettersGuessedUpdate(wrongLettersGuessed);
        numGuessesUpdate();
    }
    
}
//------------------------------------------------------------------

