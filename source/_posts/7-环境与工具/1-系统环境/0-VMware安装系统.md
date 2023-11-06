---
title: 0.vmware安装虚拟机
top: 78
categories:
  - 环境与工具
  - 系统环境
tags:
  - 环境与工具
  - 系统环境
  - Linux
mathjax: false
abbrlink: 1168048166
date: 2023-10-18 20:29:51
---

[TOC]

<!--more-->

参考：https://blog.csdn.net/m0_51913750/article/details/131604868

## 0.1 安装VMware

1. 从 [VMware官网](https://www.vmware.com/cn/products/workstation-pro/workstation-pro-evaluation.html) 下载安装包 
2. 照着点就行

## 0.2 下载ubuntu镜像

[官网](https://ubuntu.com/download/desktop)

[清华大学开源软件镜像站](https://mirrors.tuna.tsinghua.edu.cn/ubuntu-releases/)

[阿里云开源镜像站](https://mirrors.aliyun.com/ubuntu-releases/)

Ubuntu 22.04

## 0.3 创建系统实例

![在这里插入图片描述](0-VMware安装系统/3cffc05a1c0f4458bae096a7d01b13de.png)

![在这里插入图片描述](0-VMware安装系统/8993ba4a73694bf09ccf64dd245440a0.png)

![在这里插入图片描述](0-VMware安装系统/fa8a6489bc6445d2a12cd7744c30f326.png)

![在这里插入图片描述](0-VMware安装系统/dcad3f9e78e84e8fbf36cf61b27f7145.png)

![在这里插入图片描述](0-VMware安装系统/390395845da849ea8e437268cf9d0e6a.png)

![image-20231018210736125](0-VMware安装系统/image-20231018210736125.png)

- 需要2GB，不然无法安装

![在这里插入图片描述](0-VMware安装系统/e5a69bd54b1d4913b3a1a0436a8e9f0f.png)

![在这里插入图片描述](0-VMware安装系统/fc9ad88d50dd4bd7a1ddeb6214dc7c1b.png)

![在这里插入图片描述](0-VMware安装系统/b519d87dc8b245748b6bf7f17fd39474.png)

![在这里插入图片描述](0-VMware安装系统/e0955b811aeb49b69b1f1b3ae4194607.png)

![在这里插入图片描述](0-VMware安装系统/25003a75b2be42dc8a4c04bc5d720c53.png)

![在这里插入图片描述](0-VMware安装系统/65b805a18a494fd58f9debb90cdfd2de.png)

![在这里插入图片描述](0-VMware安装系统/a968879338a64e82a60c1d5ee3c58c17.png)

![在这里插入图片描述](0-VMware安装系统/1d4fd562913a407ebf32ebdf4beb1149.png)

![在这里插入图片描述](0-VMware安装系统/f5179bc353694eeda7557b12d1386f7d.png)

## 0.4 安装ubuntu

![在这里插入图片描述](0-VMware安装系统/4fb9b0898b76438282d5592c21c03189.png)

![在这里插入图片描述](0-VMware安装系统/75b6607dccb74334aa20e5abccdb71a8.png)

![在这里插入图片描述](0-VMware安装系统/21b87bbd00dd45dea62af12c6fed0539.png)

![在这里插入图片描述](0-VMware安装系统/fb689d363d594b81b2006018d6515f5a.png)

![在这里插入图片描述](0-VMware安装系统/71e4e72755974b70834fdd9312fc3daf.png)

![在这里插入图片描述](0-VMware安装系统/c98a40ae2ac244e4aa64ccaa166778cc.png)

![在这里插入图片描述](0-VMware安装系统/563ca16ab9a64ce6be2d499c6ec1b116.png)

![在这里插入图片描述](0-VMware安装系统/3a2d7a6ce60246df8a540e1215987a9b.png)

## 0.5 实例配置项

### 0.5.1 安装VMware tools

https://blog.csdn.net/NRWHF/article/details/127809132

开机

![在这里插入图片描述](0-VMware安装系统/1.png)

![在这里插入图片描述](0-VMware安装系统/2.png)

从光盘解压到本机

![在这里插入图片描述](0-VMware安装系统/3.png)

![在这里插入图片描述](0-VMware安装系统/4.png)

从终端进入该文件夹，运行 `sudo ./vmware-install.pl` 

![在这里插入图片描述](0-VMware安装系统/6.png)

提示yes的输yes，默认的回车

![在这里插入图片描述](0-VMware安装系统/5.png)

![在这里插入图片描述](0-VMware安装系统/7.png)

### 0.5.2 修改静态IP

因为原系统设置的是动态 ip(BOOTPROTO="dhcp")，所以新系统默认也是动态 ip，自动分配了 ip，克隆后并没有与系统的 ip 地址冲突，但为了集群搭建，需要改为可控的静态ip

```shell
sudo apt install net-tools   
ifconfig #查看网卡名称
ip a

cd /etc/netplan
sudo gedit 01-network-manager-all.yaml
```

```yaml
network: 
 version: 2
 renderer: NetworkManager
 ethernets:
  ens33:
   dhcp4: false
   addresses: [192.168.192.130/24]
   gateway4: 192.168.192.2
   nameservers:
    addresses: [192.168.192.2] 
```

```shell
sudo netplan apply 
```

### 0.5.3 ssh连接

```shell
sudo apt-get openssh-server
E: 无法获得锁 /var/lib/dpkg/lock-frontend - open (11: 资源暂时不可用)

E: 无法获取 dpkg 前端锁 (/var/lib/dpkg/lock-frontend)，是否有其他进程正占用它？
sudo rm /var/lib/dpkg/lock-frontend
sudo rm /var/lib/dpkg/lock
sudo rm /var/cache/apt/archives/lock

sudo apt update && sudo apt upgrade
sudo apt install openssh-server

ssh

# 关闭防火墙
sudo systemctl stop ufw.service
sudo systemctl disable ufw.service
sudo ufw status
```

## 0.6 克隆

https://blog.csdn.net/m0_46474019/article/details/117569364

### 0.6.1 克隆实例

无法为已经开启或者挂起的虚拟机克隆，所以克隆前需要关闭虚拟机。

![image-20231018214304297](0-VMware安装系统/image-20231018214304297.png)

![image-20231018214317329](0-VMware安装系统/image-20231018214317329.png)

![image-20231018214327019](0-VMware安装系统/image-20231018214327019.png)

![image-20231018214402252](0-VMware安装系统/image-20231018214402252.png)

![image-20231018214411748](0-VMware安装系统/image-20231018214411748.png)

克隆完成即可启动新系统，因为原系统使用的是动态 IP，所以新系统也会自动分配一个 IP，不会原系统冲突，而且新系统的 MAC 地址也与原系统不一致。所以可以直接启动新老系统，双方都能 ping 通。

#### 生成MAC地址

配网卡

![image-20231019100632255](0-VMware安装系统/image-20231019100632255.png)

关机状态下，生成MAC地址

![image-20231019100717266](0-VMware安装系统/image-20231019100717266.png)

### 0.6.2 修改静态ip

### 0.6.3 修改主机密码名称

https://zhuanlan.zhihu.com/p/630601853

密码（登录用户需要修改）

1. 进入Ubuntu，打开一个终端，输入 sudo su转为root用户。 注意，必须先转为root用户！！！
2. sudo passwd user(user 是对应的用户名)
3. 输入新密码，确认密码。
4. 修改密码成功，重启，输入新密码进入Ubuntu。

用户名

```shell
hostname #查看系统主机名称
hostnamectl set-hostname xx #修改主机名称	
	#执行命令之后，会自动修改 /etc/hostname 文件
	#执行命令之后，会立即生效，且重启系统也会生效
cat /etc/hostname	#查看 /etc/hostname 文件内容，里面配置的就是系统主机名称
```

```shell
su root
sudo gedit /etc/passwd # 找到原先的用户名，将其改为自己的用户名（一行全部都改）
sudo  gedit /etc/shadow #找到原先用户名（所有的名字都要改），改为自己的用户名
sudo gedit /etc/group #你应该发现你的用户名在很多个组中，全部修改！
mv /home/原用户名/ /home/新用户名

mv /home/ceph_admin/ /home/
```





