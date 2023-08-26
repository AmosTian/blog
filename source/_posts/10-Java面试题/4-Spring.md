---
title: 面试题-mysql
categories:
  - 面试题
tags:
  - 面试题
  - 后端框架
mathjax: true
date: 2023-8-20 09:49:04
---

[TOC]

<!--more-->

## Spring

### IoC与AOP

>   AOP：面向切面编程

能够将与业务无关，却为业务模块所共同调用的逻辑或责任（如事务处理、日志管理、权限控制）封装起来，降低模块的耦合度。

SpringAOP 是基于动态代理的，如果要代理的对象实现了某个接口，那么SpringAOP会使用JDK Proxy 去创建代理对象，而对于没有实现接口的对象，就无法使用JDK Proxy去进行代理。

什么原理？？？





## SpringMVC

### 页面请求流程

1.  客户端（浏览器）发起请求，直接请求到 `DispatcherServlet`

2.  `DispatcherServlet` 根据URL调用 `HandlerMapping`，解析请求对应的 `Handler`

3.  解析到对应的 `Handler`（Controller控制器）后，开始由 `HandlerAdapter` 进行处理

4.  `HadnlerAdapter` 会根据 `Handler` 来调用真正的处理器开始处理请求对应的业务逻辑。

5.  Controller 处理完业务后，会返回一个 `ModelAndView` 对象，`Model` 是返回数据对象，`View`是一个逻辑上的视图

6.  `ViewResolver` 会根据逻辑 `View` 查找实际的视图层

7.  `DispatcherServlet` 把返回的 `Model` 传给 `View`（视图渲染），进而返回给请求者。

### 页面跳转方式

#### 1. 直接在页面输出

```java
public void handleRequest(HttpServletRequest req,HttpServletResponse resp){
    resp.getWriter().println("");
}
```

#### 2. 重定向

```java
public void handleRequest(HttpServletRequest req,HttpServletResponse resp){
    resp.sendRedirect("");
}
```

#### 3. 请求转发

```java
public void handleRequest(HttpServletRequest req,HttpServletResponse resp){
    req.getRequestDispatcher("").forward(req,resp);
}
```

#### 4. 直接返回jsp页面名

```java
{
    return "home.jsp";
    return "forward:home.jsp";
    return "redirect:home.jsp";
}
```

#### 渲染器配置

>   dispatcher-servlet.xml

```xml
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="
        http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans-3.0.xsd
        http://www.springframework.org/schema/context
        http://www.springframework.org/schema/context/spring-context-3.0.xsd">

    <!--作用是扫描指定包下所有的包含注解的类-->
    <context:component-scan base-package="com.jsu.mvc"/>

</beans>
```

>   web.xml

```xml
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_3_1.xsd" version="3.1">
    <servlet>
        <servlet-name>dispatcher</servlet-name>
        <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
        <load-on-startup>1</load-on-startup>
    </servlet>
    <servlet-mapping>
        <servlet-name>dispatcher</servlet-name>
        <url-pattern>/</url-pattern>
    </servlet-mapping>
</web-app>
```

#### 5. 有渲染器

```java
{
    //转发方式1
    return "home";
    //转发方式2
    return "forward:index";
    //重定向方式  hello指的是requsrmapping
    return "redirect:hello";
}
```

#### 6. 使用ModelAndView

```java
public ModelAndView test(
    HttpServletRequest httpServletRequest,
    HttpServletResponse httpServletResponse) throws Exception {
    ModelAndView mv = new ModelAndView();
    //封装要显示到视图的数据
    mv.addObject("msg","hello myfirst mvc");
    //通过视图名跳转
    mv.setViewName("hello");
    
    return mv;

    //跳转到服务器内部的一个功能处理方法     
    //return new ModelAndView("forward:test.jsp");   
    //重定向一个功能方法     
    //return new ModelAndView("redirect:test.jsp"); 
}
```

### @RestController和@ResponseBody的区别

这两个注解都会处理返回的数据格式，使用了该类型注解后，返回的不再是视图，不会进行跳转，而是返回 _json_ 或 _xml_ 数据格式，输出在页面上。

`@ResponseBody` ，使用在单独的方法上，需要哪个方法返回 json 数据格式，就在哪个方法上使用

`@RestController` 使用在类上，某个类下的所有方法都返回 json 数据格式，则在那个类上使用该注解就有统一性。本质上相当于所有的方法上都统一使用了 @ResponseBody 注解。
