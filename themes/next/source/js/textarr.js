let textArr = [{
    name: 'h2',
    class: 'inten',
    text: '岗位：XXX'
}, {
    name: 'h4',
    class: 'text-title',
    text: '个人信息'
}, {
    name: 'div',
    class: 'base-info',
    children: [{
        name: 'div',
        children: [{
            name: 'div',
            text: '姓名：AmosTian'
        }, {
            name: 'div',
            text: '年龄：23'
        }]
    }, {
        name: 'div',
        children: [{
            name: 'div',
            text: '本科院校：太原理工大学'
        }, {
            name: 'div',
            text: '联系邮箱：17636679561@163.com'
        }]
    }]
}, {
    name: 'h4',
    class: 'text-title',
    text: '教育背景'
}, {
    name: 'div',
    class: 'school',
    children: [{
        name: 'span',
        class: 'mr',
        text: '学历：本科'
    }, {
        name: 'span',
        text: '专业：计算机科学与技术'
    }, {
        name: 'div',
        text: '主修课程：C、C++、Java、Python、数据结构、计算机组成原理、操作系统、计算机网络、JavaWeb',
    }, {
        name: 'div',
        text: '英语水平：CET6',
    }]
}, {
    name: 'h4',
    class: 'text-title',
    text: '专业技能'
}, {
    name: 'ul',
    class: 'ul-list',
    children: [{
        name: 'li',
        text: '熟练使用',
        children: [{
            name: 'span',
            class: 'tag',
            text: 'HTML、CSS、JavaScript、C++、Python'
        }]
    }, {
        name: 'li',
        text: '精通小程序开发',
        children: [{
            name: 'span',
            class: 'tag',
            text: 'WXML、WXSS、JavaScript'
        }]
    }, {
        name: 'li',
        text: '熟悉',
        children: [{
            name: 'span',
            class: 'tag',
            text: 'Python数据处理'
        }, {
            name: 'span',
            text: '，Git使用及原理'
        }]
    }, {
        name: 'li',
        text: '熟悉',
        children: [{
            name: 'span',
            class: 'tag',
            text: 'MySQL数据库'
        }]
    },{
        name: 'li',
        text: '后端开发入门水平：',
        children: [{
            name: 'span',   
            text: 'Java'
        }, {
            name: 'span',
            class: 'tag',
            text: '、SpringBoot、Dubbo'
        }, {
            name: 'span',
            text: '、ElasticSearch'
        }]
    },{
        name: 'li',
        text: '个人博客：https://auspicetian.life'
    }]
}, {
    name: 'h4',
    class: 'text-title',
    text: '生涯履历'
}, {
    name: 'div',
    class: 'work',
    children: [{
        name: 'span',
        class: 'mr',
        text: '2017.09 — 2021.06'
    }, {
        name: 'span',
        text: '本科学习阶段'
    }]
}, {
    name: 'ul',
    class: 'ul-list',
    children: [ 
    {
        name: 'li',
        text: '学业优秀奖学金，优秀学生团员'
    },{
        name: 'li',
        text: '2018年参加蓝桥杯大赛，省赛三等奖'
    },{
        name: 'li',
        text: '全国计算机能力挑战赛程序设计赛(C语言)三等奖'
    },{
        name: 'li',
        text: '2020年高校微信小程序应用开发赛西北赛区二等奖'
    },{
        name: 'li',
        text: '三又网上汉语学习平台软件著作权'
    }
]},{
    name: 'h4',
    class: 'text-title',
    text: '项目经历'
}, {
    name: 'div',
    class: 'item-lv',
    children: [{
        name: 'ul',
        class: 'ul-list',
        children: [{
            class: 'project-title',
            text: '一：基于SprintBoot和Dubbo框架的租房系统的设计与实现'
        },  {
            name: 'li',
            text: '项目描述：房屋租赁的信息共享平台，前台为用户可见的WebAPP应用，基于',
            children: [{
                name: 'span',
                class: 'tag',
                text: 'ReactJS'
            },{
                name: 'span',
                text: '实现。后台的前端页面使用layuimini模板，后端架构为'
            },{
                name: 'span',
                class: 'tag',
                text: 'SpringBoot+Dubbo'
            },{
                name: 'span',
                text: '，'
            },{
                name: 'span',
                class: 'tag',
                text: 'GraphQL'
            },{
                name: 'span',
                text: '风格查询接口，使用了'
            },{
                name: 'span',
                class: 'tag',
                text: 'ElasticSearch、Redis'
            },{
                name: 'span',
                text: '加快数据的访问与搜索，数据库采用集群方案解决'
            },{
                name: 'span',
                tag: '负载均衡'
            }]
        }, {
            name: 'li',
            text: '后端技术：SpringBoot+SpringMVC+Dubbo+Mybatis+ElasticStack'
        }, {
            name: 'li',
            text: '前端架构：ReactJS+html+百度地图SDK'
        }]
    }, {
        name: 'ul',
        class: 'ul-list',
        children: [{  
            class: 'project-title',
            text: '二：太原理工大学校园导览小程序'
        }, {
            name: 'li',
            text: '技术方案：WXML,CSS,JavaScript',
            children: [{
                name: 'span',
                class: 'tag',
                text: ',腾讯地图服务'
            }]
        }, {
            name: 'li',
            text: '项目描述：标注太原理工大学三个校区全部地理坐标，方便新生更快了解校园，2019年实现2万用户，并持续增长。'
        }]
    }]
} ,{
    name: 'h4',
    class: 'text-title',
    text: '自我评价'
    }, {
    name: 'ul',
    class: 'ul-list',
    children: [ {
        name: 'li',
        text: '有独立分析和解决问题的能力，有较强的自学及动手能力，并善于接收新事物'
    }, {
        name: 'li',
        text: '具有',
        children: [{
            name: 'span',
            class: 'tag',
            text: '团队管理经验'
        }, {
            name: 'span',
            text: '，拥有良好的人际交往、协调沟通能力以及团队精神'
        }]
    },{
        name: 'li',
        text: '性格随和、诚恳稳重、身体素质较好、适应环境能力强'
    }]
}]
let style = `
    /*
    * 面试官您好，我是AmosTian
    * 特此准备了一份在线简历
    * 先准备一些样式
    */
    *{
        transition: all .8s;
    }
    /* 容器中要添加点样式 */
    #codeEdit{
        color: #fff;
        background: #1E1E1E;
    }
    #resume{
        box-shadow: -1px 4px 9px 3px rgba(0, 0, 0, .15);
    }
    /* 再来点代码高亮 */
    pre#codeEdit{
        color: #CE9e78;
    }
    .token.selector{
        color: rgb(230, 155, 43);
    }
    .token.comment{
        color: #2eb996;
        font-size: 14px;
    }
    .token.property{
        color: #60C8FE;
    }
    .token.function {
        color: #DD4A68;
    }
    /* 好啦,右边就是我的简历，望查阅指正 */
`
let balloon = `
    <div class="balloon-wrap">
        <img src="/images/balloon.png" id="bg-balloon-small">
        <img src="/images/balloon.png" id="bg-balloon-large">
        <img src="/images/logo.png" id="bg-balloon-logo">
    </div>
    <div class="connect" style="width: 100%; display: flex;"></div>`
let line = `
    <div class="line-wrap">
        <div class="line-left"></div>
        <div class="line-right">
            <p class="line-defColor line-item1"></p>
            <p class="line-darkColor line-item2"></p>
            <p class="line-defColor line-item3"></p>
            <p class="line-midColor line-item4"></p>
            <p class="line-darkColor line-item5"></p>
            <p class="line-midColor line-item6"></p>
            <p class="line-darkColor line-item7"></p>
            <p class="line-midColor line-item7"></p>
        </div>
    </div>
    <div class="connect"></div>`
let text = `
    <div class="text-wrap"></div>
`