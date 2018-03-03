webpackJsonp([4],{

/***/ 34:
/***/ (function(module, exports) {

const SLiderV = function () {
    var defaults = {
        sliderBlock: '#dsliderBlock',
        sliderBg: '#dsliderBg',
        sliderHander: '#dsliderHander',
        sliderIcon: '#vIcon'
    };
    this.selectors = Object.assign(defaults, arguments[0] || {});
    this.init();
};
SLiderV.prototype.flag = false;
SLiderV.prototype.init = function () {
    // console.log("init");
    this.getDOM();
    this.bindEvent();
};
SLiderV.prototype.getDOM = function () {
    // console.log("getDOM");
    this.sliderBlock = document.querySelector(this.selectors.sliderBlock);
    this.sliderBg = document.querySelector(this.selectors.sliderBg);
    this.sliderHander = document.querySelector(this.selectors.sliderHander);
    this.sliderIcon = document.querySelector(this.selectors.sliderIcon);
};
SLiderV.prototype.bindEvent = function () {
    // console.log("bindEvent");
    var _self = this;
    var moblie = 'ontouchstart' in window;
    var start = moblie ? 'touchstart' : 'mousedown';
    var move = moblie ? 'touchmove' : 'mousemove';
    var end = moblie ? 'touchend' : 'mouseup';
    var startX, lastX;
    var max = this.sliderBlock.offsetWidth - this.sliderHander.offsetWidth;

    var drag = {
        start: function (event) {
            // console.log("start");
            startX = (event.clientX || event.touches[0].clientX) - _self.sliderHander.offsetLeft;
            document.addEventListener(move, drag.move, false);
            document.addEventListener(end, drag.end, false);
        },
        move: function () {
            // console.log("move");
            lastX = (event.clientX || event.changedToucher[0].clientX) - startX;
            lastX = Math.max(0, Math.min(max, lastX));
            if (lastX >= max) {
                _self.sliderIcon.classList.remove("icon-you");
                _self.sliderIcon.classList.add("icon-wancheng");
                _self.sliderIcon.classList.add("color-green");
                _self.sliderHander.removeEventListener(start, drag.start, false);
                drag.end();
            }
            _self.sliderHander.style.left = lastX + "px";
            _self.sliderBg.style.width = lastX + "px";
        },
        end: function () {
            if (lastX < max) {
                _self.sliderHander.style.left = 0;
                _self.sliderBg.style.width = 0;
            }
            document.removeEventListener(move, drag.move, false);
            document.removeEventListener(move, drag.end, false);
            if (lastX >= max) {
                _self.flag = true;
                document.removeEventListener(end, drag.end, false);
                // console.log(_self.flag);
                setTimeout(function () {
                    document.getElementById("dsliderBlock").style.height = "0";
                    document.getElementById("dsliderBlock").style.border = "none";
                }, 200);
            }
        }
    };
    this.sliderHander.addEventListener(start, drag.start, false);
};
module.exports = SLiderV;

/***/ }),

/***/ 90:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__wtools__ = __webpack_require__(0);


var s = __webpack_require__(34);
var sl = new s();

let lines = []; //序号防重复数组

const DanMu = function () {
  this.send("苟利国家生死以，岂因祸福避趋之", this.getRandomColor());
  this.setDom();
};

DanMu.prototype.setDom = function () {
  const _self = this;
  //发送按钮
  __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].addEvent(__WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$("#danmuSender"), "click", function () {
    // console.log(sl.flag)
    if (sl.flag) {
      let ina = __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$("#danmuInput").value.trim();
      if (__WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$("#danmuInput") && ina != "") {
        let col = _self.getRandomColor();
        _self.send(ina, col);
        _self.labelSend(ina, col);
      } else {
        alert("请先输入...");
      }
    } else {
      __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$("#dsliderBlock").style.border = "1px solid #f00";
      setTimeout(function () {
        __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$("#dsliderBlock").style.border = "1px solid #ddd";
      }, 300);
    }
  });
  //清屏
  __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].addEvent(__WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$("#danmuClear"), "click", function () {
    __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].removaAllChildNodes(__WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$("#danmuPool"));
  });
  //回车事件
  document.onkeydown = function (event) {
    var e = event || window.event;
    switch (e.keyCode) {
      case 13:
        __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$("#danmuSender").click();
        break;
    }
  };
};

//label上天
DanMu.prototype.labelSend = function (text, col) {
  // console.log("labelSend")
  const labelDanmu = __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$("#danmuInputLabel");
  labelDanmu.innerHTML = text;
  labelDanmu.style.color = col;
  labelDanmu.classList.add("danmu-input-label-disappear");
  __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$("#danmuInput").value = '';
  setTimeout(function () {
    labelDanmu.innerHTML = "&nbsp;";
    __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].removeClass(labelDanmu, "danmu-input-label-disappear");
  }, 1000);
};

//发送弹幕
DanMu.prototype.send = function (text, color) {
  console.log("send");
  let timer;
  let _self = this;
  setTimeout(function () {
    _self.make(text, color);
  }, parseInt(Math.random() * 500, 10));
  timer = setInterval(function () {
    lines.shift();
    if (lines.length < 1) {
      clearInterval(timer);
    }
  }, 1000);
};

//生成弹幕
DanMu.prototype.make = function (text, color) {
  console.log("make");
  let isEx = false;
  let ran;
  let _Danmu = document.createElement("div");
  const poolLines = __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$("#danmuPool").clientHeight / 20;

  __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].addClass(_Danmu, "danmu-item");
  _Danmu.style.color = color;
  _Danmu.style.fontSize = 20 + "px";
  _Danmu.style.width = text.length * 20 + "px";
  _Danmu.innerHTML = text;

  while (!isEx) {
    ran = parseInt(Math.random() * (poolLines - 1), 10);
    if (lines.indexOf(ran) == -1) {
      isEx = true;
      lines.push(ran);
    }
  }
  _Danmu.style.top = ran * 20 + "px";
  __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].addEvent(_Danmu, "animationend", function () {
    __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].removaSelfNodes(_Danmu);
  });
  __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$("#danmuPool").appendChild(_Danmu);
};

//获取随机颜色
DanMu.prototype.getRandomColor = function () {
  return '#' + function (h) {
    return new Array(7 - h.length).join("0") + h;
  }((Math.random() * 0x1000000 << 0).toString(16));
};
// module.exports = DanMu;

let d = new DanMu();

/***/ })

});