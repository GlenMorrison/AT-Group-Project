// the current word being typed (seperated by spaces)
let crntWord;

// the whole sentence (all words typed already)
var crntSentence = [];

// the element that displayed the output
var wordDisplay = document.getElementById('word_display');

var capsLock = false;
var keyLetters = document.getElementsByClassName('letter');

// adds strings to the current word
function UpdateCurrentWord(str){
  wordDisplay.innerHTML = str;
}

// adds strings to the current sentence
function UpdateSentence(str){
  crntSentence = str;
}

// inserts a blank space and resets current word
function SpaceKey(){
  UpdateSentence(crntSentence + ' ');
  UpdateCurrentWord(wordDisplay.innerHTML + ' ');
};

// removes one char from the end of the whole sentence
function Backspace(){
  UpdateSentence(crntSentence.slice(0, - 1));
  UpdateCurrentWord(wordDisplay.innerHTML.slice(0, - 1));
};

// adds a char form the alphabet to the current word
function AlphabetKey(key){
  UpdateSentence(crntSentence + key.innerHTML);
  UpdateCurrentWord(wordDisplay.innerHTML + key.innerHTML);
  WordUpdate();
}

// called when a keyboard button is pressed
var btnClick = function(key){
  switch(key.id) {
    case 'spacebar':
      SpaceKey();
      break;
    case 'backspace':
      Backspace();
      break;
    default:
      AlphabetKey(key);
  }
};

var ToggleCapsLock = function(){
  if(capsLock){
    console.log('true so setting to false');
    for (var i = 0; i < keyLetters.length; ++i)
      keyLetters[i].innerHTML = keyLetters[i].innerHTML.toLowerCase();
  }
  else if (!capsLock){
    console.log('false so setting to true');
    for (var i = 0; i < keyLetters.length; ++i)
      keyLetters[i].innerHTML = keyLetters[i].innerHTML.toUpperCase();
  }
  capsLock = !capsLock;
  console.log(capsLock);
}

/*
  runs anytime the current word has been updated.
  send the word to the predictor to give the user
  a new prediciton if needed
*/
function WordUpdate(){
  console.log('initialize word to be predicted');
}

/*
  generate a new prediction based on the 
  current word the user is typing.
*/
function GetNewPrediction(){
  console.log('Get prediction based on current word');
}

/*
  show the current next to the next letter that 
  the user has to press to get that word
  (
    i.e. 'happy' would show above the 'y' key while the user
    has typed in 'happ'
  )s
*/
function ShowPrediciton(destinationKey){
  console.log('show prediction above a key here');
}