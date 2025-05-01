let hamburgerSqueeze;
let mobileNav;
let currentYear;
let submitBtn;

function main() {
  getElements();
  addListeners();
  handleCurrentYear();
};

function getElements() {
  hamburgerSqueeze = document.querySelector(".hamburger__squeeze");
  mobileNav = document.querySelector(".nav__mobile");
  currentYear = document.querySelector(".footer__year");
  submitBtn = document.querySelector(".newsletter__form-interactive > button");

  console.log(submitBtn);
};

function addListeners() {
  hamburgerSqueeze.addEventListener("click", toggleActive);
  submitBtn.addEventListener("click", handleFormSubmit);
}

const toggleActive = () => {
  if (hamburgerSqueeze.classList.contains("hamburger__squeeze--active")) {
    hamburgerSqueeze.classList.remove("hamburger__squeeze--active")
    mobileNav.classList.remove("nav__mobile--active");
  } else {
    hamburgerSqueeze.classList.add("hamburger__squeeze--active")
    mobileNav.classList.add("nav__mobile--active");
  }
}

const handleFormSubmit = (event) => {
  event.preventDefault();
}

const handleCurrentYear = () => {
  const year = new Date().getFullYear();
  currentYear.textContent = year;
}

document.addEventListener("DOMContentLoaded", main);