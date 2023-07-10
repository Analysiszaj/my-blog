---
lang: zh-CN
title: TypeScript学习笔记
description: 学习TypeScript时的笔记
sidebar: heading
tag: 前端
category: TypeScript
date: 2023-02-26
---

# TypeScript

## 1.基础

### 1.1 typeScript 是什么？

TypeScript(简称：Ts)是 javaScript 的**超集**,TypeScript = Type + javaScript (在 js 基础之上，为 JS 添加了类型支持)

是微软开发的开源编程语言，可以在任何运行 javaScript 的地方运行

```typescript
// TypeScript 代码：有明确的类型，即：number(数值类型)
let age1: number = 18

// JavaScript 代码： 无明确的类型
let age2 = 18
```

**为什么会有 TypeScript？**

jS 属于动态类型的编程语言，而 TypeScript 属于静态类型的编程语言

静态类型：编译期间做类型检查

动态类型：执行期间做类型检查

对于 js 来说：需要等到代码真正去执行的时候才能发现错误，而 TS 在编译的时候就可以发现错误，在配合 VSCode 等开发工具，TS 可以提前在编写代码的同时就发现代码中的错误，减少找 bug,改 bug 的时间

**TypeScript 的优势**

- 更早发现错误，减少找 bug,改 bug 时间,提高开发效率
- 程序中任何位置的代码都有代码提示,随时随地的安全感，增强了开发体验
- 强大的类型系统提升了代码的可维护性，使得重构代码更加容易
- 支持最新的 ECMAScript 语法，优先体验最新的语法，让你走在前端技术的最前沿
- TS 类型推断机制,不需要在代码中的每个地方都显示标注类型， 让你在享受优势的同时，尽量降低了成本

### 1.2 TypeScript 初体验

1.安装 TypeScript 编译工具

> npm i -g typescript

2.验证是否安装成功

> tsc -v (查看 typeScript 的版本)

node.js/浏览器，只认识 js 代码，不认识 TS 代码,需要先将 Ts 代码转换成 js 代码,然后才能运行， TypeScirpt 包提供 `tsc`命令，实现 TS->js 的转化

![](https://s1.ax1x.com/2023/07/02/pCDeNUs.png)

编写第一个 ts 文件`hello.ts`

```typescript
console.log('Hello ts')
let age: number = 18
console.log(age)
```

编译 ts 文件

> tsc hello.ts

安装 ts-node 包简化

> npm i -g ts-node

版本过高需要安装运行依赖包

> npm i -g tslib @types/node

### 1.3 常用类型

#### 1.3.1 类型注解

> let age: number = 18

`:number`就是类型注解

为变量添加*类型约束*，约定了什么类型，就只能给变量赋值该类型,否则就会报错

#### 1.3.2 常用基础类型

1. JS 已有类型
   - 原始类型：number,string,boolean,null,undefined,symbol
   - 对象类型：ojbect(数组，对象，函数等对象)
2. Ts 新增类型
   - 联合类型， 自定类型， 接口， 元组， 字面量类型， 枚举， void, any 等

**原始数据类型**

这种类型完全按照 js 中的类型的名称来书写

```typescript
let age: number = 18
let myName: string = 'hah'
let isLoading: boolean = false
```

**数组类型**

数组类型的的两种写法：（推荐使用 number[]写法)

```typescript
let numbers: number[] = [1, 2, 5]

let strings: Array<string> = ['a', 'b', 'c']

let booleans: boolean[] = [false, true]

let arr: (number | string)[] = [1, 'a', 3, 'b']
```

`|`在 Ts 中叫做联合类型（由两个或多个其他类型组成的类型，表示可以是这些类型中的任意一种)

**类型别名**

当同一类型被多次使用时，可以通过类型别名，_简化该类型的使用_

```typescript
type CustomArray = (number | string)[]
let arr1: CustomArray = [1, 'a', 3, 'b']
let arr2: CustomArray = ['x', 'y', 6, 7]
```

**函数类型**

函数的类型实际上指的是：函数的参数和返回值的类型

单独指定参数：

```typescript
// 指定参数1为number类型， 参数2为number类型，返回值为number
function add(num1: number, num2: number): number {
  return num1 + num2
}

const add = (num1: number, num2: number): number => {
  return num1 + num2
}
```

同时指定参数

```typescript
const add: (num1: number, num2: number) => number = (num1, num2) => {
  return num1 + num2
}
```

当函数作为表达式时，可以通过类似箭头函数形式的语法来为函数添加类型

注意：这种形式只适用函数表达式

不指定返回值

```typescript
function greet(name: string): void {
  console.log('Hello', name)
}
```

可选参数

在可传可不传的参数名称后面添加？

注意：_可选参数只能出现在参数列表的最后_

```typescript
function mySlice(start?: number, end?:number) :void {
    console.log('起始索引：'start, '结束索引：',end)
}
```

**对象类型**

JS 中的对象由属性和方法构成的，而 TS 中对象的类型就是在描述对象的结构

```typescript
let person: { name: string; age: number; sayHi(): void } = {
  name: 'jack',
  age: 19,
  sayHi() {},
}
```

1.直接使用{}来描述对象结构,属性采用属性名：类型的形式， 方法采用`方法名():返回值类型`的形式

2.如果方法有参数，就在方法名后面的小括号中指定参数类型（比如：`greet(name:string):void`)

3.在一行代码中指定对象的多个属性类型（通过换行来分割多个属性类型），可以去掉；

4.方法的类型也可以使用箭头函数形式（比如：{sayHi:() => void})

对象的属性或方法，也可以是可选的，此时就用到可选属性

```typescript
function myAxios(config: { url: string; method?: string }) {
  console.log(config)
}
```

#### 1.3.3 字面量类型

```typescript
let str1 = 'Hello TS' // string类型
const str2 = 'Hello TS' // Hello TS 类型
```

str1 是变量 let, 他的值可以是任意字符串, 所以类型为：String

st2 是个常量（const), 他的值不能变化只能`Hello TS` 所以，他的类型为：`Hello TS`

除字符串外，任意 JS 字面量（比如，对象，数字等）多可以 作为类型使用

常用来表示一组明确的可选值列表

```typescript
function changeDirection(direction: 'up' | 'down' | 'left' | 'right') {
  console.log(direction)
}
```

#### 1.3.4 枚举类型

枚举的功能类似于字面量类型 + 联合类型组合的功能， 也可以表示一组明确的可选值

```typescript
enum Direction {
  Up,
  Down,
  Left,
  Right,
}

function changeDirection(direction: Direction) {
  console.log(direction)
}

// 通过.语法选取值, 打印的是值的坐标(2)
changeDirection(Direction.Left) // 2
```

枚举成员是有值的, 默认为 0: 从 0 开始的自增的数值

我们可以自己指定成员的值

```typescript
// Down -> 11, left -> 12 （后面自增）
enum Direction {Up = 10， Down, Left, Right}

// 单独指定值
enum Direction {Up = 2, Down =8, Left = 9, Right=12}
```

**字符串枚举**

```typescript
enum Direction {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT',
}
```

字符串枚举没有自增长行为， 因此， 字符串枚举的每个成员必须有初始值

枚举类型会被编译成 JS 代码,类似如下：

```js
var Direction
;(function (Direction) {
  Direction['Up'] = 'UP'
  Direction['Down'] = 'DOWN'
  Direction['Left'] = 'LEFT'
  Direction['Right'] = 'RIGHT'
})(Direction || (Direction = {}))
```

推荐使用字面量 + 联合类型的方式,因为相比枚举, 这种方式更加直观

#### 1.3.5 any

当值为 any 时， 可以对该值进行任何操作, 并且不好有代码提示

```typescript
let obj: any = { x: 0 }
// 比如以以下都不会有任何提示
obj.bar = 100

obj()
```

隐式具有 any 类型的情况：

1.声明变量不提供类型也不提供默认值

2.函数参数不加类型

#### 1.3.6 typeof

在 js 中我们可以调用`typeof`操作符，用来在 js 中获取数据的类型

```typescript
console.log(typeof 'Hello world')
```

TS 也提供了 typeof 操作符:可以在类型上下文中引用变量或属性的类型(类型查询)

```typescript
let p = { x: 1, y: 2 }
function formatPoint(point: { x: number; y: number }) {}

// point的类型即为{x:number; y:number}
function formatPoint2(point: typeof p) {
  console.log(point.x, point.y)
}
```

typeof 只能用来查询变量或属性的类型，无法查询其他形式的类型（比如`函数调用`）

### 1.4 接口

当一个对象被多次使用时， 一般回使用`接口(interface)`来描述对象的类型，达到复用的目的

解释：

    1. 使用`interface`关键字来声明接口

2. 接口名称（比如，此处的 IPerson），可以时任何合法的变量名称
3. 声明接口后，直接使用接口名称作为变量的类型
4. 因为每一行只有一个属性类型，因此，属性类型后面没有；（分号）

```typescript
interface IPerson {
  name: string
  age: number
  sayHi(): void
}

let person: IPerson = {
  name: 'jack',
  age: 19,
  sayHi() {},
}
```

**接口 interface 和 type 类型别名的区别**

相同点：都可以给对象指定类型

不同点：

- 接口，只能为对象指定类型
- 类型别名，不仅可以为对象指定类型，实际上可以为任意类型指定别名

**接口继承**

如果两个接口之间由相同的属性，可以将公共的属性或方法抽离出来，通过继承来实现复用,比如，这两个接口都有 x,y 两个属性，重复写两次，可以但是很繁琐

```typescript
interface Point2D {
  x: number
  y: number
}
interface Point3D {
  x: number
  y: number
  z: number
}
```

更好的方式：

```typescript
interface Point2D {
  x: number
  y: number
}
interface Point3D extends Point2D {
  z: number
}
```

使用`extends`关键字实现了接口继承

### 1.5 元组

在地图中，使用经纬度坐标来标记信息

可以使用数组来记录坐标，那么，该数组只有两个元素，并且这两个元素都是数值类型

```typescript
let position: number[] = [39.5427, 116.2317]
```

使用 number[]的缺点：不够严谨

这时我们可以定义一个元组

```typescript
let position: [number, number] = [39.5427, 116.2317]
```

元组类型可以确切的标记除有多少个元素，以及每个元素的类型

### 1.6 类型推论

Ts 中，某些灭有明确指出类型的地方，TS 的类型推论机制会帮助提供类型

常见的两种常见：1 声明变量并初始化时 2 决定函数返回值时

能省略类型注解的地方就省略(充分利用 TS 类型推论的能力, 提高开发效率)

如果声明变量但是没有立即返回初始值，此时，还必须手动添加类型注解

### 1.7 类型断言

如下例子:

```html
<a href="http://www.baidu.com/" id="link">百度</a>
```

我们想要获取 a 标签的 href 属性

```typescript
const alink: HTMLElement = document.getElementById('link')
console.log(alink.href) // undefined
```

使用`as`关键字实现类型断言

```typescript
const aLink: HTMLAnchorElement = document.getElementById('link') as HTMLAnchorElement
```

或者

```typescript
const aLink = <HTMLAnchorElement>document.getElementById('link')
```

查看标签类型

控制台输入

> cnosole.dir($0)

### 1.8 TypeScript 高级类型

#### 1.8.1 class 类

TYpeScript 全面支持 ES2015 中映入的`class`关键字, 并为其添加了类型注解和其他语法（比如，可见性修饰符）

```typescript
class Person {}
const p = new Person() //类型：Person
```

ts 不仅仅提供了 class 的语法功能，也作为一种类型的存在

创建一个`class`

```typescript
class Person {
  age: number
  gender = '男' // 类型推论：String
}
```

**构造函数**

```typescript
class Person {
  age: number
  gender: string

  constructor(age: number, gender: string) {
    this.age = age
    this.gender = gender
  }
}
```

**实例方法**

```typescript
class Person {
  age: number
  gender: string
  constructor(age: number, gender: string) {
    this.age = age
    this.gender = gender
  }
  // 定义实例方法
  sayHi(): void {
    console.log(this.age, this.gender)
  }
  say2: () => void = () => {
    console.log(this.age, this.gender)
  }
}
```

**类的继承**

在 js 中可以通过`extends`继承父类, 而 typeScirpt 中提供了`implements`

```typescript
//extends 继承
class Animal {
  move() {
    console.log('MOving along!')
  }
}
class Dog extends Animal {
  bark() {
    console.log('汪！')
  }
}
const dog = new Dog()

// ts中的implements 继承（类似java的实现接口， 必须具有接口中的所有属性和方法）
interface Singable {
  sing(): void
}
class Person implements Singable {
  sing() {
    console.log('你是我的小呀小苹果')
  }
}
```

**类成员的可见性**

TS 可以控制 class 的方法或属性对于 class 外的代码是否可见

这些修饰符不能出现在`interface`中, 只能在 class 中

可见性修饰符有：

- public(默认)
- protected （尽在其声明的类和子类中可见）无法调用
- private (只能在类中调用)
- readonly: 表示只读， 用来防止在构造函数之外对属性进行赋值（只能修饰属性，不能修饰方法）,最好指定类型

```typescript
class Animal {
  public move() {
    console.log('Moving alogn')
  }
}

interface IPerson {
  readonly name: string
}

const IPerson1: IPerson = {
  name: 'haha',
}
IPerson1.name = 'dd' // 无法赋值
```

#### 1.8.2 类型兼容性

两种类型系统：

- Structural Type System (结构化类型系统)
- Nominal Type System(标明类型系统)

TS 采用的结构化类型系统，也叫做 Duck typing(鸭子类型), 类型检查关注的是值所具备的形状

对与**对象类型**来说，y 的成员至少与 x 相同，则 x 兼容 y(成员多的可赋值给成员少的)

```typescript
class Point {
  x: number
  y: number
}
class Point2D {
  x: number
  y: number
}
const p: Point = new Point2D()
```

**接口的兼容性**

可对象的兼容性类似

```typescript
interface Point {
  x: number
  y: number
}
interface Point2D {
  x: number
  y: number
}
```

**函数之间的兼容性**

需考虑：参数个数， 参数类型， 返回值类型

参数个数， 参数多的兼容参数少的（参数少的可以赋值给参数多的）

```typescript
type F1 = (a:number) => void
type F2 = (a:number, b:number) => void
lef f1:F1 = (a) => {}
let f2:F2 = f1
```

参数类型， 相同位置的参数类型要相同（原始类型） 或兼容（对象类型）

```typescript
interface Point2D {
  x: number
  y: number
}
interface Point3D {
  x: number
  y: number
  z: number
}
type F2 = (p: Point2D) => void
type F3 = (p: Point3D) => void

// 参数少的可以赋值给参数多的
let ft1: F2 = (x, y) => {}
let ft2: F3 = F2
```

返回值, 只需关注类型本身即可

原始类型要相同

对象类型， 多的赋值给少的

#### 1.9.3 交叉类型

交叉类型（&）：功能类似于接口继承, 用于组合多个类型为一个类型

```typescript
interface Person {
  name: string
}
interface Contact {
  phone: string
}
type PersonDetail = Person & Contact
```

和接口继承的相同点与不同点

```typescript
interface A {
  fn: (value: number) => string
}
interface B extends A {
  fn: (value: string) => string
}
// 报错类型不兼容

interface A {
  fn: (value: number) => string
}
interface B {
  fn: (value: string) => string
}

type c = A & B
// 正常
```

#### 1.9.4 泛型

**泛型** 可以在**保证类型安全**前提下，让函数等**与多种类型一起工作**, 从而实现复用

```typescript
// 创建泛型函数
function id<Type>(value: Type): Type {
  return value
}
const num = id<number>(10)
const str = id<string>('10')
```

**简化泛型函数**

在调用泛型函数时， 可以省略<类型>来简化泛型函数的调用

如上例子我们也可以写成

```typescript
const num = id(10)
```

**泛型 约束**

添加泛型收缩类型，主要有以下两种形式

1.指定更加具体的类型

2.添加约束

```typescript
// 指定更具体的[] 类型
function id<Type>(value: Type[]): Type[] {
  console.log(value.length)
  return value
}

// 添加约束
// 该约束表示：传入的类型必须具有length属性
interface ILength {
  length: number
}

function id<Type extends ILength>(value: Type): Type {
  console.log(value.length)
  return value
}
// 只要传入的具有length属性
id(['a', 'c'])
id('abc')
```

泛型的类型变量可以有多个, 并且**类型变量之间还可以约束**

```typescript
function getProp<Type, Key extends keyof Type>(obj: Type, key: key) {
  return obj[key]
}
let person = { name: 'jack', age: 18 }
getProp(person, 'name')
```

**泛型接口**

接口也可以配合泛型一起来使用,以增加其灵活性, 增强其复用性

```typescript
interface IdFunc<Type>{
    id: (value: Type) => Type
    ids: () => Type[]
}

let obj: IdFunc<number> = {
    id(value){return value}
    ids(){return [1, 2, 3,4]}
}
```

js 中的数组就是一个泛型接口

**泛型类**

class 也可以配合泛型来使用

比如, React 的 class 组件的基类 Component 就是泛型类, 不同的嘴贱有不同的 props 和 state

```typescript
interface IState {
  count: number
}
interface IProps {
  maxLength: number
}

class InputCount extends React.Component<IProps, IState> {
  state: IState = {
    count: 0,
  }
  render() {
    return <div>{this.props.maxLength}</div>
  }
}
```

创建泛型类

```typescript
class GenericNumber<NumType> {
  defaultValue: NumType
  add: (x: NumType, y: NumType) => NumType
}
```

**泛型工具类**

- `Partial<Type>`

  - 用来构造创建一个类型,将 Type 的所有属性设置为可选

  ```typescript
  interface Props {
    id: string
    children: number[]
  }

  type PartialProps = Partial<Props>
  let temp1: PartialProps = {
    children: [1, 2, 3, 4],
  }
  ```

- `Readonly<Type>`

  - 将 Type 的所有属性设置为 readonly(只读)

- `Pick<Type, Keys>`

  - 从 Type 中选择一组属性来构造新的类型

  ```typescript
  interface Props {
    id: string
    title: string
    children: number[]
  }

  type PickProps = Pick<Props, 'id' | 'title'>
  ```

- Record<Keys, Type>

  - 构建一个对象类型, 属性键为 Keys, 属性的类型为 Type\

  ```typescript
  type RecordObj = Record<'a' | 'b' | 'c', string>
  let obj: RecordObj = {
    a: ['1'],
    b: ['2'],
    c: ['3'],
  }
  ```

#### 1.9.5 索引签名类型

绝大多数情况下,我们都可以在使用对象前就确定兑对象的结构, 并为对象添加准确的类型

当无法确定对象中有哪些属性,此时就可以用到索引签名类型

```typescript
interface AnyObject {
  [key: string]: number
}

let obj: AnyObject = {
  a: 1,
  b: 2,
}
```

#### 1.9.6 映射类型

基于旧类型创建新类型(对象类型), 减少重复, 提升开发效率

```typescript
// 根据联合类型创建
// 写法1
type PropKeys = 'x' | 'y' | 'z'
type Type1 = { x: number; y: number; z: number }

// 映射类型写法
type PropKeys = 'x' | 'y' | 'z'
type Type2 = { [Key in PropKeys]: number }

// 根据对象类型创建
type Props = { a: number; b: string; c: boolean }
type Type3 = { [key in keyof Props]: number }
```

映射类型只能在类型别名中使用, 不能再接口中使用

**partial 原理**

```typescript
type myPartial<T> = {
  [key in keyof T]?: T[key]
}
let pT2: myPartial<test> = { id: 32 }
```

**索引查询**

`T[P]`语法，再 TS 中叫做索引查询类型,用来查询属性的类型

[]中的属性必须存在于被查询类型中

```typescript
type Props = { a: number; b: string; c: boolean }
type TypeA = Props['a']
```

t 同时查询多个索引类型（会帮你自动去重）

```typescript
type Props = { a: number; b: string; c: boolean }
type TypeA = Props['a' | 'b'] // number | string

// 使用keyof
type TypeA = Props[keyof Props]
```

### 1.9 TypeScript 类型声明文件

类型声明文件：用来为已存在的 js 库提供类型信息

ts 中的两种文件类型：**1.ts 文件**， **2.d.ts 文件**

- **.ts 文件**
  - 既包含类型信息又可执行代码
  - 可以被编译为.js 文件，然后执行代码
  - 用途：编写程序代码的地方
- **.d.ts 文件**
  - 只包含类型信息的类型声明文件
  - 不会生成.js 文件，仅用于提供类型信息
  - 用途：为 js 提供类型信息

**.ts** 是代码实现文件, **.d.ts**是 declaraction(类型声明文件)

**使用已有类型声明文件**:

1.内置类型声明文件:TS 为 JS 运行时可用的所有标准化内置 API 都提供了声明文件

2.第三方库的类型声明文件

1.库自带类型声明文件如：Axios

![](https://s1.ax1x.com/2023/07/02/pCDeU5n.png)

2.由 DefinitelyTyped 提供

DefinitelyTyped 是一个高质量 ts 类型声明库

可用通过 npm/yarn 来下载该仓库提供的 ts 类型声明包, 这些包的名称格式为：@types/\*

在实际项目开发时，如果你使用的第三方库没有自带的声明文件, VSCode 会给出明确的提示

![](https://s1.ax1x.com/2023/07/02/pCDew80.png)

**创建自己的类型声明文件**

1.项目内共享类型

- 如果多个.ts 文件都用到同一个类型，此时可用创建**index.d.ts** 文件提供该类型, 实现类型共享
- 2.为已有 JS 文件提供类型声明

常用在以下两种场景：

在将 JS 项目迁移到 TS 项目时， 为了让已有的.js 文件由类型声明

成为库作者，创建库给其他人使用

_类型声明文件的编写于模块化开发方式相关_，不同的模块化方式有不同的写法,JS 模块化的发展经理过多种变化（AMD, CommonJS, UMD, ESModule)， 而 TS 支持各种模块化形式的类型声明， 这就导致,类型声明文件相关内容又多又杂

基于最新 ESModule(import/exprot)来为已有.js 文件，创建类型声明文件

使用 webpack 搭建, 通过 ts-loader 处理.ts 文件

**为已有的.js 文件**

declare 关键字： 用于类型声明文件, 为其他地方已存在的变量声明类型, 而不是创建一个新的变量

1.对于 type, interface 等这些明确的就是 TS 类型的， 可以省略 declare 关键字

2.对于 let, function 等具有双重含义（在 js, TS 中多能用）， 应该使用 declare 关键字,明确指定此处用于类型声明

## 2. React 使用 TypeScript

常见步骤如下：

1.使用 CRA 创建支持 TS 的项目

2.TS 配置文件 tsconfig.json

3.Recat 中的常用类型

### 2.1 使用 CRA

CRA 是脚手架工具 create-react-app（简称：CRA)默认支持 TypeScript

创建支持 TS 的项目命令：`npx create-react-app 项目名 --template 模板名`

![](https://s1.ax1x.com/2023/07/02/pCDeJbQ.png)

相对于非 TS 项目， 目录结构主要由以下三个变化

1.项目根目录中增加了 tsconfig.json 配置文件：指定 TS 的编译选项

2.React 组件的文件扩展名：\*.tsx

3.src 目录中增加了 react-app-env.d.ts: React 项目默认的类型声明文件

**三斜线指令**:指定依赖的其他类型声明文件, types 表示依赖的类型声明文件包的名称

![](https://s1.ax1x.com/2023/07/02/pCDetEj.png)

react-scripts 的类型声明文件包含两部分类型：

1.react, react-dom, node 的类型

2.图片， 样式等模块的类型， 以运行在代码中导入图片，SVG 等文件

### 2.2 TS 配置文件 tsconfig.json

**tsconfig.json**：项目文件和项目编译所需的配置项

```json
{
  // 编译选项
  "compilerOptions": {
    // 生成代码的版本
    "target": "es5",
    //
    "lib": ["dom", "dom.iterable", "esnext"],
    // 允许ts编译器编译js文件
    "allowJs": true,
    // 跳过声明文件的类型检查
    "skipLibCheck": true,
    //es 模块互操作，屏蔽ESmodule和CommonJS之间的差异
    "esModuleInterop": true,
    // 允许通过import x from 'y' 即使模块没有显示指定default导出
    "allowSyntheticDefaultImports": true,
    // 开启严格模式
    "strict": true,
    // 对文件名称强制区分大小写
    "forceConsistentCasingInFileNames": true,
    // 为switch 语句启用错误报告
    "noFallthroughCasesInSwitch": true,
    // 生成代码的模块化标准
    "module": "esnext",
    // 模块解析（查找）策略
    "moduleResolution": "node",
    //
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  // 指定允许ts处理的目录
  "include": ["src"]
}
```

除了在 tsconfig.json 文件中使用编译配置外，**还可以通过命令行来使用**

使用`tsc hello.ts --target es6`

tsc 后如果带有**输入文件名时**,将忽略 tsconfig.json 文件

### 2.3 React 中的常用类型

推荐学习网站：https://react-typescript-cheatsheet.netlify.app/docs/basic/setup

react 是组件化开发模式, React 开发主要任务就是写组件, 两种组件：**1 函数组件** **2class 组件**

#### 2.3.1 函数组件

- 组件的类型
- 组件的属性
- 组件属性的默认值
- 事件绑定和事件对象

定义一个函数组件

```react
import { FC } from 'react'
import ReactDOM from 'react-dom'
type Props = { name: string; age?: number }

// const Hello: FC<Props> = (prop: Props) => (
//   <div>
//     你好， 我叫：{prop.name}， 我：{prop.age}岁了
//   </div>
// )

// 简化
const Hello = ({ name, age }: Props) => (
  <div>
    你好,我叫：{name}, 我{age}岁了
  </div>
)

const App = () => (
  <div>
    <Hello name="jack" age={16} />
  </div>
)

ReactDOM.render(<App />, document.getElementById('root'))
```

给组件添加默认值

```typescript
// 默认属性
Hello.defaultProps = {
  age: 18,
}
// 也可以简化成直接写在函数上面
```

**事件绑定和事件对象**

```typescript
const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  console.log('赞！', e.currentTarget)
}
const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  console.log(e.target.value)
}

const App = () => (
	 <input onChange={onChange} />
    <button onClick={onClick}>点赞</button>
)
reactDOM.render(<App />, document.getEleemntById('root'))
```

### 2.3.2 class 组件

**class 组件的类型**

```typescript
type State = { count: number }
type Props = { message?: string }

class C1 extends React.Component {} // 无props, state
class C2 extends React.Component<Props> {} // 有props, 无state
class C3 extends React.Component<{}, State> {} // 无props, 有state
class C4 extends React.Component<Props, State> {} // 有props, state
```

**class 组件的属性和默认值**

```typescript
type Porps = { name: string; age?: number }
class Hello2 extends React.Component<Props> {
  // 默认值
  static defaultProps: Partial<Porps> = {
    age: 18,
  }

  render() {
    // 也可以直接 age = 18 添加默认值
    const { name, age } = this.props
    return <div>你好，啦啦啦</div>
  }
}
```

**class 组件状态（state)和事件**

```typescript
type State = { count: number }
class Counter extends React.Component<{}, State> {
  state: State = {
    count: 0,
  }

  handleClick = () => {
    this.setState({
      count: this.state.count + 1,
    })
  }

  render() {
    // 也可以直接 age = 18 添加默认值
    const { name, age } = this.props
    return (
      <div>
        你好，啦啦啦 计数器：{this.state.count}
        <button onClick={this.handleClick}>+1</button>
      </div>
    )
  }
}
```

## 3. 最终案例
