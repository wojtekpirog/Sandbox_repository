let stepIndicator;
let formPages;
let progressBar;
let progressSteps;
let prevButton;
let nextButton;

// Bieżący krok formularza:
let currentStep = 1;

function main() {
  getElements();
  addListeners();
};

function getElements() {
  stepIndicator = document.querySelector(".app__form-indicator");
  formPages = document.querySelectorAll(".app__form-page");
  progressBar = document.querySelector(".app__progress-bar");
  progressSteps = document.querySelectorAll(".app__progress-step");
  prevButton = document.querySelector(".app__button--prev");
  nextButton = document.querySelector(".app__button--next");
};

function addListeners() {
  prevButton.addEventListener("click", goToPrevStep);
  nextButton.addEventListener("click", goToNextStep);
};

const goToNextStep = () => {
  currentStep += 1;
  // Czy osiągnięto ostatni krok formularza?
  currentStep > progressSteps.length && (currentStep = progressSteps.length);
  handleProgress();
}

const goToPrevStep = () => {
  currentStep -= 1;
  // Czy osiągnięto pierwszy krok formularza?
  currentStep < 1 && (currentStep = 1);
  handleProgress();
}

const handleProgress = () => {
  progressSteps.forEach((step, index) => {
    step.removeAttribute("aria-current");
    step.classList.remove("app__progress-step--active");

    currentStep === index + 1 && step.setAttribute("aria-current", "step");
    currentStep >= index + 1 && step.classList.add("app__progress-step--active");
  });
  
  progressBar.style.setProperty("--width", `${100 * ((currentStep - 1) / (progressSteps.length - 1))}%`);
  stepIndicator.textContent = `You are on step ${currentStep} of ${progressSteps.length}.`;
  changeFormPage();
  handleDisabled();
}

const handleDisabled = () => {
  if (currentStep === progressSteps.length) {
    nextButton.disabled = true;
  } else if (currentStep === 1) {
    prevButton.disabled = true;
  } else {
    prevButton.disabled = false;
    nextButton.disabled = false;
  }
}

const changeFormPage = () => {
  formPages.forEach((page, index) => {
    if (currentStep === index + 1) {
      page.classList.add("app__form-page--active");
      page.setAttribute("aria-current", "page");
    } else {
      page.classList.remove("app__form-page--active");
      page.removeAttribute("aria-current");
    };
  });
}

document.addEventListener("DOMContentLoaded", main);