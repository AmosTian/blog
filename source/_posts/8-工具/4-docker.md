---
title: docker
date: '‎2021‎-03‎-‎01‏‎ 12:48:05'
top: 2
categories:
  - 工具
tags:
  - 工具
  - docker
abbrlink: 4065722285
---

# 1. 简介

<img src="4-docker/image-20210301133636893.png" alt="image-20210301133636893" style="zoom:50%;" />

<img src="4-docker/image-20210301134238784.png" alt="image-20210301134238784" style="zoom: 50%;" />

**Docker是开源的应用容器引擎**；基于GO语言

**运行中的镜像称为容器**

## 1.1 Docker思想

**容器是将操作系统层虚拟化，虚拟机则是虚拟化硬件**

容器更多的用于表示软件的一个标准化单元。由于容器的标准化，因此它可以无视基础设施（Infrastructure）的差异，部署到任何一个地方。另外，Docker也为容器提供更强的业界的隔离兼容

![img](4-docker/20201122210138538.png)

### 1.1.1 Docker和虚拟机技术的区别

-   虚拟机是虚拟化操作系统所需要的一系列硬件，然后运行一个完整的操作系统，在这个操作系统上安装软件和应用

-   容器直接运行在宿主机的操作系统上，容器没有自己内核及虚拟化一系列硬件

    每个容器间相互隔离，每个容器内都有自己独有的文件系统和运行环境，和其他容器互不影响

### 1.1.2 Docker应用场景

>   Docker让开发者打包其应用及依赖包到一个轻量级，可移植的容器中，然后发布到任何流行的linux机器上，从而实现虚拟化
>
>   Docker支持将软件编译成一个镜像，然后在镜像中对各种软件做好配置，将镜像发布出去，其他使用者可以直接使用这个容器。

1.  Web应用的自动化打包和发布
2.  自动化测试和持续集成，发布
3.  在服务型环境中部署和调整数据库或其他的后台应用
4.  从头编译或扩展现有的平台来搭建自己的PaaS环境

个人理解：不引入docker,切换机器使用数据库、Tomcat或者其他应用时，需要重新配置。而引入docker后，可以将本机的应用以镜像的方式上传，切换机器后，从docker库中拉取，这样获取到的就是配置好的软件。

## 1.2 核心概念

![image-20210301130955652](4-docker/image-20210301130955652.png)

| 概念                     | 解释                                                 |
| ------------------------ | ---------------------------------------------------- |
| docker主机(Host)         | 安装了Docker程序的机器(Docker直接安装在操作系统之上) |
| docker客户端(Client)     | 连接docker主机进行操作                               |
| docker注册中心(Registry) | 用于保存各种打包好的软件镜像                         |
| docker镜像(Images)       | 软件打包好的镜像；放在docker仓库中                   |
| docker容器(Controller)   | 镜像启动后的实例称为一个容器                         |

**容器是独立运行的一个或一组应用**(环境)

## 1.3 使用Docker步骤:

1.  安装Docker
2.  去Docker仓库找到这个软件对应的镜像
3.  使用Docker运行这个镜像，这个镜像会生成一个Docker容器
4.  对容器的启动停止，就是对软件的启动停止

# 2. 安装Docker

## 2.1 查看Centos版本，Docker要求CentOS系统的内核版本高于3.10

```shell
[root@iZ2zeg4pktzjhp9h7wt6doZ /]# uname -r
4.18.0-147.5.1.el8_1.x86_64

[root@iZ2zeg4pktzjhp9h7wt6doZ /]#  cat /etc/os-release
VERSION_ID="8"
PLATFORM_ID="platform:el8"
PRETTY_NAME="CentOS Linux 8 (Core)"
ANSI_COLOR="0;31"
CPE_NAME="cpe:/o:centos:centos:8"
HOME_URL="https://www.centos.org/"
BUG_REPORT_URL="https://bugs.centos.org/"

CENTOS_MANTISBT_PROJECT="CentOS-8"
CENTOS_MANTISBT_PROJECT_VERSION="8"
REDHAT_SUPPORT_PRODUCT="centos"
NAME="CentOS Linux"
VERSION="8 (Core)"
ID="centos"
ID_LIKE="rhel fedora"
VERSION_ID="8"
PLATFORM_ID="platform:el8"
PRETTY_NAME="CentOS Linux 8 (Core)"
ANSI_COLOR="0;31"
CPE_NAME="cpe:/o:centos:centos:8"
HOME_URL="https://www.centos.org/"
BUG_REPORT_URL="https://bugs.centos.org/"

CENTOS_MANTISBT_PROJECT="CentOS-8"
CENTOS_MANTISBT_PROJECT_VERSION="8"
REDHAT_SUPPORT_PRODUCT="centos"
REDHAT_SUPPORT_PRODUCT_VERSION="8"
```

## 2.2 升级软件包及内核

```shell
yum update
```

## 2.3 安装依赖软件包

```shell
yum install -y yum-utils
```

## 2.4 卸载旧版本

```shell
yum remove docker \
    docker-client \
    docker-client-latest \
    docker-common \
    docker-latest \
    docker-latest-logrotate \
    docker-logrotate \
    docker-engine
```

## 2.5 设置yum镜像仓库

**默认国外可能比较慢：**

```shell
sudo yum-config-manager \
    --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo 
```

**可以使用阿里云镜像安装：**

```shell
yum-config-manager \
--add-repo \
http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo

# 返回
Adding repo from: http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
```

## 2.6 安装docker ce

```shell
yum install docker-ce docker-ce-cli containerd.io
```

## 2.7 启动docker

```shell
systemctl start docker
```

## 2.8 测试运行流程

```shell
docker run hello-world
```

```mermaid
graph TB
在本机寻找镜像-->B{在本机上能找到?}
B--Y-->C[在本机寻找镜像]
B--N-->D[Docker daemon去Docker Hub下载]-->E{在Docker Hub上能找到?}
E--Y-->F[下载镜像到本地]
E--N-->返回错误找不到镜像
F-->C-->G[docker daemon创建新容器]-->H[docker daemon流化到DockerClient]
```

结果：

```shell
[root@iZ2zeg4pktzjhp9h7wt6doZ /]# docker run hello-world
Unable to find image 'hello-world:latest' locally
latest: Pulling from library/hello-world
0e03bdcc26d7: Pull complete
Digest: sha256:7e02330c713f93b1d3e4c5003350d0dbe215ca269dd1d84a4abc577908344b30
Status: Downloaded newer image for hello-world:latest

Hello from Docker!
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
    (amd64)
 3. The Docker daemon created a new container from that image which runs the
    executable that produces the output you are currently reading.
 4. The Docker daemon streamed that output to the Docker client, which sent it
    to your terminal.

To try something more ambitious, you can run an Ubuntu container with:
 $ docker run -it ubuntu bash

Share images, automate workflows, and more with a free Docker ID:
 https://hub.docker.com/

For more examples and ideas, visit:
 https://docs.docker.com/get-started/
```

## 2.9 将docker服务设为开机启动

```shell
systemctl enable docker
```

结果：

```shell
Created symlink /etc/systemd/system/multi-user.target.wants/docker.service → /usr/lib/systemd/system/docker.service.
```

## 2.10 卸载Docker Engine，CLI和Containerd软件包

```shell
yum remove docker-ce docker-ce-cli containerd.io
```

## 2.11 删除Docker默认工作目录

```shell
rm -rf /var/lib/docker
```

## 2.12 配置docker镜像加速

国内从 DockerHub 拉取镜像非常慢，此时可以配置镜像加速器。

-   网易：https://hub-mirror.c.163.com/
-   阿里云：https://<你的ID>.mirror.aliyuncs.com
-   七牛云加速器：https://reg-mirror.qiniu.com

### 阿里云

```shell
mkdir -p /etc/docker

tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://XXXXX.mirror.aliyuncs.com"]
}
EOF

systemctl daemon-reload
systemctl restart docker
```

### 网易云

```
mkdir -p /etc/docker

tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://hub-mirror.c.163.com/"]
}
EOF

systemctl daemon-reload
systemctl restart docker
```

## 2.13 检测是否配置成功

```
docker info
```

![image-20210304111632077](4-docker/image-20210304111632077.png)

<div style="page-break-after:always" />

# 3. 常用操作

## 3.1 镜像操作

| 操作 | 命令                                             | 说明                             |
| ---- | ------------------------------------------------ | -------------------------------- |
| 检索 | docker search 关键字<br />如:docker search redis | 去docker hub上检索镜像的详细信息 |
| 拉取 | docker pull 镜像名:tag                           | tag表示版本，默认为latest        |
| 列表 | docker images                                    | 查看所有本地镜像                 |
| 删除 | docker rmi image-id                              | 删除指定的本地镜像               |

[Docker Hub](https://hub.docker.com/search?q=&type=image)

## 3.2 容器操作

| 操作     | 命令                                                         | 说明                                                         |
| -------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 运行     | docker run -name container-name -d image-name -p host-port:container-port | -name：自定义容器名<br />-d：后台运行<br />image-name：指定镜像模板<br />-p：端口映射 主机端口:容器内端口 |
| 列表     | docker ps                                                    | 查看运行中容器<br />-a：查看所有容器                         |
| 停止     | docker stop container-name/container-id                      | 停止当前运行的容器                                           |
| 启动     | docker start container-name/container-id                     | 启动容器                                                     |
| 删除     | docker rm container-id                                       | 删除指定容器                                                 |
| 容器日志 | docker logs container-id/docker-name                         |                                                              |

```shell
1.  搜索镜像 
docker search tomcat
2.  拉取镜像 
docker pull tomcat
3.  根据镜像启动容器 
docker run --name mytomcat -d tomcat:latest
4.  查看运行中的容器 
docker ps
5.  停止运行中的容器 
docker stop [id]
6.  查看所有的容器(包括已退出)
7.  启动容器 
docker start [id]
8.  删除容器——一定要停止状态 
docker rm [id]
9.  启动一个做了端口映射的tomcat 
docker run -d -p 8088:8080 主机端口:容器内部端口
10. 查看docker 日志
docker logs mytomcat
```

### 3.2.1 开机重启

```shell
# 如果已经启动的项目，则使用update更新：
docker update --restart=always isaler_v0.0.11
```

| Flag           | Description                                               |
| -------------- | --------------------------------------------------------- |
| no             | 不自动重启容器. (默认value)                               |
| on-failure     | 容器发生error而退出(容器退出状态不为0)重启容器            |
| unless-stopped | 在容器已经stop掉或Docker stoped/restarted的时候才重启容器 |
| always         | 在容器已经stop掉或Docker stoped/restarted的时候才重启容器 |

### 3.2.2 容器的打包为镜像

```shell
docker commit -a "runoob.com" -m "my apache" 容器名称或id 打包的镜像名称:标签

-a :提交的镜像作者；
-c :使用Dockerfile指令来创建镜像；
-m :提交时的说明文字；
-p :在commit时，将容器暂停
```

```shell
# 镜像打包
docker export id > [包名].tar

# 镜像使用
docker import [包名].tar wangye/tf-deeplab-gpu:1.1 
```

### 3.2.3 TomcatESC公网访问

1.  配置安全组——开放端口

    ![image-20210304124045081](4-docker/image-20210304124045081.png)

2.  进入容器的文件夹

3.  将webapps.dist修改为webapps

    ```shell
    [root@iZ2zeg4pktzjhp9h7wt6doZ /]# docker exec -it tomcat80 bash
    root@45b32efc5bbb:/usr/local/tomcat# ls
    BUILDING.txt  CONTRIBUTING.md  LICENSE  NOTICE  README.md  RELEASE-NOTES  RUNNING.txt  bin  conf  lib  logs  native-jni-lib  temp  webapps  webapps.dist  work
    root@45b32efc5bbb:/usr/local/tomcat# rm -r webapps
    root@45b32efc5bbb:/usr/local/tomcat# mv webapps.dist webapps
    ```

### 3.2.4 docker——mysql

错误启动

```shell
docker run --name mysql01 -d mysql

#出错
[root@iZ2zeg4pktzjhp9h7wt6doZ ~]# docker ps -a
CONTAINER ID   IMAGE           COMMAND                  CREATED          STATUS                      PORTS                    NAMES
661a9a06a0de   mysql           "docker-entrypoint.s…"   54 seconds ago   Exited (1) 52 seconds ago                            mysql01
bfebea41f6c2   tomcat:latest   "catalina.sh run"        5 hours ago      Up 5 hours                  0.0.0.0:8081->8080/tcp   tomcat81
fde73047e23f   tomcat:latest   "catalina.sh run"        5 hours ago      Up 5 hours                  0.0.0.0:8082->8080/tcp   tomcat82
45b32efc5bbb   tomcat:latest   "catalina.sh run"        6 hours ago      Up 6 hours                  0.0.0.0:8080->8080/tcp   tomcat80
dfc9e2f59780   hello-world     "/hello"                 7 hours ago      Exited (0) 7 hours ago                               intelligent_tharp

#日志
[root@iZ2zeg4pktzjhp9h7wt6doZ ~]# docker logs mysql01
2021-03-04 09:39:47+00:00 [Note] [Entrypoint]: Entrypoint script for MySQL Server 8.0.23-1debian10 started.
2021-03-04 09:39:48+00:00 [Note] [Entrypoint]: Switching to dedicated user 'mysql'
2021-03-04 09:39:48+00:00 [Note] [Entrypoint]: Entrypoint script for MySQL Server 8.0.23-1debian10 started.
2021-03-04 09:39:48+00:00 [ERROR] [Entrypoint]: Database is uninitialized and password option is not specified
        You need to specify one of MYSQL_ROOT_PASSWORD, MYSQL_ALLOW_EMPTY_PASSWORD and MYSQL_RANDOM_ROOT_PASSWORD
//没有指定MySql密码

#正确的命令
//指定密码 + 端口映射
docker run --name mysql01 -p 3306:3306 -e MYSQL_ROOT_PASSWORD=Aa12345+ -d mysql
```

<img src="4-docker/image-20210304175557916.png" alt="image-20210304175557916" style="zoom:67%;" />

#### mysql配置文件

```shell
docker run --name myMysqlName -v /config/mysql:/etc/mysql/conf.d -e MYSQL_ROOT_PASSWORD=my-secret-pw -d mysql:tag

把主机的/config/mysql文件夹挂在到mysql docker容器的 /etc/mysql/config.d文件夹里
修改mysql配置文件只需要把mysql配置文件放入

#不使用配置文件，在命令中直接指定参数
docker run --name myMysqlName -e MYSQL_ROOT_PASSWORD=my-secret-pw -d mysql:tag --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci
--指定参数
```

# 4. docker——percona

[官网链接](https://hub.docker.com/_/percona/)

Percona 为 MySQL 数据库服务器进行了改进，在功能和性能上较 MySQL 有着很显著的提升。该版本提升了在高负载情况下的 InnoDB 的性能、为 DBA 提供一些非常有用的性能诊断工具；另外有更多的参数和命令来控制服务器行为。

Percona Server 只包含 MySQL 的服务器版，并没有提供相应对 MySQL 的 Connector 和 GUI 工具进行改进。
Percona Server 使用了一些 google-mysql-tools, Proven Scaling, Open Query 对 MySQL 进行改造。

## 4.1 安装部署

```shell
# 拉取镜像
docker pull percona:8.0.22-13

#创建容器
docker run --name percona -v /data/mysql-data:/var/lib/mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=root -d percona:8.0.22-13

# 参数解释
--name	:	percona				   指定容器名
-v		:	[主机目录]:[容器目录]	 将 主机目录 挂在到容器目录上
-p		:	[主机端口]:[容器内部端口]	设置端口映射
-e		:	MYSQL_ROOT_PASSWORD=   设置容器参数，将root用户密码为root
percona:8.0.22-13	:	镜像名:版本

# 启动容器
docker start percona

# 解决没有权限闪退问题
chmod -R 777 /data 
```

![image-20210314200457516](4-docker/image-20210314200457516.png)

测试:

![image-20210314201157658](4-docker/image-20210314201157658.png)
