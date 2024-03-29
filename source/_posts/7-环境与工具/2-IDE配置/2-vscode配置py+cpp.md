---
title: vscode配置
date: '‎2022-01‎-‎23‏‎ ‏‎8:12:28'
updated: '2022-01‎-‎23‏‎ ‏‎8:12:28'
top: 82
categories:
  - 环境与工具
  - IDE配置
tags:
  - 环境与工具
  - IDE配置
abbrlink: 202279577
---
> 配置vscode的 `Python` , `C++` 的编译环境

<!--more-->

# 1. Py+conda+vscode

## 1.1 单文件

### 1.1.1 指定Python解释器

选用指定anaconda下的python编译器

命令面板 `>python:select Interpretor ` 

![image-20240202175130458](2-vscode配置py+cpp/image-20240202175130458.png)

### 1.1.2 创建vscode-python文件夹

![image-20220123093921230](2-vscode配置py+cpp/image-20220123093921230.png)

#### 裸配置

![image-20220123094715834](2-vscode配置py+cpp/image-20220123094715834.png)

如图，与在命令行运行无区别

### 1.1.2 安装vscode-python插件

### 1.1.3 code插件运行.py

![image-20220123100607753](2-vscode配置py+cpp/image-20220123100607753.png)

#### 添加配置文件

![image-20220123100627944](2-vscode配置py+cpp/image-20220123100627944.png)

`"program"` ：设置启动文件

```json
"program": "${file}",
```

code宏定义：选中那个文件 *F5* 运行那个文件

#### code调试功能

-   设置断点后， *F5* 运行至断点处

![image-20220123101910568](2-vscode配置py+cpp/image-20220123101910568.png)

-   *F10* 从断点处逐行执行

    ![image-20220123102101638](2-vscode配置py+cpp/image-20220123102101638.png)

    ![image-20220123102117563](2-vscode配置py+cpp/image-20220123102117563.png)

## 1.2 跨文件夹调用

![image-20220123105703824](2-vscode配置py+cpp/image-20220123105703824.png)

```python
import sys
sys.path.append("./") # 将当前文件夹添加到系统目录中
```

![image-20220123105921463](2-vscode配置py+cpp/image-20220123105921463.png)

# 2. C++

## 2.1 单文件编译

### 2.1.1 下载vsc扩展

### 2.1.2 下载C++编译器

https://winlibs.com/

1. 查看版本

   ![image-20220128084046173](2-vscode配置py+cpp/image-20220128084046173.png)

2. 配置环境变量

   ![image-20230404001539796](2-vscode配置py+cpp/image-20230404001539796.png)

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

    ![image-20220128085328237](2-vscode配置py+cpp/image-20220128085328237.png)

### 2.1.3 vsc使用自己下载的编译器

![image-20220128090141457](2-vscode配置py+cpp/image-20220128090141457.png)

-   GDB为自己下载的编译器

![image-20220128090235051](2-vscode配置py+cpp/image-20220128090235051.png)

-   此时，生成 *launch.json* 和 *tasks.json* 两个配置文件

![image-20220128090412986](2-vscode配置py+cpp/image-20220128090412986.png)

#### launch.json

![image-20220128092616888](2-vscode配置py+cpp/image-20220128092616888.png)

#### task.json

![image-20220128093308852](2-vscode配置py+cpp/image-20220128093308852.png)

## 2.2 多文件编译

![image-20220130081506606](2-vscode配置py+cpp/image-20220130081506606.png)

```shell
g++ test.cpp -o test.exe //用g++编译器将 test.cpp 链接成 test.exe
```

报错：没有找得到 `PrintHello()` 的定义

解决方法

```c
g++ test.cpp hello.cpp -o test.exe //用g++编译器将test.cpp和hello.cpp链接成一个可执行文件
```

![image-20220130081651729](2-vscode配置py+cpp/image-20220130081651729.png)

### 2.2.1 C/C++编译过程

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

### 2.2.2 cmake构建工具

1.  [cmake下载地址](https://cmake.org/download/)

2.  vscode 安装 cmake 插件

    -   cmake：命令提示
    -   cmaketools：核心工具

3.  将cmake添加到环境变量或修改 cmaketools的配置文件

    ![image-20220130090602724](2-vscode配置py+cpp/image-20220130090602724.png)

4.  项目目录下新建 `CMakeLists.txt` 

    ```
    project(#项目名)
    
    aux_source_directory(代码目录 定义为变量名)
    
    add_executable(#项目名 #目标目录)
    ```

    ```
    project(test)
    
    aux_source_directory(./src SRCS)
    
    add_executable(${PROJECT_NAME} ${SRCS})
    ```

5.  不再需要编译配置文件 task.json及删除launch.json文件中的 `      "preLaunchTask": "C/C++: g++.exe 生成活动文件"` 配置项

### 2.2.3 cmake构建项目

重启一下vscode就会出现1

1.  选择 cmake 的编译器

    ![image-20220130091927245](2-vscode配置py+cpp/image-20220130091927245.png)

2.  使用cmake调试

    这里需要选择一下编译器版本

    ![image-20220130092710294](2-vscode配置py+cpp/image-20220130092710294.png)

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

    ![image-20220130093340417](2-vscode配置py+cpp/image-20220130093340417.png)
    
    ![image-20220130092512560](2-vscode配置py+cpp/image-20220130092512560.png)

![image-20230404002357292](2-vscode配置py+cpp/image-20230404002357292.png)

**注**

新增文件，需要变动重新保存一下CMakeLists.txt文件，刷新缓冲

![image-20220130085851956](2-vscode配置py+cpp/image-20220130085851956.png)

## 2.3 一些问题

### 2.3.1 VScode 检测到#include错误，请更新includePath

#### 1.在VScode中打开一个文件夹，并按ctrl+shit+p，搜索找到编辑配置（JSON）文件，并打开检查自己的“includePath”，如下图所示。

![image-20230410231904890](2-vscode配置py+cpp/image-20230410231904890.png)

####  2.我们发现自己的includePath并未更新，这也是问题的主要原因，此时我们进行更新。我们使用win+R打开cmd运行窗口，输入命令：g++ -v -E -x c++ -，进行查看路径（下图红框处），并复制下来。

```shell
g++ -v -E -x c++ -
```



![image-20230410232317247](2-vscode配置py+cpp/image-20230410232317247.png)

修改斜杠

![image-20230410231924255](2-vscode配置py+cpp/image-20230410231924255.png)

### 2.3.2 未定义标识符 cin

#### 排除includePath错误

按Ctrl + 鼠标左键，可以跳转到定义处，则说明 `includePath` 正确

#### 根据电脑的具体的情况，修改“intelliSenseMode”

- 未额外安装编译器，设置为 `"intelliSenseMode": "windows-mscv-x86`

- 如果安装了其他的编译器，比如GCC编译器，设置为 `"intelliSenseMode": "windows-gcc-x64"`

#### 打开c_cpp_properties.json 文件，修改对应的项

![image-20230410234240093](2-vscode配置py+cpp/image-20230410234240093.png)

![image-20230410235600071](2-vscode配置py+cpp/image-20230410235600071.png)