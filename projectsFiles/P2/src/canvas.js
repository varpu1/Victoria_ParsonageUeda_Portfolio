/*
	The purpose of this file is to take in the analyser node and a <canvas> element: 
	  - the module will create a drawing context that points at the <canvas> 
	  - it will store the reference to the analyser node
	  - in draw(), it will loop through the data in the analyser node
	  - and then draw something representative on the canvas
	  - maybe a better name for this file/module would be *visualizer.js* ?
*/

import * as utils from './utils.js';

let ctx;
let canvasWidth;
let canvasHeight;
let gradient;
let analyserNode;
let audioData;
let multi=1;


function setupCanvas(canvasElement,analyserNodeRef){
	// create drawing context
	ctx = canvasElement.getContext("2d");
	canvasWidth = canvasElement.width;
	canvasHeight = canvasElement.height;
	// create a gradient that runs top to bottom
    gradient = utils.getRadialGradient(ctx,canvasWidth/2,canvasHeight/2,50,canvasWidth/2,canvasHeight/2,canvasWidth/2,
        [{percent:0,color:"lightBlue"},
        {percent:.45,color:"pink"},
        {percent:1,color:"purple"}]);
	// keep a reference to the analyser node
	analyserNode=analyserNodeRef;
	// this is the array where the analyser data will be stored
	audioData=new Uint8Array(analyserNode.fftSize/2);
}

function draw(params={}){

  // 1 - populate the audioData array with the frequency data from the analyserNode
	// notice these arrays are passed "by reference" 
    // analyserNode.getByteFrequencyData(audioData);//frequency data
	// OR
	//analyserNode.getByteTimeDomainData(audioData); // waveform data
    
    if(params.showFrequency){
        analyserNode.getByteFrequencyData(audioData);//frequency data
    }
    if(params.showWaveform){
        analyserNode.getByteTimeDomainData(audioData); // waveform data 
    }
	// 2 - draw background
    ctx.save();
    ctx.fillStyle="black";
    ctx.globalAlpha= 0.1;
    ctx.fillRect(0,0,canvasWidth,canvasHeight);
    ctx.restore();
		
    // 3 - draw gradient
    if(params.showGradient){
        ctx.save();
        ctx.fillStyle=gradient;
        ctx.globalAlpha= 0.3;
        ctx.fillRect(0,0,canvasWidth,canvasHeight);
        ctx.restore();
    }
	
    if(params.showColorBars){
        drawICBars(/*mul*/);
        drawOCBars(/*mul*/);
    }

    if(params.showMonoBars){
        drawIMBars(/*mul*/);
        drawOMBars(/*mul*/);
    }

    if(params.showOuterBars){
        drawOCBars(/*mul*/);
        drawOMBars(/*mul*/);
    }
    if(params.showInnerBars){
        drawIMBars(/*mul*/);
        drawICBars(/*mul*/);
    }
    
    // 5 - draw circles
    if(params.showCircles){
        let maxRadius=canvasHeight/4;
        ctx.save();
        ctx.globalAlpha=0.5;
        for(let i=0;i<audioData.length;i++){
            //red-ish circles
            let percent=audioData[i]/255;

            let circleRadius=percent*maxRadius;
            ctx.beginPath();
            ctx.fillStyle=utils.makeColor(0,223,255, .34-percent/3.0);
            ctx.arc(canvasWidth/2,canvasHeight/2,circleRadius,0,2*Math.PI,false);
            ctx.fill();
            ctx.closePath();

            //blue-ish circle
            //bigger & more transparent
            ctx.beginPath();
            ctx.fillStyle=utils.makeColor(178,25,178, .10-percent/10.0);
            ctx.arc(canvasWidth/2,canvasHeight/2,circleRadius*1.5,0,2*Math.PI,false);
            ctx.fill();
            ctx.closePath();

            //yellow-ish circle
            //smaller
            ctx.beginPath();
            ctx.fillStyle=utils.makeColor(254,22,150, .5-percent/5.0);
            ctx.arc(canvasWidth/2,canvasHeight/2,circleRadius*0.50,0,2*Math.PI,false);
            ctx.fill();
            ctx.closePath();

            ctx.restore();
        }
        ctx.restore();
    }

    // 6 - bitmap manipulation
	// TODO: right now. we are looping though every pixel of the canvas (320,000 of them!), 
	// regardless of whether or not we are applying a pixel effect
	// At some point, refactor this code so that we are looping though the image data only if
	// it is necessary

	// A) grab all of the pixels on the canvas and put them in the `data` array
	// `imageData.data` is a `Uint8ClampedArray()` typed array that has 1.28 million elements!
	// the variable `data` below is a reference to that array 
    let imageData=ctx.getImageData(0,0,canvasWidth,canvasHeight);
    let data=imageData.data;
    let length=data.length;
    let width=imageData.width;//not using here
    
	// B) Iterate through each pixel, stepping 4 elements at a time (which is the RGBA for 1 pixel)
        for(let i=0;i<length;i++){
		// C) randomly change every 20th pixel to red
            if(params.showNoise && Math.random()<0.05){
			// data[i] is the red channel
			// data[i+1] is the green channel
			// data[i+2] is the blue channel
			// data[i+3] is the alpha channel
			data[i]=data[i+1]=data[i+2]=0;// zero out the red and green and blue channels
			data[i]=125;// make the red channel 100% red
		} // end if
	} // end for
	
    // D) copy image data back to canvas
    ctx.putImageData(imageData,0,0);

}

function mul(value){
    multi=value;
    return multi;
}

function drawOCBars(/*multi*/){ //outter color
    let barSpacing=5;//bar width
    let margin=3; // side margin
    // let mult=/*multi*/
    let screenWidthForBars=canvasWidth/2-(audioData.length*barSpacing)+10-margin*2;
    let barWidth=screenWidthForBars/audioData.length;
    ctx.save();
    for(let i=0;i<audioData.length;i++){
        ctx.strokeStyle=`hsl(${(i)+160% 361},100%,75%)`;
        //left
        ctx.strokeRect(margin+i*(barWidth+barSpacing),canvasHeight-audioData[i],barWidth,audioData[i]*multi);
        ctx.strokeRect(margin+i*(barWidth+barSpacing),0,barWidth,audioData[i]*multi);
        //right
        ctx.strokeRect(canvasWidth-margin-i*(barWidth+barSpacing),canvasHeight-audioData[i],barWidth,audioData[i]*multi);
        ctx.strokeRect(canvasWidth-margin-i*(barWidth+barSpacing),0,barWidth,audioData[i]*multi);
    }
    ctx.restore();
}

function drawICBars(/*multi*/){ //inner color
    let barSpacing=5;//bar width
    let margin=3; // side margin
    // let mult=/*multi*/;
    let screenWidthForBars=canvasWidth/2-(audioData.length*barSpacing)+10-margin*2;
    let barWidth=screenWidthForBars/audioData.length;
    ctx.save();
    for(let i=0;i<audioData.length;i++){
        ctx.fillStyle=`hsl(${(i/2)% 361},100%,55%)`;
        ctx.fillRect(canvasWidth/2+i*(barWidth+barSpacing),canvasHeight/2-audioData[i]/2,barWidth,audioData[i]*multi);
        ctx.fillRect(canvasWidth/2-i*(barWidth+barSpacing),canvasHeight/2-audioData[i]/2,barWidth,audioData[i]*multi);
    }
    ctx.restore();
}

function drawOMBars(){ //outter mono
    let barSpacing=5;//bar width
    let margin=3; // side margin
    let screenWidthForBars=canvasWidth/2-(audioData.length*barSpacing)+10-margin*2;
    let barWidth=screenWidthForBars/audioData.length;
    let topSpacing=canvasHeight/2;
    ctx.save();
    ctx.fillStyle='rgba(5,5,5,0.35)';
    for(let i=0;i<audioData.length;i++){
        ctx.fillRect(margin+i*(barWidth+barSpacing+2),canvasHeight-audioData[i]-topSpacing,barWidth,audioData[i])*multi;
        ctx.fillRect(margin+i*(barWidth+barSpacing+2),topSpacing,barWidth,audioData[i])*multi;
        ctx.fillRect(canvasWidth-margin-i*(barWidth+barSpacing+2),200-audioData[i],barWidth,audioData[i]*multi);
        ctx.fillRect(canvasWidth-margin-i*(barWidth+barSpacing+2),topSpacing,barWidth,audioData[i]*multi);
    }
    ctx.restore();
}

function drawIMBars(/*multi*/){ //inner mono
    let barSpacing=5;//bar width
    let margin=3; // side margin
    let screenWidthForBars=canvasWidth/2-(audioData.length*barSpacing)+10-margin*2;
    let barWidth=screenWidthForBars/audioData.length;
    ctx.save();
    ctx.strokeStyle='rgba(255,255,255,0.50)';
    for(let i=0;i<audioData.length;i++){
        ctx.strokeRect(canvasWidth/2+i*(barWidth+barSpacing),canvasHeight/2-audioData[i],barWidth+5,audioData[i]*2*multi);
        ctx.strokeRect(canvasWidth/2-i*(barWidth+barSpacing),canvasHeight/2-audioData[i],barWidth+5,audioData[i]*2*multi);
    }
    ctx.restore();

}


export {setupCanvas,draw,mul};//,multi