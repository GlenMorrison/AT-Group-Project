// the current word being typed (seperated by spaces)
let crntWord = '';

// the whole sentence (all words typed already)
var crntSentence = [];

// the element that displayed the output
var wordDisplay = document.getElementById('word_display');

var capsLock = false;
var keyLetters = document.getElementsByClassName('letter');




var words = [
  'adipisicing',
  'ad',
  'aliqua',
  'aliquip',
  'amet',
  'anim',
  'aute',
  'cillum',
  'commodo',
  'consectetur',
  'consequat',
  'culpa',
  'cupidatat',
  'deserunt',
  'do',
  'dolor',
  'dolor',
  'dolore',
  'dolore',
  'Duis',
  'ea',
  'eiusmod',
  'elit',
  'enim',
  'esse',
  'est',
  'et',
  'eu',
  'ex',
  'Excepteur',
  'exercitation',
  'fugiat',
  'id',
  'in',
  'in',
  'in',
  'incididunt',
  'ipsum',
  'irure',
  'labore',
  'laboris',
  'laborum',
  'Lorem',
  'magna',
  'minim',
  'mollit',
  'nisi',
  'non',
  'nostrud',
  'nulla',
  'occaecat',
  'officia',
  'pariatur',
  'proident',
  'qui',
  'quis',
  'reprehenderit',
  'sed',
  'sint',
  'sit',
  'sunt',
  'tempor',
  'ullamco',
  'Ut',
  'ut',
  'ut',
  'velit',
  'veniam',
  'voluptate'
];

var settings = {
  maxAmount : 15
};

var tree = new jsT9(words, settings);




GetPredictionSpace('q');

// adds strings to the current word
function UpdateCurrentWord(str){
  crntWord = str;
}

// adds strings to the current sentence
function UpdateSentence(str){
  crntSentence = str;
  wordDisplay.innerHTML = str;
}

// inserts a blank space and resets current word
function SpaceKey(){
  UpdateSentence(crntSentence + ' ');
  UpdateCurrentWord(' ');
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
}

// called when a keyboard button is pressed
var btnClick = function(key){
  switch(key.id) {
    case 'spacebar':
      SpaceKey();
      break;
    case 'backspace':
      Backspace();
      WordUpdate();
      break;
    default:
      AlphabetKey(key);
      WordUpdate();
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
  if(wordDisplay.innerHTML !== '') {
    var predictions = tree.predict(wordDisplay.innerHTML);

    console.log(predictions);
    console.log(wordDisplay.innerHTML);

    if(predictions.length > 0) {
      document.getElementById('www').innerHTML = predictions;
    }
    else {
      document.getElementById('www').innerHTML = '';
    }
  }
  else {
    document.getElementById('www').innerHTML = '';
  }
}

/*
  generate a new prediction based on the 
  current word the user is typing.
*/
function GetNewPrediction(){
  console.log('Get prediction based on current word');
  return 'predictionForNextLetterQ';
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


/*
  positions some prediction string in the form of a button above 
  a letter on the keyboard given by the parameter 'letter'
*/
function GetPredictionSpace(letter){
  for (var i = 0; i < keyLetters.length; ++i)
  {
    if(keyLetters[i].id == letter)
    {
      var position = keyLetters[i].getBoundingClientRect();
      var btn = document.createElement("BUTTON");
      var t = document.createTextNode(GetNewPrediction());
      btn.appendChild(t);
      btn.style.position = "absolute";
      btn.style.left = position.left+'px';
      btn.style.top = position.top + -50+'px';
      btn.className='prediction-button';
      document.body.appendChild(btn);
    }
  }
}


