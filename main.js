let icon;
let input;

function main() {
  getElements();
  addListeners();
}

function getElements() {
  icon = document.querySelector(".navbar__search-icon");
  input = document.querySelector(".navbar__search-input");
}

function addListeners() {
  icon.addEventListener("click", toggleInput);
}

function toggleInput() {
  input.classList.toggle("navbar__search-input--inactive");
  // Sprawdź, czy input jest aktywny
  const isExpanded = !input.classList.contains("navbar__search-input--inactive");
  // Jeśli jest, to go ukryj
  if (isExpanded) {
    icon.setAttribute("aria-expanded", "true");
    input.setAttribute("aria-hidden", "false");
  } else {
    icon.setAttribute("aria-expanded", "false");
    input.setAttribute("aria-hidden", "true");
  }
}

window.addEventListener("DOMContentLoaded", main);