/*** 声明变量 ***/
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var lineWidth = 3;

/*** 调用函数调整画布大小 ***/

autoSetCanvasSize(canvas)

/*** 调用函数监听鼠标 ***/

listenToUser(canvas)

/*** 切换状态 ***/

//切换工具
var eraserEnable = false
eraser.onclick = function () {
    eraserEnable = true
    eraser.classList.add('active')
    pen.classList.remove('active')

}
pen.onclick = function () {
    eraserEnable = false
    pen.classList.add('active')
    eraser.classList.remove('active')
}
//切换颜色
black.onclick = function () {
    context.fillStyle = 'black'
    context.strokeStyle = 'black'
    black.classList.add('active')
    blue.classList.remove('active')
    red.classList.remove('active')
}
blue.onclick = function () {
    context.fillStyle = 'blue'
    context.strokeStyle = 'blue'
    blue.classList.add('active')
    red.classList.remove('active')
    black.classList.remove('active')
}
red.onclick = function () {
    context.fillStyle = 'red'
    context.strokeStyle = 'red'
    red.classList.add('active')
    black.classList.remove('active')
    blue.classList.remove('active')
}
//切换粗细
thin.onclick = function () {
    lineWidth = 3
    thin.classList.add('active')
    thick.classList.remove('active')
}
thick.onclick = function () {
    lineWidth = 6
    thick.classList.add('active')
    thin.classList.remove('active')
}
//清除当前页面
clear.onclick = function () {
    context.clearRect(0, 0, canvas.width, canvas.height)
}
//下载当前页
download.onclick = function () {
    var url = canvas.toDataURL("image/png")
    var a = document.createElement('a')
    document.body.appendChild(a)
    a.href = url
    a.download = 'draw'
    a.click()
}

/*** 函数库 ***/

//自动调整画布大小
function autoSetCanvasSize() {
    setCanvasSize()
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
    context.arc(x, y, radius, 0, Math.PI * 2)
    context.fill()
}

//绘制路径
function drawLine(x1, y1, x2, y2) {
    context.beginPath()
    context.moveTo(x1, y1)
    context.lineTo(x2, y2)
    context.lineWidth = lineWidth
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
                drawCirclr(x,y,lineWidth/2)
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
                //lastPoint = newPoint
            }
        }
        canvas.onmouseup = function (paint) {
            using = false
        }
    }
}


