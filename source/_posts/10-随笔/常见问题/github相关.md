---
title: github相关
top: 88
categories:
  - 随笔
  - 常见问题
tags:
  - 随笔
  - 常见问题
abbrlink: 3097253091
date: 2022-12-15 19:05:24
---

> gitgub相关的问题

<!--more-->

## 1. 访问github的权限问题

1. github 端生成token

   github的账户设置界面，找到开发者设置

   ![image-20221215210441409](github相关/image-20221215210441409.png)

   选择私有访问tokens

   ![image-20221215205624318](github相关/image-20221215205624318.png)

   生成一个新的token

   ![image-20221215205428517](github相关/image-20221215205428517.png)

   填写token名，选择该token的访问权限

   ![image-20221215204334098](github相关/image-20221215204334098.png)

   生成token

   ![image-20221215205533434](github相关/image-20221215205533434.png)

   - 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

2. Windows客户端增加凭证

   ![image-20221215205835061](github相关/image-20221215205835061.png)

   ![image-20221215210311885](github相关/image-20221215210311885.png)

3. 之后有个密码验证，验证过了就行

## 2. ssh: connect to host github.com port 22: Connection timed out

```shell
ssh: connect to host github.com port 22: Connection timed out
fatal: Could not read from remote repository.

Please make sure you have the correct access rights
and the repository exists.
```

1. 检查SSH是否连接成功

   ```shell
   ssh -T git@github.com
   # 报错
   ssh: connect to host github.com port 22: Connection timed out
   ```

2. 配置文件

   新建config文件

   ![image-20221215195509518](github相关/image-20221215195509518.png)

   编辑配置文件

   ```shell
   Host github.com
   User YourEmail@163.com #只需要改邮箱
   Hostname ssh.github.com
   PreferredAuthentications publickey
   IdentityFile ~/.ssh/id_rsa
   Port 443 
   ```

   执行 `ssh -T git@github.com` ，输入 `yes` 即可。

   ![image-20221215200711461](github相关/image-20221215200711461.png)

   ![image-20221215200747718](github相关/image-20221215200747718.png)

之后就能上传代码了。

