webpackJsonp([4],{

/***/ 34:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var SLiderV = function SLiderV() {
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
    this.getDOM();
    this.bindEvent();
};
SLiderV.prototype.getDOM = function () {
    this.sliderBlock = document.querySelector(this.selectors.sliderBlock);
    this.sliderBg = document.querySelector(this.selectors.sliderBg);
    this.sliderHander = document.querySelector(this.selectors.sliderHander);
    this.sliderIcon = document.querySelector(this.selectors.sliderIcon);
};
SLiderV.prototype.bindEvent = function () {
    var _self = this;
    var moblie = 'ontouchstart' in window;
    var start = moblie ? 'touchstart' : 'mousedown';
    var move = moblie ? 'touchmove' : 'mousemove';
    var _end = moblie ? 'touchend' : 'mouseup';
    var startX, lastX;
    var max = this.sliderBlock.offsetWidth - this.sliderHander.offsetWidth;

    var drag = {
        start: function start(event) {
            startX = (event.clientX || event.touches[0].clientX) - _self.sliderHander.offsetLeft;
            document.addEventListener(move, drag.move, false);
            document.addEventListener(_end, drag.end, false);
        },
        move: function move() {
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
        end: function end() {
            if (lastX < max) {
                _self.sliderHander.style.left = 0;
                _self.sliderBg.style.width = 0;
            }
            document.removeEventListener(move, drag.move, false);
            document.removeEventListener(move, drag.end, false);
            if (lastX >= max) {
                _self.flag = true;
                document.removeEventListener(_end, drag.end, false);

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
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _wtools = __webpack_require__(0);

var s = __webpack_require__(34);
var sl = new s();

var lines = [];

var DanMu = function DanMu() {
  this.send("苟利国家生死以，岂因祸福避趋之", this.getRandomColor());
  this.setDom();
};

DanMu.prototype.setDom = function () {
  var _self = this;

  _wtools.w.addEvent(_wtools.w.$("#danmuSender"), "click", function () {
    if (sl.flag) {
      var ina = _wtools.w.$("#danmuInput").value.trim();
      if (_wtools.w.$("#danmuInput") && ina != "") {
        var col = _self.getRandomColor();
        _self.send(ina, col);
        _self.labelSend(ina, col);
      } else {
        alert("请先输入...");
      }
    } else {
      _wtools.w.$("#dsliderBlock").style.border = "1px solid #f00";
      setTimeout(function () {
        _wtools.w.$("#dsliderBlock").style.border = "1px solid #ddd";
      }, 300);
    }
  });

  _wtools.w.addEvent(_wtools.w.$("#danmuClear"), "click", function () {
    _wtools.w.removaAllChildNodes(_wtools.w.$("#danmuPool"));
  });

  document.onkeydown = function (event) {
    var e = event || window.event;
    switch (e.keyCode) {
      case 13:
        _wtools.w.$("#danmuSender").click();
        break;
    }
  };
};

DanMu.prototype.labelSend = function (text, col) {
  var labelDanmu = _wtools.w.$("#danmuInputLabel");
  labelDanmu.innerHTML = text;
  labelDanmu.style.color = col;
  labelDanmu.classList.add("danmu-input-label-disappear");
  _wtools.w.$("#danmuInput").value = '';
  setTimeout(function () {
    labelDanmu.innerHTML = "&nbsp;";
    _wtools.w.removeClass(labelDanmu, "danmu-input-label-disappear");
  }, 1000);
};

DanMu.prototype.send = function (text, color) {
  console.log("send");
  var timer = void 0;
  var _self = this;
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

DanMu.prototype.make = function (text, color) {
  console.log("make");
  var isEx = false;
  var ran = void 0;
  var _Danmu = document.createElement("div");
  var poolLines = _wtools.w.$("#danmuPool").clientHeight / 20;

  _wtools.w.addClass(_Danmu, "danmu-item");
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
  _wtools.w.addEvent(_Danmu, "animationend", function () {
    _wtools.w.removaSelfNodes(_Danmu);
  });
  _wtools.w.$("#danmuPool").appendChild(_Danmu);
};

DanMu.prototype.getRandomColor = function () {
  return '#' + function (h) {
    return new Array(7 - h.length).join("0") + h;
  }((Math.random() * 0x1000000 << 0).toString(16));
};


var d = new DanMu();

/***/ })

});