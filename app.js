const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d"); //canvas는 'context'를 가지고 있어서 그걸로 안의 pixel들을 manipulate하는 작업 가능
const colors = document.getElementsByClassName("jsColor");

/*여기서도 width와 height 지정해줘야 함. 이유는 잘 모르겠... */
canvas.width = 700;
canvas.height = 700;

ctx.strokeStyle = "#2c2c2c"; //그을 선의 색
ctx.lineWidth = 2.5; //그을 선의 너비

let painting = false;

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
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting); // mouse click
  canvas.addEventListener("mouseup", stopPainting); //마우스를 뗐을 때
  canvas.addEventListener("mouseleave", stopPainting);
}

Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
);
