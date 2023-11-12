---
lang: zh-CN
title: nestJs学习笔记
description: 学习nestJs时的笔记
sidebar: heading
tag: [Nodejs, nestJs]
category: 前端
date: 2023-11-12
---

## 1.什么是 Nestjs

Nestjs 是一个用于构建高效可扩展的一个基于 nodejs 的服务端应用程序开发框架（写后台的）

特点：

- 完全支持 typeScript
- 结合了 AOP 面向切面的编程方式
- 封装了 Express/Fastify，使得开发者可以自由的使用适用于底层平台的无数的第三方模块

## 2.控制反转-依赖注入

**IOC**

Inversion of Control 控制反转，是高层模块不应该依赖底层模块，二者都应该依赖其抽象，抽象不应该依赖细节，细节应该依赖抽象

**DI**

依赖注入（Dependency Injection）参考：[依赖注入是什么？如何使用他？](https://www.freecodecamp.org/chinese/news/a-quick-intro-to-dependency-injection-what-it-is-and-when-to-use-it/)

**不使用控制反正和依赖注入创建一个类**

```typescript
class A {
    name: string
    constructor {
        this.name = 'aaa'
    }
}

class B {
    a: any
    constructor {
        this.a = new A().name
    }
}
class C {
    a: any
    constructor() {
        this.a = new A().name
    }
}
```

现在如果我修改了 a 类为：

```typescript
class A {
  name: string
  constructor(name) {
    this.name = name
  }
}
```

B 类和 C 类都需要修改

```typescript
class B {
	a:any
	constructor {
		this.a = new A('aaa').name
	}
}
......
```

这时 B 类和 C 类是强耦合的关系，在创建 B 类或者 C 类时,必须要有 A 类

**使用控制反转依赖注入的方式创建**

```typescript
class A {
    name: string
    constructor(name) {
        this.name = name
    }
}
class B {
    name: string
    constructor {
        this.name = 'heheheh'
    }
}

// 创建一个调度器
class COntainer {
    mo: any
    constructor(){
        this.mo = {}
    }

    provide(key: string, mo:any) {
        this.mo[key] = mo
    }
    get(key: string){
        return this.mo[key]
    }
}

const mo = new Container()
mo.provide('a', new A('hahahah'))
mo.provide('b', new B())

class C {
    a:any
    b:any
    constructor (mo: Container){
        this.a = mo.get('a')
        this.b = mo.get('b')
    }
}
```

这时我们的 C 类创建就不需要依赖与 A 类和 B 类, 而是通过调度器，来注入想要的类

## 3.装饰器

装饰器可以让我们在不破坏类的内部结构的情况下给类添加一些新的东西

在 ts 中使用需要将 `"experimentalDecorators": true`

**类装饰器**

```typescript
const doc: ClassDecorator = (target: any) => {
  console.log(target)
}

@doc
class Zhouaj {
  constructor() {}
}

const Zhouaj: any = new Zhouaj()
// 打印[class Zhouaj]
```

其实就相当于把 Zhouaj 这个类当成参数传入 doc 中

**属性装饰器**

```typescript
// 属性装饰器
const paramDoc: PropertyDecorator = (target: any, propertKey: string | symbol) => {
  console.log(target, propertKey)
}

class Zhouaj2 {
  @paramDoc
  public name: string
  @paramDoc
  public age: number
  constructor() {
    this.name = 'aa'
    this.age = 123
  }
}
// 打印 {} name, {} age （原始对象和他的属性)
```

**方法装饰器**

```typescript
const methodDoc: MethodDecorator = (target: any, propertKey: string | symbol, descriptor: any) => {
  console.log(target, propertKey, descriptor)
}

class Zhouaj3 {
  public name: string
  constructor() {
    this.name = 'aa'
  }

  @methodDoc
  getName() {
    return this.name
  }
}
/*原始对象  函数名称  描述符
{} getName {
  value: [Function: getName], 原始对象
  writable: true, 可写的
  enumerable: false,  可枚举的
  configurable: true   可配置的
}
*/
```

**参数装饰器**

```typescript
const csDoc: ParameterDecorator = (target: any, key: string | symbol | undefined, index: number) => {
  console.log(target, key, index)
}

class Zhouaj4 {
  constructor() {}

  setName(@csDoc name: string) {}
}

// 打印{} （原始对象） setName(方法名) 0（参数位置）
```

#### 3.1 使用装饰器实现一个 get 请求

```typescript
import axios from 'axios'

const Get = (url:string)=>{
    return (target, key, descriptor)=>{
        const fnc = descriptor.value
        axios.get(url)
        .then(res=>{
            fnc(res, {
                status: 200,
                success: true,
            })
        })
        .catch(e => {
            fnc(e, {
                status: 500,
                success: false
            })
        })
    }
}

class Controller(){
    constructor(){

    }

  @Get('https://api.apiopen.top/api/getHaoKanVideo?page=0&size=10')
  getList(res: any, status: any) {
    console.log(res.data.result.list, status)
  }
}
```
