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
