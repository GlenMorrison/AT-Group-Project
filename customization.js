
//<script type="text/javascript" src="word_bank.js"></script>


let fontIncrease = document.getElementById('increase');
let fontDecrease = document.getElementById('decrease');
let currentFontSize = 1.5;
let fontAlterationRate = 0.25;

var IncreaseFont = function(key){
    if(currentFontSize > 2) return;

    for(var i=0;i<keyLetters.length;i++){
        keyLetters[i].style = "font-size:" + (fontAlterationRate+currentFontSize) + "em";
    }
    currentFontSize = (fontAlterationRate+currentFontSize);
}

var DecreaseFont = function(key){
    if(currentFontSize <= 0.5) return;

    for(var i=0;i<keyLetters.length;i++){
        keyLetters[i].style = "font-size:" + (currentFontSize-fontAlterationRate) + "em";
    }
    currentFontSize = (currentFontSize-fontAlterationRate);
}