const knob = document.getElementById("knob-inner");
const currentValue = 0;
const progressRing = document.getElementById("progress-ring");

let center = 0;
let mouseIsDown = false;
let lastDistance = 0;

function clamp(value, max, min) {
  if (value > max) return max;
  if (value < min) return min;
  return value;
}

knob.addEventListener("mousedown", (e) => {
  // Set the center based on the mouse's starting position
  center = e.pageY;
  mouseIsDown = true;
});

document.addEventListener("mouseup", () => {
  if (mouseIsDown) {
    mouseIsDown = false;
    // Store the current distance for the next drag
    lastDistance = distance;
  }
});

knob.addEventListener("mousemove", (e) => {
  if (mouseIsDown) {
    // Calculate the new distance relative to lastDistance
    const newDistance = clamp(lastDistance + (center - e.pageY), 360, 0);
    distance = newDistance;
    knob.style.transform = "rotate(" + distance + "deg)";
    progressRing.style.background = `conic-gradient(red 0deg, red ${distance}deg, lightgray ${distance}deg 360deg)`;
  }
});