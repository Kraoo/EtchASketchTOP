const container = document.getElementById('container');
const colorPicker = document.getElementById('colorPicker');
const gridSizeInput = document.getElementById('gridSizeInput');
const clearButton = document.getElementById('clearButton');
const toggleGridButton = document.getElementById('toggleGridButton');
const rainbowModeButton = document.getElementById('rainbowModeButton');
const eraserButton = document.getElementById('eraserButton');
const message = document.getElementById('message');

let gridSize = 16;
let isRainbowMode = false;
let isEraserMode = false;
let showGridLines = true;
let isDrawingEnabled = true;

function createGrid(size) {
    container.innerHTML = '';
    container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size * size; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        if (showGridLines) {
            square.classList.add('grid-line');
        }
        container.appendChild(square);
    }
}

function handleMouseOver(event) {
    if (!isDrawingEnabled) return;

    const square = event.target;

    if (square.classList.contains('square')) {
        if (isEraserMode) {
            square.style.backgroundColor = '#fff';
            square.style.opacity = '';
        } else {
            let currentOpacity = parseFloat(square.style.opacity) || 0;

            if (currentOpacity < 1) {
                currentOpacity += 0.1; 
                square.style.opacity = currentOpacity;
                square.style.backgroundColor = isRainbowMode ? getRandomColor() : colorPicker.value;
            }
        }
    }
}

function clearGrid() {
    const squares = document.querySelectorAll('.square');
    squares.forEach(square => {
        square.style.backgroundColor = '#fff';
        square.style.opacity = '';
    });
}

function handleGridSizeChange() {
    gridSize = parseInt(gridSizeInput.value) || 16;
    if (gridSize > 100) {
        gridSize = 100;
    }
    createGrid(gridSize);
}

function toggleGridLines() {
    showGridLines = !showGridLines;
    const squares = document.querySelectorAll('.square');
    squares.forEach(square => {
        if (showGridLines) {
            square.classList.add('grid-line');
        } else {
            square.classList.remove('grid-line');
        }
    });
    updateButtonState(toggleGridButton, showGridLines);
}

function toggleRainbowMode() {
    isRainbowMode = !isRainbowMode;
    updateButtonState(rainbowModeButton, isRainbowMode);
}

function toggleEraserMode() {
    isEraserMode = !isEraserMode;
    updateButtonState(eraserButton, isEraserMode);
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function handleKeyDown(event) {
    if (event.code === 'Space') {
        isDrawingEnabled = false;
        message.textContent = 'Drawing paused. Release the space bar to continue drawing.';
    }
}

function handleKeyUp(event) {
    if (event.code === 'Space') {
        isDrawingEnabled = true;
        message.textContent = 'Hold the space bar to pause drawing.';
    }
}

function handleButtonClick(event) {
    event.target.blur();
}

function updateButtonState(button, isActive) {
    const icon = button.querySelector('i');
    if (isActive) {
        button.classList.add('active');
        button.classList.remove('inactive');
        if (icon) {
            icon.classList.add('fa-check-circle');
            icon.classList.remove('fa-circle');
        }
    } else {
        button.classList.add('inactive');
        button.classList.remove('active');
        if (icon) {
            icon.classList.add('fa-circle');
            icon.classList.remove('fa-check-circle');
        }
    }
}

clearButton.addEventListener('click', clearGrid);
clearButton.addEventListener('click', handleButtonClick);
gridSizeInput.addEventListener('change', handleGridSizeChange);
toggleGridButton.addEventListener('click', toggleGridLines);
toggleGridButton.addEventListener('click', handleButtonClick);
rainbowModeButton.addEventListener('click', toggleRainbowMode);
rainbowModeButton.addEventListener('click', handleButtonClick);
eraserButton.addEventListener('click', toggleEraserMode);
eraserButton.addEventListener('click', handleButtonClick);
container.addEventListener('mouseover', handleMouseOver);
document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);

createGrid(gridSize);
updateButtonState(toggleGridButton, showGridLines);
updateButtonState(rainbowModeButton, isRainbowMode);
updateButtonState(eraserButton, isEraserMode);