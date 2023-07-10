---
lang: zh-CN
title: JavaScript学习笔记
description: 学习JavaScript时的笔记
sidebar: heading
tag: JavaScript
category: 前端
date: 2022-09-10
---

# JavaScript

## 1.简介

- 设计者**布兰登.艾奇**在 1995 年利用 10 天完成 JavaScript 设计
- 最初命名为`LiveScript`,后来在与 Sun 合作之后将起改名为`JavaScript`
- `JavaScript`是世界上最流行的语言之一，是一种运行在客户端上的脚本语言
- 作用：**表单验证**，**网页特效**，**服务端开发（Node.js）**，**桌面程序（Electron）**，**App(Cordova)**,**控制硬件-物联网（Ruff）**, **游戏开发（cocos2d-js）**
- 浏览器主要分为两部分，**渲染引擎（用来解释 HTML 和 css）**和**JS 引擎（用来读取网页中的 JavaScript 代码）**

[^脚本语言]: 不需要编译，运行过程中由 js 解释器逐行来进行

## 2.入门

### 2.1 JS 组成

​ JavaScript 由**JavaScript 语法(ECMAScript)**， **页面文档对象模型(DOM)**, **浏览器对象模型（BOM）**组成

<img src=".\mkimages\image-20220209143313078.png" alt="image-20220209143313078" style="zoom:75%;" />

**1.ECMAScript**

ECMAScript 是由 ECMA 国际（原欧洲计算机制造商协会）进行标准化的的一门编程语言规定了 js 的编程语法和基础核心知识，是所有浏览器厂商共同遵守的一套 js 语法工业标准

**2.DOM—文档对象模型**

文档对象模型（Document Object Model）,是 W3C 组织推荐的处理可扩展标记语言的标准编程式接口，通过 DOM 提供的接口可以对页面上的各种元素进行操作

**3.BOM—浏览器对象模型**

BOM(Browser Object Model)是指浏览器对象模型， 它提供了独立于内容的，可以于浏览器窗口进行交互的对象结构

### 2.2 JS 初体验

js 有三种书写模式： 行内式， 内嵌式， 外部式

**行内式**

```html
<body>
  <script></script>
</body>
```

**内嵌式**

```html
<head>
  <script></script>
</head>
```

**外部式**

```html
<head>
  <script src="test.js"></script>
</head>
```

在 HTML 中我们推荐使用双引号， JS 中推荐使用单引号

### 2.3 注释

- 单行注释： //
- 多行注释： /\*\*/

### 2.4 输入输出语句

![image-20220209150225706](.\mkimages\image-20220209150225706.png)

### 2.5 变量

**1.声明变量**

```js
var age // 声明有个名称我为age的变量

// 声明多个变量
var age = 18,
  name = 'agaga'

// 只声明不赋值  undefined
// 不声明不赋值  报错
// 不声明直接赋值  正常
```

- var 是 js 关键字，用来声明变量（variable 变量的意思）

**2.命名规范**

- 由字母（A-Za-z), 数字（0-9）,下划线（\_）, 美元符号组成
- 严格区分大小写
- 不能数字开头，不能是关键字
- 变量名必须有意义
- 遵守驼峰命名法，首字母小写，后面单词首字母需要大写

### 2.6 数据类型

- 简单数据类型（Number, String, Boolean, Undefined, Null）

- 复杂数据类型（Object, Array, function）

![image-20220210153136880](.\mkimages\image-20220210153136880.png)

**1.数字型三个特殊值**

`Infinity`无穷大， `-Infinity`无穷小， `NaN`非数值

**2.判断是否为数字**

```js
isNaN()函数
```

**3.字符串转义符**

![image-20220210184105342](.\mkimages\image-20220210184105342.png)

**4.字符串拼接**

数值相加，字符相连

**5.获取变量数据类型**

```js
typeof 'dfdsfd'
```

**6.字符串类型转换**

![image-20220210192440601](.\mkimages\image-20220210192440601.png)

![image-20220210194105657](.\mkimages\image-20220210194105657.png)

![image-20220210195013590](.\mkimages\image-20220210195013590.png)

### 2.7 运算符

运算符也被称作操作符， 用于实现赋值，比较和执行算数运算等功能的符号.

**1.算数运算符**

![image-20220211144615813](.\mkimages\image-20220211144615813.png)

- 浮点数运算会出现精度问题

**2.递增递减运算符**

- ++

---

3.**比较运算符**

![image-20220621121545401](.\mkimages\image-20220621121545401.png)

4.**逻辑运算符**

![image-20221005111056538](E:\前端\基础\JavaScript学习\mkimages\image-20221005111056538.png)

5.**赋值运算符**

![image-20221005115900470](E:\前端\基础\JavaScript学习\mkimages\image-20221005115900470.png)

6.**运算符优先级**

![image-20221005120905981](E:\前端\基础\JavaScript学习\mkimages\image-20221005120905981.png)

### 2.8 流程控制

> if

> if else

> if else if

> 三元运算符： ？:

> switch() 值匹配必须是全等

**`switch` 和 `if else if`区别**

![image-20221006130457304](E:\前端\基础\JavaScript学习\mkimages\image-20221006130457304.png)

### 2.9 循环

> for

> while

> do while

> break

> continue

### 2.10 命名规范

- 变量，函数的命名必须有意义
- 变量的名词一般用名词
- 函数的名称一般用动词

![image-20221006133620871](E:\前端\基础\JavaScript学习\mkimages\image-20221006133620871.png)

![image-20221006133647784](E:\前端\基础\JavaScript学习\mkimages\image-20221006133647784.png)

### 2.11 数组

> 创建数组 new Array() var arr = []

> 访问元素 arr[1] 空索引返回 undefined

> 遍历数组 for(int i = 0;i<arr.length;i++)

**新增数组元素**

- 通过修改 length 长度邢增数组元素,新增元素默认为 undefined

```javascript
var arr = ['red', 'green', 'blue', 'pink']
arr.length = 7
```

- 直接修改索引号添加数组元素

```javascript
var arr = ['red', 'green', 'blue']
arr[5] = 'yellow'
// [ 'red', 'green', 'blue', <2 empty items>, 'yellow' ]

arr[arr.length] = 'hah'
```

**冒泡排序**

```javascript
// 冒泡排序
var arr2 = [32, 54, 43, 12, 24, 63, 22]
var temp
console.log(arr2)
for (var i = 0; i < arr2.length - 1; i++) {
  for (var j = 0; j < arr2.length - i - 1; j++) {
    if (arr2[j] < arr2[j + 1]) {
      var temp = arr2[j]
      arr2[j] = arr2[j + 1]
      arr2[j + 1] = temp
    }
  }
}
console.log(arr2)
```

### 2.12 函数

**声明函数**

```javascript
var 变量名 = function(){}; //匿名函数

function 函数名(形参) {
 	return num(只能返回一个值， 返回多个值可以使用数组)
}
// 我们函数如果有return 返回return后面的值，如果函数没有retrun则返回undefined
```

**arguments**

arguments 是哟个内置对象，所有函数都内置了了一个 arguments 对象，arguments 对象中存储了传递的所有实参

返回的是个伪数组(伪数组，具有数组的 length,按照所有的方式进行存储的， 他没有真正数组的一些方法 pop(), push())

**函数作用域**

全局作用域： 整个 script 标签或者是一个单独的 js 文件

> 函数内部没有声明直接使用的也属于全局变量

局部作用域: 在函数内部就是局部作用域，这个代码的名字旨在函数内部其效果

作用域链：内部函数访问外部函数的变量，擦去的链式查找的方式来决定取那个值，这种结构我们称为作用域链

### 2.13 预解析

我们 js 引擎运行 js 分为两步，**豫解析**， **代码执行**

豫解析 js 引擎会把 js 里面所有的 var 还有 function 提升到当前作用域的最前面

代码执行按照代码书写的顺序从上往下执行

（1）变量提升 就是把所有的变量声明提升到当前的作用域最前面 不提升复制操作

（2）函数提升 就是把所有的函数声明提升到当前作用域的最前面 不调用函数

### 2.14 对象

对象是一个具体的事物， 构造函数是泛指某一大类， 类似与 java 的类

js 中对象是属性和方法的集合

**创建对象的方法**

1. 利用对象字面量

> var obj = {};

2.利用 new Object 创建对象

> var obj = new Object();
>
> obj.name = "de"
>
> obj.sex = '男'
>
> console.log(obj['sex'], obj.name)

3.利用构造函数创建对象

> // 构造函数名字首字母要大写
>
> function 构造函数名() {
>
> ​ this.属性 = 值；
>
> ​ this.方法 = function() {}
>
> }
>
> new 构造函数名()

**new 关键字**

1.new 构造函数再内存中创建一个空的对象

2.this 就会只想刚才创建的空对象

3.执行构造函数里面的代码 给这个空对象添加属性和方法

4.返回这个新对象

**遍历对象**

```javascript
var a = {
  name: 'hah',
  sex: '男',
}
for (var k in a) {
  // k 是属性名
  console.log(k)
  // a[k] 是属性值
  console.log(obj[k])
}
```

### 2.15 内置对象

javaScript 中的对象分为 3 种：自定义对象，内置对象，浏览器对象

```javascript
Math.max() //求最大值
Math.abs() //求绝对值
Math.floor() // 向下取整
Math.ceil() // 向上取整
Math.round() // 四舍五入， 往大的取（Math.round(-2.5) = -2

Math.random() // 随机函数 返回【0，1）即从0到...1但不包括1
```

## 3.进阶

### 3.1 DOM(页面文档对象)

DOM(Document Object Model -- 文档对象模型)是用来呈现以及与任意 HTML 或 XML 文档交互的 API

DOM 树：将 HTML 文档以树结构直观的表现出来，我们称之伪文档树或 DOM 树

DOM 对象：浏览器根据 HTML 标签生成的 js 对象

document:是 DOM 里面提供的一个对象

#### 3.1.1 获取 DOM 对象

**根据 css 选择器获取 DOM 元素**

> document.querySelector('css 选择器')

选择匹配的第一个元素,一个 HTMLElement 对象,如果没有匹配到，则返回 null

```html
<div>我是一个盒子</div>
<ul>
  <li>1</li>
  <li>2</li>
  <li>3</li>
</ul>
<script>
  document.querySelector('div').innerText = '修改了'

  // 只要是css选择器都可以
  document.querySelector('ul li:last-child').innerText = '修改了'
</script>
```

**获取多个元素**

> document.querySelectorAll('css 选择器')

**修改 DOM 元素内容**

> document.write()

只能将文本内容追加到`</body>`前面的位置

文本中博阿寒的标签会被解析

> .innerText()

修改文档对象的文字内容（不会解析标签）

> .innerHTML()

修改文档对象的元素（能够解析标签）

**修改元素的属性**

- 可以通过 js 设置/修改标签元素属性，比如通过 src 更换图片

- 最常见的属性如：href, title, src

```javascript
对象.属性 = 值
```

**修改元素样式**

> 对象.style.样式属性 = 值

- 如果属性有-连接符，需要转换伪**小驼峰**命名
- 赋值的时候，不要忘记加 css 单位

> 对象.className = 值 // "class1 class2"

新增一个 class 样式

> // 追加一个类
>
> 对象.classList.add('类名')
>
> // 删除一个类
>
> 对象.classList.remove('类名')
>
> // 切换一个类
>
> 对象.classList.toggle('类名')

**修改表单元素的属性**

> input.type = 值
>
> input.disable = false | true
>
> ...

#### 3.1.2 定时器-间歇函数

开启定时器

> setInterval(函数, 间隔时间)

关闭定时器

> let 变量名 = setInterval(function, time)
>
> clearInterval(变量名)

#### 3.1.3 事件

事件是在编程时系统内发生的动作或发生的事情

- 什么时事件监听？
  - 一旦有事件产生，一旦幼师教案除法，就立即调用一个

> 对象.addEventListener('事件名'，函数)
>
> 对象.onclick = function(){} // 会有事件冒泡

![image-20221011170146835](E:\前端\基础\JavaScript学习\mkimages\image-20221011170146835.png)

**事件类型**

鼠标事件(鼠标触发)

| 名称       | 动作     |
| ---------- | -------- |
| click      | 鼠标点击 |
| mouseenter | 鼠标经过 |
| mouseleave | 鼠标离开 |

焦点事件(表单获得光标)

| 名称  | 动作     |
| ----- | -------- |
| focus | 获得焦点 |
| blur  | 失去焦点 |

键盘事件（键盘触发）

| 名称    | 动作         |
| ------- | ------------ |
| keydown | 键盘按下触发 |
| keyup   | 键盘抬起触发 |

文本事件（表单输入触发）

| 名称  | 动作     |
| ----- | -------- |
| input | 用户输入 |

#### 3.1.3 高阶函数

函数表达式：将函数将值传替

如果将函数 A 作为参数传递给函数 B 时，我们称函数 A 为回调函数

#### 3.1.4 环境变量

环境对象指的是函数内部特殊的`变量 this`,他代表着当前函数运行时所出的环境

- `谁调用，this就指向谁`

**排他思想**

```javascript
// 先把其他的全部清除掉
for (let j = 0; j < btns.length; j++) {
  btns[j].classList.remove('pink')
}
// 给自己添加上
this.classList.add('pink')
```

#### 3.1.5 DOM 节点

**节点类型**

- 元素节点：所有标签，比如 body,div, html 是根节点
- 属性节点：所有的属性不然 href
- 文本节点：所有文本

**节点关系**

- 父节点查找:`子元素.parentNode` 返回最近一级的父节点 找不到返回 Null

- 子节点查找:

  ```javascript
  父元素.childNodes // 获得所有子节点，包括文本节点
  父元素.children // 仅获得所有元素节点，返回的是个伪数组
  ```

- 兄弟关系查找

```javascript
// 下一个兄弟节点
nextElementSibling

// 上一个兄弟节点
previousElementSibling
```

**增加节点**

创建节点

> document.createElement('标签名')

插入到父元素最后

> 父元素.appendChild(要插入的元素)

插入到某个子元素的前面

> 父元素.insertBefore(要插入的元素, 在那个元素前面)

克隆节点

> 元素.cloneNode(布尔值)

```javascript
let ul = document.querySelector('ul')
// 括号内为空则默认为false, 如果是false则不克隆后代节点
// 如果为true则克隆后代节点
let new UL = ul.cloneNode()
```

删除节点

> 父元素。removeChild(要删除的元素)

直接把字符串格式元素添加到父元素中

> insertAdjacentHTML(插入的位置, 字符串)
>
> 'beforebegin' 元素自身的前面
>
> 'afterbegin' 插入元素内部的第一个子节点之前
>
> 'beforeend' 插入元素内部的最后一个子节点之后
>
> 'afterend' 元素自身后面

#### 3.1.6 时间对象

获取当前时间

> new Date()

![image-20221012210912774](E:\前端\基础\JavaScript学习\mkimages\image-20221012210912774.png)

**重绘和回流**

浏览器是如何进行界面渲染的

![image-20221015134028398](E:\前端\基础\JavaScript学习\mkimages\image-20221015134028398.png)

- 解析（parser)HTML， 生成 DOM 树（DOM Tree)
- 同时解析（parser)css， 生成样式规则（style Rules)
- 根据 DOM 树和样式规则，生成渲染树（Render Tree)
- 进行布局 Layout(回流、重排)：根据生成的渲染树，得到节点的几何信息
- 进行绘制（重绘）：根据计算和获取的信息进行整个页面的绘制
- Display:展示在页面上

回流（重排）：当 Render Tree 中部分或则和全部元素的尺寸，结构，布局等发生改变时,浏览器就会重新渲染部分或全部文档的过程称为回流

重绘：由于节点（元素）的样式的改变并不影响他在文档流中的位置和文档布局时（比如：color,backgroud-color,outline 等），称为重绘

`重绘不一定引起回流，但回流一定会引起重绘`

- 会倒是回流的操作：
  - 页面的首次刷新
  - 浏览器的窗口大小发生改变
  - 元素的大小或位置发生改变
  - 改变字体的大小
  - 激活 css 伪类

#### 3.1.7 事件对象

在事件绑定的回调函数的第一个参数就时事件对象

```javascript
元素.addEventener('click', function (e) {})
```

**常用的属性**

- `type`:获取当前事件的类型
- `clientX/clientY`：获取光标相对于浏览器可见窗口左上角的位置
- `offsetX/offsetY`：获取光标相对于当前 DOM 元素左上角的位置
- `pageX/pageY`: 获取光标相整个文档的坐标；
- `key`:用户按下的键盘键的值(keyCode（已废弃）)

#### 3.1.8 事件流

**事件流**指的是事件完整指向过程中的流动路径

![image-20221018175131962](E:\前端\基础\JavaScript学习\mkimages\image-20221018175131962.png)

- **事件冒泡**
  - 当一个元素的事件被触发时，同样的事件将会在该元素的所有祖先元素中依次触发，这一过程杯称为事件冒泡
  - 简单理解：当一个元素触发事件之后，会依次向上调用所有父级元素的同名事件
- **事件捕获**
  - 从 DOM 的根元素开始去指向对应的事件

```javascript
DOM.addEventListener(事件类型，事件处理函数,是否使用捕获机制)
```

`true/false`：默认 false(冒泡阶段)true(捕获阶段)

**阻止事件流动**

```javascript
事件对象.stopPropagation()
```

`mouseover`和`mouseout`会有冒泡效果

`mouseenter`和`mouseleave`没有冒泡效果

**阻止默认行为**

如链接点击不跳转，表单域的跳转

```javascript
e.preventDefault()
```

**两种注册事件的区别**

传统 on 注册

- 同一个对象，后面注册的事件会覆盖掉前面注册
- 直接使用 null 覆盖就可以实现事件的解绑
- 都是冒泡阶段执行

事件监听注册

- 语法：addEventListener(事件类型,事件处理函数,是否使用捕获)
- 后面注册的事件不会覆盖前面注册的事件
- 可以通过第三个参数去确定时在冒泡或者捕获阶段执行
- 必须使用`removeEventListener(事件类型，事件处理函数，获取捕获或冒泡阶段)`
- 匿名函数无法被解绑（事件名）

**事件委托**

当我们需要给每个子元素里面注册事件的时候，可以直接给其父元素注册事件，事件委托时给父级添加事件

```html
<body>
  <ul>
    <li></li>
    <li></li>
  </ul>
  <script>
    let ul = document.querySelector('ul')
    ul.addEventListener('click', function (e) {
      alert('我点击了')
    })
    // 缺点不知道点击的是谁
    可以通过e.target
  </script>
</body>
```

#### 3.1.9 js 特效

**手风琴效果**

```html
<!--css部分 -->
<style>
  * {
    padding: 0;
    margin: 0;
  }
  ul {
    display: flex;
    width: calc(240px * 5);
    margin: 0 auto;
    list-style: none;
  }
  ul li {
    width: 240px;
    overflow: hidden;
    transition: width 0.5s;
  }
  ul img {
    height: 500px;
  }
</style>

<!--html部分-->
<ul>
  <li><img src="./img/image1.jpg" alt="" /></li>
  <li><img src="./img/image2.jpg" alt="" /></li>
  <li><img src="./img/image3.png" alt="" /></li>
  <li><img src="./img/image4.png" alt="" /></li>
  <li><img src="./img/image6.jpg" alt="" /></li>
</ul>

<!--js部分 --->
<script>
  let liList = document.querySelectorAll('ul li')
  // 鼠标经过,其他div变成100px ,当前扩大为800px
  liList.forEach((item) => {
    item.addEventListener('mouseenter', function () {
      liList.forEach((item) => {
        item.style.width = '100px'
      })
      item.style.width = '800px'
    })
    // 鼠标移开所有的复原240px
    item.addEventListener('mouseleave', function () {
      liList.forEach((item) => {
        item.style.width = '240px'
      })
    })
  })
</script>
```

#### 3.1.10 滚动事件和加载事件

很多网页需要检测用户把页面滚动到某一个区域后做一些处理，比如固定导航栏，比如返回顶部

**监听整个页面的滚动**

```javascript
window.addEventListener('scroll', function () {})
```

**加载事件**

当我们需要等待页面资源全部处理完了做一些事情

事件名：`load`

监听页面所有资源加载完毕

```javascript
window.addEventListener('load', function () {})
```

当初始 HTML 文档被园区加载和解析完成之后，`DOMContentLoad`事件被触发，而无需等待样式表，图形完全加载

监听 DOM 加载完毕

```javascript
document.addEventListener('DOMContentLoad', function () {})
```

**scroll 家族**

- 获取元素的**内容**总宽高(不包含滚动条)返回值不带单位

- > `scrollWidth`和`scrollHeight`

- 获取元素内容往左，往上滚出去看不到的距离

- > `scrollLeft`和`scrollTop`,这两个属性是可修改的

```javascript
div.addEventListener('scroll', function () {
  console.log(this.scrollTop)
})

window.addEventListener('scroll', function () {
  // 无法得到，窗口无法滚动，滚动的时页面
  console.log(this.scrollTop)

  // document.documentElement  获取整个html节点
  console.log(document.documentElement.scrollTop)
})
```

**offset 家族**

- 获取元素自身的宽高，包含元素自生设置的宽高，padding, border

- > `offsetWidth`和`offsetHeight`

```javascript
元素.offsetWidth
```

- 获取元素距离自己定位父元素的左，上距离

- > `offsetLeft`和`offsetTop` 该属性为只读属性

**client 家族**

当前可视区域, 不包括滚动条 边框

当窗口尺寸发生改变的时候触发事件

```javascript
window.addEventListener('resize', function () {})
```

- > `clientWidth`和`clientHeight`

  获取可视区域距离边框的值

- > `clientLeft`和`clientTop`

### 3.2 BOM（浏览器对象）

#### 3.2.1 BOM 浏览器对象模型

BOM（Browser Object Model) 是浏览器对象模型

![image-20221022143235867](E:\前端\基础\JavaScript学习\mkimages\image-20221022143235867.png)

window 对象是浏览器内置的全局对象,我们所学的所有 Web APIs 的知识内容都是基于 window 对象实现的

window 对象下包含了 navigator, location, document, history, screen5 个属性，即所谓的 BOM

#### 3.2.2 定时器-延时函数

使用 setTimerout 实现 setInterval

```javascript
// 使用setTimeout 实现setInterval一样的功能
let clock = document.querySelector('.clock')
console.log(clock)
function myInterval() {
  let d = new Date()
  console.log(1)
  clock.innerText = d.toLocaleString()
  setTimeout(myInterval, 1000)
}
myInterval()
```

**两者区别**

- setInterval 的特征是重复执行，首次执行会延时
- setTimeout 的特征是延时执行,只执行一次
- setTimeout 结合递归函数,能模拟 setInterval 重复执行
- clearTimeout 清除由 setTimeout 创建的定时任务

#### 3.2.3 js 执行机制

**js 是单线程**

javaScript 语言的一大特点就是单线程，也就是说同一个事件只能做一件事，这是因为 javaScript 这门脚本语言诞生的使命所致---javaScript 是为了处理页面中用户的交互逻辑,以及操作 DOM 而诞生的，比如我们对某个 DOM 元素进行添加和删除操作，不能同时进行，应该先进行添加，之后再删除

单线程就意味着，所有任务都需要排队，前一个任务结束，才会执行后一个任务，这样所导致的问题是：如果 js 执行的事件过长，这样就会造成页面的渲染不连贯，导致页面渲染加载阻塞的感觉

为了解决这个问题，利用多核 CPU 的计算能力, HTML5 提出 Web Worker 标准，运行 javaScript 脚本创建多个线程,于是， JS 中出现了`同步`和`异步`

**同步**

前一个任务结束后再执行后一个任务，程序的执行顺序与任务的排列顺序是一致的，比如同步的做饭：我们烧水煮饭,等水开了，再去切菜，炒菜

**异步**

在做一件事情时，因为这件事情会花费很长时间,在做这件事的同时,

你还可以去处理其他事情

![image-20221022154052615](E:\前端\基础\JavaScript学习\mkimages\image-20221022154052615.png)

#### 3.2.4 location 对象

- `href`：href 属性获取完整的 URL 地址,对齐复制时用与地址的跳转
- `search`: 获取表单提交的参数
- `hash`:获取属性地址的 hash
- `reload`:刷新 有本地缓存 ctrl + F5 强制刷新

```javascript
console.log(window.location.search)
console.log(window.location.href)
console.log(window.location.hash)
```

#### 3.2.5 navigator 对象

```javascript
// 检测userAgent（浏览器信息)
function(){
    const userAgent = navigator.userAgent
    android = userAgent.match(/(Android);?[\s\/]+([\d.]+)?/)
    const iphone = userAgent.match(/(iPhone\sos)\s([\d_]+)/)

    if(android || iphone){
        location.href = 'http://m.itcast.cn'
    }
}
```

#### 3.2.6 history 对象

![image-20221022201106536](E:\前端\基础\JavaScript学习\mkimages\image-20221022201106536.png)

#### 3.2.7 本地存储

随着互联网的快速发展，基于网页的应用越来越普遍，同时也变的越来越复杂，为了满足各种的需求，会经常性在本地存储大量的数据，HTML5 规范提出了相关解决方案

1.数据存储在用户浏览器中

2.设置，读取方便，升值页面刷新不丢失数据

3.容量较大，SessionStorage 和 localStorage 约 5M 左右

**localStorage**

> 存储数据
>
> localStorage.setItem(key, value)

> 获取数据
>
> localStorage.getItem(key)

> 删除数据
>
> localStorage.removeItem(key)

> 存储负载数据类型存储
>
> 本地只能存储字符串，无法储存负载数据类型，需要将复杂数据类型转换成 JSON 字符串，在存储到本地
>
> - JSON.stringify(复杂数据类型)
> - 将复杂数据转换成 JSON 字符串 存储 本地存储中
> - JSON.parse(JSON 字符串)
> - 将 JSON 字符串转换成对象 取出 时候使用

```javascript
localStorage.setItem('username', 'zaj')
// 无法直接存储
let obj = {
  uname: '刘德华',
  age: 17,
  address: '黑买',
}
localStorage.setItem('obj', obj)
console.log(typeof localStorage.getItem('obj')) // 直接被变成字符串

//转换成json字符串
let obj2 = {
  uname: '刘德华',
  age: 17,
  address: 'hahs',
}
let newObj2 = JSON.stringify(obj2)
localStorage.setItem('obj2', newObj2)
console.log(localStorage.getItem('obj2'))

// 转回对象
newObj2 = JSON.parse(localStorage.getItem('obj2'))
console.log(newObj2)
```

**sessionStorage**

1.生命周期为关闭浏览器窗口

2.在同一个窗口（页面）下数据可以共享

3.以键值对的形式存储使用

4.用法跟 localStorage 基本相同

#### 3.2.8 自定义属性

**固有属性**

标签天生自带的属性 比如 class id title 等, 可以直接使用.语法操作

**自定义属性**

由程序院自己添加的属性，在 DOM 对象中找不到,无法使用.语法操作，必须使用专门的 API

> getAttribute('属性名') // 获取自定义属性
>
> setAttribute('属性名', '属性值') // 设置自定义属性
>
> removeAttribute('属性名') // 删除自定义属性

传统的自定义属性没有专门的定义规则，开发者随意定值，不够规范，所以在 html5 中推出来了专门的`data-自定义属性`, 在标签上一律以 data-开头

```javascript
元素.setAttribute('data-id', '10')
// 可以通过dataSet 获得（只能获取以data-开头的）
元素.dataset.id
```

#### 3.2.9 正则表达式

正则表达式(Regular Expression)是用于匹配字符串中字符组合的模式,在 javaScript 中，正则表达式也是对象

通常用来查找，替换那些符合正则表达式的文本,许多语言都支持正则表达式

用于

- 表单验证(匹配)
- 过滤敏感词(替换)
- 字符串中提取我们想要的部分(提取)

**语法**

定义正则表达式语法：

> let 变量名 = /表达式/
>
> // 是正则表达式字面量 返回的是一个对象

test() 用来查看正则表达式与指定的字符是否匹配 ture/false

> regObj.test(被检测的字符串)

```javascript
let reg = /前端/
reg.test('我们都在学前端') // true
```

exec() 在一个指定字符串中执行一个搜索匹配

> regObj.exec(被检测字符串)

如果匹配成功,exec() 方法返回一个数组,否则返回 null

replace()字符替换

> 字符串.replace(/正则表达式/, '替换文本')

##### **元字符**

- 普通字符

  大多数的字符仅能描述他们本身，这些字符称作普通字符，例如所有的字母和数字,也就是说普通字符只能够匹配字符串中与他们相同的字符

- 元字符

  试一下具有特殊含义的字符,可以极大的提高灵活性和强大的匹配功能

  比如规定用户只能输入 26 个英文字母,普通字符的话`abcdef...` 换成元字符写法：`[a-z]`

- 元字符的类别

  1.边界符（表示位置，开头和结尾，必须用什么开头，用什么结尾）

| 边界符 | 说明                           |
| ------ | ------------------------------ |
| ^      | 表示匹配行首的文本（以谁开始） |
| $      | 表示匹配行尾的文本（以谁结束） |

```javascript
let ex = /^元/
ex.test('元字符') // 匹配以元开头true
let ex1 = /符$/ // 匹配以符结尾
ex1.test('符') // true
let ex2 = /^元$/ // 精准匹配只能匹配元
ex2.test('元字符元') // false
```

2.量词（表示重复次数）

| 量词  | 说明              |
| ----- | ----------------- |
| \*    | 重复零次或更多次  |
| +     | 重复一次或多次    |
| ?     | 重复零次或一次    |
| {n}   | 重复 n 次         |
| {n,}  | 重复 n 次或更多次 |
| {n,m} | c 重复 n 到 m 次  |

```javascript
console.log(/a*/.test('')) // true
console.log(/a*/.test('aa')) // true
console.log(/a*/.test('b')) // true

console.log(/a+/.test('')) // false
console.log(/a+/.test('a')) // true
console.log(/a+/.test('b'))  // false
...
```

3.字符类（比如\d 表示 0~9）

```javascript
console.log(/[abc]/.test('')) //false
console.log(/[abc]/.test('ccc')) // true

// 连字符
console.log(/[a-z]/.test('ccc')) // true 匹配所有小写字母
console.log(/[a-zA-Z]/.test('ccc')) // 所有大小写字母
console.log(/[abc-_]/.test('ccc'))

// [^a-z] 小写字母以外的字符

// .匹配除换行符之外的任何单个字符
```

预定义：指的是某些常见模式的简写方式

![image-20221024222939545](E:\前端\基础\JavaScript学习\mkimages\image-20221024222939545.png)

4.修饰符

> /表达式/修饰符

| 修饰符 | 说明                                           |
| ------ | ---------------------------------------------- |
| i      | 单词 ignore 的缩写，正则匹配时字母不区分大小写 |
| g      | global 的缩写，匹配所有满足正则表达式的结果    |
|        |                                                |

## 4.高级

### 4.1 编程思想

**面向过程 POP（Process-oriented programming)**

面向过程就是分析出解决问题所需要的步骤，然后用函数把这些步骤一步一步实现，使用的时候再一个一个的依次调用

![image-20221022202554406](E:\前端\基础\JavaScript学习\mkimages\image-20221022202554406.png)

面向过程，就是按照我们分析好了的步骤，按照步骤解决问题

**_优点_**：性能比面对对象高，适合跟硬件联系很紧密的东西，例如单片机就采用的面向过程编程

**缺点**：没有面对对象易维护，易服用，易扩展

**面向对象 OOP(object Oriented Programming)**

面对对象是把事物分解成一个个对象，然后由对象之间分工与合作

![image-20221022202811867](E:\前端\基础\JavaScript学习\mkimages\image-20221022202811867.png)

面对对象是以对象功能来花费问题，而不是步骤

面对对象的特性：

- 封装性
- 继承性
- 多态性

**优点**：易维护，易服用，易扩展,由于面对对象有封装，继承，多态的特性，可以设计出

**缺点**：性能没有面向过程高

### 4.2 面向对象

#### 4.2.1 对象

现实生活中：万物皆对象，对象是一个具体的事物，看得见摸得着的实物，例如，一本书，一辆汽车等

在 javaScript 中，对象是一组无需的相关属性和方法的集合，所有事物都是对象，例如字符串，数值，数组，函数等

对象由**属性**和**方法**组成的:

- 属性：事物的特征，在对象中用属性来表示
- 方法：事物的行为，在对象中用方法来表示

面向对象的思维特点：

1.抽取（抽象）对象共用的属性和行为组织（封装）成一个类（模板）

2.对类进行实例化，获取类的对象

#### 4.2.2 类

在 ES6 中新增加了类的概念，可以使用 class 关键字声明一个类，之后以这个类来实例化对象

类抽象了对象的公共部分，他泛指某一大类

对象特指某一个，通过类实例化一个具体的对象

**创建一个类**

```javascript
/*constructor() 方法是类的构造函数（默认方法），用于传递参数，返回实例对象,通过new命令生成对象实例时，自动调用该方法，如果没有显示定义，类内部会自动给我们创建一个constructor()*/

class name {
  constructor(uname) {
    this.uname = uname
  }
}
new name('刘德华')
```

**给类添加方法**

```javascript
class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
  say() {
    console.log(this.name + '你好')
  }
}
```

**类的继承**

```javascript
// 子继承父类会继承父类的属性和方法
class Father {
  constructor() {}
  money() {
    console.log(100)
  }
}

class Son extends Father {}
var son = new Son()
son.money()
```

**super 关键字的使用**

super 关键字由于访问和调用对象父类上的函数，可以调用父类的构造函数，也可以调用父类的普通函数

```javascript
class Father {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
  sum() {
    console.log(this.x + this.y)
  }
  say() {
    return '爸爸'
  }
}

class Son extends Father {
  constructor(x, y) {
    // this.x = x
    // this.y = y
    super(x, y) // 调用父类中的构造函数
  }
  say() {
    super.say() + '的儿子'
  }
}
var son = new Son(1, 2)
son.sum() // 报错， 由于父类里的this, 子类调用
```

就近原则

1.在继承中，如果实例化子类输出一个方法，先看子类有没有这个方法，如果有就先执行子类的

2.继承中，如果子类里面没有，就去查找父类有没有这个方法，如果有，就执行这个方法

3.super 必须在子类 this 之前调用

```javascript
class Son extends Father {
  constructor(x, y) {
    super(x, y)
    thi.x = x
    thi.y = y
  }
}
```

**this 指向**

```javascript
var that
class Star {
  constructor(uname, age) {
    that = this // 指向当前
    console.log(this)
    this.uname = uname
    this.age = age
    this.btn = document.querySelector('button')
    this.btn.onclick = this.sing
  }
  sing() {
    console.log(this) // 由于是button调用的指向的btn
    console.log(this.uname)
  }
  dance() {
    console.log(this)
  }
}
var lt = new Star('刘德华', 32)
```

谁调用指向谁

**注意点**

1.在 ES6 中类没有变量提升，所以必须先定义类，才能通过实例对象

2.类里面的共有的属性和方法一定要加 this 使用

### 4.3 构造函数和原型

在典型的 oop 的语言中（如 java),都存在类的概念，类就是对象的模板，对象就是类的实例,但在 ES6 之前,jsz 中并没有引入类的概念

ES6,全称 ECMAScript6.0， 2015.06 发版,但是目前浏览器的 JAVAScript 是 ES5 版本，大多数高版本的浏览器也支持 ES6,不过只实现了 ES6 的部分特性和功能

在 ES6 之前，对象不是基于类创建的，而是用一种称为**构造函数**来定义对象和他们的特征

**创建对象的三种方法**

1.对象字面量

> var obj = {}

2.Object()

> var obj = new Object()
>
> obj.name = "hah"

3.构造函数

> function obj(name, age){
>
> ​ this.name = name
>
> ​ this.age = age
>
> ​ this.sing = function(){
>
> ​ }
>
> }
>
> var obj1 = new obj()

#### 4.3.1 构造函数

**构造函数**是一种特殊的函数,主要用来初始化对象，即为对象成员变量初始值，它总与 new 一起使用，我们可以把对象中一些公共的属性和方法抽取出来，然后封装到这个函数中去

new 在指向时会做四件事情：

- 在内存中创建一个空对象
- 让 this 指向这个行对象
- 执行构造函数里面的代码，给这个新对象添加属性和方法
- 返回这个新对象（所以构造函数不需要 return）

JavaScript 的构造函数中可以添加一些成员，可以在构造函数本身添加，也可以在构造函数内部的 this 上添加，通过这两种方式添加的成员,就分别成称为**静态成员**和**实例成员**

- 静态成员：在构造函数本上添加的成员称为**静态成员，只能由构造函数本身来访问**
- 实例成员:在构造函数内部创建的对象成员称为**实例成员,只那那个由实例化的对象来访问**

```java
function Star(){
    this.sing = function(){

    }
}
Star.sex = '男'
var ldn = new Star()
ldn.sing()
ldn.sex   // undefined

Star.sing()   // undefined
Star.sex // 男
```

#### 4.3.2 构造函数原型

当我们创建类的时候一般把方法放到构造函数里面，这样会有一个问题，每次实例化的时候都会为方法新开辟一个空间, 存在**浪费内存的问题**

构造函数通过原型分配的函数时所有对象所**共享的**

JavaScript 规定，每个构造函数都有一个 prototype 属性，指向另一个对象，注意这个 prototype 就是一个对象，这个对象的所有属性和方法，都会杯构造函数所拥有

**我们可以把那些不变的方法，直接定义在 prototype 对象上,这样所有对象的实例就可以共享方法**

原型时一个对象，我们也称为 prototype 为**原型对象**

```javascript
function Star(name, age) {
  this.name = name
  this.age = age

  // 每当实例化一个对象的时候，都会为该方法创建一个空间
  // this.sing(){
  //   console.log('唱歌')
  // }
}

// 一般情况下，我们的公共属性定义到构造函数里面，公共的方法我们放到原型对象身上
Star.prototype.sing = function () {
  console.log('唱歌')
}
var ldh = new Star('刘德华', 18)
var zxy = new Star('张学友', 19)
ldh.sing()
zxy.sing() // 对象身上系统自己添加一个__proto__指向我们构造函数的原型对象
console.log(ldh.__proto__ === Star.prototype)

// 方法的查找规则：首先看ldh对象身上是否有sing方法，如果有就执行这个对象上的sing
// 如果没有sing这个方法，因为有__proto__的存在，就去构造函数原型对象prototype身上查找sing这个方法
```

![image-20221108161107225](E:\前端\基础\JavaScript学习\mkimages\image-20221108161107225.png)

对象原型和构造函数 prototype 原型里面都有个一个属性 constructor 属性，constructor 我们称为构造函数,因为它指回构造函数本身

用于记录 该对象引用于那个构造函数,它可以让原型对象重新指向原来的构造函数

```javascript
function Star(name, age) {
  this.name = name
  this.age = age
}
// 当我们共有的方法够多时，我们希望直接指向一个对象
Star.prototype = {
  // 如果我们修改了原来的原型对象,给原型对象赋值的是一个对象，则必须手动利用
  // contructor指回原来的构造函数
  constructor: Star, // 让他重新指向构造函数
  sing: function () {
    console.log('我回唱歌')
  },
  movie: function () {
    console.log('我会演电影')
  },
}

let ldh = new Star('刘德华', 18)

console.log(Star.prototype.constructor) // Object
console.log(ldh.__proto__.constructor)
```

构造函数，实例，原型对象三者之间的关系

![image-20221108172820141](E:\前端\基础\JavaScript学习\mkimages\image-20221108172820141.png)

#### 4.3.3 原型链

![image-20221108173054895](E:\前端\基础\JavaScript学习\mkimages\image-20221108173054895.png)

**JavaScript 的成员查找机制**

- 当访问一个对象的属性（包括方法)时,首先查找这个对象自身有没有该属性
- 如果没有就查找它的原型
- 入门还没有就找原型的原型（Object 的原型对象）
- 依此类推一直找到 Object 为止

#### 4.3.4 this 指向

```javascript
function Star(name, age) {
  this.name = name
  this.age = age
  // this.sing = function () {
  //   console.log('唱歌')
  //   console.log(this.name)
  // }
}

Star.prototype.sing = function () {
  console.log('我唱歌')
  console.log(this)
}
const ldh = new Star('刘德华', 17)
ldh.sing()

//1. 在构造函数中，里面的this指向的是对象实例ldh
//2.原型对象函数李的this指向的是实例对象ldh
```

#### 4.3.5 扩展内置对象方法

可以通过原型对象扩展内置对象方法

```
// 扩展一个累加方法
Array.prototype.sum = function(){
    var sum = 0
    for(var i =0;i<this.length; i++){
        sum += this[i]
    }
}
```

数组和字符串内置对象不能给原型对象覆盖操作`Array.prototype = {}`, 只能是`Array.prototype.xxx = function(){}`

### 4.4 继承

ES6 之前并没有给我们提供 extends 继承,我们可以通过构造函数+原型对象模拟实现继承,被称为组合继承

**call**

> fun.call(thisArg, arg1, arg2, ...)

- thisArg: 当前调用函数 this 的指向对象
- arg:传替其他参数

```javascript
function fn(x, y) {
  console.log('我想喝手磨咖啡')
  console.log(this)
}
// fn()
fn.call() // 调用函数
var b = {
  name: 'andy',
}
// 指向b并携带参数
fn.call(b, 1, 2)
```

**借用构造函数继承父类型属性**

```javascript
function Father(uname, age) {
  this.uname = uname
  this.age = age
}

function Son(uname, age) {
  Father.call(this, uname, age)
}
```

**继承父构造函数的方法**

```javascript
function Father(uname, age) {
  this.name = uname
  this.age = age
}
Father.prototype.test = function () {
  console.log('Father test')
}

function Son(uname, age) {
  Father.call(this, uname, age)
}
Son.prototype = Father.prototype // 有问题

var son = new Son('lihua', 21)
son.test()
```

这时给子的原型添加方法也会在父原型上添加， 这是应为如上这种直接赋值的方法相当于把**子原型对象直接指向父原型对象的地址**

这时可以先实例化一个对象，让子对象继承实例化的父对象

```javascript
function Father(uname, age) {
  this.name = uname
  this.age = age
}
Father.prototype.test = function () {
  console.log('Father test')
}

function Son(uname, age) {
  Father.call(this, uname, age)
}

Son.prototype = new Father()
Son.prototype.exam = function () {
  console.log('Son test')
}
```

> class Star {
>
> }
>
> console.log(typeof Star) // function

类的本质其实就是函数， 我们也可以简单认为 类就是 构造函数的另外一种写法

构造函数的特点：

- 构造函数有原型对象 prototype
- 构造函数原型对象 prototype 里面有 constructor 指向构造函数本身
- 构造函数可以通过原型对象添加方法
- 构造函数创建的实例对象有**proto** 原型指向构造函数

### 4.5 ES5 中新增方法

#### 4.5.1 数组方法

迭代（遍历）方法：`forEach()`, `map()`, `filter()`, `some()`, `every()`

> array.forEach(function(currentValue, index, arr))

- currentValue: 数组当前项的值
- index: 数组当前项的索引
- arr: 数组对象本身

> array.filter(function(currentValue, index, arr))

- filter() 方法创建一个新的数组,新数组中的元素通过检查指定数组中符合条件的索引元素,主要用于筛选数组
- 返回一个新的数组
- currentValue: 数组当前的值
- index: 数组当前项的索引
- arr:数组对象本身

> array.some(function(currentValue, index, arr))

- some() 方法用于检测数组中的元素是否满足指定条件，通俗点查找数组中是否有满足条件的元素
- 返回的是布尔值,如果查找到这个元素，就返回 true, 如果查找不到就返回 false
- 如果找到第一个满足条件的元素，则终止循环，不在继续查找
- currentValue: 数组当前项的值
- index: 数组当前项的索引
- arr: 数组对象本身

#### 4.5.2 字符串方法

> str.trim()

- trim 删除两边空白字符,不会改变原字符串，返回一个新字符串

​

#### 4.5.3 对象方法

> Object.defineProperty(obj, prop, descriptor)

- obj:必须。目标对象
- prop：必须，定义或修改的属性的名字
- descriptor: 必需， 目标属性所拥有的特性

![image-20221126193746172](E:\前端\基础\JavaScript学习\mkimages\image-20221126193746172.png)

> Object.keys()

- 用于获取对象自生所有的属性
- 效果类似 for...in
- 返回一个有属性名组成的数组

### 4.6 函数进阶

#### 4.6.1 函数定义和调用

1.自定义函数

> var fun = function() {}

2.函数表达式

> var fun = function(){}

3.new Function()

> var f = new Function('参数 1','参数 2', '函数体')
>
> var f1 = new Function('a', 'b', 'console.log(a+b)');

- function 里面参数都必须式字符串格式
- 第三种方式执行效率低，也不方便书写，因此较少使用
- 所有函数都是 Function 的实例对象
- 函数也是对象

**调用**

```javascript
// 函数的调用方式

// 1.普通函数
function fn() {
  console.log('hahha')
}

fn()
fn.call()

// 2.对象调用
var o = {
  sayHi: function () {
    console.log('hah')
  },
}
o.sayHi()
// 3.构造函数调用
function People(name, age) {
  this.name = name
  this.age = age
}
new People()
// 4.绑定事件函数
btn.onclick = function () {} // 点击了按钮就可以抵用
// 5.定时器函数
setTimeout(function () {
  console.log('hah')
}, 1000)(
  // 6.立即执行函数
  function () {
    console.log('ee')
  }
)()
```

#### 4.6.2 函数内 this 的指向

this 的指向，式当我们调用函数的式时候确定的，调用方式的不同决定了 this 的指向不同

![image-20221129185442297](E:\前端\基础\JavaScript学习\mkimages\image-20221129185442297.png)

#### 4.6.3 改变函数 this 指向

`call()`方法调用一个对象。简单理解为调用函数的方式,但是他可以改变 this 的指向

> fun.call(thisArg, arg1, arg2)

`apply()`方法调用一个函数，简单理解为抵用函数的方式,但是他可以改变 this 的指向

> fun.apply(thisArg, [argArray])

- thisArg: 在 fun 函数运行时制定的 this
- argsArray: 传递的值，必须包含在数组里面
- 返回值就是函数的返回值《因为他就是调用函数

可以使用 apply 函数利用 Math 求最大值最小值

```javascript
var arr = [1, 32, 34, 56, 3, 2]
console.log(Math.max(arr)) // NAN
console.log(Math.max.apply(Math, arr)) // 56
```

`bind()`方法不会调用函数

> fun.bind(thisArg, arg1, arg2, ...)

- thisArg: 在 fun 函数运行指定的 this 值
- arg1,arg2: 传递的其他参数
- 返回由指定的 this 值和初始化参数改造的原函数拷贝

### 4.7 严格模式

![image-20221201183842923](E:\前端\基础\JavaScript学习\mkimages\image-20221201183842923.png)

**开启严格模式**

为整个脚本文件开启严格模式,需要在所有语句之前放一个特定语句`use strict`

#### 4.7.1 严格模式的变化

**变量规定**

1.在正常模式中，如果一个变量没有声明就赋值，默认是全局变量，严格模式禁止这种用法，变量都必须先用 var 命令声明，然后再使用

2.严格模式严禁删除已经声明变量，例如 delete x；语法是错误的

**this 指向**

1.  严格模式下全局作用域中函数中的 this 指向的是 undefined
2.  严格模式下，如果构造函数不加 new 调用，this 会报错（指向的是 undefined）
3.  普通模式下,函数里面参数可以同名, 严格模式下不可以
4.  不可以再非函数代码块里定义函数（if（a){function(){})）()

### 4.8 高阶函数

高阶函数是对其他函数进行操作的函数，他接收 `函数作为参数`或`将函数作为返回值输出`

```javascript
function fn(callback){
    callback&&callback()
}
fn(function(){alert('hi')})

function fn(){
    return function(){}
}
fn()；
```

此时 fn 就是一个高阶函数

函数也是一种数据类型，同样可以作为参数，传递给另外一个参数使用，最典型的就是作为回调函数

### 4.9 闭包

闭包（closure）指有权访问另外一个函数作用域中变量的函数

函数外面的作用域可以访问函数内部

闭包的主要作用：延申了变量的作用范围

```javascript
// 函数外面的作用域可以访问函数内部
function f3() {
  var num = 20
  return function () {
    console.log(num)
  }
}
f = f3()
f()
```

### 4.10 递归

递归函数：函数内部自己调用自己，这个函数就是递归函数

由于递归很容易发生“栈溢出”错误（stack overflow),所以必须夹条件 return

## 记录

RegExp 游标回移动

## 插件

error lens 语法检查

## 扩展

#### 1.函数柯里化

柯里化（Currying）又称**部分求值**函数柯里化指的时将能够接收多个参数的函数转换成单一参数的函数，并返回接收余下参数且返回的新函数的技术

**特点**

- 参数复用
- 提前返回
- 延迟执行

将一个简单的函数转换成柯里化函数

```javascript
// 普通函数
function add(a, b) {
  return a + b
}
add(2, 3)

// 柯里化函数
function add(a) {
  return function (b) {
    return a + b
  }
}
add(2)(3)
```

假设如上函数的第一个参数是不用变化的

```javascript
// 使用普通函数，我们每一次调用都用传入相同的值
add(2, 4)
add(2, 5)

// 使用柯里化后的函数(参数复用)
const firstAdd = add(2)
firstAdd(4)
firstAdd(5)
```
