webpackJsonp([2],[
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return w; });
/**
 * 自用框架
 * import { w } from './wtool';
 * w.$('node')  获取单个元素
 * w.$$('node')  获取多个的元素
 * w.hasClass(elementId, cName)  检查元素是否有指定class
 * w.addClass(elementId, cName)  添加class
 * w.replaceClass(elementId, cName,nName)  替换class
 * w.removeClass(elementId, cName)   删除class
 * w.removaAllChildNodes(elementId)   删除所有子节点
 * w.addEvent(elementId, event, func)  添加事件
 * w.formatSeconds(value)  把数值格式化为时间
 * w.attr(node, attr, newVal)  获取或设置元素属性 newVal为空是为查询
 */

var w = {
    /**
     * 获取单个的元素
     * 
     * @param {String} selector
     * @param {Element} [context=document]
     * @returns {Element} element
     */
    $: selector => {
        if (document instanceof NodeList) {
            return Array.from(document, node => {
                return node.querySelector(selector);
            });
        }
        return document.querySelector(selector);
    },

    /**
     * 获取多个的元素
     * 
     * @param {String} selector
     * @param {Element} [context=document]
     * @returns {Element} element
     */
    $$: selector => {
        if (document instanceof NodeList) {
            return Array.from(document, node => {
                return node.querySelectorAll(selector);
            });
        }
        return document.querySelectorAll(selector);
    },
    /**
     * 检查元素是否有指定class
     * 
     * @param {String} cName
     * @param {Element} elementId
     * @returns {boolean} boolean
     */
    hasClass(elementId, cName) {
        return !!elementId.className.match(new RegExp("(\\s|^)" + cName + "(\\s|$)"));
    },
    /**
     * 元素添加class
     * 
     * @param {String} cName
     * @param {Element} elementId
     */
    addClass(elementId, cName) {
        if (!w.hasClass(elementId, cName)) {
            elementId.className += " " + cName;
        }
    },
    /**
     * 元素替换class
     * 
     * @param {Element} elementId
     * @param {String} cName
     * @param {String} nName
     */
    replaceClass(elementId, cName, nName) {
        w.removeClass(elementId, cName);
        w.addClass(elementId, nName);
    },
    /**
     * 元素删除class
     * 
     * @param {String} cName
     * @param {Element} elementId
     */
    removeClass(elementId, cName) {
        if (w.hasClass(elementId, cName)) {
            elementId.className = elementId.className.replace(new RegExp('(^|\\b)' + cName.split(' ').join('|') + '(\\b|$)', 'gi'), '');
        }
    },
    /**
     * 删除所有子节点
     * 
     * @param {Element} elementId
     */
    removaAllChildNodes(elementId) {
        var childs = elementId.childNodes;
        for (var i = childs.length - 1; i >= 0; i--) {
            elementId.removeChild(childs.item(i));
        }
    },
    /**
     * 删除自身节点
     * 
     * @param {Element} elementId
     */
    removaSelfNodes(elementId) {
        w.removaAllChildNodes(elementId);
        var parent = elementId.parentNode;
        parent.removeChild(elementId);
    },

    /**
     * 获取或设置元素属性
     * 
     * @param {Element} node
     * @param {String} attr
     * @param {String} [newVal=null]
     * @returns {String} element's attribute value or null
     */
    attr: (node, attr, newVal) => {
        // newVal = null
        if (newVal) {
            node.setAttribute(attr, newVal);
            return;
        }
        return node.getAttribute(attr);
    },
    /**
     * 添加事件
     * 
     * @param {Element} elementId
     * @param {String} event
     * @param {String} func
     */
    addEvent(elementId, event, func) {
        if (elementId != null) {
            if (elementId.addEventListener) {
                elementId.addEventListener(event, func, false);
            } else if (elementId.attachEvent) {
                elementId.attachEvent('on' + event, func);
            } else {
                elementId['on' + event] = func;
            }
        } else {
            console.log("elementId:null");
            return false;
        }
    },
    /**
     * 将数值格式化为时间
     * 
     * @param {String} value
     * @returns {String} timr or NaN
     */
    formatSeconds(value) {
        var minute = parseInt(value / 60);
        var second = parseInt(value - minute * 60);
        var result;
        second = second >= 10 ? second : '0' + second;
        result = minute + ":" + second;
        if (result == "NaN:NaN") {
            return "--:--";
        } else {
            return result;
        }
    }
};

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["create"] = create;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__wtools__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__template_html__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__template_html___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__template_html__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__style_scss__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__style_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__style_scss__);



function create() {
  __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$$(".container")[0].innerHTML = __WEBPACK_IMPORTED_MODULE_1__template_html___default.a;
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(3);
__webpack_require__(6);
__webpack_require__(22);
__webpack_require__(1);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var insert = __webpack_require__(4);
var normalize = __webpack_require__(5);

insert(normalize);


/***/ }),
/* 4 */
/***/ (function(module, exports) {

var inserted = [];

module.exports = function (css) {
    if (inserted.indexOf(css) >= 0) return;
    inserted.push(css);
    
    var elem = document.createElement('style');
    var text = document.createTextNode(css);
    elem.appendChild(text);
    
    if (document.head.childNodes.length) {
        document.head.insertBefore(elem, document.head.childNodes[0]);
    }
    else {
        document.head.appendChild(elem);
    }
};


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = "/*! normalize.css v2.1.3 | MIT License | git.io/normalize */\n\n/* ==========================================================================\n   HTML5 display definitions\n   ========================================================================== */\n\n/**\n * Correct `block` display not defined in IE 8/9.\n */\n\narticle,\naside,\ndetails,\nfigcaption,\nfigure,\nfooter,\nheader,\nhgroup,\nmain,\nnav,\nsection,\nsummary {\n    display: block;\n}\n\n/**\n * Correct `inline-block` display not defined in IE 8/9.\n */\n\naudio,\ncanvas,\nvideo {\n    display: inline-block;\n}\n\n/**\n * Prevent modern browsers from displaying `audio` without controls.\n * Remove excess height in iOS 5 devices.\n */\n\naudio:not([controls]) {\n    display: none;\n    height: 0;\n}\n\n/**\n * Address `[hidden]` styling not present in IE 8/9.\n * Hide the `template` element in IE, Safari, and Firefox < 22.\n */\n\n[hidden],\ntemplate {\n    display: none;\n}\n\n/* ==========================================================================\n   Base\n   ========================================================================== */\n\n/**\n * 1. Set default font family to sans-serif.\n * 2. Prevent iOS text size adjust after orientation change, without disabling\n *    user zoom.\n */\n\nhtml {\n    font-family: sans-serif; /* 1 */\n    -ms-text-size-adjust: 100%; /* 2 */\n    -webkit-text-size-adjust: 100%; /* 2 */\n}\n\n/**\n * Remove default margin.\n */\n\nbody {\n    margin: 0;\n}\n\n/* ==========================================================================\n   Links\n   ========================================================================== */\n\n/**\n * Remove the gray background color from active links in IE 10.\n */\n\na {\n    background: transparent;\n}\n\n/**\n * Address `outline` inconsistency between Chrome and other browsers.\n */\n\na:focus {\n    outline: thin dotted;\n}\n\n/**\n * Improve readability when focused and also mouse hovered in all browsers.\n */\n\na:active,\na:hover {\n    outline: 0;\n}\n\n/* ==========================================================================\n   Typography\n   ========================================================================== */\n\n/**\n * Address variable `h1` font-size and margin within `section` and `article`\n * contexts in Firefox 4+, Safari 5, and Chrome.\n */\n\nh1 {\n    font-size: 2em;\n    margin: 0.67em 0;\n}\n\n/**\n * Address styling not present in IE 8/9, Safari 5, and Chrome.\n */\n\nabbr[title] {\n    border-bottom: 1px dotted;\n}\n\n/**\n * Address style set to `bolder` in Firefox 4+, Safari 5, and Chrome.\n */\n\nb,\nstrong {\n    font-weight: bold;\n}\n\n/**\n * Address styling not present in Safari 5 and Chrome.\n */\n\ndfn {\n    font-style: italic;\n}\n\n/**\n * Address differences between Firefox and other browsers.\n */\n\nhr {\n    -moz-box-sizing: content-box;\n    box-sizing: content-box;\n    height: 0;\n}\n\n/**\n * Address styling not present in IE 8/9.\n */\n\nmark {\n    background: #ff0;\n    color: #000;\n}\n\n/**\n * Correct font family set oddly in Safari 5 and Chrome.\n */\n\ncode,\nkbd,\npre,\nsamp {\n    font-family: monospace, serif;\n    font-size: 1em;\n}\n\n/**\n * Improve readability of pre-formatted text in all browsers.\n */\n\npre {\n    white-space: pre-wrap;\n}\n\n/**\n * Set consistent quote types.\n */\n\nq {\n    quotes: \"\\201C\" \"\\201D\" \"\\2018\" \"\\2019\";\n}\n\n/**\n * Address inconsistent and variable font size in all browsers.\n */\n\nsmall {\n    font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` affecting `line-height` in all browsers.\n */\n\nsub,\nsup {\n    font-size: 75%;\n    line-height: 0;\n    position: relative;\n    vertical-align: baseline;\n}\n\nsup {\n    top: -0.5em;\n}\n\nsub {\n    bottom: -0.25em;\n}\n\n/* ==========================================================================\n   Embedded content\n   ========================================================================== */\n\n/**\n * Remove border when inside `a` element in IE 8/9.\n */\n\nimg {\n    border: 0;\n}\n\n/**\n * Correct overflow displayed oddly in IE 9.\n */\n\nsvg:not(:root) {\n    overflow: hidden;\n}\n\n/* ==========================================================================\n   Figures\n   ========================================================================== */\n\n/**\n * Address margin not present in IE 8/9 and Safari 5.\n */\n\nfigure {\n    margin: 0;\n}\n\n/* ==========================================================================\n   Forms\n   ========================================================================== */\n\n/**\n * Define consistent border, margin, and padding.\n */\n\nfieldset {\n    border: 1px solid #c0c0c0;\n    margin: 0 2px;\n    padding: 0.35em 0.625em 0.75em;\n}\n\n/**\n * 1. Correct `color` not being inherited in IE 8/9.\n * 2. Remove padding so people aren't caught out if they zero out fieldsets.\n */\n\nlegend {\n    border: 0; /* 1 */\n    padding: 0; /* 2 */\n}\n\n/**\n * 1. Correct font family not being inherited in all browsers.\n * 2. Correct font size not being inherited in all browsers.\n * 3. Address margins set differently in Firefox 4+, Safari 5, and Chrome.\n */\n\nbutton,\ninput,\nselect,\ntextarea {\n    font-family: inherit; /* 1 */\n    font-size: 100%; /* 2 */\n    margin: 0; /* 3 */\n}\n\n/**\n * Address Firefox 4+ setting `line-height` on `input` using `!important` in\n * the UA stylesheet.\n */\n\nbutton,\ninput {\n    line-height: normal;\n}\n\n/**\n * Address inconsistent `text-transform` inheritance for `button` and `select`.\n * All other form control elements do not inherit `text-transform` values.\n * Correct `button` style inheritance in Chrome, Safari 5+, and IE 8+.\n * Correct `select` style inheritance in Firefox 4+ and Opera.\n */\n\nbutton,\nselect {\n    text-transform: none;\n}\n\n/**\n * 1. Avoid the WebKit bug in Android 4.0.* where (2) destroys native `audio`\n *    and `video` controls.\n * 2. Correct inability to style clickable `input` types in iOS.\n * 3. Improve usability and consistency of cursor style between image-type\n *    `input` and others.\n */\n\nbutton,\nhtml input[type=\"button\"], /* 1 */\ninput[type=\"reset\"],\ninput[type=\"submit\"] {\n    -webkit-appearance: button; /* 2 */\n    cursor: pointer; /* 3 */\n}\n\n/**\n * Re-set default cursor for disabled elements.\n */\n\nbutton[disabled],\nhtml input[disabled] {\n    cursor: default;\n}\n\n/**\n * 1. Address box sizing set to `content-box` in IE 8/9/10.\n * 2. Remove excess padding in IE 8/9/10.\n */\n\ninput[type=\"checkbox\"],\ninput[type=\"radio\"] {\n    box-sizing: border-box; /* 1 */\n    padding: 0; /* 2 */\n}\n\n/**\n * 1. Address `appearance` set to `searchfield` in Safari 5 and Chrome.\n * 2. Address `box-sizing` set to `border-box` in Safari 5 and Chrome\n *    (include `-moz` to future-proof).\n */\n\ninput[type=\"search\"] {\n    -webkit-appearance: textfield; /* 1 */\n    -moz-box-sizing: content-box;\n    -webkit-box-sizing: content-box; /* 2 */\n    box-sizing: content-box;\n}\n\n/**\n * Remove inner padding and search cancel button in Safari 5 and Chrome\n * on OS X.\n */\n\ninput[type=\"search\"]::-webkit-search-cancel-button,\ninput[type=\"search\"]::-webkit-search-decoration {\n    -webkit-appearance: none;\n}\n\n/**\n * Remove inner padding and border in Firefox 4+.\n */\n\nbutton::-moz-focus-inner,\ninput::-moz-focus-inner {\n    border: 0;\n    padding: 0;\n}\n\n/**\n * 1. Remove default vertical scrollbar in IE 8/9.\n * 2. Improve readability and alignment in all browsers.\n */\n\ntextarea {\n    overflow: auto; /* 1 */\n    vertical-align: top; /* 2 */\n}\n\n/* ==========================================================================\n   Tables\n   ========================================================================== */\n\n/**\n * Remove most spacing between table cells.\n */\n\ntable {\n    border-collapse: collapse;\n    border-spacing: 0;\n}\n"


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__wtools__ = __webpack_require__(0);

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
    }, {
        "title": "用SASS重构 pc企业响应式官网",
        "name": "try/danmu",
        "completed": true,
        "isLink": false,
        "github": "https://wmn1525.github.io/web-project-learn/css14-15/15-1.html "
    }, {
        "title": "Bootstrap 表单页",
        "name": "try/slideValidation",
        "completed": true,
        "isLink": true,
        "github": "https://wmn1525.github.io/web-project-learn/css10/index.html"
    }, {
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
    }, {
        "title": "精心收集的 48 个 JavaScript 代码片段，仅需 30 秒就可理解",
        "name": "article",
        "completed": false,
        "isLink": true,
        "github": "https://www.jianshu.com/p/10b7b57e1338"
    }, {
        "title": "如何使用NPM？CNPM又是什么？",
        "name": "article",
        "completed": false,
        "isLink": true,
        "github": "https://www.jianshu.com/p/f18ac085c69f"
    }, {
        "title": "流浏览器内核有哪几种？",
        "name": "article",
        "completed": false,
        "isLink": true,
        "github": "https://www.jianshu.com/p/7ddd1d2f6022"
    }, {
        "title": "跨域解决方案之NGINX",
        "name": "article",
        "completed": false,
        "isLink": true,
        "github": "https://www.jianshu.com/p/eabf9e82a771"
    }, {
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
}];

//初始化时检查hash是否为空，空时默认指向index，否则解析hash
window.onload = function () {
    routers.add("index");
    routers.add("resume");
    routers.add("404");

    listFill(); //列表填充
    let isClickRedirect = false; //是否点击跳转。是则不触发hashchange事件
    if (location.hash == '') {
        redirectTo("index");
    } else {
        let _hash = location.hash.toString().substr(2);
        analysis(_hash);
    }

    // 路由切换
    window.addEventListener('hashchange', function () {
        console.log("hashchange", isClickRedirect);
        if (!isClickRedirect) {
            let _hash = location.hash.toString().substr(2);
            analysis(_hash);
        } else {
            isClickRedirect = false;
        }
    });

    //跳转至简历
    __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].addEvent(__WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$("#myResume"), "click", function () {
        location.hash = '#/resume';
        __webpack_require__.e/* require.ensure */(1).then((function () {
            __webpack_require__(27).create();
        }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
    });

    //移动端导航
    __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].addEvent(__WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$("#moblieBlock"), "click", function () {

        if (navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)) {
            if (__WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$("#menuBlock").style.top == "0px") {
                __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$("#menuBlock").style.top = "-110%";
                __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$("#mobileBlockNav").style.display = "none";
                __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$("#mobileBlockAvatar").style.display = "block";
            } else {
                __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$("#menuBlock").style.top = "0px";
                __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$("#mobileBlockNav").style.display = "block";
                __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$("#mobileBlockAvatar").style.display = "none";
            }
        }
    });

    //跳转至index
    __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].addEvent(__WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$("#infoName"), "click", function () {
        location.hash = '#/index';
        new Promise(function(resolve) { resolve(); }).then((function () {
            __webpack_require__(1).create();
        }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
    });

    //监听列表点击事件
    __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].addEvent(__WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$("#myLink"), "click", function () {
        // w.$("#myLink").querySelector('a').click();
        if (navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)) {
            __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$("#menuBlock").style.top = "-110%";
            __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$("#mobileBlockNav").style.display = "none";
            __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$("#mobileBlockAvatar").style.display = "block";
        }
    });
    //监听列表点击事件
    __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].addEvent(__WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$("#infoName"), "click", function () {
        if (navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)) {
            __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$("#menuBlock").style.top = "-110%";
            __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$("#mobileBlockNav").style.display = "none";
            __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$("#mobileBlockAvatar").style.display = "block";
        }
    });
    //监听列表点击事件
    __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].addEvent(__WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$("#homeNav"), "click", function (e) {
        let _hash,
            isLi = false;
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
            __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$("#menuBlock").style.top = "-110%";
            __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$("#mobileBlockNav").style.display = "none";
            __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$("#mobileBlockAvatar").style.display = "block";
        }
    });

    let originTitle = document.title,
        titleTime;
    document.addEventListener("visibilitychange", function () {
        if (document.hidden) {
            document.title = "死鬼干什么去了！";
            clearTimeout(titleTime);
        } else {
            document.title = "你还知道回来!";
            titleTime = setTimeout(function () {
                document.title = originTitle;
            }, 3000);
        }
    });
};

//列表填充
const listFill = function () {
    // console.log("listFill");
    __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].removaAllChildNodes(__WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$("#homeNav"));
    const cFrag = document.createDocumentFragment();
    const listWrapUl = document.createElement("ul");
    for (var key in list) {
        if (list.hasOwnProperty(key)) {
            const listCollageLi = document.createElement("li");
            listCollageLi.innerHTML = list[key].title;
            listWrapUl.appendChild(listCollageLi);
            const listTaskUl = document.createElement("ul");
            var element = list[key];
            for (var t in element.tasks) {
                var ele = element.tasks[t];
                const listTaskLi = document.createElement("li");
                const listTaskI = document.createElement("i");
                const listTaskSpan = ele.isLink ? document.createElement("a") : document.createElement("span");
                listTaskI.className = ele.isLink ? "iconfont icon-lianjie circle-dot" : "iconfont icon-iconfontdian1 circle-dot";
                ele.completed ? listTaskI.classList.add("completed") : "";
                listTaskLi.dataset.name = ele.name;
                listTaskLi.dataset.title = ele.title;
                listTaskLi.appendChild(listTaskI);
                ele.isLink ? (listTaskSpan.href = ele.github, listTaskSpan.setAttribute('target', '_blank')) : "";
                listTaskSpan.innerHTML = ele.title;
                listTaskLi.appendChild(listTaskSpan);
                listTaskUl.appendChild(listTaskLi);
                routers.add(ele.name);
            }
            listWrapUl.appendChild(listTaskUl);
        }
    }
    cFrag.appendChild(listWrapUl);
    console.log(routers);
    __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$("#homeNav").appendChild(cFrag);
};

//重定向页面
const redirectTo = function (rdpath) {
    console.log("redirect to: " + rdpath);
    location.hash = '#/' + rdpath;
    __webpack_require__.e/* require.ensure */(0).then((function () {
        __webpack_require__(28)("./" + rdpath + '/index.js').create();
    }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};

// 分析hash
const analysis = function (anahash) {
    console.log("analysis: " + anahash);
    let isExisted = false;
    for (var key of routers) {
        if (key == anahash) {
            isExisted = true;
            break;
        }
    }
    isExisted ? redirectTo(anahash) : redirectTo("404");
};

/***/ }),
/* 7 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = "<section class=\"index-container\">\n    <!--<p class=\"index-title\">留白</p>\n    <p class=\"index-detail\">还没想好放什么</p>\n    <p class=\"index-detail\" >左边是我的简历、github、还有做的一点实践</p>-->\n    <p class=\"welcome-text\">Welcome</p>\n    <p class=\"look-around\">若有工作邀请可以给我发邮件、打电话，谢谢</p>\n    <div class=\"welcome-meta\"><span>左边是我的简历、github、还有做的一点实践</span></div>\n    <h1 class=\"inline-title\">DEMO</h1>\n    <div class=\"block-wrap\">\n        <a href=\"#/resume\" class=\"block-item\">\n            <img src=\"" + __webpack_require__(9) + "\">\n            <p>简历</p>\n        </a>\n        <a href=\"https://kelrvins.github.io/kelrvin/#/try/mobile\" class=\"block-item\" target=\"_blank\">\n            <img src=\"" + __webpack_require__(10) + "\">\n            <p>移动端图片展示</p>\n        </a>\n        <a href=\"#/baiduIfe/musicPlay\" class=\"block-item\">\n            <img src=\"" + __webpack_require__(11) + "\">\n            <p>音乐播放器</p>\n        </a>\n        <a href=\"#/try/danmu\" class=\"block-item\">\n            <img src=\"" + __webpack_require__(12) + "\">\n            <p>弹幕</p>\n        </a>\n        <a href=\"#/try/slideValidation\" class=\"block-item\">\n            <img src=\"" + __webpack_require__(13) + "\">\n            <p>滑动验证</p>\n        </a>\n        <a href=\"https://kelrvins.github.io/otherDemo/tables.html\" class=\"block-item\" target=\"_blank\">\n            <img src=\"" + __webpack_require__(14) + "\">\n            <p>基于BS table的图表</p>\n        </a>\n        <a href=\"#/baiduIfe/moveBlock\" class=\"block-item\">\n            <img src=\"" + __webpack_require__(15) + "\">\n            <p>可移动的小方块</p>\n        </a>\n        <a href=\"#/baiduIfe/searchInsert\" class=\"block-item\">\n            <img src=\"" + __webpack_require__(16) + "\">\n            <p>搜索-插入-多叉树</p>\n        </a>\n        <a href=\"#/baiduIfe/searchInsert\" class=\"block-item\">\n            <img src=\"" + __webpack_require__(17) + "\">\n            <p>排序-插入-多叉树</p>\n        </a>\n        <a href=\"#/baiduIfe/hoverEffect\" class=\"block-item\">\n            <img src=\"" + __webpack_require__(18) + "\">\n            <p>鼠标悬浮</p>\n        </a>\n        <a href=\"#/baiduIfe/rightContent\" class=\"block-item\">\n            <img src=\"" + __webpack_require__(19) + "\">\n            <p>右击菜单</p>\n        </a>\n        <a href=\"#/baiduIfe/Carousel\" class=\"block-item\">\n            <img src=\"" + __webpack_require__(20) + "\">\n            <p>轮播</p>\n        </a>\n    </div>\n</section>";

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/img/resume-e9c5d842.png";

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/img/moblie-2dd90e1d.png";

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/img/music-5ca30806.png";

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/img/danmu-c6727963.png";

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/img/slider1-ee6e9f85.png";

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/img/table-48fe3cf7.png";

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/img/moveblock-db8fe396.png";

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/img/tree1-82027880.png";

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/img/tree2-2e759eb5.png";

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/img/hover-811b6e73.png";

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/img/rightclick-a83a2734.png";

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/img/slider-3b7f2ab9.png";

/***/ }),
/* 21 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 22 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 23 */,
/* 24 */,
/* 25 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(7);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ })
],[2]);