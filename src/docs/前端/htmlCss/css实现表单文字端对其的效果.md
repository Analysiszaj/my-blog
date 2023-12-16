---
lang: zh-CN
title: 实现表单文字两端对齐效果
description: 实现表单文字两端对齐效果
tag: css
category: 前端
date: 2023-12-16
---

# css 实现表单文字对齐效果

## 1.场景

表单在我们编程中是一个很常见的需求，我们可以直接使用 UI 框架如`element-UI`就能很快速的实现一个表单

**表单.html**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>实现表单文字对齐效果</title>
    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/element-plus/dist/index.css" />
    <script src="//cdn.jsdelivr.net/npm/vue@3"></script>
    <script src="//cdn.jsdelivr.net/npm/element-plus"></script>
    <style>
      .container-box {
        width: 620px;
        margin: 0 auto;
      }
    </style>
  </head>
  <body>
    <div id="app">
      <div class="container-box">
        <el-form :model="form" label-width="120px">
          <el-form-item label="姓名">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="年龄">
            <el-input v-model="form.age" />
          </el-form-item>
          <el-form-item label="兴趣爱好">
            <el-input v-model="form.hobby" />
          </el-form-item>
          <el-form-item label="最喜欢的食物">
            <el-input v-model="form.favoriteFood" />
          </el-form-item>
          <el-form-item label="最喜欢的颜色">
            <el-input v-model="form.favoriteColor" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary">提交</el-button>
            <el-button>重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <script>
      const App = {
        data() {
          return {
            form: {
              name: '',
              age: '',
              hobby: '',
              favoriteFood: '',
              favoriteColor: '',
            },
          }
        },
      }

      const app = Vue.createApp(App)
      app.use(ElementPlus)
      app.mount('#app')
    </script>
  </body>
</html>
```

![](E:\博客\my-blog\src\docs\前端\htmlCss\mkimages\pi59mmd.png)

我们可以通过`label-position`属性为`left`或者`right`来控制 label 的对齐方式为左对齐，还是右对齐，但是现在遇到一个场景，需要文字两端对齐

## 2.解决方法

我第一时间想到的是`text-align`这个 css 属性

> text-align: start | end | center | justify

设置`text-align: justify` 即为文字两端对齐

通过选择器修改 elmentUI 的样式

```css
.el-form-item__label {
  display: block;
  text-align: justify;
}
```

但是这样他并没有生效,这时我们可以通过另外一个属性`text-align-last:justify;`就可以实现文字两端对齐的效果.

```css
.el-form-item__label {
  display: block;
  text-align: justify;
}
```

**效果如下：**

![](E:\博客\my-blog\src\docs\前端\htmlCss\mkimages\pi59n0A.png)

## 3.补充

为什么`text-align:justify`不能使得文字居中呢?

参考文档：https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-align

`text-align:justify`最后一行不生效。
