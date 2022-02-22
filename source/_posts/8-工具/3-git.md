---
title: git
date: ‎2021‎-01‎-‎25‏‎ 10:40:29
top: 3
categories:
-	工具
tags:
-	工具
-	git
---

>   git的原理及使用
>
>   [【尚硅谷】Git与GitHub基础全套完整版教程（快速上手，一套搞定）_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1pW411A7a5?from=search&seid=6662384508146079512&spm_id_from=333.337.0.0)

<!--more-->

# 版本控制工具

##  应具备的功能

-   数据备份
-   版本管理
    -   SVN增量式：只保存修改部分
    -   git 快照流：每个文件的每次修改都会保存
-   权限控制
-   分支管理——git特有
-   协同修改

### 分类

>   集中式版本控制——SVN

<img src="../../../../AuspiceTian-v1/6-随笔/1-工具/git&amp;github.assets/image-20210125151928336.png" style="zoom:50%;" />

-   原始文件与修改都保存在服务器

>   分布式版本控制——git

<img src="../../../../AuspiceTian-v1/6-随笔/1-工具/git&amp;github.assets/image-20210125152243538.png" style="zoom:50%;" />

-   原始文件与版本信息在每台主机上都有保存

<div style="page-break-after:always"></div>

## git结构

#### git 本地库

<img src="../../../../AuspiceTian-v1/6-随笔/1-工具/git&amp;github.assets/image-20210125164601165.png" style="zoom:50%;" />

#### git 远程库——代码托管中心

>    通过远程库实现团队内协作

<img src="../../../../AuspiceTian-v1/6-随笔/1-工具/git&amp;github.assets/image-20210125165012272.png" alt="image-20210125165012272" style="zoom:50%;" />

>    通过远程库实现跨团队协作

<img src="../../../../AuspiceTian-v1/6-随笔/1-工具/git&amp;github.assets/image-20210125165215216.png" style="zoom:50%;" />

<div style="page-break-after:always"></div>

## git命令行操作

>   查看git 版本

```shell
git --version
```

![image-20210129162300984](3-git/image-20210129162300984.png)

### 本地库操作

#### 初始化与配置

##### 新建仓库

![](3-git/image-20210125165946283.png)

![](3-git/image-20210125170121925.png)

##### 查看配置——git config [--global] --list

##### 删除配置信息——git config [--global] --unset user.email

##### 设置签名

>   为当前本地库配置签名

![](3-git/image-20210125172343898.png)

-   user.name
-   user.email
-   信息保存位置：./git/config

>   系统用户级别

![](3-git/image-20210125172724260.png)

-   --global：为OS本用户的所有本地库设置签名

>   优先级

-   就近原则：项目优先级 > 系统优先级

#### 基本操作

| 未同步的文件所在两区 | 未同步文件的颜色 |
| -------------------- | ---------------- |
| 工作区-暂存区        | 红色             |
| 暂存区-本地库        | 绿色             |

-   只有暂存区中有的文件才能提交到本地库

##### 状态查看——git status

![](3-git/image-20210125174042436.png)

![image-20210125174847738](3-git/image-20210125174847738.png)

##### 添加到暂存区——git add

![image-20210125174530113](3-git/image-20210125174530113.png)

![image-20210125175119447](3-git/image-20210125175119447.png)

>   git add -A <=> git add .

-   将工作区内的所有文件添加到暂存区

![image-20210126175146172](3-git/image-20210126175146172.png)

##### 添加到本地库——git commit

>    初次提交

![image-20210125183103345](3-git/image-20210125183103345.png)

>   修改后提交

![image-20210125191725861](3-git/image-20210125191725861.png)

-   -a：工作区->暂存区->本地库
    -   跳过git add

![image-20210125192124124](3-git/image-20210125192124124.png)

-   -m：命令行加注释提交，不进vim

![image-20210125192217102](3-git/image-20210125192217102.png)

>   修改注释——git commit --amend

将暂存区中的文件重新提交，相当于改注释

##### 从本地库，暂存区移除——git rm

![image-20210125193625757](3-git/image-20210125193625757.png)

区别工作区删除

![image-20210126091201699](3-git/image-20210126091201699.png)

![image-20210126091649581](3-git/image-20210126091649581.png)

##### 版本前进或后退——git reset

###### --soft

![image-20210125222242992](3-git/image-20210125222242992.png)

-   只修改本地库

![image-20210125222140469](3-git/image-20210125222140469.png)

###### --mixed

![image-20210125222709382](3-git/image-20210125222709382.png)

-   本地库移动HEAD指针
-   重置暂存区

![image-20210125222601881](3-git/image-20210125222601881.png)

###### --hard

![image-20210125215338100](3-git/image-20210125215338100.png)

>    索引值

![image-20210125215557795](3-git/image-20210125215557795.png)

**修改HEAD指针的指向**

以HEAD指针为起点，回退

>   ^

![image-20210125220014181](3-git/image-20210125220014181.png)

>   ~n

![image-20210125220738744](3-git/image-20210125220738744.png)

-   以HEAD指针为起点，回退n个版本

##### 查看可追踪的版本记录——git log

多屏显示

​	空格：向下翻页

​	b：向上翻页

​	q：退出

![image-20210125192914711](3-git/image-20210125192914711.png)

-   只显示到有指针指向的最新版本

>   --prety=oneline：简化查看版本信息

![image-20210125194245074](3-git/image-20210125194245074.png)

>   --oneline ：简化hash查看版本信息

![image-20210125194425172](3-git/image-20210125194425172.png)

>   git log --oneline --decorate --graph --all

查看可追踪的所有分支的所有版本信息

<img src="../../../../AuspiceTian-v1/6-随笔/1-工具/git&amp;github.assets/image-20210128190954789.png" alt="image-20210128190954789" style="zoom:50%;" />

>   git config (--global) alias.[别名] "[命令]"

![image-20210128193059088](3-git/image-20210128193059088.png)

##### 查看所有版本信息——git reflog

![image-20210125200238645](3-git/image-20210125200238645.png)

##### 比较文件差异——git diff

>   git diff [文件名]

将工作区中的文件与暂存区进行比较

![image-20210126095426453](3-git/image-20210126095426453.png)

>    git diff [本地库历史版本] [文件名]

将工作区中文件和本地库历史记录比较  

![image-20210126100005445](3-git/image-20210126100005445.png)

>   git diff

多个文件比较

![image-20210126100513815](3-git/image-20210126100513815.png)

#### 分支管理

![image-20210126102038282](3-git/image-20210126102038282.png)

##### 查看分支的最新状态——git branch -v

![image-20210126103024040](3-git/image-20210126103024040.png)

#####  新建分支——git branch [分支名]

![image-20210126103223877](3-git/image-20210126103223877.png)

###### 删除分支——git branch [参数] [分支名]

>   -d

删除以提交过的分支

>   -D

强制删除分支

##### 切换分支——git checkout [分支名]

![image-20210126103323791](3-git/image-20210126103323791.png)

>    -b [分支名]

新建分支并切换到新分支

**移动HEAD指针，指向分支名指向的版本**

>   会将工作区中的内容重置

若 [原分支] 有未提交的文件，则会将未提交文件带回 [新分支]

**checkout** 前，一定要提交 **git status** 确定没有未提交文件

###### 跟踪分支

>    git checkout -b [branch] [remotename]/[branch]

创建新的分支[branch]与远程跟踪分支 [remotename]/[branch] 同步

>   git checkout --track origin/serverfix

创建与远程跟踪分支同名的本地分支

>   git branch -u [branch] origin/serverfix

将本地分支与远程跟踪分支同步

##### 合并分支——git merge [被合并的分支名]

![image-20210126104444903](3-git/image-20210126104444903.png)

###### 冲突处理

![image-20210126105403505](3-git/image-20210126105403505.png)

![image-20210126105843490](3-git/image-20210126105843490.png)

![image-20210126110037393](3-git/image-20210126110037393.png)

![image-20210126110132830](3-git/image-20210126110132830.png)

![image-20210126110529012](3-git/image-20210126110529012.png)

![image-20210126110545261](3-git/image-20210126110545261.png)

###### git 存储——git stash

>   将未提交的修改保存到栈内，切换分支

>   git stash list:查看存储

>   git stash pop：应用存储，并删除

1.  git stash apply [stash@{2}]
    -   将栈顶的文件引用

2.  git stash drop [stash@{2}]
    -   移除存储



##### 分支工作流

<img src="../../../../AuspiceTian-v1/6-随笔/1-工具/git&amp;github.assets/image-20210129193239370.png" alt="image-20210129193239370" style="zoom:50%;" />

-   master为线上分支
-   develop为本地主分支
-   topic为本地就某一模块的开发的分支
-   develop开发完成后，合并回线上的master分支

### 远程库操作

#### 查看远程库配置——git remote -v

![image-20210126164812876](3-git/image-20210126164812876.png)

#### 新增远程库——git remote add [远程库别名] [远程库URL]

![image-20210126164812876](3-git/image-20210126164812876.png)

#### 向远程库推送——git push [远程库名] [远程分支名]

![image-20210126165756116](3-git/image-20210126165756116.png)

#### 克隆远程库——git clone [远程库]

![image-20210126171559479](3-git/image-20210126171559479.png)

#### 将远程库同步到本地库——git pull [远程库] [远程分支名]

![image-20210126174035908](3-git/image-20210126174035908.png)

-   本地分支
-   远程分支
    -   远程库的分支
-   远程跟踪分支
    -   在本地的远程同步分支

##### 1. 从远程库抓取——git fetch [远程库] [远程分支]

![image-20210126172858157](3-git/image-20210126172858157.png)

##### 2. 合并远程库——git merge [远程跟踪分支]

![image-20210126173051677](3-git/image-20210126173051677.png)

#### 团队外协作

![image-20210126171932198](3-git/image-20210126171932198.png)

<div style="page-break-after:always"></div>

## git实现机制

### 哈希算法&生成 `blob`

-   哈希算法确定、输入数据不变，hash值确定
-   同一哈希算法，得到的加密结果长度固定
-   git 底层采用SHA-1算法

>   git hash-object -w [文件路径]|--stdin

对文件内容进行运算，得到hash值

![image-20210127192558574](3-git/image-20210127192558574.png)

-   -w：将数据对象存入本地库
    -   [文件路径]：将文件路径指定的文件内容转化为 `blob` 写入本地库
    -   --stdin：将标准输入的文件内容进行哈希运算

>   git cat-file

-   -p：将hash值转化为文件内容

![image-20210127193934112](3-git/image-20210127193934112.png)

-   -t：输出hash值对应的git对象类型

![image-20210127194141872](3-git/image-20210127194141872.png)

### git版本生成机制

>   SVN版本控制——增量式

![image-20210126145423522](3-git/image-20210126145423522.png)

>   git 版本控制——快照流

![image-20210126145718883](3-git/image-20210126145718883.png)

>   快照：同一文件的不同版本

-   有修改文件：生成快照
-   无修改文件：只保留一个链接指向之前存储的文件

#### 对象&底层命令

![image-20210126152735402](3-git/image-20210126152735402.png)

##### 数据对象——`blob`

-   每个文件的每次修改都会生成一个数据对象——`blob`
-   **解决文件内容的存储问题**

##### 目录树对象——`tree`

>    将暂存区中的数据对象以树的形式存储

-   **解决文件内容与文件名的映射关系**

>    **git commit** 时，才将暂存区中的数据对象构建为 `tree`——项目commit时的快照

>   git update-index [参数] [文件模式] [`blob`] [文件名]：将数据对象存入暂存区

-   --add：该文件第一次提交需要带的参数
-   --cacheInfo：将已在本地库的数据对象添加到暂存区
-   [文件模式]
    -   100644，表明这是一个普通文件
    -   100755，表示一个可执行文件
    -   120000，表示一个符号链接  

>   git read-tree [参数]：将 `tree` 读入暂存区

-   --prefix=bak [父`tree` 的hash]
    -   指明父 `tree` 的hash

![image-20210129190706880](3-git/image-20210129190706880.png)

![image-20210129190725971](3-git/image-20210129190725971.png)

-   lib：保存子`tree` 的目录

>   git write tree

将暂存区中的 `blob` 生成 `tree`

>    git ls-files -s：查看暂存区中内容

![image-20210127214226014](3-git/image-20210127214226014.png)

##### 提交对象——`commit`

>   git commit-tree [`tree`的hash] -p [父`tree`的hash]

>   提交对象形成版本链

![image-20210126152953452](3-git/image-20210126152953452.png)

>   git 版本管理实例

![image-20210127085426129](3-git/image-20210127085426129.png)

#### 高层命令

##### git add

1.  将本文件的`blob`添加到本地库
    -   .git / hash[1,2] / hash [3,40]
    -   git hash-object -w [文件路径] => `blob`
2.  将`blob`存入暂存区

-   git update-index [参数] [文件模式] [`blob`] [文件名]

##### git commit

1.  生成 `tree`
    -   git write tree
2.  生成`commit-tree`，提交到本地库
    -   git commit-tree [`tree`的hash] -p [父`tree`的hash]

### git 分支管理机制

-   HEAD：指向当前活动分支的最新版本

-   [分支名]：指向分支的最新版本

![image-20210126161036604](3-git/image-20210126161036604.png)

>   HEAD指针带动分支版本移动

![image-20210126161637421](3-git/image-20210126161637421.png)

>   HEAD指针指向活动分支的最新版本

![image-20210126161703846](3-git/image-20210126161703846.png)![image-20210126161653644](3-git/image-20210126161653644.png)



### .git文件结构

![image-20210127151405665](3-git/image-20210127151405665.png)

>   HEAD

保存当前分支的文件路径

![image-20210128210242823](3-git/image-20210128210242823.png)

符号引用

>   config

当前项目的配置

>   description

当前本地库的描述信息

>   hooks

钩子：联系高层命令与底层命令的程序

>   index

暂存区

>   info

.gitignore

全局性排除文件

>   log

git 日志

>   object

保存 数据对象、目录树对象、提交对象的hash

>   refs

保存指向数据的提交对象的指针

-   heads：各个分支当前版本对应的提交对象的hash
    -   ![image-20210128210201088](3-git/image-20210128210201088.png)
-   remotes：远程库的当前分支最新版本的hash
-   tags：分支的别名

[5天两套git视频的笔记啊，一个移动就没了啊啊啊啊啊啊啊啊啊2021年1月29日11:42:39]: 