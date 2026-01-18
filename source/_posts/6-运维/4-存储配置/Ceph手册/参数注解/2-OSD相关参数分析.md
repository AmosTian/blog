---
title: Ceph参数注解-OSD
categories:
  - 存储
  - 分布式存储
  - Ceph
tags:
  - 存储
  - 分布式存储
  - Ceph
mathjax: true
abbrlink: 2796979247
date: 2024-06-24 14:04:16
---

[TOC]

<!--more-->

## OSD

`objecter_tick_interval` ：Ceph 对象存储层（Object Storage Layer，简称OSD）中对象执行器（Objecter）的 tick 间隔时间。

- tick 是 Ceph 用于协调不同组件之间操作的机制。
- 控制对象执行器Objecter在处理客户端请求和内部操作时的时间间隔，这个选项的值越小，对象执行器执行操作的频率越高，这可能会提高集群的响应速度，但也可能导致资源消耗增加。相反，如果这个值设置得较大，对象执行器执行操作的频率会降低，这可能会减少资源消耗，但也可能导致集群的响应速度变慢。

`objecter_timeout` ：定义了在操作未完成时，对象执行器多久会认为操作“延迟”，并查询监控节点（Monitoring Service，简称Mon）以获取最新的 OSDMap。

`objecter_tick_interval` 控制对象执行器执行操作的频率，而 `objecter_timeout` 控制对象执行器如何处理长时间未完成的操作。

`objecter_inflight_op_bytes` ：最大动态数据数量（双向）

`objecter_inflight_ops` ：最大动态操作数

`osd_ignore_stale_divergent_priors` ：

`osd_auto_mark_unfound_lost` ：当对象在一定时间内无法找到时，是否自动将其标记为丢失（lost）

`osd_check_for_log_corruption` ：如果启用此选项，OSD 在启动时会扫描其日志文件，并检查是否有任何腐败的迹象。这可以帮助检测和防止由于日志文件损坏导致的潜在数据损坏或一致性问题。

- 用于控制 OSD 启动时是否检查日志文件的腐败情况。启用该选项有助于确保数据的一致性和完整性，但可能会增加 OSD 的启动时间。

`osd_force_auth_primary_missing_objects` ：近似缺失对象，在其上方强制auth_log_shard暂时成为主要对象



`threadpool_default_timeout` 是 Ceph 分布式存储系统中的一个配置选项，用于设置线程池中线程的默认超时时间（以秒为单位）。当线程在执行任务时超过了这个超时时间，线程将被视为超时。这个参数有助于控制和管理线程池中的线程行为，特别是在处理长时间运行的任务时。

`threadpool_empty_queue_max_wait` 是 Ceph 分布式存储系统中的一个配置选项，用于设置线程池中线程在队列为空时最大等待时间（以秒为单位）。当线程池的任务队列为空时，线程将等待新的任务进入队列。如果超过了这个等待时间且仍然没有新任务，线程可能会被销毁或释放资源。



`osd_bench_small_size_max_iops` 是 Ceph 分布式存储系统中的一个配置选项，用于设置 OSD（对象存储守护进程）基准测试中小尺寸操作的最大 IOPS（每秒输入/输出操作数）。该配置选项主要用于控制在进行性能基准测试时 OSD 处理小尺寸 I/O 操作的速率，从而评估 OSD 的性能。

`osd_bench_large_size_max_throughput` 

`osd_bench_max_block_size` 



`osd_blkin_trace_all` 是 Ceph 分布式存储系统中的一个配置选项，用于控制 OSD（对象存储守护进程）是否启用对所有操作的详细跟踪。启用此选项后，Ceph 将记录每个 OSD 操作的详细跟踪信息，这对于调试和性能分析非常有用，但也会增加系统的开销和日志量。

`osdc_blkin_trace_all` 是 Ceph 客户端配置中的一个选项，用于控制客户端是否启用对所有操作的详细跟踪。启用此选项后，Ceph 客户端将记录每个操作的详细跟踪信息，这对于调试和性能分析非常有用，但也会增加系统的开销和日志量。





### 存储后端

#### Bluestore

##### 自动调整缓存大小

`bluestore_cache_autotune` ：自动调整分配给各种 BlueStore 缓存的空间比率，同时遵守最小值。

- `osd_memory_target` ：启用 tcmalloc 和缓存自动调整后，请尝试将这么多字节映射到内存中。

  注意：这可能并不完全符合进程的RSS内存使用情况。虽然通常进程映射的堆内存总量应该接近这个目标，但没有保证内核实际上会回收已经被取消映射的内存。在初始开发期间，发现某些内核导致OSD的RSS内存超过映射内存的20%。然而，有人假设当内存压力很大时，内核通常可能会更积极地回收未映射的内存。您的实际体验可能会有所不同。

- `bluestore_cache_autotune_interval` ：启用缓存自动调整时，再平衡之间等待的秒数

  bluestore_cache_autotune_interval 设置Ceph重新计算各种缓存的分配比例的速度

  注意：将此间隔设置得太小可能会导致 CPU 使用率较高和性能较低。

- `osd_memory_base` ：启用 tcmalloc 和缓存自动调整后，估计 OSD 所需的最小内存量（以字节为单位）

  这用于帮助自动调整器估计缓存的预期聚合内存消耗。

- `osd_memory_expected_fragmentation` ：估计内存碎片的百分比

- `osd_memory_cache_min` ：设置用于缓存的最小内存量。将此值设置得太低可能会导致严重的缓存抖动。

- `osd_memory_cache_resize_interval` ：在调整缓存大小之间等待这么多秒。

  此设置更改 BlueStore 可用于缓存的内存总量。请注意，将此间隔设置得太小可能会导致内存分配器混乱并降低性能。

##### 手动调整缓存大小



`bluestore_cache_size` ：Bluestore 的缓存大小

- 这包括 BlueStore 缓存的数据和元数据，以及专用于 rocksdb 缓存的内存。
- 为0，则使用ssd或hdd
  - `bluestore_cache_size_hdd` ：当由 HDD 支持时，BlueStore 将用于其缓存的默认内存量。
  - `bluestore_cache_size_ssd` :

`bluestore_cache_meta_ratio` ：bluestore 缓存用于元数据的比例

`bluestore_cache_kv_ratio` ：bluestore缓存用于键/值数据库（RocksDB）的比例

`bluestore_cache_kv_onode_ratio` ：bluestore 缓存与 kv onode 柱族的比率 （rocksdb）



##### 校验和

`bluestore_csum_type` ：要使用的默认校验和算法

##### 压缩算法



`bluestore_compression_mode` ：当池未指定时的默认压缩策略

- 不为none表示使用压缩

- 对于 `bluestore_compression_algorithm` ，只能是某个算法的字符串，不能是列表 

  bluestore 压缩算法源码

  ```cpp
  # src/os/bluestore/BlueStore.cc
  void BlueStore::_set_compression(){
  	auto& alg_name = cct->_conf->bluestore_compression_algorithm;
  compressor = Compressor::create(cct, alg_name);
  }
  
  CompressorRef Compressor::create(CephContext *cct, int alg){
  	if (alg < 0 || alg >= COMP_ALG_LAST) {
  	 lderr(cct) << __func__ << " invalid algorithm value:" << alg << dendl;
  	 return CompressorRef();
  	}
  	std::string type_name = get_comp_alg_name(alg);
  	return create(cct, type_name);
  }
  
  # src/compressor/Compressor.cc
  CompressorRef Compressor::create(CephContext *cct, const std ::string &type){
  	# 根据type指定的压缩算法名称，创建压缩器插件实例
  	if (type == "random") {
  		int alg = ceph::util::generate_random_number(0, COMP_ALG_LAST - 1);
  		if (alg == COMP_ALG_NONE) {
  		  return nullptr;
  		}
  	 return create(cct, alg);
  	}
  	# 对于其他非 "random" 类型的type，
  	# 它会尝试使用ceph::CompressionPlugin 的工厂模式来创建压缩器实例
  	CompressorRef cs_impl = NULL;
  	std::stringstream ss;
  	auto reg = cct->get_plugin_registry();
  	# 因此，如果 alg_name 是一个逗号分隔的列表，
  	# Compressor::create 不会自动尝试列表中的其他算法名称。
  	# 	只会尝试使用列表中的第一个算法名称来创建压缩器。
  	# 	如果第一个算法名称无效或创建失败，它不会继续尝试列表中的其他算法名称
  	auto factory = dynamic_cast<ceph::CompressionPlugin*>(reg->get_with_load("compressor", type));
  	int err = factory->factory(&cs_impl, &ss);
  	return cs_impl;
  }
  
  #src/common/PluginRegistry.cc
  Plugin *PluginRegistry::get_with_load(const std::string& type, const std::string& name){
  	Plugin* ret = get(type, name);
  }
  
  Plugin *PluginRegistry::get(const std::string& type, const std::string& name){	
  	# 找到插件用迭代器i接收
  	std::map<std::string,map<std::string,Plugin*> >::iterator i = plugins.find(type);
  	# 在插件中找name类型，
  	j = i->second.find(name);
  }
  ```

- `bluestore_compression_required_ratio` ：存储压缩数据所需的压缩比

  如果我们压缩数据并得到的少于此值，我们将丢弃结果并存储原始未压缩的数据。

  压缩后的数据块的大小相对于原始大小的比率必须至少如此小才能存储压缩版本。

- `bluestore_compression_min_blob_size` ：当对象需要随机访问时，要应用压缩的最大块大小。

  小于此值的块永远不会被压缩。

  - `bluestore_compression_min_blob_size_hdd` ：旋转介质的bluestore_compression_min_blob_size默认值 
  - `bluestore_compression_min_blob_size_ssd` 固态介质的bluestore_compression_min_blob_size默认值 

- `bluestore_compression_max_blob_size` ：当需要对对象进行非随机访问时，要应用压缩的最大块大小。大于此值的块在压缩之前被分解成更小的块

  - `bluestore_compression_max_blob_size_hdd` ：旋转介质的默认值 bluestore_compression_max_blob_size
  - `bluestore_compression_max_blob_size_ssd` ：非旋转介质(SSD，NVMe)的默认值 bluestore_compression_max_blob_size





##### rocksdb

 `bluestore_rocksdb_cf` ：允许对 bluestore 元数据使用 rocksdb 列族。

- 如果为 true，则使用 bluestore_rocksdb_cfs。仅当 OSD 执行 --mkfs 时应用。

- `bluestore_rocksdb_cfs` ：列族的定义及其分片

  以空格分隔的元素列表： column_def [ '=' rocksdb_options ]。column_def ：= column_name [ '（' shard_count [ '，' hash_begin '-' [ hash_end ] ] '）' ]。示例：'I=write_buffer_size=1048576 O（6） m（7,10-）'。间隔 [hash_begin..hash_end） 定义用于哈希计算的字符。推荐的哈希范围：O（0-13） P（0-8） m（0-16）。不建议对 S、T、C、M、B 前缀进行分片

##### 流量控制Throttling

`bluestore_throttle_bytes` ：在开始限制IO提交之前，已经发出但尚未确认完成的IO请求字节数

`bluestore_throttle_deferred_bytes` ：限制 IO 提交之前，延迟写入的最大字节数

`bluestore_throttle_cost_per_io` ：每个 IO 的事务成本（以字节为单位）的开销增加

- `bluestore_throttle_cost_per_io_hdd` 
- `bluestore_throttle_cost_per_io_ssd`

`bluestore_throttle_trace_rate` ：对 bluestore 事务进行采样的速率（每秒）

- 可以小于等于0

```cpp
#if defined(WITH_LTTNG)
      double rate = conf.get_val<double>("bluestore_throttle_trace_rate");
      trace_period_mcs = rate > 0 ? floor((1/rate) * 1000000.0) : 0;
#endif
```

##### 对象的最小分配



`bluestore_use_optimal_io_size_for_min_alloc_size` ：发现介质最佳 IO 大小并使用 min_alloc_size

- 为 false，才能手动调整
- `bluestore_min_alloc_size` ：要为对象分配的最小分配大小
  - 较小的分配大小通常意味着在触发 copy-on-write 操作时（例如，在写入最近快照的内容时）读取然后重写的数据更少。同样，在执行覆盖之前记录的数据较少（小于min_alloc_size的写入必须首先通过 BlueStore 日志）。较大的 min_alloc_size 值可以减少描述磁盘布局所需的元数据量，并减少整体碎片。
  - `bluestore_min_alloc_size_hdd` 
  - `bluestore_min_alloc_size_ssd` 
- `bluestore_max_alloc_size` ：单个分配的最大大小（0 表示无最大值）

`bluestore_prefer_deferred_size` ：写入小于此大小的数据将被写入日志，然后异步写入设备。当使用旋转媒体时，这可以带来好处，因为寻址操作成本高昂，无论使用固态日志/WAL设备还是非固态日志/WAL设备，这种方式都有帮助。





##### BlueFS



`bluefs_alloc_size` 是 Ceph 分布式存储系统中的一个配置选项，用于控制 BlueStore 的 BlueFS 文件系统的分配单元大小。BlueFS 是 BlueStore 使用的轻量级文件系统，用于管理元数据（metadata）和小对象。调整 `bluefs_alloc_size` 可以影响 BlueFS 的性能和存储效率。

- DB 和 WAL 设备的分配单元大小

`bluefs_shared_alloc_size` 是 Ceph 分布式存储系统中的一个配置选项，用于控制 BlueFS 文件系统的共享分配单元大小。BlueFS 是 BlueStore 使用的轻量级文件系统，用于管理元数据和小对象。调整 `bluefs_shared_alloc_size` 可以影响 BlueFS 的性能和存储效率，特别是在处理共享的写入负载时。

- 主共享设备的分配单元大小

`bluefs_failed_shared_alloc_cooldown` ：遇到ENOSPC故障后，下次尝试使用 “bluefs_shared_alloc_size” 的间隔时间（以秒为单位）

- 冷却周期（以秒为单位），当 BlueFS 面临可恢复的（通过回退到较小数据块大小）ENOSPC（无剩余空间）失败时，使用共享/慢设备分配大小而不是“bluefs_shared_alloc_size”定义的大小。这主要是为了避免重复的失败分配，这些分配可能会非常昂贵。

`bluefs_max_prefetch` ：

`bluefs_replay_recovery` ：尝试读取 bluefs 日志，该日志太大，以至于无法读取。

- 如果 BlueFS 日志增长到极端大小 （200GB+），则它很可能变得不可读。此选项支持扫描设备以启发式方法查找缺失数据。默认情况下不启用

`bluefs_check_for_zeros` ：检查读取的数据是否存在可疑页面

- 查看读取的数据以检查是否存在完全由零填充的 4K 块。如果发生这种情况，我们会重新读取数据。如果存在差异，我们将错误打印到日志

`bluefs_check_volume_selector_on_umount` ：检查umount上volume_selector的有效性

- 检查 volume_selector 是否未偏离其应处于的状态。引用是从 bluefs inode 表构造的。对不一致的断言

`bluefs_check_volume_selector_often` ：定期检查 volume_selector 的有效性

---

`bluestore_bluefs` ：使用 BlueFS 支持 rocksdb

- BlueFS允许rocksdb与 BlueStore 的其余部分 共享相同的物理设备。它应该在所有情况下使用，除非为Bluestore测试/开发替代的元数据数据库

`bluestore_bluefs_env_mirror` 将 bluefs 数据镜像到文件系统进行测试/验证

`bluestore_bluefs_max_free` ：分配给 BlueFS 的最大可用空间

`bluestore_bluefs_alloc_failure_dump_interval` ：在BlueFS空间分配失败时转储分配器的频率（以秒为单位）

---

`bluestore_spdk_mem` ：dpdk 内存大小（以 MB 为单位）

- 如果每个节点运行多个 SPDK 实例，则必须指定每个实例将使用的 dpdk 内存大小（以 MB 为单位），以确保每个实例使用自己的 dpdk 内存

`bluestore_spdk_max_io_completion` ：检查队列对完成时要批处理完成的最大 IO，0 表示让 spdk 库确定它

##### blob_size



`bluestore_max_blob_size` ：Bluestore blob 是源自一个或多个对象的盘区（即磁盘上数据）的集合。可以压缩 Blob，通常具有校验和数据，可以覆盖，可以共享（使用范围参map）或拆分。此设置控制允许的 blob 的最大大小。

##### bluestore_extent_map_shard



`bluestore_extent_map_shard_max_size`  ：拆分前单个 extent map分片的最大大小（字节）

`bluestore_extent_map_shard_target_size` ：单个 extent map分片的目标大小（字节）

`bluestore_extent_map_shard_min_size` ：拆分前单个 extent map分片的最小大小（字节）

`bluestore_extent_map_shard_target_size_slop` ：在尝试对齐到现有范围或数据块边界时，分片的目标比例高于/低于目标。

`bluestore_extent_map_inline_shard_prealloc_size` 

##### bluestore_avl



`bluestore_avl_alloc_ff_max_search_count` ：在切换到best-fit模式之前，使用first-fit 模式搜索的次数，0 遍历所需块的所有范围。

`bluestore_avl_alloc_ff_max_search_bytes` 

`bluestore_avl_alloc_bf_threshold` ：设置了一个阈值，当最大的空闲数据块大小小于这个阈值时，分配器会切换到最佳拟合（best-fit）模式

- AVL分配器工作在两种模式下：近似拟合和最佳拟合。
- 默认情况下，它使用非常快速的近似拟合模式，在这种模式下，它试图将一个新的数据块放置在最后一个分配的相似大小的数据块附近。
- 第二种模式是更慢的最佳拟合模式，在这种模式下，它试图为请求的分配找到一个完全匹配。当设备变得碎片化或者空闲空间不足时，使用这种模式。当最大的空闲数据块小于 ‘bluestore_avl_alloc_bf_threshold’ 时，将使用最佳拟合模式。

`bluestore_avl_alloc_bf_free_pct` ：设置了一个阈值，当空闲空间缩小到这个百分比（整数）时，将触发启用最佳拟合模式。

- AVL分配器工作在两种模式下：near-fit 和 best-fit。默认情况下，它使用非常快速的near-fit模式，在这种模式下，它试图将一个新的数据块放置在最后一个分配的相似大小的数据块附近。
- 第二种模式是更慢的best-fit模式，在这种模式下，它试图为请求的分配找到一个完全匹配。当设备变得碎片化或者空闲空间不足时，使用这种模式。当空闲空间小于 ‘bluestore_avl_alloc_bf_free_pct’ 时，将使用最佳拟合模式。

##### bluestore_volume



`bluestore_volume_selection_policy` ：确定 bluefs 卷选择策略

- 确定 bluefs 卷选择策略。
  - “use_some_extra”策略允许覆盖 RocksDB 级别的粒度，并将高级数据放到更快的设备上，即使该级别不完全适合那里。
  - “fit_to_fast”策略允许使用 100% 更快的磁盘容量，并允许用户在 RocksDB 选项中打开“level_compaction_dynamic_level_bytes”选项。

`bluestore_volume_selection_reserved_factor` ：数据库级大小乘数。

- 确定数据库设备上的空间量，以便在“使用一些额外”策略生效时禁止使用。保留大小确定为 sum（L_max_size[0]， L_max_size[L-1]） + L_max_size[L] * this_factor

  ```cpp
  // Calculating how much extra space is available at DB volume.
  // Depending on the presence of explicit reserved size specification it might be either
  // * DB volume size - reserved
  // or
  // * DB volume size - sum_max_level_size(0, L-1) - max_level_size(L) * reserved_factor
  if (!reserved) {
      uint64_t prev_levels = _level0_size;
      uint64_t cur_level = _level_base;
      uint64_t cur_threshold = 0;
      do {
          uint64_t next_level = cur_level * _level_multiplier;
          uint64_t next_threshold = prev_levels + cur_level + next_level * reserved_factor;
          if (_db_total <= next_threshold) {
              db_avail4slow = cur_threshold ? _db_total - cur_threshold : 0;
              break;
          } else {
              prev_levels += cur_level;
              cur_level = next_level;
              cur_threshold = next_threshold;
          }
      } while (true);
  } else {
      db_avail4slow = _db_total - reserved;
  }
  
  这段代码是用来计算数据库卷上除预留空间外还剩下多少额外空间的。其逻辑依据是否存在明确的预留空间大小指示分为两种情况处理：
  
  如果指定了预留空间（reserved为真）：计算很简单，直接从数据库总大小（_db_total）中减去预留的空间大小，得到的结果就是可用空间db_avail4slow。
  
  如果没有指定预留空间（reserved为假）：则通过一个循环动态计算。这个过程基于一个层级体系，每一层的大小基于前一层按一定的倍数（_level_multiplier）增长，并且每一层都会计算一个阈值，该阈值由前面所有层的大小之和加上当前层大小以及根据reserved_factor调整的下一层大小组成。循环会持续进行，直到计算出的阈值超过了数据库的总大小。此时，如果当前阈值不为零，则可用空间为数据库总大小减去这个阈值；如果当前阈值为零，则说明没有额外空间。
      reserved_factor应当是一个正数，用来调整最后一层大小在计算阈值时的影响。如果这个值不是正数，可能会导致计算逻辑出现问题，因此在实际应用中应该确保其合理性。
  ```

  

`bluestore_volume_selection_reserved` ：在数据库设备上保留空间，不允许用于“use_some_extra”策略。覆盖“bluestore_volume_selection_reserved_factor”设置并引入直接限制

```cpp
# src/os/BlueStore.cc
new RocksDBBlueFSVolumeSelector(
    bluefs->get_block_device_size(BlueFS::BDEV_WAL) * 95 / 100,
    bluefs->get_block_device_size(BlueFS::BDEV_DB) * 95 / 100,
    bluefs->get_block_device_size(BlueFS::BDEV_SLOW) * 95 / 100,
    1024 * 1024 * 1024, //FIXME: set expected l0 size here
    rocks_opts.max_bytes_for_level_base,
    rocks_opts.max_bytes_for_level_multiplier,
    reserved_factor,
    cct->_conf->bluestore_volume_selection_reserved,
    cct->_conf->bluestore_volume_selection_policy == "use_some_extra");

RocksDBBlueFSVolumeSelector(
    uint64_t _wal_total,
    uint64_t _db_total,
    uint64_t _slow_total,
    uint64_t _level0_size,
    uint64_t _level_base,
    uint64_t _level_multiplier,
    double reserved_factor,
    uint64_t reserved,
    bool new_pol)
```



- `bluestore_bluefs_min` 和 `bluestore_bluefs_min_free` 都指定了 BlueFS 的最小空间需求，但一个是总的磁盘空间，另一个是空闲空间。
- `bluestore_bluefs_max_free` 指定了 BlueFS 可以拥有的最大空闲空间量，这个值应该大于或等于 `bluestore_bluefs_min_free`。
- `bluestore_bluefs_min_ratio` 和 `bluestore_bluefs_max_ratio` 定义了 BlueFS 可以使用的磁盘空间的最小和最大比例。`bluestore_bluefs_min_ratio` 应该小于或等于 `bluestore_bluefs_max_ratio`。
- `bluestore_bluefs_gift_ratio` 和 `bluestore_bluefs_reclaim_ratio` 定义了 BlueFS 在一次操作中可以增加或减少的空闲空间的最大比例。这两个比例应该在 `bluestore_bluefs_min_ratio` 和 `bluestore_bluefs_max_ratio` 定义的范围内。
  - **bluestore_bluefs_gift_ratio**: 这是一次性可以分配给 BlueFS 的最大空闲空间比例。默认值是 0.02，即 2%。
  - **bluestore_bluefs_reclaim_ratio**: 这是一次性可以从 BlueFS 回收的最大空闲空间比例。默认值是 0.20000000000000001，即 20%。





#### Filestore

`filestore_debug_omap_check` 



##### journal



`osd_journal` ：OSD 日志的路径（当使用 FileStore 后端时）

- OSD 日志的路径。这可能是文件或块设备（例如 SSD 的分区）的路径。如果它是文件，则必须创建目录来包含它。当 osd_data 驱动器是 HDD 时，我们建议使用单独的快速设备。

`osd_journal_size` ：FileStore journal 的大小（以 MiB 为单位）

`filer_max_purge_ops` 在执行日志条带清理操作时，可以同时进行的最大操作数。这个值会影响清理操作的并发性和效率，同时也可能影响集群的性能。

- 这个选项影响 Ceph 文件存储（Filestore）组件的 purge 行为

`filer_max_truncate_ops` 在执行日志条带裁剪/删除操作时，可以同时进行的最大操作数。这个值会影响裁剪/删除操作的并发性和效率，同时也可能影响集群的性能。

- 这个选项影响 Ceph 文件存储（Filestore）组件的 truncate 行为



`journaler_write_head_interval` ：对象存储设备（OSD）在写入日志头部时应该等待的时间长度。

- 日志头部包含有关日志条带的最新状态信息，这些信息对于日志的重放（replay）操作至关重要。
- 影响 Ceph 文件存储（Filestore）组件的行为
  - **性能**：设置一个较高的 `journaler_write_head_interval` 值可能会导致日志头部更新不频繁，这可能会影响日志条带的重放效率。
  - **稳定性**：设置一个较低的 `journaler_write_head_interval` 值可以确保日志头部更新更加频繁，这有助于保持日志条带状态的最新性，从而提高集群的稳定性。

`journaler_prefetch_periods` ：允许对象存储设备（OSD）在处理 MDS 日志时预先获取多个条带化周期（striping periods）的数据。

- 条带化是一种数据分布技术，用于将数据分散存储在多个 OSD 上。
- **性能**：设置一个较高的 `journaler_prefetch_periods` 值可以提高读取 MDS 日志的效率，因为 OSD 可以同时处理多个条带化周期的数据。然而，这也可能会增加集群的负载，尤其是在高并发情况下。
- **稳定性**：设置一个较低的 `journaler_prefetch_periods` 值可以减少集群的负载，从而提高稳定性。然而，这也可能会降低读取 MDS 日志的效率，导致操作需要更长的时间来完成。

`journaler_prezero_periods` ：将 MDS 日志写入位置的条带化周期数归零



### 清洗

`mon_scrub_interval` ：清理 MON 数据库的频率

- 大于 mon_scrub_timeout

`mon_scrub_timeout`：当监视器仲裁参与者对最新数据块没有响应时，重新启动清理操作的超时时间。

- 进行scrub操作时可以等待的时间长度

`mon_scrub_timeout` 需要大于 `osd_heartbeat_grace` 和 `osd_recovery_timeout`，以确保在执行 scrub 操作时不会因为心跳超时而中断。scrub 操作是一个耗时的过程，它涉及到对 OSD 上的数据进行完整性检查和修复，这可能会占用大量的系统资源

1. **心跳超时（osd_heartbeat_grace）**：当一个 OSD 在 `osd_heartbeat_grace` 指定的时间内没有发送心跳，Ceph 可能会认为该 OSD 已经失败，并开始执行故障转移。如果在执行 scrub 操作时 OSD 的心跳超时，scrub 操作可能会因为故障转移而中断。因此，`mon_scrub_timeout` 需要足够长，以确保在 scrub 操作完成之前，OSD 不会因为心跳超时而失败。
2. **恢复超时（osd_recovery_timeout）**：如果一个 OSD 正在执行恢复操作（例如，从副本故障中恢复），Ceph 可能会等待一段时间（`osd_recovery_timeout`）以确保恢复操作完成。如果在执行 scrub 操作时 OSD 正在恢复，scrub 操作可能会因为恢复操作的超时而中断。因此，`mon_scrub_timeout` 需要足够长，以确保在 scrub 操作完成之前，OSD 不会因为恢复操作的超时而失败。

`mon_scrub_max_keys` ：每个清理 chunk/step 的最大键数

`mon_warn_pg_not_scrubbed_ratio` ：超过最大清洗间隔的百分比，以发出警告

`mon_warn_pg_not_deep_scrubbed_ratio` ：超过最大深度清洗间隔的百分比，以发出警告

`mon_scrub_inject_crc_mismatch` ：将 CRC 错配注入 Mon Scrub 的概率

- 在 scrub 过程中故意注入 CRC 不匹配错误

`mon_scrub_inject_missing_keys` ：将丢失的keys注入 Mon Scrub 的概率

- 在 mon scrub 过程中注入丢失的 keys 的概率

`mon_sync_debug` ：在 Mon 同步期间启用额外调试

`mon_inject_sync_get_chunk_delay` ：同步期间注入延迟（秒）



`osd_max_scrubs` ：单个 OSD 上的最大并发清理次数

从源码看，不应该为负数

```cpp
# src/osd/scrubber/osd_scrub_sched.cc
bool ScrubQueue::can_inc_scrubs() const{
  // consider removing the lock here. Caller already handles delayed
  // inc_scrubs_local() failures
  std::lock_guard lck{resource_lock};

  if (scrubs_local + scrubs_remote < cct->_conf->osd_max_scrubs) {
    return true;
  }

  dout(20) << " == false. " << scrubs_local << " local + " << scrubs_remote
	   << " remote >= max " << cct->_conf->osd_max_scrubs << dendl;
  return false;
}

bool ScrubQueue::inc_scrubs_local(){
      if (scrubs_local + scrubs_remote < cct->_conf->osd_max_scrubs) {
      }
}


bool ScrubQueue::inc_scrubs_remote(){
      if (scrubs_local + scrubs_remote < cct->_conf->osd_max_scrubs) {
      }
}
```

`osd_scrub_begin_hour` ：将擦洗限制在一天中的这个小时或更晚，全天使用 osd_scrub_begin_hour=0 和 osd_scrub_end_hour=0

- 与 osd_scrub_end_hour 一起定义了一个可以发生清理的时间窗口。
- 但无论时间窗口是否允许，只要归置组的清理间隔超过 osd_scrub_max_interval，都会执行清理。

`osd_scrub_end_hour` ：将擦洗时间限制在一天中早于此时间，全天使用 osd_scrub_begin_hour=0 和 osd_scrub_end_hour=0

`osd_scrub_begin_week_day` ：将擦洗限制在一周中的这一天或之后

- 0 = 星期日，1 = 星期一，以此类推。整周使用 osd_scrub_begin_week_day=0 osd_scrub_end_week_day=0

`osd_scrub_end_week_day` ：将擦洗时间限制在早于一周中的这天

- 0 = 星期日，1 = 星期一，以此类推。整周使用 osd_scrub_begin_week_day=0 osd_scrub_end_week_day=0。
- 但是，当PG的清理间隔超过osd_scrub_max_interval时，无论时间窗口是否允许，都会执行清理。

`osd_scrub_during_recovery` ：允许在 OSD 上的 PG 正在进行恢复时进行清理

`osd_scrub_load_threshold` ：当系统负载除以 CPU 数量低于此值时，允许清理

- 标准化最大负载。当系统负载高于此数字时，Ceph 将不会进行清理

```cpp
# src/osd/scrubber/osd_scrub_sched.cc
bool ScrubQueue::scrub_load_below_threshold() const{
	1. 调用getloadavg函数获取系统最近1分钟、5分钟和15分钟的平均负载，存储在loadavgs数组中。
        如果无法获取平均负载，则打印错误信息并返回false。
	2. 计算每个CPU的平均负载，如果系统有多个CPU，则将总平均负载除以CPU数量；如果系统没有可用的CPU，则直接使用总平均负载。
	3. 如果每个CPU的平均负载低于配置文件中设定的osd_scrub_load_threshold阈值，则打印相关信息并返回true。
	4. 如果当前平均负载低于每日平均负载且低于15分钟平均负载，则打印相关信息并返回true。
	5. 如果以上条件都不满足，则打印相关信息并返回false。
}
```

- 需要大于0
  - 当设置为0时，理论上意味着只要系统有任何负载（即使非常轻微）， Scrub操作就不会启动，这显然是不合理的限制。
  - 如果设置为负数，则逻辑上更加无法解释，因为系统负载（如CPU负载平均值）总是非负的，负的阈值无法用来进行有效的比较判断。

`osd_scrub_min_interval` ：当Ceph存储集群负载较低时，每个PG的两次清理的最小时间间隔

`osd_scrub_max_interval` ：当Ceph存储集群负载较低时，每个PG的两次清理的最大时间间隔

- osd_scrub_min_interval < osd_scrub_max_interval

`osd_scrub_chunk_min` ：单个块中要清理的最小对象数

- 在单个操作期间要清理的对象存储块的最小数量。 Ceph 在清理期间阻止写入单个块。

`osd_scrub_chunk_max` ：单个块中要清理的最大对象数

`osd_scrub_sleep` ：在清理过程中注入延迟的持续时间

- 清理下一组对象（下一个块）之前的睡眠时间（以秒为单位）。增加此值将减慢清理的总体速度，从而减少清理对客户端操作的影响。
- 当使用 mClock 调度程序时，此设置将被忽略。

`osd_deep_scrub_interval` ：深度擦洗每个 PG（即验证数据校验和）的最短时间间隔

- osd_deep_scrub_interval大于等于 osd_scrub_max_interval

`osd_scrub_interval_randomize_ratio` ：清洗间隔的随机变化率

- 这通过随机改变擦洗间隔来防止擦洗“踩踏”，以便它们在一周内很快均匀分布
- 在为 PG 安排下一个清理作业时，向 osd_scrub_min_interval 添加随机延迟。这个随机延迟是一个小于 osd_scrub_min_interval * osd_scrub_interval_randomized_ratio 的随机值。默认设置在整个允许的时间窗口 [1, 1.5] * osd_scrub_min_interval 内展开清理。

`osd_deep_scrub_stride` ：深度清理期间一次从对象读取的字节数

`osd_scrub_auto_repair` ：自动修复擦洗过程中检测到的损坏对象。

- 但是，如果发现超过 osd_scrub_auto_repair_num_errors 个错误，则不会执行修复。

`osd_scrub_auto_repair_num_errors` ：要自动修复的最大检测到的错误数

### 操作

`osd_op_num_shards` ：为给定 OSD 分配的 shards 数量。每个 SHARD 都有自己的处理队列。OSD上的PG在 shard 中均匀分布。

- 重启后生效
- 如果非零，此设置将覆盖 _ssd 和 _hdd。

`osd_op_num_shards_hdd` ：为给定 OSD（对于机械硬盘）分配的 shard 数量。

- 重启后生效

`osd_op_num_shards_ssd` ：为给定 OSD（对于固态硬盘）分配的 shard 数量。

- 重启后生效

`osd_op_queue` ：要使用的操作优先级队列算法

- 设置了用于对每个 OSD 内的操作进行优先级排序的队列类型。两个队列都具有严格的子队列，该子队列在正常队列之前出队。普通队列在不同的实现中是不同的。

  - WeightedPriorityQueue (wpq) 根据其优先级使操作出队，以防止任何队列饥饿。当少数 OSD 比其他 OSD 过载时，WPQ 应该会有所帮助。

  - mClockQueue (mclock_scheduler) 根据操作所属的类（恢复、清理、snaptrim、客户端操作、osd 子操作）对操作进行优先级排序。

    [QoS Based on mClock](https://docs.ceph.com/en/latest/rados/configuration/osd-config-ref/#qos-based-on-mclock).

  - debug_random ：调试用，完全随机

- 重启后生效

`osd_op_queue_cut_off` ：高优先级 OPS 和低优先级 OPS 之间的阈值

- 使用严格优先级排序的高优先级 OPS 和使用可能包含或可能不包含优先级的公平性算法的低优先级 OPS 之间的阈值

**优先级相关**

值越大，优先级越大

`osd_client_op_priority` ：为客户端操作设置的优先级。该值与下面的osd_recovery_op_priority 相关。默认情况下强烈支持客户端操作而不是恢复。

- 63

`osd_recovery_op_priority` ：相对于客户端操作的恢复操作的优先级（如果池的 recovery_op_priority 未指定）。默认值优先考虑客户端操作（见上文）而不是恢复操作。

- 您可以通过降低该值以提高客户端操作的优先级，或通过增加该值以有利于恢复，来调整客户端影响与恢复集群运行状况的时间之间的权衡。
- 3

`osd_scrub_priority` ：工作队列中清理操作的优先级

- 当池未指定 scrub_priority 值时，计划清理的默认工作队列优先级。当清理阻塞客户端操作时，可以将其提高到 osd_client_op_priority 的值
- 5

`osd_requested_scrub_priority` ：为工作队列中的用户清理请求设置优先级。

- 当清理阻碍客户端操作时，如果该值小于 osd_client_op_priority，则可以将其提升至 osd_client_op_priority 的值。

`osd_snap_trim_priority` ：为快照修剪工作队列设置的优先级。

`osd_snap_trim_sleep` ：下次对齐修剪前的睡眠时间（以秒为单位）（覆盖以下值）

- 不为0，则下列参数不生效

- `osd_snap_trim_sleep_hdd` ：HDD 下次对齐修剪前的睡眠时间（以秒为单位）
- `osd_snap_trim_sleep_ssd` ：SSD下次对齐修剪前的睡眠时间（以秒为单位）
- `osd_snap_trim_sleep_hybrid` ：当数据在 HDD 上而日志在 SSD 上时，在下一次快照修剪之前进入睡眠状态的时间（以秒为单位）

**操作时长**

`osd_op_thread_timeout` ：Ceph OSD 守护进程操作线程超时（以秒为单位）

- 控制的是单个操作线程的超时，可能会导致线程被终止。

`osd_op_thread_suicide_timeout` ： 

- osd_op_thread_timeout 定义了单个操作线程的超时时间。这是单个操作线程等待超时的时间量。 osd_op_thread_suicide_timeout 定义了整个 OSD 操作线程的超时时间。这是 OSD 在认为情况严重并关闭或“自杀”之前等待的时间量。 本质上，如果一个单独的线程超时，其他线程还有一段缓冲时间来完成它们的操作，在此之前，由于长时间的没有响应，整个 OSD 守护进程不会决定关闭。因此，使 osd_op_thread_timeout 小于 osd_op_thread_suicide_timeout 可以确保系统在单个线程超时的情况下有机会恢复，而不会过早地终止整个守护进程。

`osd_op_complaint_time` ：经过指定的秒数后，操作将变得值得投诉。

- 控制的是整个操作的投诉阈值，仅用于生成警告。



`osd_op_history_size` ：要跟踪的已完成操作的最大数量。

- 默认值是20，意味着OSD会记录最近完成的20个操作的信息。

`osd_op_history_duration` ：要跟踪的最早完成的操作。

- 这个参数的默认值是600秒（10分钟），意味着OSD会记录过去10分钟内完成的操作的信息。

`osd_op_log_threshold` ：一次显示多少个操作日志。

`osd_enable_op_tracker` 

`osd_target_transaction_size` ：设置了 OSD 在处理 I/O 请求时目标事务的大小（以字节为单位），影响 OSD 将多个小的 I/O 操作打包成一个事务来进行处理的行为。这对于优化性能和资源使用非常重要。

### snap

`osd_max_snap_prune_intervals_per_epoch` ：用于控制每个 epoch（周期）内 OSD 可以修剪（prune）快照（snapshots）的最大间隔次数。这对于管理和优化快照的删除过程非常重要，特别是在有大量快照的场景中。

`osd_rollback_to_cluster_snap` ：操作跟踪器是一个调试工具，有助于跟踪和识别在 OSD（对象存储守护进程）中长时间运行或卡住的操作。启用操作跟踪器后，您可以获取每个操作的详细信息，这对于诊断性能问题或其他 Ceph 集群中的问题非常有用。

### mclock

`osd_async_recovery_min_cost` ：当前日志条目差异和历史丢失对象数量的混合度量，在适当的情况下，我们切换到使用异步恢复

`osd_push_per_object_cost` ：服务 push 操作的开销

`osd_mclock_profile` ：要使用的 mclock 配置文件

- 此选项指定要启用的 mclock 配置文件 - 内置配置文件集或自定义配置文件中的一个。

- 仅在 osd_op_queue = mclock_scheduler 时需要考虑

- 为custom时，才可修改 预留、权重、限制

  [预留和小于1](https://docs.ceph.com/en/latest/rados/configuration/mclock-config-ref/#steps-to-enable-mclock-profile:~:text=Care%20must%20be%20taken%20to%20change%20the%20reservations%20of%20other%20services%20like%20recovery%20and%20background%20best%20effort%20accordingly%20to%20ensure%20that%20the%20sum%20of%20the%20reservations%20do%20not%20exceed%20the%20maximum%20proportion%20(1.0)%20of%20the%20IOPS%20capacity%20of%20the%20OSD)

  - `osd_mclock_scheduler_client_res` ：为每个客户端的 IO 比例（默认）预留。默认值 0 指定可能的最低预留。任何大于 0 且最高为 1.0 的值都指定要为每个客户端保留的最小 IO 比例，以 OSD 最大 IOPS 容量的一小部分为单位。

    仅当 osd_op_queue = mclock_scheduler 时才生效

  - `osd_mclock_scheduler_client_wgt` ：每个客户端预留的IO权重。

    可以大于1，是相对值

  - `osd_mclock_scheduler_client_lim` ：每个客户端的 IO 预留的 limit（默认值）。默认值 0 指定不强制执行限制，这意味着每个客户端都可以使用 OSD 的最大可能 IOPS 容量。任何大于 0 且最高为 1.0 的值都指定每个客户端收到的预留 IO 上限，以 OSD 最大 IOPS 容量的一小部分表示。

  - `osd_mclock_scheduler_background_recovery_res` ：为后台 recovery 预留的 IO 比例（默认）。默认值 0 指定可能的最低预留。任何大于 0 且最高为 1.0 的值都指定为后台恢复操作保留的最小 IO 比例，以 OSD 最大 IOPS 容量的一小部分为单位。

  - `osd_mclock_scheduler_background_recovery_wgt` ：每次进行后台恢复的 IO 预留权重

  - `osd_mclock_scheduler_background_recovery_lim` ：每个客户端的后台恢复预留的 limit（默认值）。默认值 0 指定无限制强制执行，这意味着后台恢复操作可以使用 OSD 的最大可能 IOPS 容量。任何大于 0 且最高为 1.0 的值都指定后台恢复操作收到的预留 IO 上限，以 OSD 最大 IOPS 容量的一小部分表示

  - `osd_mclock_scheduler_background_best_effort_res` ：为后台best_effort保留的 IO 比例（默认）。默认值 0 指定可能的最低预留。任何大于 0 且最高为 1.0 的值都指定为后台best_effort操作保留的最小 IO 比例，以 OSD 最大 IOPS 容量的一小部分为单位。

  - `osd_mclock_scheduler_background_best_effort_wgt` ：每次进行后台 best_effort 的 IO 预留权重
  
  - `osd_mclock_scheduler_background_best_effort_lim` ：每个客户端的后台best_effort 预留的 limit（默认值）。默认值 0 指定无限制强制执行，这意味着后台恢复操作可以使用 OSD 的最大可能 IOPS 容量。任何大于 0 且最高为 1.0 的值都指定后台恢复操作收到的预留 IO 上限，以 OSD 最大 IOPS 容量的一小部分表示

`osd_mclock_max_capacity_iops_hdd` ：此选项指定每个 OSD 的最大 OSD 随机写入 IOPS 上限。在启用 dmclock 配置文件时参与 QoS 计算。

- 仅 osd_op_queue = mclock_scheduler 考虑

`osd_mclock_max_capacity_iops_ssd` ：每个 OSD（对于固态介质）要考虑的最大随机写入 IOPS 上限（块大小为 4 KiB）

`osd_mclock_max_sequential_bandwidth_hdd` ：OSD 考虑的最大顺序带宽（以字节/秒为单位）（对于旋转媒体）

`osd_mclock_max_sequential_bandwidth_ssd` ：OSD 考虑的最大顺序带宽（以字节/秒为单位）（对于固态媒体）

`osd_mclock_force_run_benchmark_on_init` ：在 OSD 初始化/启动时强制运行 OSD 基准测试

`osd_mclock_skip_benchmark` ：跳过 OSD 初始化/启动的 OSD 基准测试

`osd_mclock_iops_capacity_threshold_hdd` ：阈值 IOPS 容量（块大小为 4KiB），超过该容量将忽略 OSD（针对旋转媒体）的 OSD 基准测试结果

`osd_mclock_iops_capacity_threshold_ssd` ：阈值 IOPS 容量（块大小为 4KiB），超过该容量将忽略 OSD（对于固态介质）的 OSD 基准测试结果



### backfilling

`osd_max_backfills` ：每个 OSD 本地和远程的回填或恢复的最大并发数

- 允许回填到单个 OSD 或从单个 OSD 回填的最大数量。请注意，这对于读取和写入操作是分开应用的。
- 每个 OSD 可以有osd_max_backfills本地预留和相同的远程预留。因此，值 1 允许此 OSD 作为 1 个 PG 主节点参与恢复，并作为另一个恢复 PG 的 1 个分片参与。

`osd_backfill_scan_min` ：每次回填扫描的最小对象数。

`osd_backfill_scan_max` ：每次回填扫描的最大对象数。

`osd_backfill_retry_interval` ：回填 重试请求之前等待的秒数。

### osdmap

`osd_map_dedup` ：控制 OSD map是否进行冗余和去重

- OSD map 是集群的核心数据结构，它存储了数据在 OSD 上的分布信息。
- 如果 `osd_map_dedup` 设置为 `true`，则 OSD 映射可能会进行冗余和去重，以减少存储空间的使用并提高数据的冗余度。如果设置为 `false`，则 OSD 映射可能不会进行冗余和去重，这可能会导致存储空间的浪费。

`osd_map_cache_size` ：要保留缓存的 OSD map的数量。

`osd_map_message_max` 和 `osd_map_message_max_bytes` 是两个高级配置参数，它们与 OSD Map 的消息传递相关。

- `osd_map_message_max` 参数用于设置在单个消息中可以包含的最大 OSD map条目数量。

  当 OSD 映射发生变化时，如 OSD 加入或离开集群，这些变化需要通过消息传递给集群中的其他守护进程。通过限制单个消息中的 OSD 映射数量，可以控制消息的大小，从而影响网络带宽的使用和集群的通信效率。

- `osd_map_message_max_bytes` 参数用于设置在单个消息中可以包含的 OSD map 的总字节数。

  这个参数用于控制消息的大小，以影响网络带宽的使用和集群的通信效率。

`mon_max_snap_prune_per_epoch` ：在单个OSDMap epoch 中处理的最大裁剪快照数

`mon_min_osdmap_epochs` ：OSDMap要存储的最小 epoch 数

### recovery

`osd_recovery_delay_start` ：对等互连完成后，Ceph 将延迟指定的秒数，然后再开始恢复 RADOS 对象。

`osd_mclock_override_recovery_settings` ：设置此选项将覆盖 mClock 调度程序的 recovery/backfill  的limit值。

- 此选项设置为 true 后，将启用mClock调度程序活动时的max recovery active和max backfills 的limit值的覆盖。当mClock调度程序处于活动状态时，这些选项不可修改。如果没有设置 为true 而尝试修改这些值，将重置 recovery 或 backfilling 参数为其默认值。

- osd_max_backfills
- osd_recovery_max_active：同一时刻每个 OSD 活动的恢复请求数。更多请求将加速恢复，但请求会增加集群的负载。
  - 每个 OSD 的同时活动恢复操作数（如果非零，则覆盖 _ssd 和 _hdd）
  - `osd_recovery_max_active_hdd` ：每个 OSD 的同时活动恢复操作数（对于硬盘）
  - `osd_recovery_max_active_ssd` ：每个 OSD 的同时活动恢复操作数（对于固态）

`osd_recovery_max_chunk` ：恢复操作可以携带的数据块的最大总大小。

`osd_recovery_max_single_start` ：当 OSD 恢复时，每个 OSD 新启动的恢复操作的最大数量。

`osd_recover_clone_overlap` ：在恢复期间保留克隆重叠。应始终设置为 true。

- `osd_recover_clone_overlap_limit` 

`osd_recovery_sleep` ：在下一次恢复或回填操作之前的睡眠时间（以秒为单位），增加此值将减慢恢复操作，而客户端操作受影响较小。**可以为0**

- `osd_recovery_sleep_hdd` ：在下一次恢复或回填 HDD 操作之前的睡眠时间（以秒为单位）

- `osd_recovery_sleep_ssd` ：SSD 下次恢复或回填操作之前的睡眠时间（以秒为单位）

- `osd_recovery_sleep_hybrid` ：当数据在 HDD 上且日志在 SSD 上时，在下一次恢复或回填操作之前休眠的时间（以秒为单位）

  当 OSD 数据位于 HDD 上并且 OSD 日志/WAL+DB 位于 SSD 上时，在下一次恢复或回填操作之前休眠的时间（以秒为单位）。

`osd_min_recovery_priority` ：低于该优先级不执行恢复的最小优先级

- 此处的目的是防止集群执行低于此阈值的任何低优先级工作（例如，重新平衡），并仅专注于更高优先级的工作（例如，复制降级对象）

`osd_recovery_priority` ：工作队列中恢复的优先级

- 与 pool 的recovery_priority无关

### tiering分层

`osd_agent_max_ops` ：分层代理的最大并发分层操作

- 高速模式下每个分层代理同时刷新操作的最大数量。

`osd_agent_max_low_ops` ：分层代理的最大并发 低优先级 分层操作

- 始终大于0，**0 或负值**: 这会导致代理不能执行任何刷新操作，可能会阻止数据的有效传输或存储，导致系统性能和稳定性问题。
- **0**：表示没有操作同时进行，这可能会影响系统的效率，因为分层代理将不会执行任何刷新操作。
- **负数**：在大多数系统中，负数通常没有意义，并且可能会引起错误或异常行为，因为它们不符合操作数量的逻辑概念。

### PG相关

`mon_max_pg_per_osd` ：集群允许的每个 OSD 的最大 PG 数

- 如果每个 OSD 的 PG 数量超过此值，则在“ceph 状态”中将显示运行状况警告。这也用于自动化 PG 管理，作为一些池的pg_num可以缩小以增加其他池pg_num的阈值。
- 在Ceph存储集群中，PG（Placement Group，放置组）是数据分布和负载均衡的基本单元。每个OSD（Object Storage Daemon，对象存储守护进程）可以负责多个PG，但过多的PG可能会导致单个OSD过载，影响性能。
- 这个参数限制了每个 OSD 可以容纳的最大 PG 数量。在配置 `osd_pool_default_pg_num` 时，需要考虑到这个限制，以避免超过每个 OSD 的 PG 数量
- 这个参数还用于Ceph的自动PG管理。当需要增加某些池的PG数量时，如果超过了这个阈值，Ceph的自动平衡器可能会缩减其他池的PG数量（即减少`pg_num`），以释放资源，从而允许增加其他池的PG数量。

`mon_target_pg_per_osd` ：自动化 PG 管理为每个 OSD 创建如此多的 PG

- 当创建池时，automated PG management将尝试达到这么多PG，
- 一些场景中，可能超过这个目标达到 `mon_max_pg_per_osd` 的限制
- 更小的 pg_per_osd 可能被创建，如果集群违背充分利用

`mon_max_pool_pg_num` ：每个池的归置组的最大数量。

`mon_pg_stuck_threshold` ：在这段时间之后，PGS 可以被视为stuck inactive, unclean 等的秒数

- `dump_stuck` 有更详细介绍

`mon_pg_warn_min_per_osd` ：在我们警告管理员之前，每个 （in） osd 的最小 PG 数量

- 如果 OSD 中每个 PG 的平均数量低于此数字，则引发 HEALTH_WARN。非正数会禁用此功能

`osd_max_pg_per_osd_hard_ratio` ：如果 OSD 服务的 PG 数量超过 osd_max_pg_per_osd_hard_ratio * mon_max_pg_per_osd，则 OSD 将停止创建新 PG。

- 在 OSD 拒绝创建新 PG 之前，集群允许每个 OSD 的 PG 数量的比率。

`mon_pg_warn_min_objects` ：当集群中的RADOS对象总数低于此数字，则不发出警告

`mon_pg_warn_min_pool_objects` ：不要对 RADOS 对象计数低于此数字的池发出警告

`mon_pg_check_down_all_threshold` ：OSD `down` 的阈值，之后我们检查所有 PG 是否已过时。

`mon_pg_warn_max_object_skew` ：每个PG中，最大偏移的平均数

- 如果任何池的每个 PG 的平均 RADOS 对象计数大于 mon_pg_warn_max_object_skew 乘以所有池的每个 PG 的平均 RADOS 对象计数，则引发 HEALTH_WARN。
- 零或非正数会禁用此功能。请注意，此选项适用于 ceph-mgr 守护进程。

`mon_delta_reset_interval` ：“CEPH 状态”下费率计算的窗口持续时间

- 在我们将 PG 增量重置为 0 之前，不活动的秒数。我们跟踪每个池的已用空间的增量，因此，例如，我们可以更轻松地了解恢复进度或缓存层的性能。但是，如果某个池没有报告任何活动，我们只需重置该池的增量历史记录。

`osd_max_pgls` ：要列出的归置组的最大数量。请求大量数据的客户端可能会占用 Ceph OSD 守护进程。

`osd_pool_default_pg_num` ：新池的 PG 数

- 默认值“osd_pool_default_pg_autoscale_mode”为“on”，除非用户指定pg_num，否则新池的 PG 数将从 1 pg 开始。

`osd_pool_default_pgp_num` 

`osd_pool_default_pg_autoscale_mode` ：新池的默认 PG 自动缩放行为

- 在默认值为“on”的情况下，自动缩放程序将启动一个具有 1 pg 的新池，除非用户指定pg_num。



`osd_calc_pg_upmaps_local_fallback_retries` 和 `osd_calc_pg_upmaps_aggressively` 这两个 Ceph 配置参数都涉及到 OSD 在处理 PG 映射时的行为，但它们控制的是不同的方面，并没有直接的依赖关系。

- `osd_calc_pg_upmaps_aggressively` 是一个布尔值选项，用于指示 OSD 是否应该更加积极地计算 PG 的映射。当这个选项被启用时，OSD 会尝试更多的可能性来寻找可以优化的 PG 映射，可能会进行更加深入的搜索和更多的重映射尝试。
  - 启用这个选项也可能增加OSD的计算开销，因为更积极的计算需要更多的CPU资源。
  - 通常，只有在执行特定的维护任务或在特定情况下，例如在添加或移除OSD之后，重新平衡PGs时，才会考虑更改此设置。
- `osd_calc_pg_upmaps_local_fallback_retries` 是一个无符号整数值选项，它限制了在每个迭代周期中，为特定的过满或欠满 OSD 尝试取消映射或重新映射的最大 PG 数量。这个选项是为了防止在单个迭代中尝试过多的 PG 重映射操作，从而避免对 OSD 造成过大的压力和性能影响。

虽然这两个选项都涉及到 PG 映射的优化过程，但它们的作用点是不同的。`osd_calc_pg_upmaps_aggressively` 决定了 PG 映射优化的策略是否更加积极，而 `osd_calc_pg_upmaps_local_fallback_retries` 则是在这个策略执行时，限制了每个迭代中可以进行的最大操作数。因此，即使 `osd_calc_pg_upmaps_aggressively` 被启用，`osd_calc_pg_upmaps_local_fallback_retries` 仍然可以限制重映射的频率，以保护系统资源。

`osd_min_pg_log_entries` ：修剪日志文件时要维护的 PG log 的最小数量。

`osd_max_pg_log_entries` ：修剪日志文件时要维护的 PG log 的最大数量。

`osd_pg_max_concurrent_snap_trims` ：PG的并行快照裁剪的数量

`osd_pg_epoch_persisted_max_stale` ：

`osd_target_pg_log_entries_per_osd` ：OSD 上总 PG 条目的目标数 - 每个 pg 受以下最小和最大选项的限制

`osd_min_pg_log_entries` ：PG log中要维护的最小条目数

`osd_max_pg_log_entries` ：PG log中要维护的最大条目数

`osd_pg_log_dups_tracked` ：有多少个版本回退跟踪以检测重复操作;这与常规 PG 日志条目和其他最小 DUP 检测条目相结合

`osd_object_clean_region_max_num_intervals` ：clean_offsets 中的间隔数

- 部分恢复使用多个区间来记录对象的干净部分。当区间数量大于 osd_object_clean_region_max_num_intervals 时，将裁剪最小区间（0将恢复整个对象数据区间）。

`osd_pg_log_trim_min` ：一次要修剪的最小日志条目数。这使我们能够在更大的批次中进行修剪，而不是在每次写入时进行修剪

`osd_pg_object_context_cache_count` 是 Ceph 分布式存储系统中的一个配置选项，用于设置每个 OSD（对象存储守护进程）中 PG（放置组）对象上下文缓存的条目数。该缓存用于存储对象上下文，以加速对对象的重复访问，提高性能。

`osd_loop_before_reset_tphandle` 是 Ceph 分布式存储系统中的一个配置选项，用于控制在 OSD（对象存储守护进程）的主循环中，在重置线程池句柄之前允许的循环次数。该配置项主要用于调试和性能优化。

`mon_reweight_max_change` ：

```cpp
# src/mon/PGMap.cc
int reweight::by_utilization(
    const OSDMap &osdmap,
    const PGMap &pgm,
    int oload,
    double max_changef,
    int max_osds,
    bool by_pg, const set<int64_t> *pools,
    bool no_increasing,
    mempool::osdmap::map<int32_t, uint32_t>* new_weights,
    std::stringstream *ss,
    std::string *out_str,
    ceph::Formatter *f)
{
验证输入：检查 oload 参数是否超过100%，因为它被用作与平均使用率相乘的阈值。

计算平均使用率：

根据 PG 数量（by_pg=true）或直接依据磁盘使用量（by_pg=false）计算 OSD 的平均使用率。
统计每个 OSD 的 PG 数量（如果按 PG 计算）或直接统计 OSD 的磁盘使用情况。

计算调整因子：确定哪些 OSD 超过了平均使用率乘以 oload 的阈值，以及哪些 OSD 使用率低于平均值且允许增加权重（除非 no_increasing 设置为真）。

调整权重：对使用率过高的 OSD 降低权重，对使用率较低的 OSD（在一定条件下）增加权重，同时限制调整幅度不超过 max_changef 指定的百分比，并确保调整的 OSD 数量不超过 max_osds。

应用变更并输出结果：将新的权重应用于临时的 OSD 映射，并总结映射统计信息到输出字符串或通过格式化器输出。最后，返回实际调整了权重的 OSD 数量。
}
```





### pool相关

`osd_pool_default_type` ：要创建的池的默认类型



`osd_pool_default_flags` ：(整数) 新创建的存储池将设置的标志

- 为新创建的存储池指定一组标志。这些标志可以影响存储池的行为和性能，包括但不限于数据放置策略、副本行为、回收站特性等。
- 简化和标准化创建过程。例如，如果你经常使用某些特定的标志组合，你可以将其设置为默认值，以便在创建新池时自动应用这些设置。





`osd_default_data_pool_replay_window` ：OSD 等待客户端重播请求的时间（以秒为单位）。

`osd_pool_default_size` ：指定了新创建存储池的默认副本数量，就是池副本数。

- https://docs.ceph.com/en/quincy/rados/configuration/pool-pg-config-ref/#manual-tuning:~:text=%23%20By%20default%2C%20Ceph%20makes%203%20replicas%20of%20RADOS%20objects.%20If%20you%20want%20to%20maintain%20four%0A%09%23%20copies%20of%20an%20object%20the%20default%20value%2D%2Da%20primary%20copy%20and%20three%20replica%0A%09%23%20copies%2D%2Dreset%20the%20default%20values%20as%20shown%20in%20%27osd_pool_default_size%27.

`osd_pool_default_min_size` ：对于新创建的复制池，在 degraded 状态下允许写入的最小副本数。在数据恢复过程中，只要达到了这个数量的副本，写操作就可以正常进行。如果未满足最小值，Ceph 将不会向客户端确认 I/O，这可能会导致数据丢失。

- 这个值应该小于或等于 `osd_pool_default_size`。

- 在 Ceph 中，复制池（replicated pools）是通过在多个 OSD 上保存数据的副本来实现数据冗余的。如果一个池中的一个或多个副本因为某种原因（如 OSD 故障）而不可用，那么这个池就被认为是处于降级状态。
- 如果池的副本数（`osd_pool_default_size`）设置为3，而 `osd_pool_default_min_size` 设置为2，那么即使有一个副本不可用，写操作仍然可以继续进行，因为仍然有两个可用的副本。
- 如果 `osd_pool_default_min_size` 被设置为0，对于任何新创建的复制池，最小写副本数将是池的副本数的一半，向下取整。

`osd_pool_default_read_lease_ratio` ：池的默认read_lease_ratio，作为 osd_heartbeat_grace 的倍数

- 应该小于或等于1.0，以确保在我们决定将一个对等OSD标记为宕机时，读取租约已经过期。



#### CRUSH

`osd_crush_chooseleaf_type`：选择合适的CRUSH leaf 类型

- 0 单节点集群
- 1 单机架上的多节点集群
- 2 对于一个机箱中具有多个主机的多节点、多机箱集群
- 3 跨机架的多主机集群

`osd_crush_initial_weight` ：设置新创建OSD的CRUSH权重

- 如果 >= 0，则新创建的 OSD 的初始 CRUSH 权重

- 如果此值为负数，则使用 OSD 的大小（以 TiB 为单位）。

`osd_pool_default_crush_rule` ：为新创建的池设置默认的 CRUSH 规则。

- 每个存储池都可以有自己的 CRUSH 规则，CRUSH（Controlled Replication Under Scalable Hashing）规则是 Ceph 中用于数据分布和副本放置的算法，决定了数据及其副本如何在整个集群中的不同 OSD（对象存储守护进程）上分布。
- 当创建新的存储池时，如果没有明确指定 CRUSH 规则系统将使用由 `osd_pool_default_crush_rule` 参数指定的默认规则。
- 默认值 -1 表示“选择具有最小数字 ID 的规则并使用它”。这是为了在没有规则 0 的情况下创建池。

#### 缓存

`osd_tier_default_cache_hit_set_type` ：指定缓存命中集合的类型

- **枚举值**：`bloom`, `explicit_hash`, `explicit_object`
- 与缓存相关的策略，用于确定如何跟踪和优化缓存命中

- `osd_pool_default_hit_set_bloom_fpp` ：Bloom 过滤器（Bloom Filter）的误报率（False Positive Probability，FPP）
  - Bloom 过滤器是一种概率型数据结构，用于检测一个元素是否存在于集合中。设置较低的 FPP 可以减少误报率，但可能会增加内存消耗。


`osd_pool_default_cache_target_dirty_ratio` ：用于配置缓存中脏数据的最大比例。

- 脏数据是指那些已经从源头数据源中更新，但尚未同步到后端存储的数据。
- 当缓存达到这个脏数据比例时，可能会触发缓存刷新操作

`osd_pool_default_cache_target_dirty_high_ratio` ：

- 配置缓存中脏数据的高比例阈值。当缓存中的脏数据比例超过这个阈值时，可能会采取某些措施，例如减少写入操作，以避免缓存进一步过载。

`osd_pool_default_cache_target_full_ratio` ：

- 用于配置缓存达到满载的比例阈值。当缓存中的数据达到这个阈值时，可能会采取某些措施，例如减少写入操作，以避免缓存过载。

`osd_pool_default_cache_min_evict_age` ：配置缓存中对象的最低可清除年龄

- 设置合适的年龄阈值可以帮助确保缓存中的数据是最常访问的，同时保持足够的缓存空间来存储新数据。

`osd_pool_default_cache_max_evict_check_size `：配置缓存中在清除操作中需要检查的最大对象或数据块大小。

- 当缓存中的对象或数据块的大小达到或超过这个阈值时，它们可能会被优先考虑清除，以释放缓存空间。

`osd_pool_default_cache_min_flush_age` 

- 用于配置缓存中对象的最低可刷新时长。这意味着当一个对象在缓存中的存在时间达到或超过这个年龄时，它可能会被刷新到后端存储。



`osd_hit_set_namespace` ：

`osd_hit_set_min_size` 和 `osd_hit_set_max_size` 是两个高级配置参数，它们与缓存策略中的命中集合（hit set）大小有关

- 命中集合是用于缓存优化的一种数据结构，它包含了最近访问的对象信息。

- `osd_hit_set_min_size` 可能用于配置缓存中命中集合的最小大小。设置最小大小可以帮助确保缓存中的数据是最常访问的。
- `osd_hit_set_max_size` 可能用于配置缓存中命中集合的最大大小。设置最大大小可以帮助确保缓存不会因为命中集合过大而影响性能。

`osd_pool_use_gmt_hitset` ：用于控制 OSD 在处理 hitset（命中集合）时间戳时是否使用 UTC 时间。

- Hitset 是 Ceph 中用于跟踪对象访问频率的数据结构，它们用于实现缓存剔除策略。
- 此设置仅用于与 hammer（及更早）版本的集群兼容。在 Ceph 的某些旧版本（如 hammer 版本）中，hitset 时间戳默认使用本地时间。然而，为了提高跨时区的可移植性和一致性，Ceph 后来切换到了使用 UTC 时间。
- 由于这个设置是用于开发者级别的，并且只是为了保持与旧版本的兼容性，大多数新的 Ceph 集群都会使用 UTC 时间戳，因此这个参数通常会被设置为 `false`。如果你正在运行一个较新的 Ceph 版本，并且不需要与旧版本兼容，那么你可以忽略这个参数。

`osd_tier_default_cache_min_read_recency_for_promote` ：对象必须出现在其中才能升级的最近命中集数（读取时）





#### 上层存储

`osd_tier_promote_max_objects_sec` ：配置 Ceph 存储集群中每秒最多可以提升到上层存储（如 SSD 或 NVMe）的对象数量。

- 当文件或对象满足提升条件时，比如它们在缓存中的命中率较低，或者它们的访问频率下降，它们可能会被提升到更快的存储层。

`osd_tier_promote_max_bytes_sec` ：配置 Ceph 存储集群中每秒最多可以提升到上层存储的对象的总大小

- 当文件或对象的总大小达到或超过这个阈值时，它们可能会被提升到更快的存储层。



`osd_tier_default_cache_min_read_recency_for_promote` ：配置缓存中对象被提升到后端存储的读最小最近访问时间。

- 当一个对象在缓存中的最后一次读访问时间达到或超过这个阈值时，它可能会被提升到后端存储。

`osd_tier_default_cache_min_read_recency_for_promote` ：配置缓存中对象被提升到后端存储的写最小最近访问时间。

- 当一个对象在缓存中的最后一次写访问时间达到或超过这个阈值时，它可能会被提升到后端存储。



`osd_tier_default_cache_hit_set_grade_decay_rate` ：配置缓存中命中集合等级的衰减速度。

- 命中集合等级是用于缓存优化的一种数据结构，它反映了对象在缓存中的访问频率和重要性。设置衰减率可以帮助确保缓存中的数据是最常访问的。
- 这个参数对于优化缓存性能和容量管理非常重要。设置合适的衰减率可以帮助确保缓存中的空间被有效利用，同时保持足够的缓存空间来存储新数据。

`osd_tier_default_cache_hit_set_search_last_n` ：配置缓存中命中集合搜索操作中要考虑的最近访问的对象数量。

- 确保最近访问的对象被优先考虑。





#### 纠删码池

`osd_pool_default_ec_fast_read` ：指定新创建的纠删码池是否默认启用快速读取功能。

- 纠删码池是一种数据保护机制，它通过在多个 OSD 上分布数据块和校验块来提供容错能力。
- 快速读取功能允许 Ceph 在读取数据时跳过一些校验块的解码过程，从而可能提高读取性能，但可能会降低数据的局部性。
- 如果将此参数设置为 `true`，那么所有新创建的擦除编码池都将默认启用快速读取。如果设置为 `false`，则新池将不启用此功能。对于现有的池，这个设置不会产生影响，它们需要单独配置 `ec_fast_read` 参数。

`osd_pool_erasure_code_stripe_unit` ：设置纠删码池的对象条带块的默认大小（以字节为单位）。

- 每个大小为 S 的对象将存储为 N 个条带，每个数据块接收条带单位字节。
- N * stripe_unit 个字节的每个条带将被单独编码/解码。此选项可以被纠删码配置文件中的 stripe_unit 设置覆盖。

`osd_pool_default_erasure_code_profile` ：新纠缠码池的默认纠删码配置文件

`osd_erasure_code_plugins` ：要加载的纠删码插件



### osd_other

`osd_rocksdb_iterator_bounds_enabled` ：omap 迭代器边界是否应用于 rocksdb 迭代器 ReadOptions

`osd_default_notify_timeout` ：通知传播超时的默认秒数。如果客户端未指定其他值，则使用

`osd_check_for_log_corruption` ：检查日志文件是否损坏。计算成本可能很高。

`osd_delete_sleep` ：在下一次删除事务之前休眠的时间（以秒为单位）。这会限制 PG 删除过程。

- `osd_delete_sleep_hdd` 
- `osd_delete_sleep_ssd`
- `osd_delete_sleep_hybrid` ：当 OSD 数据位于 HDD 上且 OSD 日志或 WAL+DB 位于 SSD 上时，下一个删除事务之前休眠的时间（以秒为单位）

`osd_command_max_records` ：限制要返回的丢失对象的数量。

- 不能小于等于0

```cpp
# src/osd/PrimaryLogPG.cc
do_command(){
    逻辑不符：该配置项通常用于限制某个操作（如列出对象）能够返回的最大记录数量，如果设置成非正数，意味着不会返回任何结果或者逻辑上不期望的结果，这与大多数应用场景相违背。

潜在的编程逻辑错误：在提供的代码片段中，若osd_command_max_records小于等于0，循环for (; p != needs_recovery_map.end() && num < cct->_conf->osd_command_max_records; ++p)将不会执行，因为初始时num为0，导致条件num < cct->_conf->osd_command_max_records始终为真（如果配置值是非正数），但循环却因无法进入而实际上什么也不做，这可能并非设计意图。

最佳实践：通常，此类配置应设定为一个正整数，以合理控制响应的数据量，防止因一次性返回太多数据而导致的性能问题或其他副作用。
}
```

`osd_numa_prefer_iface` ：首选与存储相同的 numa 节点上的网络接口上的 IP

`osd_numa_auto_affinity` ：当存储和网络匹配时，自动将关联设置为 NUMA 节点

`osd_numa_node` ：为 NUMA 节点设置相关性（-1 表示无）

- 默认值为-1



`osd_smart_report_timeout` ：smarctl 运行超时（以秒为单位）

### osd fail

`osd_failsafe_full_ratio` 是 Ceph 分布式存储系统中的一个配置选项，用于设置一个 OSD（对象存储守护进程）达到故障保护满状态的比例阈值。当 OSD 的存储利用率达到或超过这个比例时，Ceph 会采取保护措施来防止数据写入，以避免数据丢失或集群崩溃。

`osd_fast_shutdown` ：快速、即时关机

- 如果将其设置为 false，则 OSD 在收到 SIGINT 或 SIGTERM 或因任何其他原因关闭时，会降低所有状态的拆解速度。这种缓慢的关机主要用于使用 valgrind 进行内存泄漏检查

`osd_fast_shutdown_notify_mon` ：告诉 mon 有关立即关机时 OSD 关机的信息

- 告诉monitor正在立即挂机，有助于处理记录日志消息——来自集群中其他OSD的立即故障报告  

`osd_fast_fail_on_connection_refused` ：如果启用此选项，则已连接的对等点和 MON 会立即将崩溃的 OSD 标记为down（假设崩溃的 OSD 主机仍然存在）。禁用它以恢复旧的行为，但代价是当 OSD 在 I/O 操作过程中崩溃时可能会出现长时间的 I/O 停顿。







## KVStore

### leveldb





### rocksdb

RocksDB 是一个高性能的键值存储引擎，广泛应用于 Ceph 的 OSD（对象存储守护进程）中，以管理元数据和小对象

`rocksdb_cache_row_ratio` 是 Ceph 分布式存储系统中的一个配置选项，用于控制在使用 RocksDB 作为底层存储引擎时缓存中行数据的比例。

`rocksdb_cache_shard_bits` 参数是用来控制内存中缓存（通常是LRU缓存）的分片数量的。这个值决定了缓存是如何被分割成多个子缓存区域（shards）的，每个shard独立管理自己的部分内存，这样可以减少多线程环境下的锁竞争，提高并发性能。

`rocksdb_delete_range_threshold` ：当删除多个keys时，调用DeleteRange 所需的keys数量

`rocksdb_bloom_bits_per_key` ：用于 RocksDB 的 bloom 过滤器的每个键的位数。

- RocksDB bloom 过滤器可用于快速回答给定 RocksDB SST 文件中是否存在key或绝对不存在的问题，而无需将所有key读入内存。
- 使用更高的位值可降低误报的可能性，但会牺牲额外的磁盘空间和内存消耗，从而将筛选器加载到 RAM 中。当前默认值 20 被发现在进行 getattr 调用时（例如在 bluestore 中创建新对象期间）提供了显着的性能提升，当与 rocksdb 分区索引过滤器结合使用时，不会产生明显的内存开销或缓存污染。有关更多信息，请参阅：https：github.comfacebookrocksdbwikiPartitioned-Index-Filters。

`rocksdb_cache_index_and_filter_blocks` ：是否在块缓存中缓存索引和过滤器

- 默认情况下，RocksDB 会在打开 SST 文件时将 SST 文件的索引和绽放过滤器加载到内存中，并在关闭 SST 文件时将其从内存中删除。因此，索引和 bloom filter 的内存消耗与允许保持打开状态的并发 SST 文件数直接相关。此选项将缓存的指示和过滤器存储在块缓存中，它们直接与其他缓存数据竞争。默认情况下，我们将此选项设置为 true，以更好地考虑和绑定 rocksdb 内存使用情况，并将过滤器保留在内存中，即使 SST 文件已关闭。

`rocksdb_cache_index_and_filter_blocks_with_high_priority` ：是否在块缓存中缓存高优先级的索引和过滤器

- 将 rocksdb_cache_index_and_filter_blocks 设置为 true 的缺点是，常规数据可能会将索引和筛选器从内存中推出。将此选项设置为 true 意味着它们的缓存优先级高于其他数据，并且通常应保留在块缓存中

`rocksdb_pin_l0_filter_and_index_blocks_in_cache` ：是否将 0 级索引和绽放过滤器固定在块缓存中

- 将 rocksdb_cache_index_and_filter_blocks 设置为 true 的缺点是，常规数据可能会将索引和筛选器从内存中推出。将此选项设置为 true 意味着 0 级 SST 文件的索引和过滤器将始终固定在块缓存中

`rocksdb_index_type` ：SST 文件的索引类型：binary_search、hash_search、two_level

- 此选项控制表索引类型。
- binary_search 是一个节省空间的索引块，针对基于块搜索的索引进行了优化。
- hash_search可能会提高前缀查找性能，但代价是磁盘和内存使用率更高，压缩速度可能更慢。
- two_level 是一种实验性索引类型，它使用两个二进制搜索索引，并与分区筛选器结合使用。请参见：http:rocksdb.orgblog20170512partitioned-index-filter.html

`rocksdb_cache_type` ：

```cpp
# src/kv/RocksDBStore.cc
std::shared_ptr<rocksdb::Cache> RocksDBStore::create_block_cache(const std::string& cache_type, size_t cache_size, double cache_prio_high) {
	  std::shared_ptr<rocksdb::Cache> cache;
      auto shard_bits = cct->_conf->rocksdb_cache_shard_bits;
      if (cache_type == "binned_lru") {
        cache = rocksdb_cache::NewBinnedLRUCache(cct, cache_size, shard_bits, false, cache_prio_high);
      } else if (cache_type == "lru") {
        cache = rocksdb::NewLRUCache(cache_size, shard_bits);
      } else if (cache_type == "clock") {
        cache = rocksdb::NewClockCache(cache_size, shard_bits);
        if (!cache) {
          derr << "rocksdb_cache_type '" << cache
               << "' chosen, but RocksDB not compiled with LibTBB. "
               << dendl;
        }
      } else {
        derr << "unrecognized rocksdb_cache_type '" << cache_type << "'" << dendl;
      }
      return cache;
}
```



`rocksdb_cf_compact_on_deletion_sliding_window` ：启用rocksdb_cf_compact_on_deletion时要使用的滑动窗口

`rocksdb_cf_compact_on_deletion_trigger` ：启用rocksdb_cf_compact_on_deletion时要使用的触发器





## bdev块设备



`bdev_debug_inflight_ios` 是 Ceph 分布式存储系统中的一个配置选项，用于启用或禁用块设备（bdev）层的调试信息，特别是关于正在进行的 I/O 操作的信息。启用此选项后，Ceph 将记录有关当前进行的 I/O 操作的详细调试信息，这对于诊断和解决 I/O 相关问题非常有用。



`bdev_aio` 是 Ceph 分布式存储系统中的一个配置选项，用于控制 OSD（对象存储守护进程）是否使用 AIO（异步输入/输出）操作进行块设备的 I/O 操作。使用 AIO 可以提高 I/O 操作的性能，因为它允许非阻塞的 I/O 操作，从而更好地利用多核处理器和高性能存储设备。



`bdev_aio_poll_ms` 参数指定了 OSD 在处理 AIO 请求时应等待的毫秒数，如果在这段时间内 I/O 操作没有完成，OSD 将进行轮询以检查 I/O 是否完成。这个参数的设置可以影响 Ceph OSD 的性能，因为它决定了在同步等待和轮询检查之间如何平衡。

- `bdev_aio_poll_ms = 10 ` 意味着 OSD 在处理 AIO 请求时会等待 10 毫秒，然后进行轮询以查看 I/O 是否已经完成。
- `bdev_aio_poll_ms` 是 Ceph 分布式存储系统中的一个配置选项，用于设置异步输入/输出（AIO）操作的轮询时间间隔（以毫秒为单位）。该选项控制 OSD（对象存储守护进程）在处理 AIO 操作时的轮询频率。通过调整轮询时间间隔，可以优化 I/O 操作的性能和资源使用。

`bdev_aio_max_queue_depth` 

`bdev_aio_reap_max` 是 Ceph 分布式存储系统中的一个配置选项，用于控制每次从异步输入/输出（AIO）完成队列中收割（reap）完成的 I/O 操作的最大数量。通过调整此参数，可以优化 I/O 操作的性能和系统资源的使用。

`bdev_flock_retry` ：重试 flock 的次数

- 获取块设备锁定时重试的次数。systemd-udevd 等程序可能会与 Ceph 竞争此锁。0 表示“无限”。

## crimson

`crimson_osd_obc_lru_size`：

- **解释**：这个参数定义了对象上下文（Object Context, OBC）在 OSD 内存中缓存的最大数量。OBC 是对对象元数据和状态的缓存，LRU（Least Recently Used）策略用于确定哪些对象应从缓存中移除。
- **作用**：通过调整这个参数，你可以控制 OSD 内存使用的大小。较大的值会增加缓存命中率，可能提高性能，但也会增加内存使用量。
- 0 for unlimited

`crimson_osd_scheduler_concurrency`：

- **解释**：这个参数定义了 Crimson OSD 的调度器并发度，决定了调度器可以同时处理的请求数量。
- **作用**：调整此参数可以影响 OSD 的并行处理能力。较高的并发度可以提高系统的吞吐量，但可能会增加上下文切换和资源竞争，从而影响性能。
- 0 for unlimited

`crimson_alien_op_num_threads`：

- **解释**：这个参数定义了处理“外来操作”（alien operations）线程的数量。外来操作是指那些需要跨多个核或 CPU 处理的操作。
- **作用**：通过调整这个参数，你可以控制处理外来操作的线程数，从而影响这些操作的并发处理能力。较多的线程可以提高处理能力，但也可能增加线程调度和同步的开销。

`crimson_alien_thread_cpu_cores`：

- **解释**：这个参数指定了用于外来操作线程的 CPU 核心数。它决定了哪些 CPU 核心将用于处理这些操作。
- **作用**：通过绑定外来操作线程到特定的 CPU 核心，你可以提高缓存命中率并减少上下文切换，从而提高系统性能。





