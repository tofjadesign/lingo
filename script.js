// Woordenlijst
const words = ["snake", "maple", "river", "chair", "tiger", "beach", "cloud", "music"];

// Eerdere woorden
let previousWords = [];

// Kies willekeurig woord en initialiseer het aantal pogingen
let selectedWord = words[Math.floor(Math.random() * words.length)];
let attempts = 0; // Hier initialiseren we attempts
const maxAttempts = 5; // Definieer en geef een waarde aan maxAttempts

// Elementen
const guessInput = document.getElementById("guessInput");
const checkButton = document.getElementById("checkButton");
const previousAttemptsContainer = document.getElementById("previousAttempts");
const feedback = document.getElementById("feedback");

const restartButton = document.getElementById("restartButton");

function addPreviousAttempt(guess, result) {
  const attemptElement = document.createElement("p");
  
  if (guess === selectedWord) {
    attemptElement.innerHTML = `Poging ${attempts}: <span class="hint-correct">${guess}</span> - ${result}`;
  } else {
    attemptElement.textContent = `Poging ${attempts}: ${guess} - ${result}`;
  }

  previousAttemptsContainer.appendChild(attemptElement);

  if (result === "You guessed the word.") {
    const congratulatoryElement = document.createElement("p");
    congratulatoryElement.textContent = 'Congratulations!';
    previousAttemptsContainer.appendChild(congratulatoryElement);
  }
}

// Functie om hint te genereren
function generateHint(word, guess) {
  let hint = "";
  for (let i = 0; i < word.length; i++) {
    if (word[i] === guess[i]) {
      hint += word[i].toUpperCase();
    } else if (word.includes(guess[i])) {
      hint += "+";
    } else {
      hint += "-";
    }
  }
  return hint;
}

// Event listener voor controleren van gok
checkButton.addEventListener("click", () => {
  // Controleer of het maximale aantal pogingen is bereikt
  if (attempts >= maxAttempts) {
    feedback.textContent = "You have reached the maximum number of attempts..";
    return;
  }
  
  // Voer de rest van de code uit om de gok te controleren
  const guess = guessInput.value.toLowerCase();
  if (guess.length !== 5 || !/^[a-z]+$/.test(guess)) {
    feedback.textContent = "Please enter a valid five letter word.";
    return;
  }
  attempts++;
  if (guess === selectedWord) {
    feedback.innerHTML += `<br><span class="hint-correct white">Congratulations!</span> <span class="hint-geraden">You guessed the word.`;
  } else {
    const hint = generateHint(selectedWord, guess);
    let hintHTML = "";
    for (let i = 0; i < hint.length; i++) {
      if (hint[i] === "+") {
        hintHTML += `<span class="hint-letter">${guess[i]}</span>`;
      } else if (hint[i] === "-") {
        hintHTML += `<span class="hint-wrong">${guess[i]}</span>`;
      } else {
        hintHTML += `<span class="hint-correct">${guess[i].toUpperCase()}</span>`;
      }
    }
    feedback.innerHTML += `<br>${hintHTML}`;
    if (attempts === maxAttempts) {
      feedback.innerHTML += `<br>The word was: ${selectedWord}`;
    }
  }


  // Schakel de knop voor het controleren van de gok uit als het maximale aantal pogingen is bereikt
  if (attempts >= maxAttempts) {
    checkButton.disabled = true;
  }
});
