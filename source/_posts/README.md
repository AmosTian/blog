结构：

- 在笔记目录下，不能有图片，否则在自动生成menu.md时，会被过滤掉



md文件命名规则：

- 序号后，可以用-或.间隔md文件名
- 文件名不能包含空格，文件名中不能包含-
  - 需要优化序号识别程序



不会被渲染的md文件

目前，配置 *_posts/* 目录下、以 *README.md* 结尾的文件会被跳过，不会显示在github page上

```shell
skip_render:
  - _posts/*README.md
  - .gitignore
  - node_modules/**/*
```



git上传到github时，需要开梯子，并设置代理

```shell
git config --global http.proxy 127.0.0.1:7890
git config --global https.proxy 127.0.0.1:7890

git config --global --get http.proxy
git config --global --get https.proxy

git push github master
```

git 上传到gitee时，需要取消代理

```shell
git config --global --unset http.proxy
git config --global --unset https.proxy
```





