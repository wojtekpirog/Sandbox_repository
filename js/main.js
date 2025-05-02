let hamburgerSqueeze;
let mobileNav;
let currentYear;
let submitBtn;
// Form fields
let fullname;
let email;
let textarea;
// Form btns
let formResetBtn;
let formSubmitBtn;
// Navbar links
let navbarLinks;

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
  // Form fields
  fullname = document.querySelector("#name");
  email = document.querySelector("#contactFormEmail");
  textarea = document.querySelector("#message");
  // Form btns
  formResetBtn = document.querySelector(".contact__form-btn--clear");
  formSubmitBtn = document.querySelector(".contact__form-btn--submit");
  // Navbar links
  navbarLinks = mobileNav.querySelectorAll(".nav__link");
};

function addListeners() {
  hamburgerSqueeze.addEventListener("click", toggleActive);
  submitBtn.addEventListener("click", handleNewsletter);
  formResetBtn.addEventListener("click", handleFormClear);
  formSubmitBtn.addEventListener("click", handleFormSubmit);
  navbarLinks.forEach((navbarLink) => navbarLink.addEventListener("click", closeNavbarMenu));
  window.addEventListener("resize", () => window.innerWidth >= 992 ? closeNavbarMenu() : false);
}

const toggleActive = () => {
  mobileNav.classList.contains("nav__mobile--active")
    ? closeNavbarMenu()
    : openNavbarMenu();
}

const openNavbarMenu = () => {
  document.body.classList.add("no-scroll");
  hamburgerSqueeze.classList.add("hamburger__squeeze--active")
  mobileNav.classList.add("nav__mobile--active");
}

const closeNavbarMenu = () => {
  document.body.classList.remove("no-scroll");
  hamburgerSqueeze.classList.remove("hamburger__squeeze--active")
  mobileNav.classList.remove("nav__mobile--active");
}

const handleNewsletter = (event) => {
  event.preventDefault();
}

const handleFormClear = (event) => {
  event.preventDefault();
  const formFields = [fullname, email, textarea]; 
  formFields.forEach((formField) => formField.value = "");
}

const handleFormSubmit = (event) => {
  event.preventDefault();

  const formFields = [
    {
      input: fullname,
      minLength: 3
    },
    {
      input: email,
      minLength: 8
    },
    {
      input: textarea,
      minLength: 10
    }
  ];

  checkForm(formFields);
  checkLength(formFields);
  checkEmail(email);
  checkForErrors(formFields);
}

const checkForm = (formFields) => {
  formFields.forEach((field) => {
    field.input.value === ""
      ? showError(field.input, "Wartość nie może być pusta.")
      : hideError(field.input);
  });
}

const checkLength = (formFields) => {
  formFields.forEach((field) => {
    field.input.value.length < field.minLength
      ? showError(field.input, `To pole musi zawierać minimum ${field.minLength} znaków.`)
      : hideError(field.input);
  });
}

const checkEmail = (email) => {
  const regexp = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;

  !regexp.test(email.value)
    ? showError(email, "Niepoprawny adres e-mail.")
    : hideError(email);
}

const showError = (field, message) => {
  field.classList.add("error");
  field.nextElementSibling.style.display = "block";
  field.nextElementSibling.textContent = message;
}

const hideError = (field) => {
  field.classList.remove("error");
  field.nextElementSibling.style.display = "none";
  field.nextElementSibling.textContent = "";
}

const checkForErrors = (formFields) => {
  let errorCount = 0;
  
  formFields.forEach((field) => {
    if (field.input.classList.contains("error")) {
      errorCount += 1
    }
  });

  if (errorCount === 0) {
    console.log("Formularz przesłany!");
  }
}

const handleCurrentYear = () => {
  const year = new Date().getFullYear();
  currentYear.textContent = year;
}

document.addEventListener("DOMContentLoaded", main);