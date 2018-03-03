const SLiderV = function () {
    var defaults = {
        sliderBlock: '#dsliderBlock',
        sliderBg: '#dsliderBg',
        sliderHander: '#dsliderHander',
        sliderIcon: '#vIcon'
    };
    this.selectors = Object.assign(defaults, arguments[0] || {});
    this.init();
}
SLiderV.prototype.flag = false;
SLiderV.prototype.init = function () {
    // console.log("init");
    this.getDOM();
    this.bindEvent();
}
SLiderV.prototype.getDOM = function () {
    // console.log("getDOM");
    this.sliderBlock = document.querySelector(this.selectors.sliderBlock);
    this.sliderBg = document.querySelector(this.selectors.sliderBg);
    this.sliderHander = document.querySelector(this.selectors.sliderHander);
    this.sliderIcon = document.querySelector(this.selectors.sliderIcon);
}
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
                _self.flag=true;
                document.removeEventListener(end, drag.end, false);
                // console.log(_self.flag);
                setTimeout(function () {
                    document.getElementById("dsliderBlock").style.height = "0"; 
                    document.getElementById("dsliderBlock").style.border = "none";
                }, 200)
            }
        }
    }
    this.sliderHander.addEventListener(start, drag.start, false)
}
module.exports = SLiderV;