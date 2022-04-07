var password = "this is an example";
var complexity = 7;
// Define possible delimiters to use.
var delimList = [".", "-", "!", "*", "%", "?", "=", "_"];
var leetletter = Math.floor(Math.random() * 4)
var words = [];

// Getting words from file: Currently this works but it's async so hard to get into array. Maybe try another .then ??
/*const fileUrl = '/common.txt';
fetch(fileUrl)
   .then( r => r.text() )
   //.then( t => words.push(t) )
   //.then( t => console.log(t) )
   .then((response) => {words = response.split("\n")})
   .catch (function() {console.log("Error fetching text");})*/

function createRipple(event) {
	const button = event.currentTarget;
	const circle = document.createElement("span");
	const diameter = Math.max(button.clientWidth, button.clientHeight);
	const radius = diameter / 2;
	circle.style.width = circle.style.height = `${diameter}px`;
	circle.style.left = `${event.clientX - (button.offsetLeft + radius)}px`;
	circle.style.top = `${event.clientY - (button.offsetTop + radius)}px`;
	circle.classList.add("ripple"); 
	const ripple = button.getElementsByClassName("ripple")[0];

	if (ripple) {
		ripple.remove();
	}
	button.appendChild(circle);
}

const buttons = document.getElementsByTagName("button");
for (const button of buttons) {
  button.addEventListener("click", createRipple);
}

function generatePassword() {
    var delim = delimList[~~(Math.random() * delimList.length)];
    // Define logic for each complexity of passphrase.
    switch(complexity) {
        case 1:
            // word word 
            password = randWord()+randWord();
            break;
        case 2:
            // word word num(2)
            password = randWord()+randWord()+randNum(2);
            break;
        case 3:
            // Capitalword Capitalword num(2)
            password = randWord("caps")+randWord("caps")+randNum(2);
            break;
        case 4:
            // Capitalword delim Capitalword num(2)
            password = randWord("caps")+delim+randWord("caps")+randNum(2);
            break;
        case 5:
            // Capitalword delim Capitalword delim Capitalword delim Capitalword num(2)
            password = randWord("caps")+delim+randWord("caps")+delim+randWord("caps")+delim+randWord("caps")+randNum(2);
            break;
        case 6:
            // Capitalword delim Capitalword delim Capitalword delim Capitalword num(4)
            password = randWord("caps")+delim+randWord("caps")+delim+randWord("caps")+delim+randWord("caps")+randNum(2);
            break;
        case 7:
            // Capitalword(1) delim Capitalword(1) delim Capitalword(1) delim Capitalword(1) num(2)
            password = randWord("caps")+delim+randWord("caps")+delim+randWord("caps")+delim+randWord("caps")+randNum(2);
          break;
        case 8:
            // Capitalword(1) delim Capitalword(1) delim Capitalword(1) delim Capitalword(1) delim Capitalword(1) num(4)
            password = randWord("caps")+delim+randWord("caps")+delim+randWord("caps")+delim+randWord("caps")+delim+randWord("caps")+randNum(4);
          break;
        case 9:
            // Capitalword(1) delim Capitalword(1) delim Capitalword(1) delim Capitalword(1) delim Capitalword(1) delim Capitalword(1) delim Capitalword(1) num(4)
            password = randWord("caps")+delim+randWord("caps")+delim+randWord("caps")+delim+randWord("caps")+delim+randWord("caps")+delim+randWord("caps")+delim+randWord("caps")+randNum(4);
            break;
        case 10:
            // Capitalword(1) delim Capitalword(1) delim Capitalword(1) delim Capitalword(1) delim Capitalword(1) delim Capitalword(1) delim Capitalword(1) delim Capitalword(1) delim Capitalword(1) delim Capitalword(1) num(4)
            password = randWord('caps')+delim+randWord("caps")+delim+randWord("caps")+delim+randWord("caps")+delim+randWord("caps")+delim+randWord("caps")+delim+randWord("caps")+delim+randWord("caps")+delim+randWord("caps")+delim+randWord("caps")+randNum(4);
            break;
        default:
            // Complexity not set
            password = "Welcome";
      }
    document.getElementById("heading").innerHTML = password;
}

function randWord(modifier) {
    var commonwords_array = commonwords.split(",");
    const commonwords_arrayLength = commonwords_array.length
    const wordIndex = Math.round(Math.random() * commonwords_arrayLength)
    let newWord = commonwords_array[wordIndex];

    if (modifier==="caps") {
      // Capitalize, comrade
      newWord = newWord[0].toUpperCase()+newWord.substring(1);
    }
    return newWord;
  }

function randNum(digits) {
    // This is a random number to append to the passphrase.
    // We're using a string because each digit is random 0-9.
    // Each digit is treated as a char instead of int which would get added.
    let newNumber = "";
    for (let i = 0; i < digits; i++) {
      newNumber += (~~(Math.random() * 10));
    }
    return newNumber;
  }

function delim() {
    return delim;
}

function updateComplexity(){
    complexity++;
}