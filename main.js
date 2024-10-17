let contentBoxesContainer;
let speedButtons;
let colorButtons;
let saturationInput;
let saturationPercentage;
let lightnessInput;
let lightnessPercentage;

// This is a variable holding the number of boxes that will be created
const squaresToBeRendered = 560;

let range = 360;
let speed = 3;

// Default value of the color (undefined)
let hue = undefined;
// Default value of the saturation
let saturation = 80;
// Default value of the lightness
let lightness = 50;

function main() {
  getElements();
  addListeners();
  createSquares();
};

function getElements() {
  contentBoxesContainer = document.querySelector(".app__content-boxes");
  speedButtons = document.querySelectorAll(".app__content-button[data-setting='speed']");
  colorButtons = document.querySelectorAll(".app__content-button[data-setting='color']");
  saturationInput = document.querySelector("#saturation");
  saturationPercentage = document.querySelector(".app__content-label[for='saturation']");
  lightnessInput = document.querySelector("#lightness");
  lightnessPercentage = document.querySelector(".app__content-label[for='lightness']");
};

function addListeners() {
  colorButtons.forEach((colorButton) => colorButton.addEventListener("click", () => setRange(colorButton.dataset.colorRange)));
  speedButtons.forEach((speedButton) => speedButton.addEventListener("click", () => setSpeed(speedButton.dataset.speed)));
  saturationInput.addEventListener("mousemove", setSaturation);
  lightnessInput.addEventListener("mousemove", setLightness);
};

const createSquares = () => {
  contentBoxesContainer.innerHTML = "";

  for (let i = 0; i < squaresToBeRendered; i++) {
    const square = document.createElement("div");
    square.classList.add("app__content-box");
    square.addEventListener("mouseover", () => setColor(square));
    square.addEventListener("mouseout", () => removeColor(square));
    contentBoxesContainer.appendChild(square);
  }
}

const setColor = (square) => {
  range === 360
    ? hue = Math.floor(Math.random() * 360)
    : hue = Math.floor(Math.random() * 60) + range;

  saturation = parseInt(saturationInput.value);
  lightness = parseInt(lightnessInput.value);

  square.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

const setRange = (colorRange) => {
  range = parseInt(colorRange);
  createSquares();
}

const setSpeed = (speed) => {
  document.querySelectorAll(".app__content-box").forEach((square) => square.style.transitionDuration = `${speed}s`);
}

const setSaturation = () => {
  saturation = saturationInput.value;
  saturationPercentage.textContent = `Saturation: ${saturation}%`;
}

const setLightness = () => {
  lightness = lightnessInput.value;
  lightnessPercentage.textContent = `Lightness: ${lightness}%`;
}

const removeColor = (square) => {
  square.style.backgroundColor = "transparent";
}

document.addEventListener("DOMContentLoaded", main);