(function (w) {
  w.nav = {}
  function init({wrap,arr}) {
    //挑选一个适配方案
    var styleNode = document.createElement("style");
    var w = document.documentElement.clientWidth/16;
    styleNode.innerHTML = `html{font-size:${w}px!important`;
    document.head.appendChild(styleNode);
    //禁止移动端事件的默认行为
    wrap.addEventListener("touchstart", (ev)=>{
        ev = ev || event;
        ev.preventDefault();
    })
    //调用layout布局函数
    layout(arr);
  }

  function layout(arr) {
    //滑屏区域
    var navWrap = document.querySelector(".nav-wrap")
    //滑屏元素
    var list = document.createElement("ul");
    transform.css(list, "translateZ", 0) //开启3d硬件加速
    list.classList.add("list");
    for(var i = 0; i<arr.length; i++){
      list.innerHTML += "<li><a href='javascript:;'>"+(arr[i])+"</a></li>";
    }
    navWrap.appendChild(list);

    //调用move移动函数
    move(navWrap, list);
  }

  function move(navWrap,list) {
    //滑屏区域
    var navWrap = document.querySelector(".nav-wrap");
    //滑屏元素
    var list = document.querySelector(".nav-wrap > .list")
    transform.css(list,"translateZ", 0); //开启3D硬件加速,提高性能
    /* 
      导航往左滑可以滑到的最远的距离(负值 数值是最小的 在没有考虑橡皮筋效果的前提下能走的最远距离)
      滑屏元素是在滑屏区域内部滑动的,这个内部是滑屏区域不带边框的尺寸 : clientWidth
    */
    var minX = navWrap.clientWidth - list.offsetWidth; //求比例需要一个正值

    //滑屏元素一开始的位置 ; 手指一开始的位置
    var eleStartX = 0;
    var szStartX = 0;

    //手指上一次touchmove完成时的位置以及手指上一次touchmove完成时的时间点
    var lastPoint = 0;
    var lastTime = 0;
    //每一次toucmove真正移动的距离以及每一次toucmove完成的时间
    var pointDisX = 0;
    var timeDisX = 0; 

    navWrap.addEventListener("touchstart",(ev)=>{
      ev = ev || event;
      var touchC = ev.changedTouches[0];

      eleStartX = transform.css(list,"translateX");
      szStartX = touchC.clientX;
      
      //touchstart时手指的位置
      lastPoint = touchC.clientX
      lastTime = new Date().getTime();

      //正常滑屏时取消动画 清除手动橡皮筋效果的标识
      list.style.transition = "";
      list.handMove = false;
      //重置pointDisX timeDisX 避免每次单纯点击导航时有意料之外的移动
      pointDisX = 0;
      timeDisX = 1; //避免出现NaN 导致意想不到的bug
    })

    navWrap.addEventListener("touchmove",(ev)=>{
      ev = ev || event;
      var touchC = ev.changedTouches[0];

      var nowPoint = touchC.clientX; //当次touchmove时 手指的位置
      var nowTime = new Date().getTime();
      pointDisX = nowPoint - lastPoint; //当次touchmove 距离 上一次touchmove 我们手指移动的距离
      timeDisX = nowTime - lastTime

      lastPoint = nowPoint;
      lastTime = nowTime;

      var szNowX = touchC.clientX;
      var szDisX = szNowX - szStartX
      var translateX = eleStartX + szDisX;

      //要实现橡皮筋效果 就是让pointDisX的有效距离 越来越小
      //这个比例在每一次touchmove触发时应该要越来越小 (0,0.5]
      var scale = 1;
      if(translateX > 0){
        list.handMove = true; //如果为true代表进行了手动橡皮筋效果的
        //左侧橡皮筋效果
        scale = document.documentElement.clientWidth/((document.documentElement.clientWidth+translateX)*2.5);
      }else if(translateX < minX){
        list.handMove = true;
        //右侧橡皮筋效果的逻辑
        var over = minX - translateX;
        scale = document.documentElement.clientWidth/((document.documentElement.clientWidth + over)*2.5)
      }
      
      translateX = transform.css(list, "translateX")+(pointDisX*scale);

      transform.css(list,"translateX", translateX);
    })

    navWrap.addEventListener("touchend",()=>{
      if(list.handMove){
        //说明tocuhend事件触发时,是处于手动橡皮筋效果中的 --> 正常的回到边界位置即可
        var translateX = transform.css(list,"translateX");
        if(translateX > 0){
          //左侧橡皮筋
          translateX = 0;
        }else if (translateX < minX) {
          //右侧橡皮筋
          translateX = minX;
        }
        list.style.transition = ".5s transform"
        transform.css(list,"translateX",translateX);
      }else{
        //説明touchend事件触发时 手动橡皮筋效果没有被触发  --> 进行带橡皮筋效果的快速滑屏
        fast();
      }

      function fast() {
        //则最后一次touchmove的平均速度speed
        var speed = pointDisX / timeDisX;
        speed= Math.abs(speed) < 0.5 ? 0 :speed;
        /* 
          根据速度让滑屏元素在单位时间内化的距离有远有近
          速度的正负号代表的是滑屏的方向
          速度大:在单位时间内滑动距离远一点
          速度小:在单位时间内滑动距离近一点
        */
        /* 
          手指抬起时,如果发现两侧有橡皮筋拉出距离,需要弹回去
          手指抬起时,list的位置
        */
        var translateX = transform.css(list, "translateX")
        translateX = translateX + speed*200;

          //快速滑屏也需要的橡皮筋效果,要借助于贝塞尔曲线
          bsr = "";
          if(translateX > 0){
            //左侧橡皮筋
            translateX = 0;
            bsr = "cubic-bezier(.06,1.85,.83,1.75)"
          }else if(translateX < minX){
            //右侧橡皮筋
            translateX = minX;
            bsr="cubic-bezier(.06,1.85,.83,1.75)"
          }
          //加过渡效果
          list.style.transition = ".5s "+(bsr)+" transform"
          transform.css(list, "translateX", translateX)
        }
    })  
  }
  w.nav.init = init;
})(window)