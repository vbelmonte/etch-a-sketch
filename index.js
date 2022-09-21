let penColor = document.getElementById("pen-color-picker");
let bgColor = document.getElementById("bg-color-picker");
let glColor = document.getElementById("gl-color-picker");
let penColorValue = penColor.value;
let bgColorValue = bgColor.value;
let glColorValue = glColor.value;
let gridSize = document.getElementById("grid-size").value;
let gridEntry = document.getElementById("grid-size");

function createDiv(gridNumber) {
    let div = document.createElement("div");
    div.style.background = "white";
    return div;
}

function createGridBorder(gridNumber) {
    document.getElementById("sketch-area").style.gridTemplateColumns = "repeat(" + gridNumber + ", auto)";
}

function createGrid(gridNumber) {
    let toAdd = document.createDocumentFragment();
    let totalGridBlocks = gridNumber*gridNumber;
    gridSize = gridNumber;

    for (let i = 1; i <= totalGridBlocks; i++) {
        let div = createDiv(gridNumber);
        div.id = i;
        toAdd.appendChild(div);
    }
    createGridBorder(gridNumber);
    document.getElementById("sketch-area").appendChild(toAdd);
}

function clearGrid() {
    let canvas = document.getElementById("sketch-area");
    let totalGridBlocks = getGridSize() * getGridSize();
    
    for (let i = 1; i <= totalGridBlocks; i++) {
        const e = document.getElementById(i);
        canvas.removeChild(e);
    }
    document.getElementById("sketch-area").style.gridTemplateColumns = "";
}

function getGridSize() {
    return gridSize;
}

function setGrid(entry) {
    clearGrid();
    createGrid(entry);
}

function getPenColor() {
    penColor.addEventListener("input", function() {
        penColorValue = penColor.value;
    });
    return penColorValue;
}

/*function assignPenColor(value) {
    penColor.value = value;
}*/

function getBackgroundColor() {
    bgColor.addEventListener("input", function() {
        bgColorValue = bgColor.value;
    });
    return bgColorValue;
}

/*function assignBackgroundColor(value) {
    bgColor.value = value;
}*/

function getGridLineColor() {
    glColor.addEventListener("input", function() {
        glColorValue = glColor.value;
    });
    return glColorValue;
}

function assignGridLineColor() {
    glColor.addEventListener("input", function() {
        document.getElementById("sketch-area").style.backgroundColor = glColor.value;
    });
}

function toggleGridLines() {

}

function clearCanvas() {

}

function addDivEventListener() {

}


gridEntry.addEventListener("change", function() {
    setGrid(gridEntry.value);
});
gridEntry.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        setGrid(gridEntry.value);
    }
});
createGrid(10);
assignGridLineColor()
getBackgroundColor();
getPenColor();
getGridLineColor();