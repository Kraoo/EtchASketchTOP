const container = document.getElementById('container');
const colorPicker = document.getElementById('colorPicker');
const gridSizeInput = document.getElementById('gridSizeInput');
const clearButton = document.getElementById('clearButton');

let gridSize = 16;

function createGrid(size) {
    container.innerHTML = '';
    container.style.gridTemplateColumns = `repeat(${size}, 30px)`;

    for (let i = 0; i < size * size; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        container.appendChild(square);
    }
}

function addHoverEffect() {
    container.addEventListener('mouseover', handleMouseOver);
}

function handleMouseOver(event) {
    const square = event.target;

    if (square.classList.contains('square')) {
        let currentOpacity = parseFloat(square.style.opacity) || 0;

        if (currentOpacity < 1) {
            currentOpacity += 0.1; 
            square.style.opacity = currentOpacity;
            square.style.backgroundColor = colorPicker.value;
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
    addHoverEffect();
    gridSizeInput.value = '';
}

gridSizeInput.addEventListener('change', handleGridSizeChange);
clearButton.addEventListener('click', clearGrid);

createGrid(gridSize);
addHoverEffect();
