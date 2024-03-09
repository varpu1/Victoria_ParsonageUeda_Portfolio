/*
	main.js is primarily responsible for hooking up the UI to the rest of the application 
	and setting up the main event loop
*/

// We will write the functions in this file in the traditional ES5 way
// In this instance, we feel the code is more readable if written this way
// If you want to re-write these as ES6 arrow functions, to be consistent with the other files, go ahead!
import * as audio from './audio.js';
import * as utils from './utils.js';
import * as canvas from './canvas.js';

const drawParams = {
    showFrequency: true,
    showWaveform: false,
    showGradient: true,
    showColorBars: false,
    showMonoBars: false,
    showInnerBars: true,
    showOuterBars: true,
    showCircles: true,
    showNoise: false
};

let gradient;
let bInner, bOuter, bColor, bMono;
let circles;
let noise;
let duration;

// type=document.querySelector("#gradient").checked.value;
gradient = document.querySelector("#gradient");
bInner = document.querySelector("#bInner");
bOuter = document.querySelector("#bOuter");
bColor = document.querySelector("#bColor");
bMono = document.querySelector("#bMono");
circles = document.querySelector("#circles");
noise = document.querySelector("#noise");
duration = document.querySelector("#timing");


// 1 - here we are faking an enumeration
const DEFAULTS = Object.freeze({
    sound1: "media/Peanuts Theme.mp3"
});


function init() {
    console.log("init called");
    audio.setupWebaudio(DEFAULTS.sound1);
    console.log(`Testing utils.getRandomColor() import: ${utils.getRandomColor()}`);
    let canvasElement = document.querySelector("canvas"); // hookup <canvas> element
    setupUI(canvasElement);
    canvas.setupCanvas(canvasElement, audio.analyserNode);
    loop();
}

function setupUI(canvasElement) {
    // A - hookup fullscreen button
    const fsButton = document.querySelector("#fsButton");

    document.querySelectorAll("input[name='type']").forEach(function(type) {
        type.onclick = function(e) {
            if (e.target.checked) {
                console.log("type: ", e.target.value);
                if (e.target.value == "frequency") {
                    drawParams.showFrequency = true;
                    drawParams.showWaveform = false;
                } else if (e.target.value == "waveform") {
                    drawParams.showFrequency = false;
                    drawParams.showWaveform = true;
                }
            }
        }
    });

    // add .onclick event to fullscreen button
    fsButton.onclick = e => {
        console.log("init called");
        utils.goFullscreen(canvasElement);
    };

    //add .onclick to play button
    playButton.onclick = e => {
        console.log(`audioCtx.state before=${audio.audioCtx.state}`);

        //check if context is in suspended state (autoplay policy)
        if (audio.audioCtx.state == "suspended") {
            audio.audioCtx.resume();
        }

        console.log(`audioCtx.state after=${audio.audioCtx.state}`);

        if (e.target.dataset.playing == "no") {
            //if track is currently paused, play it
            audio.playCurrentSound();
            e.target.dataset.playing = "yes"; //CSS will set the text to "pause"

        } else { //if track is playing, pause it
            audio.pauseCurrentSound();
            e.target.dataset.playing = "no"; //CSS will set the text to "play"
        }
    }

    gradient.onclick = e => {
        if (e.target.checked == false) {
            drawParams.showGradient = false;
        } else {
            drawParams.showGradient = true;
        }
    }

    bInner.onclick = e => {
        if (e.target.checked == false) {
            drawParams.showInnerBars = false;
        } else {
            drawParams.showInnerBars = true;
        }
    }

    bOuter.onclick = e => {
        if (e.target.checked == false) {
            drawParams.showOuterBars = false;
        } else {
            drawParams.showOuterBars = true;
        }
    }

    bColor.onclick = e => {
        if (e.target.checked == false) {
            drawParams.showColorBars = false;
        } else {
            drawParams.showColorBars = true;
        }
    }

    bMono.onclick = e => {
        if (e.target.checked == false) {
            drawParams.showMonoBars = false;
        } else {
            drawParams.showMonoBars = true;
        }
    }

    circles.onclick = e => {
        if (e.target.checked == false) {
            drawParams.showCircles = false;
        } else {
            drawParams.showCircles = true;
        }
    }

    noise.onclick = e => {
        if (e.target.checked) {
            drawParams.showNoise = true;
        } else {
            drawParams.showNoise = false;
        }
    }

    let lengthSlider = document.querySelector("#lengthSlider");
    lengthSlider.oninput = e => {
        let multiplier = Number(e.target.value)
        canvas.mul(multiplier);
        //console.log(canvas.multi);
    }

    // let oscSlider=document.querySelector("#oscSlider");
    // oscSlider.oninput=e=>{
    //   audio.setOscillation(e.target.value);
    // }

    //hookup volume slider and label
    let volumeSlider = document.querySelector("#volumeSlider");
    let volumeLabel = document.querySelector("#volumeLabel");

    //add .oninput to slider
    volumeSlider.oninput = e => {
        //set the gain
        audio.setVolume(e.target.value);
        //update value of label to math value of slider
        volumeLabel.innerHTML = Math.round((e.target.value / 2 * 100));
    };

    //set value of label to match valie of the slider
    volumeSlider.dispatchEvent(new Event("input"));

    //hook up track <select>
    let trackSelect = document.querySelector("#trackSelect");
    //add .onchange to <select>
    trackSelect.onchange = e => {
        audio.loadSoundFile(e.target.value);
        //pause the current track if it is playing
        if (playButton.dataset.playing = "yes") {
            playButton.dispatchEvent(new MouseEvent("click"));
        }
    };
} // end setupUI

function loop() {
    requestAnimationFrame(loop);
    canvas.draw(drawParams);
    duration.innerHTML = audio.time();
}

export { init };