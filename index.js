function createDiv(gridNumber) {
    let div = document.createElement("div");
    div.style.background = "red";
    return div;
}

function createGridBorder(gridNumber) {
    document.getElementById("sketch-area").style.gridTemplateColumns = "repeat(" + gridNumber + ", auto)";
}

function createGrid(gridNumber) {
    let toAdd = document.createDocumentFragment();
    let totalGridBlocks = gridNumber*gridNumber;

    for (let i = 0; i < totalGridBlocks; i++) {
        let test = createDiv(gridNumber);
        toAdd.appendChild(test);
    }
    createGridBorder(gridNumber);
    document.getElementById("sketch-area").appendChild(toAdd);
}