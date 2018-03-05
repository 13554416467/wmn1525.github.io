import {
    w
} from './wtools';
//set数组，自动去重
const routers = new Set();

const list = [{
    "title": "DEMO",
    "tasks": [{
        "title": "mobile登陆页",
        "name": "try/mobile",
        "completed": true,
        "isLink": true,
        "github": "https://wmn1525.github.io/web-project-learn/css4/index.html  "
    }, {
        "title": "mobile桌游精灵练习页面",
        "name": "baiduIfe/BootstrapTable",
        "completed": true,
        "isLink": true,
        "github": "https://wmn1525.github.io/web-project-learn/ghost-demo/index.html"
    },{
        "title": "用SASS重构 pc企业响应式官网",
        "name": "try/danmu",
        "completed": true,
        "isLink": false,
        "github": "https://wmn1525.github.io/web-project-learn/css14-15/15-1.html "
    },{
        "title": "Bootstrap 表单页",
        "name": "try/slideValidation",
        "completed": true,
        "isLink": true,
        "github": "https://wmn1525.github.io/web-project-learn/css10/index.html"
    },{
        "title": "js小游戏狼人杀原生js加jq",
        "name": "try/cale",
        "completed": true,
        "isLink": true,
        "github": "https://wmn1525.github.io/web-project-learn/js234/peibi.html"
    }]
}, {
    "title": "文章",
    "tasks": [{
        "title": "z-index和叠加上下文是如何形成",
        "name": "article",
        "completed": true,
        "isLink": true,
        "github": "https://www.jianshu.com/p/d50d1cccbf70"
    }, {
        "title": "在浏览器地址栏输入URL，按下回车后究竟发生了什么？",
        "name": "article",
        "completed": false,
        "isLink": true,
        "github": "https://www.jianshu.com/p/f63892ed3830"
    },{
        "title": "精心收集的 48 个 JavaScript 代码片段，仅需 30 秒就可理解",
        "name": "article",
        "completed": false,
        "isLink": true,
        "github": "https://www.jianshu.com/p/10b7b57e1338"
    },{
        "title": "如何使用NPM？CNPM又是什么？",
        "name": "article",
        "completed": false,
        "isLink": true,
        "github": "https://www.jianshu.com/p/f18ac085c69f"
    },{
        "title": "流浏览器内核有哪几种？",
        "name": "article",
        "completed": false,
        "isLink": true,
        "github": "https://www.jianshu.com/p/7ddd1d2f6022"
    },{
        "title": "跨域解决方案之NGINX",
        "name": "article",
        "completed": false,
        "isLink": true,
        "github": "https://www.jianshu.com/p/eabf9e82a771"
    },{
        "title": "流浏览器内核有哪几种？",
        "name": "article",
        "completed": false,
        "isLink": true,
        "github": "https://www.jianshu.com/p/7ddd1d2f6022"
    }]
}, {
    "title": "前端项目GitHub地址",
    "tasks": [{
        "title": "萝卜多社群招聘网站",
        "name": "baiduIfe/musicPlay",
        "completed": true,
        "isLink": true,
        "github": "https://github.com/wmn1525/lbd-admin"
    }, {
        "title": "学渣乐园后台管理系统",
        "name": "baiduIfe/Carousel",
        "completed": true,
        "isLink": true,
        "github": "https://github.com/wmn1525/qxdzz-admin"
    }]
}]

//初始化时检查hash是否为空，空时默认指向index，否则解析hash
window.onload = function () {
    routers.add("index");
    routers.add("resume");
    routers.add("404");

    listFill() //列表填充
    let isClickRedirect = false; //是否点击跳转。是则不触发hashchange事件
    if (location.hash == '') {
        redirectTo("index")
    } else {
        let _hash = location.hash.toString().substr(2);
        analysis(_hash);
    }

    // 路由切换
    window.addEventListener('hashchange', function () {
        console.log("hashchange", isClickRedirect)
        if (!isClickRedirect) {
            let _hash = location.hash.toString().substr(2);
            analysis(_hash);
        } else {
            isClickRedirect = false;
        }
    })

    //跳转至简历
    w.addEvent(w.$("#myResume"), "click", function () {
        location.hash = '#/resume';
        require.ensure([], function () {
            require('./resume/index.js').create()
        });
    })

    //移动端导航
    w.addEvent(w.$("#moblieBlock"), "click", function () {

        if (navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)) {
            if (w.$("#menuBlock").style.top == "0px") {
                w.$("#menuBlock").style.top = "-110%";
                w.$("#mobileBlockNav").style.display = "none";
                w.$("#mobileBlockAvatar").style.display = "block";
            } else {
                w.$("#menuBlock").style.top = "0px";
                w.$("#mobileBlockNav").style.display = "block";
                w.$("#mobileBlockAvatar").style.display = "none";
            }
        }
    })

    //跳转至index
    w.addEvent(w.$("#infoName"), "click", function () {
        location.hash = '#/index';
        require.ensure([], function () {
            require('./index/index.js').create()
        });
    })

    //监听列表点击事件
    w.addEvent(w.$("#myLink"), "click", function () {
        // w.$("#myLink").querySelector('a').click();
        if (navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)) {
            w.$("#menuBlock").style.top = "-110%";
            w.$("#mobileBlockNav").style.display = "none";
            w.$("#mobileBlockAvatar").style.display = "block";
        }
    })
    //监听列表点击事件
    w.addEvent(w.$("#infoName"), "click", function () {
        if (navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)) {
            w.$("#menuBlock").style.top = "-110%";
            w.$("#mobileBlockNav").style.display = "none";
            w.$("#mobileBlockAvatar").style.display = "block";
        }
    })
    //监听列表点击事件
    w.addEvent(w.$("#homeNav"), "click", function (e) {
        let _hash, isLi = false;
        if (e.target && e.target.nodeName == "LI" && e.target.dataset.name) {
            _hash = e.target;
            isLi = true;
        } else if (e.target && e.target.nodeName == "I" && e.target.parentNode.nodeName == "LI") {
            _hash = e.target.parentNode;
            isLi = true;
        } else if (e.target && e.target.nodeName == "SPAN" && e.target.parentNode.nodeName == "LI") {
            _hash = e.target.parentNode;
            isLi = true;
        }
        if (isLi) {
            if (_hash.querySelector('a')) {
                _hash.querySelector('a').click();
            } else {
                isClickRedirect = true;
                document.title = _hash.dataset.title;
                redirectTo(_hash.dataset.name);
                isLi = false;
            }
        }
        if (navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)) {
            w.$("#menuBlock").style.top = "-110%";
            w.$("#mobileBlockNav").style.display = "none";
            w.$("#mobileBlockAvatar").style.display = "block";
        }
    })

    let originTitle=document.title,
        titleTime;
        document.addEventListener("visibilitychange",function(){
            if(document.hidden){
                document.title="死鬼干什么去了！";
                clearTimeout(titleTime)
            }else{
                document.title="你还知道回来!";
                titleTime=setTimeout(function(){
                    document.title=originTitle;
                },3000)
            }
        })
}

//列表填充
const listFill = function () {
    // console.log("listFill");
    w.removaAllChildNodes(w.$("#homeNav"));
    const cFrag = document.createDocumentFragment();
    const listWrapUl = document.createElement("ul");
    for (var key in list) {
        if (list.hasOwnProperty(key)) {
            const listCollageLi = document.createElement("li");
            listCollageLi.innerHTML = list[key].title;
            listWrapUl.appendChild(listCollageLi)
            const listTaskUl = document.createElement("ul");
            var element = list[key];
            for (var t in element.tasks) {
                var ele = element.tasks[t];
                const listTaskLi = document.createElement("li");
                const listTaskI = document.createElement("i");
                const listTaskSpan = ele.isLink ? document.createElement("a") : document.createElement("span");
                listTaskI.className =  ele.isLink ?"iconfont icon-lianjie circle-dot":"iconfont icon-iconfontdian1 circle-dot";
                ele.completed ? listTaskI.classList.add("completed") : "";
                listTaskLi.dataset.name = ele.name;
                listTaskLi.dataset.title = ele.title;
                listTaskLi.appendChild(listTaskI);
                ele.isLink ? (listTaskSpan.href = ele.github, listTaskSpan.setAttribute('target', '_blank')) : "";
                listTaskSpan.innerHTML = ele.title
                listTaskLi.appendChild(listTaskSpan)
                listTaskUl.appendChild(listTaskLi)
                routers.add(ele.name);
            }
            listWrapUl.appendChild(listTaskUl)
        }
    }
    cFrag.appendChild(listWrapUl)
    console.log(routers)
    w.$("#homeNav").appendChild(cFrag)
}

//重定向页面
const redirectTo = function (rdpath) {
    console.log("redirect to: " + rdpath)
    location.hash = '#/' + rdpath;
    require.ensure([], function () {
        require('./' + rdpath + '/index.js').create()
    });
}

// 分析hash
const analysis = function (anahash) {
    console.log("analysis: " + anahash)
    let isExisted = false;
    for (var key of routers) {
        if (key == anahash) {
            isExisted = true;
            break;
        }
    }
    isExisted ? redirectTo(anahash) : redirectTo("404");
}