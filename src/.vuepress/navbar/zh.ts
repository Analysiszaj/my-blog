import { navbar } from 'vuepress-theme-hope'

export const zhNavbar = navbar([
  '/',
  {
    text: '随笔',
    icon: 'edit',
    prefix: '/zh/posts/',
    children: [
      {
        text: '苹果',
        icon: 'edit',
        prefix: 'apple/',
        children: [
          { text: '苹果1', icon: 'edit', link: '1' },
          { text: '苹果2', icon: 'edit', link: '2' },
        ],
      },
      {
        text: '香蕉',
        icon: 'edit',
        prefix: 'banana/',
        children: [
          {
            text: '香蕉 1',
            icon: 'edit',
            link: '1',
          },
          {
            text: '香蕉 2',
            icon: 'edit',
            link: '2',
          },
        ],
      },
    ],
  },
  {
    text: '学习笔记',
    icon: 'edit',
    prefix: 'demo/',
    children: [
      {
        text: '前端',
        icon: 'edit',
        prefix: 'front/',
        children: [
          { text: '《javaScript》学习笔记', icon: 'edit', link: '1' },
          { text: '《css》学习笔记', icon: 'edit', link: '2' },
          { text: '《Vue》学习笔记', icon: 'edit', link: 'vue/page.html' },
          { text: '《TypeScript》学习笔记', icon: 'edit', link: '2' },
        ],
      },
      {
        text: '后端',
        icon: 'edit',
        prefix: 'after/',
        children: [
          { text: '苹果1', icon: 'edit', link: '1' },
          { text: '苹果2', icon: 'edit', link: '2' },
        ],
      },
    ],
  },
])
