const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d"); //canvas는 'context'를 가지고 있어서 그걸로 안의 pixel들을 manipulate하는 작업 가능
const colors = document.getElementsByClassName("jsColor"); //html collection(array로 바꿔줘야 함)
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";

/*여기서도 width와 height 지정해줘야 함. 이유는 잘 모르겠... */
canvas.width = 700;
canvas.height = 700;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, 700, 700); //처음의 canvas도 흰 색을 채워줌
ctx.strokeStyle = INITIAL_COLOR; //그을 선의 색
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5; //그을 선의 너비

let painting = false;
let filling = false; //filling mode면 brush로 그리는 것이 아니라 한 번에 채워야 함

function stopPainting(event) {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseUp(event) {
  stopPainting();
}

function onMouseMove(event) {
  const x = event.offsetX; //마우스가 canvas 위에 있을 때 canvas에서의 좌표
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath(); //클릭 않고 움직이는 동안 계속 path가 만들어지는 것!
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y); //path의 이전 위치부터 현재 위치까지 선을 만듦
    ctx.stroke(); //실제로 보이게 긋는 역할인듯?
  }
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor; //click한 거의 background color
  ctx.strokeStyle = color;
  ctx.fillStyle = color; //canvas 한 번에 채울 사각형 만들기 위함
}

function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handleModeClick(event) {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height); //꽉 채운 것
  } // 버튼을 통해 filling이 true가 되었을 떄만 채워지도록
}

function handleCM(event) {
  event.preventDefault(); //원래 우클릭하면 저장 메뉴 뜨는데, 그거 못뜨게 한 것
}

function handleSaveClick(event) {
  const image = canvas.toDataURL(""); //default: png
  const link = document.createElement("a");
  link.href = image; //link의 href에는 URL을 준다
  link.download = "PaintJS[Export]"; //download에는 이름을
  link.click(); //click한 것처럼 꾸며낸 것(다운 됨)
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting); // mouse click
  canvas.addEventListener("mouseup", stopPainting); //마우스를 뗐을 때
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM); //canvas를 우클릭
}

Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
);

if (range) {
  //range가 undefined 되어 있을 경우 예방
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  //fill button과 관련된 사항들
  mode.addEventListener("click", handleModeClick);
}

if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}
