# 关于vue tempalate 中由于style 标签上的scoped 属性导致iview modal自定义样式不生效的解决方法

### 场景

在vue组件中，我们使用 `<style scoped>`的方式可让样式只在局部生效， 这样可以防止由于重复类名而造成的样式污染

但是我们在组件中使用iview 的modal 框时，发现modal 框里的元素设置的class 全部都不生效。

### 原因

vue `<style scoped>`设置样式的原理就是编译完成后给改组件设置了一自定义属性，然后给该组件下`<style scoped>`内的选择器变成属性选择器.

```html
<template>
	<div class="box"></div>
</template>

<style scoped>
.box {
	color: red;
}
</style>
```
转换结果：
```html
<template>
	<div class="box" data-v-f3f3eg9></div>
</template>

<style scoped>
.box[data-v-f3f3eg9]{
	color: red;
}
</style>
```

但是iview的弹出框组件`<modal>`渲染在页面上面的时候并不是在该组件下，而是单独在body 里面添加了一个结点。
