---
lang: zh-CN
title: vue3实现掘金博客文章页
description: vue3实现掘金博客文章页
sidebar: heading
tag: [Vue3, 技术分享]
category: 前端
date: 2023-07-16
---

# vue3 实现掘金博客文章页

## 1.开始

1.安装必要插件

> pnpm install prismjs marked vite-plugin-prismjs front-matter @types/marked @types/prismjs

- `prismjs`:
  - 是一个轻量级、可扩展的语法代码高亮插件
  - 官网：[棱镜 (prismjs.com)](https://prismjs.com/)
- `marked`:
  - 是一个 JavaScript 编写的全功能 Markdown 解析和编译器。 marked 的目的是快速的编译超大块的 Markdown 文本而不必担心结果会出乎意料或者花费很长时间
  - 官网：[标记的文档 (marked.js.org)](https://marked.js.org/)
- `vite-plugin-prismjs`:
  - 快速使用 prismjs 的 vite 插件
  - https://www.npmjs.com/package/vite-plugin-prismjs
- `front-matter`：
  - 用于解析 front-matter 的插件
  - https://www.npmjs.com/package/front-matter
- `@types/prismjs`:prismjs 的 typeScirpt 类型支持
- `@types/marked`:marked 的 typeScript 类型支持

  2.配置 vite.config.js

```typescript
import { fileURLToPath, URL } from 'node:url'
import { prismjsPlugin } from 'vite-plugin-prismjs'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // 使用prismjs插件
    prismjsPlugin({
      languages: 'all',
      // 指定使用的插件（可用插件参考prism的官网)
      plugins: ['line-numbers', 'copy-to-clipboard', 'show-language'],
      theme: 'okaidia',
      css: true,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
```

## 2.思路

总的思路就是：

1.通过接口请求 markdown 文本数据

2.通过**marked 插件将 markdown 内容转换称 HTML，并通过 v-html 渲染上去**

3.通过页面上**查询所有 h 标签，根据他的信息生成相应的目录对象列表**

4.将目录列表渲染到相应位置

5.通过**监听页面滚动的距离是否大于作者组件的高度 + 组件距离顶部的高度 来设置目录是否吸顶**

6.监听页面滚动的距离是否**大于 h 标签距离顶部的距离**来动态设置目录选中

8.点击跳转指定位置,通过**锚点链接的方式**跳转到指定位置

## 3.实现

### 3.1 主页面 App.vue

```vue
<template>
  <div class="main">
    <Article v-model:tocList="tocList"></Article>
    <div class="right">
      <AuthorCard></AuthorCard>
      <!--通过isFixed 来判断是否吸顶-->
      <Catalogue :tocList="tocList" v-model:atctiveId="atctiveId" :class="{ isFixed: isFixed }"></Catalogue>
    </div>
  </div>
</template>

<script setup lang="ts">
import Article from './components/Article.vue'
import AuthorCard from './components/AuthorCard.vue'
import Catalogue from './components/Catalogue.vue'

import { onMounted, ref } from 'vue'

export interface tocType {
  content: string
  id: string
  level: number
  offsetTop: number
}

const tocList = ref<tocType[]>([]) // 目录列表
const atctiveId = ref('heading-1') // 选中标题
const isFixed = ref(false) // 是否吸顶

onMounted(() => {
  // 获取作者榜组件总的高度
  const authorNode = <HTMLElement>document.querySelector('.author-card-main')
  const elDistance = authorNode.offsetHeight + authorNode.offsetTop

  // 监听页面滚动
  window.addEventListener('scroll', function () {
    // 是否开启吸顶
    isFixed.value = window.scrollY >= elDistance

    // 切换目录选中
    for (let i = 0; i < tocList.value.length; i++) {
      if (window.scrollY >= tocList.value[i].offsetTop && window.scrollY <= tocList.value[i + 1].offsetTop) {
        atctiveId.value = tocList.value[i].id
        break
      }
    }
  })
})
</script>

<style scoped>
.main {
  width: 100vw;
  background-color: rgb(242, 243, 245);
  display: flex;
  justify-content: center;
  padding-top: 21px;
}
.right {
  margin-left: 20px;
}
.isFixed {
  position: fixed;
  top: 0;
}
</style>
```

### 3.2 作者组件 AuhtorCard.vue

该组件中没啥操作，全是一些 css 样式，代码太长就不贴 css 了

```vue
<template>
  <div class="author-card-main">
    <div class="author-card">
      <img src="https://p3-passport.byteimg.com/img/user-avatar/3bd57be75cb3eca3387b799a6d4fc0a2~100x100.awebp" alt="" srcset="" class="author-card__icon" />
      <div class="author-card__info">
        <div class="author-card__name">Zaylen</div>
        <div class="author-card__desc">菜鸟</div>
      </div>
    </div>

    <div class="author-botton-row">
      <div class="author-botton author-botton--left">关注</div>
      <div class="author-botton author-botton--right">私信</div>
    </div>

    <div class="related-article">
      <div class="related-article__title">相关文章</div>
      <ul>
        <li class="related-article-item" v-for="item in relatedArticleList">
          <a href="#">
            <div class="related-article-item__title">{{ item.title }}</div>
            <div class="related-article-item__info">
              <span class="">{{ item.give }}点赞</span>
              <span> · </span>
              <span>{{ item.review }}评论</span>
            </div>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
```

### 3.3 文章详情页 Article.vue

```vue
<template>
  <div class="article-main">
    <div v-html="articleCotent"></div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import md from '@/utils/md'
import { resetTitle } from '@/utils/md'
import prism from 'prismjs'
import fm from 'front-matter'
import { nextTick, onMounted, ref } from 'vue'

const articleCotent = ref('')
const emits = defineEmits(['update:tocList'])

onMounted(async () => {
  axios('http://localhost:1337/api/articles/22').then(async (res) => {
    const mdString = res.data.data.attributes.content

    // 先重置id记录
    resetTitle()
    // 解析md文件成html
    articleCotent.value = md.parse(fm(mdString).body)

    // 等待下一次dom 更新, 不等待更新的话由于页面还为渲染获取不到文章标签
    await nextTick()

    prism.highlightAll()
    setTocList()
  })
})

// 读取相应h标签，生成目录列表对象
const setTocList = () => {
  const tocList = Array.from(document.querySelectorAll('h1,h2,h3,h4') as NodeListOf<HTMLElement>).map((item) => {
    return {
      content: item.textContent,
      id: item.id,
      level: Number(item.tagName.replace('H', '')),
      offsetTop: item.offsetTop,
    }
  })
  emits('update:tocList', tocList)
}
</script>

<style scoped>
.article-main {
  width: 820px;
  padding: 32px 32px 0px;
  background-color: #fff;
  border-radius: 4px 4px 0px 0px;
}
</style>
```

### 3.4 目录组件 Catalogue.vue

```vue
<template>
  <div class="catalogue-main">
    <div class="catalogue__title">目录</div>
    <ul class="catalogue__content">
      <!--
			生成目录列表
			根据level生成层级样式
		-->
      <li v-for="item in tocList" class="catalogue__item" :style="{ 'padding-left': item.level * 12 + 'px' }" :class="[atctiveId === item.id ? 'catalogue__item--active' : '']" @click="onActive(item.id)">
        <a :href="'#' + item.id" :class="[atctiveId === item.id ? 'active' : '']">{{ item.content }}</a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { tocType } from '@/App.vue'
const props = defineProps<{ tocList: tocType[]; atctiveId: string }>()
const emits = defineEmits(['update:atctiveId'])

// 点击更新atctiveId, 采用双向绑定的方式
const onActive = (id: string) => {
  emits('update:atctiveId', id)
}
</script>

<style scoped>
.catalogue-main {
  box-sizing: border-box;
  width: 300px;
  margin-top: 20px;
  padding: 16px 20px;
  background-color: #fff;
}
.catalogue__title {
  margin-top: 16px;
  font-size: 16px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgb(241, 242, 245);
}
.catalogue__content {
  margin-top: 20px;
}
.catalogue__item {
  font-size: 14px;
  position: relative;
  display: inline-block;
  padding: 0 8px 4px;
  width: 90%;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.catalogue__item a {
  color: #909090;
}
.catalogue__item a:hover {
  color: rgb(30, 128, 255);
}

.catalogue__item .active {
  color: #1e80ff;
}
.catalogue__item--active::before {
  content: '';
  position: absolute;
  top: -8px;
  left: -20px;
  margin-top: 7px;
  width: 3px;
  height: 14px;
  background: #1e80ff;
  border-radius: 2px;
}
</style>
```

### 工具类 md.ts

```typescript
import { marked } from 'marked'
import prism from 'prismjs'

let headingTitle = 0 // 用于给h标签添加id的记录

export function resetTitle() {
  headingTitle = 0
}

// 设置markdown 解析器的选项
marked.setOptions({
  renderer: new marked.Renderer(),
  pedantic: false,
  headerIds: false,
  gfm: true,
  breaks: false,
  sanitize: false,
  smartypants: false,
  xhtml: false,
  mangle: false,
})

marked.use({
  // 设置代码高亮的模板，整合使用prismjs
  renderer: {
    code(code, lang) {
      if (code && lang) {
        code = prism.highlight(code, prism.languages[lang], lang)
      }
      // 制定自己的代码高亮模板
      return `<pre lang="zh-Hans-CN" data-prismjs-copy="复制代码" data-prismjs-copy-error="按Ctrl+C复制" data-prismjs-copy-success="代码已复制" class="line-numbers"><code class="language-${lang}">${code}</code></pre>`
    },
    // 自定义h标签内容
    heading(text, level) {
      headingTitle++
      return `<h${level} id="heading-${headingTitle}">
                ${text}
              </h${level}>`
    },
  },
})

export default marked
```

## 4.效果

![](https://pic.imgdb.cn/item/64b2d1e41ddac507cc21792e.gif)
