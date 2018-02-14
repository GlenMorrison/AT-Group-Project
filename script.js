var wordDisplay = document.getElementById('word_display');

var capsLock = false;

// holds all the prediction and keyboard letter buttons
var keyLetters = document.getElementsByClassName('input');
var predictionLetters = document.getElementsByClassName('prediction');

var commonWordBank = {
  'universe':1,
  'the':5,
  'be':5,
  'to':5,
  'of':5,
  'and':5,
  'in':5,
  'that':5,
  'have':5,
  'this':5,
  'has':5,
  'been':5,
  'great':5,
  'not':5,
  'you':5,
  'as':5,
  'for':5,
  'with':5,
  'you':5,
  'do':5,
  'at':5,
  'this':5,
  'by':5,
  'from':5,
  'we':5,
  'module':5
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
    wordDisplay.innerHTML += sentence[i];
    if(i !== -1 + sentence.length)
    {
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
  let t = 0; // just for debug!

  ResetButtonStyles();

  let word = sentence[currentWordIndex];

  // return if the word doesn't exist
  if (word === ' ' || word === undefined) return;

  // make sure the word doesn't have any spaces in it
  word = RemoveSpacesFromString(word);

  // this gets an array of the actual prediction based on the current sentence typed
  let predictions = tree.predict(word);
  let selectedPredictions = [];

  // checks if a prediction is actually a string of characters
  if(predictions.length <= 0)
  {
    console.error('prediction is empty');
    return;
  }

  // get all predictions within a certain character range
  for(var i=0;i<predictions.length;i++){
    let range = predictions[i].length - word.length;
    if(range > 0 && range < 10)
      selectedPredictions.push(predictions[i]);
  }

  // handle a situation where no predictions are selected
  if (selectedPredictions.length <= 0){
    selectedPredictions = predictions[0];
    console.assert('no predictions were selected, getting the default prediction');
  }

  // set the default best prediction
  let prediction = selectedPredictions[0];

  // Get the most relevant prediction
  let frequencyOfHighestWord = 0;

  if(t == 1) console.log('selected predictions: ' + selectedPredictions);

  if(t == 1) console.log(commonWordBank);

  // loop through all selected prediction
  for(var i=0;i<selectedPredictions.length; i++){

    // current predicted word in loop
    let word = selectedPredictions[i];

    if(t == 1) console.log('assesing word: ' + word + '.');

    // loop through the commonly used words
    Object.keys(commonWordBank).forEach(function(commonWord) {

      if(t == 1) console.log('looking for ' + word + ' in common word bank.');

      // if word exists in common word bank
      if(commonWordBank[word] !== undefined){

        if(t == 1) console.log(word + ' does exist in common word bank.');

        if(t == 1) console.log(word + ' occurs ' + commonWordBank[word] + ' times.');

        if(commonWordBank[word] > frequencyOfHighestWord){

          frequencyOfHighestWord = commonWordBank[word];

          prediction = word;

        }
      }else{
        if(t == 1) console.log(word + ' doesnt exist in common word bank.');
      }
      if(t == 1) console.log('------------------');
    });
  }

  ClearPredictionSpaces();
  ShowPredictionAboveKey(prediction);
}

// takes a string and displays it above the next character in the current sentence
function ShowPredictionAboveKey(prediction){
  let currentWord = sentence[currentWordIndex];
  let predictionLetter = prediction.charAt(currentWord.length);
  let predictionSpace = document.getElementById('prediction-' + predictionLetter);
  let relevantButton = document.getElementById('input-' + predictionLetter);

  //predictionSpace.style = 'border-left: 4px dotted blue;';
  predictionSpace.style.backgroundColor = 'rgb(202, 251, 255)';

  SetPredictionZIndex(predictionLetter);

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
  
  if(commonWordBank[string] !== undefined){
    commonWordBank[string] ++;
    console.log('number of ' + string + ' is now ' + commonWordBank[string]);
  }else{
    commonWordBank[string] = 1;
    console.log('added ' + string + ' to word bank');
  }

  console.log(commonWordBank);
}

function ResetButtonStyles(){
  for(var i=0;i<keyLetters.length;i++)
    keyLetters[i].style.backgroundColor = 'rgb(245, 245, 245)';
}

function predictionClick(key){
  var content = key.innerHTML;

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
    if(predictionLetters[i].id === 'prediction-' + letter)
      predictionLetters[i].setAttribute("style", "position:relative");
  }
}

// draw the sentence when the page first loads
DrawSentence();