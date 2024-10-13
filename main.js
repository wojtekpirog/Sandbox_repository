let button;

function main() {
  getElements();
  addListeners();
}

function getElements() {
  button = document.querySelector(".button");
}

function addListeners() {
  button.addEventListener("click", handleAnimation);
}

const handleAnimation = (event) => {
  const cursorTop = event.pageY; // event.pageY to odległość kursora od górnej krawędzi strony
  const cursorLeft = event.pageX; // event.clientX to odległość kursora od lewej krawędzi strony

  const btnOffsetTop = event.target.offsetTop; // event.target.offsetTop jest odległość górnej krawędzi przycisku od górnej krawędzi strony
  const bthOffsetLeft = event.target.offsetLeft; // event.target.offsetLeft to odległość lewej krawędzi przycisku od lewej krawędzi strony

  const top = cursorTop - btnOffsetTop;
  const left = cursorLeft - bthOffsetLeft;

  const circle = document.createElement("span");
  circle.classList.add("button__circle");
  circle.style.setProperty("--top", `${top}px`);
  circle.style.setProperty("--left", `${left}px`);
  event.target.appendChild(circle);
  // Usuń element `circle` po zakończeniu animacji
  event.target.addEventListener("animationend", () => {event.target.removeChild(circle)});
}

window.addEventListener("DOMContentLoaded", main);