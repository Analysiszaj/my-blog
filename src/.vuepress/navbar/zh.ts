import { navbar } from 'vuepress-theme-hope'

export const zhNavbar = navbar([
  '/',
  {
    text: '学习笔记',
    icon: 'edit',
    prefix: '/学习笔记',
    children: [
      {
        text: '前端',
        icon: 'edit',
        prefix: '/前端',
        children: [
          { text: '《javaScript》学习笔记', icon: 'edit', link: '1' },
          { text: '《css》学习笔记', icon: 'edit', link: '2' },
          { text: '《Vue》学习笔记', icon: 'edit', link: '/vue/《vue3》学习笔记' },
          { text: '《TypeScript》学习笔记', icon: 'edit', link: '/typeScript/《TypeScript》学习笔记' },
          { text: '《NodeJS》学习笔记', icon: 'edit', link: '/node/《nodeJS》学习笔记' },
        ],
      },
      {
        text: '后端',
        icon: 'edit',
        prefix: 'after/',
        children: [],
      },
    ],
  },
])
