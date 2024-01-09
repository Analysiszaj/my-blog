import { defineUserConfig } from 'vuepress'
import theme from './theme.js'

export default defineUserConfig({
  base: '/',
  locales: {
    '/': {
      lang: 'zh-CN',
      title: 'Zaylenの个人博客',
      description: 'Zaylenの个人博客',
    },
  },
  theme,
})
