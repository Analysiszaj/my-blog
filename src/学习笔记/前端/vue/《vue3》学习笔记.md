---
lang: zh-CN
title: vue3学习笔记
description: 学习vue3时的笔记
sidebar: heading
tag: 前端
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
