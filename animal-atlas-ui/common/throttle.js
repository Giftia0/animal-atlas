export default function throttle(fun, wait) {
    var timer;  //开   timer=undefined
    return function () {
        if (!timer) { //判断timer是否有值（当前是否已经开启了定时器） ，
            timer = setTimeout(function () { //关
                fun();
                timer = undefined; //开
            }, wait)
        }
    }     
}