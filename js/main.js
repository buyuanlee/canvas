var oDiv=document.getElementById('canvas') //获取画板所在div

/**********鼠标点击时，出现圆点**********/
oDiv.onmousedown=function (click) {
var x = click.clientX;                      //获取当前点击的X轴位置
var y = click.clientY;                      //获取当前点击的Y轴位置
var point = document.createElement('div')   //创建新div存储在变量point中
point.style='width:6px;height:6px;'+        //设置div样式
'background:white;border-radius:50%;'+
'position:absolute;left:'+(x-3)+'px;'+
'top:'+(y-3)+'px;'
oDiv.appendChild(point)                     //插入div至oDiv中
}
