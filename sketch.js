let osc1, osc2, osc3;
let amps = [0, 0, 0];
let targetAmps = [0, 0, 0];
let rampDuration = 1.0;
let lastRampTime = 0.0;
let currentOscillator = -1;

let colorvalue = 0;
let colorvalue2 = 0;
let colorvalue3 = 0;

function setup() {
  createCanvas(550, 285, WEBGL);
  osc1 = new p5.Oscillator();
  osc1.setType('sine');
  osc1.freq(285);
  osc1.amp(amps[0]);
  osc1.start();
  
  osc2 = new p5.Oscillator();
  osc2.setType('sine');
  osc2.freq(osc1.getFreq()*2);
  osc2.amp(amps[1]);
  osc2.start();
  
  osc3 = new p5.Oscillator();
  osc3.setType('sine');
  osc3.freq(osc1.getFreq()*3);
  osc3.amp(amps[2]);
  osc3.start();
}

function draw() {
  background(220);
  
  // Check if it's time to change the amplitude
  if (millis() - lastRampTime > rampDuration * 1000) {
    changeAmplitude();
  }
  
  // Update the amplitudes
  for (let i = 0; i < amps.length; i++) {
    amps[i] += (targetAmps[i] - amps[i]) * 0.01;
    if (i === currentOscillator) {
      amps[i] = targetAmps[i];
    }
  }
  
  // Set the amplitudes of the oscillators
  osc1.amp(amps[0]);
  osc2.amp(amps[1]);
  osc3.amp(amps[2]);
  
  
  //visual 
   background(40, 40, 40);

  let locX = mouseX - height / 1;
  let locY = mouseY - width / 1;
  
  colorvalue = 255 * amps[0];
  colorvalue2 = 255 * amps[1];
  colorvalue3 = 255 * amps[2];

  ambientLight(50);
  directionalLight(137, 0);
  pointLight(colorvalue,0,colorvalue2,180);
  //pointLight(colorvalue,135,240,-560);
  //pointLight(240, 0, 240, locX, locY, 180);
  //pointLight(240, 0, 240, locX, locY, 150);

  push();
  translate(-width / 145, 0, 0); // move the box to the left
  //rotateZ(frameCount * 0);
  rotateX(frameCount * .03);
  specularMaterial(440);
  ellipsoid(245, 100, 95);
  pop();

  translate(width / 0, 0, 0);
  normalMaterial()
}

function changeAmplitude() {
  // Select a random oscillator to change amplitude
  let newOscillator = floor(random(3));
  
  // Set the target amplitude for the selected oscillator
  targetAmps[newOscillator] = random(0.1, 0.5);
  
  // Set the current oscillator to -1 to indicate that no oscillator is currently being ramped
  currentOscillator = -1;
  
  // Update the last ramp time
  lastRampTime = millis();
}

function keyPressed() {
    if (keyCode === 32) { // Press spacebar to toggle sound on/off
      toggleSound();
    } else if (keyCode === UP_ARROW) { // Press up arrow to increase volume
      increaseVolume();
    } else if (keyCode === DOWN_ARROW) { // Press down arrow to decrease volume
      decreaseVolume();
    }
  }
  
  function toggleSound() {
    if (amps[0] > 0) {
      targetAmps = [0, 0, 0];
    } else {
      targetAmps = [1, 1, 1];
    }
  }
  
  function increaseVolume() {
    for (let i = 0; i < amps.length; i++) {
      targetAmps[i] = min(amps[i] + 0.1, 1);
    }
  }
  
  function decreaseVolume() {
    for (let i = 0; i < amps.length; i++) {
      targetAmps[i] = max(amps[i] - 0.1, 0);
    }
  }
  