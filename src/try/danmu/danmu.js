import {
  w
} from '../../wtools';

var s = require('./slideValidation')
var sl = new s();

let lines = []; //序号防重复数组

const DanMu=function() {
  this.send("苟利国家生死以，岂因祸福避趋之", this.getRandomColor());
  this.setDom();
}

DanMu.prototype.setDom = function () {
  const _self=this;
  //发送按钮
  w.addEvent(w.$("#danmuSender"), "click", function () {
    // console.log(sl.flag)
    if (sl.flag) {
      let ina = w.$("#danmuInput").value.trim();
      if (w.$("#danmuInput") && ina != "") {
        let col = _self.getRandomColor();
        _self.send(ina, col);
        _self.labelSend(ina, col);
      } else {
        alert("请先输入...")
      }
    } else {
      w.$("#dsliderBlock").style.border = "1px solid #f00";
      setTimeout(function () {
        w.$("#dsliderBlock").style.border = "1px solid #ddd";
      }, 300)
    }
  })
  //清屏
  w.addEvent(w.$("#danmuClear"), "click", function () {
    w.removaAllChildNodes(w.$("#danmuPool"));
  })
  //回车事件
  document.onkeydown = function (event) {
    var e = event || window.event;
    switch (e.keyCode) {
      case 13:
        w.$("#danmuSender").click();
        break;
    }
  }
}

//label上天
DanMu.prototype.labelSend = function (text, col) {
  // console.log("labelSend")
  const labelDanmu = w.$("#danmuInputLabel");
  labelDanmu.innerHTML = text;
  labelDanmu.style.color = col;
  labelDanmu.classList.add("danmu-input-label-disappear")
  w.$("#danmuInput").value = '';
  setTimeout(function () {
    labelDanmu.innerHTML = "&nbsp;";
    w.removeClass(labelDanmu, "danmu-input-label-disappear")
  }, 1000)
}

//发送弹幕
DanMu.prototype.send = function (text, color) {
  console.log("send")
  let timer;
  let _self = this;
  setTimeout(function () {
    _self.make(text, color)
  }, parseInt(Math.random() * 500, 10))
  timer = setInterval(function () {
    lines.shift();
    if (lines.length < 1) {
      clearInterval(timer);
    }
  }, 1000)
}

//生成弹幕
DanMu.prototype.make = function (text, color) {
  console.log("make")
  let isEx = false;
  let ran;
  let _Danmu = document.createElement("div");
  const poolLines = w.$("#danmuPool").clientHeight / 20;

  w.addClass(_Danmu, "danmu-item");
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
  w.addEvent(_Danmu, "animationend", function () {
    w.removaSelfNodes(_Danmu)
  })
  w.$("#danmuPool").appendChild(_Danmu);
}

//获取随机颜色
DanMu.prototype.getRandomColor = function () {
  return '#' + (function (h) {
    return new Array(7 - h.length).join("0") + h
  })((Math.random() * 0x1000000 << 0).toString(16))
}
// module.exports = DanMu;

let d = new DanMu();