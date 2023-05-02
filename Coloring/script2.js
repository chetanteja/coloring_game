const API_KEY = '33667560-aa9f6b7eca99d009ef6d8ff1a';
const API_URL = `https://pixabay.com/api/?key=${API_KEY}&q=children+coloring+pages&image_type=vector`;

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = true;
ctx.imageSmoothingQuality = "high";
let color = '#000000';

fetch(API_URL)
  .then(response => response.json())
  .then(data => {
    const randomIndex = Math.floor(Math.random() * data.hits.length);
    const img = new Image();
    img.onload = function() {
      canvas.width = 450; // set a fixed width
      canvas.height = 450; // set a fixed height
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height); // draw the image with the fixed dimensions
    }
    img.src = data.hits[randomIndex].largeImageURL;
  });

const palette = document.getElementById('color-palette');
const colors = ['#000000', '#A0522D', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF8C00', '#00FFFF'];

for (let i = 0; i < colors.length; i++) {
  const div = document.createElement('div');
  div.style.backgroundColor = colors[i];
  div.addEventListener('click', function() {
    color = colors[i];
  });
  palette.appendChild(div);
}

const eraser = document.createElement('div');
eraser.style.backgroundImage = "url('https://i.imgur.com/iGpL4yg.png')";
eraser.style.backgroundSize = "contain";
eraser.style.width = "30px";
eraser.style.height = "30px";
eraser.style.margin = "5px";
eraser.addEventListener('click', function() {
  color = '#FFFFFF';
  eraser.style.boxShadow = "inset 0px 0px 0px 2px black";
  setTimeout(function() {
    eraser.style.boxShadow = "none";
  }, 200);
});
palette.appendChild(eraser);

let isDrawing = false;
let lastX, lastY;
let history = [];

canvas.addEventListener('mousedown', function(e) {
  isDrawing = true;
  lastX = e.offsetX;
  lastY = e.offsetY;
  history.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
});

canvas.addEventListener("mousemove", function(e) {
  if (isDrawing) {
    const x = e.offsetX;
    const y = e.offsetY;
    drawLine(lastX, lastY, x, y);
    lastX = x;
    lastY = y;
  }
}, { passive: false });

canvas.addEventListener('mouseup', function() {
  isDrawing = false;
});

function drawLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = 10;
  ctx.lineCap = 'round';
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.closePath();
}

function resizeCanvas(width, height) {
  const devicePixelRatio = window.devicePixelRatio || 1;
  const canvasWidth = width * devicePixelRatio;
  const canvasHeight = height * devicePixelRatio;
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.scale(devicePixelRatio, devicePixelRatio);
}

setTimeout(function() {
		window.close();
	}, 150000);
