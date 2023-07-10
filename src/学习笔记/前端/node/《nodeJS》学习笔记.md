---
lang: zh-CN
title: node.js学习笔记
description: 学习node.js时的笔记
sidebar: heading
tag: 前端
category: 前端
date: 2022-11-24
---

# node.js 笔记

## 1. 初识 node.js

#### 1.1 什么是 node.js

node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境

官方文档：https://nodejs.org/zh-cn/

node.js 中无法调用 DOM 和 BOM 等浏览器内置 API

Node.js 作为一个 javaScript 的运行环境，仅仅提供了基础的功能和 API,基于 Node.js 提供的这些基础功能，很多强大的工具和框架如雨后春笋，层出不穷

- 基于 Express 框架（[http://www.expressjs.com.cn/](http://www.expressjs.com.cn/))，可以快速构建 web 应用

- 基于 Electron 框架（https://electronjs.org/），可以构建跨平台的桌面应用

- 基于 restify 框架（http://restify.com/),可以快速构建API接口项目

#### 1.2 node.js 环境安装

安装包可以从 Node.js 的官网首页直接下载， 进入到 Node.js 的官方首页（https://nodejs.org/en/）,下载所需版本，双击直接安装即可

- LTS 为长期稳定版，对于追求稳定性的企业级项目来说， 推荐安装 LTS 版本
- Current 为新特性尝鲜版，current 版本中可能存在隐藏的 BUg 或安全漏洞

查看已安装的 Node.js 版本号,控制台输入

> node -v

**nvm 管理器**

nvm 是一个管理 node.js 版本的管理器， 使用该工具可以便捷的切换 node.js 的版本，环境，等等功能，教程：https://www.runoob.com/w3cnote/nvm-manager-node-versions.html

#### 1.3 在 node.js 执行 js 代码

新建 test.js

```javascript
console.log('Hello world')
```

控制台输入

> node test.js

## 2.基本模块

#### 2.1 fs 文件系统模块

fs 是 node.js 官方提供的，用来操作文件的模块，它提供了一系列的方法和属性，用来满足用户对文件的操作需求

- `fs.readFile()`,用来读取指定文件中的内容
- `fs.writeFile()`, 用来向指定的文件中写入内容

使用前需导入 fs 模块

```javascript
const fs = require('fs')
```

**fs.readFile()**

使用 fs.readFile()方法，可以读取指定文件中的内容，语法格式如下：

```javascript
fs.readFile(path, [options], callback) // []为可选参数， 其他为必选参数
```

- `path`: 表示文件路径
- `options`: 可选参数，表示以什么样的编码格式读取
- `callback`：回调函数，表示当文件读取完成后，通过该函数拿到读取结果

示例：

```
const fs = require('fs')

// 以utf8的形式读取文件
fs.readFile('./filename.txt'. 'utf8', function(err, dataStr) {
	// 如果文件读取成功err==null, 读取失败就是对象，dataStr == undefined
	console.log('err')
	console.log('dataStr')
})
```

**fs.writeFile()**

使用 fs.writeFile()方法，可以读取指定文件中的内容，语法格式如下

```
fs.writeFile(file, data, [options], callback)
```

- `file`:指定文件文件路径的字符串
- `data`: 表示要写入的内容
- `[options]`: 字符编码默认 utf-8
- `callback`:写入完成后的回调函数

示例：

```javascript
const fs = require('fs')

fs.writeFile('./files/2.txt', 'abcd', function (err) {
  // 如果文件写入成功，则err的值等于null
  console.log(err)
})
```

**动态路径拼接问题**

在使用 fs 模块操作文件时，如果提供的操作路径时以./, ../开头的相对路径，很容易出现动态路径拼接错误的问题.

原因：代码在运行的时候，会以执行**node 命令时所处的目录**，动态拼接出杯操作文件的完整路径

解决方法： 1.使用完整路径 2. 使用**dirname(**dirname 表示文件所在的目录)

#### 2.2 path 路径模块

path 模块时 Node.js 官方提供的，用来处理路径的模块,它提供了一系列的方法和属性，用来满足用户对路径的处理需求

例如：

- `path.join()`:用于将多个路径拼接完成一个完整的路径字符串
- `path.basename()`:从路径字符串中将文件名解析出来
- `path.extname()`:获取文件扩展名

#### 2.3 http 模块

**客户端和服务器**

在网络节点中，负责消耗资源的电脑，叫做客服端，负责对外提供网络资源的电脑，叫做服务器

http 模块是 Node.js 官方提供的，用来创建 web 服务器的模块, 通过 http 模块提供的`http.createServer()`方法，就能方便的把一台普通的电脑，变成一台 Web 服务器， 从而对外提供 Web 资源服务

**使用**

```javascript
// 1.导入tttp模块
const http = require('http')

// 2.创建web服务器
const server = http.createServer()

// 为服务器实例绑定request事件，监听客户端请求
// req包含了与客户端相关的数据和属性
// res是响应对象，它包含了与服务器相关的数据和属性, res.end()
server.on('request', function (req, res) {
  console.log('Someone visit our web server')
})

// 4. 启动服务器
server.listen(8080, function () {
  console.log('server running at https://127.0.0.1:8080')
})
```

**解决响应数据中文乱码**

```javascript
res.setHeader('Content-Type', 'text/html; charset=utf-8')
```

## 3. 模块化

模块化是指解决一个复杂问题时，自顶向下逐层把系统划分成若干模块的过程，对于整个系统来说，模块是可组合，分解和更换的单元

#### 3.1 node.js 中模块的分类

- `内置模块`: (内置模块由 Node.js 官方提供的， 例如 fs, path, http)
- `自定义模块`:（用户创建的每个.js 文件,都是自定义模块）
- `第三方法模块`：（由第三方开发出来的模块, 并非官方提供的内置模块, 也不用用户创建的自定义模块，使用前需要先下载）

#### 3.2 加载模块

> require()

```javascript
// 加载内置的模块
const fs = require('fs')

// 加载用户的自定义模块（可用省略.js后缀）
const custom = require('./custom.js')

// 加载第三方模块
const moment = require('moment')
```

#### 3.3 模块作用域

和函数作用域类似，在自定义模块中定义的变量，方法等成员，只能在当前模块内被访问， 这种模式鸡巴的访问限制，叫做模块作用域

- 模块作用域的好处

  - 防止全局变量污染问题

- **module 对象**

  - 每个 js 自定义模块种都有一个 module 对象， 它里面存储了和当前模块有关的信息
  - 通过 require 导入的模块实际上是模块种的 exports 对象， 以 module.exports 指向的对象为准
  - module.exports 向外界成员共享出去

- **exports 对象**

  - module.exports 单词写起来比较复杂，为了简化向外共享成员的代理,Node 提供了 exports 对象。默认情况下，**exports 和 module.exports 指向同一个对象**，最终共享结果, 还是**以 module.exports 指向的对象为准**

- require()模块时，得到的永远时 module.exports 指向的对象

#### 3.4 模块规范

Node.js 遵循 CommonJS 模块化规范， CommonJS 规定了模块的特性和各模块之间如何相互依赖

- 每个模块内部， module 变量代表当前模块
- module 变量时一个对象，它的 exports 属性（module.exports）是对外的接口
- 加载某个模块，其实是加载该模块的 module.exports 属性， require()方法用于加载模块

## 4. npm 与包

node.js 中的第三方模块叫做包, 包是基于内置模块封装出来的，提供了更高级，更方便的 API,极大的提高了开发效率

下载包

> npm install 包名

#### 4.1 npm 体验

**格式化时间的传统做法**

dataFormat.js

```javascript
function dateFormat(dtStr) {
  const dt = new Date(dtStr)

  const y = dt.getFullYear()
  const m = padZero(dt.getMonth() + 1)
  const d = padZero(dt.getDate())

  const hh = padZero(dt.getHours())
  const mm = padZero(dt.getMinutes())
  const ss = padZero(dt.getSeconds())

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
}

// 定义补零的函数
function padZero(n) {
  return n > 9 ? n : '0' + n
}

module.exports = {
  dateFormat,
}
```

use.js

```javascript
const TIME = require('./09 npm体验')

const dt = new Date()

console.log(dt)
console.log(TIME)
const newDT = TIME.dateFormat(dt)

console.log(newDT)
```

**使用第三方的包**

> npm install moment //简写 npm i moment // 导入包

use.js

```javascript
// 导入需要的包
const moment = require('moment')

const dt = moment().format('YYYY/MM/DD HH:mm:ss')
console.log(dt)
```

初次装包完成后，在项目文件夹下多一个叫 node_modules 的文件夹和 package-lock.json 的配置文件

- node_modules 文件夹： 用来存放所有已安装到项目中的包, require()导入第三方包时， 就是从这个目录中查找并加载包
- package-lock.json 配置文件用来记录 node_modules 目录下的每一个包的下载信息，例如包的名字.版本号, 下载地址

**安装指定版本**

> npm i 报名@版本号

版本号是已“点分十进制”形式进行定义的，总共由三位数字,例如 2.24.0

第一位数字: 大版本

第二位数字：功能版本

第三位：BUg 修复版本

版本号提升规则：只要前面的版本号增长了， 则后面的版本号归 0

#### 4.2 包管理配置文件

npm 规定， 在项目的根目录下,必须提供 package.json 的包管理配置文件

创建 package.json

> npm init -y // 只能在英文目录下运行，不能出现空格

package.json

```json
{
  // 包名
  "name": "node.js",
  "version": "1.0.0",
  // 描述信息
  "description": "",
  "main": "08模块作用域.js",
  // 记录安装了那些包
  "dependencies": {
    "moment": "^2.29.3"
  },
  // 只有开发阶段才会用的的包
  "devDependencies": {},
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  // 关键字
  "keywords": [],
  "author": "",
  // 开源协议
  "license": "ISC"
}
```

> // 安装指定的包，并记录到 devDependencies 节点中
>
> npm i 包名 -D // 简写
>
> npm intsll 包名 --save-dev

#### 4.3 切换下载源

> npm config set registry=源

**nrm** 方便切换镜像源

> npm i nrm -g // 全局安装
>
> nrm ls 查看所有源
>
> nrm use // 切换

#### 4.4 包的分类

**项目包**

- 开发依赖包： `npm i 包名 -D` 被记录到 devDependencies 下面的包
- 核心依赖包： `npm i 包名` 被记录到 denpendencies 下面的包

**全局包**

`npm i 包名 -g`

只有工具性质的包，才有全局安装的必要性

#### 4.5 i5ting_toc

一个将 md 文档转换成 html 文件

> i5ting_toc -f 要转换的 md 文件路径 -o

#### 4.6 规范的包结构

- 包必须以单独的目录而存在
- 包的定义目录下必须要包含 package.json 这个包管理配置文件
- package.json 中必须包含 name, version, main 这个三个属性， 分别代表包的名字， 版本号， 包的入口

#### 4.7 开发自己的包

- 新建 my-tools 文件夹, 作为包的根目录
- 在 my-tools 文件夹中， 新建如下三个文件：
  - package.json (包管理配置文件)
  - index.js (包的入口文件)
  - README.md (包的说明文档)
- 在 index.js 下编写代码

**拆分包**

需要在 index.js 文件中导入然后导出

```javascript
const date = require('date')

module.exports = {
    ...date，
}
```

**编写包的说明文档**

包根目录中的 README.md 是包的使用说明文档

包含:安装方式，导入方式，格式化时间，功能介绍， 开源协议

#### 4.8 发布包

1. 注册 npm 账号

   访问https://www.npmjs.com注册账号

2. 登录 npm 账号

   终端执行 npm login 输入用户名， 密码， 邮箱（登录之前必须切换回 npm 的官方服务器）

3. 把包发布到 npm 上(进入到包目录)

   > npm publish (包名不能雷同)

4. 删除已发布的包

   > npm unpublish 包名 --force

#### 4.9 模块的加载机制

- 模块在第一次加载后会被缓存， 这也意味着多次调用 require() 不会导致模块的代码被执行多次
- 内置模块的加载优先级最高
- 使用 require()加载自定义模块时， 必须指定./或者../开头, 如果没有指定,这样的路径标识符，则 node 会把它当作内置模块或第三方模块进行加载

- 如果省略文件的扩展名，则 Node.js 会按顺序分别尝试

  - 按照确切的文件名进行加载
  - 补全.js 扩展名
  - 补全.json
  - 补全.node
  - 以上全没有报错

- 加载第三方模块时， 首先尝试从/node_modules 文件夹加载， 没有往上父目录，直到文件系统根目录

![](https://s1.ax1x.com/2023/07/03/pCr8PEV.png)

- 目录作为模块时,在被加载目录下查找 package.json 的文件， 并寻找 main 属性，作为 require()入口,没有就加载目录下 index.js 文件, 以上两步都失败则打印错误信息

## 5. Express

Express 是基于 Node.js 平台，快速，开放，极简的 Web 开放框架， 使用 Express,我们可用方便，快捷的创建 Web 网站的服务器或 API 接口服务器

#### 5.1 使用

创建基本的 web 服务器

```javascript
// 1. 导入express
const express = require('express')

// 2. 创建web服务器
const app = express()

//3. 启动服务器
app.listen(80, () => {
  console.log('express server running at http://127.0.0.1')
})
```

**监听请求**

```javascript
// 监听客户端GET和POST请求
app.get('/user', (req, res) => {
  res.send({ name: 'zs', age: 20, gender: '男' })
})

app.post('/user', (req, res) => {
  res.send('请求成功')
})
```

**获取用户查询参数**

```javascript
app.get('/', (req, res) => {
  console.log(req.query)
})
```

**获取动态参数**

```javascript
app.get('/user/:id', (req, res) => {
  res.send(req.params)
})
```

#### 5.2 静态资源处理

**express.static()**

通过该函数可以非常方便的创建一个静态资源服务器, 例如,通过如下代码就可以将 public 目录下的图片,css 图片，JavaScript 文件对外开放

> app.use(express.static('public'))

![](https://s1.ax1x.com/2023/07/03/pCr8s2Q.png)

**托管多个静态资源目录**

```javascript
app.use(express.static('public'))
app.use(express.static('files'))
```

**挂载路径前缀**

```javascript
app.use('/public'， express.static('public'))
```

#### 5.3 nodemon

在调试 node.js 项目的时候, 如果修改了项目代码，则需要手动频繁的手动 close 掉，然后再重新启动，非常繁琐， 使用 nodemon 可以解决这个问题

**使用**

```cmd
nodemon app.js
```

#### 5.4 路由

在 Express 中，路由指的是**客户端的请求**与**服务器处理函数**之间的**映射关系**

由 3 部分组成, 分别是*请求的类型*, _请求的 url_, *处理函数*格式如下：

> app.METHOD(PATH, HANDLER)

**路由匹配过程**

![](https://s1.ax1x.com/2023/07/03/pCr8yvj.png)

**路由模块化**

为了方便路由进行模块化管理,Express 不建议将路由直接挂载到 app 上, 而是推荐将路由抽离位单独的模块

1.创建路由模块对应的.js 文件

2.调用`express.Router()`函数创建路由对象

3.向 2 路由对象上挂载具体的路由

4.使用 module.exports 向外共享路由对象

5.使用 app.use()函数注册路由模块

```javascript
const express = requrie('express')
// 创建路由对象
const router = requrie.Router()

// 挂载具体的路由
router.get('/user/list', function(req, res) {
    res.send('Get user list.')
})

router.post('/user/add', function(req, res) => {
	res.send('Add new user')
})

module.exports = router
```

```javascript
const express = require('express')

const app = express()
// 导入路由模块
const router = require('./12-路由模块化')
app.use(router)

app.listen(80, () => {
  console.log('http://127.0.0.1')
})
```

**挂载路由前缀**

```javascript
app.use('/api'.router)
```

#### 5.5 中间件

中间件（Middleware）,特指业务流程的中间处理环节

**express 中间件的调用流程**

![image-20220430195453532](https://s1.ax1x.com/2023/07/03/pCr8058.png)

**中间件格式**

![image-20220430195640169](https://s1.ax1x.com/2023/07/03/pCr8DPS.png)

**next 函数的作用**

![image-20220430195819103](https://s1.ax1x.com/2023/07/03/pCr8wUf.png)

**定义中间件函数**

```javascript
const express = require('express')

const app = express()

const mw = function (req, res, next) {
  console.log('这是最简单的中间件函数')
  next()
}

app.listen(80, () => {
  console.log('http://127.0.0.1')
})
```

**全局生效的中间件**

客户端发起的任何请求，到达服务器之后，都会触发的中间件，叫做全局生效的中间件

通过 app.use()，既可以定义一个全局生效中间件

```javascript
const mv = function (req, res, next) {
  console.log('这是一个全局生效的中间件')
}

app.use(mv)
```

**中间件的作用**

多个中间件之间，共享同一份 req 和 res

**局部生效中间件**

```javascript
const express = require('express')

const app = express()

const mv1 = (req, res, next) => {
  console.log('调用了全局生效的中间件')
}

// 2.创建路由
app.get('/', (req, res) => {
  res.send('Home page.')
})

app.get('/user', mv1, (req, res) => {
  res.send('User pages.')
})
```

使用多个

```javascript
app.get('/', [mw1, mw2], (req, res) => {
  res.send('Home page.')
})
```

**注意事项**

1.一定要在路由之前注册中间件

2.客户端发送过来的请求，可以连续调用多个中间件进行处理

3. 执行完中间件的业务代码之后，不要忘记调用 next()函数
4. 为了防止代码逻辑混乱,调用 next() 函数后不要再写额外的代码
5. 连续调用多个中间件时，多个中间件之间，共享 req 和 res 对象

#### 5.6 中间件的分类

Express 官方把常见的中间件用法，分成 5 大类, 分别时：

1. 应用级别的中间件
2. 路由级别的中间件
3. 错误级别的中间件
4. Express 内置的中间件
5. 第三方的中间件

**应用级别的中间件**

通过 app.use()或 app.get(), app.post(), 绑定到 app 实例上的中间件，叫做应用级别的中间件

**路由级别的中间件**

绑定到 express.Router()实例上的中间件，叫做路由级别的中间件，它的用法和应用级别的中间件没有任何区别，只不过，应用级别中间件时绑定 app 实例上，路由级别中间件绑定到 router 实例上

**错误级别中间件**

错误级别中间件的作用，专门用来捕获整个项目中发生的异常错误，从而防止项目异常崩溃的问题

格式：错误级别中间件的 function 处理函数中，必须有 4 个形参，形参顺序从前到后， 分别是`(err, req, res, next)`, 必须注册在所有路由之后

```javascript
const express = require('express')

const app = express()

app.get('/', (req, res) => {
  throw new Error('服务器内部发生了错误!')
  res.send('Home page.')
})

// 定义错误级别的中间件
app.use(function (err, req, res, next) {
  console.log('发生错误' + err.message)
  res.send('Error !' + err.message)
})

app.listen(80, () => {
  console.log('Express server runnine at http://127.0.0.1')
})
```

**Express 内置中间件**

![](https://s1.ax1x.com/2023/07/03/pCr8xPO.png)

```javascript
//在服务器端可以通过req, body来获取JSON格式的表单数据和url-encoded格式的数据
// 默认情况下如果不配置解析表单数据的中间件， 则req.body默认等于undefined
```

**第三方的中间件**

![](https://s1.ax1x.com/2023/07/03/pCr8jIK.png)

#### 5.7 自定义中间件

自定义一个解析 json 数据的中间件

```javascript
const express = require('express')

// 导入处理querystring 的Node.js 内置模块
const qs = require('querystring')

const app = express()

// 可以将自定中间件封装为模块
app.use((req, res, next) => {
  let str = ''
  // 监听req对象的data事件
  req.on('data', (chunk) => {
    str += chunk
  })

  // 监听req对象的end事件
  req.on('end', () => {
    // 完整的数据
    console.log(str)

    const body = qs.parse(str)
    req.body = body
    console.log(body)
    next()
  })
})

app.get('/user', (req, res) => {
  res.send(req.body)
})

app.listen(80, () => {
  console.log('http://127.0.0.1')
})
```

## 6. 跨域

当我们运行的网站与存放资源了路径不在同一个协议下时就会产生跨域

解决跨域问题方案主要有两种

1. cors(主流解决方案, 推荐)
2. JSONP(有缺陷的解决方案： 只支持 GET 请求)

#### 6.1 使用 cors 中间件解决跨域问题

CORS(Cross-Origin Resource Sharing, 跨域资源共享) 由一系列 HTTP 响应头组成， 这些 HTTP 响应头决定浏览器是否阻止前端 JS 代码跨域获取资源

浏览器的同源安全策略默认会阻止网页跨域获取资源，但如果接口服务器配置 CORS 相关 HTTP 响应头, 就可以解决浏览器端的跨域访问限制

cors 是 Express 的一个第三方中间件，通过安装科配置 cors 中间件, 可以很方便的解决跨域问题

1. 运行`npm install cors` 安装中间件
2. 使用`const cors = require('cors')` 导入中间件
3. 在路由之前调用`app.use(cors())` 配置中间件

![](https://s1.ax1x.com/2023/07/03/pCr8Xa6.png)

cors 主要在服务器端进行配置, 客户端无需做任何二外的配置

有版本兼容问题，(IE10 + , Chrome4+, FIreFox3.5+)

#### 6.2 cors 相关的三个响应头

**Access-control-Allow-Origin**

设置值运行来自http://itcast.cn的请求

> res.setHeader('Access-Control-Allow-Origin', 'http://itcast.cn')

允许来自任何域的网络请求

> res.setHeader('Access-Control-Allow-Origin', '\*')

**Access-Control-Allow-Header**

![](https://s1.ax1x.com/2023/07/03/pCr8OVx.md.png)

> res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Custom-Header')

**Access-Control-Allow-Methods**

![](https://s1.ax1x.com/2023/07/03/pCrGaQJ.png)

> // 允许 POST, GET, DELETE, HEAD 请求方法
>
> res.setHeader('Access-Control-Allow-Methods', 'POST, GET, DELETE, HEAD')
>
> // 允许所有 HTTP 请求方法
>
> res.setHeader('Access-Control-Allow-Methods', '\*')

#### 6.3 cors 请求的分类

客户端在请求 CORS 接口时， 根据请求方式和请求头的不同，可以将 CORS 的请求分类分为两大类,分别时：

1. 简单请求：客户端与服务器之间只会发生一次请求
2. 预检请求：客户端与服务器之间会发生两次请求，OPTION 预检请求成功之后，才会发起真正的请求

**简单请求**

![](https://s1.ax1x.com/2023/07/03/pCrGwLR.png)

**预检请求**

![](https://s1.ax1x.com/2023/07/03/pCrGBe1.png)

#### 6.4 JSONP

浏览器通过`<script>`标签的 src 属性，请求服务上的数据，同时，服务器返回一个函数的调用，这种请求数据的方式叫做 JSONP

特点：

- JSONP 不属于真正的 Ajax 请求，因为它没有使用 XMLHttpRequest 这个对象
- JSONP 仅支持 GET 请求，不支持 POST, PUT, DELETE 等请求

**实现 JSONP 接口的步骤**

![](https://s1.ax1x.com/2023/07/03/pCrGtWF.png)

## 7.身份验证

不同模式使用不同的身份验证

![](https://s1.ax1x.com/2023/07/03/pCrGNz4.png)

#### 7.1 Session

**HTTP 协议的无状态性**

HTTP 协议的无状态性，指的时客户端的每次 HTTP 请求都时独立的，连续多个请求灭有直接的关系，服务器不会主动保留每次 HTTP 请求的状态

**Cookie**

Cookie 是存储再用户浏览器中的一段不超过 4kb 的字符串，它有一个名称， 一个值和其它几个用于控制 Cookie 有效期， 安全性， 使用范围的可选属性组成

不同域名下的 Cookie 各自独立，每当客户发起请求，会自动把当前域名下的所有未过期的 Cookie 一同发送到服务器

特性：

- 自动发送
- 域名独立
- 过期时限
- 4kb 限制

**在 express 中使用 Session 认证**

> 安装包： npm i express-session

```javascript
// 导入express-session
const session = require('express-session')

const express = require('express')

const app = express()

// 使用express-session
app.use(session({
    secret: 'keyboar cat',
    resave: false,
    saveUninitialized: true
}))

// 登录接口
app.post('/login'，(req, res) => {
    // 账号
    if(req.body.username !== 'admin' || req.body.pwd !== '000000'){
        return res.send({status: 1, msg: '登录失败'})
    }
    // 登录成功存入用户信息
    req.session.user = req.body
    req.session.islogin = true
    req.send({status: 0, msg: '登录成功'})
})

// 退出登录接口
app.get('/loginout', (req, res) => {
    req.session.destroy()
    req.send({
        status: 0,
        msg: '退出登录成功'
    })
})

app.listen(80, () => {
    console.log('http://127.0.0.1')
})

```

#### 7.2 JWT 认证

**session 认证的局限性**

session 认证机制需要配合 Cookie 才能实现，由于 Cookie 默认不支持跨域访问，所有，当涉及到前端请求后端接口的时候,需要做很多额外的配置，才能实现跨域 Session 认证

- 当前请求接口不存在跨域问题的时候，推荐使用 Session 身份认证机制
- 当前端需要跨域请求后端接口的时候，不推荐使用 Session 身份认证机制，推荐使用 JWT 认证机制

**什么是 JWT**

JWT（英文全称：JSON Web Token）是目前最流行的跨域认证解决方案

工作原理：

![image-20220503231514377](https://s1.ax1x.com/2023/07/03/pCraiLQ.png)

**组成部分**

JWT 通常由三部分组成， 分别是 Header(头部), Payload(有效荷载), Signature(签名)三者之间使用英文的’.‘分隔， 格式如下：

> Header.Payload.Signature

![image-20220503233501951](https://s1.ax1x.com/2023/07/03/pCraPsg.png)

- Payload 部分才是真正的用户信息，它是用户信息经过加密之后生成的字符串
- Header 和 Signature 是安全性相关性的部分，只是为了保证 Token 的安全性

客户端收到服务器返回的 JWT 之后，通常会将它储存在`localSorage`或`sessionStorage`中

此后，客户端每次与服务器通信，都要带上这个 JWT 的字符串， 从而进行身份认证，推荐做法是把 JWT 放在 HTTP 请求头的 Authorization,格式如下：

> Authorization: Bearer `<token>`

**在 express 中使用 JWT**

安装包：

> npm install jsonwebtoken express-jwt

- jsonwebtoken 用于生成 JWT 字符串
- express-jwt 用于将 JWT 字符串解析还原成 JSON 对象

```javascript
// 导入用于生成JWT字符串的包
const jwt = requrie('jsonwebtoken')
// 导入用户将客户端发送过来的JWT字符串解析还原成JSON对象的包
const expressJWT = requrie('express-jwt')
```

定义 secret 密钥

```javascript
const secretKey = 'test (da)@_@'
```

生成 jwt 字符串

```javascript
const jwt = require('jsonwebtoken')
/**
 * 生成token字符串
 * 参数1：用户的信息对象
 * 参数2：加密的密钥
 * 参数3：配置对象,可配置token的有效
 */
const tokenStr = jwt.sign({ username: userinfo.username }, secretKey, { expiresIn: '30s' })
```

将 JWT 字符串还原为 JSON 对象

客户端每次在访问那些有权限接口的时候，多需要主动通过请求头中的 Authorization 字段, 将 Token 字符串发送到服务器进行身份验证

此时，服务器可以通过 express-jwt 这个中甲件，自动将客户端发送该国来的 Token 解压还原成 JSON 对象

```javascript
const { expressjwt: expressJWT } = require('express-jwt')
app.use(expressJWT({ secret: secretKey, algorithms: ['HS256'] }).unless({ path: [/^\/api\//] }))
```
