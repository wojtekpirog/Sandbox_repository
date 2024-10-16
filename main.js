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
let hue = undefined;
// The mormal speed of the animation
let speed = 3;
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
  colorButtons.forEach((colorButton) => {
    colorButton.addEventListener("click", () => handleSetColor(colorButton.dataset.colorRange));
  });
  speedButtons.forEach((speedButton) => {
    speedButton.addEventListener("click", () => handleSetSpeed(speedButton.dataset.speed));
  });
  saturationInput.addEventListener("mousemove", () => {
    saturation = parseInt(saturationInput.value);
    saturationPercentage.textContent = `Saturation: ${saturation}%`;
  });
  lightnessInput.addEventListener("mousemove", () => {
    lightness = parseInt(lightnessInput.value);
    lightnessPercentage.textContent = `Lightness: ${lightness}%`;
  });
};

const createSquares = () => {
  for (let i = 0; i < squaresToBeRendered; i++) {
    const square = document.createElement("div");
    square.classList.add("app__content-box");
    square.addEventListener("mouseover", () => setColor(square));
    square.addEventListener("mouseout", () => removeColor(square));
    contentBoxesContainer.appendChild(square);
  }
}

const handleSetColor = (colorRange) => { 
  range = parseFloat(colorRange);

  document.querySelectorAll(".app__content-box").forEach((contentBox) => setColor(contentBox));
}

const handleSetSpeed = (speedValue) => {
  speed = parseFloat(speedValue);

  document.querySelectorAll(".app__content-box").forEach((contentBox) => contentBox.style.animationDuration = `${speed}s`);
}

const setColor = (contentBox) => {
  range === 360
    ? hue = Math.floor(Math.random() * 360)
    : hue = Math.floor(Math.random() * 60) + range;

  saturation = saturationInput.value;
  lightness = lightnessInput.value;
  
  contentBox.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

const removeColor = (contentBox) => {
  contentBox.style.backgroundColor = "transparent";
}

document.addEventListener("DOMContentLoaded", main);