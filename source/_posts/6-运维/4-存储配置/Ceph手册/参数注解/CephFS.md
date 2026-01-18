---
title: Ceph参数注解-CephFS
categories:
  - 存储
  - 分布式存储
  - Ceph
tags:
  - 存储
  - 分布式存储
  - Ceph
mathjax: true
abbrlink: 2245133153
date: 2024-06-24 14:04:16
---

[TOC]

<!--more-->


## Ceph 文件系统

`filer_max_purge_ops` ：用于清除 stripe 的范围（例如，MDS 日志）的最大未完成中操作

`filer_max_truncate_ops` ：截断/删除条带化序列的最大动态操作数



`mds_health_cache_threshold` ：mds缓存占用内存量超过limit*当前阈值则报警

`mds_cache_reservation` ：为mds缓存预留的内存百分比



`mds_beacon_interval` ：MDS向监控器发送信标消息的时间间隔

`mds_beacon_grace` ：MDS向mon发送信标（beacon）的容忍时间，在interval时间内没有收到信标，系统会等待这个参数指定的时间，如果这段时间内信标恢复发送，系统会认为MDS正常运行

`mds_heartbeat_grace` ：MDS心跳在预期的间隔内未发生，系统会等待这个参数的时间，如果这段时间内心跳恢复正常，则认为系统是健康的

`mds_tick_interval` ：MDS执行维护任务的时间间隔



## Fuse

Ceph FUSE 是 Ceph 文件系统的一种实现方式，利用 FUSE（Filesystem in Userspace）来将 CephFS 挂载为本地文件系统。FUSE 允许用户在用户空间创建文件系统，避免了在内核空间实现文件系统的复杂性，同时提供了灵活性和便于开发的环境。

### 使用 Ceph FUSE 挂载 CephFS

1. 安装Ceph 和 FUSE

   确保系统已经安装了 Ceph 客户端和 FUSE。可以使用包管理器安装，例如在基于 Debian 的系统上使用 `apt-get`：

   ```shell
   sudo apt-get install ceph ceph-fuse
   ```

2. 配置Ceph客户端

   创建或编辑 Ceph 配置文件（通常位于 `/etc/ceph/ceph.conf`），确保配置正确指向 Ceph 集群。

3. 获取Ceph身份认证密钥

   确保有访问 CephFS 的适当权限，可以使用以下命令创建密钥文件：

   ```shell
   sudo ceph auth get-or-create-key client.admin -o /etc/ceph/ceph.client.admin.keyring
   ```

4. 挂载CephFS

   使用 ceph-fuse 命令挂载 CephFS，指定挂载点和相关参数：

   ```shell
   sudo ceph-fuse -m <monitors>:/ /mnt/cephfs -k /etc/ceph/ceph.client.admin.keyring
   ```

5. 验证挂载：

   挂载成功后，可以使用 `df -h` 或者 `mount` 命令查看挂载状态，验证 CephFS 已正确挂载：

### 特点

**用户空间文件系统**：

- 通过 FUSE，CephFS 可以在用户空间实现，简化了文件系统的开发和维护。
- 避免了内核模块的复杂性和潜在的内核崩溃风险。

**灵活性和易用性**：

- 用户无需特殊权限即可挂载和管理文件系统。
- 提供了与传统文件系统相似的使用体验，方便用户操作和管理。

**便于调试和开发**：

- 由于在用户空间运行，开发者可以方便地调试和修改文件系统代码。
- 支持快速迭代和改进。

### fuse参数分析

`fuse_use_invalidate_cb` ：使用 Fuse 2.8+ Invalidate 回调来保持页面缓存一致

`fuse_disable_pagecache` ：在此 FUSE 挂载的内核中禁用页面缓存

`fuse_set_user_groups` ：用于控制挂载点的用户组设置。这个参数可以影响 FUSE 文件系统的权限管理和用户访问控制。

- 检查 ceph-fuse 以考虑权限的补充组

**作用**：该选项允许在挂载 FUSE 文件系统时设置特定用户组的权限，从而控制哪些用户或用户组可以访问挂载的文件系统。

**用途**：常用于提高文件系统的安全性和访问控制，确保只有特定的用户或用户组能够访问或修改挂载点。







## client

### 更新客户端配置

某些客户端配置可以在运行时应用。要检查配置参数是否可以在运行时应用（受客户端影响），请使用 config help 命令：

```shell
ceph config help debug_client

 debug_client - Debug level for client
 (str, advanced)                                                                                                                      Default: 0/5
 Can update at runtime: true

 The value takes the form 'N' or 'N/M' where N and M are values between 0 and 99.  N is the debug level to log (all values below this are included), and M is the level to gather and buffer in memory.  In the event of a crash, the most recent items <= M are dumped to the log file.
```

- *config help* 告诉您是否可以在运行时应用给定的配置以及默认值和配置参数的描述。

要在运行时更新配置选项，请使用 config set 命令：

```shell
ceph config set client debug_client 20/20
```

要检查配置的选项，请使用 config get 命令：

```shell
ceph config get client
 WHO    MASK LEVEL    OPTION                    VALUE     RO
 client      advanced debug_client              20/20
 global      advanced osd_pool_default_min_size 1
 global      advanced osd_pool_default_size     3
```

### 参数配置项

`client_acl_type` ：设置ACL类型

- 目前，唯一可能的值为“posix_acl”以启用 POSIX ACL，或空字符串。
- 该选项仅在fuse_default_permissions设置为false时生效。

`client_cache_mid` ：设置客户端缓存中点。中点将最近最少使用的列表分为hot list和 warm list。

```cpp
# src/include/lru.h
class LRU{
    void lru_set_midpoint(double f) { midpoint = fmin(1.0, fmax(0.0, f)); }
}
```

`client_oc_size` ：对象缓存的最大大小

`client_oc_max_dirty` ：对象缓存中脏页的最大大小

`client_oc_target_dirty` ：脏页对象缓存的目标大小



`client_oc_max_objects` ：缓存中的最大对象数
