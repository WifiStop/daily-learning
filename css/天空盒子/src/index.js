import './index.less'
let curMouseX = 0;
let curMouseY = 0;
let lastMouseX = 0;
let lastMouseY = 0;
let lastAngleX = 0;
let lastAngleY = 0;
let aimAngleX = 0,
  aimAngleY = 0;
let curBgAngleX = 0,
  curBgAngleY = 0;

let BG_WIDTH = 1024,
  BG_HEIGHT = 1024,
  BG_NUMBER = 4,
  PER_ANGLE = 360 / BG_NUMBER;
let allRotateY = 0;
const dom = document.getElementById('container')

const isAndroid = navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1;
const isiOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
const translateZ = ((opts) => {
  return Math.round(opts.width / (2 * Math.tan(Math.PI / opts.number)))
})({
  width: BG_WIDTH,
  number: BG_NUMBER
})

const bindTouchOrMouse = () => {
  const mouseDownHandler = (evt) => {
    lastMouseX = evt.pageX || evt.targetTouches[0].pageX;
    lastMouseY = evt.pageY || evt.targetTouches[0].pageY;
    lastAngleX = aimAngleX;
    lastAngleY = aimAngleY;
   
  }

  const mouseMoveHandler = (evt) => {
    curMouseX = evt.pageX || evt.targetTouches[0].pageX;
    curMouseY = evt.pageY || evt.targetTouches[0].pageY;

    const dragRotate = (evtInfo) => {
      aimAngleX = (180 / Math.PI * (Math.atan((curMouseX - lastMouseX) / translateZ)) + lastAngleX)
    }
    dragRotate({
      pageX: curMouseX,
      pageY: curMouseY
    });
  }
  if (isAndroid || isiOS) {
    document.addEventListener('touchstart', mouseDownHandler);
    document.addEventListener('touchmove', mouseMoveHandler);
  } else {
    document.addEventListener('mousedown', mouseDownHandler);
    document.addEventListener('mousemove', mouseMoveHandler);
  }
}
bindTouchOrMouse()

const initAnimate = ()=>{
  const requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame ||
    function (callback) {
      setTimeout(callback, 1000 / 60)
    }

  // loop
  const go = ()=>{
    // bg 与 item 的位移增量速度的不一致，可形成视差运动
    curBgAngleX += (aimAngleX - curBgAngleX);
    // curBgAngleY += (aimAngleY - curBgAngleY);
    dom.style.transform = "rotateY(" + -curBgAngleX + "deg)"
     requestAnimationFrame(go);
  }
  requestAnimationFrame(go)
}

initAnimate();