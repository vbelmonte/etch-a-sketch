let penTool = document.getElementById("pen");
let eraserTool = document.getElementById("eraser");
let penColor = document.getElementById("pen-color-picker");
let bgColor = document.getElementById("bg-color-picker");
let glColor = document.getElementById("gl-color-picker");
let lightenTool = document.getElementById("lighten");
let darkenTool = document.getElementById("darken");
let penColorValue = penColor.value;
let bgColorValue = bgColor.value;
let glColorValue = glColor.value;
let gridSize = document.getElementById("grid-size").value;
let gridEntry = document.getElementById("grid-size");
let toggleGrid = document.getElementById("grid-lines");
let clearTool = document.getElementById("clear");
let sketchArea = document.getElementById("sketch-area");
let pressedButtons = document.getElementsByClassName("pressed");
let mouseDown = false;
let mouseUp = true;
let currentTool = "pen";


/****************************
*
* GRID CREATOR FUNCTIONS
*
****************************/

function createDiv(gridNumber) {
    let div = document.createElement("div");
    div.style.background = getBackgroundColor();
    div.className = "divCell";
    div.draggable = false;
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
        addDivMouseDownListener(div);
        addDivMouseUpListener(div);
        addDivEventListener(div);
        addDivClickListener(div);
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
    if (entry >= 1 && entry <= 50) {
        clearGrid();
        createGrid(entry);
    }
}

function getPenColor() {
    penColor.addEventListener("input", function() {
        penColorValue = penColor.value;
    });
    penColor.addEventListener("click", function() {
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

function setInitialGridLineColor() {
    document.getElementById("sketch-area").style.backgroundColor = getGridLineColor();
}

function toggleGridLines() {

}

function setBackgroundColor() {
    let cells = document.getElementsByClassName("divCell");
    let i = 0;

    bgColor.addEventListener("input", function() {
        while (i < cells.length) {
            cells[i].style.backgroundColor = bgColor.value;
            i++;
        }
        i = 0;
    });
}

function clearCanvas() {
    let cells = document.getElementsByClassName("divCell");
    let i = 0;

    while (i < cells.length) {
        cells[i].style.backgroundColor = "#FFFFFF";
        i++;
    }
}


function printOutHSL(input) {
    let color = HexToHSL(RGBToHex(input));
    
    return 'hsl(' + color.h + ', ' + color.s + '%, ' + color.l + '%)';
}

function HexToHSL(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    var r = parseInt(result[1], 16);
    var g = parseInt(result[2], 16);
    var b = parseInt(result[3], 16);

    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        
        h /= 6;
    }

    s = s*100;
    s = Math.round(s);
    l = l*100;
    l = Math.round(l);
    h = Math.round(360*h);

    return {h, s, l};
}


function RGBToHex(rgb) {
    // Choose correct separator
    let sep = rgb.indexOf(",") > -1 ? "," : " ";
    // Turn "rgb(r,g,b)" into [r,g,b]
    rgb = rgb.substr(4).split(")")[0].split(sep);
  
    let r = (+rgb[0]).toString(16),
        g = (+rgb[1]).toString(16),
        b = (+rgb[2]).toString(16);
  
    if (r.length == 1)
      r = "0" + r;
    if (g.length == 1)
      g = "0" + g;
    if (b.length == 1)
      b = "0" + b;
  
    return "#" + r + g + b;
}



/****************************
*
* TOOL SELECTION FUNCTIONS
*
****************************/

function assignCurrentTool(tool) {
    currentTool = tool;
}

function getCurrentTool() {
    return currentTool;
}

function pressedButton() {
    let i = 0;
    while (i < pressedButtons.length) {
        /*pressedButtons[i].addEventListener("click", addPressedButtonListener);*/
        pressedButtons[i].addEventListener("click", function() {
            let k = 0;
            while (k < pressedButtons.length) {
                pressedButtons[k].classList.remove("pressedEffect");
                k++;
            }
            this.classList.add("pressedEffect");
        });
        i++;
    }
}

function addPressedButtonListener() {
    if (this.classList.contains("pressedEffect")) {
        this.classList.remove("pressedEffect");
    }
    else {
        this.classList.add("pressedEffect");
    }
}

function erase() {
    penColorValue = "#FFFFFF";
    assignCurrentTool("eraser");
}

function pen() {
    penColorValue = penColor.value;
    assignCurrentTool("pen");
}

function lighten() {
    assignCurrentTool("lighten");
}

function darken() {
    assignCurrentTool("darken");
}

function lightenEffect(input) {
    let color = HexToHSL(input);
    let newColor = color.l + 1;

    return 'hsl(' + color.h + ', ' + color.s + '%, ' + newColor + '%)';
}

function darkenEffect(input) {
    let color = HexToHSL(input);
    let newColor = color.l - 1;

    return 'hsl(' + color.h + ', ' + color.s + '%, ' + newColor + '%)';
}





function addDivEventListener(theDiv) {
    theDiv.addEventListener(/*"mousemove"*/"pointermove", function() {
        if (mouseDown) {
            /*console.log("you clicked: div" + theDiv.id);*/
            if (getCurrentTool() === "pen") {
                theDiv.style.backgroundColor = penColorValue;
            }
            else if (getCurrentTool() === "eraser") {
                theDiv.style.backgroundColor = "#FFFFFF";
            }
            else if (getCurrentTool() === "lighten") {
                theDiv.style.background = lightenEffect(RGBToHex(theDiv.style.backgroundColor));
            }
            else if (getCurrentTool() === "darken") {
                theDiv.style.background = darkenEffect(RGBToHex(theDiv.style.backgroundColor));
            }
        }
    });
}

function addDivMouseDownListener(theDiv) {
    theDiv.addEventListener(/*'mousedown'*/"pointerdown", function(event) {
        mouseDown = !mouseDown; // toggle mouseDown true/false;
        event.preventDefault();
    });
}

function addDivMouseUpListener(theDiv) {
    theDiv.addEventListener(/*'mouseup'*/"pointerup", function(event) {
        mouseDown = !mouseDown; // toggle mouseDown true/false;
        event.stopPropagation();
    });
}

function addDivClickListener(theDiv) {
    theDiv.addEventListener("click", function() {
        if (getCurrentTool() === "pen") {
            theDiv.style.backgroundColor = penColorValue;
        }
        else if (getCurrentTool() === "eraser") {
            theDiv.style.backgroundColor = "#FFFFFF";
        }
        else if(getCurrentTool() === "lighten") {
            theDiv.style.background = lightenEffect(RGBToHex(theDiv.style.backgroundColor));
        }
        else if (getCurrentTool() === "darken") {
            theDiv.style.background = darkenEffect(RGBToHex(theDiv.style.backgroundColor));
        }
    });
}



gridEntry.addEventListener("change", function() {
    setGrid(gridEntry.value);
});

gridEntry.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        setGrid(gridEntry.value);
    }
});

toggleGrid.addEventListener("click", function() {
    if (toggleGrid.checked === true) {
        document.getElementById("sketch-area").style.gap = "1px";
    }
    else {
        document.getElementById("sketch-area").style.gap = "0px";
    }
});


penTool.addEventListener("click", pen);
eraserTool.addEventListener("click", erase);
clearTool.addEventListener("click", clearCanvas);
lightenTool.addEventListener("click", lighten);
darkenTool.addEventListener("click", darken);

pressedButton();
createGrid(10);
setInitialGridLineColor();
assignGridLineColor()
getBackgroundColor();
setBackgroundColor();
getPenColor();
getGridLineColor();