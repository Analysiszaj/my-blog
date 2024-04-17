---
lang: zh-CN
title: git 如何将一个完全不相关的项目推送到远程仓库的一个新分支
description: git 如何将一个完全不相关的项目推送到远程仓库的一个新分支
sidebar: heading
tag: [git, 技术分享]
category: 工程化
isOriginal: true
date: 2024-04-17
---

# git 如何将一个完全不相关的项目推送到远程仓库的一个新分支

## 背景

突然有一个想法，就是想将我之前写过的 demo 项目也放到 github 上，但是想让他创建一个新的分支保存。 以下对其做一个简单的记录.

## 流程

1.先到远程仓库创建一个新的分支

![](https://s21.ax1x.com/2024/04/17/pFz1Bgs.png)

![](https://s21.ax1x.com/2024/04/17/pFz1Dvn.png)

2.然后进入本地的项目

执行初始化 git

> git init

3. 关联远程仓库

> git remote add origin <远程仓库>

4.这时候我们`git barnch` 看一下发现我们本地是没有任何分支的，这时候需要执行一下

> git add .

然后 git 就会创建一个 master 分支, 由于现在内容都只在缓存区，这时候我们就需要将其推送到本地仓库

> git commit -m 备注

这是我们如果直接执行`git push origin master:test-demo`,会出现以下报错，原因是因为 git 不允许合并不关联的分支

![](https://s21.ax1x.com/2024/04/17/pFz1wCQ.png)

可以先将远程分支拉取到本地

> git fetch origin test-demo

然后在本地创建一个新的分支与其相关联

> git checkout -b test-demo origin/test-demo

![](https://s21.ax1x.com/2024/04/17/pFz103j.png)

这时候我们`git branch`观察一下，可以发现本地能看到 test-demo 分支

因为这分支里面有东西，所以我的做法是先将文件全部删除，然后先 push 上去， 再执行合并分支的命令将 master 分支和 test-demo 分支进行合并

> // 直接合并会提示:refusing to merge unrelated histories 需要加 --allow-unrelated-histories
>
> git merge master --allow-unrelated-histories

最后

> git push

即可

![](https://s21.ax1x.com/2024/04/17/pFz1a4g.png)
