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
    container.addEventListener('mouseover', function(e) {
        if (e.target.classList.contains('square')) {
            let currentColor = e.target.style.backgroundColor;
            let currentOpacity = parseFloat(e.target.style.opacity) || 0;

            if (currentColor === '' || currentOpacity < 1) {
                currentOpacity += 0.1; 
                e.target.style.backgroundColor = colorPicker.value;
                e.target.style.opacity = currentOpacity;
            }
        }
    });
}


function clearGrid() {
    const squares = document.querySelectorAll('.square');
    squares.forEach(square => {
        square.style.backgroundColor = '#fff';
    });
}

gridSizeInput.addEventListener('change', function() {
    gridSize = parseInt(gridSizeInput.value) || 16;
    gridSizeInput.value = '';
    if (gridSize > 100) gridSize = 100;
    createGrid(gridSize);
    addHoverEffect();
});

clearButton.addEventListener('click', clearGrid);

createGrid(gridSize);
addHoverEffect();
