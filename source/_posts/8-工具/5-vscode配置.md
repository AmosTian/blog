---
title: vscode配置
date: '‎2022-01‎-‎23‏‎ ‏‎8:12:28'
updated: '‎2022-01‎-‎23‏‎ ‏‎8:12:28'
top: 2
categories:
  - 工具
  - 编程工具
tags:
  - 工具
  - 编程工具
abbrlink: 4065722285
---

>   配置vscode的 `Python` , `C++` 的编译环境

<!--more-->

# 1. 环境变量

## 1.1 程序的启动方式

<img src="5-vscode配置/image-20220123083006698.png" alt="image-20220123083006698" style="zoom:50%;" />

-   程序调用是OS根据输入的程序名调用路径下对应的可运行文件 (.exe)

<img src="5-vscode配置/image-20220123084753218.png" alt="image-20220123084753218" style="zoom:80%;" />

`cmd` 命令在任何文件夹下可用的原因是 **环境变量**

## 环境变量 `Path` 的作用

>   程序调用时，不仅在当前文件夹下进行，也会去配置好的环境变量下寻找。
>
>   配置 `Path` 实质上就是将常用的文件夹路径添加到系统的扫描路径中

![image-20220123085825986](5-vscode配置/image-20220123085825986.png)

# 2. Python

## 2.1 Python解释器

### 2.1.1 安装python环境

![image-20220123093416506](5-vscode配置/image-20220123093416506.png)

### 2.1.2 创建vscode-python文件夹

<img src="5-vscode配置/image-20220123093921230.png" alt="image-20220123093921230" style="zoom:67%;" />

#### 裸配置

<img src="5-vscode配置/image-20220123094715834.png" alt="image-20220123094715834" style="zoom:50%;" />

如图，与在命令行运行无区别

### 2.1.2 安装vscode-python插件

### 2.1.3 code插件运行.py

![image-20220123100607753](5-vscode配置/image-20220123100607753.png)

#### 添加配置文件

![image-20220123100627944](5-vscode配置/image-20220123100627944.png)

##### program

>   设置启动文件

```
"program": "${file}",
```

code宏定义：选中那个文件 *F5* 运行那个文件

#### code调试功能

-   设置断点后， *F5* 运行至断点处

![image-20220123101910568](5-vscode配置/image-20220123101910568.png)

-   *F10* 从断点处逐行执行

    ![image-20220123102101638](5-vscode配置/image-20220123102101638.png)

    ![image-20220123102117563](5-vscode配置/image-20220123102117563.png)

## 2.2 跨文件夹调用

![image-20220123105703824](5-vscode配置/image-20220123105703824.png)

```python
import sys
sys.path.append("./") # 将当前文件夹添加到系统目录中
```

![image-20220123105921463](5-vscode配置/image-20220123105921463.png)

## 2.3 conda管理python环境

### 2.3.1 查看已有环境

```shell
conda info -e
```

![image-20220123121403098](5-vscode配置/image-20220123121403098.png)

### 2.3.2 新建环境conda

```shell
conda create -n [env_name] python=3.xx
```

<img src="5-vscode配置/image-20220123121541983.png" alt="image-20220123121541983" style="zoom: 67%;" />

### 2.3.3 使用conda环境

```shell
conda activate [env_name]
```

<img src="5-vscode配置/image-20220123121740761.png" alt="image-20220123121740761" style="zoom:67%;" />![image-20220123121906318](5-vscode配置/image-20220123121906318.png)



# 3. C++

## 3.1 单文件编译

### 3.1.1 下载vsc扩展

### 3.1.2 下载C++编译器

https://winlibs.com/

1.  查看版本

<img src="5-vscode配置/image-20220128084046173.png" alt="image-20220128084046173" style="zoom:67%;" />

2.  配置环境变量

<img src="5-vscode配置/image-20220128084314786.png" alt="image-20220128084314786" style="zoom:67%;" />

3.  编写程序，测试编译器

    ```c++
    # include<stdio.h>
    # include<windows.h>
    
    int main(){
        printf("hello\n");
    
        system("pause");
        return 0;
    }
    ```

    <img src="5-vscode配置/image-20220128085328237.png" alt="image-20220128085328237" style="zoom:50%;" />

### 3.1.3 vsc使用自己下载的编译器

<img src="5-vscode配置/image-20220128090141457.png" alt="image-20220128090141457" style="zoom: 50%;" />

-   GDB为自己下载的编译器

<img src="5-vscode配置/image-20220128090235051.png" alt="image-20220128090235051" style="zoom: 50%;" />

-   此时，生成 *launch.json* 和 *tasks.json* 两个配置文件

<img src="5-vscode配置/image-20220128090412986.png" alt="image-20220128090412986" style="zoom:50%;" />

#### launch.json

![image-20220128092616888](5-vscode配置/image-20220128092616888.png)

#### task.json

![image-20220128093308852](5-vscode配置/image-20220128093308852.png)

## 3.2 多文件编译

![image-20220130081506606](5-vscode配置/image-20220130081506606.png)

```shell
g++ test.cpp -o test.exe //用g++编译器将 test.cpp 链接成 test.exe
```

报错：没有找得到 `PrintHello()` 的定义

<img src="5-vscode配置/image-20220130081651729.png" alt="image-20220130081651729" style="zoom:50%;" />

```c
g++ test.cpp hello.cpp -o test.exe //用g++编译器将test.cpp和hello.cpp链接成一个可执行文件
```

### 3.2.1 C/C++编译过程

```mermaid
graph TD
A((hello.cpp))
B((test.cpp))
C((hello.o))
D((test.o))
A--编译-->C
B--编译-->D
C--链接-->E((test.exe))
D--链接-->E
```

### 3.2.2 cmake构建工具

1.  [cmake下载地址](https://cmake.org/download/)

2.  vscode 安装 cmake 插件

    -   cmake：命令提示
    -   cmaketools：核心工具

3.  将cmake添加到环境变量或修改 cmaketools的配置文件

    ![image-20220130090602724](5-vscode配置/image-20220130090602724.png)

4.  目录下新建 `CMakeLists.txt` 

    ```
    project(#项目名)
    
    aux_source_directory(目录 定义为变量名)
    
    add_executable(#项目名 #目标目录)
    ```

    ```
    project(test)
    
    aux_source_directory(./src SRCS)
    
    add_executable(${PROJECT_NAME} ${SRCS})
    ```

5.  不再需要编译配置文件 task.json及删除launch.json文件中的 `      "preLaunchTask": "C/C++: g++.exe 生成活动文件"` 配置项

### 3.2.3 cmake构建项目

1.  选择 cmake 的编译器

    ![image-20220130091927245](5-vscode配置/image-20220130091927245.png)

2.  使用cmake调试

    <img src="5-vscode配置/image-20220130092710294.png" alt="image-20220130092710294" style="zoom:50%;" />

    ![image-20220130092512560](5-vscode配置/image-20220130092512560.png)

3.  修改配置文件，使 F5 调用cmake调试

    ```json
    {
        "configurations" : [
            ...
    	    "program":"${command:cmake.launchTargetPath}"
        	...
        ]
    }
    ```

    <img src="5-vscode配置/image-20220130093340417.png" alt="image-20220130093340417" style="zoom: 50%;" />

**注**

新增文件，需要变动重新保存一下CMakeLists.txt文件，刷新缓冲

![image-20220130085851956](5-vscode配置/image-20220130085851956.png)