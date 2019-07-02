const canvas = document.getElementById("canvas");

canvas.onmousedown = moveStart;
canvas.onmousemove = moving;
canvas.onmouseup = moveEnd;
canvas.onmouseleave = moveEnd;

canvas.ontouchstart = moveStart;
canvas.ontouchmove = moving;
canvas.ontouchend = moveEnd;

const drawingArea = document.getElementById("drawing-area");
drawingArea.style.height = (document.body.clientHeight) +"px";
drawingArea.style.width = (document.body.clientWidth - 200) +"px";

canvas.height = (document.body.clientHeight);
canvas.width = (document.body.clientWidth - 200);

const image = document.getElementById("main-image");
image.style.maxHeight = document.body.clientHeight +"px";
image.style.maxWidth = (document.body.clientWidth - 200) +"px";

function detectLeftButton(evt) {
    evt = evt || window.event;
    if ("buttons" in evt) {
      return evt.buttons == 1;
    }
    var button = evt.which || evt.button;
    return button == 1;
  }

image.onclick=(event) => {event.preventDefault();}

let startingX = -1;
let startingY = -1;

function moveStart(event) {
    event.preventDefault();
    const touches = event.changedTouches;
    if(touches) {
      if(touches.length === 1) {
        startingX = touches[0].pageX;
        startingY = touches[0].pageY;
      }
    } else {
      event.preventDefault();
      if(detectLeftButton(event)) {
        //this.preventClick(event);
        startingX = event.pageX;
        startingY = event.pageY;
      }
    }
  }

function moving(event) {
    event.preventDefault();
    if(startingX === -1) {
      return;
    }
    let currentX, currentY;
    const touches = event.changedTouches;
    if(touches) {
      if(touches.length === 1) {
        currentX = touches[0].pageX;
        currentY = touches[0].pageY;
      } else {
        return;
      }
    } else {
      event.preventDefault();
      currentX = event.pageX;
      currentY = event.pageY;
    }
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.lineCap = "round";
    ctx.moveTo(startingX, startingY);
    ctx.lineTo(currentX, currentY);
    ctx.strokeStyle = currentColor.style.background.replace("1.0", transparency);
    ctx.lineWidth = 10;
    ctx.stroke();

    startingX = currentX;
    startingY = currentY;
  }

function moveEnd(event) {
    event.preventDefault();
    startingX = -1;
  }


const transparency = "0.5";
let currentColor = null;
const colors = document.getElementById("color-chooser");
for(let color of colors.children) {
    color.onclick = (event) => { 
        setCurrentColor(color); 
    };
}
setCurrentColor(colors.children[0]);

function setCurrentColor(element) {
    if(currentColor != null) {
        currentColor.style.border= "none";
    }
    

    currentColor = element;
    element.style.border = "3px solid black";
}
