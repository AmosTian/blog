---
title: Ceph参数注解-MON
categories:
  - 存储
  - 分布式存储
  - Ceph
tags:
  - 存储
  - 分布式存储
  - Ceph
mathjax: true
abbrlink: 2744181762
date: 2024-06-24 14:04:16
---

[TOC]

<!--more-->

## 引导参数

### network

`host` ：默认使用主机短名称 `hostname -s` 的输出

`public_addr` ：要绑定到的面向公众的地址

`public_addrv` ：同 `public_addr`

`public_bind_addr` 

`cluster_addr` ：要绑定到的面向群集的地址

`public_network` ：从中选择要绑定到的公共地址的网络

`public_network_interface` ：从public_network中选择要绑定到的地址的接口名称;还必须指定public_network

`cluster_network` ：从中选择要绑定到的群集地址的网络

`cluster_network_interface` ：从cluster_network中选择要绑定到的地址的接口名称;还必须指定cluster_network

`openssl_engine_opts` ： 将引擎用于特定的 openssl 算法

- 通过以下方式选择：

  ```
  engine_id=engine1，dynamic_path=somepathengine1.so，default_algorithms=DIGESTS：engine_id=engine2，dynamic_path=somepathengine2.so，default_algorithms=CIPHERS，other_ctrl=other_value
  ```


### bootstrap-mon

`fsid` ：集群的 uuid

`monmap` ：MonMap文件的路径，不能运行时修改

- 此参数通常在 mkfs 期间使用，但也可用于识别要连接到的监视器

`mon_host` ：用逗号、空格或分号分隔的 IP 地址或主机名的列表。主机名通过 DNS 解析。所有 A 和 AAAA 记录都包含在搜索列表中。

`mon_host_override` 这是 Ceph 进程首次与 Ceph 集群建立通信时最初联系的监视器列表。使用这些旧Ceph集群实例所在主机中的monmap覆盖新的monmap

`mon_dns_srv_name` ：要检查监视器地址的 DNS SRV 记录的名称

`mon_initial_members` ：mon集群的成员，集群启动时初始Monitor的ID。如果指定，Ceph 需要奇数个监视器来形成初始法定人数（例如 3）。

### bootstrap-osd

`osd_uuid` ：新OSD进程的uuid

- Ceph OSD 守护进程的通用唯一标识符 (UUID)。

- osd_uuid 适用于单个 Ceph OSD 守护进程。 fsid 适用于整个集群。

`osd_data` ：OSD 数据的路径

- OSD 数据的路径。部署 Ceph 时必须创建该目录。您应该在此安装点安装 OSD 数据的驱动器。我们不建议更改默认值。

`osd_max_write_size` ：RADOS 写入操作的最大大小（以 MB 为单位）

- 此设置可防止客户端对 RADOS 执行非常大的写入操作。如果将此值设置为低于客户端预期的值，则在尝试写入群集时，客户端将收到错误。

`osd_max_object_size` ：RADOS 对象的最大大小（以字节为单位）。

`osd_client_message_size_cap` ：内存中允许的最大客户端数据请求消息。

- 如果超过此值，则在释放内存之前，OSD 不会从网络中读取任何新的客户端数据。

`osd_class_dir` ：RADOS 类插件的类路径。





### cephadm

`container_image` ：容器docker 镜像（由 CEPHADM Orchestrator 使用）





### cluster

`no_config_file` ：表示我们不需要存在配置文件

- 指定后，我们不会查找配置文件，而是期望我们工作所需的任何选项或值都将作为参数传递。





### daemon

`run_dir` ：用于存储 PID 和套接字文件的“run”目录的路径

`admin_socket` ：用于在守护进程上执行管理命令的套接字文件路径，由“ceph daemon”命令使用，无论 Ceph Monitor 是否已建立仲裁。

`admin_socket_mode` ：为管理套接字文件设置的文件模式，例如“0755”

`daemonize` ：启动后是否守护（后台）

`pid_file` ：写入 PID 文件的路径（如果有）

- mon、osd 或 mds 将在其中写入其 PID 的文件。
- `/var/run/$cluster/$type.$id.pid`  将为 ceph 集群中运行的 id a 的 mon 创建 /var/run/ceph/mon.a.pid 
- 当守护进程正常停止时，pid 文件将被删除。
- 如果进程未守护进程（即使用 -f 或 -d 选项运行），则不会创建 pid 文件。

`chdir` ：守护进程化后的chdir(2)的路径

- 一旦 Ceph 守护进程启动并运行，其目录就会更改。推荐使用默认的根目录/。

`fatal_signal_handlers` ：如果设置，我们将为 SEGV、ABRT、BUS、ILL、FPE、XCPU、XFSZ、SYS 信号 安装信号处理程序以生成有用的日志消息

- 是否为dump 堆栈的 SIGABRT 等信号 注册处理程序
- 这通常适用于守护程序和库的值



### user

`setuser` ：启动时要切换到的 uid 或用户名，这通常由 systemd 单元文件指定

`setgroup` ：启动时要切换到 GID 或组名称，

`setuser_match_path` ：如果指定了 setuser 或 setgroup，并且此选项为非空，则仅当此选项指定的文件或目录具有匹配的 uid 和 gid 时，才会更改守护程序的 uidgid。这主要是为了允许切换到 OSD 的ceph用户 ，以升级后 osd 数据内容是否也被 chother 为条件。这通常由 systemd 单元文件指定。





### data_path

`crash_dir` ：存档崩溃报告的目录

`erasure_code_dir` ：可以找到纠删码插件的目录





### restapi

`restapi_log_level` ：默认由python代码设置

- restapi的日志级别

`restapi_base_url` ：默认由python代码设置

- restapi的base url

### keys

`key` ：身份验证密钥

- CephX 身份验证密钥，base64 编码

`keyfile` ：包含密钥的文件的路径

- 该文件应包含 CephX 身份验证密钥和可选的尾随换行符，但不能包含其他任何内容。

`keyring` ：keyring文件的路径

- keyring 是 INI-style 的格式化文件，其中部分名称是客户端或守护程序名称（例如，“osd.0”），每个部分都包含一个以 CephX 身份验证密钥为值的“key”属性。

### heartbeat

`heartbeat_interval` ：内部心跳检测的频率（秒）

`heartbeat_file` ：用于 touch 内部心跳检测的文件

- 如果设置，则每次内部心跳检测信号成功时都会touch到此文件。



## networks

每个mon进程都需要被绑定到特定的IP地址上，这些IP地址通常用部署工具配置，Ceph集群中其他组件通过 `[global] mon_host` 参数配置项发现mon进程。

MGR、OSD 和 MDS 守护程序将绑定到任何可用地址，并且不需要任何特殊配置。

### bind

> bind相关的参数用于各进程的IP绑定

`ms_bind_ipv4` ：将服务绑定到 IPv4 地址

- `ms_bind_prefer_ipv4` ：首选 IPV4 而不是 IPV6 地址

`ms_bind_ipv6` ：将服务绑定到IPv6地址

`ms_bind_msgr1` ：将服务绑定到 msgr1（旧版）协议地址

`ms_bind_msgr2` ：将服务器绑定到 msgr2 （nautilus+） 协议地址

`ms_bind_port_min` ：要绑定守护程序的最低端口号

`ms_bind_port_max` ：要绑定守护程序的最高端口号

- `ms_bind_port_min` < `ms_bind_port_max`

`ms_bind_retry_count` ：binding 到端口时的尝试次数

`ms_bind_retry_delay` ：2次 bind 尝试之间的延迟（秒）

`ms_bind_before_connect` ：在客户端套接字上调用 bind



### messenger

> **messenger 是一个用于实现集群内节点间通信的协议**，Ceph的各个守护进程之间需要频繁地交换信息，以协调数据存储、副本管理、故障检测和恢复等操作。基于 Messenger，Ceph 能够有效地管理集群中的信息流动，如：进程间通信、心跳消息同步、日志消息、请求处理、进程状态更新等。

> 【14.2.8】
>
> 支持三种消息器类型（ “simple”, “async” , “xio”）。后两种处于实验阶段，不应该被用于生产环境
>
> https://docs.ceph.com/en/nautilus/dev/messenger/#messenger-notes

#### ms_async

`ms_type` ：Async Messenger 使用的传输类型。可以是 async+posix、async+dpdk 或 async+rdma。https://docs.ceph.com/en/quincy/rados/configuration/network-config-ref/#confval-ms_type

- 其取值影响其他参数配置项
- 枚举类型
- rdma
  - `ms_async_rdma_device_name` 
  - `ms_async_rdma_enable_hugepage`
  - `ms_async_rdma_buffer_size` 
  - `ms_async_rdma_send_buffers`
  - `ms_async_rdma_receive_buffers`
  - `ms_async_rdma_receive_queue_len`
  - `ms_async_rdma_support_srq`
  - `ms_async_rdma_port_num`
  - `ms_async_rdma_polling_us`
  - `ms_async_rdma_gid_idx` ：使用gid_idx选择GID 选择RoCEv1或RoCEv2
  - `ms_async_rdma_local_gid`
  - `ms_async_rdma_roce_ver`
  - `ms_async_rdma_sl`
  - `ms_async_rdma_dscp`
  - `ms_async_rdma_cm` 
  - `ms_async_rdma_type`


- dpdk

  - `ms_dpdk_port_id` ：应该是有特殊含义，不知道不调

  - `ms_dpdk_coremask` 

  - `ms_dpdk_memory_channel` ：MS DPDK 内存通道

  - `ms_dpdk_hugepages` ：

  - `ms_dpdk_pmd` 

  - `ms_dpdk_devs_allowlist` ：允许使用 NIC 的 PCIe 地址

    对于单个 NIC，请使用  ms_dpdk_devs_allowlist=-a 0000:7d:010 or --allow=0000:7d:010;

    对于多个NIC，请使用 ms_dpdk_devs_allowlist=--allow=0000:7d:01.0 --allow=0000:7d:02.6 --vdev=net_bonding0,mode=2,slave=0000:7d:01.0,slave=0000:7d:02.6

  - `ms_dpdk_host_ipv4_addr` ：

  - `ms_dpdk_gateway_ipv4_addr` 

  - `ms_dpdk_netmask_ipv4_addr` 

  - `ms_dpdk_lro` 

  - `ms_dpdk_enable_tso` 

  - `ms_dpdk_hw_flow_control` 

  - `ms_dpdk_hw_queue_weight` ：可能用于配置 Monitor 服务在 DPDK 硬件队列中使用的权重。DPDK 是一种用于优化网络性能的库，它提供了与硬件队列（如 NIC 队列）交互的能力。

    这个参数对于优化 Monitor 服务的网络性能非常重要。设置合适的权重可以帮助确保 Monitor 服务能够有效地利用硬件队列的性能优势。

  - `ms_dpdk_debug_allow_loopback` ：用于调试 (level: dev)，允许有回路
  
  - `ms_dpdk_rx_buffer_count_per_core` ：

---

`ms_public_type` ：用于公共网络的 Messenger 类型

`ms_cluster_type` ：用于内部集群网络的 Messenger 类型

---

`ms_async_op_threads` ：AsyncMessenger 的线程池大小 （ms_type=async）

`ms_async_reap_threshold` ：用于控制异步操作中的资源清理行为

- 在执行清理（reap）之前，已删除的连接数量的阈值。

- 这个参数的目的是优化资源的清理过程。在某些系统中，当连接被删除后，它们的资源（如内存和文件描述符）不会立即释放，而是等待一个清理操作来释放这些资源。`ms_async_reap_threshold` 定义了在执行这样的清理操作之前，系统应该积累多少个已删除的连接。

  使用这个阈值的好处包括：

  - **减少清理频率**: 通过设置一个较高的阈值，可以减少清理操作的频率，从而减少因频繁清理而可能引起的性能开销。
  - **批量处理**: 允许系统在执行清理时一次性处理多个已删除的连接，这可能比逐个处理更高效。

  然而，设置一个过高的阈值可能会导致资源长时间不被释放，进而影响系统性能和稳定性。因此，这个参数的值需要根据具体的应用场景和系统负载来合理调整。

#### tcp

`ms_tcp_listen_backlog` ：可接受的连接接入队列的大小

**发送行为**

`ms_tcp_nodelay` ：为 `true` Ceph将立即发送请求消息

- 禁用 Nagle 的算法会增加网络流量。如果您遇到大量小数据包，可以尝试禁用。

**接收行为** 

ms_tcp_rcvbuf 与 ms_tcp_prefetch_max_size 二者独立

- `ms_tcp_rcvbuf`：这个选项控制的是TCP接收缓冲区的大小，它影响着网络栈接收数据的能力。增大这个值可以减少在高网络负载下丢包，因为它允许操作系统缓冲更多的入栈数据。
  `ms_tcp_rcvbuf` 是在网络层面，确保数据能够有效地从网络传输到集群

- `ms_tcp_prefetch_max_size`：这个选项与Ceph的预取功能有关，它指定了在处理客户端请求时，Ceph可以提前预取的最大数据量。

  预取是指在实际请求到达之前，先从网络中获取数据，以减少等待时间。

#### msgr2

> Messenger v2 协议（或 msgr2）是 Ceph 在线协议的第二个主要修订版
>
> Ceph 守护进程现在可以绑定到多个端口，允许旧版 Ceph 客户端和新的支持 v2 的客户端连接到同一集群。
>
> 默认情况下，监视器现在绑定到 IANA-分配 的采用 msgr2 协议的新端口 3300（ce4h 或 0xce4），同时还绑定到旧 v1 协议的旧默认端口 6789。

##### connection mode



`ms_mon_cluster_mode` ：按优先顺序排列的 mon 间的连接模式（crc、secure）

`ms_mon_service_mode` ：允许用于连接到 mons的连接模式（crc、secure）

`ms_mon_client_mode` ：用于按优先顺序从客户端连接到监视器的连接模式（crc、secure）

`ms_cluster_mode` ：集群内连接的连接模式（crc、secure），按优先顺序排列

`ms_service_mode` ：允许连接到守护进程的连接模式（crc、secure）

`ms_client_mode` ：连接模式（crc、secure），用于从客户端进行连接，按优先顺序排列

##### compression mode



`ms_compress_secure`：是否使用安全的压缩模式，而安全的压缩模式会更加注重安全性

- 将加密与压缩相结合会降低对等体之间消息的安全级别。如果同时启用了加密和压缩，则压缩设置将被忽略，并且不会压缩消息。可以使用此设置覆盖此行为。

---

有一组并行的选项专门适用于 OSD，允许管理员对 OSD 之间的通信设置不同的要求。

`ms_osd_compress_mode` ：用于与 OSD 通信的 Messenger 的压缩策略，不为 `none` ，下列参数生效- `force` （强制压缩）

- 在公有云中，可用区域(zones)的通信非常昂贵。因此，最小化消息大小可以降低云提供商的网络成本。

  当在 AWS（可能还有其他公共云）上使用实例存储时，具有 NVMe 的实例提供的网络带宽相对于设备带宽较低。在这种情况下，NW 压缩可以提高整体性能，因为这显然是瓶颈。

- `ms_osd_compress_min_size` ：需要在线压缩的最小消息大小

- `ms_osd_compression_algorithm` ：如果无法识别压缩模式，则将其设置为无压缩模式，并记录错误信息

  - ms_osd_compress_min_size：只有当数据块大小超过这个值时，才会进行压缩

  - ms_osd_compression_algorithm，如ce果当前算法无法使用，Ceph 会尝试列表中的下一个算法，直到找到一个可用的算法或者遍历完整个列表。通过尝试多种算法，选择一种最适合当前工作负载和硬件环境的压缩算法

    - 根据源码分析，` ms_osd_compression_algorithm` 的取值是以 "分号、逗号、等号、空格或制表符" 分隔的压缩算法字符串列表

    ```cpp
    # src/msg/compressor_registry. cc
    void CompressorRegistry::_refresh_config(){
        auto c_mode = Compressor::get_comp_mode_type(cct->_conf.get_val<std::string>("ms_osd_compress_mode"));
        ms_osd_compression_methods = _parse_method_list(cct->_conf.get_val<std::string>("ms_osd_compression_algorithm"));
    }
    
    std::vector<uint32_t> CompressorRegistry::_parse_method_list(const std::string& s){
    	std::vector<uint32_t> methods;
        for_each_substr(s, ";,= \t", [&] (auto method) {
    	    auto alg_type = Compressor::get_comp_alg_type(method);
        	if (alg_type)
          		methods.push_back(*alg_type);
        	else
                ...
      	});
       return methods;
    }
    ```

### 其他

`ms_learn_addr_from_peer` ：使用我们正在连接的第一个对等体（通常是监视器）看到的 IP 地址

- 如果客户端位于某种 NAT 后面，并且我们希望看到它由其本地（而不是 NATed）地址标识，这将非常有用

`ms_initial_backoff` ：检测到网络错误后的初始回退（秒）

`ms_max_backoff` ：重试前出现网络错误后的最大回退（秒）

- 这两个参数之间存在直接的大小关系，即 `ms_max_backoff` 应该大于或等于 `ms_initial_backoff`。

  在首次检测到网络错误后，Monitor 服务会退避 `ms_initial_backoff` 秒，然后再次尝试连接。如果连接仍然失败，它会退避更长的时间，这个时间会增加，直到达到 `ms_max_backoff` 秒。超过这个时间后，如果连接仍然失败，Monitor 服务可能会采取其他措施，如报告错误或继续尝试连接。

**crc校验**

`ms_crc_data` ：设置通过网络发送的数据有效负载 与/或校验crc32c 校验和

`ms_crc_header` ：设置通过网络发送的header 与/或校验crc32c 校验和

**。。**

`ms_dispatch_throttle_bytes` ：限制从网络读取但仍在处理中的消息大小

- 限制等待分发的消息的总大小



`ms_connection_ready_timeout` ： 指定连接在被标记为“就绪”之前等待的最长时间（秒）。如果连接在这段时间内没有准备好，它将被认为已经死亡或无法使用。

- 控制着连接状态的超时

`ms_connection_idle_timeout` ：空闲连接关闭前的时间（秒）

-  控制着连接的空闲超时



`ms_dump_on_send` ：在发送消息时，转储十六进制消息到调试日志

`ms_dump_corrupt_message_level` ：转储十六进制损坏消息的日志级别

- 1-20，超过20非常详细，一般不用



`ms_max_accept_failures` ：在考虑守护程序配置错误并中止守护程序之前，连续失败的 accept（） 调用的最大次数







## basic

### logs

`log_to_file` ：决定是否将日志记录到文件，决定 `log_file是否生效`

- `log_file` ：日志文件的路径

- `log_flush_on_exit` ：设置进程退出处理程序以确保在退出时刷新日志文件

  确定 Ceph 退出后是否应刷新日志文件。

- `log_stop_at_utilization` ：当设备利用率达到此比率时，停止写入日志文件

- `log_max_new` ：

  文档中：新日志文件的最大数量。

  配置文件中：在等待刷新到日志之前允许的最大未写入日志条目数

- `log_max_recent` ：保留在内存中的最近日志条目数，以便发生崩溃时转储

  例如，debug_osd=1/5 将无条件地将 <= 1 的所有内容写入日志文件，但将级别 2-5 的条目保留在内存中。如果存在段错误或断言失败，所有条目都将转储到日志中

关于日志文件的分析

```shell
# src/log/Log.cc/{}ceph/{}logging
void Log::dump_recent(){
	1.首先，通过std::scoped_lock对互斥量m_flush_mutex加锁，并将当前线程ID赋值给m_flush_mutex_holder。
	
	2.然后，在一个代码块中，通过std::scoped_lock对互斥量m_queue_mutex加锁，并将当前线程ID赋值给m_queue_mutex_holder。断言m_flush队列为空，然后将m_new队列的内容交换到m_flush队列中，并将m_queue_mutex_holder置为0。

	3.调用_flush函数，将m_flush队列中的日志事件进行处理。

	4.输出日志分隔线，并创建一个集合recent_pthread_ids用于存储最近线程的ID。

	5.在一个临时变量t中，将m_recent队列中的日志事件移动到t中，并清空m_recent队列。然后，遍历t中的每个日志事件，将线程ID添加到recent_pthread_ids集合中，并调用_flush函数将t中的日志事件进行处理。

	6.输出日志级别信息，遍历m_subs->m_subsys中的每个子系统，输出其日志级别和收集级别。同时，输出系统日志和标准错误日志的阈值。

	7.输出线程ID与线程名称的映射关系，遍历recent_pthread_ids集合中的每个线程ID，获取其线程名称，并调用_log_message函数输出线程ID和线程名称。

	8. 输出最近日志事件的最大数量m_max_recent、新日志事件的最大数量m_max_new和日志文件名m_log_file。

	9. 最后，输出日志分隔线，并断言m_log_buf队列为空。将m_flush_mutex_holder置为0。
}
```

---

log_to_xxx 与 err_to_xxx ，二者作用独立

- `log_to_syslog`：当这个选项设置为`true`时，所有的日志消息（包括调试、信息、警告等）都会被发送到syslog。
- `err_to_syslog`：这个选项用来控制错误消息是否应该被发送到syslog。即使`log_to_syslog`设置为`false`，`err_to_syslog`设置为`true`时，只有错误消息会被发送到syslog。

> syslog 服务是一个在计算机系统中用于日志记录的标准协议和守护进程。
>
> 主要目的是方便地收集和分析来自不同系统组件的日志信息，以便进行故障排查和系统监控。
>
> 它允许应用程序和系统服务将日志消息发送到一个集中的位置，通常是日志服务器或系统日志文件。

---

- `log_to_stderr` ：将日志行发送到 stderr

  - `log_stderr_prefix` ：发送到 stderr 时要为日志消息添加前缀的字符串

    这在容器环境中非常有用，与 mon_cluster_log_to_stderr 组合使用。mon 的日志在每行前加上通道名称（例如，'default'、'audit'），而log_stderr_prefix可以设置为 'debug '

- `err_to_stderr` ：向 stderr 发送严重错误日志行

> `stderr` 服务是操作系统提供的一种机制，用于指定和处理程序的错误输出，确保错误信息不会干扰正常的程序输出，并方便地进行日志记录和分析。

---

> Graylog Server 是一个开源的日志管理和分析平台，它用于收集、存储、搜索、分析和可视化来自不同来源的日志数据
>
> Graylog 使用 Elasticsearch 作为其数据存储引擎，并且可以与其他工具（如 Kibana）集成，以提供丰富的日志分析功能。

理论上可以在线调整，但是与之相关的配置项

`log_to_graylog` ：将日志行发送到远程 Graylog Server

为了简单起见，不调整

- `log_graylog_host` ：要登录的graylog的地址或主机名

  由特殊含义，不能随便调整

- `log_graylog_port` ：远程 Graylog 服务器的端口号

  由特殊含义，不能随便调整

`err_to_graylog` ：将严重错误日志行发送到远程 Graylog Server

---

> `journald` 是 Linux 内核自 3.13 版本开始引入的一个日志系统，它是 `syslog` 系统的现代替代品。`journald` 提供了日志记录、过滤、索引和搜索功能，并且它的设计是为了更好地适应现代系统日志的需求，比如高吞吐量和系统日志的完整性。

`log_to_journald` ：控制是否将日志行发送到 journald

`err_to_journald` ：控制将严重错误日志行发送到 journald

---

`log_coarse_timestamps` ：来自粗略系统时钟的时间戳日志条目，以提高性能

---

`clog_to_syslog` ：控制守护进程是否将集群日志消息发送到 syslog

- `clog_to_syslog_level` ：发送到syslog的集群日志消息级别

- `clog_to_syslog_facility` ：用于集群日志消息的 Syslog 工具

---

`clog_to_graylog` ：控制是否让守护进程将集群日志发送到 graylog

- `clog_to_graylog_host`：集群日志消息的graylog主机
- `clog_to_graylog_port` ：集群消息日志主机的端口

### compressor

**压缩算法**

https://docs.ceph.com/en/latest/radosgw/compression/

支持的压缩插件包括：lz4、snappy、zlib、zstd。每个压缩对象都会记住使用了哪个压缩插件，因此对此设置的任何更改都不会影响 Ceph 解压缩现有对象的能力，也不会重新压缩现有对象。

zlib

- `compressor_zlib_isal` ：使用英特尔 ISA-L 加速 zlib 实现（如果可用）
- `compressor_zlib_level` ：要使用的 Zlib 压缩级别
- `compressor_zlib_winsize` ：winsize 使用的Zlib压缩

`qat_compressor_enabled` ：启用英特尔 QAT 加速支持以进行压缩（如果可用）

`plugin_crypto_accelerator` ：要使用的加密加速器库

zstd

- `compressor_zstd_level` ：要使用的 Zstd 压缩级别
- 



### other

`enable_experimental_unrecoverable_data_corrupting_features` ：启用可能未经测试、危险和/或导致永久性数据丢失的命名（或全部带有“”）实验性功能

`plugin_dir` ：动态加载的插件的基本目录

`perf` ：启用内部性能指标

- 收集并公开内部运行状况指标
- 参数调优过程的集群性能指标来源，所以不能为 false



`crush_location_hook_timeout` ：https://docs.ceph.com/en/quincy/rados/operations/crush-map/#crush-location

### immutable_object_cache

`immutable_object_cache_watermark` ：

```cpp
# src/tools/immutable_object_cache
ObjectCacheStore::ObjectCacheStore(CephContext *cct)
      : m_cct(cct), m_rados(new librados::Rados()) {
          double cache_watermark =
    m_cct->_conf.get_val<double>("immutable_object_cache_watermark");
          ...
          if ((cache_watermark <= 0) || (cache_watermark > 1)) {
    lderr(m_cct) << "Invalid water mark provided, set it to default." << dendl;
    cache_watermark = 0.9;
  }
      }
```

`immutable_object_cache_qos_iops_limit` ：所需的不可变对象缓存每秒 IO 操作限制

`immutable_object_cache_qos_iops_burst` ：不可变对象缓存 IO 操作所需的突发限制

`immutable_object_cache_qos_iops_burst_seconds` ：不可变对象缓存 IO 操作所需的突发持续时间（以秒为单位）

### ceph_exporter

`exporter_prio_limit` 是 Ceph 集群中的一个配置参数，它与数据导出功能有关，通常用于控制数据导出时的优先级限制。了解这个参数的作用需要了解 Ceph 中数据导出的优先级管理。

**解释**：该参数定义了在数据导出操作中使用的最大优先级。优先级（priority）是 Ceph 用于调度和资源分配的一个重要指标，数值越低表示优先级越高。

**作用**：通过设置 `exporter_prio_limit`，可以控制数据导出任务的优先级范围，从而影响数据导出任务在系统资源分配中的优先级。







## Mon

### DATA

`mon_data` ：monitors 的数据存储位置

`mon_data_size_warn` ：当 MON 数据库超过此大小时发出MON_DISK_BIG运行状况警告

`mon_data_avail_warn` ：当容纳监视器数据存储的文件系统报告其可用容量小于或等于此百分比时，引发 HEALTH_WARN 状态。

`mon_data_avail_crit` ：当 MON 可用空间低于此百分比时出现MON_DISK_CRIT运行状况错误

- 当容纳监视器数据存储的文件系统报告其可用容量小于或等于此百分比时，引发 HEALTH_ERR 状态。

`mon_warn_on_cache_pools_without_hit_sets` ：当缓存池未配置 hit_set_type 值时，引发 HEALTH_WARN。

`mon_warn_on_crush_straw_calc_version_zero` ：当 CRUSH sketch_calc_version 为零时引发 HEALTH_WARN



`mon_warn_on_legacy_crush_tunables` ：如果 CRUSH 可调对象早于 mon_crush_min_required_version，则发出OLD_CRUSH_TUNABLES运行状况警告

`mon_crush_min_required_version` ：用于mon_warn_on_legacy_crush_tunables的最小 Ceph 发行版

- 取值是ceph的版本



`mon_warn_on_osd_down_out_interval_zero` ：如果mon_osd_down_out_interval为零，则发出OSD_NO_DOWN_OUT_INTERVAL运行状况警告

- 将 mon_osd_down_out_interval 设置为 0 意味着不会自动标记关闭的 OSD，并且集群不会在没有管理员干预的情况下自行修复。
- 在领导者上将此选项设置为零的行为非常类似于 noout 标志。很难弄清楚没有设置 noout 标志但表现得一样的集群出了什么问题，因此我们在这种情况下报告警告。



`mon_warn_on_pool_no_redundancy` ：如果任何池配置为没有副本，则引发 HEALTH_WARN。



`mon_cache_target_full_warn_ratio` ：当缓存池利用率超过此可用空间比率时发出CACHE_POOL_NEAR_FULL运行状况警告

- mon_cache_target_full_warn_ratio < osd_pool_default_cache_target_full_ratio
- 池的cache_target_full和target_max_object之间我们开始发出警告的位置
- 不能在线调整



`mon_health_to_clog` ：将监视运行状况记录到cluster日志

- `mon_health_to_clog_interval`  ：记录监控运行状况到群集日志的频率

  监视器向集群日志发送运行状况摘要的频率（以秒为单位）（非正数禁用）。

  监视器始终会向集群日志发送摘要，无论它是否与之前的摘要不同。

- `mon_health_to_clog_tick_interval` ：

  监视器向集群日志发送运行状况摘要的频率（以秒为单位）（非正数禁用）。

  如果当前运行状况摘要为空或与上次相同，监视器将不会将其发送到集群日志。

  - 调试级参数
  - 应该会和上一参数冲突，不调这个

`mon_warn_on_older_version` ：如果守护程序并非都运行相同的版本，则发出DAEMON_OLD_VERSION运行状况警告

- `mon_warn_older_version_delay` ：在此时间过后发出DAEMON_OLD_VERSION运行状况警告



### 存储容量

`mon_osd_full_ratio` ：OSD 被视为已满之前已使用的设备空间的阈值百分比。

`mon_osd_backfillfull_ratio` ：在 OSD 被认为太满而无法回填之前所使用的设备空间的阈值百分比。

`mon_osd_nearfull_ratio` ：OSD 之前使用的设备空间的阈值百分比被视为接近满。

### 监视器仲裁(quorum)

`mon_force_quorum_join` ：强制监视器加入quorum，即使它之前已从map中删除

### monitor synchronization

`mon_sync_timeout` ：Ceph集群中的监控节点之间同步信息的最大等待时间（秒）。在等待时间内，监视器会等待 provider 提供的下一条更新信息。一旦超过，则会放弃并引导下一条更新信息

`mon_sync_max_payload_size` 和 `mon_sync_max_payload_keys` 用于控制监控节点（Monitoring Service，简称Mon）之间同步信息时的最大数据量。

1. `mon_sync_max_payload_size`：这个选项定义了监控节点之间同步信息时，单个消息的最大大小。当一个监控节点尝试与另一个监控节点同步时，如果消息的大小超过了这个值，Ceph将不会发送该消息，而是将其分割成更小的部分。
2. `mon_sync_max_payload_keys`：这个选项定义了监控节点之间同步信息时，单个消息可以包含的最大键数量。当一个监控节点尝试与另一个监控节点同步时，如果消息中包含的键数量超过了这个值，Ceph将不会发送该消息，而是将其分割成更小的部分。

如果消息的大小超过了 `mon_sync_max_payload_size`，Ceph将尝试通过分割消息来减小其大小。如果消息中包含的键数量超过了 `mon_sync_max_payload_keys`，Ceph也将尝试通过分割消息来减小其键的数量。

```cpp
# src/mon/Monitor.cc
void Monitor::handle_sync_get_chunk(MonOpRequestRef op){
	1. 输入解析与验证:
    	获取操作请求中的MMonSync消息实例m，并打印调试信息。
        验证请求携带的cookie是否存在于sync_providers映射中，如果不存在，则回复无此cookie的错误信息并直接返回。

	2.安全检查与超时重置:
    	断言确认配置项mon_sync_provider_kill_at不等于2，这是一个内部保护机制
		获取与cookie关联的SyncProvider实例sp，并重置其超时时间，通常是默认超时时间的两倍。
            
	3.同步状态检查:
    	检查同步请求者的最新提交版本是否落后于Paxos的首个提交版本，如果落后则清理本地状态并回复无cookie错误。

	4.构建回复消息与事务准备:
    	创建一个新的MMonSync回复消息实例reply，设置其操作类型为OP_CHUNK，并指定cookie。
		初始化一个数据库事务tx，用于存放即将同步的数据。

	5.同步数据块处理:
    	根据配置限制（最大负载大小和键数），循环从Paxos状态中读取数据块，直到达到任一限制或同步至最新版本。
    	对每个数据块，从存储中获取其内容，添加到事务tx中，并更新剩余的字节和键计数
		记录日志信息，显示已包含的Paxos状态版本。
	# 也就是这两个参数必须大于0，才能正确构造同步数据块
	int bytes_left = g_conf()->mon_sync_max_payload_size;
  	int keys_left = g_conf()->mon_sync_max_payload_keys;
  	while (sp.last_committed < paxos->get_version() &&
		bytes_left > 0 &&
	 	keys_left > 0) {}
	6.额外同步数据处理:
    	如果同步提供者标记为全量同步且还有余量（字节和键），则调用同步器的get_chunk_tx方法来进一步填充事务，并更新最后的键信息到回复消息中。

	7.判断是否为最后一个数据块:
		根据是否还有更多数据块待同步（全量同步且有下一个数据块，或者Paxos版本未完全同步），决定是否标记回复消息为最后一个数据块（OP_LAST_CHUNK）。
		如果是最后一个数据块，断言确认配置项mon_sync_provider_kill_at不等于3，作为内部保护，并清理该cookie对应的本地状态。
}
```

`paxos_max_join_drift` ：我们必须首先同步监控数据存储之前的最大 Paxos 迭代次数。当监视器发现其对等方领先于它太多时，它将首先与数据存储同步，然后再继续。

必须大于等于0

```cpp
# src/mon/AuthMonitor.cc
version_t AuthMonitor::get_trim_to() const
{
  unsigned max = g_conf()->paxos_max_join_drift * 2;
  version_t version = get_last_committed();
  if (mon.is_leader() && (version > max))
    return version - max;
  return 0;
}
```

`paxos_stash_full_interval` ：存储 PaxosService 状态的完整副本的频率（以提交为单位）。当前此设置仅影响 mds、mon、auth 和 mgr PaxosServices。

```cpp
#src/mon/PaxosService.cc
//typedef uint64_t version_t;
//typedef __u32 epoch_t;       // map epoch  (32bits -> 13 epochs/second for 10 years)

bool PaxosService::should_stash_full(){
	1. 首先，函数调用get_version_latest_full()获取最新的完整提案的版本号，并将其存储在latest_full变量中。
	2. 然后，函数使用逻辑或运算符进行条件判断：
		如果latest_full为0或空值，则返回true，表示应该存档全部提案。
		如果latest_full小于等于get_trim_to()的返回值，则返回true，表示应该存档全部提案。
		如果最新提交的提案版本号与latest_full的差值大于配置文件中指定的paxos_stash_full_interval值，则返回true，表示应该存档全部提案。
	3.如果以上条件都不满足，则返回false，表示不需要存档全部提案。
	return (!latest_full ||
            (latest_full <= get_trim_to()) ||
            (get_last_committed() - latest_full > (version_t)g_conf()->paxos_stash_full_interval));
}
```

`paxos_propose_interval` ：在实际提出 map 更新提议之前，Ceph 监视器（monitor）会等待一定的时间，聚集在这个时间间隔内收到的所有更新。

- 例如，如果 `paxos_propose_interval` 设置为 2 秒，那么监视器会收集所有在最近 2 秒内收到的更新，并在 2 秒时间到达时，将这些更新作为一个提议提交给集群。

`paxos_min` ：保留的 Paxos 状态的最小数量

```cpp
# src/mon/Paxos.cc
void Paxos::trim(){
    # 保留paxos_min个最近版本，最多裁剪paxos_trim_max个版本
    # 所以[first_committed,first_committed+paxos_trim_max]
    # [cur_version-paxos_min,cur_version],取min(first_committed+paxos_trim_max,cur_version-paxos_min)
	version_t end = std::min(get_version() - g_conf()->paxos_min,
                             get_first_committed() + g_conf()->paxos_trim_max);
}
```

`paxos_min_wait` ：一段时间不活动后收集更新的最短时间。

```cpp
# paxos_propose_interval作为提案间隔时间，其逻辑意义在于控制两次提案之间的最小时间间隔，因此它应该是非负数。若取负数，则逻辑上讲不通，可能会导致频繁或者不合理的提案行为。
#paxos_min_wait在代码中它是作为在特定条件下提议需要等待的最短时间出现，理论上同样应为非负数，因为负的等待时间没有实际意义
bool PaxosService::should_propose(double& delay)
{
  // simple default policy: quick startup, then some damping.
  if (get_last_committed() <= 1) {
    delay = 0.0;
  } else {
    utime_t now = ceph_clock_now();
    if ((now - paxos.last_commit_time) > g_conf()->paxos_propose_interval)
      delay = (double)g_conf()->paxos_min_wait;
    else
      delay = (double)(g_conf()->paxos_propose_interval + paxos.last_commit_time
		       - now);
  }
  return true;
}
```

`paxos_trim_min` ：允许修剪的额外最小提案数量

`paxos_trim_max` ：允许修剪的额外最大提案数量

`paxos_service_trim_min` ：触发修剪的最小版本数量（0 禁用它）

`paxos_service_trim_max` ：触发修剪的大版本数量（0 禁用它）

`paxos_service_trim_max_multiplier` ：当修剪大小较高时，paxos_service_trim_max将乘以以获得新的上限的系数（0 禁用它）



`mon_osd_cache_size` ：定义了 osdmaps 缓存的大小，不依赖于底层存储的缓存。这是一个具体值，用于设置缓存的大小。

- 不依赖底层store的缓存

`mon_election_timeout` ：选举提议者proposer在等待所有确认（ACKs）时的最大等待时间（以秒为单位）。它直接影响到选举过程的超时设置。

`mon_lease` ：监控器版本的租约时长（秒）。此设置控制 mon 仲裁对间歇性网络问题或其他故障的敏感程度

- 如果将`mon_lease`设置为0：

  - 可能导致系统无法正确处理监视器之间的故障检测和恢复，因为没有足够的时间间隔来判断一个监视器是否失效。

  - 客户端和服务端之间的一致性保证可能会被削弱，因为没有租约机制来确保操作的持续有效时间。

  - 系统可能会变得不稳定，因为许多基于时间的同步和健康检查逻辑依赖于一个合理的租约时间来正常工作。

- 因此，从功能和稳定性角度考虑，`mon_lease`应当设置为一个正值，其具体数值根据系统的响应速度、网络延迟以及整体稳定性要求来合理配置。

`mon_lease_ack_timeout_factor` ：调用新选举之前租用确认间隔的mon_lease倍数

- Leader 将等待 Provider 确认租约延期的最大时间为 mon_lease * mon_lease_ack_timeout_factor 。
- **选举超时与租约**：`mon_election_timeout` 通常应大于等于 `mon_lease * mon_lease_ack_timeout_factor`，以确保在触发新选举之前有足够的时间等待租用确认。

`mon_lease_renew_interval_factor` ：续租间隔的mon_lease倍数。租约必须在超时之前续订。较小的值意味着频繁续订，而接近 1 的值则使租约到期的可能性更大

- mon_lease * mon_lease_renew_interval_factor 将是 Leader 续订其他监视器租约的时间间隔。

`mon_accept_timeout_factor` ：追随者 mons 在发起新选举之前，接受提议的状态更改的 mon_lease 倍数

- Leader 将等待 mon_lease * mon_accept_timeout_factor 以便请求者接受 Paxos 更新。它也在 Paxos 恢复阶段用于类似目的。

`mon_max_log_epochs` ：要存储的过去集群日志epoch的最大数目

`mon_elector_ping_timeout` ：ping “time out”且连接被视为已关闭的时间

`mon_elector_ignore_propose_margin` ：在peon停止忽略非仲裁PROPOSE之前允许的连接得分差异





### clock

`mon_tick_interval` ：监视器的tick时间间隔（以秒为单位）。

监视器之间发送心跳消息的间隔时间。尽管它与时钟漂移直接无关，但频繁的心跳有助于及时检测任何时钟漂移。设置较短的 `mon_tick_interval` 可以提高检测到时钟漂移的及时性。

`mon_clock_drift_allowed` ：在发出健康警告之前允许的时钟漂移（以秒为单位）

定义了监视器之间允许的时钟漂移量。如果心跳消息的时间戳显示时钟漂移超过这个值，会触发健康警告。

`mon_clock_drift_warn_backoff` ：用于在集群日志中记录时钟漂移警告的指数退避因子

这个参数控制了时钟漂移警告的记录频率，以防止过多的日志警告信息。虽然它不会直接影响其他参数，但它确保了在频繁的时钟漂移警告情况下，日志不会被填满。

`mon_timecheck_interval` ：Leader 的时间检查间隔（时钟漂移检查）以秒为单位。

- 在Leader为正常情况下进行时钟漂移检查的时间间隔。

`mon_timecheck_skew_interval` ：当 Leader 存在以秒为单位的偏差时，时间检查间隔（时钟漂移检查）以秒为单位。

### client

`mon_osd_initial_require_min_compat_client` ：集群与客户端兼容的最小版本



`mon_client_ping_interval`：

- 定义了客户端向监控节点发送心跳请求的时间间隔。

`mon_client_ping_timeout`：

- 定义了客户端等待监控节点响应心跳请求的超时时间。
- 如果监控节点在指定时间内没有响应，客户端会认为监控节点可能已经失败，并尝试重新发送心跳请求。

如果 `mon_client_ping_timeout` 设置得大于 `mon_client_ping_interval`，那么客户端在发送心跳请求后，如果监控节点在 `mon_client_ping_interval` 指定的时间内没有响应，客户端会开始重试发送心跳请求。这意味着客户端会等待更长的时间（`mon_client_ping_timeout` 的值）来接收监控节点的响应，

`mon_client_log_interval` ：我们向 mon 发送队列中的集群日志消息的频率



`mon_client_hunt_parallel` ：客户端在认为监控节点已经失败时，控制同时向多个监控节点发送心跳请求的数量，以提高性能。

`mon_client_hunt_interval`：

- 客户端在认为监控节点已经失败时，尝试与下一个监控节点建立连接的时间间隔。如果仍然无法建立连接，客户端会继续尝试，直到成功连接到一个监控节点或达到某个超时阈值。

`mon_client_hunt_interval_backoff`：

- 客户端在连续多次未收到监控节点响应时，`mon_client_hunt_interval` 的倍数增长速率。
- 例如，如果 `mon_client_hunt_interval` 是3秒，`mon_client_hunt_interval_backoff` 是2，那么第二次未收到响应时，间隔将是6秒，第三次是12秒，依此类推。

`mon_client_hunt_interval_min_multiple` 和 `mon_client_hunt_interval_max_multiple`：

- `mon_client_hunt_interval` 的最小和最大倍数。
- 这意味着即使 `mon_client_hunt_interval_backoff` 设置为无穷大，`mon_client_hunt_interval` 也不会超过 `mon_client_hunt_interval_max_multiple` 指定的倍数。

`mon_client_max_log_entries_per_message` ：监视器将为每个客户端消息生成的日志条目的最大数量。

`mon_client_bytes` ：MON 将从网络上读取的未完成客户端消息的最大字节数

- 内存中允许的客户端消息数据量（以字节为单位）。

`mon_client_directed_command_retry` ：尝试向特定监视器发送命令的次数



### mon_pool

`mon_allow_pool_delete` ：无论池标志如何，监视器是否应该允许删除池

`mon_fake_pool_delete` ：通过重命名 RADOS 池来伪造池删除

- 不进行池的物理删除，仅重命名池

`osd_pool_default_ec_fast_read` ：为新的纠删码池设置ec_fast_read

- 是否打开池上的快速读取。如果在创建时未指定，将为新创建的纠删码池默认设置为 fast_read 。

`osd_pool_default_flag_hashpspool` ：在新池上设置 hashpspool（更好的哈希方案）标志

`osd_pool_default_flag_nodelete` ：在新池上设置 nodelete 标志

`osd_pool_default_flag_nopgchange` ：在新池上设置 nopgchange 标志

`osd_pool_default_flag_nosizechange` ：在新池上设置 nosizechange 标志

`osd_pool_default_flag_bulk` ：在新池上设置批量标志

`mon_pool_quota_warn_threshold` `mon_pool_quota_crit_threshold` 

```cpp
# src/mon/PGMap/cc
void PGMap::get_health_checks(
  CephContext *cct,
  const OSDMap& osdmap,
  health_check_map_t *checks) const
{
    float warn_threshold = (float)g_conf().get_val<int64_t>("mon_pool_quota_warn_threshold")/100;
    float crit_threshold = (float)g_conf().get_val<int64_t>("mon_pool_quota_crit_threshold")/100;
    ...
    else if (crit_threshold > 0 &&
		   sum.num_objects >= pool.quota_max_objects*crit_threshold) {
	  ss << "pool '" << pool_name
	     << "' has " << sum.num_objects << " objects"
	     << " (max " << pool.quota_max_objects << ")";
	  full_detail.push_back(ss.str());
	  full = true;
	} else if (warn_threshold > 0 &&
		   sum.num_objects >= pool.quota_max_objects*warn_threshold) {
	  ss << "pool '" << pool_name
	     << "' has " << sum.num_objects << " objects"
	     << " (max " << pool.quota_max_objects << ")";
	  nearfull_detail.push_back(ss.str());
	  nearfull = true;
	}
}
```





### mon_other

`mon_globalid_prealloc` ：为客户端和集群中的进程预分配的 global id

- 这个设置限制了在监视器执行写操作以预分配更多 ID 之前，能够与集群进行身份验证的新客户端的数量。较大的值会更快地耗尽 64 位 ID 空间。
- 即超过这个值会自动扩展

`mon_max_osd` ：集群中的最大OSD数量

`mon_subscribe_interval` ：订阅的刷新间隔（以秒为单位）。订阅机制可以获取 cluster map 和日志信息。

- dev级参数：J版之前的客户端订阅间隔

`mon_stat_smooth_intervals` ：我们计算整个集群的平均读写吞吐量的 PG Maps 统计信息的数量

- 这个参数对性能评估有影响

- 当 `mon_stat_smooth_intervals` 的值设置为 1 时，意味着 Ceph 只考虑最近的一个 PG 映射版本来进行统计数据的平滑。这将提供非常近期的性能数据，但可能包含更多的短期波动和噪声。

  而当该参数设置为默认值 6 时，Ceph 会考虑最近 6 个 PG 映射版本来进行统计数据的平滑。这样可以减少短期波动的影响，提供一个更长期、更平滑的性能趋势视图。

- 如果需要统计数据能够即时反映当前系统的状态，可以选择较小的 `mon_stat_smooth_intervals`，例如 1。

  如果更关注统计数据的稳定性，希望能够看出长期趋势，可以选择较大的 `mon_stat_smooth_intervals`，例如 6。

`mon_probe_timeout `：在 Bootstrap 预选阶段查询其他 mon 的超时（秒）

- 监视器在引导之前等待找到对等点的超时秒数。

`mon_daemon_bytes` ：Mon 将从网络上读取的最大未完成消息的字节数

- 元数据服务器和 OSD 消息的消息内存上限（以字节为单位）。

`mon_max_log_entries_per_event` ：每个 Paxos 事件的最大集群日志条目数

`mon_osd_prime_pg_temp` ：通过在映射更改后启动pg_temp值来最大程度地减少对等互连工作

- 当 `out` 的OSD 返回集群时，启用或禁用使用先前的 OSD 启动 PGMap。

  true ，客户端将继续使用以前的 OSD，直到 PG 的新  `in` OSD 建立对等关系。



`mon_osd_prime_pg_temp_max_time` ：在 map 更改上预先计算 PG 映射所花费的最长时间（秒）

- 当出局 OSD 返回集群时，监视器应花费多少时间（以秒为单位）来尝试准备 PGMap

`mon_osd_prime_pg_temp_max_estimate` ：如果估计的 PG 变化比例高于此数量，则计算所有 PG 映射

- 在并行准备所有 PG 之前，预计的每个 PG 花费的最大时间。

- 小于 mon_osd_prime_pg_temp_max_time



`mon_mds_skip_sanity` ：跳过 FSMap/MDSMap 上的健全性检查。如果 FSMap 健全性检查失败，监视器将终止，但我们可以通过启用此选项来禁用它。

`mon_max_mdsmap_epochs` ：FSMaps/MDSMaps要存储的最大 epoch 数

- 在一个提案期间要修剪的 mdsmap 的最大 epoch 数。
- 这是为了限制在一次更新中可以删除的旧 mdsmap epoch 的数量，以避免过快地删除旧数据，可能导致数据恢复问题。



`mon_config_key_max_entry_size` ：定义允许在单个配置键条目中保存的字节数





`mon_compact_on_start` ：在ceph-mon 启动时，压缩用作Ceph monitor 存储的数据库。如果常规压缩失败，手动压缩有助于缩小监控数据库并提高其性能。

`mon_compact_on_bootstrap` ：在集群 bootstrap 时，压缩用作 Ceph Monitor 存储的数据库。监视器在引导后相互探测以建立法定仲裁人数。如果监视器在加入法定人数之前超时，它将重新启动并再次引导。

`mon_compact_on_trim` ：当我们修剪某个前缀（包括 paxos）的旧状态时，压缩它。

`mon_cpu_threads` ：监视器上，用于 CPU 密集型后台工作的工作线程

`mon_osd_mapping_pgs_per_chunk` ：我们以块的形式计算从归置组到 OSD 的映射。此选项指定每个块的归置组数量。

- 由源码可见，必须是非负数

```cpp
# src/mon/OSDMonitor.cc
void OSDMonitor::start_mapping(){
    // initiate mapping job
    # 检查并取消前一个映射任务：如果mapping_job不为nullptr，说明有之前的映射任务正在执行或待执行。这时，函数会打印日志信息并调用mapping_job->abort()来取消这个任务。
    if (mapping_job) {
        dout(10) << __func__ << " canceling previous mapping_job " << mapping_job.get() << dendl;
    	mapping_job->abort();
  	}
    # 判断是否存在存储池：通过检查osdmap.get_pools().empty()来确定是否有存储池存在。
  	if (!osdmap.get_pools().empty()) {
        #创建完成回调对象：如果存在存储池，则创建一个新的C_UpdateCreatingPGs对象（fin），它是一个完成回调，用于在映射作业完成后执行某些操作，这里主要是记录开始映射的epoch。
    	auto fin = new C_UpdateCreatingPGs(this, osdmap.get_epoch());
        # mapping.start_update的声明函数
        # std::unique_ptr<MappingJob> start_update(
    	#	const OSDMap& map,
    	#	ParallelPGMapper& mapper,
    	#	unsigned pgs_per_item)
        # 启动映射作业：接下来，调用mapping.start_update()方法来启动新的映射作业。这个方法会根据当前的OSD映射(osdmap)、映射器(mapper)以及配置的每批处理的PG数量来更新映射信息。新启动的映射任务会被赋值给mapping_job。
    	mapping_job = mapping.start_update(osdmap, mapper,
				       g_conf()->mon_osd_mapping_pgs_per_chunk);
    	dout(10) << __func__ << " started mapping job " << mapping_job.get()
	     << " at " << fin->start << dendl;
        # 设置完成事件与日志记录：为刚启动的映射任务设置完成事件（通过mapping_job->set_finish_event(fin)），即当任务完成时将调用前面创建的fin。同时，记录一条日志信息，表明映射作业已启动及其开始的位置。
    	mapping_job->set_finish_event(fin);
  	} else {
        # 无存储池时的操作：如果不存在存储池，函数会记录一条日志信息，并将mapping_job置为nullptr，表示无需执行任何映射任务。
    	dout(10) << __func__ << " no pools, no mapping job" << dendl;
    	mapping_job = nullptr;
  }
}
```

`mon_session_timeout` ：在这几秒钟后关闭非活动的 MON 客户端连接



`mon_memory_autotune` ：自动调整用于 osd 监视器和 kv 数据库的缓存

- `mon_memory_target` ：在启用缓存自动调整的情况下，限制 osd 监视器缓存和 kv 缓存应保留在内存中的字节数

- `mon_osd_cache_size_min` ： OSD 监视器缓存应保持在内存中的最小字节数。这是一个底线值，确保缓存不会低于这个大小。

```cpp
# src/mon/OSDMonitor.cc
# 都是uint
int OSDMonitor::_set_cache_sizes(){
    # 条件检查：首先检查是否启用了内存自动调整功能（g_conf()->mon_memory_autotune）。如果启用，则继续执行后续的缓存大小设置逻辑；否则，函数直接返回0，不做任何调整。
  	if (g_conf()->mon_memory_autotune) {
    	// set the new osdmon cache targets to be managed by pcm
        # 获取配置参数：从配置中读取多个与内存管理和缓存大小相关的参数，包括mon_osd_cache_size、rocksdb_cache_size、基础内存大小mon_memory_base、预期内存碎片化比例mon_memory_fragmentation、目标内存使用量mon_memory_target，以及最小缓存大小mon_memory_min。
    	mon_osd_cache_size = g_conf()->mon_osd_cache_size;
    	rocksdb_cache_size = g_conf()->rocksdb_cache_size;
    	mon_memory_base = cct->_conf.get_val<Option::size_t>("osd_memory_base");
    	mon_memory_fragmentation = cct->_conf.get_val<double>("osd_memory_expected_fragmentation");
    	mon_memory_target = g_conf()->mon_memory_target;
    	mon_memory_min = g_conf()->mon_osd_cache_size_min;
        
        # 参数有效性检查：确认mon_memory_target和mon_memory_min都大于0，若任一值无效（小于等于0），则通过错误日志输出相关信息，并返回-EINVAL错误码，表示提供了无效的大小配置选项。
	    if (mon_memory_target <= 0 || mon_memory_min <= 0) {
     		derr << __func__ << " mon_memory_target:" << mon_memory_target
           		<< " mon_memory_min:" << mon_memory_min
           		<< ". Invalid size option(s) provided."
           		<< dendl;
      		return -EINVAL;
    	}
    	# 设置初始缓存大小：如果所有参数有效，会将两个LRU缓存（增量缓存inc_osd_cache和全量缓存full_osd_cache）的大小设为mon_memory_min。这意味着至少会分配最小量的内存给这些缓存使用。
    	inc_osd_cache.set_bytes(mon_memory_min);
    	full_osd_cache.set_bytes(mon_memory_min);
        # 记录自动调整状态：最后，将mon_memory_autotune标记为当前的自动调整配置状态。
    	mon_memory_autotune = g_conf()->mon_memory_autotune;
  }
  return 0;
}
```



`mon_osd_snap_trim_queue_warn_on` ：当快照修剪队列太大（或更大）时发出警告

- 当至少一个 PG 的对齐修剪队列长度超过此值时发出警告，因为这表示对齐修剪器跟不上，浪费磁盘空间

`mon_mgr_proxy_client_bytes_ratio` ：代理 mgr 命令在出错到客户端之前可以消耗的mon_client_bytes比率

`mon_auth_validate_all_caps` ：是否解析“ceph auth ...”设置的 non-monitor 功能命令。禁用此功能会将 CPU 保存在显示器上，但允许设置无效功能，并且仅在以后使用时拒绝它们

```
Whether to parse non-monitor capabilities set by the 'ceph auth ...' commands. Disabling this saves CPU on the monitor, but allows invalid capabilities to be set, and only be rejected later, when they are used
```

`mon_mds_blocklist_interval` ：MDS 守护的blocklist 条目在OSD map中保留的事件

`mon_osd_blocklist_default_expire` ：客户端的阻止列表条目保留在 OSD 映射中的持续时间（以秒为单位）



### heartbeat

修改心跳设置时，应将它们包含在配置文件的 [global] 部分中。

#### mon_health

`mon_osd_warn_op_age` ：如果 OSD 操作速度慢于此期限（秒），则发出REQUEST_SLOW运行状况警告

`mon_osd_warn_num_repaired` ：如果 OSD 的读取修复次数超过此数量，则发出OSD_TOO_MANY_REPAIRS运行状况警告

`mon_smart_report_timeout` ：smarctl 运行超时（以秒为单位），默认值设置为 5

**mon自动标记osd down**

`mon_osd_min_up_ratio` ：如果 `up` 的 OSD 少于此数量，则不会自动将 OSD 标记为 `out` / `down`

```cpp
# src/mon/OSDMonitor
bool OSDMonitor::can_mark_down(int i){
    # 获取OSD总数
	int num_osds = osdmap.get_num_osds();
    # 获取OSD up的数量
    int up = osdmap.get_num_up_osds() - pending_inc.get_net_marked_down(&osdmap);
    # 计算OSD的实际up率
    float up_ratio = (float)up / (float)num_osds;
    # # 小于参数配置的最小up 率，则报错
    if (up_ratio < g_conf()->mon_osd_min_up_ratio) {}
}
```

`mon_osd_min_in_ratio` ：如果 `in` 的 OSD 少于此数量，则不会自动将 OSD 标记为 `out`

`mon_osd_down_out_interval` ：将所有已 `down` 这么长时间（秒）的 OSD标记为 `out` 

`mon_osd_down_out_subtree_limit` ：如果此大小的整个子树都已 down ，则不会自动将 OSD 标记为“out”

- Ceph 不会自动标记的最小 CRUSH 单元类型。例如，如果设置为 host，并且 host 的所有 OSD 都已 down，Ceph 将不会自动标记这些 OSD。

`mon_osd_report_timeout` ：宣布无响应的 Ceph OSD 守护进程 `down` 之前的宽限期（以秒为单位）。

`mon_osd_min_down_reporters` ：来自不同子树中的OSD报告某个OSD为 `down` 的最小数量

`mon_osd_reporter_subtree_level` ：报告者在哪个级别的父存储桶中计数

- 报告者被计入父存储桶的哪个级别。如果 OSD 发现对等点没有响应，则会向监视器发送故障报告。监视器将报告的 OSD 标记为 `out` ，然后在宽限期后 `down` 

`mon_osd_destroyed_out_interval` ：标记任何已被“destroy”这么长时间（秒）的 OSD“out”

---

**OSD滞后**

`mon_osd_laggy_halflife`、`mon_osd_laggy_weight` 和 `mon_osd_laggy_max_interval`：这些参数分别影响到监控器评估OSD滞后状态的敏感度、时间尺度和最大滞后时间间隔。定义了监控器如何计算OSD的 `laggy_probability` 和 `laggy_interval`

`mon_osd_laggy_halflife` ：OSD“滞后”因子的半衰期

- 滞后多少秒秒数将会衰减

- 源码：大于0

  ```cpp
  # src/mon/OSDMonitor.cc
  utime_t OSDMonitor::get_grace_time(utime_t now,
  				   int target_osd,
  				   failure_info_t& fi) const{
  	double halflife = (double)g_conf()->mon_osd_laggy_halflife;
      double decay_k = ::log(.5) / halflife;
  }
  ```

`mon_osd_laggy_weight` ：滞后估计衰减中新样本的权重。

OSD在整体laggy_probability中标记自己为备份的权重有多大

- 1.0 意味着 OSD 将自身标记为备份（因为它被标记为关闭但实际上并未死亡）意味着 100% laggy_probability;
- 0.0 有效禁用laggy_probability跟踪

`mon_osd_laggy_max_interval` ：在 滞后时间间隔 (laggy_interval) 计算时，标记OSD的周期上限

- OSD 滞后估计中的最大滞后时间间隔（以秒为单位）。监控器使用自适应方法来评估特定 OSD 的 laggy_interval。这个值将用于计算该 OSD 的宽限时间。

`mon_osd_adjust_heartbeat_grace` ：如果对等方看起来滞后，则增加 OSD 心跳宽限度

- 如果 OSD 被标记为 `down` ，但随后又将自身标记为 `up` ，则意味着它实际上并未 `down` ，但无法响应心跳。如果此选项为 true，则可以使用计算的 laggy_probability 和 laggy_interval 值来覆盖这种情况，以增加此 OSD 的检测信号宽限期，以便它不会再次被标记为 `down` 。laggy_probability 是给定 OSD 因为滞后（实际上不是 `down` ）而 `down` 的估计概率，laggy_interval是对滞后时它保持 `down` 时间的估计。

- 这个参数决定了是否根据OSD的 laggy_probability  和 laggy_interval  来调整心跳宽限期，以防止OSD被错误地标记为宕机。
- 即使 `mon_osd_adjust_heartbeat_grace` 设置为 `false`，`mon_osd_laggy_halflife`、`mon_osd_laggy_weight` 和 `mon_osd_laggy_max_interval` 仍然会影响监控器对OSD滞后行为的评估

`mon_osd_adjust_down_out_interval` ：如果 OSD 看起来滞后，则增加mon_osd_down_out_interval

- 默认为true

---

**OSD 自动标记为in**

`mon_osd_auto_mark_in` ：Ceph 将标记Ceph 存储集群中任何启动的 Ceph OSD 守护进程为 `in` 

`mon_osd_auto_mark_auto_out_in` ：将自动标记为 `out` 的所有 OSD 标记为 `in` 

- 由 `mon_osd_down_out_interval` 自动标记为 `out`

`mon_osd_auto_mark_new_in` ：Ceph将新启动的OSD进程自动标记为 `in`

---

`mon_warn_on_slow_ping_time`：这个配置选项提供了一个替代方案，允许你直接指定一个阈值，当心跳的延迟超过这个阈值（以毫秒为单位）时，Ceph将发出健康警告。这个阈值是固定的，不受 `osd_heartbeat_grace` 影响。

只有其为0，mon_warn_on_slow_ping_ratio才生效

- `mon_warn_on_slow_ping_ratio`：这个配置选项定义了一个百分比，当心跳的延迟超过这个百分比时，Ceph将发出健康警告。这个百分比是基于 `osd_heartbeat_grace` 的，也就是说，如果心跳延迟超过了 `osd_heartbeat_grace` 的某个百分比，就会触发警告

因此，`mon_warn_on_slow_ping_ratio` 和 `mon_warn_on_slow_ping_time` 都可以用来设置心跳延迟的健康警告阈值，但它们的工作方式略有不同。`mon_warn_on_slow_ping_ratio` 是基于 `osd_heartbeat_grace` 的百分比，而 `mon_warn_on_slow_ping_time` 是一个固定的阈值。

#### OSD_health

`osd_heartbeat_interval` ：Ceph OSD 守护进程 ping 其对等方的间隔时间（以秒为单位）。

- 对等OSD之间相邻两次 ping 的间隔（以秒为单位）
- 1-20

`osd_heartbeat_grace`：这个配置选项定义了心跳（ping）的超时时间。当一个OSD（Object Storage Device，对象存储设备）没有在规定的时间内发送心跳，Ceph将认为该OSD可能已经 `down` ，并启动故障转移（failover）过程。

- 必须配置在 [global] [osd] [mon] 中都配置
- `osd_heartbeat_grace` 通常应该大于或等于 `osd_heartbeat_interval`，以确保有足够的时间来检测 OSD 是否真的无法响应。
- 20

`osd_heartbeat_stale` ：间隔（以秒为单位），我们将无响应的检测信号对等节点标记为过时 `stable` 。

- 自动将无响应的检测信号会话标记为过时 `stable` 并将其删除。主要好处是 OSD 不需要在内存中保留大量阻塞的心跳消息

- `osd_mon_heartbeat_stale` 应该大于 `osd_heartbeat_grace`，以确保在心跳对等方被标记为 stable 之前，有足够的时间来执行相应的恢复操作
- 600

`osd_mon_heartbeat_interval` ：如果没有 Ceph OSD 守护进程对等方，Ceph OSD 守护进程对 Ceph 监视器执行 ping 操作的频率。

- 定义OSD与mon之间的 ping 频率
- 30

`osd_mon_heartbeat_stat_stale` ：等待这么长时间后仍没有更新，停止报告心跳 ping 时间。设置为零以禁用此操作。

- 3600

`osd_mon_report_interval` ：OSD 向 mon 报告对等故障、满状态更改的频率

- Ceph OSD 守护进程在启动或发生其他可报告事件后向 Ceph Monitor 报告之前可能等待的秒数
- 5
- 独立于心跳间隔设置，因为它是针对状态报告的频率，通常希望较短以便及时响应。

`osd_mon_report_max_in_flight` ：

`osd_beacon_report_interval` ：数定义了 OSD（对象存储守护进程）向监视器（Monitor）发送 beacon 报告的时间间隔。

- Beacon 报告用于检查 OSD 的健康状态和在线状态。通过定期发送 beacon，监视器可以判断 OSD 是否正常运行。

`osd_pg_stat_report_interval_max` ：定义了 OSD 向监视器报告 PG（Placement Group）状态的最大时间间隔。

- PG 状态报告用于更新 PG 的健康状况和统计信息。通过定期发送 PG 状态报告，监视器可以获取到最新的 PG 状态信息。



`osd_heartbeat_use_min_delay_socket` 参数用于控制是否使用最小延迟套接字。

`osd_heartbeat_min_size` ：心跳数据包的最小大小（以字节为单位）。如果心跳数据包小于这个大小，将添加填充数据以达到最小大小。

### mon_log

`mon_log_max` ：要保留的集群最近日志消息数

`mon_log_max_summary` ：要的集群最近重复数据删除的集群日志消息数

`mon_log_full_interval` ：在编码最近日志 keys 的完整副本之前有多少个 epoch

`mon_max_log_entries_per_event` ：每个 Paxos 事件的最大集群日志条目数

1. `mon_log_max`：这个参数定义了 Ceph 集群要保留的最近日志消息的数量。这是一个简单的计数，用于限制日志消息的总数。
2. `mon_log_max_summary`：这个参数定义了要保留的经过重复数据删除的集群日志消息的数量。重复数据删除意味着相似或相同的日志消息会被合并，以减少存储和处理的日志量。
3. `mon_log_full_interval`：这个参数定义了在两次对最近日志 keys 进行完整编码的 epoch 间隔。这可以看作是一种时间或事件的数量限制，用于控制日志数据的压缩和优化。
4. `mon_max_log_entries_per_event`：这个参数定义了每个 Paxos 事件（Paxos 是一种分布式一致性算法）中允许的最大集群日志条目数。Paxos 事件通常用于处理分布式系统中的状态变更。

`mon_health_to_clog_tick_interval`：

- **解释**：这是健康状态检查的周期性时间间隔，控制监视器每隔多长时间检查一次集群的健康状态。单位通常是秒。
- **作用**：这个参数设置了健康检查的频率。

`mon_health_to_clog_interval`：

- **解释**：这是将健康状态信息记录到集群日志（clog）的时间间隔。单位通常是秒。也就是说，即使健康检查更频繁地执行，健康状态信息只有在这个间隔时间内才会被记录到日志中。
- **作用**：确定了这些检查结果中，有多少次检查结果会实际被记录到集群日志中。



`mon_op_log_threshold` ：最大要显示的slow ops

`mon_op_history_slow_op_threshold` ：被视为历史慢速 OP 的 OP 持续时间

### mon_osdmap

`mon_osdmap_full_prune_enabled` ：当我们遍历给定数量的map时，允许修剪完整的 OSDMAP 版本

- `mon_osdmap_full_prune_min` ：存储中触发完整map修剪的最小版本数
- `mon_osdmap_full_prune_interval` ：不会修剪的map之间的间隔;中间的map将被修剪。
- `mon_osdmap_full_prune_txsize` ：我们将在每次迭代中修剪的地图数量



`mon_clean_pg_upmaps_per_chunk` ：PG upmap验证后台工作的粒度





### KVstore

`mon_keyvaluedb` ：用于 MON 数据库的数据库后端













## 身份认证相关参数

`auth_supported` ：所需的身份验证方法（废弃）

### 身份验证

CephX 协议默认启用，提供的身份加密验证具有一定的计算成本，但这通常应该相当低。如果连接客户端和服务器主机的网络环境非常安全并且您无法承担身份验证，则可以禁用它。所以关于节点身份验证协议是一种用户定制化行为，不应该为性能调优打开或关闭该协议。

> 控制的是身份验证（Authentication）的要求，决定是否需要对 Ceph 存储集群的守护进程或客户端进行身份验证。

`auth_cluster_required` ：如果启用此配置设置，则 Ceph 存储集群守护进程（即 ceph-mon、ceph-osd、ceph-mds 和 ceph-mgr）需要相互进行身份验证。有效设置为 cephx 或 none。

`auth_service_required` ：如果启用此配置设置，则只有当这些客户端通过 Ceph 存储集群进行身份验证时，Ceph 客户端才能访问 Ceph 服务（如对象存储、文件系统等）。有效设置为 cephx 或 none。

`auth_client_required` ：如果启用此配置设置，则仅当 Ceph 存储集群针对 Ceph 客户端进行身份验证时，才能建立 Ceph 客户端和 Ceph 存储集群之间的通信。有效设置为 cephx 或 none。

`cephx_require_version` ：Cephx的版本

- 1：表示M版之前
- 2：表示M版之后

`cephx_cluster_require_version`

#### signature

> 控制的是消息签名（Message Signing）的要求，决定是否需要对 Ceph 守护进程之间或客户端与守护进程之间的消息进行签名以确保完整性和防止篡改。

`cephx_require_signatures` ：如果此配置设置设置为 true，Ceph 需要对 Ceph 客户端和 Ceph 存储集群之间以及 Ceph 存储集群内的守护进程之间的所有消息流量进行签名。

- Ceph Argonaut 和 3.19 之前的 Linux 内核版本都不支持签名；如果这些客户端之一正在使用，则可以禁用 cephx_require_signatures 以允许客户端连接

1. **安全性**：设置 `cephx_require_signatures` 为 `true` 可以提高 Ceph 集群的安全性，因为签名可以防止未授权的访问和数据篡改。
2. **性能**：使用签名验证会增加客户端和服务端之间的通信开销，因此在高负载情况下可能会影响性能。
3. **资源消耗**：签名验证需要额外的计算资源，因此在资源有限的集群中可能会成为一个问题。

`cephx_cluster_require_signatures` ：如果此配置设置设置为 true，Ceph 需要对 Ceph 存储集群内的 Ceph 守护进程之间的所有消息流量进行签名。

`cephx_service_require_signatures` ：如果此配置设置设置为 true，Ceph 需要对 Ceph 客户端和 Ceph 存储集群之间的所有消息流量进行签名。

`cephx_sign_messages` ：如果此配置设置设置为 true，并且 Ceph 版本支持消息签名，则 Ceph 将对所有消息进行签名，以便更难以欺骗。

### 密钥相关

共同控制密钥的生命周期和可用性。

1. `max_rotating_auth_attempts`：
   - 定义了在尝试初始化更换密钥时可以进行的最大尝试次数。
   - 如果在这个次数内无法成功初始化旋转密钥，Ceph将停止尝试并记录错误。
2. `rotating_keys_bootstrap_timeout`：
   - 定义了在引导（bootstrap）阶段获取更换密钥的超时时间（以秒为单位）。
   - 在引导阶段，Ceph节点需要获取初始密钥对，以便与其他节点通信。
3. `rotating_keys_renewal_timeout`：
   - 定义了更新密钥的超时时间（以秒为单位）。
   - 密钥更新是周期性的，以保持系统的安全性。

`max_rotating_auth_attempts` 确保在密钥初始化或更新过程中，系统有足够的机会成功完成任务。`rotating_keys_bootstrap_timeout` 和 `rotating_keys_renewal_timeout` 则分别定义了引导阶段和密钥更新阶段的超时时间，确保这些关键操作在一定时间内完成，从而维护系统的安全性和性能。

#### 凭证有效时间

`auth_mon_ticket_ttl` ：定义了监控节点票证的有效期，即从创建到过期的时间长度。当票证过期时，它将不再有效，客户端将需要重新请求一个新的票证来访问集群资源。

### 一些警告

`auth_allow_insecure_global_id_reclaim` ：允许收回global_id，而无需出示证明以前确实拥有该global_id的有效票据

- 允许使用未经授权的global_id（重复）会带来安全风险。遗憾的是，较旧的客户端可能会在重新连接时省略其票证，因此依赖于允许在客户端实例的生命周期内保留其global_id。将此值设置为 false 将立即阻止来自这些客户端的新连接（假设auth_expose_insecure_global_id_reclaim设置为 true），并最终中断现有会话（无论auth_expose_insecure_global_id_reclaim设置如何）。

`auth_expose_insecure_global_id_reclaim` ：强制可能在重新连接时省略其票证的旧客户端在建立会话时重新连接

- 在宽松模式（auth_allow_insecure_global_id_reclaim设置为 true）中，这有助于识别未修补的客户端。在强制模式（auth_allow_insecure_global_id_reclaim设置为 false）中，这是一种快速失败机制：不要建立一个以后几乎不可避免地会中断的会话

`mon_warn_on_insecure_global_id_reclaim` ：如果任何连接的客户端不安全地回收AUTH_INSECURE_GLOBAL_ID_RECLAIM global_id，则发出运行状况警告

`mon_warn_on_insecure_global_id_reclaim_allowed` ：如果允许不安全global_id回收，则发出AUTH_INSECURE_GLOBAL_ID_RECLAIM_ALLOWED运行状况警告

`mon_warn_on_msgr2_not_enabled` ：如果监视器都运行 Nautilus及以上的版本，但并非所有监视器都绑定到 msgr2 端口，则发出MON_MSGR2_NOT_ENABLED运行状况警告

## CRUSH

`crush_location` ：

`crush_location_hook` 

## RADOS

`rados_mon_op_timeout` ：监视器（如 statfs）处理的操作超时（0 表示无限制）

`rados_osd_op_timeout` ：

`rados_tracing` ：tracing 结尾的参数会生成大量日志，仅用于调试目的





## cephsqlite

`cephsqlite_lock_renewal_interval` 指定了锁续期的频率，而 `cephsqlite_lock_renewal_timeout` 指定了锁的总有效时间。如果锁在 `cephsqlite_lock_renewal_timeout` 指定的时间内没有被续期，那么它将自动失效，以防止数据库损坏。换句话说，`cephsqlite_lock_renewal_interval` 应该小于或等于 `cephsqlite_lock_renewal_timeout`，以确保在锁超时之前有足够的机会进行续期。









## 开发相关参数

### 内存相关

`mempool_debug` ：调试内存池？

`thp` ：启用透明大页面 （THP） 支持

- 众所周知，Ceph 会因使用 THP 而遭受内存碎片的困扰。这由配置的内存目标上方的 RSS 使用情况指示。在 Ceph 有选择地使用 THP 之前，目前不鼓励启用 THP。

### msgr相关

`ms_die_on_bad_msg` ：当收到错误的网络消息时，诱导守护程序崩溃退出

- 文档明确指出不要调：https://docs.ceph.com/en/quincy/rados/configuration/network-config-ref/?highlight=ms_die#confval-ms_die_on_bad_msg

`ms_die_on_unhandled_msg` ：当收到无法识别的消息时诱导守护程序崩溃退出

`ms_die_on_old_message` ：当收到旧的、不可解码的消息时，诱导守护进程崩溃退出

`ms_die_on_skipped_message` ：如果发送方跳过消息序列号，则诱导守护程序崩溃退出

`ms_die_on_bug` ：在各种错误上诱导崩溃退出（用于测试目的）

`ms_pq_max_tokens_per_priority` ：文档没有，且无描述

`ms_pq_min_cost` 



`ms_inject_socket_failures` ：每 N 个套接字操作注入一个套接字故障

注入各种内部延迟以诱导争用（秒）

- `ms_inject_delay_type` ：要为其注入延迟的实体类型
- `ms_inject_delay_max` ：注入的最大延迟
- `ms_inject_delay_probability` ：延迟注入的概率
- `ms_inject_internal_delays` ：



`ms_blackhole_osd` 、`ms_blackhole_mon` 、`ms_blackhole_mds` 、`ms_blackhole_mgr` 、`ms_blackhole_client` 、



`inject_early_sigterm` ：这个参数的主要用途是在程序启动的早期阶段模拟接收到 SIGTERM 信号的情况。SIGTERM（信号终止）是一个常见的信号，用于请求进程安全地终止。在正常运行中，当系统管理员想要关闭一个进程时，会发送这个信号给该进程

- 在启动期间尽早向自己发送 SIGTERM，终止进程启动，仅用作调试



### heartbeat

`heartbeat_inject_failure` ：心跳检测注入失败







### cephadm

`lockdep` ：与cephadm的开发与有关，不能在线调整

`lockdep_force_backtrace`：始终在每个锁处收集当前的回溯







### mon

`mon_sync_debug` ：在 Mon 同步期间启用额外调试

- mon_inject_sync_get_chunk_delay



`mon_debug_no_require_bluestore_for_ec_overwrites` ：控制是否在启用纠删码（Erasure Coding，简称EC）重写（overwrites）功能时，是否要求 Bluestore 作为 OSD的存储后端

为 `true` 时，Ceph 将允许在非Bluestore的 OSD 上执行纠删码重写操作。这个选项应该只在开发或测试环境中使用，以帮助诊断和调试与纠删码重写相关的问题。在生产环境中，为了保持性能和数据一致性，应该将这个选项设置为 `false`。



`mon_debug_dump_transactions` ：输出详细的 Paxos 事务到日志，查看和分析 Paxos 事务的细节便于定位相关问题。会对集群性能产生影响

1. **日志文件大小**：输出详细的 Paxos 事务到日志可能会导致日志文件迅速增长，尤其是在高负载或复杂的工作负载下。
2. **性能影响**：输出详细的 Paxos 事务到日志可能会增加监控节点的计算和网络负载，这可能会对集群的性能产生影响。



`mon_debug_deprecated_as_obsolete` ：控制是否将过时的监控节点（Monitoring Service，简称Mon）命令视为废弃的命令

为`true` 时，Ceph 将把那些标记为过时的监控节点命令视为废弃的命令。如果客户端尝试使用这些过时的命令，Ceph 将会拒绝执行这些命令，并可能记录错误日志。

这个选项对 Ceph 集群的性能和稳定性没有直接影响，但它可以帮助管理员识别和处理过时的命令，从而确保集群的稳定性和安全性。在生产环境中，为了保持集群的稳定性和安全性，通常会将这个选项设置为 `false`。



`mon_debug_block_osdmap_trim` ：控制是否阻止 OSDMap 的修剪操作

为 `true` 时

1. **OSDMap 数据积累**：阻止 OSDMap 修剪会导致旧的 OSDMap 数据在监控节点上积累，这可能会占用更多的存储空间。
2. **性能影响**：随着 OSDMap 数据的积累，监控节点的性能可能会受到影响，因为它们需要处理和存储更多的数据。
3. **状态一致性**：阻止 OSDMap 修剪可能会导致集群的状态不一致，因为 OSDMap 数据可能不再反映当前集群的状态。

这个选项应该只在开发或测试环境中使用，以帮助诊断和调试与 OSDMap 修剪相关的问题。在生产环境中，为了保持性能和状态一致性，应该将这个选项设置为 `false`。



`mon_debug_extra_checks` ：控制是否启用一些额外的监控检查。包含了一些调试或测试时可能非常有用的功能，但在生产环境中可能会增加不必要的开销。

1. **额外的计算和网络负载**：额外的监控检查可能会增加监控节点的计算负载，并可能导致额外的网络通信，这可能会对集群的性能产生影响。
2. **资源消耗**：这些额外的检查可能会消耗更多的内存、CPU或其他资源，这在资源有限的集群中可能会成为一个问题。
3. **稳定性风险**：某些额外的检查可能会发现集群中的问题，但这些问题可能不会在生产环境中出现。在启用这些检查时，可能会增加集群出现不稳定性或性能问题的风险。

这些检查的成本太高而无法在生产系统上运行，或者仅在测试或调试时才相关



`mon_mds_force_trim_to` ：强制监视器将 mdsmap 修剪到但不包括此 FSMap epoch。值为 0 会禁用（默认）此配置。该命令有潜在危险，请谨慎使用。

`mon_osd_force_trim_to` ：强制监控节点（Monitoring Service，简称Mon）修剪到指定 epoch 的 OSDMap。

- 修剪操作是 Ceph 用来保持 OSDMap 最新和精简的过程，它移除过时的信息并更新集群的状态。

如果监控节点无法修剪到指定 epoch 的 OSDMap，可能会导致以下问题：

1. **性能问题**：OSDMap 的修剪操作可能会因为无法修剪到指定 epoch 而延迟，影响集群的性能。
2. **稳定性问题**：OSDMap 中的过时信息可能会导致集群的状态不一致，影响集群的稳定性。

在实际应用中，当监控节点执行某些操作时，如执行 OSDMap 的修剪操作，它将尝试修剪到指定 epoch 的 OSDMap。如果无法修剪到指定 epoch，监控节点可能会继续尝试，直到成功修剪或达到某个超时阈值。



`mon_inject_transaction_delay_max` ：控制注入到 Paxos 事务中的最大延迟持续时间，这可以帮助模拟和测试在延迟条件下 Paxos 算法的性能和一致性。

- Paxos 是一个算法，用于在分布式系统中达成一致。在 Ceph 中，Paxos 用于实现高可用性和一致性的分布式存储。

这个选项对 Ceph 集群的性能和稳定性没有直接影响，但它可以帮助管理员模拟和测试在网络延迟或系统故障条件下的 Paxos 性能。

与之相关的是 `mon_inject_transaction_delay_probability`



`mon_inject_pg_merge_bounce_probability` ：在执行 PG（Placement Group）合并操作时，将 PG 数量减少的操作失败并回滚的概率。

- PG 合并操作是 Ceph 用来优化集群性能和存储效率的过程，它通过合并多个 PG 来减少存储资源的占用。

为 `true` 时，模拟在执行 PG 合并操作时可能发生的失败和回滚情况，这可以帮助你测试和验证 PG 合并策略的健壮性和恢复能力。

这个选项对 Ceph 集群的性能和稳定性没有直接影响，但它可以帮助管理员模拟和测试在执行 PG 合并操作时可能遇到的失败情况。



`mon_sync_provider_kill_at` ：在监控节点同步操作的某个特定阶段（由 epoch 标识）执行provider的终止操作。可以帮助你测试和验证监控节点在执行同步操作时在不同阶段的行为和恢复能力。

`mon_sync_requester_kill_at` ：在监控节点同步操作的某个特定阶段（由 epoch 标识）执行requester的终止操作



`mon_debug_unsafe_allow_tier_with_nonempty_snaps` ：默认情况下，Ceph 禁止在非空快照的情况下创建层级，这是出于数据一致性和保护的考虑。如果一个池（pool）中已经有快照存在，创建层级可能会导致快照数据的丢失或损坏。





`mon_client_directed_command_retry` ：客户端向特定监控节点发送定向命令（directed command）时尝试发送的次数。

- 允许客户端在向特定监控节点发送定向命令时，重复尝试发送该命令的次数。如果在这个次数内无法成功发送定向命令，客户端将停止尝试并记录错误。
- 对 Ceph 集群的性能和稳定性没有直接影响，







### objector

`objecter_completion_locks_per_session` ：控制对象执行器（Objecter）在处理每个会话时可以持有的完成锁（completion locks）的最大数量。

- 完成锁是用于协调和同步多个对象执行器操作的机制，以确保数据的一致性和完整性。



`objecter_inject_no_watch_ping` 选项允许对象执行器在发送心跳请求时模拟不响应的情况，这可以帮助模拟和测试在心跳请求未响应时的行为和恢复能力。

- 在生产环境中，为了保持性能和稳定性，通常会将这个选项设置为 `false`。然而，在开发或测试环境中，启用 `objecter_inject_no_watch_ping` 可以有助于诊断和调试与心跳相关的问题。



`objecter_retry_writes_after_first_reply` 控制对象执行器（Objecter）是否在接收到第一个回复后重试写操作，即使之前的写操作已经被确认。这可以帮助模拟和测试在写操作可能失败时的行为和恢复能力。

- 在生产环境中，为了保持性能和稳定性，通常会将这个选项设置为 `false`。然而，在开发或测试环境中，启用 `objecter_retry_writes_after_first_reply` 可以有助于诊断和调试与写操作相关的问题。



`objecter_debug_inject_relock_delay` ：控制对象执行器（Objecter）是否在释放完成锁（completion lock）后注入一个延迟。这可以帮助模拟和测试在完成锁释放后可能遇到的问题。

- 为了保持性能和稳定性，通常会将这个选项设置为 `false`。然而，在开发或测试环境中，启用 `objecter_debug_inject_relock_delay` 可以有助于诊断和调试与完成锁相关的问题。









