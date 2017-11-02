var alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p",
                "q","r","s","t","u","v","w","x","y","x"]

var dictionary = ["football" , "trampoline", "truck"];
var selectWord = dictionary[Math.floor(Math.random()*dictionary.length)]; 
var selectWordLength = selectWord.length;

var wordDisplay = [];

var letterGuess = "";

// var lettersGuessed = [];
var correctLetterGuess = [];
var wrongLettersGuessed = [];

var numGuesses = 6;
var numWins = 0;



//Function to create initial wordDisplay HTML -- All "_"
function wordDisplayInitial (wordDisplay) {
    var initialHTML = "";
    for (var i = 0; i <selectWordLength; i++) {
        wordDisplay.push("_")
        initialHTML = initialHTML + " " + wordDisplay[i];
    }
    
    document.getElementById("wordDisplay").innerHTML = 
    initialHTML;
}
//---------------------------------------------------

//Function to update wordDisplay HTML as user plays
function wordDisplayUpdate (wordDisplay) {
    var newHTML ="";
    
    for (var i = 0; i <selectWordLength; i++) {
    newHTML = newHTML + " " + wordDisplay[i];
    }
    
    document.getElementById("wordDisplay").innerHTML = newHTML;
}
//----------------------------------------------


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
        alert("Nice Try!  But you have been hung!");
    }
}

//Push the initial wordDisplay HTML to screen
wordDisplayInitial(wordDisplay);
//-----------------------------------------------------------


// Function --  onkeyup management
document.onkeyup = function(event) {
    
    letterGuess = event.key;
    
    if (alphabet.includes(letterGuess)) {
        
        if (numGuesses > 0) {
        gameplay();
        
        } else {
            alert("You have been hung!  No more guesses. ");
        }
        
    } else {
        alert("That is not a letter.  Try again.");
    }
}
//------------------------------------------------


        
//Function -- code for user gameplay
function gameplay ()    {
    // lettersGuessed.push(letterGuess);
    
    if (selectWord.includes(letterGuess)) {
        
        //Determine index number of correct letter guesses
        for (var i = 0; i < selectWordLength; i++) {
            if (selectWord[i] === letterGuess) {
                correctLetterGuess.push(i);
            }
        }
        console.log("Locations of a correct letter guess in word: " + 
        correctLetterGuess);
        
        //Update wordDisplay array to replace "_" with correct letter
        for (var i = 0; i < correctLetterGuess.length; i++) {
            wordDisplay[correctLetterGuess[i]] = letterGuess;
        }

        //Push updated wordDisplay HTML to screen as user plays
        wordDisplayUpdate(wordDisplay);
        //--------------------------------------
        
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

