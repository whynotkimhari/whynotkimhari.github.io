// LANGUAGE CHANGING ICON
const ic = document.querySelector('#icon1');
var isVie = true;
ic.addEventListener('click', () => {
    if(isVie) {
        document.querySelector('.title-sec').innerHTML = '<h1>YOU DRAW, I GUESS</h1>';
        document.querySelector('#clear-btn').innerHTML = 'Clear';
        document.querySelector('#predict-btn').innerHTML = 'Guess';
        var val = document.querySelector('#confidence').innerHTML.split(' ')[1];
        document.querySelector('#confidence').innerHTML = `<h2>Probably ${val} percentage this guy</h2>`;
        isVie = false;
    }
    else {
        document.querySelector('.title-sec').innerHTML = '<h1>MÀY VẼ TAO ĐOÁN</h1>';
        document.querySelector('#clear-btn').innerHTML = 'Xoá';
        document.querySelector('#predict-btn').innerHTML = 'Đoán';
        var val = document.querySelector('#confidence').innerHTML.split(' ')[1];
        document.querySelector('#confidence').innerHTML = `<h2>Khoảng ${val} phần trăm là thằng này</h2>`;
        isVie = true;
    }
})



// SETTING CANVAS SECTION
const canvas = document.querySelector('canvas');
canvas.width = 200;
canvas.height = 200;
const ctx = canvas.getContext('2d')
ctx.fillStyle = "black";
ctx.fillRect(0,0,canvas.width,canvas.height);
var x1 = undefined, y1 = undefined, mousePressed;

canvas.addEventListener('mousedown', (e) => {
    mousePressed = true;
})

canvas.addEventListener('mouseup', (e) => {
    mousePressed = false;
})

canvas.addEventListener('mousemove', (e) => {
    if(mousePressed) {
        var x2 = e.offsetX, y2=e.offsetY;
        ctx.beginPath();
        if(x1 === undefined && y1 === undefined) {
            x1 = x2;
            y1 = y2;
        }
        ctx.lineWidth = '15';
        ctx.lineJoin = ctx.lineCap = 'round';
        ctx.strokeStyle = "white";
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        x1 = x2; y1 = y2;

        if(x2 >= canvas.width || y2 >= canvas.height || x2 <= 0 || y2 <= 0) {
            mousePressed = false;
        }
    }
    else {
        x1 = undefined;
        y1 = undefined;
    }
})

// SETTING CLEAR BUTTON SECTION


const clearBtn = document.querySelector('#clear-btn');

clearBtn.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black"; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);
})

// SETTING PREDICT BUTTON SECTION
const PredictBtn = document.querySelector('#predict-btn');

PredictBtn.addEventListener('click', async () => {
    var imageData = canvas.toDataURL();    
    let tensor = preprocessCanvas(canvas); 
    console.log(tensor)   
    let predictions = await model.predict(tensor).data();  
    console.log(predictions)  
    let results = Array.from(predictions);    
    displayLabel(results);    
    console.log(results);
})

// MODEL LOADING SECTION
let model;
(async function(){  
    console.log("model loading...");  
    model = await tf.loadLayersModel("model/model.json");
    console.log("model loaded..");
})();

function preprocessCanvas(image) { 
    let tensor = tf.browser.fromPixels(image).resizeNearestNeighbor([28, 28]).mean(2).expandDims(2).expandDims().toFloat(); 
    console.log(tensor.shape); 
    return tensor.div(255.0);
}

// //output
function displayLabel(data) {
    var max = data[0];    
    var maxIndex = 0;     
    for (let i = 1; i < data.length; i++) {        
      if (data[i] > max) {            
        maxIndex = i;            
        max = data[i];        
      }
    }
    console.log(max, maxIndex);

    var html = `<img src="img/${maxIndex}.jpg"></img>`;
    document.getElementById('result').innerHTML = html;

    if(isVie) {
        document.getElementById('confidence').innerHTML = `<h2>Khoảng ${max*100} phần trăm là thằng này</h2>`;
    }
    else document.getElementById('confidence').innerHTML = `<h2>Probably ${max*100} percentage this guy</h2>`;
    
}