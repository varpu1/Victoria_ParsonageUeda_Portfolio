// 1 - our WebAudio context, **we will export and make this public at the bottom of the file**
let audioCtx;

// **These are "private" properties - these will NOT be visible outside of this module (i.e. file)**
// 2 - WebAudio nodes that are part of our WebAudio audio routing graph
let element;
let sourceNode;
let analyserNode;
let gainNode;
let oscillatorNode;

// 3 - here we are faking an enumeration
const DEFAULTS=Object.freeze({
    gain : .5,
    numSamples : 256
});

// 4 - create a new array of 8-bit integers (0-255)
// this is a typed array to hold the audio frequency data
let audioData=new Uint8Array(DEFAULTS.numSamples/2);

// **Next are "public" methods - we are going to export all of these at the bottom of this file**
function setupWebaudio(filePath){
    // 1 - The || is because WebAudio has not been standardized across browsers yet
    const AudioContext=window.AudioContext||window.webkitAudioContext;
    audioCtx=new AudioContext();

    // 2 - this creates an <audio> element
    element=new Audio();//document.querySelector("audio");

    // 3 - have it point at a sound file
    loadSoundFile(filePath);

    // 4 - create an a source node that points at the <audio> element
    sourceNode=audioCtx.createMediaElementSource(element);

    // 5 - create an analyser node
    // note the UK spelling of "Analyser"
    analyserNode=audioCtx.createAnalyser();
    /*
    // 6
    We will request DEFAULTS.numSamples number of samples or "bins" spaced equally 
    across the sound spectrum.

    If DEFAULTS.numSamples (fftSize) is 256, then the first bin is 0 Hz, the second is 172 Hz, 
    the third is 344Hz, and so on. Each bin contains a number between 0-255 representing 
    the amplitude of that frequency.
    */ 

    // fft stands for Fast Fourier Transform
    analyserNode.fftSize=DEFAULTS.numSamples;

    // 7 - create a gain (volume) node
    gainNode=audioCtx.createGain();
    gainNode.gain.value=DEFAULTS.gain;

    //create oscillator node
    oscillatorNode=audioCtx.createOscillator();

    // 8 - connect the nodes - we now have an audio graph

    // make sure that it's a Number rather than a String
    sourceNode.connect(analyserNode);
    analyserNode.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    oscillatorNode.connect(audioCtx.destination);
}

function loadSoundFile(filePath){
    element.src=filePath;
}

function playCurrentSound(){
    element.play();
}

function pauseCurrentSound(){
    element.pause();
}

function setVolume(value){
    value=Number(value);
    gainNode.gain.value=value;
}
function timing(item){
    let mins=Math.floor(item/60);
    let sec=item%60;
    if(sec<10){
        sec=String("0"+sec);
    }
    return (mins+":"+sec);
}

function time(){
    let current=Math.round(element.currentTime);
    let dLength=Math.round(element.duration);
    return (timing(current)+"/"+timing(dLength));
}

function setOscillation(value){
    if(value==0||value<1){
        oscillatorNode.setPeriodicWave=value;
    }else{
        oscillatorNode.setPeriodicWave=value;
    }
    var real = new Float32Array(value*10);
    var imag = new Float32Array(value*10);
    var ac = new AudioContext();
    var osc = ac.createOscillator();

    real[0] = 0;
    imag[0] = 0;
    real[1] = 1;
    imag[1] = 0;

    var wave = ac.createPeriodicWave(real, imag, {disableNormalization: true});

    osc.setPeriodicWave(wave);
    
}

export {audioCtx, time,setOscillation,setupWebaudio,playCurrentSound,pauseCurrentSound,loadSoundFile,setVolume,analyserNode,oscillatorNode};