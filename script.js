document.addEventListener("DOMContentLoaded", function() {
  const canvas = document.getElementById('drawingArea');
  const ctx = canvas.getContext('2d');

  //установка размера холста для соответствия реальным размерам Canvas
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;

  let selectedShape = 'circle'; //выбор фигуры по умолчанию
  let selectedColor = 'black'; //выбор цвета по умолчанию

  let isDrawing = false; //переменная для отслеживания состояния рисования
  let startX, startY; //начальные координаты рисования
  let initialX, initialY; //начальные координаты элемента

  //функция для рисования круга
  function drawCircle(x, y, radius) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = selectedColor;
    ctx.lineWidth = 3;
    ctx.stroke();
  }

  //функция для рисования квадрата
  function drawSquare(x, y, size) {
    ctx.beginPath();
    ctx.rect(x, y, size, size);
    ctx.strokeStyle = selectedColor;
    ctx.lineWidth = 3;
    ctx.stroke();
  }

  //функция для рисования прямоугольника
  function drawRectangle(x, y, width, height) {
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.strokeStyle = selectedColor;
    ctx.lineWidth = 3;
    ctx.stroke();
  }

  //функция для рисования треугольника
  function drawTriangle(x1, y1, x2, y2, x3, y3) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.closePath();
    ctx.strokeStyle = selectedColor;
    ctx.lineWidth = 3;
    ctx.stroke();
  }
  
  //функция для рисования прямой линии
  function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = selectedColor;
    ctx.lineWidth = 3;
    ctx.stroke();
  }

  //функция для рисования свободным пером
  function drawFreeHand(x, y) {
    ctx.lineTo(x, y);
    ctx.strokeStyle = selectedColor;
    ctx.lineWidth = 3;
    ctx.stroke();
  }

  //функция для рисования ластика
  function drawEraser(x, y) {
    const eraserSize = 14;
    ctx.clearRect(x - eraserSize / 2, y - eraserSize / 2, eraserSize, eraserSize);
  }

  //обработчик события для выбора цвета
  document.getElementsByName('color').forEach(function(radio) {
    radio.addEventListener('change', function(event) {
      selectedColor = event.target.value;
    });
  });

  //обработчик события для выбора фигуры
  document.getElementsByName('shape').forEach(function(radio) {
    radio.addEventListener('change', function(event) {
      selectedShape = event.target.value;
    });
  });

  //обработчик события кнопки "Очистить"
  const clearButton = document.getElementById('clearButton');
  clearButton.addEventListener('click', function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });

  //функция для сохранения фигуры в массив shapes
  function saveShape(shapeObj) {
    shapes.push(shapeObj);
  }

  //обработчик события нажатия кнопки мыши
  canvas.addEventListener('mousedown', function(event) {
    isDrawing = true;
    startX = event.offsetX;
    startY = event.offsetY;
    initialX = startX;
    initialY = startY;
    if (selectedShape === 'circle') {
      drawCircle(startX, startY, 1);
    } else if (selectedShape === 'square') {
      drawSquare(startX, startY, 1);
    } else if (selectedShape === 'rectangle') {
      drawRectangle(startX, startY, 1);
    } else if (selectedShape === 'triangle') {
      drawTriangle(startX, startY, startX, startY, startX, startY);
    } else if (selectedShape === 'line') {
      drawLine(startX, startY, startX, startY); 
    } else if (selectedShape === 'draw') {
      ctx.beginPath();
      ctx.moveTo(startX, startY);
    } else if (selectedShape === 'eraser') {
      drawEraser(startX, startY);
    }
  });

  //обработчик события движения мыши
  canvas.addEventListener('mousemove', function(event) {
    if (isDrawing) {
      const x = event.offsetX;
      const y = event.offsetY;

      if (selectedShape === 'circle') {
        const radius = Math.sqrt(Math.pow(x - startX, 2) + Math.pow(y - startY, 2));
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawCircle(startX, startY, radius);
      } else if (selectedShape === 'square') {
        const size = Math.max(Math.abs(x - initialX), Math.abs(y - initialY));
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawSquare(initialX, initialY, size);
      } else if (selectedShape === 'rectangle') {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawRectangle(startX, startY, x - startX, y - startY);
      } else if (selectedShape === 'triangle') {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawTriangle(startX, startY, x, y, 2 * startX - x, y);
      } else if (selectedShape === 'line') {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawLine(startX, startY, x, y);
      } else if (selectedShape === 'draw') {
        drawFreeHand(x, y); 
      } else if (selectedShape === 'eraser') {
        drawEraser(x, y);
      }
    }
  });

  //обработчик события отпускания кнопки мыши
  canvas.addEventListener('mouseup', function(event) {
  isDrawing = false;
  });
});
