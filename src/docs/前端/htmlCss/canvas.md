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
ctx.stroke(headPath)
```
