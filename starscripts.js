var hydra = new Hydra({
    detectAudio: false,
    enableStreamCapture: false,
    autoLoop: true,
    makeGlobal: true,
  })

const knob = document.getElementById("sun-knob");
const currentValue = 0;
var sunPercent = document.getElementById("sun-knob-percentage");
  
let center = 0;
var distance = 0;
let mouseIsDown = false;
let lastDistance = 0;
var normDistance = 0;
var moonPhaseText;

var newMoonIcon = document.getElementById("new-moon");
var waxingMoonIcon = document.getElementById("waxing-moon");
var fullMoonIcon = document.getElementById("full-moon");
var waningMoonIcon = document.getElementById("waning-moon");

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

//getting data, changing text

const date = new Date();

let day = date.getDate();
let month = date.toLocaleString('default', { month: 'short' });
let monthNum = date.getMonth() + 1;
let year = date.getFullYear();

let fullDateline = year + "-" + monthNum + "-" + day;

document.getElementById("knob-card-day").innerHTML = day;
document.getElementById("knob-card-month").innerHTML = month;

fetch("https://aa.usno.navy.mil/api/rstt/oneday?date=" + fullDateline + "%20&coords=41.89,%2012.48")
  .then((response) => response.json())
  // .then((response) => document.getElementById("knob-card-moonphase-text").innerHTML = response.phasedata[0].phase);
  .then((response) => document.getElementById("knob-card-moonphase-text").innerHTML = response.properties.data.curphase)

// moonPhaseText =  document.getElementById("knob-card-moonphase-text").innerHTML;

// if(moonPhaseText == "New Moon") {
//   document.getElementById("new-moon").style.opacity = 1;
// }
// else if(moonPhaseText == "Waxing Crescent" || moonPhaseText == "First Quarter" || moonPhaseText == "Waxing Gibbous") {
//   document.getElementById("waxing-moon").style.opacity = 1;
// }
// else if(moonPhaseText == "Full Moon") {
//   document.getElementById("full-moon").style.opacity = 1;
// }
// else {
//   document.getElementById("waning-moon").style.opacity = 1;
// }

//knobs

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
      normDistance = distance/360;
      moonIconCalc(normDistance)
      sunPercent.innerHTML = Math.floor(normDistance * 100) + "%";
      knob.style.background = `conic-gradient(black 0deg, black ${distance}deg, white ${distance}deg 360deg)`;
    }
  }

  function moveEndlessInteraction(pageY) {
    if (mouseIsDown) {
      const newDistance = clamp(lastDistance + (center - pageY), 360, 0);
      distance = newDistance;
      normDistance = distance/360;
      console.log(normDistance);
      knob.style.background = `conic-gradient(black 0deg, black ${distance}deg, white ${distance}deg 360deg)`;
    }
  }
  
  function endInteraction() {
    if (mouseIsDown) {
      mouseIsDown = false;
      lastDistance = distance;
    }
  }

  function moonJump(degree){
    distance = degree;
    newNormDistance = distance/360;
    knob.style.background = `conic-gradient(black 0deg, black ${distance}deg, white ${distance}deg 360deg)`;
    sunPercent.innerHTML = Math.floor(newNormDistance * 100) + "%";
    moonIconCalc(newNormDistance);
    lastDistance = distance;
  }

  function moonIconCalc(degree){
    if(degree >= .25 && degree < .50) {
      document.getElementById("new-moon").style.opacity = 1;
      document.getElementById("waxing-moon").style.opacity = 1;
      document.getElementById("full-moon").style.opacity = 0.4;
      document.getElementById("waning-moon").style.opacity = 0.4;
    }
    if(degree >= .50 && degree < .75) {
      document.getElementById("new-moon").style.opacity = 1;
      document.getElementById("waxing-moon").style.opacity = 1;
      document.getElementById("full-moon").style.opacity = 1;
      document.getElementById("waning-moon").style.opacity = 0.4;
    }
    if(degree >= .75 && degree < 1) {
      document.getElementById("new-moon").style.opacity = 1;
      document.getElementById("waxing-moon").style.opacity = 1;
      document.getElementById("full-moon").style.opacity = 1;
      document.getElementById("waning-moon").style.opacity = 1;
    }
    else if (degree < .25){
      document.getElementById("new-moon").style.opacity = 1;
      document.getElementById("waxing-moon").style.opacity = 0.4;
      document.getElementById("full-moon").style.opacity = 0.4;
      document.getElementById("waning-moon").style.opacity = 0.4;
    }
  }
  
  // Desktop events
  knob.addEventListener("mousedown", (e) => startInteraction(e.pageY));
  knob.addEventListener("mousedown", (e) => e.preventDefault());

  newMoonIcon.addEventListener("mousedown", () => moonJump(0));
  waxingMoonIcon.addEventListener("mousedown", () => moonJump(90));
  fullMoonIcon.addEventListener("mousedown", () => moonJump(180));
  waningMoonIcon.addEventListener("mousedown", () => moonJump(270));

  document.addEventListener("mousemove", (e) => moveInteraction(e.pageY));
  document.addEventListener("mousemove", (e) => e.preventDefault());

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

  newMoonIcon.addEventListener("touchstart", () => moonJump(0));
  waxingMoonIcon.addEventListener("touchstart", () => moonJump(90));
  fullMoonIcon.addEventListener("touchstart", () => moonJump(180));
  waningMoonIcon.addEventListener("touchstart", () => moonJump(270));
  
  document.addEventListener("touchend", () => endInteraction());