---
title: zotero
categories:
  - 环境与工具
  - 工具
tags:
  - 环境与工具
  - 工具
abbrlink: 1784428069
date: 2023-03-21 21:33:04
---


> 前提：科学上网

## 1. 下载与注册账号

[zotero官网](https://www.zotero.org/)

一定要添加 `Chrome` 插件

## 2. 修改首选项

![](image-20230321221811842.png)

### 1. 中文

![](image-20230321221835630.png)

### 2. 引用格式

![](image-20230321222120060.png)


![](image-20230321222610155.png)


![](image-20230321222635927.png)

在文章中引用完成后，需要在参考文献部分列出

![](image-20230321222900985.png)

![](image-20230321223854459.png)
更改参考文献标准：

![](image-20230321223934720.png)

![](image-20230321224059133.png)

至于参考文献样式，可以在首选项中添加。

![](image-20230321224157099.png)

搜索目标样式即可

![](image-20230321224356757.png)

## 3. 修改PDF解析器

![](image-20230321224552192.png)

![](image-20230321224608203.png)

![](image-20230321224631795.png)

将原先的 `[]` 替换为下列内容

```json
{     
	"name":"sci-hub",     
	"method":"GET",     
	"url":"https://sci-hub.st/{doi}",     
	"mode":"html",     
	"selector":"#pdf",     
	"attribute":"src",     
	"automatic":true 
}
```

作用是以 `sci-hub` 为来源导入文献PDF

## 4. 英文文献翻译插件

### 4.1 下载插件

[插件下载地址](https://github.com/windingwind/zotero-pdf-translate/releases)

![](image-20230321225646966.png)

![](image-20230321225728551.png)

### 4.2 从文件导入插件

![](image-20230321231525809.png)



![](image-20230321231448581.png)

![](image-20230321231550179.png)

![](image-20230321231602289.png)

### 4.3 效果如图

![](image-20230321232347047.png)


切换翻译引擎

![](image-20230321232530135.png)


## 5. 中文文献解析

### 5.1 插件获取

[下载地址](https://github.com/l0o0/jasminum/releases)

![](image-20230321233258415.png)

重启一下

### 5.2 修改配置

![](image-20230321233524322.png)

- 此处修改为了后续引用中文文献

### 5.3 更新翻译器

#### a. 更新翻译器配置

![](image-20230321233645536.png)


#### b. 更新本地翻译器

[翻译器下载地址](https://github.com/l0o0/translators_CN)

![](image-20230321235548736.png)

用下载到的中文翻译器脚本替换原装中文网站翻译脚本

$编辑\rightarrow Zotero首选项\rightarrow 高级\rightarrow 打开数据文件夹\rightarrow translators$

复制后替换即可

重启 Zotero，

#### c. 更新浏览器插件

打开知网或者其他网站

![](image-20230321233949384.png)


![](image-20230321234001731.png)

多点击几下，之后重启浏览器。

再打开知网查看是否可以获取到 PDF

