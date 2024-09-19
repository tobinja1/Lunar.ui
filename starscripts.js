var hydra = new Hydra({
    detectAudio: false,
    enableStreamCapture: false,
    autoLoop: true,
    makeGlobal: true,
  })

const knob = document.getElementById("sun-knob");
const currentValue = 0;
  
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
    return Math.max(min, Math.min(max, value));
  }
  
  function startInteraction(pageY) {
    center = pageY;
    mouseIsDown = true;
  }
  
  function moveInteraction(pageY) {
    if (mouseIsDown) {
      const newDistance = clamp(lastDistance + (center - pageY), 360, 0);
      distance = newDistance;
      knob.style.background = `conic-gradient(black 0deg, black ${distance}deg, white ${distance}deg 360deg)`;
    }
  }
  
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
  
  // Mobile events (mobile reacts to any touch at all)
  document.addEventListener("touchstart", (e) => {
    const touch = e.touches[0]; // Get the first touch point
    startInteraction(touch.pageY);
  });
  
  document.addEventListener("touchmove", (e) => {
    const touch = e.touches[0];
    moveInteraction(touch.pageY);
  });
  
  document.addEventListener("touchend", () => endInteraction());