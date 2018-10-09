var fs = require("fs");
var words = fs.readFileSync("words_alpha.txt").toString()
words = words.split("\n");

//Match letters that can't be displayed on a 7 segment display:
//var badLetters = /[gkmqvwxz]/;

//Match letters that can't be displayed on a 7 segment display (and also io because they look like numbers):
var badLetters = /[gkmqvwxzio]/;

//Match letters that can be shown on a calculator upside down:
//Only acceptable letters: beghilos (may vary according to your calculator)
var calculatorLetters = /[acdfjkmnpqrtuvwxyz]/;

var longestAcceptableWord = [""];
var longestCalculatorWord = [""];

function checkSegment (testWord, minLength) {
    //function checks if the word is possible on a 7 segment display
    if(testWord.length < minLength) { return false; }
    if(testWord.match(badLetters)) { return false; }
    return true;
}
function checkCalculator (testWord, minLength) {
    //function checks if the word is possible on a 7 segment display
    if(testWord.length < minLength) { return false; }
    if(testWord.match(calculatorLetters)) { return false; }
    
    //We could also check if the word ends with the letter o if we wanted to ignore anything that would require you to start your number with "0." but I think this is acceptable.
    //if(testWord.slice(-1) == "o") { return false; }
    //We could also check if the last two characters were o as this would be "00." which would not be possible
    if(testWord.slice(-2) == "oo") { return false; }

    return true;
}
for( var testWord of words) {
    if(checkSegment(testWord, longestAcceptableWord[0].length)) {
        if(testWord.length > longestAcceptableWord[0].length) {
            longestAcceptableWord = [];
        }
        longestAcceptableWord.push(testWord);
    }

    if(checkCalculator(testWord, longestCalculatorWord[0].length)) {
        if(testWord.length > longestCalculatorWord[0].length) {
            longestCalculatorWord = [];
        }
        longestCalculatorWord.push(testWord);
    }
}

console.log(longestAcceptableWord.length + " word(s) found for a 7-segment display");
for( var longWord of longestAcceptableWord) {
    console.log(longWord);
}
console.log(longestCalculatorWord.length + " word(s) found for an upside down calculator:");
for( var longWord of longestCalculatorWord) {
    console.log(longWord);
}