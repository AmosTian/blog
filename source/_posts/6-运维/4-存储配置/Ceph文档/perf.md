---
title: Ceph文档-perf
categories:
  - 存储
  - 分布式存储
  - Ceph
tags:
  - 存储
  - 分布式存储
  - Ceph
mathjax: true
abbrlink: 264332190
date: 2025-02-27 10:37:43
---

[TOC]

<!--more-->

https://docs.ceph.com/en/latest/dev/perf_counters

## Perf counter 介绍

`perf counters` 为仪表盘和计数器提供通用的内部统计结构。计数值都是整数或浮点数。还有一种 type 为 "average" 的计数器，是"sum" 和 "num" 这两个计数器相除得到的。

该架构的目的是用 collectd 或 statsd 之类的工具收集和汇总这些数据，然后输入到 graphite 之类的工具中进行绘图分析。

用户和开发人员还可以本地访问性能计数器数据，以检查集群的整体运行状况、识别工作负载模式、按守护进程类型监控集群性能以及解决延迟、限制、内存管理等问题。

### 获取方式

```shell
ceph daemon osd.0 perf schema
ceph daemon osd.0 perf dump
```

### 结果

Counter 值以集合方式分组，每个集合表示一个子系统或子系统实例(AsyncMessenger)。
如：内部的 `throttle` 机制报告其限流方面的统计量，每个实例命名类似于：

```
throttle-msgr_dispatch_throttler-hbserver
throttle-msgr_dispatch_throttler-client
throttle-filestore_bytes
...
```

### Schema

`perf schema` 指令以 json 格式导出每个 counter 的描述、可获取值以及这些值的类型。

`type` 字段是位字段，每位的含义如下

| bit  | meaning                                |
| ---- | -------------------------------------- |
| 1    | 浮点数                                 |
| 2    | unsigned 64-bit integer                |
| 4    | 均值 average (sum + count pair), where |
| 8    | 计数值 counter (vs 度量值gauge)        |

每个值都需要设置取值类型 bit 1 或 2 分别表示 float 或 int

Bit 8 设置，则表示该值是计数型，counter，该值单调增，需要读者减去之前读取的值来获得前一个间隔内的增量。

Bit 4 设置，则表示该值是平均值，average，需要读取两个值 sum 和 count。
- 如果它是一个 counter，则前一个间隔的平均值将是 sum 增量（自上次读取以来）除以 counter 增量。
- 否则，直接将 sum 与 counter 相除，可以得到均值
通常这些用于度量时延（请求数和请求时延和），而前一个间隔的平均值才是有意义的。

`metric_type` 字段的取值为 gauge 或 counter，

`value type` 字段的取值为： `real`, `integer`, `real-integer-pair` 和 `integer-integer-pair`

- `real-integer-pair` 取值是三键值对的对象， {"avgcount": 0, "sum": 0.0, "avgtime": 0.0}
- `integer-integer-pair` 取值是两键值对的对象，{"avgcount": 133, "sum": 1087}

其中，real-integer-pair 和 integer-integer-pair 全是 gauge

`metric_type` 为 counter，则 `value_type` 一定为 Integre
gauge 则取值类型任意。


处理：如果是 real- 则两个键值

如果 integre，则三个键值

如果是 counter ，则累加
如果是 gauge，取均值

### Dump

`perf dump` 的输出结构与 `perf schema` 类似， `type` 位值含 4 的（均值型）以对象形式分组


## 详解

https://docs.redhat.com/zh-cn/documentation/red_hat_ceph_storage/5/html/administration_guide/access-to-ceph-performance-counters_admin#access-to-ceph-performance-counters_admin

### AsyncMessenger

> 网络异步消息通信器

涉及从网络（接收、发送）的消息数量、字节数、总时长

若同一子系统含多个同名组件
Counter 累加，gauge 取最大值

### MON

#### Cluster

> 集群状态统计信息


包括集群 mon、osd、mds、pg 等子系统的总数及各种状态下的数量、集群容量情况、集群内对象情况统计（总数和各状态统计）

- Mon 数、仲裁所需 mon 数
- OSD 数、in OSD 数、up OSD 数、OSD map epoch 数、池数
	- 集群总存储容量、已用容量、剩余容量
	- PG 数、active+clean PG 数、active PG 数、peering PG 数
- 集群内对象数、各状态对象数
	- Degraded 对象数、misplaced 对象数、unfound 对象数
	- 所有对象占用的空间大小
- MDS 数、up MDS 数、in MDS 数、failed MDS 数、mds epoch

### Mon 内事件统计

Session 总数与各类 session 数

- Session_add、session_rm、session_trim

选举情况

- 选举总数 num_elections、选举各种情况：election_call、election_win、election_lose

一致性协议 paxos





### 各队列

#### finisher-mon_finisher
#### finisher-monstore

队列长度
完成时延
- 请求数
- 总时延
- 平均时延

$Avgtime =\frac{sum}{avgcount}$


```shell
{
  "mon.cluster.osd_epoch": 45,
  "mon.cluster.osd_bytes": 64420315136,
  "mon.cluster.osd_bytes_used": 1079771136,
  "mon.cluster.osd_bytes_avail": 63340544000,
  "mgr.AsyncMessenger.msgr_recv_bytes": 188638,
  "mgr.AsyncMessenger.msgr_send_bytes": 256923,
  "osd.bluestore.kv_flush_lat.avgtime": 5.078122912502712e-07,
  "osd.bluestore.kv_commit_lat.avgtime": 0.0004914065346178876,
  "osd.bluestore.state_kv_queued_lat.avgtime": 0.00045374891798614307,
  "osd.throttle-bluestore_throttle_bytes.put": 603597,
  "osd.throttle-bluestore_throttle_bytes.put_sum": 1395872233572,
  "osd.throttle-bluestore_throttle_bytes.wait.avgtime": 0.00010405905,
  "mds.mds.traverse_hit": 6744,
  ...
}
```