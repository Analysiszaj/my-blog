# vue组件封装

组件的封装首先应该考虑的是易用性，我们在编写组件的时候可以很复杂，但是在使用的时候应该越简单越好（封装只有一次，调用有无数次）

## 1.普通实现

创建一个message弹窗

**messageBox.vue**

```html
<template>
  <div class="modal">
    <div class="box">
      <div class="text">{{ msg }}</div>
      <button @click="emit('click')">关闭</button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  msg: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['click'])
</script>

<style scoped>
.modal {
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: rgb(0, 0, 0, 0.2);
}
.box {
  width: 500px;
  height: 250px;
  background-color: white;
  margin: 200px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
.text {
  text-align: center;
}
</style>
```

**App.vue** 中使用

```html
<template>
  <MessageBox :msg="msg" v-if="isShow" @click="closeMsg"></MessageBox>
  <button @click="openMsg">打开弹窗</button>
</template>

<script setup>
import MessageBox from './components/MessageBox.vue'
import { ref } from 'vue'

const msg = ref('提示框消息')
const isShow = ref(false)

const openMsg = () => {
  isShow.value = true
}

const closeMsg = () => {
  isShow.value = false
}
</script>

<style scoped></style>
```

该种实现方式很明显在使用的时候非常的繁琐

## 2.使用createApp的方式

**app.vue**

