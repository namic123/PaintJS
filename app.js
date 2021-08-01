const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jscolor");
const range = document.getElementById("jsRange");
const fill = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");


const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;


ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
//이미지 저장시에 canvas 배경이 하얀색으로 보이게 하기위함
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 0.1;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

let painting = false;
let filling = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function changeFill() {
    if (filling === true) {
        filling = false;
        fill.innerText = "Fill"
    }
    else {
        filling = true;
        fill.innerText = "Paint"
    }
}

function changeRange(event) {
    const setSize = event.target.value;
    ctx.lineWidth = setSize;
}

function changeColor(event) {
    const setColor = event.target.style.backgroundColor;
    ctx.strokeStyle = setColor;
    ctx.fillStyle = setColor;
}

function handleCanvasClick() {
    if (filling) { ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE); }
}

function handleCm(event) {
    event.preventDefault();
}

function handleSaveClick() {
    const image = canvas.toDataURL("image/png");
    //save버튼 클릭시 canvas를 url화 시키는것 (이미지로)
    const link = document.createElement("a");
    //a태그를 만들어서
    link.href = image;
    //url화 된 canvas를 a태그에 href속성으로 넣음
    link.download = "PaintJS[🎨]";
    //다운로드시 이름 설정하는것
    link.click();
    //link화 된것을 사용자가 직접클릭하지 않아도 자동 클릭하게하는 함수
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCm);
    //canvas 우클릭하면 이미지 save하는 팝업이 뜨는데 이것을 
    //context menu라고함 
}

Array.from(colors).forEach(clickColor => clickColor.addEventListener("click", changeColor))

if (range) {
    range.addEventListener("input", changeRange);
}

if (fill) {
    fill.addEventListener("click", changeFill)
}

if (saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick)
}