var wordDisplay = document.getElementById('word_display');

var capsLock = false;

// holds all the prediction and keyboard letter buttons
var keyLetters = document.getElementsByClassName('input');
var predictionLetters = document.getElementsByClassName('prediction');

var commonWordBank = {
  'university':1,
  'hello':1 
};

var sentence = [];
var currentWordIndex = 0;


// Clears and then draws the sentence array with spaces in between
function DrawSentence(){
  wordDisplay.innerHTML = '';
  currentWordIndex = 0;

  if (sentence.length === 0){
    ClearPredictionSpaces();
  }

  for (var i = 0; i < sentence.length; i++) {
    //console.log("drawing sentence word at index " + i);
    wordDisplay.innerHTML += sentence[i];
    if(i !== -1 + sentence.length)
    {
      //console.log("not the end of the sentence so adding a space index: " + i);
      wordDisplay.innerHTML += ' ';
      currentWordIndex ++;
    }
  }
}

// called when a letter has been pressed on the keyboard
function AlphabetKey(key){
  if(sentence.length <= 0){
    sentence.push('');
  }
  
  sentence[currentWordIndex] += key.innerHTML;

  DrawSentence();
}

// called when any keyboard button is pressed
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

  WordUpdate();
};

function RemoveSpacesFromString(word){
  return word.replace(/\s/g, '');
}

// finds a prediction based on the current word in the sentence array
function WordUpdate(){

  ResetButtonStyles();

  let word = sentence[currentWordIndex];

  // return if the word doesn't exist
  if (word === ' ' || word === undefined) return;

  // make sure the word doesn't have any spaces in it
  word = RemoveSpacesFromString(word);

  // this gets an array of the actual prediction based on the current sentence typed
  let predictions = tree.predict(word);
  let selectedPredictions = [];

  console.log(predictions);

  // checks if a prediction is actually a string of characters
  if(predictions.length <= 0) return;

  // Get most relevant predictions from the list of returned predictions
  for(var i=0;i<predictions.length;i++){

    let range = predictions[i].length - word.length;

    // get all predictions within a certain character range
    if(range > 0 && range < 5){

      selectedPredictions.push(predictions[i]);
      //prediction = predictions[(1+i)];

    }

  }

  console.log(selectedPredictions);

  // handle a situation where no predictions are selected
  if (selectedPredictions.length <= 0){
    selectedPredictions = predictions[0];
  }

  // set the default best prediction
  let prediction = selectedPredictions[0];

  console.log('default prediction ', prediction);

  // Get the most relevant prediction
  let frequencyOfHighestWord = 0;

  for(var i=0;i<selectedPredictions.length; i++){

    let word = selectedPredictions[i];

    console.log('checking word: ' + word);

    Object.keys(commonWordBank).forEach(function(word) {

      // all of these values are equal to the total number of keys in the array
      console.log(commonWordBank[word]);

      // if word exists in common word bank
      if(commonWordBank[word] === undefined){

        console.log(commonWordBank[word], frequencyOfHighestWord);

        if(commonWordBank[word] > frequencyOfHighestWord){

          frequencyOfHighestWord = commonWordBank[word];

          prediction = word;

        }
      }
    });
  }

  console.log(selectedPredictions);
  ClearPredictionSpaces();
  ShowPredictionAboveKey(prediction);
}

// takes a string and displays it above the next character in the current sentence
function ShowPredictionAboveKey(prediction){
  var currentWord = sentence[currentWordIndex];
  var predictionLetter = prediction.charAt(currentWord.length);

  var predictionSpace = document.getElementById('prediction-' + predictionLetter);
  var relevantButton = document.getElementById('input-' + predictionLetter);

  //predictionSpace.style = 'border-left: 4px dotted blue;';
  relevantButton.style = 'background-color: rgb(202, 251, 255)';

  SetPredictionZIndex(predictionLetter);

  console.log('current word: ' + currentWord);

  if(prediction.length === currentWord.length) return;

  predictionSpace.innerHTML = prediction;
}

// clears all strings from each prediction element
function ClearPredictionSpaces(){
  for(var i=0;i<predictionLetters.length;i++){
    predictionLetters[i].innerHTML = '';
  }
}

// adds a string to the word bank to determine the most commonly used words
function AddToCommonWordBank(string){
  // add word to common word bank object
  Object.keys(commonWordBank).forEach(function(word) {

    ammount = commonWordBank[word];

    console.log(word, string);

    if(word === string){
      commonWordBank[word] ++;
    }else{
      commonWordBank[string] = 1;
    }

  });

  console.log(commonWordBank);
}

function ResetButtonStyles(){
  for(var i=0;i<keyLetters.length;i++){
    keyLetters[i].style = 'background-color: rgb(245, 245, 245)';
  }
}

function predictionClick(key){
  var content = key.innerHTML;

  console.log(content);

  if (content === undefined) return;

  if (content !== null && content !== ''){
    sentence[currentWordIndex] = content;
    AddToCommonWordBank(key.innerHTML);
    DrawSentence();
    ClearPredictionSpaces();
  }
  ResetButtonStyles();
}

function SetPredictionZIndex(letter){
  for(var i=0;i<predictionLetters.length;i++){
    predictionLetters[i].setAttribute("style", "position:initial");
    if(predictionLetters[i].id === 'prediction-' + letter){
      predictionLetters[i].setAttribute("style", "position:relative");
    }
  }
}

// draw the sentence when the page first loads
DrawSentence();