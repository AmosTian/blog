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
            text: '姓名：田兆吉'
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
        text: '主修课程：C、C++、Java、HTML、CSS、JavaScript、Python、MySQL',
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
        text: '熟练掌握',
        children: [{
            name: 'span',
            class: 'tag',
            text: 'H5、CSS3、JS、C++、Python'
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
        text: '熟练掌握',
        children: [{
            name: 'span',
            class: 'tag',
            text: 'Python数据处理'
        }, {
            name: 'span',
            text: '，熟悉Git使用及原理'
        }]
    }, {
        name: 'li',
        text: '熟悉',
        children: [{
            name: 'span',
            class: 'tag',
            text: 'MySQL数据库'
        }, {
            name: 'span',
            text: '熟悉索引工作原理'
        }]
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
        text: '2017.09 — 2020.01'
    }, {
        name: 'span',
        text: '本科学习阶段'
    }]
}, {
    name: 'ul',
    class: 'ul-list',
    children: [
        // {
    //     name: 'li',
    //     text: '从大一新生，升任到清泽心雨技术总监，负责',
    //     children: [{
    //         name: 'span',
    //         class: 'tag',
    //         text: '带领新人、项目安排、产品优化'
    //     }, {
    //         name: 'span',
    //         text: '，定期组织开展小程序研讨技术会，为组织奠定了技术基础'
    //     }]
    // }, 
    {
        name: 'li',
        text: '2017年参加第一届天梯赛，团队优秀奖'
    },{
        name: 'li',
        text: '2018年参加蓝桥杯大赛，省赛三等奖'
    },{
        name: 'li',
        text: '2019年小程序开发大赛，西北赛区三等奖'
    }]
}, {
    name: 'h4',
    class: 'text-title',
    text: '高级项目'
}, {
    name: 'div',
    class: 'item-lv',
    children: [{
        name: 'ul',
        class: 'ul-list',
        children: [{
            name: 'li',
            class: 'project-title',
            text: '项目一：留言板项目（JSP开发）'
        }, {
            name: 'li',
            text: '技术方案：Jsp、Servlet、JavaBean',
            children: [{
                name: 'span',
                class: 'tag',
                text: 'mysql5.0、Tomcat v7.0'
            }]
        }, {
            name: 'li',
            text: '项目描述：交互式网页，方便客户端和服务端之间的信息传输。三大模块：用户注册和登录模块、用户管理模块、留言管理和显示模块。'
        }]
    }, {
        name: 'ul',
        class: 'ul-list',
        children: [{
            name: 'li',
            class: 'project-title',
            text: '项目二：太原理工大学校园导览小程序'
        }, {
            name: 'li',
            text: '技术方案：WXML,CSS,JavaScript',
            children: [{
                name: 'span',
                class: 'tag',
                text: '腾讯地图框架'
            }]
        }, {
            name: 'li',
            text: '项目描述：标注太原理工大学三个校区全部地理坐标，方便新生更快了解校园，2019年实现2万用户，并持续增长。在项目实现的过程中将熟悉微信小程序的完整流程。'
        }]
    }]
}, {
    name: 'h4',
    class: 'text-title',
    text: '自我评价'
}, {
    name: 'ul',
    class: 'ul-list',
    children: [{
        name: 'li',
        text: '具有',
        children: [{
            name: 'span',
            class: 'tag',
            text: '团队管理经验'
        }, {
            name: 'span',
            text: '，拥有良好的'
        }, {
            name: 'span',
            class: 'tag',
            text: '团队协调能力'
        }, {
            name: 'span',
            text: '，与同事配合极其默契'
        }]
    }, {
        name: 'li',
        text: '有很强的',
        children: [{
            name: 'span',
            class: 'tag',
            text: '自学及动手能力'
        }, {
            name: 'span',
            text: '，善于接受新事物，精通'
        }, {
            name: 'span',
            class: 'tag',
            text: '小程序'
        }, {
            name: 'span',
            text: '开发'
        }]
    }, {
        name: 'li',
        text: '性格随和、诚恳稳重、身体素质较好、适应环境能力强'
    }]
}]
let style = `
    /*
    * 面试官您好，我是田兆吉
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
        <img src="images/balloon.png" id="bg-balloon-small">
        <img src="images/balloon.png" id="bg-balloon-large">
        <img src="images/logo.png" id="bg-balloon-logo">
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