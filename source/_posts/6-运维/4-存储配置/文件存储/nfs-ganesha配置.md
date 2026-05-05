---
title: nfs-ganesha配置
categories:
  - 存储
  - 文件存储
tags:
  - 存储
  - 文件存储
mathjax: true
abbrlink: 1970080837
date: 2026-04-04 21:19:52
---

[TOC]

<!--more-->

## 部署

### 环境

操作系统：Centos8-2.2004

```shell
[root@node1 userspace-rcu-0.14.0]# uname -a
Linux node1 4.18.0-193.el8.x86_64 #1 SMP Fri May 8 10:59:10 UTC 2020 x86_64 x86_64 x86_64 GNU/Linux
```

前置准备：部署ceph集群

```shell
[root@node1 userspace-rcu-0.14.0]# ceph -v
ceph version 14.2.15 (afdd217ae5fb1ed3f60e16bd62357ca58cc650e5) nautilus (stable)
```

### 安装依赖

```shell
# 编译依赖
yum install -y gcc git cmake autoconf libtool bison flex gcc-c++ redhat-lsb
# 框架依赖
yum install -y  openssl-devel libuuid-devel yum install libnfs-utils userspace-rcu libnsl
# 与ceph相关的驱动
yum install -y librgw-devel libcephfs-devel --nobest

ceph-radosgw

libgssglue-devel 
```

- userspace-rcu需要编译安装

  [userspace-rcu](https://github.com/urcu/userspace-rcu/tags)

  ```shell
  进入源码目录
  ./bootstrap # skip if using tarball
  ./configure
  make
  make install
  ldconfig
  ```

- doxygen需要编译安装

  [doxygen](https://github.com/doxygen/doxygen)

  [install doxygen](https://www.doxygen.nl/manual/install.html)

  ```shell
  tar -zxvf doxygen-Release_1_9_7.tar.gz
  cd doxygen-Release_1_9_7
  mkdir build && cd build
  cmake -G "Unix Makefiles" ..
  make
  make install
  ```

- 

### 下载源码

[nfs-ganesha](https://github.com/nfs-ganesha/nfs-ganesha/tags)

[ntirpc](https://github.com/nfs-ganesha/ntirpc/tags)

将ntirpc解压后，放入 */path/to/nfs-ganesha-x.x/src/libntirpc*

```shell
[root@node1 ganesha]# cp -r ntirpc-5.0/* nfs-ganesha-5.7/src/libntirpc/

mkdir build && cd build
cmake -DUSE_FSAL_RGW=ON -DUSE_FSAL_CEPH=ON -DNSL_LIBRARY=/usr/lib64/libnsl-2.28.so ../src/
make
make install
```

> 若不指定NSL路径，则会报错
>
> ```shell
> CMake Error: The following variables are used in this project, but they are set to NOTFOUND.
> Please set them or make sure they are set and tested correctly in the CMake files:
> NSL_LIBRARY (ADVANCED)
>     linked by target "ntirpc" in directory /root/ganesha/nfs-ganesha-5.7/src/libntirpc/src
> ```

>```shell
>/root/ganesha/nfs-ganesha-
>5.7/src/libntirpc/src/work_pool.c:301:3: note: ‘assert’ is defined in header ‘<assert.h>’; did you forget to ‘#include <assert.h>’?
>/root/ganesha/nfs-ganesha-5.7/src/libntirpc/src/work_pool.c:59:1:
>+#include <assert.h>
> 
>/root/ganesha/nfs-ganesha-5.7/src/libntirpc/src/work_pool.c:301:3:
>   assert(!wpt->wakeup);
>```
>
>在相应位置添加 `#include <assert.h>`