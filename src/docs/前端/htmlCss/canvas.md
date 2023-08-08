---
lang: zh-CN
title: Canvas
description: 学习Canvas时的笔记
sidebar: heading
tag: [Canvas]
category: 前端
date: 2023-08-01
---

# Canvas

## 1.Canva 简介

Canvas API（画布）是在 HTML5 中新增的标签用于在网页实时生成图像，并且可以操作图像内容，基本上它是一个可以用 JavaScript 操作的位图（bitmap）。

Canvas 对象表示一个 HTML 画布元素 `<canvas>`它没有自己的行为，但是定义了一个 API 支持脚本化客户端绘图操作

## 2.第一个 Canvas

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .title {
      }
      .canvas-style {
        border: 1px solid black;
      }
    </style>
  </head>
  <body>
    <!-- 

    id: 标识元素的唯一性
    width: 画布的宽度
    height: 画布的高度
   -->
    <div class="title">绘制的图形：</div>
    <canvas id="canvas" width="600" height="400" class="canvas-style"> 当前浏览器不支持canvas </canvas>
    <script>
      // 1. 找到画布
      var canvas = document.querySelector('#canvas')

      // 判断是否支持canvas
      if (!canvas.getContext) {
        console.log('当前浏览器不支持canvas, 请下载最新版')
      }

      // 2. 获取画笔，上下文对象
      var ctx = canvas.getContext('2d')
      // 3. 绘制图形
      // 3.绘制矩形fillRect(位置x, 位置y,宽度， 高度)
      ctx.fillRect(100, 100, 200, 200)
    </script>
  </body>
</html>
```

效果：在画布坐标（100，100）画一个宽高为 200 的矩形

[](https://s1.ax1x.com/2023/08/01/pPC28ot.md.png)

## 3.基本使用

### 3.1 矩形绘制

在如上例子中，我们通过`fillRect`绘制了一个填充的矩形，我们也可以绘制普通不填充的矩形

- `fillRect(位置x, 位置y, 宽度， 高度)`: 填充绘制
- `strokeRect(位置x, 位置y, 宽度， 高度)`: 路径绘制
- `clearRect(位置x, 位置y, 宽度, 高度)`: 清除绘制

绘制一个图形一点一点的清除图形

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      body {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .canvas-style {
        border: 1px solid black;
      }
    </style>
  </head>
  <body>
    <canvas id="canvas1" width="500" height="500" class="canvas-style"></canvas>
  </body>

  <script>
    const canvas = document.querySelector('#canvas1')
    const ctx = canvas.getContext('2d')
    // 路径绘制
    ctx.strokeRect(100, 100, 100, 100)

    let height = 0
    let timer = setInterval(() => {
      if (height > canvas.clientHeight) {
        clearInterval(timer)
      }

      // 清除内容
      ctx.clearRect(0, 0, canvas.clientHeight, height++)
    }, 10)
  </script>
</html>
```

效果：

![](https://pic.imgdb.cn/item/64caf7e91ddac507ccaad5b1.gif)

除了以上的写法，我们也可以将它们单独分开写

`Reat(位置x, 位置y, 宽度， 高度)`

```javascript
ctx.rect(100, 100, 100, 100) // 此时还不会将图形绘制到canvas 上， 必须运行以下两个函数之一

ctx.fill() // 绘制填充

ctx.stroke() // 绘制路径
```

如果我们想要一起使用，必须使用`beginPath()`和`closePath()`方法来控制画笔的落下和抬起， 不然会两个都会作用到

```javascript
ctx.rect(0, 0, 100, 100)
ctx.stroke()

ctx.rect(0, 100, 100, 100)
ctx.fill()
```

效果：

![](https://s1.ax1x.com/2023/08/02/pPP77wT.png)

使用了`beginPath()`和`beginPath()`

```javascript
ctx.beginPath()
ctx.rect(0, 0, 100, 100)
ctx.stroke()
ctx.closePath()

ctx.beginPath()
ctx.rect(0, 100, 100, 100)
ctx.fill()
ctx.closePath()
```

效果：

![](https://s1.ax1x.com/2023/08/02/pPP73sx.png)

### 3.2 绘制圆形

绘制圆形通过以下方法：

- `arc(圆心x, 圆心y, 半径，开始的角度, 结束的角度，逆时针还是顺时针)`： 绘制圆弧,默认顺时针 false
- `arcTo(点x,点y,点x,点y, 半径)`:该方法通过三个点形成一个直角，圆弧与这个直角两条线相切

```javascript
ctx.arc(250, 250, 50, 0, Math.PI * 2, true)
ctx.fill()
```

使用圆弧绘制笑脸

```javascript
const canvas = document.querySelector('#canvas1')
const ctx = canvas.getContext('2d')

function draw(x, y, radius, startAngle, endAngle, clockwise) {
  ctx.beginPath()
  ctx.arc(x, y, radius, startAngle, endAngle, clockwise)
  ctx.stroke()
  ctx.closePath()
}

// 绘制脸蛋
draw(250, 250, 100, 0, Math.PI * 2)

// 绘制嘴巴
draw(250, 275, 50, 0, Math.PI)

// 绘制眼睛
draw(200, 225, 25, 0, Math.PI * 2)
draw(300, 225, 25, 0, Math.PI * 2)
```

效果

![](https://s1.ax1x.com/2023/08/02/pPP7YdO.png)

上面我们每次都需要使用`beginPath()`和`closePath()`来控制画笔，我们也可以使用`moveTo`函数来进行移动画笔

- `moveTo(x, y)`:移动画笔到指定位置

```javascript
ctx.arc(250, 250, 100, 0, Math.PI * 2)
ctx.moveTo(300, 275)
ctx.arc(250, 275, 50, 0, Math.PI)

ctx.moveTo(225, 225)
ctx.arc(200, 225, 25, 0, Math.PI * 2)

ctx.moveTo(325, 225)
ctx.arc(300, 225, 25, 0, Math.PI * 2)
ctx.stroke()
```

也能实现笑脸

### 3.3 绘制线

绘制直线，需要用到`	lineTo()`方法

- `lineTo(x, y)`:绘制一条从当前位置到指定 x 以及 y 位置的直线

绘制一个三角形，如果使用`beginPath()`和`closePath()` 可以只需绘制两条线， 他会默认闭合

```javascript
ctx.moveTo(225, 225)
ctx.lineTo(275, 225)
ctx.lineTo(250, 275)
ctx.lineTo(225, 225)
ctx.stroke()
```

效果

![](https://s1.ax1x.com/2023/08/02/pPP71Q1.png)

### 3.4 二次贝塞尔曲线和三次贝塞尔曲线

绘制二次贝塞尔曲线

- `quadraticCurveTo(控制点x, 控制点y, 终点x, 终点y)`

使用二次贝塞尔曲线绘制聊天冒泡框

```javascript
ctx.moveTo(200, 300)
ctx.quadraticCurveTo(150, 300, 150, 250)
ctx.quadraticCurveTo(150, 200, 250, 200)
ctx.quadraticCurveTo(350, 200, 350, 250)
ctx.quadraticCurveTo(350, 300, 250, 300)

ctx.quadraticCurveTo(250, 350, 150, 350)
ctx.quadraticCurveTo(200, 350, 200, 300)
ctx.stroke()
```

效果：

![](https://s1.ax1x.com/2023/08/02/pPP7JeK.png)

三次贝塞尔曲线相对于二次贝塞尔曲线多了一个控制点

- `bezierCurveTo(cp1x, cp1y, cp2y, x, y)`:绘制三次贝塞尔曲线，cp1x,cp1y 为控制点一，cp2x,cp2y 为控制点二，x.y 为结束点。

使用三次贝塞尔曲线绘制爱心

```javascript
ctx.moveTo(250, 250)
ctx.bezierCurveTo(225, 200, 125, 225, 250, 350)
ctx.moveTo(250, 250)
ctx.bezierCurveTo(275, 200, 375, 225, 250, 350)
ctx.stroke()
```

效果：

![](https://s1.ax1x.com/2023/08/02/pPP78L6.png)

### 3.5 Path2D

在上面的案例中如果我们要绘制多个爱心, 就只能重复的写路径代码，极其麻烦，这时我们可以使用`Path2D`对象

```javascript
// 创建Path2D()对象
const headPath = new Path2D()
headPath.moveTo(250, 250)
headPath.bezierCurveTo(225, 200, 125, 225, 250, 350)
headPath.moveTo(250, 250)
headPath.bezierCurveTo(275, 200, 375, 225, 250, 350)
// 只需要把Path2D 对象传入绘制就可以在指定位置绘制相应的路径
ctx.stroke(headPath)
```

也可以用 svg 的方式进行创建

```javascript
// M10 10 移动到10*10的位置  h 水平 80 v 垂直 80 h 水平 -80 z 回到原位
// 正方形的格式
const ployline = new Path2D('M10 10 h 80 v 80 h -80 z')
ctx.stroke(ployline)
```

### 3.6 颜色控制

在 canvas 中如果我们想给图形上色，可以利用以下属性：

- `fillStyle`: 设置填充颜色
- `strokeStyle`：设置线段颜色
- `globalAlpha`: 设置全局透明度

> fillStyle = "red" // 设置颜色为红色

给爱心上色

```javascript
const canvas = document.querySelector('#canvas1')
const ctx = canvas.getContext('2d')

const path = new Path2D()
path.moveTo(250, 250)
path.bezierCurveTo(225, 200, 125, 225, 250, 350)
path.moveTo(250, 250)
path.bezierCurveTo(275, 200, 375, 225, 250, 350)

ctx.strokeStyle = 'red'
ctx.fillStyle = 'pink'

ctx.stroke(path)
ctx.fill(path)
```

效果：

![](https://s1.ax1x.com/2023/08/04/pPk98g0.png)

我们也可以绘制渐变的颜色

- **线性渐变**

> // 构建线性渐变（坐标 x,坐标 y,坐标 x,坐标 y）
>
> let linearGradient = ctx.createLinearGradient(100, 200, 300, 300)
>
> linearGradient.addColorStop(0, 'red')
>
> linearGradient.addColorStop(1, 'blue')
>
> ctx.fillstyle = linearGradient
>
> ctx.fillSRect(100, 200, 300, 300)

效果

![](https://s1.ax1x.com/2023/08/04/pPk9tDU.png)

绘制一刷新一样的界面

```javascript
let index = 0
function render() {
  index += 0.01
  // ctx.clearRect(0, 0, 500, 500)
  if (index > 1) {
    index = 0
  }
  const linearGradient = ctx.createLinearGradient(100, 200, 500, 500) // 必须大于绘制的图形，不然只会画到一半
  linearGradient.addColorStop(0, 'red')
  linearGradient.addColorStop(index, 'pink')
  linearGradient.addColorStop(1, 'blue')
  ctx.fillStyle = linearGradient
  ctx.fillRect(100, 200, 300, 300)
  requestAnimationFrame(render)
}

// 动画帧
requestAnimationFrame(render)
```

- **径向渐变**

> radialGradient = ctx.createRadialGradient(圆心 x,圆心 y,半径，圆心 x,圆心 y, 半径)

使用镜像渐变绘制一个 3d 圆球

```javascript
const radiaGradient = ctx.createRadialGradient(210, 210, 10, 250, 250, 100)
radiaGradient.addColorStop(0, 'pink')
radiaGradient.addColorStop(1, 'red')
ctx.fillStyle = radiaGradient

ctx.arc(250, 250, 100, 0, Math.PI * 2)
ctx.fill()
```

效果

![](https://s1.ax1x.com/2023/08/04/pPk9YuT.png)

- **圆锥渐变**

> const conicGradient = ctx.createConicGradient(弧度，点坐标 x, 点坐标 y)

使用圆锥渐变绘制一个圆锥

```javascript
const conicGradient = ctx.createConicGradient(Math.PI * 1.5, 300, 100)
conicGradient.addColorStop(0, 'red')
conicGradient.addColorStop(1, 'blue')

// 先绘制一个锥形
const path = new Path2D()
path.moveTo(200, 300)
path.lineTo(300, 100)
path.lineTo(400, 300)
path.quadraticCurveTo(300, 350, 200, 300)

ctx.fillStyle = conicGradient
ctx.fill(path)
```

效果：

![](https://s1.ax1x.com/2023/08/04/pPk9GvV.png)

### 3.7 图像填充

创建图案对象

> ctx.createPattern(img, 'repeat')

- `img`: 图像对象

- `repeat`: 指定如何重复图像(`repeat`默认铺满, `repeact-y`垂直方向, `repeact-x`水平方向, `no-repact`:不平铺)

使用

```javascript
const img = new Image()
img.src = './mkimages/image-20230801204834603.png'

img.onload = () => {
  const pattern = ctx.createPattern(img, 'repeat-y')
  ctx.fillStyle = pattern
  ctx.fillRect(0, 0, 500, 500)
}
```

### 3.8 样式控制

- 线形样式

  - `lineWidth`:设置线条的宽度
  - `lineCap`:设置线条末端样式
  - `lineJoin`:设置线条与线条之间的接合处样式
  - `miterLimit`：限制当两条线相交时交界处最大长度
  - `getLineDash`:返回 一个包含 当前虚线样式，长度为非负偶数的数组
  - `setLineDash`:设置虚线样式
  - `lineDashOffset`:设置虚线样式的起始偏移量

- 阴影
  - `shadowOffsetX = float`: x 轴的偏移量
  - `shadowOffsetY = float`： y 轴的偏移量
  - `shadowBlur = float` ： 模糊距离
  - `shadowColor = color` ： 阴影颜色

### 3.9 绘制图像或视频

**绘制图像**

> // 方式一
>
> ctx.drawImage(图像对象, 绘制的坐标 x, 绘制到的坐标 y, 图片的宽， 图片的高)
>
> // 方式二
>
> ctx.drawImage(图像对象，裁剪图片起始坐标 x, y, 裁剪图片的宽高 x, y, 绘制的位置 x, y， 渲染的宽高 x, y)

```javascript
const canvas = document.querySelector('#canvas1')
const ctx = canvas.getContext('2d')

const img = new Image()
img.src = './image/foo.png'
img.onload = function () {
  ctx.drawImage(img, 0, 0， 250， 250)
}
```

**绘制视频**

```javascript
const video = document.createElement('video')
video.src = ''

// 创建一个按钮将视频绘制到canvas 上
let btn = document.querySelector('#btn')
btn.addEventListener('click', function () {
  if (video.pause) {
    video.play()
    render()
  } else {
    video.pause()
  }
})

function render() {
  // 视频起始位置， 绘制宽高
  ctx.drawImage(video, 0, 0, 600, 400)

  // 可以给视频添加水印(这样视频右下角位置就会有水印)
  ctx.drawImage(img, 500, 350, 100, 50)
  requestAnimationFrame(render)
}
```
