let accordion;
let accordionBtns;
let accordionTextBoxes;

function main() {
  getElements();
  addListeners();
};

function getElements() {
  accordion = document.querySelector(".app__accordion");
  accordionBtns = accordion.querySelectorAll(".app__accordion-button");
  accordionTextBoxes = accordion.querySelectorAll(".app__accordion-text-box");
};

function addListeners() {
  accordionBtns.forEach((accordionBtn) => accordionBtn.addEventListener("click", handleAccordionBoxes));
  window.addEventListener("click", closeOutsideAccordion);
}

function handleAccordionBoxes() {
  if (this.nextElementSibling.classList.contains("app__accordion-text-box--active")) {
    this.nextElementSibling.classList.remove("app__accordion-text-box--active");
    return ;
  }

  closeAccordionBoxes();
  this.nextElementSibling.classList.toggle("app__accordion-text-box--active");
}

const closeAccordionBoxes = () => {
  accordion.querySelectorAll(".app__accordion-text-box--active").forEach((textBox) => textBox.classList.remove("app__accordion-text-box--active"));
}

const closeOutsideAccordion = (event) => {
  event.target.classList.contains("app__accordion-button") || 
  event.target.classList.contains("app__accordion-text") ||
  event.target.classList.contains("app__accordion-text-box")
    ? false
    : closeAccordionBoxes();
}

document.addEventListener("DOMContentLoaded", main);