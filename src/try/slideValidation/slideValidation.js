const SLiderV = function () {
    var defaults = {
        sliderBlock: '#sliderBlock',
        sliderBg: '#sliderBg',
        sliderHander: '#sliderHander',
        sliderIcon: '#vIcon'
    };
    this.flag=false;
    this.selectors = Object.assign(defaults, arguments[0] || {});
    this.init();
}
SLiderV.prototype.init = function () {
    console.log("init");
    this.getDOM();
    this.bindEvent();
}
SLiderV.prototype.getDOM = function () {
    console.log("getDOM");
    this.sliderBlock = document.querySelector(this.selectors.sliderBlock);
    this.sliderBg = document.querySelector(this.selectors.sliderBg);
    this.sliderHander = document.querySelector(this.selectors.sliderHander);
    this.sliderIcon = document.querySelector(this.selectors.sliderIcon);
}
SLiderV.prototype.bindEvent = function () {
    console.log("bindEvent");
    var _self = this;
    var moblie = 'ontouchstart' in window;
    var start = moblie ? 'touchstart' : 'mousedown';
    var move = moblie ? 'touchmove' : 'mousemove';
    var end = moblie ? 'touchend' : 'mouseup';
    var startX, lastX;
    var max = this.sliderBlock.offsetWidth - this.sliderHander.offsetWidth;

    var drag = {
        start: function (event) {
            console.log("start");
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
            if(lastX>=max){
                this.flag=true;
            }
            document.removeEventListener(move, drag.move, false);
            document.removeEventListener(move, drag.end, false);
        }
    }
    this.sliderHander.addEventListener(start, drag.start, false)
}
module.exports = SLiderV;