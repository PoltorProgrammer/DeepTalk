/************************************************************
 * 1. SPLASH SCREEN LOGIC
 ************************************************************/
// Wait for the window to load, then show the splash screen for 5 seconds
window.addEventListener('load', () => {
  setTimeout(() => {
    navigateToMainMenu();
  }, 2000); // Change to 2000 if you want a shorter splash
});

/************************************************************
 * 2. MAIN MENU LOGIC
 ************************************************************/

// Get references to the main menu buttons
const continueGameBtn = document.getElementById('continue-game');
const startNewGameBtn = document.getElementById('start-new-game');

// Set up click event listeners
continueGameBtn.addEventListener('click', navigateToGameplayScreen);
startNewGameBtn.addEventListener('click', navigateToCategoryScreen);

/************************************************************
 * 3. CATEGORY SELECTION SCREEN LOGIC
 ************************************************************/

// Example categories array
const categories = [
  { name: 'Relationships' },
  { name: 'Icebreakers' },
  { name: 'Deep Questions' },
  { name: 'Fun and Easy' },
  { name: 'Sex' }
];

// Keep track of user-selected categories
let selectedCategories = [];

// DOM elements for categories
const categoryListDiv = document.getElementById('category-list');
const startGameBtn = document.getElementById('start-game');

// Function to populate category selection screen
function populateCategories() {
  categoryListDiv.innerHTML = ''; // Clear existing
  categories.forEach((cat) => {
    const catBtn = document.createElement('button');
    catBtn.textContent = cat.name;
    catBtn.classList.add('category-option');
    catBtn.addEventListener('click', () => {
      toggleCategorySelection(catBtn, cat.name);
    });
    categoryListDiv.appendChild(catBtn);
  });
}

// Toggle category selection (highlight and track in array)
function toggleCategorySelection(button, categoryName) {
  if (selectedCategories.includes(categoryName)) {
    // Remove from selection
    selectedCategories = selectedCategories.filter((c) => c !== categoryName);
    button.classList.remove('selected');
  } else {
    // Add to selection
    selectedCategories.push(categoryName);
    button.classList.add('selected');
  }
}

// Handle Start Game button click
startGameBtn.addEventListener('click', () => {
  if (selectedCategories.length === 0) {
    alert('Please select at least one category.');
    return;
  }
  navigateToGameplayScreen();
});

/************************************************************
 * 4. GAMEPLAY SCREEN LOGIC
 ************************************************************/

// Example question bank
const questions = [
  { text: "What's your idea of a perfect date?", category: 'Relationships' },
  { text: "Do you believe in love at first sight?", category: 'Relationships' },
  { text: "If you could have any superpower, what would it be?", category: 'Icebreakers' },
  { text: "What's your favorite hobby?", category: 'Icebreakers' },
  { text: "What do you value most in friendship?", category: 'Deep Questions' },
  { text: "What is your biggest fear?", category: 'Deep Questions' },
  { text: "If you were a color, which one would you be and why?", category: 'Fun and Easy' },
  { text: "What's your favorite comfort food?", category: 'Fun and Easy' },
  { text: "What's the craziest thing you've ever done?", category: 'Sex' },
  { text: "Have you ever had a wild night you'll never forget?", category: 'Sex' }
];

let usedQuestions = [];

// Get references to gameplay elements
const questionTextEl = document.getElementById('question-text');
const nextQuestionBtn = document.getElementById('next-question');
const backToMenuBtn = document.getElementById('back-to-menu');

// Event listeners for gameplay buttons
nextQuestionBtn.addEventListener('click', showNextQuestion);
backToMenuBtn.addEventListener('click', navigateToMainMenu);

// Show the next question
function showNextQuestion() {
  // Filter questions by selected categories
  const filteredQuestions = questions.filter((q) =>
    selectedCategories.includes(q.category)
  );

  // Filter out used questions
  const available = filteredQuestions.filter(
    (q) => !usedQuestions.includes(q.text)
  );

  // If no more questions are available, notify the user
  if (available.length === 0) {
    questionTextEl.textContent = "No more questions in these categories!";
    return;
  }

  // Pick a random question
  const randomIndex = Math.floor(Math.random() * available.length);
  const chosenQuestion = available[randomIndex];
  questionTextEl.textContent = chosenQuestion.text;

  // Mark this question as used
  usedQuestions.push(chosenQuestion.text);
}

/************************************************************
 * NAVIGATION FUNCTIONS
 ************************************************************/

function navigateToMainMenu() {
  hideAllScreens();
  document.getElementById('main-menu').style.display = 'flex';
}

function navigateToCategoryScreen() {
  hideAllScreens();
  document.getElementById('category-selection').style.display = 'flex';
  // Reset selections & populate fresh
  selectedCategories = [];
  populateCategories();
}

function navigateToGameplayScreen() {
  hideAllScreens();
  document.getElementById('gameplay-screen').style.display = 'flex';
  // Reset used questions each time we start or continue (optional)
  usedQuestions = [];
  // Show a fresh question when entering the screen
  showNextQuestion();
}

function hideAllScreens() {
  document.getElementById('splash-screen').style.display = 'none';
  document.getElementById('main-menu').style.display = 'none';
  document.getElementById('category-selection').style.display = 'none';
  document.getElementById('gameplay-screen').style.display = 'none';
}
