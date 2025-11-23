## 系统安装与配置



### 网络配置

关闭防火墙

关闭SELinux

关闭NetworkManager

```shell
systemctl stop NetworkManager
systemctl disable NetworkManager
```

ssh配置

```shell
```









## 安装所需的服务

```shell
yum install gcc gcc-c++ make autoconf readline readline-devel vim-enhanced openssh-clients

yum install lrzsz net-tools -y
```





## 安装NFS服务器

```shell
yum install -y nfs-utils rpcbind

# 设置共享目录，设置为完全共享目录
[root@node ~]# mkdir /home/nfs
[root@node ~]# chmod -R u=rwx,g=rwx,o=rwx /home/nfs
[root@node home]# chown nfsuser.nfsuser /home/nfs

# 新增共享用户
所有客户机用户如果未指定，在访问NFS服务端时，都会被映射为nobody用户。如果要让客户端的用户在读写的共享目录上有写的权利，必须设置一个用户，将所有客户端用户映射为该用户，以获取对服务端的操作权限
[root@node ~]# useradd -u 1100 -s /sbin/nologin -M nfsuser
[root@node ~]# id nfsuser
[root@node ~]# passwd nfsuser
更改用户 usershare 的密码 。
新的 密码：135qetadg
重新输入新的 密码：135qetadg
[root@node ~]# id nfsuser 
uid=1100(nfsuser) gid=1100(nfsuser) 组=1100(nfsuser)


# 编辑exports文件
[root@node home]# vim /etc/exports
/home/nfs 192.168.100.191/16(rw,sync,no_all_squash,insecure,anonuid=1100,anongid=1100)

# 启动NFS
[root@node ~]# systemctl start rpcbind
[root@node ~]# systemctl status rpcbind
● rpcbind.service - RPC Bind
   Loaded: loaded (/usr/lib/systemd/system/rpcbind.service; enabled; >
   Active: active (running) since Tue 2025-09-30 22:51:51 CST; 6min a>
     Docs: man:rpcbind(8)
 Main PID: 1088 (rpcbind)
    Tasks: 1 (limit: 98884)
   Memory: 1.9M
   CGroup: /system.slice/rpcbind.service
           └─1088 /usr/bin/rpcbind -w -f

9月 30 22:51:51 node systemd[1]: Starting RPC Bind...
9月 30 22:51:51 node systemd[1]: Started RPC Bind.
[root@node ~]# systemctl enable rpcbind
[root@node ~]# systemctl start nfs-server.service
[root@node ~]# systemctl enable nfs-server.service 
Created symlink /etc/systemd/system/multi-user.target.wants/nfs-server.service → /usr/lib/systemd/system/nfs-server.service.

# 配置校验
root@node home]# showmount -e
Export list for node:
/home/nfs 192.168.100.191/16
```





## 客户端挂载

```shell
mount -t nfs 192.168.100.191:/home/nfs /mnt -o proto=tcp -o nolock
```



