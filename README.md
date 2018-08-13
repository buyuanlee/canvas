# JS-Canvas

## 设计思路

1. 知道用户什么时候按下鼠标（`onmousedown`）

   

   ```javascript
   document.onmousedown=function(x){
   
   console.log(x)
   
   }
   ```

   

   ​	

2. 知道用户什么时候移动鼠标(`onmousemove`)

   ​	

   ```javascript
   document.onmousemove=function(y){
   
   console.log(y)
   
   }		
   ```

   ​	

   ​		

3. 知道用户什么时候松开鼠标(`onmouseup`)

```
document.onmouseup=function(z){

console.log(z)

}	
```



### 按下鼠标时候

- 开启绘画模式（默认false，开启为true）
- 获取鼠标的X、Y轴位置
- 创建圆点div
- 设置圆点样式
- 增加圆点到html中

### 按下鼠标时候

同上

### 松开鼠标

关闭绘画模式（false）

**基本功能以上实现**

**BUG如下**

### 每隔固定时间获取鼠标移动状态

影响：移动太快，无法获取路径

解决方法：`html`元素使用`canvas`。增加绘制路径

canvas部分代码

```javascript
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

function drawCircle(x,y,radius){
    context.beginPath();
    conttext.arc(x,y,radius,0,360,2 * Math.PI);
    context.fill();
}
function drawLine(x1,y1,x2,y2){
    context.beginPath();
    conttext.moveTo(x1,y1);
    context.lineWidth=5;
    
}
```



### 调整画布大小

影响：无法用CSS调整，因为画笔会等比例缩放

解决方法：使用JS

```javascript
var pageWidth=document.documentElement.clientWidth;
var pageHeight=document.documentElement.clientHeight;
canvas.width=pageWidth;
canvas.height=pageHeight;
```

#### 另：窗口调解后无法适应窗口大小

解决办法：

```javascript
window.onresize+function(){
    var pageWidth=document.documentElement.clientWidth;
	var pageHeight=document.documentElement.clientHeight;
	canvas.width=pageWidth;
	canvas.height=pageHeight;
}
```

#### 另另：调解后，原有内容消失

解决办法：……

## 增加功能

### 橡皮擦

默认关闭，点击切换状态

```javascript
var eraserEnable = false;
eraser.onclick=function(){
    usingEraser=!eraserEnable
}
```

