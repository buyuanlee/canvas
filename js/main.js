/*** 声明变量 ***/

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var actions = document.getElementById('actions');
var eraser = document.getElementById('eraser');
var brush = document.getElementById('brush');
/*** 调用函数调整画布大小 ***/

autoSetCanvasSize(canvas)

/*** 调用函数监听鼠标 ***/

listenToUser(canvas)

/*** 切换橡皮擦与画笔 ***/

var eraserEnable = false
eraser.onclick = function () {
    eraserEnable = true
    actions.className = 'actions x'
}
brush.onclick = function () {
    eraserEnable = false
    actions.className = 'actions'
}

/*** 函数库 ***/

//自动调整画布大小
function autoSetCanvasSize() {

    window.onresize = function () {
        setCanvasSize()
    }

    function setCanvasSize() {
        var pageWidth = document.documentElement.clientWidth
        var pageHeight = document.documentElement.clientHeight

        canvas.width = pageWidth
        canvas.height = pageHeight
    }
}

//绘制圆
function drawCirclr(x, y, radius) {
    context.beginPath()
    context.fillStyle = 'green'
    context.arc(x, y, radius, 0, Math.PI * 2)
    context.fill()
}

//绘制路径
function drawLine(x1, y1, x2, y2) {
    context.beginPath()
    context.strokeStyle = 'orange'
    context.moveTo(x1, y1)
    context.lineWidth = 5
    context.lineTo(x2, y2)
    context.stroke()
    context.closePath()
}

//监听鼠标
function listenToUser(canvas) {
    var using = false
    var lastPoint = {
        x: undefined,
        Y: undefined
    }
    if ('ontouchstart' in document.body) {
        canvas.ontouchstart = function (paint) {
            var x = paint.touches[0].clientX
            var y = paint.touches[0].clientY
            using = true
            if (eraserEnable) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                lastPoint = {
                    x: x,
                    y: y
                }
            }
        }

        canvas.ontouchmove = function (paint) {
            var x = paint.touches[0].clientX
            var y = paint.touches[0].clientY

            if (!using) {
                return
            }
            using = true
            if (eraserEnable) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                newPoint = {
                    x: x,
                    y: y
                }
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint
            }
        }

        canvas.ontouchend = function (paint) {
            using = false
        }
    } else {                                                //非触屏事件
        canvas.onmousedown = function (paint) {
            var x = paint.clientX
            var y = paint.clientY
            using = true
            if (eraserEnable) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                lastPoint = {
                    x: x,
                    y: y
                }
            }

        }
        canvas.onmousemove = function (paint) {
            var x = paint.clientX
            var y = paint.clientY

            if (!using) {
                return
            }
            using = true
            if (eraserEnable) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                newPoint = {
                    x: x,
                    y: y
                }
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint
            }
        }
        canvas.onmouseup = function (paint) {
            using = false
        }
    }
}


