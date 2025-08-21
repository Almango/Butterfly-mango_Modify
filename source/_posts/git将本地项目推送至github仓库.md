---
title: 使用Git将本地项目推送至Github仓库
date: 2024-07-21 15:36:23
cover: false
tags:
- Git
categories:                           # 添加分类
- Git
---

> 由于我本人无法将本地项目推送到Github的`main`默认分支，所以这里使用的是`master`分支，当然这个可以在仓库的setting中修改默认分支。
> 我真搞不明白，为什么不能上传到`main`分支，`master`却可以……


## 创建仓库

1 . 首先在github创建一个仓库
2 . 创建仓库后，我们用终端打开项目，随后我们将如下命令逐步输入到终端：（这些命令在刚创建好的仓库中看到）
## 连接仓库
```bash
git init
git add README.md
git commit -m "README(项目说明)"
git branch -M main
git remote add origin [你的仓库地址]
git push -u origin master
```
3 . 在刷新一下仓库的页面，可以看到README.md被生成在仓库中了。

## 上传项目
1 . 随后我们开始上传项目。
2 . 再次逐步输入下列命令：

```bash
git add .
git commit -m "[你的注释]"
git push -u origin
```

![f2c9015fae3020f95039164f915a778c.png](https://s2.loli.net/2024/07/21/xVwlIKUTCNm2FGp.png)

3 . 看到上图所示则说明没什么问题。
4 . 我们回到Github仓库刷新一下也页面，可以看到项目已经被推送到仓库了。

![eb2773650f59dda2b1a4a13ea66f5789.png](https://s2.loli.net/2024/07/21/k1XdxwI658uFbQW.png)

## 更新项目
1 . 如果要更新项目的话，也很简单。我们只需要重新输入以下命令即可

```bash
git add .
git commit -m "[你的注释]"
git push -u origin
```
