import React, { useRef, useState, useEffect } from 'react';

function Testing() {
  const API_KEY = '33667560-aa9f6b7eca99d009ef6d8ff1a';
  const API_URL = `https://pixabay.com/api/?key=${API_KEY}&q=children+coloring+pages&image_type=vector`;

  const canvasRef = useRef(null);
  const [color, setColor] = useState('#000000');
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastX, setLastX] = useState(null);
  const [lastY, setLastY] = useState(null);
  const [history, setHistory] = useState([]);
  const paletteRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        const randomIndex = Math.floor(Math.random() * data.hits.length);
        const img = new Image();
        img.onload = function () {
          canvas.width = 450; // set a fixed width
          canvas.height = 450; // set a fixed height
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height); // draw the image with the fixed dimensions
        };
        img.src = data.hits[randomIndex].largeImageURL;
      });

    const palette = paletteRef.current;
    const colors = ['#000000', '#A0522D', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF8C00', '#00FFFF'];

    for (let i = 0; i < colors.length; i++) {
      const div = document.createElement('div');
      div.style.backgroundColor = colors[i];
      div.addEventListener('click', function () {
        setColor(colors[i]);
      });
      palette.appendChild(div);
    }

    const eraser = document.createElement('div');
    eraser.style.backgroundImage = "url('https://i.imgur.com/iGpL4yg.png')";
    eraser.style.backgroundSize = 'contain';
    eraser.style.width = '30px';
    eraser.style.height = '30px';
    eraser.style.margin = '5px';
    eraser.addEventListener('click', function () {
      setColor('#FFFFFF');
      eraser.style.boxShadow = 'inset 0px 0px 0px 2px black';
      setTimeout(function () {
        eraser.style.boxShadow = 'none';
      }, 200);
    });
    palette.appendChild(eraser);
  }, []);

  function drawLine(x1, y1, x2, y2) {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 10;
    ctx.lineCap = 'round';
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
  }

  function handleMouseDown(e) {
    setIsDrawing(true);
    setLastX(e.offsetX);
    setLastY(e.offsetY);
  }

  function handleMouseMove(e) {
    if (!isDrawing) return;
    drawLine(lastX, lastY, e.offsetX, e.offsetY);
    setLastX(e.offsetX);
    setLastY(e.offsetY);
  }
    
      function handleMouseUp() {
        setIsDrawing(false);
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        setHistory([...history, imgData]);
      }
    
      function undo() {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (history.length === 0) return;
        const lastImageData = history[history.length - 1];
        ctx.putImageData(lastImageData, 0, 0);
        setHistory(history.slice(0, -1));
      }
    
      return (
        <div>
          <canvas
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            width={450}
            height={450}
          />
          <div ref={paletteRef} style={{ display: 'flex', flexWrap: 'wrap' }} />
          <button onClick={undo}>Undo</button>
        </div>
      );
    }
    
    export default Testing;