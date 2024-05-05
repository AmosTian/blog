---
title: ceph quincy 版本部署
categories:
  - 分布式
  - 分布式存储
tags:
  - 分布式
  - 分布式存储
mathjax: true
abbrlink: 3338574514
date: 2024-05-05 22:15:10
---

[TOC]

<!--more-->

## ceph quincy 版本部署

> [ceph 容器镜像](https://quay.io/repository/ceph/ceph?tab=tags)
>
> https://quay.io/repository/ceph/ceph-grafana?tab=info
>

### 实验环境说明

1. 集群使用5台主机，每台主机配置为4C8G，共3块硬盘。1块200G SSD用作系统盘，1块100GB SSD盘用作OSD，1块100GB SATA盘用作OSD

```shell
# free -m
               total        used        free      shared  buff/cache   available
Mem:            7403         696        5089           9        1923        6706
Swap:           8191           0        8191
# cat /proc/cpuinfo |grep processor
processor       : 0
processor       : 1
processor       : 2
processor       : 3
# lsblk
NAME          MAJ:MIN RM  SIZE RO TYPE MOUNTPOINTS
sda             8:0    0  100G  0 disk 
sr0            11:0    1 16.5G  0 rom  
nvme0n1       259:0    0  200G  0 disk 
├─nvme0n1p1   259:1    0    2G  0 part /boot
└─nvme0n1p2   259:2    0  198G  0 part 
  ├─vg00-root 253:0    0  120G  0 lvm  /
  └─vg00-swap 253:1    0    8G  0 lvm  [SWAP]
nvme0n2       259:3    0  100G  0 disk 
```

2. OS 使用`openEuler 22.03 (LTS-SP1)`

```shell
# cat /etc/os-release 
NAME="openEuler"
VERSION="22.03 (LTS-SP1)"
ID="openEuler"
VERSION_ID="22.03"
PRETTY_NAME="openEuler 22.03 (LTS-SP1)"
ANSI_COLOR="0;31"
```

3. OS 内核`5.10.0-136.34.0.110.oe2203sp1.x86_64`

```shell
# uname -r
5.10.0-136.34.0.110.oe2203sp1.x86_64
```

> 说明：这里选择openeuler也是有理由的，现在都强调自主可控哈，openeuler也会发展的越来越好。

4. Ceph版本使用`Quincy 17.2.6`

> 说明：openeuler yum源中默认版本为`Pacific 16.2.x`，ceph在维护的版本[ceph活跃版本](https://docs.ceph.com/en/latest/releases/#active-releases)

5. docker与containerd版本分别为`docker-20.10.23`和`containerd-1.7.0`

> 说明：openeuler 22.03自带的docker版本是`18.09`。

## 部署步骤

1. 修改主机名和`hosts`

> 修改所有节点(ceph01-05)的主机名

```shell
## 例如，在192.168.59.241上执行命令
# hostnamectl set-hostname ceph01
```

> 修改有节点(ceph01-05)`/etc/hosts`文件

```shell
cat > /etc/hosts <<EOF
127.0.0.1   localhost localhost.localdomain localhost4 localhost4.localdomain4
# public network
192.168.59.241 ceph01
192.168.59.242 ceph02
192.168.59.243 ceph03
192.168.59.244 ceph04
192.168.59.245 ceph05

# cluster network
10.168.59.241 ceph01-cl
10.168.59.242 ceph02-cl
10.168.59.243 ceph03-cl
10.168.59.244 ceph04-cl
10.168.59.245 ceph05-cl

# manage network
EOF
```

2. 统一网卡命名(选做)

> 有部分生产环境机型不同，网卡名有差异，统一命名便于后续管理。
>
> 注意：在线修改网卡名，可能会导致网络中断，建议从BMC操作，请谨慎操作！！
>
> 在openeuler 22.03使用在centos7.9上udev绑定网卡名的方式已经不生效，rocky linux 9.2 也不生效，应该是绑定udev方式发生了变化，此处通过修改grub的方式统一网卡名。
>
> - public  网络：eth0

- cluster 网络：eth1

```shell
## 在虚拟机中，public 网络的网卡名默认是 ens160（操作系统及版本不同，网卡名可能不同），现在统一命名为 eth0
# mv /etc/sysconfig/network-scripts/ifcfg-ens160 /etc/sysconfig/network-scripts/ifcfg-eth0
# cat > /etc/sysconfig/network-scripts/ifcfg-eth0 <<EOF
TYPE=Ethernet
PROXY_METHOD=none
BROWSER_ONLY=no
BOOTPROTO=static
DEFROUTE=yes
IPV4_FAILURE_FATAL=no
IPV6INIT=no
IPV6_AUTOCONF=no
IPV6_DEFROUTE=no
IPV6_FAILURE_FATAL=no
# modify, default ens160 
NAME=eth0
# modify,default ens160
DEVICE=eth0
ONBOOT=yes
IPADDR=192.168.59.241
NETMASK=255.255.255.0
GATEWAY=192.168.59.2
DNS1=223.5.5.5
DNS2=114.114.114.114
EOF
--------------------------------------------------------------------------------------------
## 在虚拟机中，cluster 网络的网卡名默认是 ens192（操作系统及版本不同，网卡名可能不同），现在统一命名为 eth1
## 从 public 网络登录修改 cluster 网络！！！
# mv /etc/sysconfig/network-scripts/ifcfg-ens192 /etc/sysconfig/network-scripts/ifcfg-eth1
# cat > /etc/sysconfig/network-scripts/ifcfg-eth1 <<EOF
TYPE=Ethernet
PROXY_METHOD=none
BROWSER_ONLY=no
BOOTPROTO=static
DEFROUTE=yes
IPV4_FAILURE_FATAL=no
IPV6INIT=no
IPV6_AUTOCONF=no
IPV6_DEFROUTE=no
IPV6_FAILURE_FATAL=no
# modify,default ens192
NAME=eth1
# modify,default ens192
DEVICE=eth1
ONBOOT=yes
IPADDR=10.168.59.241
NETMASK=255.255.255.0
EOF

## 上面用`cat`命令修改网卡，也可以直接用`sed`命令替换网卡中的名字
# sed -i 's/ens160/eth0/g' /etc/sysconfig/network-scripts/ifcfg-eth0
# sed -i 's/ens192/eth1/g' /etc/sysconfig/network-scripts/ifcfg-eth1

## 修改GRUB，同时关闭net.ifnames和biosdevname命名规则。
## 生产环境操作前，建议备份数据
## 在GRUB_CMDLINE_LINUX中增加`net.ifnames=0 biosdevname=0`
# vi /etc/default/grub
GRUB_TIMEOUT=5
GRUB_DISTRIBUTOR="$(sed 's, release .*$,,g' /etc/system-release)"
GRUB_DEFAULT=saved
GRUB_DISABLE_SUBMENU=true
GRUB_TERMINAL_OUTPUT="console"
GRUB_CMDLINE_LINUX="resume=/dev/mapper/vg00-swap rd.lvm.lv=vg00/root rd.lvm.lv=vg00/swap net.ifnames=0 biosdevname=0 cgroup_disable=files apparmor=0 crashkernel=512M rhgb quiet"
GRUB_DISABLE_RECOVERY="true

## 更新grub并重启生效
# grub2-mkconfig -o /boot/grub2/grub.cfg
# reboot

如果系统是UEFI启动，则要执行以下命令
# grub2-mkconfig -o /boot/efi/EFI/centos/grub.cfg
# reboot
```

> 上述修改网卡名称，需在ceph01-05上操作，注意配置文件中IP需按实际修改

- 存储网络配置巨帧(实验环境选做)

> 在存储网络的网卡和交换机上使用巨型帧，配置巨型帧最大传输单元 (MTU) 9000，特别是在后端或集群网络上。
> Ceph 中大多数与性能相关的问题通常是因为网络问题造成的。简单的网络问题（Cat-6 电缆）可能会导致带宽下降。至少
> 将10Gb网络用于public网络。对于大型集群，请考虑将40Gb网络用于集群网络。

- 设置服务器BIOS注意事项(实验环境选做)

> 当全部使用 SSD（Solid State Drives），或每个节点都配置了大量驱动器时，支持在 Ceph 中以独立驱动器模式使用 Just a Bunch Drives (JBOD)。例如，有 20个驱动器附加到一个控制器。在这种情况下，
> 回写缓存可能会形成一个 I/O 资源竞争。由于`JBOD`禁用回写缓存，因此在这种情况下是理想的选择。
> 使用`JBOD`模式的一个优点是易于添加或替换驱动器，然后在物理插入后立即向操作系统公开驱动器。

3. 关闭防火墙和selinux

```shell
systemctl stop firewalld
systemctl disable firewalld
setenforce 0
sed -i "s/SELINUX=enforcing/SELINUX=disabled/g" /etc/selinux/config
```

4. 关闭交换分区(选做)，生产环境建议关闭交换分区

```shell
swapoff -a
sed -i 's/.*swap.*/#&/' /etc/fstab
```

5. 修改内核参数及资源限制参数

```shell
## 转发 IPv4 并让 iptables 看到桥接流量(选做)
# cat <<EOF | sudo tee /etc/modules-load.d/ceph.conf
overlay
br_netfilter
EOF

# modprobe overlay
# modprobe br_netfilter
# lsmod | grep br_netfilter 
#验证br_netfilter模块

## 修改内核参数
cat <<EOF | tee /etc/sysctl.d/ceph.conf
net.bridge.bridge-nf-call-iptables  = 1
net.bridge.bridge-nf-call-ip6tables = 1
net.ipv4.ip_forward                 = 1
#1. 用于对外连接的随机端口范围。缺省是# 32768    60999
#端口范围开始和结束要奇偶不同，如果设置为1024 65530则在dmesg中会报ip_local_port_range: prefer different parity for start/end values.
net.ipv4.ip_local_port_range = 1024 65335 

# 如果dmesg中有类似“nf_conntrack: table full, dropping packet”日志，则需要调大 conntrack 参数，默认是2621440，该值不能太大，否则会出现：nf_conntrack: falling back to vmalloc.
net.netfilter.nf_conntrack_max = 2621440
net.nf_conntrack_max = 2621440
# 指定了进程可以拥有的内存映射区域的最大数目。这个设置对于使用大量内存映射的应用程序很重要 
vm.max_map_count = 1048576                       
#2. 如果 netstat -s | grep "buffer errors" 中errors数在增加，则需要调整如下参数
# net.ipv4.tcp_wmem 默认值：4096        16384   4194304
net.ipv4.tcp_wmem = 4096        16384   4194304
#  net.ipv4.tcp_rmem 默认值：4096  87380  6291456
net.ipv4.tcp_rmem = 4096  87380  6291456
# net.ipv4.tcp_mem 默认值：381462  508616  762924
net.ipv4.tcp_mem = 381462  508616  762924
# net.core.rmem_default 默认值：212992
net.core.rmem_default = 8388608
# net.core.rmem_max 默认值：212992
net.core.rmem_max = 26214400
# net.core.wmem_max 默认值：212992
net.core.wmem_max = 26214400

# 调大文件句柄数
fs.nr_open = 16777216
fs.file-max = 16777216

#3.如果dmesg中有类似"arp_cache: neighbor table overflow"，则需要调整如下参数
# net.ipv4.neigh.default.gc_thresh1 默认值 128
net.ipv4.neigh.default.gc_thresh1 = 40960
# net.ipv4.neigh.default.gc_thresh2 默认值 512
net.ipv4.neigh.default.gc_thresh2 = 81920
# net.ipv4.neigh.default.gc_thresh3 默认值 1024
net.ipv4.neigh.default.gc_thresh3 = 102400

#4. 连接队列满导致丢包，需要调整半连接队列和全连接队列
#TCP 连接请求队列长度，默认为1024，加大队列长度为8192，可以容纳更多等待连接的网络连接数。
net.ipv4.tcp_max_syn_backlog = 65535 
# 调整全连接队列上限，即服务器同时接受连接的数量
net.core.somaxconn = 65535
# 网络设备最大接收队列长度
net.core.netdev_max_backlog = 250000
#5. 在低版本内核中(比如 3.10)，支持使用 tcp_tw_recycle 内核参数来开启 TIME_WAIT 的快速回收，但如果 client 也开启了 timestamp (一般默认开启)，同时也就会导致在 NAT 环境丢包，甚至没有 NAT 时，稍微高并发一点，也会导致PAWS校验失败，导致丢包，所以生产环境不建议开启。
#### TIME_WAIT
# 默认0
# 用 SYN Cookie 防御机制
net.ipv4.tcp_syncookies = 1
# 开启 TIME-WAIT 状态的重用，此处为0，未开启
net.ipv4.tcp_tw_reuse = 0
# 不建议启用tcp_tw_recycle，会导致数据错乱，4.12内核已去掉这个参数
# net.ipv4.tcp_tw_recycle = 0
# 默认60
net.ipv4.tcp_fin_timeout = 30

#6.启用fastopen，跳过tcp3次握手;第 1 个比特位为 1 时，表示作为客户端时支持 TFO；第 2 个比特位为 1 时，表示作为服务器时支持 TFO，所以当 tcp_fastopen 的值为 3 时（比特为 0x11）就表示完全支持 TFO 功能。
net.ipv4.tcp_fastopen = 3
net.ipv4.tcp_orphan_retries = 3
# 默认0，表示如果三次握手第三步的时候 accept queue 满了，则 server 丢弃 client 发过来的 ack；为1表示第三步的时候如果全连接队列满了，server 发送一个 rst 包给 client ，表示拒绝这个握手过程和这个连接
# 只有确信守护进程真的不能完成连接请求时才打开该选项，该选项会影响客户的使用
net.ipv4.tcp_abort_on_overflow = 1
EOF

# sysctl -p  /etc/sysctl.d/ceph.conf

## 修改资源限制参数
cat > /etc/security/limits.d/ceph.conf <<EOF
# End of file
*               hard    nofile         655360
*               soft    nofile         655360
*               soft    core           655360
*               hard    core           655360
*          soft    nproc     unlimited
root       soft    nproc     unlimited
EOF
```

6. 配置时间同步服务，以ceph01作为时间同步服务器

```shell
## 在ceph01上操作
# yum -y install chrony
# vi /etc/chrony.conf 
pool ntp.aliyun.com iburst
...
...
allow 192.168.59.0/24
allow 10.168.59.0/24
local stratum 10

# systemctl start chronyd && systemctl enable chronyd

## 在ceph02-ceph05上操作
# yum -y install chrony
# vi /etc/chrony.conf 
pool ceph01 iburst
...
# systemctl restart chronyd && systemctl enable chronyd;chronyc sources
MS Name/IP address         Stratum Poll Reach LastRx Last sample               
===============================================================================
^* ceph01                        3   6    17     8    -34us[  -28us] +/-   35ms
```

7. 配置ssh免密登录

```shell
## 在ceph01上操作
# ssh-keygen -t rsa
# ssh-copy-id ceph01
# ssh-copy-id ceph02
# ssh-copy-id ceph03
# ssh-copy-id ceph04
# ssh-copy-id ceph05

## 验证ssh免密，从ceph01登录ceph01-05看是否需要密码
# ssh ceph01
```

8. 安装containerd和docker

> [下载页](https://github.com/containerd/containerd/releases) 

```shell
## 先在ceph01上操作
## 直接下载：cri-containerd-1.7.2-linux-amd64.tar.gz，该包里面包含了containerd、 ctr、crictl、containerd-shim等二进制文件，还有启动命令等，只要在/下解压即可。
# tar xf cri-containerd-1.7.2-linux-amd64.tar.gz -C /

# cat > /etc/crictl.yaml << EOF
runtime-endpoint: unix:///var/run/containerd/containerd.sock
image-endpoint: unix:///var/run/containerd/containerd.sock
timeout: 10
debug: false
EOF

## 生成containerd配置文件
# mkdir /etc/containerd
# containerd config default > /etc/containerd/config.toml

## 修改 /etc/containerd/config.toml
## 把SystemdCgroup = false修改为：SystemdCgroup = true
# vi /etc/containerd/config.toml

## 调整日志
max_container_log_line_size = 163840
## 用于从安全上下文中提取设备所有权信息，kubevirt cdi依赖该参数，不设置该参数可能出现无权限
device_ownership_from_security_context = true
SystemdCgroup = true
```

> 修改/etc/systemd/system/containerd.service，将`LimitNOFILE=infinity`改为`LimitNOFILE=655360`

```shell
# systemctl enable containerd && systemctl restart containerd
## 使用 crictl info 查看配置是否生效

## 其他节点只需将相关文件拷贝过去启动即可
# 在ceph01上操作
# for i in {2..5};do scp -rp /usr/local/bin ceph0$i:/usr/local/;scp -rp /usr/local/sbin ceph0$i:/usr/local/;scp /etc/containerd ceph0$i:/etc/; scp /etc/systemd/system/containerd.service ceph0$i:/etc/systemd/system/;done

for i in {1..3};do scp -rp /usr/local/bin node0$i:/usr/local/;scp -rp /usr/local/sbin node0$i:/usr/local/;scp /etc/containerd node0$i:/etc/; scp /etc/systemd/system/containerd.service node0$i:/etc/systemd/system/;done
## 在ceph02-05上操作
# for i in {2..5};do cmd=$(systemctl daemon-reload && systemctl enable containerd && systemctl restart containerd);ssh ceph0$i "$cmd";done

for i in {1..3};do cmd=$(systemctl daemon-reload && systemctl enable containerd && systemctl restart containerd);ssh node0$i "$cmd";done
```

7. 安装docker

```shell
## 先在ceph01上操作
1). 下载docker安装包 https://download.docker.com/linux/static/stable/x86_64/docker-20.10.23.tgz
2). 解压 
# tar xf docker-20.10.23.tgz
3). 需要用到的二进制文件包括：docker 和 dockerd，拷贝到 /usr/bin/目录下即可。
# mv docker/docker* /usr/bin/
4). 创建 docker 用户 useradd -s /sbin/nologin docker   # 如果docker组存在，则使用 useradd -s /sbin/nologin docker -g docker
5). 启动的配置文件 docker.serivce 和 docker.socket 拷贝到 /usr/lib/systemd/system/，daemon.json文件放到/etc/docker目录
# cat > /usr/lib/systemd/system/docker.service  <<EOF
[Unit]
Description=Docker Application Container Engine
Documentation=https://docs.docker.com
After=network-online.target docker.socket firewalld.service containerd.service
Wants=network-online.target
Requires=docker.socket

[Service]
Type=notify
# the default is not to use systemd for cgroups because the delegate issues still
# exists and systemd currently does not support the cgroup feature set required
# for containers run by docker
# ExecStart=/usr/bin/dockerd --graph=/data/docker -H fd:// --containerd=/run/containerd/containerd.sock --cri-containerd --debug
ExecStart=/usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock --cri-containerd --debug
ExecReload=/bin/kill -s HUP \$MAINPID
TimeoutSec=0
RestartSec=2
Restart=always

# Note that StartLimit* options were moved from "Service" to "Unit" in systemd 229.
# Both the old, and new location are accepted by systemd 229 and up, so using the old location
# to make them work for either version of systemd.
StartLimitBurst=3

# Note that StartLimitInterval was renamed to StartLimitIntervalSec in systemd 230.
# Both the old, and new name are accepted by systemd 230 and up, so using the old name to make
# this option work for either version of systemd.
StartLimitInterval=60s

# Having non-zero Limit*s causes performance problems due to accounting overhead
# in the kernel. We recommend using cgroups to do container-local accounting.
# 可能会出现错误："Failed at step LIMITS spawning /usr/bin/dockerd: Operation not permitted"，则需要将LimitNOFILE=infinity 改成：LimitNOFILE=65530
LimitNOFILE=infinity
LimitNPROC=infinity
LimitCORE=infinity

# Comment TasksMax if your systemd version does not support it.
# Only systemd 226 and above support this option.
TasksMax=infinity

# set delegate yes so that systemd does not reset the cgroups of docker containers
Delegate=yes

# kill only the docker process, not all processes in the cgroup
KillMode=process

[Install]
WantedBy=multi-user.target
EOF

# cat > /usr/lib/systemd/system/docker.socket <<EOF
[Unit]
Description=Docker Socket for the API
PartOf=docker.service

[Socket]
ListenStream=/var/run/docker.sock
SocketMode=0660
SocketUser=root
SocketGroup=docker

[Install]
WantedBy=sockets.target
EOF

## 启动docker
# systemctl daemon-reload && systemctl enable docker --now

## 配置镜像加速和私有仓库
# cat > /etc/docker/daemon.json <<EOF
{
  "registry-mirrors": ["https://vty0b0ux.mirror.aliyuncs.com"],
  "exec-opts": ["native.cgroupdriver=systemd"],
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "500m"
  },
  "storage-driver": "overlay2",
  "insecure-registries": ["registry.demo.com","192.168.59.249:5000"]
}
EOF
# systemctl restart docker

## 在ceph01上操作
# for i in {2..5};do scp /usr/bin/docker* ceph0$i:/usr/bin/;scp -rp /etc/docker ceph0$i:/etc/;scp /usr/lib/systemd/system/docker.service ceph0$i:/usr/lib/systemd/system/;scp /usr/lib/systemd/system/docker.socket ceph0$i:/usr/lib/systemd/system/;done

for i in {2..3};do scp /usr/bin/docker* node0$i:/usr/bin/;scp -rp /etc/docker node0$i:/etc/;scp /usr/lib/systemd/system/docker.service node0$i:/usr/lib/systemd/system/;scp /usr/lib/systemd/system/docker.socket node0$i:/usr/lib/systemd/system/;done

## 在ceph02-05上操作
# useradd -s /sbin/nologin docker 
# systemctl daemon-reload && systemctl enable docker --now
```

8. 安装cephadm，O版开始就不再支持ceph-deploy工具

> [cephadm安装](https://docs.ceph.com/en/latest/cephadm/install/#install-cephadm)
> cephadm安装前提

- Python3 
- Systemd 
- Podman or Docker 
- Chrony or NTP
- LVM2 

> cephadm工作原理：cephadm命令管理ceph集群完整生命周期。包括创建引导集群，启动一个提供shell的容器来管理集群。cephadm使用ssh与集群各节点通信。
> cephadm bootstrap 就是在单一节点上创建一个小型的ceph集群，包括一个ceph monitor和一个ceph mgr，监控组件包括prometheus、node-exporter等。

```shell
## 在ceph所有点上执行
# CEPH_RELEASE=17.2.6 # replace this with the active release
# curl --silent --remote-name --location https://download.ceph.com/rpm-${CEPH_RELEASE}/el9/noarch/cephadm
# chmod +x cephadm 
# mv cephadm /usr/sbin/
## 执行cephadm install 会在当前节点上安装cephadm依赖相关的软件包，版本较低，所以不建议执行
# cephadm install
ERROR: Distro openeuler version 22.03 not supported
## 修改 /usr/sbin/cephadm ，在 
# vi /usr/sbin/cephadm 
## DISTRO_NAMES 这个字典中增加 openeuler
   7654     DISTRO_NAMES = {
   7655         'centos': ('centos', 'el'),
   7656         'rhel': ('centos', 'el'),
   7657         'scientific': ('centos', 'el'),
   7658         'rocky': ('centos', 'el'),
   7659         'openeuler': ('centos', 'el'),
   7660         'almalinux': ('centos', 'el'),
   7661         'ol': ('centos', 'el'),
   7662         'fedora': ('fedora', 'fc'),
   7663         'mariner': ('mariner', 'cm'),
   7664     }
   7665  
## 将 cephadm 文件拷贝到其他节点上  
# for i in {2..5};do scp -rp /usr/sbin/cephadm ceph0$i:/usr/sbin/;done
```

> 如果是Centos8，可直接yum源安装

````shell
# yum download cephadm
# rpm -ivh cephadm-17.2.6-0.el8.noarch.rpm
# rpm -ql cephadm-17.2.6-0.el8
/usr/sbin/cephadm
/usr/share/man/man8/cephadm.8.gz
/var/lib/cephadm
/var/lib/cephadm/.ssh
/var/lib/cephadm/.ssh/authorized_keys
````

> 如果是CentOS 7.9，先安装python3

```shell
# yum -y install python3

## 下载 cephadm，与CentOS8环境相同，修改python运行环境，注释原有的。
#! /usr/bin/python3 -s
##! /usr/libexec/platform-python -s
```

9. 检查ceph各节点是否满足安装ceph集群，该命令需要在当前节点执行，比如要判断ceph02是否支持安装ceph集群，则在ceph02上执行

```shell
# cephadm check-host --expect-hostname ceph02
docker (/usr/bin/docker) is present
systemctl is present
lvcreate is present
Unit chronyd.service is enabled and running
Hostname "ceph02" matches what is expected.
Host looks OK

## 也可以使用以下命令检查
# cephadm check-host --expect-hostname `hostname`
```

10. 初始化mon

> cephadm bootstrap 过程是在单一节点上创建一个小型的ceph集群，包括一个ceph monitor和一个ceph mgr，监控组件包括prometheus、node-exporter等。

```shell
cephadm bootstrap --mon-ip 192.168.59.241 --cluster-network 10.168.59.0/24 --initial-dashboard-user mxy --initial-dashboard-password ceph123
cephadm bootstrap --mon-ip 192.168.5.210 --allow-overwrite --skip-dashboard

## 初始化时，指定了mon-ip、集群网段、dashboard初始用户名和密码
# cephadm --image registry.demo.com/ceph/ceph:v17 \
bootstrap --mon-ip 192.168.59.241 \
--cluster-network 10.168.59.0/24 \
--initial-dashboard-user admin \
--initial-dashboard-password demo2023 \
--ssh-private-key /root/.ssh/id_rsa \
--ssh-public-key /root/.ssh/id_rsa.pub \
--registry-url registry.demo.com \
--registry-username admin \
--registry-password Harbor12345 

Creating directory /etc/ceph for ceph.conf
Verifying podman|docker is present...
Verifying lvm2 is present...
Verifying time synchronization is in place...
Unit chronyd.service is enabled and running
Repeating the final host check...
docker (/usr/bin/docker) is present
systemctl is present
lvcreate is present
Unit chronyd.service is enabled and running
Host looks OK
Cluster fsid: 2e1228b0-0781-11ee-aa8a-000c2921faf1
Verifying IP 192.168.59.241 port 3300 ...
Verifying IP 192.168.59.241 port 6789 ...
Mon IP `192.168.59.241` is in CIDR network `192.168.59.0/24`
Mon IP `192.168.59.241` is in CIDR network `192.168.59.0/24`
Pulling container image quay.io/ceph/ceph:v17...
Ceph version: ceph version 17.2.6 (d7ff0d10654d2280e08f1ab989c7cdf3064446a5) quincy (stable)
Extracting ceph user uid/gid from container image...
Creating initial keys...
Creating initial monmap...
Creating mon...
Waiting for mon to start...
Waiting for mon...
mon is available
Assimilating anything we can from ceph.conf...
Generating new minimal ceph.conf...
Restarting the monitor...
Setting mon public_network to 192.168.59.0/24
Setting cluster_network to 10.168.59.0/24
Wrote config to /etc/ceph/ceph.conf
Wrote keyring to /etc/ceph/ceph.client.admin.keyring
Creating mgr...
Verifying port 9283 ...
Waiting for mgr to start...
Waiting for mgr...
mgr not available, waiting (1/15)...
mgr not available, waiting (2/15)...
mgr not available, waiting (3/15)...
mgr not available, waiting (4/15)...
mgr is available
Enabling cephadm module...
Waiting for the mgr to restart...
Waiting for mgr epoch 5...
mgr epoch 5 is available
Setting orchestrator backend to cephadm...
Generating ssh key...
Wrote public SSH key to /etc/ceph/ceph.pub
Adding key to root@localhost authorized_keys...
Adding host ceph01...
Deploying mon service with default placement...
Deploying mgr service with default placement...
Deploying crash service with default placement...
Deploying prometheus service with default placement...
Deploying grafana service with default placement...
Deploying node-exporter service with default placement...
Deploying alertmanager service with default placement...
Enabling the dashboard module...
Waiting for the mgr to restart...
Waiting for mgr epoch 9...
mgr epoch 9 is available
Generating a dashboard self-signed certificate...
Creating initial admin user...
Fetching dashboard port number...
Ceph Dashboard is now available at:

             URL: https://ceph01:8443/
            User: admin
        Password: p5tuqo17we

Enabling client.admin keyring and conf on hosts with "admin" label
Saving cluster configuration to /var/lib/ceph/2e1228b0-0781-11ee-aa8a-000c2921faf1/config directory
Enabling autotune for osd_memory_target
You can access the Ceph CLI as following in case of multi-cluster or non-default config:

        sudo /usr/sbin/cephadm shell --fsid 2e1228b0-0781-11ee-aa8a-000c2921faf1 -c /etc/ceph/ceph.conf -k /etc/ceph/ceph.client.admin.keyring

Or, if you are only running a single cluster on this host:

        sudo /usr/sbin/cephadm shell 

Please consider enabling telemetry to help improve Ceph:

        ceph telemetry on

For more information see:

        https://docs.ceph.com/docs/master/mgr/telemetry/

# ls /etc/ceph/
ceph.client.admin.keyring  ceph.conf  ceph.pub  rbdmap
```

```shell
## 指定dashboard用户名和密码  
--initial-dashboard-user  admin 
--initial-dashboard-password demo2023
##  指定私钥和公钥
--ssh-private-key /root/.ssh/id_rsa
--ssh-public-key /root/.ssh/id_rsa.pub
## 启动前不拉取默认镜像
--skip-pull

## 指定私有镜像仓库
--registry-url registry.demo.com \
--registry-username admin \
--registry-password Harbor12345 

## 需要指定监控组件镜像
ceph config set mgr mgr/cephadm/container_image_prometheus registry.demo.com/prometheus/prometheus:v2.33.4
ceph config set mgr mgr/cephadm/container_image_grafana registry.demo.com/ceph/ceph-grafana:8.3.5
ceph config set mgr mgr/cephadm/container_image_alertmanager registry.demo.com/prometheus/alertmanager:v0.23.0
ceph config set mgr mgr/cephadm/container_image_node_exporter registry.demo.com/prometheus/node-exporter:v1.3.1
```

- ceph.client.admin.keyring  是具有ceph管理员的秘钥
- ceph.conf  是最小化配置文件
- ceph.pub  是一个公钥，拷贝到其他节点后，可以免密登录。

> 在5个以上ceph节点时，默认会将其中5个节点当做mon，这可以从`ceph orch ls`中看出来

```shell
# ceph orch ls
NAME           PORTS        RUNNING  REFRESHED  AGE  PLACEMENT  
alertmanager   ?:9093,9094      1/1  7m ago     46m  count:1    
crash                           1/1  7m ago     46m  *          
grafana        ?:3000           1/1  7m ago     46m  count:1    
mgr                             1/2  7m ago     46m  count:2    
mon                             1/5  7m ago     46m  count:5    
node-exporter  ?:9100           1/1  7m ago     46m  *          
prometheus     ?:9095           1/1  7m ago     46m  count:1   
```

> 初始化mon后，此时集群还处于WARN状态，没有OSD，MON的数量也才只有1个，MGR也只有1个，所以接下来就是先添加ceph节点。

```shell
sudo /usr/sbin/cephadm shell --fsid 081e7500-01f4-11ef-b254-b32273ab02d2 -c /etc/ceph/ceph.conf -k /etc/ceph/ceph.client.admin.keyring

Or, if you are only running a single cluster on this host:

	sudo /usr/sbin/cephadm shell 

Please consider enabling telemetry to help improve Ceph:

	ceph telemetry on

# ceph -s
  cluster:
    id:     67ccccf2-07f6-11ee-a1c2-000c2921faf1
    health: HEALTH_WARN
            OSD count 0 < osd_pool_default_size 3
 
  services:
    mon: 1 daemons, quorum ceph01 (age 9m)
    mgr: ceph01.sdqukl(active, since 7m)
    osd: 0 osds: 0 up, 0 in
 
  data:
    pools:   0 pools, 0 pgs
    objects: 0 objects, 0 B
    usage:   0 B used, 0 B / 0 B avail
    pgs:     
```

11. 添加ceph节点

> 将ceph镜像导出到其他ceph节点上

```shell
# docker images  |grep -v "REPOSITORY" |awk '{print $1":"$2}' |xargs docker save -o ceph-images.tar 
# for i in {2..5};do scp ceph-images.tar ceph0$i:/root/;done
for i in {2..3};do scp ceph-images.tar node0$i:/root/;done

## 在ceph02-05上导入镜像
# docker load -i ceph-images.tar
```

>将ceph.pub公钥拷贝到其他ceph节点

```shell
# ssh-copy-id -f -i /etc/ceph/ceph.pub ceph02
# ssh-copy-id -f -i /etc/ceph/ceph.pub ceph03
# ssh-copy-id -f -i /etc/ceph/ceph.pub ceph04
# ssh-copy-id -f -i /etc/ceph/ceph.pub ceph05

## 也可以用以下命令拷贝，在ceph01上操作
# for i in {2..5};do ssh-copy-id -f -i /etc/ceph/ceph.pub ceph0$i;done
```

> 使用cephadm将主机添加到存储集群中,执行添加节点命令后，会在目标节点拉到ceph/node-exporter镜像，需要一定时间，所以可提前在节点上将镜像导入。

```shell
# cephadm shell ceph orch host add ceph02 192.168.59.242 --labels=mon,mgr
# ceph orch host add ceph03 192.168.59.243 --labels=mon
# ceph orch host add ceph04 192.168.59.244
# ceph orch host add ceph05 192.168.59.245
```

> 查看加入到集群的节点

```shell
# ceph orch host ls
HOST    ADDR            LABELS   STATUS  
ceph01  192.168.59.241  _admin           
ceph02  192.168.59.242  mon mgr          
ceph03  192.168.59.243  mon              
ceph04  192.168.59.244                   
ceph05  192.168.59.245                   
5 hosts in cluster
```

12. 给节点添加标签、删除标签

> 给节点打上指标标签后，后续可以按标签进行编排。
>
> 给节点打_admin标签，默认情况下，_admin标签应用于存储集群中的 bootstrapped 主机， client.admin密钥被分发到该主机(ceph orch client-keyring {ls|set|rm})。
> 将这个标签添加到其他主机后，其他主机的/etc/ceph下也将有client.admin密钥。

```shell
## 给 ceph02、ceph03加上 _admin 标签  
# ceph orch host label add ceph02 _admin
# ceph orch host label add ceph03 _admin

## 给 ceph01-ceph04加上 mon 标签 
# ceph orch host label add ceph01 mon
# ceph orch host label add ceph02 mon
# ceph orch host label add ceph03 mon
# ceph orch host label add ceph04 mon

## 给 ceph01、ceph02加上 mgr 标签 
#  
# ceph orch host label add ceph02 mgr

## 列出节点，查看节点上标签
# ceph orch host ls
HOST    ADDR            LABELS          STATUS  
ceph01  192.168.59.241  _admin mon mgr          
ceph02  192.168.59.242  mon mgr _admin          
ceph03  192.168.59.243  mon _admin              
ceph04  192.168.59.244  mon                     
ceph05  192.168.59.245                          
5 hosts in cluster
```

> 删除标签
> 注意：删除节点上的_admin标签，并不会删除该节点上已有的`ceph.client.admin.keyring`密钥文件

```shell
ceph orch host label rm ceph03 label=_admin
```

13. 添加osd

> 说明：添加OSD时，建议将磁盘先格式化为无分区的原始磁盘

```shell
## https://rook.github.io/docs/rook/v1.10/Getting-Started/ceph-teardown/?h=sgdisk#zapping-devices
DISK="/dev/sdX"

## Zap the disk to a fresh, usable state (zap-all is important, b/c MBR has to be clean)
sgdisk --zap-all $DISK

## Wipe a large portion of the beginning of the disk to remove more LVM metadata that may be present
dd if=/dev/zero of="$DISK" bs=1M count=100 oflag=direct,dsync

## SSDs may be better cleaned with blkdiscard instead of dd
blkdiscard $DISK

## Inform the OS of partition table changes
partprobe $DISK
```

```shell
## 查看各ceph节点有哪些磁盘是可用的，关注`AVAILABLE`列
# ceph orch device ls
HOST    PATH          TYPE  DEVICE ID                                             SIZE  AVAILABLE  REFRESHED  REJECT REASONS  
ceph01  /dev/nvme0n2  ssd   VMware_Virtual_NVMe_Disk_VMware_NVME_0000             107G  Yes        17m ago                    
ceph01  /dev/sda      hdd   VMware_Virtual_SATA_Hard_Drive_00000000000000000001   107G  Yes        17m ago                    
ceph02  /dev/nvme0n2  ssd   VMware_Virtual_NVMe_Disk_VMware_NVME_0000             107G  Yes        18m ago                    
ceph02  /dev/sda      hdd   VMware_Virtual_SATA_Hard_Drive_00000000000000000001   107G  Yes        18m ago                    
ceph03  /dev/nvme0n2  ssd   VMware_Virtual_NVMe_Disk_VMware_NVME_0000             107G  Yes        25m ago                    
ceph03  /dev/sda      hdd   VMware_Virtual_SATA_Hard_Drive_00000000000000000001   107G  Yes        25m ago                    
ceph04  /dev/nvme0n2  ssd   VMware_Virtual_NVMe_Disk_VMware_NVME_0000             107G  Yes        17m ago                    
ceph04  /dev/sda      hdd   VMware_Virtual_SATA_Hard_Drive_00000000000000000001   107G  Yes        17m ago                    
ceph05  /dev/nvme0n2  ssd   VMware_Virtual_NVMe_Disk_VMware_NVME_0000             107G  Yes        17m ago                    
ceph05  /dev/sda      hdd   VMware_Virtual_SATA_Hard_Drive_00000000000000000001   107G  Yes        17m ago  

## 接下来初始化osd
## 将指定的磁盘格式化为无分区的原始磁盘
# blkdiscard /dev/nvme0n2
# cephadm shell ceph orch device zap ceph01 /dev/sda
## 接着初始化其他节点上磁盘
...

## 添加OSD
# ceph orch daemon add osd ceph01:/dev/nvme0n2
# ceph orch daemon add osd ceph01:/dev/sda
# ceph orch daemon add osd ceph02:/dev/nvme0n2
# ceph orch daemon add osd ceph02:/dev/sda  
# ceph orch daemon add osd ceph03:/dev/nvme0n2
# ceph orch daemon add osd ceph03:/dev/sda  
# ceph orch daemon add osd ceph04:/dev/nvme0n2
# ceph orch daemon add osd ceph04:/dev/sda  
# ceph orch daemon add osd ceph05:/dev/nvme0n2
# ceph orch daemon add osd ceph05:/dev/sda             
```

14. 添加池

```shell
# ceph osd pool create ssdpool 256 256 
# ceph osd pool create hddpool 256 256
## 列出池
# ceph osd lspools
1 .mgr
2 ssdpool
3 hddpool
```

15. 创建规则以使用该设备

```shell
# ceph osd crush rule create-replicated ssd default host ssd
# ceph osd crush rule create-replicated hdd default host hdd
## 查看池规则
# ceph osd crush rule ls
replicated_rule
ssd
hdd
```

16. 将池设置为使用规则

```shell
ceph osd pool set ssdpool crush_rule ssd
ceph osd pool set hddpool crush_rule hdd
```

17. 删除池

```shell
## 删除池时，池的名字要输入2次
# ceph osd pool rm testpool --yes-i-really-really-mean-it
Error EPERM: WARNING: this will *PERMANENTLY DESTROY* all data stored in pool testpool.  If you are *ABSOLUTELY CERTAIN* that is what you want, pass the pool name *twice*, followed by --yes-i-really-really-mean-it.

# ceph osd pool rm testpool testpool --yes-i-really-really-mean-it
```


18. MDS守护进程用于Cephfs(文件系统)，MDS采用的是主备模式，即cephfs仅使用1个活跃的MDS守护进程，配置MDS服务有多种方法，此处介绍2种，大同小异。

> 先创建CephFS，然后使用placement部署MDS

```shell
## 1. 先创建CephFS池
# ceph osd pool create cephfs_data 128 128
# ceph osd pool create cephfs_metadata 64 64

## 2. 为数据池和元数据池创建文件系统
# ceph fs new cephfs cephfs_metadata cephfs_data
new fs with metadata pool 5 and data pool 4

## 3. 使用ceph orch apply 命令部署MDS服务
# ceph orch apply mds cephfs --placement="3 ceph01 ceph02 ceph03"
Scheduled mds.cephfs update...

## 最后查看状态
# ceph fs ls
name: cephfs, metadata pool: cephfs_metadata, data pools: [cephfs_data ]

# ceph fs status

# ceph orch ps --daemon_type=mds


# ceph -s

## 列出服务
# ceph orch ls
```

19. 可以删除不需要的组件

```shell
ceph orch rm prometheus
ceph orch rm grafana
ceph orch rm alertmanager
ceph orch rm node-exporter

```