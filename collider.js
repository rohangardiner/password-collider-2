var password = "this is an example";
var complexity = 7;
// Define possible delimiters to use.
var delimList = [".", "-", "!", "*", "%", "?", "=", "_"];
var leetletter = Math.floor(Math.random() * 4)
// Create array to hold words
var words = [];
// Initialise rating to be altered later
var starRating = 5;

// Create ripple effect on function call
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

  // Remove any exisitng ripples when button clicked
	if (ripple) {
		ripple.remove();
	}
	button.appendChild(circle);
}

// Add listener to buttons to crate ripple effect on click
const buttons = document.getElementsByTagName("button");
for (const button of buttons) {
  button.addEventListener("click", createRipple);
}

function generatePassword() {
  // Set delimiter here so it's the same for all delimiters this generation
  var delim = delimList[~~(Math.random() * delimList.length)];
  // Define logic for each complexity of passphrase.
  switch(complexity) {
    case 1:
      password = randWord()+randWord();
      break;
    case 2:
      password = randWord()+randWord()+randNum(1);
      break;
    case 3:
      password = randWord()+randWord()+randNum(2);
      break;
    case 4:
      password = randWord()+delim+randWord()+delim+randWord()+randNum(1);
      break;
    case 5:
      password = randWord("caps")+delim+randWord()+delim+randWord()+randNum(2);
      break;
    case 6:
      password = randWord("caps")+delim+randWord()+delim+randWord()+randNum(3);
      break;
    case 7:
      password = randWord("caps")+delim+randWord("caps")+delim+randWord("caps")+delim+randWord("caps")+randNum(2);
      break;
    case 8:
      password = randWord("caps","randcaps")+delim+randWord("caps","randcaps")+delim+randWord("caps","randcaps")+delim+randWord("caps","leet")+randNum(3);
      break;
    case 9:
      password = randWord("caps","randcaps")+delim+randWord("caps","randcaps","leet")+delim+randWord("caps","randcaps","leet")+delim+randWord("caps","randcaps")+randNum(4);
      break;
    case 10:
      password = randWord("caps","randcaps","leet")+delim+randWord("caps","randcaps","leet")+delim+randWord("caps","randcaps","leet")+delim+randWord("caps","randcaps","leet")+delim+randWord("caps","randcaps")+randNum(4);
      break;
    default:
      // Complexity not set
      password = "Welcome";
  }
  // Update display with calculated passphrase
  document.getElementById("heading").innerHTML = password;
  // Update subtitle with password strength
  updateSubtitle();
}

function randWord() {
  // Get array of common words
  var commonwords_array = commonwords.split(",");
  const commonwords_arrayLength = commonwords_array.length;
  // Roll random number and pick that index word from big list
  const wordIndex = Math.round(Math.random() * commonwords_arrayLength)
  let newWord = commonwords_array[wordIndex];

  // Check for modifiers passed in the generatePassword switch
  for (var i = 0; i < arguments.length; i++) {
    if (arguments[i]==="caps") {
      // Capitalize, comrade
      newWord = newWord[0].toUpperCase()+newWord.substring(1);
    } else if (arguments[i]==="randcaps") {
      // Random caps
    } else if (arguments[i]==="leet") {
      // Leet speak
      var leetness = Math.floor(Math.random() * 4);
      if (leetness <= 0) { newWord = newWord.replace(/e/g, "3"); }
      if (leetness <= 1) { newWord = newWord.replace(/i/g, "1"); }
      if (leetness <= 2) { newWord = newWord.replace(/s/g, "$"); }
      if (leetness <= 3) { newWord = newWord.replace(/a/g, "@"); }
    }
  }
  // Once all modifications done, return the word
  return newWord;
}

function randNum(digits) {
    // This is a random number to append to the passphrase.
    // We're using a string because each digit is random 0-9.
    // Each digit is treated as a char instead of int which would add together.
    let newNumber = "";
    for (let i = 0; i < digits; i++) {
      newNumber += (~~(Math.random() * 10));
    }
    return newNumber;
  }

function delim() {
  // Returns the delimiter defined in generatePassphrase function
  // We choose a delimiter there so it's the same for each call this generation
    return delim;
}

function updateComplexity(direction){
  if (direction == 'easy' && complexity > 1) {
      complexity--;
      generatePassword();
  }
  else if (direction == 'hard' && complexity < 10) {
    complexity++;
    generatePassword();
  }
  else {
    generatePassword();
  }
}

function updateSubtitle() {
  // Calc star rating by halving complexity score and append to subheading
  starRating = complexity/2;
  document.getElementById("subheading").innerHTML = "Passphrase strength: <span class=\"stars\" style=\"--rating: "+starRating+";\"></span>";
}

function copyPassword() {
  navigator.clipboard.writeText(password);
}

function bulkGenerate(amount) {
  //Create an empty element to hold download link
  var elemDiv = document.createElement('a');
    elemDiv.download = 'passphrase.csv';
    elemDiv.id = 'downloadlink';
    document.body.appendChild(elemDiv);

    // Generate string of passwords, comma-delimited
    var outputstring = "";
    var textFile = null;
    for (var i = 0; i < amount; i++) {
      generatePassword()
      outputstring += password + ",";
    }

    // Logic to create text file from comma-delimited string
    function makeTextFile(text) {
      var data = new Blob([text], {type: 'text/csv;charset=utf-8;' });
      if (textFile !== null) {
        window.URL.revokeObjectURL(textFile);
      }
      textFile = window.URL.createObjectURL(data);
      return textFile;
    };

    // Find the created download link and simulate click
      var link = document.getElementById('downloadlink');
      link.href = makeTextFile(outputstring);
      elemDiv.click();
}