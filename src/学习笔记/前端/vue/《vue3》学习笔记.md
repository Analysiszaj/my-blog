---
lang: zh-CN
title: vue3学习笔记
description: 学习vue3时的笔记
sidebar: heading
tag: Vue3
category: 前端
date: 2023-07-08
---

# vue3 学习笔记

## 1.bem 架构

**bem 架构**即**Block（块层）**,**element（元素层）**，**modifier（修饰符层）**，是由 Yandex 团队提出的一种 css 命名方法.

> .block-name\_\_element-name--modifier-name--modifier-value {}

遵循以下原则：

- 使用`__`两个下划线将块元素与名称分开
- 使用`--`两个破折号分隔元素名称及修饰符
- 一切样式都是一个类，不能嵌套

以 elementUI 中的组件为例：

<img src="https://s1.ax1x.com/2023/07/08/pCgKy01.png" alt="image-20230702160250584" style="zoom:50%;" />

<img src="https://s1.ax1x.com/2023/07/08/pCgK6Tx.png" alt="image-20230702161254316" style="zoom:50%;" />

### 1.1 使用 Sass 编写 bem 架构

1.安装 sass

> pnpm install sass

2.创建 bem.scss 文件

```scss
$namespace: 'zay' !default;
$block-sel: '-' !default;
$elem-sel: '__' !default;
$mod-sel: '--' !default;

@mixin b($block) {
  $B: #{$namespace + $block-sel + $block};
  .#{$B} {
    @content;
  }
}

@mixin e($el) {
  $select: &;
  @at-root {
    #{$selector + $elem-sel + $el} {
      @content;
    }
  }
}

@mixin m($mod) {
  $selector: &;
  @at-root {
    #{$selector + $mod-sel + $mod} {
      @content;
    }
  }
}
```

3.配置全局使用 在 vite.config.js 中

```typescript
css: {
  preprocessorOptions: {
    scss: {
      additionalData: `@imoprt "./src/bem.scss"`
    }
  }
}
```

4.使用

```vue
<template>
  <div class="zay-block">你好</div>
  <div class="zay-botton zay-botton--primary">
    <div class="zay-botton__content">按钮</div>
  </div>
</template>

<style lang="scss">
@include b(block) {
  color: red;
}

@include b(botton) {
  font-size: 14px;
  width: 40px;
  @include m(primary) {
    background-color: blue;
  }

  @include e(content) {
    color: red;
  }
}
</style>
```

5.效果

<img src="https://s1.ax1x.com/2023/07/08/pCgKsmR.png" alt="image-20230706165343415" style="zoom:50%;" />

## 2.父子组件传参

### 2.1 父传子

可以通过父组件上通过`v-bind`传递值，子组件通过`defineProps`来接收值

**父组件传递值**

```vue
<father :title="name" :selectArr="[112, 32, 43]"></father>
```

**子组件接收值**

- 以对象的方式：

```vue
<script setup>
const prop = defineProps({
  title: {
    type: String,
    default: '默认值',
  },
  selectArr: {
    type: Array,
    default: [],
  },
})
</script>
```

- 以 ts 类型的方式:

```vue
<script setup lang="ts">
const props = defineProps<{ title: String; selectArr: Number[] }>()
</script>
```

如果我们想在以 ts 类型的方式也让属性有默认值的话，需要使用`withDefaults()`

```vue
<script setup lang="ts">
interface Props {
  title: string
  selectArr: number[]
}
withDefaults(defaineProps<Props>(), {
  title: 'aaa',
  selectArr: () => [],
})
</script>
```

### 2.2 子传父

父组件通过绑定事件来接收, 子组件通过`defineEmits`来传递值

**父组件接收值**

```vue
<father @on-click="getName"></father>
<script>
const getName = (name: string) => {
  console.log(name + '------ 我是子组件传递过来的值')
}
</script>
```

**子组件传递值**

```vue
<button @click="setName">提交</button>
<script lang="ts" setup>
const emits = defineEmits(['on-click'])
const setName = () => {
  emits('on-click', 'aaa')
}
</script>
```

- ts 的方式

```vue
<script>
const emits = defineEmits<{
    (e:'on-click', name:string):void
}>()
// 3.3+ 版本中可以使用跟简洁的方式
const emits = defineEmits<{
    'on-click': [name: string]
}>()
</script>
```

**向父组件暴露属性**

子组件通过`defineExpose`暴露属性

```vue
<script lang="ts" setup>
defineExpose({
  name: 'aaaa',
})
</script>
```

父组件组件调用

```vue
<child :ref="waterFall"></child>
<script lang="ts" setup>
const waterFall = ref<InstanceType<typeof child>>()
console.log(waterFall.value?.name) // undefined

// 初始的时候ref 还没有挂载，需要到onMounted 中才能看到值
onMounted(() => {
  console.log(waterFall.value?.name) // aaaa
})
</script>
```

### 2.3 双向绑定

在 vue3 中如果想实现父子组件双向绑定，除了可以使用`v-bind`, 和`emit()`的方式来实现还可以通过一个简写方式:

**父组件 father.vue**

```vue
<Child v-model:bothway="bothway"></Child>
<script>
import { ref } from 'vue'
const bothway = ref < string > '我是默认值'
</script>
```

**子组件 Child.vue**

```vue
<template>
  父组件传给子组件的值：{{ bothway }}
  <button @click="sendBothway">修改双向绑定的值</button>
</template>

<script>
const props = defineProps(['bothway'])
// 数组字面量的方式
const emit = defineEmits(['update:bothway'])

/**
 	ts的方式
 	const emit = defineEmits<{
 	(e: 'update:bothway', value: string):void
 	}>()
 	
 	ts方式简写
 	const emit = defineEmits<{
 		'update:bothway': [value: string]
 	}>()    
    **/

const sendBothway = () => {
  emit('update:bothway', '修改了双向绑定了')
}
</script>
```

### 2.3 瀑布流实现

**父组件 WaterFall.vue**

```vue
<template>
  <div class="water-fall">
    <WaterFallChild :list="list"></WaterFallChild>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import WaterFallChild from './WaterFallChild.vue'

const list = ref<{ height: number; background: string }[]>([])
// 模拟瀑布流图片数据
const colorList = ['red', 'blueviolet', 'black', 'aquamarine', 'brown', 'chartreuse']
const randomNum = 50
for (let i = 0; i < randomNum; i++) {
  const colorIndex = Math.floor(Math.random() * colorList.length)
  const heightNum = Math.ceil(Math.random() * 5) * 100
  list.value.push({ height: heightNum, background: colorList[colorIndex] })
}
</script>

<style scoped lang="scss"></style>
```

**瀑布流组件 WaterFallChild.vue**

```vue
<template>
  <div class="zay-wrap">
    <div
      v-for="item in waterList"
      :style="{
        height: item.height + 'px',
        backgroundColor: item.background,
        left: item.left + 'px',
        top: item.top + 'px',
      }"
      class="zay-wrap__item"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, toRefs, reactive } from 'vue'

const props = defineProps<{ list: any[] }>()
const waterList = reactive<any[]>([])
const heightList: number[] = []

// 构建瀑布流
const init = () => {
  const width = 130
  const x = document.body.clientWidth
  const column = Math.floor(x / width)

  const { list } = toRefs(props)
  for (let i = 0; i < list.value.length; i++) {
    // 先摆放好第一排，构建第一排的高度数组，之后根据这高度数组来往最低的位置放放置新的div
    if (i < column) {
      list.value[i].left = i * width
      list.value[i].top = 20
      waterList.push(list.value[i])
      heightList.push(list.value[i].height + 20)
    } else {
      // 找出最小高度的列，往该位置添加div, 并更新该列的高度
      let current = heightList[0]
      let index = 0
      heightList.forEach((h, i) => {
        if (current > h) {
          current = h
          index = i
        }
      })
      list.value[i].left = index * width
      list.value[i].top = current + 20
      heightList[index] = heightList[index] + list.value[i].height + 20
      waterList.push(list.value[i])
    }
  }
}

onMounted(() => {
  init()
})
</script>

<style scoped lang="scss">
@include b(wrap) {
  position: relative;
  @include e(item) {
    position: absolute;
    width: 120px;
  }
}
</style>
```

效果如下：

![](https://s1.ax1x.com/2023/07/08/pCgQwL9.png)

## 3.组件

### 3.1 局部组件

局部组件就是通过`import xxx from './components/xxx.vue'`导入进来的组件，只能在该组件中生效

使用局部组件

```vue
<template>
  <ComTest></ComTest>
</template>
<script>
import ComTest from './components/ComTest.vue'
</script>
```

### 3.2 全局组件

注册全局组件需要到`main.ts`中通过`app.component()`来注册

```typescript
import xxx from './components/xxx.vue'
app.component('OverAll', xxx)
```

### 3.3 递归组件

递归组件就是自己调用自己的组件,常用做树型列表等场景，

实现一个递归组件：`Tree.vue`

```vue
<template>
  <div class="tree" v-for="(item, key) in treeData" :key="key">
    <input type="checkbox" name="" id="" :checked="item.checked" /> <span>{{ item.name }}</span>
    <Tree v-if="item?.children?.length" :treeData="item.children"></Tree>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue'
const props = defineProps(['treeData'])
const { treeData } = toRefs(props)
</script>

<style scoped>
.tree {
  margin-left: 25px;
}
</style>
```

使用：`App.vue`

```vue
<template>
  <div class="content">
    <Tree :treeData="treeData"></Tree>
  </div>
</template>

<script setup lang="ts">
import Tree from './components/Tree.vue'
import { reactive } from 'vue'
    
interface TreeType {
  name: string
  checked: boolean
  children?: TreeType[]
}

// 模拟树状数组数据
const treeData = reactive<TreeType[]>([
  {
    name: '树1',
    checked: false,
    children: [{ name: '树1-1', checked: false }],
  },
  {
    name: '树2',
    checked: false,
    children: [
      {
        name: '树2-1',
        checked: false,
        children: [
          {
            name: '树2-1-1',
            checked: false,
          },
          {
            name: '树2-1-2',
            checked: false,
          },
        ],
      },
      {
        name: '树2-2',
        checked: false,
      },
    ],
  },
  {
    name: '树3',
    checked: false,
    children: [{ name: '树3-1', checked: false }],
  },
])
</script>

<style scoped>
.content {
  width: 500px;
  margin: 12px auto;
  border: 1px solid black;
}
</style>
```

效果:

![](https://pic.imgdb.cn/item/64ae1f851ddac507ccebecae.png)

### 3.4 修改组件名

在如上案例中，如果们想改组件的名字，就只能改组件文件名,也可以使用再建一个`<script>`的方式

Tree.vue

```vue
<template>
  <div class="tree" v-for="(item, key) in treeData" :key="key">
    <input type="checkbox" name="" id="" :checked="item.checked" /> <span>{{ item.name }}</span>
     <!--这里可以直接使用Test组件名-->
    <Test v-if="item?.children?.length" :treeData="item.children"></Test>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue'
const props = defineProps(['treeData'])
const { treeData } = toRefs(props)
</script>

<script>
// 文件内修改组件名称
export default {
    name: 'Test'
}
</script>

<style scoped>
.tree {
  margin-left: 25px;
}
</style>
```

也可使用插件：[unplugin-vue-define-options](https://www.npmjs.com/package/unplugin-vue-define-options)

插件在`<setup>`中添加了一个函数`defineOptions()`

```vue
<script>
// 直接修改组件名
defineOptions({
  name: 'Foo',
  inheritAttrs: false
})
</script>
```

**在vue3.3+版本中已经支持了该种写法，不需要导入组件**[文档说明](https://cn.vuejs.org/api/sfc-script-setup.html#defineoptions)

我自己也尝试了一种想法，也能实现修改名字的效果,就是通过`import xxx from 'Tree.vue'`也能实现修改组件名的效果， **不建议参考哈，自己的一点小尝试**😂😂😂😂

```vue
<template>
  <div class="tree" v-for="(item, key) in treeData" :key="key">
    <input type="checkbox" name="" id="" :checked="item.checked" /> <span>{{ item.name }}</span>
    <!--也能达到修改组件名的效果-->
    <Test v-if="item?.children?.length" :treeData="item.children"></Test>
  </div>
</template>
<script>
import Test from './Tree.vue'
</script>
```

### 3.5 动态组件

我们可以通过`<component :is="">`来动态绑定组件

DynamicState.vue

```vue
<template>
  <div>
    <div class="zay-botton-list">
      <div v-for="(item, key) in data" :key="key" 
           class="zay-botton" 
           :class="{ 'zay-botton--active': key === active }"
           @click="switchTable(item, key)">
        	{{ item.name }}
      </div>
    </div>
    <Component :is="comId"></Component>
  </div>
</template>

<script setup lang="ts">
import Avue from './A.vue'
import Bvue from './B.vue'
import Cvue from './C.vue'

import { ref, shallowRef, shallowReactive, type Component } from 'vue'
interface dataType {
  name: string
  com: Component
}

// 这里我们需要使用shallowRef 来代理，使其只监听浅层
const comId = shallowRef<Component>(Avue)
const active = ref(0)

const data = shallowReactive<dataType[]>([
  {
    name: 'A组件',
    com: Avue,
  },
  {
    name: 'B组件',
    com: Bvue,
  },
  {
    name: 'C组件',
    com: Cvue,
  },
])

const switchTable = (item: dataType, index: number) => {
  comId.value = item.com
  active.value = index
}
</script>

<style scoped lang="scss">
@include b(botton-list) {
  display: flex;
  margin-top: 20px;
}

@include b(botton) {
  padding: 8px 10px;
  border: 1px solid black;
  margin-right: 10px;
  @include m(active) {
    background-color: aqua;
  }
}
</style>
```

效果：

![](https://pic.imgdb.cn/item/64ae1f851ddac507ccebed10.png)

还可以采用**选项式API**的方式：

```vue
<script>
import Avue from './A.vue'
import Bvue from './B.vue'
import Cvue from './C.vue'

export default {
    conponents: {
        Avue,
        Bvue,
        Cvue
    }
}
</script>
```

使用这种方式，就不需要浅层代理，可以里面直接输入字符串

```javascript
const data = Reactive([
  {
    name: 'A组件',
    com: 'Avue',
  },
  {
    name: 'B组件',
    com: 'Bvue',
  },
  {
    name: 'C组件',
    com: 'Cvue',
  },
])
```



## 4.插槽

### 4.1 匿名插槽

通过子组件放入一个插槽`<slot>`	

```vue
<div>
    <slot></slot>
</div>
```

父组件中使用

```vue
<child>
	<template v-slot>
    	<div>
            插入插槽
        </div>
    </template>
</child>
```

这是父组件中写的`<template slot>`标签包裹的内容，会被替换到子组件中`<slot>`的位置



### 4.2 具名插槽

当我们子组件中有多个插槽的时候，这时候我们怎样确定我插入的那个位置呢，这时候可以使用具命插槽。

子组件

```vue
<div>
    <slot name="header"></slot>
    <slot name="main"></slot>
</div>
```

父组件

```vue
<div>
    <template v-slot="header">
    	<div>
            我是头部
        </div>
    </template>
</div>
```

这时就会被插入到指定的位置



### 4.3 作用域插槽

如果需要在父组件中，需要拿到子组件的值

子组件

```vue
<template>
  <div>
    <div v-for="item in data">
      <slot name="header" :data="item"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const data = reactive([1, 2, 3, 4])
</script>
```

父组件

```vue
<template>
  <div>
    <SlotChild>
      <template v-slot:header="{ data }">{{ data }}</template>
    </SlotChild>
  </div>
</template>

<script setup lang="ts">
import SlotChild from './SlotChild.vue'
</script>
```

通过在父组件的`<template v-slot:header="{data}">`可以将data解构出来,这就是作用域插槽。



