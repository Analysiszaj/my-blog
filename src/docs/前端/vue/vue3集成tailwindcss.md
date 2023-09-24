---
lang: zh-CN
title: vue3集成成tailwindcss
description: vue3集成成tailwindcss
sidebar: heading
tag: [Vue3, tailwindcss]
category: 前端
date: 2023-09-24

---

# vue3集成tailwindcss

1.创建vue3工程

> pnpm create vue@latest

2.安装tailwindcss依赖

> pnpm install -D tailwindcss@latest postcss@latest autoprefixer@latest

3.初始化tailwind配置文件

> pnpm tailwindcss init -p

4.在tailwind.config.js文件中配置

```js
module.exports = {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme:{
        extend: []
    },
    plugins:[]
}
```

5.在index.css中引入

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

6.在main.js 中引入

```javascript
import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
```



7.使用 app.vue

```html
<template>
  <div class="w-[120px] h-[40px] flex justify-center items-center text-[red] border-[1px] border-solid border-[red]">
    tailwindcss
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
```

效果：

![pPTjrxP.md.png](https://z1.ax1x.com/2023/09/24/pPTjrxP.md.png)

