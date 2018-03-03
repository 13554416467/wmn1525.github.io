const pic = [{
        "picId": 1,
        "picDes": "red flowers",
        "picPath": "http://i1.piimg.com/588926/4c8b92d4ab54f5db.jpg",
        "picWidth": 1920,
        "picHeight": 1080
    },
    {
        "picId": 2,
        "picDes": "大窗户",
        "picPath": "http://i1.piimg.com/588926/c8c7e717b588add8.jpg",
        "picWidth": 1920,
        "picHeight": 1080
    },
    {
        "picId": 3,
        "picDes": "斑马",
        "picPath": "http://i2.muimg.com/588926/f82ad36492c997ff.jpg",
        "picWidth": 1920,
        "picHeight": 1080
    },
    {
        "picId": 4,
        "picDes": "大玻璃",
        "picPath": "http://i1.piimg.com/588926/7b8f8b8613001cf3.jpg",
        "picWidth": 1920,
        "picHeight": 1080
    },
    {
        "picId": 5,
        "picDes": "小楼",
        "picPath": "http://i1.piimg.com/588926/e08a5dba71528773.jpg",
        "picWidth": 1920,
        "picHeight": 1080
    }
]
import {
    w
} from '../../wtools';

const Carousel = function () {

    //getDOM
    this.container = w.$("#CarouselWrap");
    this.picList = w.$("#picList");
    this.toggles = w.$("#toggles").getElementsByTagName("span");
    this.prev = w.$("#prev");
    this.next = w.$("#next");
    //当前切换序号
    this.toggleIndex = 1;
    this.isanimate = false;
    this.timer = null;
    this.init();
}

Carousel.prototype.init = function () {
    w.addEvent(this.next, "click", () => {
        let t = parseInt(this.toggleIndex)
        t == 5 ? t = 1 : t += 1
        this.toggleIndex = parseInt(t)
        if (!this.isanimate) {
            this.animate(-600)
        }
        this.toggle()
    })

    w.addEvent(this.prev, "click", () => {
        let t = parseInt(this.toggleIndex)
        t == 1 ? t = 5 : t -= 1
        this.toggleIndex = parseInt(t)
        if (!this.isanimate) {
            this.animate(600)
        }
        this.toggle()
    })

    w.addEvent(this.container, "mouseover", () => {
        clearInterval(this.timer)
    })

    w.addEvent(this.container, "mouseout", () => {
        this.play()
    })

    w.addEvent(this.toggles, "click", (e) => {
        if (e.target && e.target.nodeName == "SPAN") {
            if (e.target.className == "toggle-active") {
                return
            }
            this.animate(-600 * (e.target.dataset.index - this.toggleIndex))
            this.toggleIndex = e.target.dataset.index
            this.toggle()
        }
    })
    this.toggle()
    this.play()
}

//切换按钮
Carousel.prototype.toggle = function () {
    for (let i = 0; i < this.toggles.length; i++) {
        if (this.toggles[i].className = 'toggle-active') {
            this.toggles[i].className = ''
        }
    }
    this.toggles[parseInt(this.toggleIndex) - 1].className = 'toggle-active'
}

//切换图片
Carousel.prototype.animate = function (offset) {
    this.isanimate = true
    const leftNum = parseInt(this.picList.style.left, 10) + offset
    const time = 300, //位移总时间
        interval = 10 //位移时间间隔
    let speed = offset / (time / interval) //每次位移量
    // console.log("speed: "+speed+",picList-left: "+parseInt(this.picList.style.left)+",leftNum: "+leftNum)
    const go = () => {
        if ((speed < 0 && parseInt(this.picList.style.left) > leftNum) || (speed > 0 && parseInt(this.picList.style.left) < leftNum)) {
            this.picList.style.left = parseInt(this.picList.style.left) + speed + 'px'
            setTimeout(go, interval)
        } else {
            this.isanimate = false
            this.picList.style.left = leftNum + 'px'
            if (leftNum > 0) {
                this.picList.style.left = -2400 + 'px'
            }
            if (leftNum < -2400) {
                this.picList.style.left = 0 + 'px'
            }
        }
    }
    go()
}

//自动播放
Carousel.prototype.play = function () {
    this.timer = setInterval(() => {
        let t = parseInt(this.toggleIndex)
        t == 5 ? t = 1 : t += 1
        this.toggleIndex = parseInt(t)
        if (!this.isanimate) {
            this.animate(-600)
        }
        this.toggle()
    }, 3000)
}
let d = new Carousel();