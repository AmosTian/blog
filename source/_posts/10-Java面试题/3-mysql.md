---
title: 面试题-mysql
categories:
  - 面试题
tags:
  - 面试题
  - mysql
mathjax: true
date: 2023-8-20 09:49:04
---

[TOC]

<!--more-->

## 基本概念

### 事务是什么



#### ACID

Atom：原子性，事务是不可拆分的最小单元

Consistency：一致性，事务执行前后，数据库的完整性约束不被破坏，比如一次交易中涉及的总金额

Isoliation：隔离性，多个事务并发运行，互不干扰

Duration：持久性，事务执行完成后是永久性的，不能回滚