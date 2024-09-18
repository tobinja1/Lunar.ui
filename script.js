var hydra = new Hydra({
    detectAudio: false,
    enableStreamCapture: false,
    autoLoop: true,
    makeGlobal: true,
  })

const knob = document.getElementById("knob-inner");
const currentValue = 0;
const progressRing = document.getElementById("progress-ring");
  
let center = 0;
var distance = 0;
let mouseIsDown = false;
let lastDistance = 0;

//hydra

let randOnInit = Math.random();

  noise(3,0.1,7)
  .rotate(1,-1,-2).mask(shape(randOnInit * 20 + 1))
  .colorama(()=>randOnInit*distance/360)
  .modulateScale(o0)
  .modulateScale(o0,1.5,)
  .blend(o0)
  .blend(o0)
  .blend(o0)
  .blend(o0)
  .out(o0)

//hydra
function clamp(value, max, min) {
    return Math.max(min, Math.min(max, value)); // Ensures value stays between min and max
  }
  
  // Function to handle the start of interaction (mouse or touch)
  function startInteraction(pageY) {
    center = pageY;
    mouseIsDown = true;
  }
  
  // Function to handle movement (mouse or touch)
  function moveInteraction(pageY) {
    if (mouseIsDown) {
      const newDistance = clamp(lastDistance + (center - pageY), 360, 0);
      distance = newDistance;
      knob.style.transform = "rotate(" + distance + "deg)";
      progressRing.style.background = `conic-gradient(hotpink 0deg, hotpink ${distance}deg, black ${distance}deg 360deg)`;
    }
  }
  
  // Function to handle the end of interaction (mouse or touch)
  function endInteraction() {
    if (mouseIsDown) {
      mouseIsDown = false;
      lastDistance = distance;
    }
  }
  
  // Desktop events
  knob.addEventListener("mousedown", (e) => startInteraction(e.pageY));
  document.addEventListener("mousemove", (e) => moveInteraction(e.pageY));
  document.addEventListener("mouseup", () => endInteraction());
  
  // Mobile events
  knob.addEventListener("touchstart", (e) => {
    const touch = e.touches[0]; // Get the first touch point
    startInteraction(touch.pageY);
  });
  
  document.addEventListener("touchmove", (e) => {
    const touch = e.touches[0];
    moveInteraction(touch.pageY);
  });
  
  document.addEventListener("touchend", () => endInteraction());